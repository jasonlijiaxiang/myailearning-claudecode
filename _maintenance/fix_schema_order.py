#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""OOXML 顺序契约修复器（零语义元素重定位；audit_pptx.py 检查项 12 的配套工具）。

修两类生成器遗留违规（2026-07-14「PowerPoint 弹修复」事故根因，以 PowerPoint
亲写文件为基线、ECMA-376 schema 校验定位）：
  1. presentation.xml: <p:notesMasterIdLst> 必须紧跟 <p:sldMasterIdLst> 之后
     （CT_Presentation 序列: sldMasterIdLst?, notesMasterIdLst?, handoutMasterIdLst?,
      sldIdLst?, sldSz?, notesSz?, ...）；
  2. slides/notesSlides/masters/layouts 的每个 <a:p>: <a:pPr> 必须是第一个子元素
     且只能有一个——杂散 pPr（生成脚本合并段落的遗留）删除、首个 pPr 归段首
     （CT_TextParagraph 序列: pPr?, (r|br|fld)*, endParaRPr?）。

只重排/删除违规位置的属性元素，不改任何文本与可见样式（渲染器本就忽略非法位置的
杂散 pPr；修复前后逐页文本与渲染像素应完全一致——2026-07-14 实测逐像素相同）。
仅重写有改动的部件，其余字节原样保留；幂等，可重复执行。

用法: python3 fix_schema_order.py <讲义.pptx> [更多.pptx ...]
依赖: lxml（无则退化提示）。退出码: 0=完成（含无需修复）, 1=出错。
"""
import sys
import re
import zipfile
import shutil

try:
    from lxml import etree
except ImportError:
    sys.exit("需要 lxml: pip install lxml")

NS_P = 'http://schemas.openxmlformats.org/presentationml/2006/main'
NS_A = 'http://schemas.openxmlformats.org/drawingml/2006/main'


def fix_presentation(data):
    root = etree.fromstring(data)
    nml = root.find(f'{{{NS_P}}}notesMasterIdLst')
    if nml is None:
        return None, 0
    kids = list(root)
    sml = root.find(f'{{{NS_P}}}sldMasterIdLst')
    want = (kids.index(sml) + 1) if sml is not None else 0
    if kids.index(nml) == want:
        return None, 0
    root.remove(nml)
    root.insert(want, nml)
    return root, 1


def fix_paragraphs(data):
    root = etree.fromstring(data)
    moved = dropped = 0
    for p in root.iter(f'{{{NS_A}}}p'):
        pprs = [c for c in p if c.tag == f'{{{NS_A}}}pPr']
        if not pprs:
            continue
        for extra in pprs[1:]:
            p.remove(extra)
            dropped += 1
        head = pprs[0]
        if list(p).index(head) != 0:
            p.remove(head)
            p.insert(0, head)
            moved += 1
    if moved or dropped:
        return root, moved, dropped
    return None, 0, 0


def serialize(root):
    body = etree.tostring(root, xml_declaration=False, encoding='unicode')
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' + body).encode('utf8')


def fix_pptx(path):
    zin = zipfile.ZipFile(path)
    replaced = {}
    st = dict(nml=0, moved=0, dropped=0)
    for part in zin.namelist():
        try:
            if part == 'ppt/presentation.xml':
                root, n = fix_presentation(zin.read(part))
                if n:
                    replaced[part] = serialize(root)
                    st['nml'] += n
            elif re.match(r'ppt/(slides|notesSlides|slideMasters|slideLayouts|notesMasters)/[^/]+\.xml$', part):
                root, m, d = fix_paragraphs(zin.read(part))
                if root is not None:
                    replaced[part] = serialize(root)
                    st['moved'] += m
                    st['dropped'] += d
        except etree.XMLSyntaxError:
            pass
    if not replaced:
        zin.close()
        return st, 0
    tmp = path + '.fixing'
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
        for it in zin.infolist():
            zout.writestr(it.filename, replaced.get(it.filename) or zin.read(it.filename))
    zin.close()
    shutil.move(tmp, path)
    return st, len(replaced)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    rc = 0
    for p in sys.argv[1:]:
        try:
            st, parts = fix_pptx(p)
            print(f"{p}: 重写部件 {parts} | notesMasterIdLst 归位 {st['nml']} "
                  f"| pPr 段首归位 {st['moved']} | 杂散 pPr 删除 {st['dropped']}")
        except Exception as e:
            print(f"{p}: 失败 {e}")
            rc = 1
    sys.exit(rc)
