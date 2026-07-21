#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""样式契约门禁：kb.css 的类与页面的类必须互相认识（零第三方依赖）。

两条轴，都源自 2026-07-21 报文注释器事故：换肤时把深色底从 `pre` 挪到新类
`.wire-code`，但页面标记没同批改——CSS 有类、页面没用，浅字浮在浅底上，
可读性归零。门禁只查负坐标查不出这种"样式失联"，得直接对账：

  轴一 · 孤儿类：kb.css 里定义了、但全部页面/生成器/JS 都没用到的类。
        每个孤儿都是一次类名契约漂移的现场（要么页面丢了类，要么 CSS 该删）。
  轴二 · 版本戳：每页的 kb.css?v= 缓存戳与页面上可见的构建标记（.ver）必须
        全站一个值——改了 CSS 忘了齐戳，用户端就会出现"改了但看不见"。

用法: python3 _maintenance/check_css_classes.py
退出码: 0 = 通过, 1 = 有失联类或版本戳不齐。
"""
import glob
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# JS 运行期加的状态类、生成器循环里拼出来的类——静态扫描看不见，白名单登记。
# 新增运行期类时必须同步这里（否则轴一误报，宁可误报不可漏报）。
DYNAMIC = {
    "js-on", "on", "cur",                    # site.js：JS 就绪 / 注释器选中 / 目录高亮
    "f",                                     # 报文注释器字段（标记里有，JS 也会重写）
    "over", "none",                          # build.py 保鲜看板/关系网的行状态
    "ppt",                                   # build.py 知识地图「仅 PPT」标记：2026-07-21
                                             # 起 19/19 模块都有网页版，该分支暂不触发；
                                             # 新模块先落 PPT 面时会重新出现，故保留定义
    "stat", "k",                             # site.js 统计条 / 搜索结果注记
    "hue-0", "hue-1", "hue-2", "hue-3", "hue-4", "hue-5", "hue-6",  # 七层色相
}


def pages():
    return ([os.path.join(ROOT, p) for p in
             ("README.html", "开始使用.html", "PPT-version/README.html",
              "Web-version/index.html", "Web-version/fresh.html")]
            + sorted(glob.glob(os.path.join(ROOT, "Web-version/*/index.html")))
            + sorted(glob.glob(os.path.join(ROOT, "PPT-version/*/README.html")))
            + sorted(glob.glob(os.path.join(ROOT, "_prep/*.html"))))


def used_classes():
    used = set()
    srcs = pages() + [os.path.join(ROOT, "Web-version/build.py"),
                      os.path.join(ROOT, "Web-version/assets/site.js")]
    for f in srcs:
        t = io.open(f, encoding="utf-8", errors="replace").read()
        for m in re.findall(r'class="([^"]+)"', t):          # HTML 与生成器模板
            used.update(m.split())
        for m in re.findall(r'class=\\"([^\\"]+)\\"', t):    # Python 字符串里的转义形态
            used.update(m.split())
        for m in re.findall(r"className\s*[+]?=\s*['\"]([^'\"]+)['\"]", t):
            used.update(m.strip().split())
        for m in re.findall(r"classList\.(?:add|remove|toggle)\(['\"]([\w-]+)", t):
            used.add(m)
    return used


def check_orphans():
    css = io.open(os.path.join(ROOT, "_assets/kb.css"), encoding="utf-8").read()
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)          # 注释里的 .foo 不算
    defined = set(re.findall(r"\.([a-zA-Z][\w-]*)", css))
    orphans = sorted(defined - used_classes() - DYNAMIC)
    for c in orphans:
        print("  [失联] kb.css 定义了 .%s，但没有任何页面/生成器/JS 在用" % c)
    return not orphans


def check_stamps():
    stamps = {}
    for f in pages():
        t = io.open(f, encoding="utf-8").read()
        css_v = re.findall(r"kb\.css\?v=(\w+)", t)
        ver = re.findall(r'class="ver">v?(\w+)<', t)
        stamps[os.path.relpath(f, ROOT)] = (css_v[0] if css_v else "无",
                                            ver[0] if ver else "无")
    css_set = {v[0] for v in stamps.values()}
    ver_set = {v[1] for v in stamps.values()}
    ok = len(css_set) == 1 and len(ver_set) == 1 and "无" not in css_set | ver_set
    # 缓存戳（20260721f）尾号与构建标记（0721f）尾号必须同一个字母
    if ok and next(iter(css_set))[-1] != next(iter(ver_set))[-1]:
        ok = False
    if not ok:
        for f, (c, v) in sorted(stamps.items()):
            print("  [戳] %s: kb.css?v=%s / 标记 v%s" % (f, c, v))
    return ok


def main():
    ok1 = check_orphans()
    ok2 = check_stamps()
    if ok1 and ok2:
        print("样式契约检查通过：无失联类，%d 页版本戳一致。" % len(pages()))
        return 0
    print("样式契约检查不通过。")
    return 1


if __name__ == "__main__":
    sys.exit(main())
