#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""书单账实核对（knowledge-base-builder v4.3，零第三方依赖）。

**v4.3 判据变更**：库不再下载电子书到本地（原 `_reference/ebooks/` 已于 2026-07-20 撤除，
71 份出处存档见 `_maintenance/2026-07-20-原电子书馆藏出处存档.md`）。书单的"账"从此不是
"文件在不在"，而是"每条资料是否都给出了可用的正规渠道链接"。故本脚本改查三件：

  1. 每个条目行的「获取方式」列至少含一个 http(s) 链接——没链接的条目等于没法取用;
  2. 书单不得残留本地馆藏痕迹（`_reference/ebooks`、`✅ 已下载`、指向 .pdf/.zip 的相对路径）
     ——馆藏撤除后这类残留一律是坏账，读者会照着去找一个不存在的文件;
  3. 链接形态基本合法（有 host、非明显占位符）。

不做联网可达性探测：巡检要求纯离线秒级，且 404 与限流难以区分；链接失效由季度巡检的
「建议复查日」人工轴兜底。

用法: python3 check_ebook_ledger.py [知识库根目录]   # 缺省为当前目录
退出码: 0 = 全部模块账实一致, 1 = 发现任一模块账实不符或读取失败。
"""
import os
import re
import sys

URL_RE = re.compile(r'https?://([^\s，,）)、|]+)')
# 馆藏撤除后的坏账痕迹
STALE_PATTERNS = [
    (re.compile(r'_reference/ebooks'), "残留馆藏路径 _reference/ebooks"),
    (re.compile(r'✅\s*(?:已下载|见|规范已下载)'), "残留「✅ 已下载」标记"),
    (re.compile(r'(?:\.\./|\./)[^\s|`]+\.(?:pdf|zip)', re.I), "残留指向本地文件的相对路径"),
]
PLACEHOLDER_RE = re.compile(r'(?:example\.com|localhost|TODO|xxx)', re.I)


def resolve_module_root(root):
    """v4.0 双布局：库根存在 PPT-version/ 时以它为模块根，否则模块就在库根（v3 布局）。"""
    pv = os.path.join(root, "PPT-version")
    return pv if os.path.isdir(pv) else root


def find_modules(root):
    mods = []
    for name in sorted(os.listdir(root)):
        if name.startswith((".", "_")):
            continue
        d = os.path.join(root, name)
        if os.path.isfile(os.path.join(d, "电子书书单.md")):
            mods.append(name)
    return mods


def is_entry_row(line):
    """条目行 = 以 | 开头、首格为纯数字的表格行（排除表头与分隔行）。"""
    if not line.strip().startswith("|"):
        return False
    cells = [c.strip() for c in line.strip().strip("|").split("|")]
    return bool(cells) and cells[0].isdigit()


def check_module(mod_root, mod):
    path = os.path.join(mod_root, mod, "电子书书单.md")
    text = open(path, encoding="utf-8", errors="replace").read()
    issues = []
    n_entries = 0

    for i, line in enumerate(text.split("\n"), 1):
        for rx, label in STALE_PATTERNS:
            if rx.search(line):
                issues.append(f"第 {i} 行：{label}")
        if not is_entry_row(line):
            continue
        n_entries += 1
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        num, acquire = cells[0], cells[-1]
        m = URL_RE.search(acquire)
        if not m:
            issues.append(f"条目 {num}：「获取方式」列无链接")
        elif PLACEHOLDER_RE.search(m.group(0)) or "." not in m.group(1).split("/")[0]:
            issues.append(f"条目 {num}：链接疑似占位或非法（{m.group(0)[:60]}）")

    if n_entries == 0:
        issues.append("未解析到任何条目行（表格结构可能已变）")
    return n_entries, issues


def main(argv):
    root = argv[1] if len(argv) > 1 else "."
    if not os.path.isdir(root):
        print(f"目录不存在: {root}")
        return 1
    mod_root = resolve_module_root(root)
    mods = find_modules(mod_root)
    if not mods:
        print(f"{mod_root} 下未找到任何「<模块>/电子书书单.md」")
        return 1

    legacy = os.path.join(root, "_reference", "ebooks")
    if os.path.isdir(legacy):
        print(f"[提示] {os.path.relpath(legacy, root)} 仍存在——v4.3 起库不再落地电子书文件，"
              f"确认无用后可删除（出处存档见 _maintenance/）。")

    print(f"扫描 {len(mods)} 个模块的书单（判据：每条给出正规渠道链接 + 无本地馆藏残留）")
    bad = 0
    total = 0
    for mod in mods:
        n, issues = check_module(mod_root, mod)
        total += n
        if issues:
            print(f"\n===== {mod}（{n} 条）: 账实不符 =====")
            for it in issues:
                print(f"  [账实不符] {it}")
            bad += 1
        else:
            print(f"{mod}（{n} 条）: 条条有链接，无残留")
    print(f"\n共 {len(mods)} 个模块 {total} 条资料，{bad} 个模块存在账实不符。"
          if bad else f"\n全部 {len(mods)} 个模块（{total} 条资料）账实一致。")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
