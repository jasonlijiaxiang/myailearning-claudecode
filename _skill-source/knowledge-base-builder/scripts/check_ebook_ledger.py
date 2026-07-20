#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""书单账实核对（knowledge-base-builder v3.5，零第三方依赖）。

逐模块核对 `电子书书单.md` 里标"✅ 已下载"的行 ↔ `ebooks/` 实际文件清单：
书单称已下载但文件缺失、或文件存在但书单未标记，都登记出来。纯离线、只读，不改书单。

用法: python3 check_ebook_ledger.py [知识库根目录]   # 缺省为当前目录
退出码: 0 = 全部模块账实一致, 1 = 发现任一模块账实不符或读取失败。
"""
import os
import re
import sys

FILENAME_RE = re.compile(r'([A-Za-z0-9_\-\.]+\.(?:pdf|zip))', re.I)
PATHLIKE_RE = re.compile(r'((?:\.\./|\./)[A-Za-z0-9_\-\./\u4e00-\u9fff]+\.(?:pdf|zip))', re.I)


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


def check_module(mod_root, mod, global_claimed):
    """两种布局通吃：优先按书单行内相对路径解析存在性；模块本地 ebooks/ 存在时
    另做本地孤儿检查（v3 布局），否则孤儿检查交给馆藏级全局比对（v4.0 布局）。"""
    mod_dir = os.path.join(mod_root, mod)
    list_path = os.path.join(mod_dir, "电子书书单.md")
    text = open(list_path, encoding="utf-8", errors="replace").read()
    claimed_names, missing_on_disk = set(), []
    n_marked = 0
    for line in text.split("\n"):
        if "✅" in line and "已下载" in line:
            n_marked += 1
            paths = PATHLIKE_RE.findall(line)
            if paths:
                for rel in paths:
                    resolved = os.path.normpath(os.path.join(mod_dir, rel))
                    claimed_names.add(os.path.basename(resolved))
                    global_claimed.add(os.path.basename(resolved))
                    if not os.path.isfile(resolved):
                        missing_on_disk.append(rel)
            else:
                for fn in FILENAME_RE.findall(line):
                    claimed_names.add(os.path.basename(fn))
                    global_claimed.add(os.path.basename(fn))
                    if not os.path.isfile(os.path.join(mod_dir, "ebooks", fn)):
                        missing_on_disk.append(fn)

    ebooks_dir = os.path.join(mod_dir, "ebooks")
    if os.path.isdir(ebooks_dir):
        actual = set(f for f in os.listdir(ebooks_dir) if not f.upper().startswith("README"))
        extra_on_disk = sorted(actual - claimed_names)
        return n_marked, len(actual), sorted(missing_on_disk), extra_on_disk
    # v4.0 布局：无本地 ebooks/，行内路径已逐条验证；孤儿检查在 main 里做馆藏级比对
    return n_marked, None, sorted(missing_on_disk), []


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
    print(f"扫描 {len(mods)} 个模块的书单账（✅ 已下载标记 ↔ 实际文件，双布局）")
    bad = 0
    global_claimed = set()
    for mod in mods:
        n_marked, n_actual, missing, extra = check_module(mod_root, mod, global_claimed)
        if missing or extra:
            tag = f"实际{n_actual}" if n_actual is not None else "馆藏模式"
            print(f"\n===== {mod}（书单✅{n_marked} / {tag}）: 账实不符 =====")
            if missing:
                print(f"  [账实不符] 书单标✅已下载但文件缺失: {missing}")
            if extra:
                print(f"  [账实不符] 文件存在但书单未标✅: {extra}")
            bad += 1
        else:
            tag = f"实际{n_actual}" if n_actual is not None else "行内路径逐条验证"
            print(f"{mod}（✅{n_marked} / {tag}）: 账实一致")
    shared = os.path.join(root, "_reference", "ebooks")
    if os.path.isdir(shared):
        orphan = sorted(f for f in os.listdir(shared)
                        if not f.upper().startswith("README") and f not in global_claimed)
        if orphan:
            print(f"\n[账实不符] 馆藏 _reference/ebooks/ 有 {len(orphan)} 个文件未被任何书单标✅: {orphan[:10]}")
            bad += 1
    print(f"\n共 {len(mods)} 个模块，{bad} 个存在账实不符。" if bad else f"\n全部 {len(mods)} 个模块账实一致。")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
