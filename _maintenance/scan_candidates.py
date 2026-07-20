"""扫描讲义，按放映顺序列出每页特征，帮助定位「四卡纯文字深度页」配图候选。
放映序取自 presentation.xml 的 sldIdLst → rels → slideN.xml（文件名序可能≠放映序）。
用法: python3 scan_candidates.py <讲义.pptx>
"""
import sys, re, zipfile
NUM_CIRCLES = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫"

def show_order(z):
    pres = z.read('ppt/presentation.xml').decode('utf-8')
    rels = z.read('ppt/_rels/presentation.xml.rels').decode('utf-8')
    rid2tgt = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', rels))
    order = []
    for rid in re.findall(r'<p:sldId[^>]*r:id="(rId\d+)"', pres):
        m = re.search(r'slide(\d+)\.xml', rid2tgt.get(rid, ''))
        if m: order.append((f'ppt/slides/slide{m.group(1)}.xml', int(m.group(1))))
    return order

def analyze(xml):
    txt = ' '.join(re.findall(r'<a:t>(.*?)</a:t>', xml, re.S))
    txt = txt.replace('&lt;', '<').replace('&amp;', '&')
    nchar = len(re.sub(r'\s', '', txt))
    circles = sum(txt.count(c) for c in NUM_CIRCLES)
    cxn = xml.count('<p:cxnSp>'); rrect = xml.count('roundRect'); atxt = txt.count('→')
    return nchar, circles, cxn, rrect, atxt, txt

def main(path):
    with zipfile.ZipFile(path) as z:
        order = show_order(z)
        maxfile = max(n for _, n in order)  # 我插的图是文件名最大的那批
        for i, (name, fnum) in enumerate(order, 1):
            nchar, circles, cxn, rrect, atxt, txt = analyze(z.read(name).decode('utf-8'))
            flag = ''
            if nchar >= 260 and circles == 0 and cxn <= 1: flag = ' <==候选'
            prev = txt[:66].replace('\n', ' ')
            print(f"{i:>3} f{fnum:<3} {nchar:>4} ○{circles} cxn{cxn} rr{rrect} →{atxt}  {prev}{flag}")

if __name__ == '__main__':
    main(sys.argv[1])
