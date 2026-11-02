"""Tests for synthetic feasibility pilot, not proof of external validity."""
import unittest
from pilot_http import GOLD, acquire, fetch, run


class PilotTests(unittest.TestCase):
    def test_expected_gold_and_measured_results(self):
        results = run()
        self.assertEqual(sum(map(len, GOLD.values())), 54)
        self.assertEqual(results["totals"]["html"]["verified"], 24)
        self.assertEqual(results["totals"]["api"]["verified"], 28)
        self.assertEqual(results["totals"]["hybrid"]["verified"], 46)
        self.assertEqual(results["totals"]["hybrid"]["http_gets"], 9)
        checks = {(r["method"], r["case"]): r for r in results["cases"]}
        self.assertEqual(checks[("hybrid", "truncated")]["state"], "incomplete")
        self.assertEqual(checks[("api", "mixed")]["state"], "incomplete")
        self.assertEqual(checks[("html", "html")]["state"], "unknown")

    def test_no_external_or_out_of_scope_urls(self):
        for path in ("http://example.org/s/x", "//example.org/s/x", "/admin",
                     "/s/../admin", "/s/./admin", "/s/x/../../admin"):
            with self.subTest(path=path):
                with self.assertRaises(ValueError):
                    fetch("http://127.0.0.1:12345", path)


if __name__ == "__main__":
    unittest.main()
