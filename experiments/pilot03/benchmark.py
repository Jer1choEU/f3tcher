"""Pilot 03: third-party MIT fixture, local-only reproducible baselines.

Producer: thunderbit-operations/scraper-benchmark/tools/crawlee/fixture-server.mjs
Compare: stdlib HTMLParser; Requests+BeautifulSoup; Requests+BS4 with
read-only discovery of *literal* fetch('/...') in the publisher's JS.
Never uses the fixture's ground truth inside any acquisition function.
"""
from __future__ import annotations
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import time
from urllib.parse import urlparse, urljoin
from urllib.request import build_opener, HTTPRedirectHandler, Request
from urllib.error import HTTPError

import requests
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parent
GOLD_FILE=ROOT/'vendor_thunderbit/local_fixture_ground_truth.json'
FIXTURE=ROOT/'vendor_thunderbit/fixture-server.mjs'
ORIGINAL_SERVER_GIT_SHA='f33a3402bf8e1db6a612ae4c8f51c115430dab15'
ORIGINAL_GOLD_GIT_SHA='8b0d88367b45d84df86a110a3e282aa8647d3d92'

class RedirectOff(HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): return None
opener=build_opener(RedirectOff)

class ScopeError(ValueError): pass

def url_guard(base,path):
    p=urlparse(path)
    if p.scheme or p.netloc or not p.path.startswith('/') or p.fragment or '\\' in path or any(z in ('.','..') for z in p.path.split('/')):
        raise ScopeError(f'non-local or unsafe path: {path!r}')
    b=urlparse(base)
    u=urlparse(urljoin(base,path))
    if b.hostname!='127.0.0.1' or u.hostname!='127.0.0.1' or b.port!=u.port or u.scheme!='http':
        raise ScopeError('outside the local loopback test origin')
    if p.path in ('/ground-truth.json','/blocked-by-robots') or re.search(r'%2e|%2f|%5c',p.path,re.I):
        raise ScopeError('client is not permitted to access gold or encoded traversal')
    return u.geturl()

class CountedClient:
    def __init__(self,base,library):
        self.base=base
        self.library=library
        self.calls=[]
        self.bytes=0
    def get(self,path):
        u=url_guard(self.base,path)
        if self.library=='urllib':
            try:
                with opener.open(Request(u,method='GET'),timeout=4) as r:
                    status=r.status; raw=r.read()
            except HTTPError as e:
                status=e.code;raw=e.read()
        else:
            r=requests.get(u,allow_redirects=False,timeout=4)
            status=r.status_code;raw=r.content
        self.calls.append({'path':path,'status':status,'bytes':len(raw)})
        self.bytes+=len(raw)
        return status,raw.decode('utf-8',errors='replace')

