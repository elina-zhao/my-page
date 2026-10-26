#!/usr/bin/env python3
"""Build a Confluence storage-format page from settings-functional-spec.html.

Usage:
    python3 build_storage.py [--src settings-functional-spec.html] [--out settings-functional-spec.confluence.html]

The HTML edition of the spec is the source of truth; this script strips the
page shell (topbar / rail / TOC) and emits only the article body in the XHTML
dialect Confluence stores: info macro for the notice, code macro for <pre>,
thead merged into tbody, colgroups dropped, red / yellow runs kept as inline
styles. A TOC macro replaces the doc's own side rail.
"""

import argparse
import html as H
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_SRC = os.path.join(HERE, os.pardir, "settings-functional-spec.html")
DEFAULT_OUT = os.path.join(HERE, "settings-functional-spec.confluence.html")

RED = "color: rgb(185, 28, 28); font-weight: bold;"
AMBER = "color: rgb(161, 98, 7); font-weight: bold;"


def build(src_path: str) -> str:
    raw = open(src_path, encoding="utf-8").read()
    if '<article class="doc-body">' not in raw:
        sys.exit("error: no <article class=\"doc-body\"> in %s" % src_path)
    body = raw.split('<article class="doc-body">', 1)[1].split("</article>", 1)[0]

    # 1. The page title comes from the API payload, not the body.
    body = re.sub(r"(?s)<h1\b.*?</h1>\s*", "", body, count=1)

    # 2. Drop the "#" permalinks that follow every heading.
    body = re.sub(r'<a class="h-anchor"[^>]*>#</a>', "", body)

    # 3. Amber "待确认" runs -> inline amber (must run before class stripping).
    body = re.sub(
        r'<span class="need-confirm">(.*?)</span>',
        lambda m: '<span style="%s">%s</span>' % (AMBER, m.group(1)),
        body,
        flags=re.S,
    )

    # 4. Red field names in the appendix tables -> inline red.
    body = re.sub(
        r'<td class="is-removed">\s*<strong>(.*?)</strong>\s*</td>',
        lambda m: '<td><strong><span style="%s">%s</span></strong></td>' % (RED, m.group(1)),
        body,
        flags=re.S,
    )

    # 5. The amber disclaimer box -> Confluence info panel.
    body = re.sub(
        r'(?s)<div class="doc-notice"[^>]*>.*?<svg\b.*?</svg>\s*(.*?)\s*</div>',
        lambda m: (
            '<ac:structured-macro ac:name="info"><ac:rich-text-body>'
            + m.group(1).strip()
            + "</ac:rich-text-body></ac:structured-macro>"
        ),
        body,
        count=1,
    )

    # 6. Fenced code blocks -> code macro (CDATA needs the unescaped text).
    def code_block(m: "re.Match[str]") -> str:
        text = H.unescape(m.group(1))
        return (
            '<ac:structured-macro ac:name="code"><ac:plain-text-body>'
            "<![CDATA[" + text + "]]>"
            "</ac:plain-text-body></ac:structured-macro>"
        )

    body = re.sub(r"(?s)<pre><code[^>]*>(.*?)</code></pre>", code_block, body)

    # 7. Layout wrappers and column widths do not exist in storage format.
    body = body.replace('<div class="table-wrap">', "").replace("</div>", "")
    body = re.sub(r"(?s)<colgroup>.*?</colgroup>", "", body)

    # 8. Confluence stores a single tbody; fold the header row into it.
    body = re.sub(r"(?s)<thead>\s*<tr>(.*?)</tr>\s*</thead>\s*<tbody>",
                  lambda m: "<tbody><tr>" + m.group(1) + "</tr>", body)

    # 9. Strip editor-only attributes (class / id / role / aria-*).
    body = re.sub(r'\s(?:class|id|role)="[^"]*"', "", body)
    body = re.sub(r'\saria-[a-z-]+="[^"]*"', "", body)

    # 9b. Storage format is XML: close void elements.
    body = re.sub(r"<(br|hr|img|input)([^<>]*?)\s*/?>",
                  lambda m: "<%s%s />" % (m.group(1), m.group(2).rstrip()), body)

    # 10. TOC macro where the doc's own rail used to be.
    toc = ('<ac:structured-macro ac:name="toc">'
           '<ac:parameter ac:name="minLevel">2</ac:parameter>'
           '<ac:parameter ac:name="maxLevel">4</ac:parameter>'
           "</ac:structured-macro>")
    body = re.sub(r"(?s)(</blockquote>\s*)", lambda m: m.group(1) + toc + "\n", body, count=1)

    body = re.sub(r"\n{3,}", "\n\n", body).strip() + "\n"
    return body


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=DEFAULT_SRC)
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()
    out = build(args.src)
    open(args.out, "w", encoding="utf-8").write(out)
    print("wrote %s (%d chars)" % (args.out, len(out)))


if __name__ == "__main__":
    main()
