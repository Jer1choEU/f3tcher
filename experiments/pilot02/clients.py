"""Generic acquisition baselines. No import or access to the fixture gold.
Only a whitelisted local HTTP origin is permitted. No redirects or POST.
"""
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import build_opener, HTTPRedirectHandler, Request
from urllib.error import HTTPError
import requests
from bs4 import BeautifulSoup
from lxml import html as lxml_html

class Denied(Exception):
    pass

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None

OPENER=build_opener(NoRedirect)


def safe_url(base, sid, path):
    p=urlparse(path)
    b=urlparse(base)
    if p.scheme or p.netloc or p.fragment or '\\' in path:
        raise ValueError("absolute URL/fragment/backslash forbidden")
    if not (p.path == f"/c/{sid}" or p.path.startswith(f"/c/{sid}/")) or any(z in (".","..") for z in p.path.split("/")):
        raise ValueError("out of scope path")
    url=urljoin(base,path)
    t=urlparse(url)
    if t.scheme != "http" or t.hostname != "127.0.0.1" or t.port != b.port:
        raise ValueError("outside local fixture origin")
    return url


def request(base,sid,path,backend):
    url=safe_url(base,sid,path)
    if backend == 'urllib':
        try:
            with OPENER.open(Request(url,method='GET'),timeout=3) as res:
                if res.status != 200: raise Denied(f"status {res.status}")
                return res.read().decode()
        except HTTPError as e:
            raise Denied(f"status {e.code}") from e
    if backend == 'requests':
        r=requests.get(url,timeout=3,allow_redirects=False)
        if r.status_code != 200:
            raise Denied(f"status {r.status_code}")
        return r.text
    raise ValueError('unknown backend')


class BareHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=set()
        self.next=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='article' and a.get('data-rid'):
            self.ids.add(a['data-rid'])
        if tag=='a' and 'next' in a.get('rel','').split():
            self.next=a.get('href')


def parse_page(body,method):
    if method=='stdlib_urllib_html':
        p=BareHTMLParser();p.feed(body)
        return p.ids,p.next,None
    if method.startswith('requests_bs4'):
        soup=BeautifulSoup(body,'html.parser')
        ids={v['data-rid'] for v in soup.select('article[data-rid]')}
        nxt=soup.select_one('a[rel~="next"]')
        api=soup.select_one('link[rel~="alternate"][type="application/json"]')
        return ids,nxt.get('href') if nxt else None,api.get('href') if api else None
    if method=='requests_lxml_html':
        root=lxml_html.fromstring(body)
        ids={v.get('data-rid') for v in root.xpath('//article[@data-rid]')}
        nxt=root.xpath('//a[contains(concat(" ",normalize-space(@rel)," ")," next ")]/@href')
        return ids,nxt[0] if nxt else None,None
    raise ValueError('unknown method')


def acquire(base,sid,method):
    backend='urllib' if method=='stdlib_urllib_html' else 'requests'
    ids=set();next_html=f"/c/{sid}";api=None;seen_html=set();seen_api=set();declared=None
    try:
        while next_html:
            if next_html in seen_html or len(seen_html)>16:
                raise RuntimeError("HTML paging loop/limit")
            seen_html.add(next_html)
            body=request(base,sid,next_html,backend)
            found,nxt,api_candidate=parse_page(body,method)
            ids.update(found)
            if api_candidate and api is None:
                api=api_candidate
            next_html=nxt
        if method=='requests_bs4_hybrid' and api:
            nxt=api
            while nxt:
                if nxt in seen_api or len(seen_api)>16:
                    raise RuntimeError("API paging loop/limit")
                seen_api.add(nxt)
                body=request(base,sid,nxt,'requests')
                payload=request_json(body)
                ids.update(item['id'] for item in payload['items'])
                declared=payload.get('declared_total')
                nxt=payload.get('next')
    except Denied:
        return {"ids":[],"state":"denied","declared":declared}
    if declared is None:
        state='unknown'
    elif len(ids) >= declared:
        state='complete_within_declared_count'
    else:
        state='incomplete_vs_declared_count'
    return {"ids":sorted(ids),"state":state,"declared":declared}


def request_json(text):
    import json
    result=json.loads(text)
    if not isinstance(result,dict) or not isinstance(result.get('items'),list):
        raise ValueError('invalid response')
    return result

METHODS=('stdlib_urllib_html','requests_bs4_html','requests_lxml_html','requests_bs4_hybrid')
