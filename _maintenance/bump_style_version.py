#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""样式版本戳升档：把全站的 `kb.css?v=YYYYMMDDx` 与可见构建标记 `.ver` 一起推进一档。

为什么要有它：改了 `_assets/kb.css` 不齐戳，用户端就会「改了但看不见」（浏览器吃缓存）。
`check_css_classes.py` 只**校验**两者全站一致，不提供升档操作——于是每轮换肤都手写一遍
同样的批量替换，e→f→g 三轮各写一次。同一工序重复第三次就该固化（core-rules §五）。

两个戳必须尾号同字母：缓存戳 `20260721g` ←→ 构建标记 `v0721g`（门禁按此校验）。

用法:
    python3 bump_style_version.py            # 预演：只打印将要改什么，不落盘
    python3 bump_style_version.py --apply    # 落盘
    python3 bump_style_version.py --apply --date 20260801   # 同时换日期（尾号从 a 起）
落盘后请接着跑 check_css_classes.py 确认全站一致。
退出码: 0 正常, 1 现状不一致（先修再升档）或无处可改。
"""

import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def pages():
    """与 check_css_classes.py 同一份页面清单——两边必须看同一批文件。"""
    return ([os.path.join(ROOT, p) for p in
             ("README.html", "开始使用.html", "PPT-version/README.html",
              "Web-version/index.html", "Web-version/fresh.html")]
            + sorted(glob.glob(os.path.join(ROOT, "Web-version/*/index.html")))
            + sorted(glob.glob(os.path.join(ROOT, "PPT-version/*/README.html")))
            + sorted(glob.glob(os.path.join(ROOT, "_prep/*.html"))))


def current():
    """读出全站现行的 (缓存戳, 构建标记)，不一致就报错——升档前现状必须是齐的。"""
    css, ver = set(), set()
    for f in pages():
        t = io.open(f, encoding="utf-8").read()
        css.update(re.findall(r"kb\.css\?v=(\w+)", t))
        ver.update(re.findall(r'class="ver">v?(\w+)<', t))
    if len(css) != 1 or len(ver) != 1:
        print("现状就不一致，先跑 check_css_classes.py 修齐再升档：")
        print("  缓存戳:", sorted(css) or "无", " 构建标记:", sorted(ver) or "无")
        return None, None
    return css.pop(), ver.pop()


def next_stamp(css_v, date=None):
    """20260721g → 20260721h；跨天或指定日期则从 a 起。"""
    m = re.match(r"^(\d{8})([a-z])$", css_v)
    if not m:
        print("缓存戳格式不认识（期望 YYYYMMDDx）：", css_v)
        return None, None
    day, letter = m.groups()
    if date and date != day:
        return date + "a", date[4:] + "a"
    if letter == "z":
        print("尾号已到 z，请换日期：--date YYYYMMDD")
        return None, None
    nxt = chr(ord(letter) + 1)
    return day + nxt, day[4:] + nxt


def main():
    apply = "--apply" in sys.argv
    date = None
    if "--date" in sys.argv:
        i = sys.argv.index("--date")
        date = sys.argv[i + 1] if i + 1 < len(sys.argv) else None
        if not (date and re.match(r"^\d{8}$", date)):
            print("--date 要跟 YYYYMMDD")
            return 1

    css_v, ver_v = current()
    if not css_v:
        return 1
    new_css, new_ver = next_stamp(css_v, date)
    if not new_css:
        return 1

    print("升档：kb.css?v=%s → %s ；构建标记 v%s → v%s" % (css_v, new_css, ver_v, new_ver))
    changed = 0
    for f in pages():
        t = io.open(f, encoding="utf-8").read()
        n = t.replace("kb.css?v=" + css_v, "kb.css?v=" + new_css)
        # 脚本同戳（2026-07-22 补）：此前只有 CSS 带戳，site.js / data.js 裸引，
        # 改完 JS 浏览器照吃旧缓存——同一个「改了但看不见」的坑，之前只堵了一半。
        n = n.replace("site.js?v=" + css_v, "site.js?v=" + new_css)
        n = n.replace("data.js?v=" + css_v, "data.js?v=" + new_css)
        n = n.replace('class="ver">v' + ver_v + "<", 'class="ver">v' + new_ver + "<")
        n = n.replace('class="ver">' + ver_v + "<", 'class="ver">' + new_ver + "<")
        if n != t:
            changed += 1
            if apply:
                io.open(f, "w", encoding="utf-8").write(n)
    if not changed:
        print("没有文件需要改——检查戳是否已经是新值。")
        return 1
    print(("已改 %d 个文件。接着跑 check_css_classes.py 复核。" if apply
           else "预演：将改 %d 个文件（加 --apply 落盘）。") % changed)
    return 0


if __name__ == "__main__":
    sys.exit(main())
