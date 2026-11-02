"""Evaluation runner; only this module can access source inventory and clients.
Usage: python benchmark.py > results.json
"""
import importlib.metadata
import json
import os
import platform
import time
from collections import defaultdict
from fixtures import SEEDS, cases_for_seed, inventory_sha256, FixtureServer
from clients import METHODS, acquire


def run():
    all_cases=tuple(c for seed in SEEDS for c in cases_for_seed(seed))
    rows=[]
    with FixtureServer(all_cases) as server:
        for c in all_cases:
            reachable=set(c.html)|set(c.api) if not c.denied else set()
            for method in METHODS:
                before_calls=sum(server.counter.values())
                before_bytes=server.bytes_sent
                start=time.perf_counter()
                client=acquire(server.base,c.sid,method)
                elapsed_ms=round((time.perf_counter()-start)*1000,3)
                ids=set(client['ids'])
                assert not ids-set(c.gold), (method,c.label,'false id')
                assert not ids-set(reachable), (method,c.label,'unreachable id')
                false_complete=(client['state']=='complete_within_declared_count' and ids != set(c.gold) and not c.denied)
                rows.append({
                    'seed':int(c.sid.split('-')[0]),'case':c.label,'method':method,
                    'gold_count':len(c.gold),'reachable_count':len(reachable),
                    'acquired_count':len(ids),'correct_gold':len(ids&set(c.gold)),
                    'correct_reachable':len(ids&reachable),'declared':client['declared'],
                    'state':client['state'],'false_complete':bool(false_complete),
                    'requests':sum(server.counter.values())-before_calls,
                    'response_bytes':server.bytes_sent-before_bytes,
                    'wall_ms':elapsed_ms
                })
    summary={}
    for method in METHODS:
        rr=[x for x in rows if x['method']==method]
        eligible=[x for x in rr if x['state']!='denied']
        gold=sum(x['gold_count'] for x in eligible)
        reachable=sum(x['reachable_count'] for x in eligible)
        found=sum(x['correct_gold'] for x in eligible)
        complete=sum(x['state']=='complete_within_declared_count' for x in rr)
        summary[method]={
            'cases':len(rr),'gold_count_publication':gold,'reachable_count':reachable,
            'verified_gold':found,'reachable_recall':round(found/reachable,6) if reachable else None,
            'corpus_recall':round(found/gold,6) if gold else None,
            'requests':sum(x['requests'] for x in rr),'response_bytes':sum(x['response_bytes'] for x in rr),
            'false_complete':sum(x['false_complete'] for x in rr),'complete_claims':complete,
            'unknown':sum(x['state']=='unknown' for x in rr),
            'incomplete':sum(x['state']=='incomplete_vs_declared_count' for x in rr),
            'denied':sum(x['state']=='denied' for x in rr),
            'wall_ms_total':round(sum(x['wall_ms'] for x in rr),2)}
    return {
        'kind':'exploratory local-only evaluation, NO independent real-world crawler benchmark',
        'date':'2026-11-02','fixture_seeds':list(SEEDS),
        'fixture_manifest_sha256':inventory_sha256(all_cases),
        'environment': {'python':platform.python_version(),
                        'requests':importlib.metadata.version('requests'),
                        'beautifulsoup4':importlib.metadata.version('beautifulsoup4'),
                        'lxml':importlib.metadata.version('lxml'),
                        'network':'127.0.0.1 ephemeral port only'},
        'summary':summary,'cases':rows,
        'limitations':[
            'Fixtures and baselines authored within one project; procedural separation only, NOT independent third-party holdout.',
            'Seeds vary identifiers but keep the same scenario design; 3 seeds do NOT establish statistical independence.',
            'Scrapy/Crawlee not compared: unavailable locally, package registry unreachable (DNS).',
            'Chromium/Playwright blocked from loopback by environment policy in pilot01; not measured here.',
            'HTML parsers compared on the same deliberately simple data-rid markup; not representative extraction quality.',
            'More coverage of hybrid on mixed/api cases is expected by construction; no evidence of superiority.',
            'Response time is local scheduler noise; do not rank methods by wall_ms_total.',
            'No external sites, paid services, policy bypasses, real-world permissions, or cloud costs.',
            'Some gold assets are intentionally unexposed: corpus recall and reachable recall have different denominators.']}


if __name__=='__main__':
    print(json.dumps(run(),ensure_ascii=False,indent=2,sort_keys=True))
