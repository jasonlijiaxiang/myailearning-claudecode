#!/usr/bin/env python3
"""讲义文本提取器：按**放映序**导出 .pptx 每页的可见文字。

为什么要有它：网页版的「覆盖与缺口矩阵」第一步是通读讲义每一页；此前每册都现写一段
zip+正则，到第八批已重写六次（同一工序重复第三次就该固化——见 core-rules §五）。

为什么不能按文件名排序（唯一的坑，务必保留）：
    ppt/slides/slide12.xml 的数字是**文件号**，不是放映序。用 kb_insert.py 插过页的
    册子两者会错位——2026-07-17 增章批次即因此误报过页码。放映序的唯一权威是
    ppt/presentation.xml 的 <p:sldIdLst>，本脚本按它 → rels → partname 解析。

零第三方依赖（只用标准库），与本技能其余脚本同口径。

用法:
    python3 kb_deck_text.py <讲义.pptx>                # 打到标准输出
    python3 kb_deck_text.py <讲义.pptx> -o out.txt     # 写文件
    python3 kb_deck_text.py <讲义.pptx> --page 12      # 只看某一页（放映序）
    python3 kb_deck_text.py <讲义.pptx> --notes        # 一并导出演讲者备注

输出格式（每页一段，便于人读与后续 grep）:
    === p3 ===
    这一页的第一行文字
    第二行……
退出码: 0 正常, 1 文件不可用或结构异常。
"""

import argparse
import os
import re
import sys
import xml.etree.ElementTree as ET
import zipfile

NS_P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
NS_R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
NS_PKG_REL = "{http://schemas.openxmlformats.org/package/2006/relationships}"
NS_A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"


def show_order_parts(z):
    """返回放映序的 slide partname 列表（如 ppt/slides/slide1.xml）。"""
    pres = ET.fromstring(z.read("ppt/presentation.xml"))
    rels = ET.fromstring(z.read("ppt/_rels/presentation.xml.rels"))
    target = {}
    for rel in rels.iter(NS_PKG_REL + "Relationship"):
        target[rel.get("Id")] = rel.get("Target")
    parts = []
    lst = pres.find(NS_P + "sldIdLst")
    if lst is None:
        raise ValueError("presentation.xml 里没有 sldIdLst——文件可能不是标准 pptx")
    for sld in lst.findall(NS_P + "sldId"):
        rid = sld.get(NS_R + "id")
        t = target.get(rid)
        if not t:
            continue
        t = t[3:] if t.startswith("../") else t
        parts.append(t if t.startswith("ppt/") else "ppt/" + t)
    return parts


def texts_of(z, partname):
    """取一页的可见文字：按 <a:p> 段落聚合，段内 <a:t> 直接相连（同段的分 run 要合并）。"""
    try:
        root = ET.fromstring(z.read(partname))
    except KeyError:
        return []
    lines = []
    for para in root.iter(NS_A + "p"):
        buf = "".join(t.text or "" for t in para.iter(NS_A + "t"))
        buf = buf.strip()
        if buf:
            lines.append(buf)
    return lines


def notes_of(z, partname):
    """取该页的演讲者备注（没有就返回空列表）。"""
    base = os.path.basename(partname)
    rels_path = "ppt/slides/_rels/%s.rels" % base
    try:
        rels = ET.fromstring(z.read(rels_path))
    except KeyError:
        return []
    for rel in rels.iter(NS_PKG_REL + "Relationship"):
        if rel.get("Type", "").endswith("/notesSlide"):
            t = rel.get("Target")
            t = t.replace("../", "ppt/")
            return texts_of(z, t)
    return []


def main():
    ap = argparse.ArgumentParser(description="按放映序导出 pptx 每页文字")
    ap.add_argument("pptx")
    ap.add_argument("-o", "--out", help="写入文件（默认打到标准输出）")
    ap.add_argument("--page", type=int, help="只导出某一页（放映序，从 1 起）")
    ap.add_argument("--notes", action="store_true", help="一并导出演讲者备注")
    a = ap.parse_args()

    if not os.path.isfile(a.pptx):
        print("找不到文件: %s" % a.pptx, file=sys.stderr)
        return 1
    try:
        z = zipfile.ZipFile(a.pptx)
    except zipfile.BadZipFile:
        print("不是有效的 pptx（zip 打不开）: %s" % a.pptx, file=sys.stderr)
        return 1

    with z:
        try:
            parts = show_order_parts(z)
        except (KeyError, ValueError) as e:
            print("解析放映序失败: %s" % e, file=sys.stderr)
            return 1

        blocks = []
        for i, part in enumerate(parts, 1):
            if a.page and i != a.page:
                continue
            lines = texts_of(z, part)
            head = "=== p%d ===" % i
            body = "\n".join(lines) if lines else "（本页无文字框）"
            if a.notes:
                nt = notes_of(z, part)
                if nt:
                    body += "\n--- 备注 ---\n" + "\n".join(nt)
            blocks.append(head + "\n" + body)

    text = "\n\n".join(blocks) + "\n"
    if a.out:
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(text)
        print("已写出 %s（%d 页，放映序）" % (a.out, len(blocks)))
    else:
        sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
