"""纯脚本修复讲义的 PowerPoint 弹修复（两个根因，全 zip 级、不重存整包）：
  ① theme 共享：notesMaster 与 slideMaster 共用 theme1 → 复制出独立 theme。
  ② notesSlide 共享：多个 slide 引用同一 notesSlide → 为多余引用各建独立副本。
原有部件字节一律不动，只新增部件 + 改动少数索引/rels。零第三方依赖。

用法: python3 fix_theme.py <in.pptx> <out.pptx>
      python3 fix_theme.py --check <in.pptx>
"""
import zipfile, re, sys
from collections import defaultdict

THEME_CT = "application/vnd.openxmlformats-officedocument.theme+xml"
NS_CT = "application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"

def _theme_shared(parts):
    nmrels = parts.get('ppt/notesMasters/_rels/notesMaster1.xml.rels')
    if nmrels is None:
        return None
    m = re.search(r'theme(\d+)\.xml', nmrels.decode('utf-8'))
    if not m:
        return None
    nm_t = int(m.group(1))
    sm = re.search(r'theme(\d+)\.xml', parts.get('ppt/slideMasters/_rels/slideMaster1.xml.rels', b'').decode('utf-8'))
    return nm_t if (sm and int(sm.group(1)) == nm_t) else None

def _ns_shared(parts):
    refs = defaultdict(list)
    for n in parts:
        m = re.match(r'ppt/slides/_rels/(slide\d+)\.xml\.rels$', n)
        if not m:
            continue
        for r in re.finditer(r'Target="\.\./notesSlides/(notesSlide\d+\.xml)"', parts[n].decode('utf-8')):
            refs[r.group(1)].append((n, m.group(1)))
    return {k: v for k, v in refs.items() if len(v) > 1}

def analyze(parts):
    t = _theme_shared(parts)
    shared_ns = _ns_shared(parts)
    dup = sum(len(v) - 1 for v in shared_ns.values())
    msgs = []
    if t is not None:
        msgs.append(f"theme{t} 被 notes/slide master 共享")
    if dup:
        msgs.append(f"{dup} 处 notesSlide 共享")
    return (t, shared_ns), ("；".join(msgs) if msgs else "无共享，无需修复")

def _add_ct(parts, partname, ct):
    x = parts['[Content_Types].xml'].decode('utf-8')
    if partname not in x:
        x = x.replace('</Types>', f'<Override PartName="{partname}" ContentType="{ct}"/></Types>')
    parts['[Content_Types].xml'] = x.encode('utf-8')

def fix(src, dst):
    with zipfile.ZipFile(src) as z:
        parts = {n: z.read(n) for n in z.namelist()}
    (shared_theme, shared_ns), _ = analyze(parts)
    actions = []

    if shared_theme is not None:
        nums = [int(re.search(r'theme(\d+)\.xml', n).group(1)) for n in parts if re.match(r'ppt/theme/theme\d+\.xml$', n)]
        newt = max(nums) + 1
        parts[f'ppt/theme/theme{newt}.xml'] = parts[f'ppt/theme/theme{shared_theme}.xml']
        srels = f'ppt/theme/_rels/theme{shared_theme}.xml.rels'
        if srels in parts:
            parts[f'ppt/theme/_rels/theme{newt}.xml.rels'] = parts[srels]
        nm = 'ppt/notesMasters/_rels/notesMaster1.xml.rels'
        parts[nm] = parts[nm].decode('utf-8').replace(f'theme/theme{shared_theme}.xml', f'theme/theme{newt}.xml').encode('utf-8')
        _add_ct(parts, f'/ppt/theme/theme{newt}.xml', THEME_CT)
        actions.append(f"theme{shared_theme}→独立 theme{newt}")

    if shared_ns:
        nums = [int(re.search(r'notesSlide(\d+)\.xml', n).group(1)) for n in parts if re.match(r'ppt/notesSlides/notesSlide\d+\.xml$', n)]
        counter = max(nums) if nums else 0
        split = 0
        for ns_file, refs in shared_ns.items():
            for rels_name, slide in refs[1:]:           # 第一个保留，其余各建独立副本
                counter += 1
                new_ns = f'notesSlide{counter}.xml'
                parts[f'ppt/notesSlides/{new_ns}'] = parts[f'ppt/notesSlides/{ns_file}']
                orig = parts.get(f'ppt/notesSlides/_rels/{ns_file}.rels', b'').decode('utf-8')
                newr = re.sub(r'(Target="\.\./slides/)slide\d+\.xml"', rf'\g<1>{slide}.xml"', orig)
                parts[f'ppt/notesSlides/_rels/{new_ns}.rels'] = newr.encode('utf-8')
                parts[rels_name] = parts[rels_name].decode('utf-8').replace(f'notesSlides/{ns_file}"', f'notesSlides/{new_ns}"').encode('utf-8')
                _add_ct(parts, f'/ppt/notesSlides/{new_ns}', NS_CT)
                split += 1
        actions.append(f"拆分 {split} 个共享 notesSlide")

    if not actions:
        return False, "无共享，无需修复"

    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as zout:
        written = set()
        for item in zin.infolist():
            zout.writestr(item, parts.get(item.filename, zin.read(item.filename)))
            written.add(item.filename)
        for pn, data in parts.items():
            if pn not in written:
                zout.writestr(pn, data)
    return True, " + ".join(actions)

if __name__ == '__main__':
    if sys.argv[1] == '--check':
        with zipfile.ZipFile(sys.argv[2]) as z:
            print(analyze({n: z.read(n) for n in z.namelist()})[1])
    else:
        ok, msg = fix(sys.argv[1], sys.argv[2])
        print(("✓ " if ok else "· ") + msg)
