"""Pilot04 genuine Scrapy spider over only the local MIT fixture.
The crawler deliberately does not inspect publisher ground truth.
"""
import json
from urllib.parse import urlsplit

import scrapy


class FixtureSpider(scrapy.Spider):
    name = "f3tcher_pilot04_scrapy"
    custom_settings = {
        "ROBOTSTXT_OBEY": True,
        "CONCURRENT_REQUESTS_PER_DOMAIN": 1,
        "DOWNLOAD_DELAY": 0.05,
        "RETRY_ENABLED": False,
        "LOG_LEVEL": "WARNING",
        "COOKIES_ENABLED": False,
        "TELNETCONSOLE_ENABLED": False,
        "DOWNLOAD_TIMEOUT": 8,
        "HTTPERROR_ALLOWED_CODES": [500],
        "USER_AGENT": "f3tcher-pilot04-local-test",
    }

    def __init__(self, base=None, **kwargs):
        super().__init__(**kwargs)
        u = urlsplit(base or "")
        if u.hostname != "127.0.0.1" or u.scheme != "http" or not u.port:
            raise ValueError("Fixture must be a local 127.0.0.1 HTTP service")
        self.base = base.rstrip("/")

    async def start(self):
        yield scrapy.Request(self.base + "/static/catalog?page=1", callback=self.parse_static)
        yield scrapy.Request(self.base + "/dynamic/catalog", callback=self.parse_dynamic)
        yield scrapy.Request(self.base + "/api/dynamic-products", callback=self.parse_api)
        yield scrapy.Request(self.base + "/failure/500", callback=self.parse_error)

    def parse_static(self, response):
        yield {
            "scenario": "static",
            "url": response.url,
            "status": response.status,
            "ids": [int(x) for x in response.css("article.product-card::attr(data-product-id)").getall()],
        }
        next_href = response.css("a.next-page::attr(href)").get()
        if next_href:
            # Only follow fixture pagination, no arbitrary links.
            if not next_href.startswith("/static/catalog?page="):
                raise ValueError("Unexpected pagination destination")
            yield response.follow(next_href, callback=self.parse_static)

    def parse_dynamic(self, response):
        yield {
            "scenario": "dynamic_html",
            "url": response.url,
            "status": response.status,
            "ids": [int(x) for x in response.css("article.product-card::attr(data-product-id)").getall()],
        }

    def parse_api(self, response):
        records = json.loads(response.text)
        yield {
            "scenario": "api",
            "url": response.url,
            "status": response.status,
            "ids": [int(row["id"]) for row in records],
        }

    def parse_error(self, response):
        yield {"scenario": "error500", "url": response.url, "status": response.status, "ids": []}