class CatalogHTML(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=set();self.next=[];self.article=False;self.paragraphs=[];self._in_para=False;self._segments=[]
    def handle_starttag(self,tag,attrs):
        x=dict(attrs)
        if tag=='article' and x.get('data-product-id'):
            self.ids.add(int(x['data-product-id']))
        if tag=='a' and 'next-page' in x.get('class','').split():
            self.next.append(x.get('href'))
        if tag=='article' and not x.get('data-product-id'):
            self.article=True
        if tag=='p' and self.article:
            self._in_para=True;self._segments=[]
    def handle_data(self,text):
        if self._in_para:self._segments.append(text)
    def handle_endtag(self,tag):
        if tag=='p' and self._in_para:
            self.paragraphs.append(''.join(self._segments).strip());self._in_para=False
        if tag=='article':self.article=False

def html_catalog(client):
    current='/static/catalog?page=1';visited=set();items=set()
    while current:
        if current in visited or len(visited)>5:raise RuntimeError('pagination loop')
        visited.add(current)
        status,html=client.get(current)
        if status!=200:raise RuntimeError(f'static status {status}')
        if client.library=='urllib':
            parser=CatalogHTML();parser.feed(html)
            items.update(parser.ids);nexts=parser.next
        else:
            soup=BeautifulSoup(html,'html.parser')
            items.update(int(x['data-product-id']) for x in soup.select('article.product-card[data-product-id]'))
            nexts=[x.get('href') for x in soup.select('a.next-page[href]')]
        current=nexts[0] if nexts else None
    return items

def dynamic_catalog(client, discover_api=False):
    status,html=client.get('/dynamic/catalog')
    if status!=200:raise RuntimeError(f'dynamic status {status}')
    if client.library=='urllib':
        parser=CatalogHTML();parser.feed(html);visible=parser.ids
    else:
        soup=BeautifulSoup(html,'html.parser')
        visible={int(x['data-product-id']) for x in soup.select('article.product-card[data-product-id]')}
    if not discover_api:
        return visible,None
    # Evidence extraction, not script execution or a general discovery algorithm.
    # Only a literal same-origin GET URL from this local fixture is allowed.
    m=re.search(r'\bfetch\s*\(\s*[\'\"](\/api\/[a-z0-9-]+)[\'\"]\s*\)',html)
    if not m:
        return visible,None
    api=m.group(1)
    status,data=client.get(api)
    if status!=200:return visible,api
    rows=json.loads(data)
    visible.update(int(x['id']) for x in rows if isinstance(x,dict) and 'id' in x)
    return visible,api

def article(client):
    status,html=client.get('/article/1')
    if status!=200:raise RuntimeError('article failed')
    if client.library=='urllib':
        p=CatalogHTML();p.feed(html)
        return p.paragraphs
    soup=BeautifulSoup(html,'html.parser')
    return [p.get_text(' ',strip=True) for p in soup.select('main article p:not(.byline)')]

def failure(client):
    status,_=client.get('/failure/500')
    return status

def git_blob_sha(path):
    data=path.read_bytes();return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()

class FixtureProcess:
    def __enter__(self):
        self.proc=subprocess.Popen(['node',str(ROOT/'serve.mjs')],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
        url=self.proc.stdout.readline().strip()
        if not url.startswith('http://127.0.0.1:'):
            raise RuntimeError(f'no local fixture URL: {url!r}')
        self.base=url
        return self
    def __exit__(self,*exc):
        self.proc.terminate()
        try:self.proc.communicate(timeout=5)
        except subprocess.TimeoutExpired:self.proc.kill();self.proc.communicate()

def run():
    gold=json.loads(GOLD_FILE.read_text())
    if git_blob_sha(FIXTURE)!=ORIGINAL_SERVER_GIT_SHA or git_blob_sha(GOLD_FILE)!=ORIGINAL_GOLD_GIT_SHA:
        raise AssertionError('upstream fixture changed; provenance is no longer verified')
    expected_products={int(x['id']) for x in gold['products']}
    expected_dynamic={int(x['id']) for x in gold['dynamic_products']}
    expected_body=gold['article']['body_paragraphs']
    results={}
    with FixtureProcess() as fx:
        for label,lib,use_api in [
            ('urllib_html','urllib',False),
            ('requests_bs4_html','requests',False),
            ('requests_bs4_literal_api','requests',True),
        ]:
            c=CountedClient(fx.base,lib)
            static=html_catalog(c)
            dyn,api=dynamic_catalog(c,use_api)
            text=article(c)
            err=failure(c)
            results[label]={
                'static_found':len(static&expected_products),'static_gold':len(expected_products),
                'dynamic_found':len(dyn&expected_dynamic),'dynamic_gold':len(expected_dynamic),
                'body_paragraphs_found':sum(p in text for p in expected_body),'body_gold':len(expected_body),
                'failure_status':err,'literal_api_discovered':api,
                'requests':len(c.calls),'response_bytes':c.bytes,'trace':c.calls,
            }
    return {'status':'exploratory local test with THIRD-PARTY FIXTURE; not a blind independent benchmark',
            'date':'2026-11-02',
            'upstream':{'repository':'thunderbit-operations/scraper-benchmark',
                        'fixture_path':'tools/crawlee/fixture-server.mjs','fixture_git_blob':git_blob_sha(FIXTURE),
                        'gold_path':'tools/crawlee/results/local_fixture_ground_truth.json',
                        'gold_git_blob':git_blob_sha(GOLD_FILE),'license':'MIT / copyright (c) 2026 Thunderbit'},
            'measured':results,
            'limitations':[
                'Clients were authored after examining this already-published fixture: source is third-party, evaluation is NOT blind.',
                'Third-party benchmark is published by a commercial vendor, not independent of all industry interests.',
                'HTTP-client baselines are not complete web crawling frameworks.',
                'A literal fetch() recognizer only handles this fixture and is not an adaptive or general JS interpreter.',
                'Chromium/Playwright blocked local navigation by ERR_BLOCKED_BY_ADMINISTRATOR: no browser score.',
                'Scrapy and Crawlee unavailable in installed environment, so neither was scored.',
                'No hidden data, no provider change over time, no corpus-wide completeness claim.']}

if __name__=='__main__':
    print(json.dumps(run(),indent=2,sort_keys=True,ensure_ascii=False))
