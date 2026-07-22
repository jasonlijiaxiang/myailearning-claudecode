#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""消除「中文—源码换行—中文」渲染出的可见空格（零第三方依赖）。

**病**：HTML 把源码里的「换行 + 缩进」折叠成**一个空格**。这个空格夹在两个汉字之间会被
真的画出来——浏览器实测：正常两个汉字 29px，跨源码换行处 33px，每处多出约 4px。读者看到的
就是「存太疏一崩重算 几小时」「有无自愈的 差距」这种莫名其妙的空格。2026-07-22 全库实测
1716 处，是用户翻页时肉眼发现的。

**药**：把这个换行**删掉**（把两行接起来），别的换行一概不动。

为什么不是「把断行挪到标点后」：标点后换行照样折叠出一个空格，只是没那么扎眼——治标不治本
（第一版这么写，还因为「挪完仍命中同一条规则」死循环了）。
为什么不是「全段拉成一行」：没必要——**落在中英文边界的换行是安全的**，那里的空格本来就该有
（本库行文规范就是「MCP 是一套…」这样中英之间留空格）。只合该合的，行长只在中文密集处增长。
为什么不是「用 <!--\\n--> 吞空白」：实测只有 30% 的坏断点附近有中英边界可挪，
其余 1000+ 处都要塞注释，源码噪音太大。

**不碰的区域**：`<pre>`（空白有意义）、`<script>`/`<style>`（不是正文）、`<svg>`（另有排版）。

用法:
    python3 fix_cjk_wrap.py            # 预演：只报数，不落盘
    python3 fix_cjk_wrap.py --apply    # 落盘
    python3 fix_cjk_wrap.py --check    # 门禁模式：有残留即退出码 1
退出码: 0 = 无残留 / 已修完, 1 = --check 下仍有残留。
"""
import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CJK = r"[㐀-鿿々〆－—’”]"
CJK_PUNCT = "。！？；：，、）」』】·「（【“‘"
C = "(?:" + CJK + "|[" + CJK_PUNCT + "])"
# 行内标签不产生断字机会，跨过它的换行照样折叠成一个可见空格
INLINE = r"(?:a|b|strong|code|span|em|i|abbr|small|sup|sub)"
# 三种形态，渲染出来是同一个毛病：
#   ①中文 ⏎ 中文        ②中文 ⏎ <a…>中文        ③中文</a> ⏎ 中文
BAD = re.compile(
    "(?P<a>" + C + "|" + C + "</" + INLINE + ">)"
    "\n[ \t]*"
    "(?P<b>" + C + "|<" + INLINE + r"\b[^>]*>" + C + ")")
# 空白有意义或不属正文的区段，整块跳过
GUARD = re.compile(r"<pre\b.*?</pre>|<script\b.*?</script>|<style\b.*?</style>|<svg\b.*?</svg>",
                   re.S | re.I)


def pages():
    return ([os.path.join(ROOT, p) for p in
             ("README.html", "开始使用.html", "PPT-version/README.html",
              "Web-version/index.html", "Web-version/fresh.html",
              "Web-version/qa/index.html")]
            + sorted(glob.glob(os.path.join(ROOT, "Web-version/*/index.html")))
            + sorted(glob.glob(os.path.join(ROOT, "PPT-version/*/README.html")))
            + sorted(glob.glob(os.path.join(ROOT, "_prep/*.html"))))


def split_guarded(text):
    """切成 [(是否受保护, 片段)…]，只在未保护的片段上动手。"""
    out, last = [], 0
    for m in GUARD.finditer(text):
        if m.start() > last:
            out.append((False, text[last:m.start()]))
        out.append((True, m.group(0)))
        last = m.end()
    out.append((False, text[last:]))
    return out


def fix_chunk(chunk):
    """反复合行，直到本片段里没有「中文—换行—中文」。每次只删那一个换行。"""
    n = 0
    while True:
        m = BAD.search(chunk)
        if not m:
            return chunk, n
        chunk = chunk[:m.end("a")] + chunk[m.start("b"):]
        n += 1


def process(text):
    parts, fixed = [], 0
    for guarded, chunk in split_guarded(text):
        if guarded:
            parts.append(chunk)
            continue
        new, n = fix_chunk(chunk)
        parts.append(new)
        fixed += n
    return "".join(parts), fixed


def count_bad(text):
    return sum(len(BAD.findall(c)) for g, c in split_guarded(text) if not g)


def main(argv):
    apply = "--apply" in argv
    check = "--check" in argv
    before_total = after_total = changed = 0
    worst, longest = [], 0
    for f in pages():
        try:
            src = io.open(f, encoding="utf-8").read()
        except OSError:
            continue
        before = count_bad(src)
        before_total += before
        if not before:
            continue
        if check:
            worst.append((before, os.path.relpath(f, ROOT)))
            after_total += before
            continue
        new, fixed = process(src)
        after = count_bad(new)
        after_total += after
        longest = max(longest, max((len(l) for l in new.split("\n")), default=0))
        if new != src:
            changed += 1
            if apply:
                io.open(f, "w", encoding="utf-8").write(new)
        print("  %-42s %4d → %d" % (os.path.relpath(f, ROOT), before, after))

    if check:
        if after_total:
            print("中文之间仍有 %d 处源码换行，会在页面上渲染成可见空格：" % after_total)
            for n, f in sorted(worst, reverse=True)[:10]:
                print("  %4d  %s" % (n, f))
            print("跑 `python3 _maintenance/fix_cjk_wrap.py --apply` 修。")
            return 1
        print("中文之间无源码换行，不会渲染出多余空格。")
        return 0

    print("\n合计 %d 处 → %d 处（%d 个文件；合行后最长源码行 %d 字符）。%s"
          % (before_total, after_total, changed, longest,
             "已落盘。" if apply else "预演，未落盘（加 --apply）。"))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
