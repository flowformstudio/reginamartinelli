#!/usr/bin/env python3
"""Build self-contained Squarespace embeds from the Regina v2 pages.

For each page: extract <main> + sticky CTA, inline all CSS (every selector
scoped under the wrapper id), inline all JS, rewrite asset URLs to the
GitHub Pages image host.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://flowformstudio.github.io/regina-assets/images/"

PAGES = [
    {
        "src": "ideal-client-strategy-session.html",
        "out": "squarespace-embed-icss.html",
        "scope": "#rm-icss",
        "wrap_id": "rm-icss",
        "pagecls": ".icss-page",
        "title": "Ideal Client Strategy Session",
        "css": ["design-system/colors_and_type.css", "css/site.css",
                "css/session.css", "css/icss-v2.css"],
        "js": ["js/site.js", "js/magnetize.js"],
    },
    {
        "src": "inner-alignment-blueprint.html",
        "out": "squarespace-embed-iab.html",
        "scope": "#rm-iab",
        "wrap_id": "rm-iab",
        "pagecls": ".iab-page",
        "title": "Inner Alignment Blueprint",
        "css": ["design-system/colors_and_type.css", "css/site.css",
                "css/session.css", "css/iab-v2.css"],
        "js": ["js/site.js", "js/align.js", "js/cosmos.js"],
    },
]


def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def rewrite_urls(text):
    text = text.replace("../design-system/assets/", BASE)
    text = text.replace("/design-system/assets/", BASE)
    return text


def tx_selector(sel, scope, pagecls):
    s = sel.strip()
    if not s:
        return None
    # replace page-class tokens with the scope id
    s = s.replace("body" + pagecls, scope).replace(pagecls, scope)
    # drop rules targeting html itself (scroll/color-scheme/overflow live
    # on the page; we re-add the useful ones as deliberate globals)
    if re.match(r"^html(?![.\w-])", s) or s.startswith("html:has"):
        return None
    # :root and body become the wrapper
    if s == ":root" or s == "body":
        return scope
    if s.startswith(":root"):
        s = scope + s[len(":root"):]
    elif s == "body" or s.startswith("body ") or s.startswith("body:"):
        s = scope + s[len("body"):]
    # .has-js is set on <html> by site.js — keep it outside the scope
    if s.startswith(".has-js"):
        rest = s[len(".has-js"):].strip()
        if scope in rest:
            return "html.has-js " + rest
        return "html.has-js " + scope + " " + rest
    if scope not in s:
        s = scope + " " + s
    return s


def tx_rules(css, scope, pagecls):
    """Recursively transform a css string (no comments)."""
    out = []
    i, n = 0, len(css)
    while i < n:
        ch = css[i]
        if ch.isspace():
            i += 1
            continue
        if ch == "@":
            semi = css.find(";", i)
            brace = css.find("{", i)
            if brace == -1 or (semi != -1 and semi < brace):
                # @import / @charset — emit verbatim
                out.append(css[i:semi + 1])
                i = semi + 1
                continue
            at_name = css[i:brace].strip()
            # find matching closing brace
            depth, j = 1, brace + 1
            while j < n and depth:
                if css[j] == "{":
                    depth += 1
                elif css[j] == "}":
                    depth -= 1
                j += 1
            inner = css[brace + 1:j - 1]
            if at_name.startswith(("@media", "@supports")):
                body = tx_rules(inner, scope, pagecls)
                if body.strip():
                    out.append(at_name + " {\n" + body + "\n}")
            else:  # @keyframes, @font-face, @property — verbatim
                out.append(at_name + " {" + inner + "}")
            i = j
            continue
        brace = css.find("{", i)
        if brace == -1:
            break
        close = css.find("}", brace)
        if close == -1:
            break
        sels = css[i:brace].split(",")
        body = css[brace + 1:close].strip()
        new_sels = [t for t in (tx_selector(s, scope, pagecls) for s in sels) if t]
        if new_sels and body:
            out.append(", ".join(new_sels) + " { " + body + " }")
        i = close + 1
    return "\n".join(out)


def build(page):
    html = open(os.path.join(ROOT, page["src"])).read()

    # --- content: <main> ... up to the FOOTER marker (keeps sticky CTA) ---
    m_start = html.index("<main>")
    m_end = html.index("<!-- ===== FOOTER")
    content = html[m_start:m_end].rstrip()
    content = rewrite_urls(content)

    # --- inline script at the bottom of the page ---
    inline_m = re.search(r"<script>\n(.*?)</script>\s*</body>", html, re.S)
    inline_js = inline_m.group(1) if inline_m else ""

    # --- css ---
    # @import URLs contain semicolons (font weight lists), so pull them out
    # with a paren-aware regex BEFORE the rule parser sees them
    css_parts, imports = [], []
    for f in page["css"]:
        raw = strip_comments(open(os.path.join(ROOT, f)).read())
        raw = rewrite_urls(raw)
        for imp in re.findall(r"@import\s+url\([^)]*\)[^;]*;", raw):
            imports.append(imp)
            raw = raw.replace(imp, "")
        css_parts.append("/* ---- %s ---- */\n" % f +
                         tx_rules(raw, page["scope"], page["pagecls"]))
    css = "\n".join(css_parts)

    # --- js ---
    js_parts = []
    for f in page["js"]:
        raw = open(os.path.join(ROOT, f)).read()
        if f.endswith("cosmos.js"):
            raw = raw.replace(
                "document.body.insertBefore(canvas, document.body.firstChild);",
                "var rmHost = document.getElementById('%s') || document.body;\n"
                "    rmHost.insertBefore(canvas, rmHost.firstChild);" % page["wrap_id"])
        js_parts.append("/* ---- %s ---- */\n%s" % (f, raw.strip()))
    js_parts.append("/* ---- page inline script ---- */\n" + inline_js.strip())
    js = "\n;\n".join(js_parts)

    header = (
        "<!-- ═══════════════════════════════════════════════════════════════\n"
        "     REGINA MARTINELLI — %s (Squarespace embed)\n"
        "     Paste this ENTIRE file into a single Code Block on the page.\n"
        "     Fully self-contained: content + styles + scripts.\n"
        "     No header / footer — Squarespace provides those.\n"
        "     Images served from GitHub Pages:\n"
        "       %s\n"
        "     Fonts load from Google Fonts (Cormorant Garamond + Inter Tight).\n"
        "     Tip: use a full-width page section with no padding for best fit.\n"
        "     Generated from %s — rebuild with tools/build-squarespace-embeds.py, do not\n"
        "     hand-edit the <style> block.\n"
        "     ═══════════════════════════════════════════════════════════════ -->\n"
        % (page["title"], BASE, page["src"]))

    out = (header +
           '<div id="%s">\n' % page["wrap_id"] +
           content + "\n</div>\n\n" +
           "<style>\n" +
           "\n".join(dict.fromkeys(imports)) + "\n" +
           "/* deliberate page-level rules: smooth anchor scroll + clip the\n"
           "   full-bleed sections' horizontal overflow */\n" +
           "html { scroll-behavior: smooth; scroll-padding-top: 90px; }\n" +
           "body { overflow-x: clip; }\n" +
           css + "\n</style>\n\n" +
           "<script>\n" + js + "\n</script>\n")

    path = os.path.join(ROOT, page["out"])
    open(path, "w").write(out)
    print("built %s  (%d KB)" % (page["out"], len(out) // 1024))


for p in PAGES:
    build(p)
