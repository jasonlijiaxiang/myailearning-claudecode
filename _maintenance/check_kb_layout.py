#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""库目录布局就位检查（knowledge-base-builder v4.0，零第三方依赖）。

网页版（Web 面）任务动手前必跑：确认库已按 v4.0 布局就位——
  库根/ KB-CONFIG.md + README.html（门户）
       PPT-version/<模块>/（讲义+MANIFEST+README+书单+raw-data，内容真源所在地）
       Web-version/（派生站点根，试点前允许为空）
       _prep/  _maintenance/  _reference/
旧布局（模块在库根）不算错误，报「待迁移」并指向
init-rules「v4.0 布局迁移」。

用法: python3 check_kb_layout.py [知识库根目录]   # 缺省为当前目录
退出码: 0 = v4.0 布局就位, 1 = 布局残缺（含迁移半途）, 2 = v3 旧布局待迁移。
"""
import os
import re
import sys

CONFIG_FIELDS = ("PPT 面根目录", "Web 面根目录")  # v4.3 起不再有「电子书馆藏」
MODULE_FILES = ("MANIFEST.md", "README.html", "电子书书单.md")


def modules_in(d):
    """d 下「含 <名>-讲义.pptx 的一级子目录」= 模块目录。"""
    out = []
    if not os.path.isdir(d):
        return out
    for name in sorted(os.listdir(d)):
        sub = os.path.join(d, name)
        if name.startswith((".", "_")) or not os.path.isdir(sub):
            continue
        if os.path.isfile(os.path.join(sub, f"{name}-讲义.pptx")):
            out.append(name)
    return out


def config_value(text, field):
    m = re.search(r"\|\s*" + re.escape(field) + r"\s*\|\s*([^|]+?)\s*\|", text)
    return m.group(1) if m else None


def main(argv):
    root = argv[1] if len(argv) > 1 else "."
    if not os.path.isdir(root):
        print(f"目录不存在: {root}")
        return 1
    root_mods = modules_in(root)
    pv = os.path.join(root, "PPT-version")
    pv_mods = modules_in(pv)

    # ── 布局代际判定
    if not os.path.isdir(pv):
        if root_mods:
            print(f"v3 旧布局：{len(root_mods)} 个模块在库根（{', '.join(root_mods[:5])}…），无 PPT-version/")
            print("→ 待迁移：按 init-rules「v4.0 布局迁移」执行，迁移收尾重跑本检查须为 0")
            return 2
        print("既无 PPT-version/ 也无根级模块——不是知识库根目录？")
        return 1

    # ── v4.0 就位检查
    errors, warns = [], []
    if root_mods:
        errors.append(f"迁移半途：PPT-version/ 已存在，但库根仍残留模块目录 {root_mods}")
    if not pv_mods:
        errors.append("PPT-version/ 下没有任何模块（<模块>/<模块>-讲义.pptx）")

    cfg_path = os.path.join(root, "KB-CONFIG.md")
    shared_ebooks = os.path.join(root, "_reference", "ebooks")
    if not os.path.isfile(cfg_path):
        errors.append("KB-CONFIG.md 缺失")
    else:
        cfg = open(cfg_path, encoding="utf-8", errors="replace").read()
        for f in CONFIG_FIELDS:
            if config_value(cfg, f) is None:
                errors.append(f"KB-CONFIG 缺字段「{f}」（v4.0 布局迁移时补写）")

    for mod in pv_mods:
        d = os.path.join(pv, mod)
        for f in MODULE_FILES:
            if not os.path.isfile(os.path.join(d, f)):
                errors.append(f"{mod}/ 缺 {f}")
        if not os.path.isdir(os.path.join(d, "raw-data")):
            errors.append(f"{mod}/ 缺 raw-data/")
        if os.path.isdir(os.path.join(d, "ebooks")):
            errors.append(f"{mod}/ebooks/ 仍在库内——v4.3 起书单只列链接、不落地文件，"
                          f"按 init-rules 第 3 步先补出处再撤除")

    # v4.3：库内不应再有电子书文件；存在则提示撤除（非硬错误，撤除需先补出处）
    if os.path.isdir(shared_ebooks):
        warns.append(f"{os.path.relpath(shared_ebooks, root)} 仍存在——v4.3 起书单只列链接，"
                     f"按 init-rules 第 3 步先补出处再撤除")
    if not os.path.isdir(os.path.join(root, "Web-version")):
        warns.append("Web-version/ 尚未创建（试点前建空目录即可）")
    for d in ("_prep", "_maintenance", "_reference"):
        if not os.path.isdir(os.path.join(root, d)):
            errors.append(f"{d}/ 缺失")
    if not os.path.isfile(os.path.join(root, "README.html")):
        warns.append("库根 README.html（总纲）缺失")
    if not os.path.isfile(os.path.join(root, "PPT-version", "README.html")):
        warns.append("PPT-version/README.html（PPT 面总览）缺失——v4.1 起模块表住这里，"
                     "check_page_ledger 的模块表账也从这里取")

    print(f"v4.0 布局检查：PPT-version 下 {len(pv_mods)} 个模块")
    for e in errors:
        print(f"  [错误] {e}")
    for w in warns:
        print(f"  [提示] {w}")
    if errors:
        print(f"\n布局残缺：{len(errors)} 项错误——迁移未完成或结构被破坏，修复后重跑")
        return 1
    print("\nv4.0 布局就位" + ("（另有提示项，见上）" if warns else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
