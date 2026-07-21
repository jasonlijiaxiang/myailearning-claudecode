#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""门户面坏链检查（knowledge-base-builder v6.1，零第三方依赖）。

检查知识库全部 HTML 门户页（顶层/模块 README、_prep/ 取用页）里的**相对链接**
（href / src）是否都指向真实存在的文件——模块改名、文件挪位、"深潜→"源指针失效
都靠它兜底。巡检呈现轴顺带跑（见 patrol-rules.md）。

规则:
  - 只查相对链接; http(s)/mailto/tel/data:/纯锚点(#...) 跳过(外链探活归书单轴, 可选);
  - ?query 与 #fragment 剥掉后按文件存在性判定;
  - **目录链接判坏**（v6.1）: href 指向目录（如 "./mcp/"）在 Web 服务器上会自动打开
    index.html，但 file:// 下不会——浏览器只显示文件列表。2026-07-21 用户点 MCP 卡片
    "点不进去"即此因，而旧判据只看"路径存在"，目录存在照样放行;
  - 跳过留痕与外部目录: raw-data/(含 history/)、_reference/、_skill-source/
    ——历史快照里的链接停在当年状态是设计使然, 不算坏链。

用法: python3 check_html_links.py [知识库根目录]   # 缺省为当前目录
退出码: 0 = 无坏链, 1 = 有坏链或读取失败。
"""
import os
import re
import sys
import urllib.parse

EXCLUDE_DIRS = {"raw-data", "_reference", "_skill-source", "history"}
LINK_RE = re.compile(r'(?:href|src)\s*=\s*["\']([^"\']+)["\']', re.I)
SKIP_PREFIX = ("http://", "https://", "mailto:", "tel:", "data:", "javascript:", "#")


def check(root):
    broken = []          # (html文件, 链接原文, 解析后的目标)
    n_files = n_links = 0
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith(".")]
        for fn in filenames:
            if not fn.lower().endswith((".html", ".htm")):
                continue
            path = os.path.join(dirpath, fn)
            n_files += 1
            try:
                html = open(path, encoding="utf8", errors="replace").read()
            except OSError as e:
                broken.append((path, f"<无法读取: {e}>", ""))
                continue
            for link in LINK_RE.findall(html):
                link = link.strip()
                if not link or link.lower().startswith(SKIP_PREFIX):
                    continue
                n_links += 1
                target = urllib.parse.unquote(link.split("#", 1)[0].split("?", 1)[0])
                if not target:      # 纯 "#xxx" 已被上面跳过, 这里是 "?x" 之类
                    continue
                resolved = os.path.normpath(os.path.join(dirpath, target))
                if not os.path.exists(resolved):
                    broken.append((path, link, resolved))
                elif os.path.isdir(resolved):
                    broken.append((path, link,
                                   resolved + "（目录——file:// 下不会自动打开 index.html，"
                                              "请链到具体文件）"))
    return n_files, n_links, broken


def main(argv):
    root = argv[1] if len(argv) > 1 else "."
    if not os.path.isdir(root):
        print(f"目录不存在: {root}")
        return 1
    n_files, n_links, broken = check(root)
    print(f"扫描 {n_files} 个 HTML、{n_links} 条相对链接（raw-data/_reference 等留痕目录不查）")
    if not broken:
        print("全部相对链接可解析，无坏链。")
        return 0
    print(f"\n发现 {len(broken)} 条坏链：")
    for src, link, resolved in broken:
        print(f"  [坏链] {src}\n         → {link}（解析为 {resolved}，文件不存在）")
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
