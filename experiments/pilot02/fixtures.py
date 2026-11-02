"""Synthetic publisher fixtures and sealed evaluation inventory.
The acquisition clients in clients.py do NOT import this module.
"""
from dataclasses import dataclass
from hashlib import sha256
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
from collections import Counter
import json
import random
import threading

SEEDS = (271828, 314159, 161803)

@dataclass(frozen=True)
class Case:
    sid: str
    label: str
    gold: tuple[str, ...]
    html: tuple[str, ...]
    api: tuple[str, ...]
    declared: int | None = None
    denied: bool = False


def _ids(rng, seed, label, n):
    return tuple(f"{seed}-{label}-{rng.getrandbits(50):013x}" for _ in range(n))


def cases_for_seed(seed):
    rng = random.Random(seed)
    out = []
    specs = [
        ("html_only",12,lambda x:x,lambda x:(),None,False),
        ("api_only",12,lambda x:(),lambda x:x,12,False),
        ("mixed",15,lambda x:x[:7],lambda x:x[5:],15,False),
        ("redundant",10,lambda x:x,lambda x:x,10,False),
        ("truncated",12,lambda x:x[:4],lambda x:x[:4],12,False),
        ("deceptive_total",10,lambda x:x[:7],lambda x:x[:7],7,False),
        ("no_inventory",9,lambda x:x[:5],lambda x:(),None,False),
        ("empty",0,lambda x:x,lambda x:(),None,False),
        ("denied",8,lambda x:x,lambda x:x,8,True),
    ]
    for label,n,html,api,declared,denied in specs:
        x = _ids(rng,seed,label,n)
        out.append(Case(f"{seed}-{label}",label,x,tuple(html(x)),tuple(api(x)),declared,denied))
    return tuple(out)


def manifest(all_cases):
    return [{"sid":c.sid,"gold":list(c.gold),"html":list(c.html),"api":list(c.api),
             "declared":c.declared,"denied":c.denied} for c in all_cases]


def inventory_sha256(all_cases):
    return sha256(json.dumps(manifest(all_cases),sort_keys=True,separators=(",",":")).encode()).hexdigest()


class FixtureServer:
    def __init__(self, all_cases):
        self.case_map = {c.sid:c for c in all_cases}
        self.counter=Counter()
        self.bytes_sent=0
        outer=self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self,*args):
                return
            def do_POST(self):
                self._send(405,b"method forbidden","text/plain")
            def _send(self,status,body,mime):
                outer.counter[(status, self.path)] += 1
                outer.bytes_sent += len(body)
                self.send_response(status)
                self.send_header("Content-Type",mime)
                self.send_header("Content-Length",str(len(body)))
                self.end_headers()
                self.wfile.write(body)
            def do_GET(self):
                path = urlparse(self.path)
                parts = path.path.strip("/").split("/")
                if len(parts) < 2 or parts[0] != "c" or parts[1] not in outer.case_map:
                    return self._send(404,b"not found","text/plain")
                c=outer.case_map[parts[1]]
                if c.denied:
                    return self._send(403,b"forbidden","text/plain")
                try:
                    page=int(parse_qs(path.query).get("page",["1"])[0])
                    if not 1 <= page <= 20: raise ValueError()
                except ValueError:
                    return self._send(400,b"bad paging","text/plain")
                if len(parts)==2 or (len(parts)==3 and parts[2]=="html"):
                    size=5
                    items=c.html[(page-1)*size:page*size]
                    html="".join(f'<section><article class="item" data-rid="{v}"><span>Record</span></article></section>' for v in items)
                    nxt=(f'<a rel="next" href="/c/{c.sid}/html?page={page+1}">Next</a>'
                         if page*size < len(c.html) else "")
                    apilink=(f'<link rel="alternate" type="application/json" href="/c/{c.sid}/api">'
                             if c.api else "")
                    body=f'<html><head>{apilink}</head><body>{html}{nxt}<a href="/c/{c.sid}/bogus">Not a record</a></body></html>'.encode()
                    return self._send(200,body,"text/html")
                if len(parts)==3 and parts[2]=="api" and c.api:
                    size=4
                    items=c.api[(page-1)*size:page*size]
                    nxt=f'/c/{c.sid}/api?page={page+1}' if page*size < len(c.api) else None
                    payload={"items":[{"id":v} for v in items],"next":nxt,"declared_total":c.declared}
                    return self._send(200,json.dumps(payload).encode(),"application/json")
                return self._send(404,b"not found","text/plain")

        self.server=ThreadingHTTPServer(("127.0.0.1",0),Handler)
        self.thread=threading.Thread(target=self.server.serve_forever,daemon=True)
        self.base=f"http://127.0.0.1:{self.server.server_port}"
    def __enter__(self):
        self.thread.start()
        return self
    def __exit__(self,*args):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)
