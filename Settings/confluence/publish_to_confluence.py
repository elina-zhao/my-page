#!/usr/bin/env python3
"""Publish settings-functional-spec to one Confluence page (create or update in place).

Reads the HTML edition, converts it to Confluence storage format (build_storage.py),
then creates the page if the title does not exist in the space, or bumps its
version if it does. Safe to re-run: an unchanged body is skipped.

Environment
-----------
CONFLUENCE_BASE_URL   required  e.g. https://acme.atlassian.net/wiki
CONFLUENCE_SPACE_KEY  required  e.g. SETTINGS
CONFLUENCE_PAGE_TITLE optional  default: Podcast Dashboard — Settings 模块功能说明文档
CONFLUENCE_PARENT_ID  optional  parent page id, used only when creating

Auth (one of)
CONFLUENCE_EMAIL + CONFLUENCE_API_TOKEN   Confluence Cloud (basic auth)
CONFLUENCE_TOKEN                          Confluence Data Center personal access token (Bearer)
CONFLUENCE_INSECURE=1                     skip TLS verification (self-signed DC only)

Usage
-----
python3 publish_to_confluence.py --dry-run     # build + report, no HTTP writes
python3 publish_to_confluence.py               # create or update
python3 publish_to_confluence.py --file page.html
"""

import argparse
import base64
import json
import os
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.dont_write_bytecode = True  # keep the folder free of __pycache__
import build_storage  # noqa: E402

DEFAULT_TITLE = "Podcast Dashboard — Settings 模块功能说明文档"
DEFAULT_FILE = os.path.join(HERE, "settings-functional-spec.confluence.html")


def env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


def fail(msg: str) -> None:
    print("error: " + msg, file=sys.stderr)
    sys.exit(1)


class Confluence:
    def __init__(self) -> None:
        base = env("CONFLUENCE_BASE_URL").rstrip("/")
        if not base:
            fail("CONFLUENCE_BASE_URL is not set")
        self.base = base
        self.api = base + "/rest/api/content"

        email, token = env("CONFLUENCE_EMAIL"), env("CONFLUENCE_API_TOKEN")
        pat = env("CONFLUENCE_TOKEN")
        if email and token:
            raw = ("%s:%s" % (email, token)).encode("utf-8")
            self.auth = "Basic " + base64.b64encode(raw).decode("ascii")
        elif pat:
            self.auth = "Bearer " + pat
        else:
            fail("set CONFLUENCE_EMAIL + CONFLUENCE_API_TOKEN (Cloud) or CONFLUENCE_TOKEN (Data Center)")

        self.ctx = ssl.create_default_context()
        if env("CONFLUENCE_INSECURE") == "1":
            self.ctx.check_hostname = False
            self.ctx.verify_mode = ssl.CERT_NONE

    def call(self, method: str, url: str, payload=None):
        data = json.dumps(payload).encode("utf-8") if payload is not None else None
        req = urllib.request.Request(url, data=data, method=method)
        req.add_header("Authorization", self.auth)
        req.add_header("Accept", "application/json")
        if data is not None:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, context=self.ctx, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8") or "{}")
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", "replace")[:800]
            hint = ""
            if e.code == 401:
                hint = " — check the token / email; Cloud tokens come from id.atlassian.com"
            elif e.code == 403:
                hint = " — the account lacks permission to edit pages in this space"
            elif e.code == 404:
                hint = " — check the base URL (Cloud ends in /wiki) and the space key"
            fail("HTTP %s %s%s\n%s" % (e.code, method, hint, body))
        except urllib.error.URLError as e:
            fail("cannot reach %s (%s)" % (url, e.reason))

    def find_page(self, space: str, title: str):
        q = urllib.parse.urlencode({
            "spaceKey": space,
            "title": title,
            "expand": "version,body.storage",
            "limit": "1",
        })
        data = self.call("GET", self.api + "?" + q)
        results = data.get("results") or []
        return results[0] if results else None


def normalize(text: str) -> str:
    return "".join(text.split())


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", default="", help="pre-built storage HTML (default: rebuild from the spec)")
    ap.add_argument("--dry-run", action="store_true", help="build and report only, no writes")
    ap.add_argument("--title", default=env("CONFLUENCE_PAGE_TITLE", DEFAULT_TITLE))
    args = ap.parse_args()

    space = env("CONFLUENCE_SPACE_KEY")
    if not space:
        fail("CONFLUENCE_SPACE_KEY is not set")

    if args.file:
        body = open(args.file, encoding="utf-8").read()
    else:
        src = os.path.join(HERE, os.pardir, "settings-functional-spec.html")
        body = build_storage.build(src)
        open(DEFAULT_FILE, "w", encoding="utf-8").write(body)

    print("title : %s" % args.title)
    print("space : %s" % space)
    print("body  : %d chars" % len(body))
    if args.dry_run:
        print("dry run: no request sent")
        return

    cf = Confluence()
    existing = cf.find_page(space, args.title)

    if existing:
        page_id = existing["id"]
        current = existing.get("body", {}).get("storage", {}).get("value", "")
        version = existing["version"]["number"]
        url = existing.get("_links", {}).get("webui", "")
        print("found page id=%s version=%s" % (page_id, version))
        if normalize(current) == normalize(body):
            print("unchanged — nothing to do")
            return
        payload = {
            "id": page_id,
            "type": "page",
            "title": args.title,
            "space": {"key": space},
            "version": {"number": version + 1},
            "body": {"storage": {"value": body, "representation": "storage"}},
        }
        data = cf.call("PUT", cf.api + "/" + page_id, payload)
        print("updated: %s%s" % (cf.base, data.get("_links", {}).get("webui", url)))
    else:
        payload = {
            "type": "page",
            "title": args.title,
            "space": {"key": space},
            "body": {"storage": {"value": body, "representation": "storage"}},
        }
        parent = env("CONFLUENCE_PARENT_ID")
        if parent:
            payload["ancestors"] = [{"id": parent}]
        data = cf.call("POST", cf.api, payload)
        print("created: %s%s" % (cf.base, data.get("_links", {}).get("webui", "")))


if __name__ == "__main__":
    main()
