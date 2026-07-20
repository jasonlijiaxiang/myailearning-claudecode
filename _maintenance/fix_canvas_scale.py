#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""fix_canvas_scale.py —— 画布错配页整页缩放修复（zip 级，零语义）。

问题：大画布（13.333×7.5in）坐标绘制的页被嫁接进小画布（10×5.625in）讲义，
右侧/底部内容被裁（2026-07-17 全面检查发现 9 册 78 页，根因=配图/插页管线
默认大画布、未按目标册 sldSz 适配；旧版 audit 只查负坐标不查右/下超界）。

修法：对指定放映序页，把该页 slide XML 内所有 <a:off>/<a:ext>/<a:chOff>/<a:chExt>
坐标、sz= 字号（floor 8.5pt 保 audit 硬下限）、a:ln w= 线宽、a:spcPts 段距
统一乘以 scale（默认 0.75 = 10/13.333），其余字节不动。

用法: python3 fix_canvas_scale.py <讲义.pptx> <页码,页码,...> [scale]
"""
import re, sys, zipfile, shutil

def scale_slide_xml(xml, k, sz_floor=850):
    def _off(m):
        return f'<a:off x="{round(int(m.group(1))*k)}" y="{round(int(m.group(2))*k)}"'
    def _ext(m):
        return f'<a:ext cx="{round(int(m.group(1))*k)}" cy="{round(int(m.group(2))*k)}"'
    def _choff(m):
        return f'<a:chOff x="{round(int(m.group(1))*k)}" y="{round(int(m.group(2))*k)}"'
    def _chext(m):
        return f'<a:chExt cx="{round(int(m.group(1))*k)}" cy="{round(int(m.group(2))*k)}"'
    def _sz(m):
        return f'sz="{max(sz_floor, round(int(m.group(1))*k))}"'
    def _lnw(m):
        return f'<a:ln w="{max(3175, round(int(m.group(1))*k))}"'
    def _spc(m):
        return f'<a:spcPts val="{round(int(m.group(1))*k)}"'
    xml = re.sub(r'<a:off x="(-?\d+)" y="(-?\d+)"', _off, xml)
    xml = re.sub(r'<a:ext cx="(\d+)" cy="(\d+)"', _ext, xml)
    xml = re.sub(r'<a:chOff x="(-?\d+)" y="(-?\d+)"', _choff, xml)
    xml = re.sub(r'<a:chExt cx="(\d+)" cy="(\d+)"', _chext, xml)
    xml = re.sub(r'sz="(\d+)"', _sz, xml)
    xml = re.sub(r'<a:ln w="(\d+)"', _lnw, xml)
    xml = re.sub(r'<a:spcPts val="(\d+)"', _spc, xml)
    return xml

def fix(path, pages, k=0.75):
    z = zipfile.ZipFile(path)
    rels = z.read('ppt/_rels/presentation.xml.rels').decode('utf8')
    pres = z.read('ppt/presentation.xml').decode('utf8')
    rid2t = dict(re.findall(r'Id="([^"]+)"[^>]*Target="([^"]+)"', rels))
    order = [rid2t[r].replace('slides/', 'ppt/slides/') for r in re.findall(r'<p:sldId[^>]*r:id="([^"]+)"', pres)]
    parts = {n: z.read(n) for n in z.namelist()}
    info = list(z.infolist()); z.close()
    for pg in pages:
        name = order[pg - 1]
        parts[name] = scale_slide_xml(parts[name].decode('utf8'), k).encode('utf8')
    tmp = path + '.scaled'
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in info:
            zout.writestr(item, parts[item.filename])
    shutil.move(tmp, path)
    return len(pages)

if __name__ == '__main__':
    path = sys.argv[1]
    pages = [int(x) for x in sys.argv[2].split(',')]
    k = float(sys.argv[3]) if len(sys.argv) > 3 else 0.75
    print(f'{path}: 缩放 {fix(path, pages, k)} 页 ×{k}')
