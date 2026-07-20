"""按放映序 dump 指定页的每个形状文本。用法: python3 dump_pages.py <讲义.pptx> 7 17 20 ..."""
import sys, re, zipfile

def show_order(z):
    pres = z.read('ppt/presentation.xml').decode('utf-8')
    rels = z.read('ppt/_rels/presentation.xml.rels').decode('utf-8')
    rid2tgt = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', rels))
    order = []
    for rid in re.findall(r'<p:sldId[^>]*r:id="(rId\d+)"', pres):
        m = re.search(r'slide(\d+)\.xml', rid2tgt.get(rid, ''))
        if m: order.append(f'ppt/slides/slide{m.group(1)}.xml')
    return order

def shapes_text(xml):
    out = []
    for sp in re.findall(r'<p:sp>.*?</p:sp>', xml, re.S):
        paras = []
        for p in re.findall(r'<a:p>.*?</a:p>', sp, re.S):
            t = ''.join(re.findall(r'<a:t>(.*?)</a:t>', p, re.S))
            t = t.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')
            if t.strip(): paras.append(t)
        if paras: out.append(paras)
    return out

def main(path, pages):
    with zipfile.ZipFile(path) as z:
        order = show_order(z)
        for pg in pages:
            xml = z.read(order[pg-1]).decode('utf-8')
            print(f"\n{'='*56}\n  第 {pg} 页  ({order[pg-1]})\n{'='*56}")
            for i, sp in enumerate(shapes_text(xml)):
                print(f"  [{i}] " + " ¦ ".join(sp))

if __name__ == '__main__':
    main(sys.argv[1], [int(x) for x in sys.argv[2:]])
