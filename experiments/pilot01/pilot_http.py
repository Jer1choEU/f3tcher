"""Pilot 01: controlled, deterministic local HTTP/API baseline comparison.
Run: python pilot_http.py > results.json
Stdlib only. No external hosts, cloud services or production f3tcher code.
"""
import hashlib
import json
import platform
import threading
from collections import Counter
from html.parser import HTMLParser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
from urllib.request import urlopen

# Synthetic fixtures; gold is used by the fixture server and the evaluator,
# NEVER passed to any acquisition function.
GOLD = {
    "html": [f"h{i:02}" for i in range(12)],
    "api": [f"a{i:02}" for i in range(12)],
    "mixed": [f"m{i:02}" for i in range(18)],
    "truncated": [f"t{i:02}" for i in range(12)],
}
HTML_ROWS = {"html": GOLD["html"], "mixed": GOLD["mixed"][:8],
             "truncated": GOLD["truncated"][:4]}
API_ROWS = {"api": GOLD["api"], "mixed": GOLD["mixed"][6:],
            "truncated": GOLD["truncated"][:4]}


class Fixture(BaseHTTPRequestHandler):
    calls = Counter()

    def log_message(self, *args):
        pass

    def do_GET(self):
        self.calls[self.path] += 1
        u = urlparse(self.path)
        p = u.path.strip("/").split("/")
        if len(p) < 2 or p[0] != "s" or p[1] not in GOLD:
            return self.reply(404, b"not found", "text/plain")
        name = p[1]
        if len(p) == 2:
            links = "".join(f'<a data-id="{r}" href="#">{r}</a>' for r in HTML_ROWS.get(name, []))
            meta = (f'<link rel="alternate" type="application/json" href="/s/{name}/api">'
                    if name in API_ROWS else "")
            return self.reply(200, f'<html><head>{meta}</head><body>{links}</body></html>'.encode(), "text/html")
        if len(p) == 3 and p[2] == "api" and name in API_ROWS:
            page = int(parse_qs(u.query).get("page", ["1"])[0])
            if not 1 <= page <= 5:
                return self.reply(400, b"bad page", "text/plain")
            rows = API_ROWS[name]
            part = rows[(page-1)*7:page*7]
            nxt = f"/s/{name}/api?page={page+1}" if page*7 < len(rows) else None
            body = {"items": part, "next": nxt, "declared_total": len(GOLD[name])}
            return self.reply(200, json.dumps(body).encode(), "application/json")
        return self.reply(404, b"not found", "text/plain")

    def reply(self, status, body, mime):
        self.send_response(status)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.api = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a" and a.get("data-id"):
            self.ids.add(a["data-id"])
        if tag == "link" and a.get("rel") == "alternate" and a.get("type") == "application/json":
            self.api = a.get("href")


def fetch(base, path):
    # No client-supplied destination may escape the local fixture service.
    p = urlparse(path)
    if p.scheme or p.netloc or not p.path.startswith("/s/") or any(
        segment in (".", "..") for segment in p.path.split("/")
    ):
        raise ValueError("non-local or out-of-scope URL")
    u = urlparse(base + path)
    if u.hostname != "127.0.0.1" or u.port != urlparse(base).port:
        raise ValueError("non-local or out-of-scope URL")
    with urlopen(u.geturl(), timeout=3) as response:
        return response.read().decode()


def acquire(base, name, method):
    landing = Parser()
    landing.feed(fetch(base, f"/s/{name}"))
    ids = set(landing.ids) if method != "api" else set()
    advertised = None
    if method in ("api", "hybrid") and landing.api:
        visited, path = set(), landing.api
        while path:
            if path in visited or len(visited) >= 5:
                raise AssertionError("pagination cycle/limit")
            visited.add(path)
            body = json.loads(fetch(base, path))
            ids.update(body["items"])
            advertised = body["declared_total"]
            path = body["next"]
    # Claimed completeness is ALWAYS restricted to a publisher-declared count,
    # not to the whole world, and is 'unknown' without such evidence.
    state = ("unknown" if advertised is None else
             "complete_within_declared_count" if len(ids) >= advertised else "incomplete")
    return ids, state


def run():
    server = ThreadingHTTPServer(("127.0.0.1", 0), Fixture)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f"http://127.0.0.1:{server.server_port}"
    methods, rows = ("html", "api", "hybrid"), []
    try:
        for method in methods:
            for name, gold in GOLD.items():
                Fixture.calls.clear()
                ids, state = acquire(base, name, method)
                # Independent evaluation, after the acquisition code returns.
                assert not (ids - set(gold)), (method, name, ids)
                got = len(ids & set(gold))
                rows.append({"method": method, "case": name, "gold": len(gold),
                             "verified": got, "state": state,
                             "http_gets": sum(Fixture.calls.values())})
    finally:
        server.shutdown()
        server.server_close()
    totals = {}
    for method in methods:
        sample = [r for r in rows if r["method"] == method]
        found, gold = sum(r["verified"] for r in sample), sum(r["gold"] for r in sample)
        totals[method] = {"verified": found, "gold": gold,
                          "recall": round(found/gold, 6),
                          "http_gets": sum(r["http_gets"] for r in sample),
                          "incomplete_flags": sum(r["state"] == "incomplete" for r in sample),
                          "unknown_flags": sum(r["state"] == "unknown" for r in sample)}
    assert totals["html"]["verified"] == 24
    assert totals["api"]["verified"] == 28
    assert totals["hybrid"]["verified"] == 46
    assert next(r for r in rows if r["method"] == "hybrid" and r["case"] == "truncated")["state"] == "incomplete"
    assert next(r for r in rows if r["method"] == "api" and r["case"] == "mixed")["state"] == "incomplete"
    assert next(r for r in rows if r["method"] == "hybrid" and r["case"] == "mixed")["state"] == "complete_within_declared_count"
    return {"date": "2026-11-02", "kind": "synthetic feasibility pilot, NOT a third-party crawler benchmark",
            "environment": {"python": platform.python_version(), "network": "loopback only"},
            "gold_sha256": hashlib.sha256(json.dumps(GOLD, sort_keys=True).encode()).hexdigest(),
            "cases": rows, "totals": totals,
            "limitations": [
                "Four toy datasets designed alongside the clients; no independent sources or holdout.",
                "One deterministic run; no confidence intervals, CPU/RAM/latency/euro comparison.",
                "The hybrid simply unions HTML and advertised API; this is not an adaptive agent.",
                "Declared counts may be incorrect on real sources; status is not absolute completeness.",
                "Chromium browser test was attempted, but blocked by environment policy (ERR_BLOCKED_BY_ADMINISTRATOR); excluded, not zero coverage.",
                "No live external crawling, licensing analysis or real-world generalization."]}


if __name__ == "__main__":
    print(json.dumps(run(), ensure_ascii=False, indent=2, sort_keys=True))
