"""Compare full Scrapy vs Crawlee outputs against unchanged external MIT gold.
This evaluator is outside the crawler process; never give gold to a crawler.
"""
import argparse
import json
import os
from pathlib import Path


def evaluate(scrapy_path, crawlee_path):
    root = Path(__file__).resolve().parents[1]
    gold = json.loads((root / "pilot03/vendor_thunderbit/local_fixture_ground_truth.json").read_text())
    expected_static = {int(x["id"]) for x in gold["products"]}
    expected_api = {int(x["id"]) for x in gold["dynamic_products"]}
    def load(path):
        src = Path(path).read_text().strip()
        if path.endswith(".jsonl"):
            return [json.loads(s) for s in src.splitlines() if s.strip()]
        return json.loads(src)
    results = {}
    for label, path in (("scrapy", scrapy_path), ("crawlee", crawlee_path)):
        rows = load(path)
        if not isinstance(rows, list): raise AssertionError("Expected output rows")
        grouped = {}
        for r in rows:
            if r["scenario"] not in ("static", "dynamic_html", "api", "error500"):
                raise AssertionError("Unknown scenario")
            grouped.setdefault(r["scenario"], []).append(r)
        if {k:len(v) for k,v in grouped.items()} != {"static":2,"dynamic_html":1,"api":1,"error500":1}:
            raise AssertionError("Page count mismatch for " + label + ": " + str(grouped.keys()))
        ids = {}
        for kind, expected in (("static",expected_static),("dynamic_html",set()),("api",expected_api)):
            fetched = [int(x) for row in grouped[kind] for x in row["ids"]]
            if len(fetched) != len(set(fetched)):
                raise AssertionError("Duplicate records in " + kind + " for " + label)
            if set(fetched) != expected:
                raise AssertionError(label + "/" + kind + " expected " + str(sorted(expected)) + " found " + str(sorted(fetched)))
            ids[kind] = len(set(fetched))
        if any(r["status"] != 200 for k in ("static","dynamic_html","api") for r in grouped[k]):
            raise AssertionError("Non-200 acquisition result")
        if grouped["error500"][0]["status"] != 500:
            raise AssertionError("Error 500 was not observed")
        results[label] = {
            "static_catalog_records": ids["static"],
            "dynamic_html_records": ids["dynamic_html"],
            "publisher_api_records": ids["api"],
            "error_page_status": 500,
            "pages_emitted": len(rows),
        }
    return {
        "status":"compared actual frameworks in GitHub Actions against one unchanged external fixture",
        "frameworks":results,
        "expected_static":len(expected_static),
        "expected_js_catalog":len(expected_api),
        "limitations":[
            "Only one third-party fixture. Spider and Crawlee handlers use selectors known in advance; no holdout.",
            "Both methods HTTP-only; no Playwright browser baseline in this CI.",
            "API entry point supplied as a known authorized local URL, not autonomously discovered.",
            "No claim about performance, universal completeness, real web access, or broader superiority.",
            "Different runtimes and error processing; page counts are observations, not equal-cost conditions.",
        ],
    }


if __name__ == "__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("--scrapy", required=True)
    parser.add_argument("--crawlee", required=True)
    parser.add_argument("--output", required=True)
    args=parser.parse_args()
    r=evaluate(args.scrapy,args.crawlee)
    Path(args.output).write_text(json.dumps(r,ensure_ascii=False,indent=2)+"\n")
    print(json.dumps(r,ensure_ascii=False,indent=2))
    summary=os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary,"a") as f:
            f.write("## Pilot04 real framework comparison\n\n")
            f.write("| Framework | Static | JS HTML (without render) | Publisher JSON API | HTTP500 |\n")
            f.write("|---|---:|---:|---:|---:|\n")
            for label,result in r["frameworks"].items():
                f.write("| {} | {}/12 | {}/8 | {}/8 | {} |\n".format(
                    label,result["static_catalog_records"],result["dynamic_html_records"],
                    result["publisher_api_records"],result["error_page_status"]))
            f.write("\nOnly one local third-party fixture. Not a blind real-world benchmark.\n")
