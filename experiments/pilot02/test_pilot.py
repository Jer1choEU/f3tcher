import unittest
from fixtures import SEEDS,cases_for_seed,FixtureServer,inventory_sha256
from clients import acquire,safe_url,request,METHODS
from benchmark import run

class TestPilot02(unittest.TestCase):
    def test_stable_manifest_and_varied_ids(self):
        a=tuple(x for s in SEEDS for x in cases_for_seed(s))
        b=tuple(x for s in SEEDS for x in cases_for_seed(s))
        self.assertEqual(inventory_sha256(a),inventory_sha256(b))
        self.assertEqual(len(a),27)
        self.assertEqual(len({v for c in a for v in c.gold}),sum(len(c.gold) for c in a))
    def test_scope_restrictions(self):
        for v in ('http://evil.test/c/1','//evil.test/c/1','/admin','/c/1/../../admin',
                  '/c/1/./api','/c/1\\evil','/c/2/api','/c/1evil/api','#evil'):
            with self.subTest(v=v):
                with self.assertRaises(ValueError):
                    safe_url('http://127.0.0.1:1337','1',v)
    def test_denied_one_request_no_retry(self):
        cases=cases_for_seed(SEEDS[0]);denied=next(c for c in cases if c.label=='denied')
        with FixtureServer(cases) as server:
            r=acquire(server.base,denied.sid,'requests_bs4_hybrid')
            self.assertEqual(r['state'],'denied')
            self.assertEqual(sum(server.counter.values()),1)
    def test_no_false_benchmark_claims(self):
        r=run()
        self.assertEqual(len(r['cases']),108)
        self.assertEqual(len(r['summary']),4)
        for x in r['summary'].values():
            self.assertEqual(x['cases'],27)
            self.assertEqual(x['denied'],1*len(SEEDS))
        hybrid=r['summary']['requests_bs4_hybrid']
        self.assertGreater(hybrid['verified_gold'],r['summary']['requests_bs4_html']['verified_gold'])
        self.assertEqual(hybrid['false_complete'],len(SEEDS))
        self.assertTrue(all(x['false_complete'] for x in r['cases'] if x['case']=='deceptive_total' and x['method']=='requests_bs4_hybrid'))
        self.assertTrue(all(x['state']=='incomplete_vs_declared_count' for x in r['cases'] if x['case']=='truncated' and x['method']=='requests_bs4_hybrid'))
        self.assertTrue(all(x['state']=='unknown' for x in r['cases'] if x['case']=='empty'))

if __name__=='__main__':unittest.main()
