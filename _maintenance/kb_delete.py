"""通用 zip 级删页：kb_insert 的逆操作。删掉指定放映页，其余部件字节一律不动，
不用 python-pptx round-trip 整包重存。app.xml 单对/多对、中英文（幻灯片标题/Slide Titles）通吃。

  kb_delete_pages(src, dst, del_show_pages)   del_show_pages = 1-based 放映页号列表
用途：配图"替代型"收尾——信息图版嫁接进来后，删掉被它替代的源文字页。
"""
import zipfile, re
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape

TITLE_NAMES = ("幻灯片标题", "Slide Titles")

def _big_title(z, target):
    ts = [t.strip() for t in re.findall(r'<a:t>(.*?)</a:t>', z.read("ppt/"+target).decode())]
    for t in ts:
        if t and not re.match(r'^第\s*\d+\s*章', t) and '讲义' not in t and len(t) >= 4:
            return t
    return next((t for t in ts if t), "(空)")

def kb_delete_pages(src, dst, del_show_pages):
    z = zipfile.ZipFile(src)
    rid2t = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read("ppt/_rels/presentation.xml.rels"))}
    pres = z.read("ppt/presentation.xml").decode()
    show_rids = re.findall(r'<p:sldId\b[^>]*\br:id="([^"]+)"', pres)
    N_old = len(show_rids); del_set = set(del_show_pages)
    del_rids = {show_rids[p-1] for p in del_show_pages}
    keep_rids = [r for i, r in enumerate(show_rids, 1) if i not in del_set]
    del_targets = {rid2t[r] for r in del_rids}
    del_parts = {"ppt/"+t for t in del_targets}
    del_relsf = {"ppt/slides/_rels/"+t.split("/")[-1]+".rels" for t in del_targets}
    N = len(keep_rids); keep_titles = [_big_title(z, rid2t[r]) for r in keep_rids]

    pres2 = re.sub(r'<p:sldId\b[^>]*\br:id="([^"]+)"[^>]*/>',
                   lambda m: "" if m.group(1) in del_rids else m.group(0), pres)
    rels2 = re.sub(r'<Relationship\b[^>]*\bId="([^"]+)"[^>]*/>',
                   lambda m: "" if m.group(1) in del_rids else m.group(0),
                   z.read("ppt/_rels/presentation.xml.rels").decode())
    ct2 = re.sub(r'<Override\b[^>]*\bPartName="([^"]+)"[^>]*/>',
                 lambda m: "" if m.group(1).lstrip("/") in del_parts else m.group(0),
                 z.read("[Content_Types].xml").decode())

    app = z.read("docProps/app.xml").decode()
    app = re.sub(r'<Slides>\d+</Slides>', f'<Slides>{N}</Slides>', app)
    hp = re.search(r'<HeadingPairs>.*?</HeadingPairs>', app, re.S).group(0)
    variants = re.findall(r'<vt:variant><vt:lpstr>(.*?)</vt:lpstr></vt:variant><vt:variant><vt:i4>(\d+)</vt:i4></vt:variant>', hp)
    other_sum = sum(int(n) for nm, n in variants if nm not in TITLE_NAMES)
    hp2 = re.sub(r'(<vt:variant><vt:lpstr>(?:幻灯片标题|Slide Titles)</vt:lpstr></vt:variant><vt:variant><vt:i4>)\d+(</vt:i4>)',
                 rf'\g<1>{N}\g<2>', hp)
    app = app.replace(hp, hp2)
    tp = re.search(r'<TitlesOfParts><vt:vector size="\d+" baseType="lpstr">(.*?)</vt:vector></TitlesOfParts>', app, re.S).group(1)
    head_lp = re.findall(r'<vt:lpstr>(.*?)</vt:lpstr>', tp)[:other_sum]
    lpxml = "".join(f'<vt:lpstr>{escape(t)}</vt:lpstr>' for t in head_lp + keep_titles)
    app = re.sub(r'<TitlesOfParts><vt:vector size="\d+" baseType="lpstr">.*?</vt:vector></TitlesOfParts>',
                 f'<TitlesOfParts><vt:vector size="{other_sum+N}" baseType="lpstr">{lpxml}</vt:vector></TitlesOfParts>',
                 app, flags=re.S)

    changed = {"ppt/presentation.xml": pres2.encode(), "ppt/_rels/presentation.xml.rels": rels2.encode(),
               "[Content_Types].xml": ct2.encode(), "docProps/app.xml": app.encode()}
    skip = del_parts | del_relsf
    zo = zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED)
    for it in z.infolist():
        if it.filename in skip: continue
        zi = zipfile.ZipInfo(it.filename, date_time=it.date_time)
        zi.compress_type = it.compress_type; zi.external_attr = it.external_attr
        zi.internal_attr = it.internal_attr; zi.create_system = it.create_system
        zo.writestr(zi, changed.get(it.filename, z.read(it.filename)))
    zo.close()
    return N_old, N, len(variants)
