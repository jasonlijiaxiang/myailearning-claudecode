#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""页数账实核对（knowledge-base-builder v3.9，零第三方依赖）。

讲义的"放映序页数"会同时挂在四处派生账上：模块 README「主力成品 NN 页」、
顶层 README 模块表 `✅（NN 页）`、`_prep/` 全库一页纸 `<span class="pg">`、
模块 MANIFEST.md（显式「讲义页数」字段，若有 + "最后更新"叙述文字）。
配图/删页只改了讲义本身，这四处账很容易漏刷——本脚本逐模块比对，只登记不改动。

规则:
  - 模块 = 根目录下非下划线开头、含 `<模块名>-讲义.pptx` 的一级子目录;
  - 放映序实测 = zip 内 `ppt/slides/slide[0-9]+.xml` 计数（与 audit_pptx.py 报告页数同口径）;
  - MANIFEST 的"最后更新"叙述文字里数字多、顺序未必按时间——用"实测值是否出现在文中"
    判定而非"取最后一个数字"，避免历史条目顺序颠倒导致的误报。

用法: python3 check_page_ledger.py [知识库根目录]   # 缺省为当前目录
退出码: 0 = 四账全部一致, 1 = 发现任一模块账实不符或读取失败。
"""
import os
import re
import sys
import zipfile

SLIDE_RE = re.compile(r'^ppt/slides/slide[0-9]+\.xml$')
MODULE_README_RE = re.compile(r'主力成品[，,][^0-9]{0,40}(\d+)\s*页')
# 双布局兼容：v4.0 起 _prep 的模块链接带 PPT-version/ 前缀（v4.0 只给顶层 README 加了这个
# 兼容、漏了 _prep，导致本账静默失配——2026-07-20 补）。
PREP_SPAN_TMPL = r'href="\.\./(?:PPT-version/)?{mod}/README\.html">[^<]*</a>\s*<span class="pg">(\d+)\s*页</span>'
MANIFEST_FIELD_RE = re.compile(r'\|\s*讲义页数\s*\|\s*(\d+)\s*\|')
MANIFEST_UPDATE_RE = re.compile(r'\|\s*最后更新\s*\|(.*?)\|\s*$', re.MULTILINE)
PAGE_NUM_RE = re.compile(r'(\d+)\s*页')


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
        if not os.path.isdir(d):
            continue
        if os.path.isfile(os.path.join(d, f"{name}-讲义.pptx")):
            mods.append(name)
    return mods


def actual_pages(pptx_path):
    with zipfile.ZipFile(pptx_path) as z:
        return sum(1 for n in z.namelist() if SLIDE_RE.match(n))


def check_module(lib_root, mod_root, mod):
    issues = []
    pptx_path = os.path.join(mod_root, mod, f"{mod}-讲义.pptx")
    try:
        actual = actual_pages(pptx_path)
    except (OSError, zipfile.BadZipFile) as e:
        return None, [f"讲义无法读取（{type(e).__name__}: {e}）"]

    readme_path = os.path.join(mod_root, mod, "README.html")
    readme_pages = set()
    if os.path.isfile(readme_path):
        html = open(readme_path, encoding="utf-8", errors="replace").read()
        readme_pages = set(int(x) for x in MODULE_README_RE.findall(html))
        if not readme_pages:
            issues.append("模块 README 未找到「主力成品 NN 页」标注")
        elif actual not in readme_pages:
            issues.append(f"模块 README 标 {sorted(readme_pages)} 页，与实测 {actual} 页不符")
    else:
        issues.append("模块 README.html 缺失")

    # 模块表账面：v4.1 起在 PPT 面总览 PPT-version/README.html，v4.0 及更早在库根 README.html。
    # 两处都找不到表行要报出来——静默跳过会让四账悄悄变三账（2026-07-20 拆总纲时识别）。
    top_readme_path = None
    for cand in (os.path.join(lib_root, "PPT-version", "README.html"),
                 os.path.join(lib_root, "README.html")):
        if os.path.isfile(cand):
            top_readme_path = cand
            break
    if top_readme_path:
        top_html = open(top_readme_path, encoding="utf-8", errors="replace").read()
        row_re = re.compile(
            r'<td><a href="\./(?:PPT-version/)?' + re.escape(mod) + r'/README\.html">[^<]*</a></td>(.*?)</tr>',
            re.DOTALL,
        )
        m = row_re.search(top_html)
        if not m:
            issues.append(f"面总览模块表未找到本模块行（查的是 {os.path.relpath(top_readme_path, lib_root)}）")
        else:
            pg = re.search(r'✅（(\d+)\s*页）', m.group(1))
            if not pg:
                issues.append("面总览模块表本行缺「✅（NN 页）」页数标注")
            elif int(pg.group(1)) != actual:
                issues.append(f"面总览模块表标 {pg.group(1)} 页，与实测 {actual} 页不符")
    else:
        issues.append("面总览 README.html 缺失（PPT-version/README.html 与库根 README.html 均无）")

    prep_path = os.path.join(lib_root, "_prep", "全库一页纸.html")
    if os.path.isfile(prep_path):
        prep_html = open(prep_path, encoding="utf-8", errors="replace").read()
        m = re.search(PREP_SPAN_TMPL.format(mod=re.escape(mod)), prep_html)
        if not m:
            issues.append("全库一页纸未找到本模块的页数标注")
        elif int(m.group(1)) != actual:
            issues.append(f"_prep/全库一页纸 标 {m.group(1)} 页，与实测 {actual} 页不符")

    manifest_path = os.path.join(mod_root, mod, "MANIFEST.md")
    if os.path.isfile(manifest_path):
        manifest = open(manifest_path, encoding="utf-8", errors="replace").read()
        fm = MANIFEST_FIELD_RE.search(manifest)
        if fm and int(fm.group(1)) != actual:
            issues.append(f"MANIFEST「讲义页数」字段写 {fm.group(1)}，与实测 {actual} 页不符")
        um = MANIFEST_UPDATE_RE.search(manifest)
        if um:
            narrative_pages = set(int(x) for x in PAGE_NUM_RE.findall(um.group(1)))
            if narrative_pages and actual not in narrative_pages:
                issues.append(
                    f"MANIFEST「最后更新」叙述未提及实测页数 {actual}"
                    f"（文中出现的页数：{sorted(narrative_pages)}）"
                )
    else:
        issues.append("MANIFEST.md 缺失")

    return actual, issues


def main(argv):
    root = argv[1] if len(argv) > 1 else "."
    if not os.path.isdir(root):
        print(f"目录不存在: {root}")
        return 1
    mod_root = resolve_module_root(root)
    mods = find_modules(mod_root)
    if not mods:
        print(f"{mod_root} 下未找到任何「<模块>/<模块>-讲义.pptx」")
        return 1
    print(f"扫描 {len(mods)} 个模块的页数账（模块README / 顶层README / 一页纸 / MANIFEST ×实测放映序）")
    bad = 0
    for mod in mods:
        actual, issues = check_module(root, mod_root, mod)
        if actual is None:
            print(f"\n===== {mod}: FAIL =====")
            for i in issues:
                print(f"  [错误] {i}")
            bad += 1
            continue
        if issues:
            print(f"\n===== {mod}（实测 {actual} 页）: 账实不符 =====")
            for i in issues:
                print(f"  [账实不符] {i}")
            bad += 1
        else:
            print(f"{mod}（{actual} 页）: 四账一致")
    print(f"\n共 {len(mods)} 个模块，{bad} 个存在账实不符。" if bad else f"\n全部 {len(mods)} 个模块四账一致。")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
