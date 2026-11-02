import unittest
from benchmark import FixtureProcess, CountedClient, url_guard, ScopeError, html_catalog, dynamic_catalog, article, failure, run, git_blob_sha, FIXTURE, GOLD_FILE, ORIGINAL_SERVER_GIT_SHA, ORIGINAL_GOLD_GIT_SHA

class Pilot03(unittest.TestCase):
    def test_exact_third_party_fixture(self):
        self.assertEqual(git_blob_sha(FIXTURE),ORIGINAL_SERVER_GIT_SHA)
        self.assertEqual(git_blob_sha(GOLD_FILE),ORIGINAL_GOLD_GIT_SHA)

    def test_off_scope_rejected(self):
        base='http://127.0.0.1:12345'
        for target in ('https://example.org/', '//example.org/abc','/ground-truth.json', '/blocked-by-robots', '/..//admin','/dynamic/../ground-truth.json', '/%2e%2e/ground-truth.json'):
            with self.subTest(target=target):
                with self.assertRaises(ScopeError):url_guard(base,target)

    def test_http_failure_and_gold_not_requested(self):
        with FixtureProcess() as fx:
            c=CountedClient(fx.base,'requests')
            self.assertEqual(failure(c),500)
            self.assertEqual(c.calls,[{'path':'/failure/500','status':500,'bytes':27}])

    def test_external_fixture_results(self):
        measured=run()['measured']
        self.assertEqual(measured['urllib_html']['static_found'],12)
        self.assertEqual(measured['urllib_html']['dynamic_found'],0)
        self.assertEqual(measured['requests_bs4_html']['static_found'],12)
        self.assertEqual(measured['requests_bs4_html']['dynamic_found'],0)
        self.assertEqual(measured['requests_bs4_literal_api']['dynamic_found'],8)
        self.assertEqual(measured['requests_bs4_literal_api']['literal_api_discovered'],'/api/dynamic-products')
        for x in measured.values():
            self.assertEqual(x['body_paragraphs_found'],3)
            self.assertEqual(x['failure_status'],500)
            self.assertFalse(any(t['path']=='/ground-truth.json' for t in x['trace']))

if __name__=='__main__':unittest.main()
