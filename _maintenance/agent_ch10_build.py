# Agent 讲义增章构建:第 10 章「多智能体 / Sub-agent 编排」
# 步骤:①框架页 zip 级手术(封面/导览/速查改号/总收束/来源页/承上启下) → 中间件
#      ②kb_insert 把 12 张新页嫁接到放映序 102 页(第 9 章小结)之后(同插入点逆序传参)
# 全程不做 python-pptx round-trip 整包重存。
import zipfile, re, sys, os

BASE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE)

SRC = "/Users/lijiaxiang/project/myAILearning/Agent/Agent-讲义.pptx"
MID = os.path.join(BASE, "_agent_ch10_mid.pptx")
DST = os.path.join(BASE, "_agent_ch10_final.pptx")

E = 914400  # EMU/inch

def emu(v):
    return str(int(round(v * E)))

def must_replace(xml, old, new, tag, count=1):
    n = xml.count(old)
    assert n == count, f"[{tag}] 期望出现 {count} 次,实际 {n} 次: {old[:60]!r}"
    return xml.replace(old, new)

def split_sp_blocks(xml):
    """把 spTree 内容按顶层 <p:sp>…</p:sp> 切块(本库讲义无嵌套 grpSp,线性切分安全)。"""
    head_end = xml.index("<p:sp>")
    tail_start = xml.rindex("</p:sp>") + len("</p:sp>")
    head, body, tail = xml[:head_end], xml[head_end:tail_start], xml[tail_start:]
    blocks = re.findall(r"<p:sp>.*?</p:sp>", body, re.S)
    joined = "".join(blocks)
    assert joined == body, "sp 切块与原文不一致(可能存在非 sp 顶层元素混排)"
    return head, blocks, tail

# ---------- 封面:10 胶囊 → 4 分组条;核实日期 ----------
CAP_PILL = ('<p:sp><p:nvSpPr><p:cNvPr id="{id}" name="Shape g{gi}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
            '<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
            '<a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 50000"/></a:avLst></a:prstGeom>'
            '<a:solidFill><a:srgbClr val="0E4D64"/></a:solidFill><a:ln/></p:spPr>'
            '<p:txBody><a:bodyPr/><a:p/></p:txBody></p:sp>')
CAP_TEXT = ('<p:sp><p:nvSpPr><p:cNvPr id="{id}" name="Text g{gi}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
            '<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
            '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln/></p:spPr>'
            '<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="ctr"/>'
            '<a:lstStyle/><a:p><a:pPr algn="ctr" indent="0" marL="0"><a:buNone/></a:pPr>'
            '<a:r><a:rPr lang="en-US" sz="1100" dirty="0"><a:solidFill><a:srgbClr val="EAF3F5"/></a:solidFill>'
            '<a:latin typeface="Calibri" pitchFamily="34" charset="0"/><a:ea typeface="Calibri" pitchFamily="34" charset="-122"/>'
            '<a:cs typeface="Calibri" pitchFamily="34" charset="-120"/></a:rPr><a:t>{text}</a:t></a:r>'
            '<a:endParaRPr lang="en-US" sz="1100" dirty="0"/></a:p></p:txBody></p:sp>')

def fix_cover(xml):
    head, blocks, tail = split_sp_blocks(xml)
    kept = []
    removed = 0
    for b in blocks:
        if re.search(r"<a:t>\d{1,2} · ", b):
            removed += 1; continue
        if 'cx="2103120"' in b and 'val="0E4D64"' in b and "<a:p/>" in b:
            removed += 1; continue
        kept.append(b)
    assert removed == 20, f"封面胶囊应移除 20 块,实际 {removed}"
    groups = ["原理篇 · 第 1–3 章", "协议与工程篇 · 第 4–6 章", "能力扩展篇 · 第 7–9 章", "实战篇 · 第 10–11 章"]
    y, cy, cx = emu(4.75), emu(0.40), emu(2.85)
    xs = [0.70, 3.68, 6.66, 9.64]
    add = []
    for gi, (gx, gt) in enumerate(zip(xs, groups)):
        add.append(CAP_PILL.format(id=900 + gi * 2, gi=gi, x=emu(gx), y=y, cx=cx, cy=cy))
        add.append(CAP_TEXT.format(id=901 + gi * 2, gi=gi, x=emu(gx), y=y, cx=cx, cy=cy, text=gt))
    xml = head + "".join(kept) + "".join(add) + tail
    xml = must_replace(xml, "2026-07-12", "2026-07-17", "封面核实日期")
    return xml

# ---------- 导览:11 项重排(左 6 右 5,行距 0.83) ----------
NAV_CIRCLE = ('<p:sp><p:nvSpPr><p:cNvPr id="{id}" name="NavNum {n}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
              '<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="420624" cy="420624"/></a:xfrm>'
              '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="1CA3B8"/></a:solidFill>'
              '<a:ln><a:noFill/></a:ln><a:effectLst/></p:spPr>'
              '<p:txBody><a:bodyPr rtlCol="0" anchor="ctr" wrap="square"/><a:lstStyle/>'
              '<a:p><a:pPr algn="ctr"/><a:r><a:rPr sz="{sz}" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill>'
              '<a:latin typeface="Calibri"/></a:rPr><a:t>{n}</a:t></a:r></a:p></p:txBody></p:sp>')
NAV_TITLE = ('<p:sp><p:nvSpPr><p:cNvPr id="{id}" name="NavTitle {n}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>'
             '<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="4937760" cy="320040"/></a:xfrm>'
             '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
             '<p:txBody><a:bodyPr wrap="square" anchor="t"><a:spAutoFit/></a:bodyPr><a:lstStyle/>'
             '<a:p><a:pPr algn="l"/><a:r><a:rPr sz="1350" b="1"><a:solidFill><a:srgbClr val="0B2540"/></a:solidFill>'
             '<a:latin typeface="Calibri"/></a:rPr><a:t>{text}</a:t></a:r></a:p></p:txBody></p:sp>')
NAV_SUB = ('<p:sp><p:nvSpPr><p:cNvPr id="{id}" name="NavSub {n}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>'
           '<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="5029200" cy="475488"/></a:xfrm>'
           '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
           '<p:txBody><a:bodyPr wrap="square" anchor="t"><a:spAutoFit/></a:bodyPr><a:lstStyle/>'
           '<a:p><a:pPr algn="l"/><a:r><a:rPr sz="1050" b="0"><a:solidFill><a:srgbClr val="51606E"/></a:solidFill>'
           '<a:latin typeface="Calibri"/></a:rPr><a:t>{text}</a:t></a:r></a:p></p:txBody></p:sp>')

NAV_ITEMS = [
    ("Agent 是什么 / 为什么", "定义、循环、和工作流的边界、何时该用"),
    ("核心组件", "规划/记忆/工具三大件；function calling 全流程"),
    ("编排模式", "五种模式与 multi-agent 成本账；A2A 协作"),
    ("工具接入与 MCP", "AI 应用的 USB-C：架构、报文、治理"),
    ("上下文工程", "窗口是注意力预算：四板斧；与 RAG 握手"),
    ("评估、可观测与护栏", "评估三刻度 + OWASP 风险与防护"),
    ("低代码 Agent 平台", "四平台画像、许可证边界、下沉分水岭"),
    ("记忆系统", "四种记忆分层、框架四强、记忆投毒 ASI06"),
    ("Computer Use", "三条路线、基准两口径、RPA 混合、安全四件"),
    ("多智能体 / Sub-agent 编排（新）", "三层框架、两家实操对照、派与不派的决策账"),
    ("售前速查", "高频问题、启用条件决策树、串联地图"),
]

def fix_nav(xml):
    xml = must_replace(xml, "全书导览：十章一条主线", "全书导览：十一章一条主线", "导览标题")
    head, blocks, tail = split_sp_blocks(xml)
    kept = []
    removed = 0
    for b in blocks:
        if 'val="1CA3B8"' in b or 'sz="1350"' in b or 'sz="1050"' in b:
            removed += 1; continue
        kept.append(b)
    assert removed == 30, f"导览条目应移除 30 块,实际 {removed}"
    add = []
    for i, (t, s) in enumerate(NAV_ITEMS):
        col = 0 if i < 6 else 1
        row = i if i < 6 else i - 6
        cx = 0.70 if col == 0 else 6.95
        tx = 1.36 if col == 0 else 7.61
        cy = 2.05 + 0.83 * row
        n = i + 1
        add.append(NAV_CIRCLE.format(id=800 + i * 3, n=n, x=emu(cx), y=emu(cy), sz=950 if n >= 10 else 1200))
        add.append(NAV_TITLE.format(id=801 + i * 3, n=n, x=emu(tx), y=emu(cy - 0.06), text=t))
        add.append(NAV_SUB.format(id=802 + i * 3, n=n, x=emu(tx), y=emu(cy + 0.30), text=s))
    return head + "".join(kept) + "".join(add) + tail

# ---------- 总收束:补 ⑨ ----------
def fix_recap(xml):
    i = xml.index("⑧")
    p_start = xml.rindex("<a:p>", 0, i)
    p_end = xml.index("</a:p>", i) + len("</a:p>")
    p8 = xml[p_start:p_end]
    m = re.search(r"<a:t>([^<]*)</a:t>", p8)
    assert m and m.group(1).startswith("⑧"), "未定位到 ⑧ 段落"
    p9 = p8.replace(m.group(1),
        "⑨ Sub-agent：上下文隔离换总 token——要结果的活外包给子 agent，要过程的活留在主对话。")
    return xml[:p_end] + p9 + xml[p_end:]

# ---------- 来源页:补第 10 章行 + 核实窗口 ----------
def fix_sources(xml):
    xml = must_replace(xml, "2026-07-07 至 2026-07-12", "2026-07-07 至 2026-07-17", "核实窗口")
    head, blocks, tail = split_sp_blocks(xml)
    lab_b = con_b = div_b = None
    for b in blocks:
        if "<a:t>第9章 · Computer Use 与 GUI Agent</a:t>" in b:
            lab_b = b
        if "digitalapplied 2026" in b:
            con_b = b
        if 'cy="9144"' in b or (f'y="{emu(5.32)}"' in b):
            div_b = b
    assert lab_b and con_b, "未找到第 9 章来源行模板"

    def shift(block, dy, newid):
        m = re.search(r'<a:off x="(\d+)" y="(\d+)"/>', block)
        y2 = int(m.group(2)) + int(round(dy * E))
        block = block.replace(m.group(0), f'<a:off x="{m.group(1)}" y="{y2}"/>')
        block = re.sub(r'(<p:cNvPr id=")(\d+)(")', rf"\g<1>{newid}\g<3>", block, count=1)
        return block

    new_lab = shift(lab_b, 0.56, 950).replace("第9章 · Computer Use 与 GUI Agent", "第10章 · 多智能体 / Sub-agent 编排")
    mt = re.search(r"<a:t>(digitalapplied[^<]*)</a:t>", con_b)
    new_con = shift(con_b, 0.56, 951).replace(
        mt.group(1),
        "code.claude.com/docs（sub-agents、skills）；developers.openai.com/codex/subagents；anthropic.com/engineering（multi-agent 研究系统）")
    add = [new_lab, new_con]
    if div_b is not None:
        add.append(shift(div_b, 0.56, 952))
    return head + "".join(blocks) + "".join(add) + tail

def main():
    with zipfile.ZipFile(SRC) as z:
        parts = {n: z.read(n) for n in z.namelist()}
        order = None
    # 放映序 → 物理文件映射
    import xml.etree.ElementTree as ET
    pres = parts["ppt/presentation.xml"].decode("utf-8")
    prels = ET.fromstring(parts["ppt/_rels/presentation.xml.rels"])
    relmap = {r.get("Id"): r.get("Target") for r in prels}
    NSR = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
    NSP = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
    sids = ["ppt/" + relmap[e.get(NSR)].replace("../", "")
            for e in ET.fromstring(pres).iter(NSP + "sldId")]
    S = lambda show: sids[show - 1]  # 放映序(1 起) → 部件路径

    def edit(show, fn, tag):
        p = S(show)
        old = parts[p].decode("utf-8")
        new = fn(old)
        ET.fromstring(new)  # 良构性(检查项 17 的教训:字节手术后必须过真解析器)
        parts[p] = new.encode("utf-8")
        print(f"  ✓ {tag} → {p}")

    print("① 框架页手术")
    edit(1, fix_cover, "封面 分组条+日期")
    edit(2, fix_nav, "导览 11 项")
    edit(102, lambda x: must_replace(
        x,
        "十章讲完了 agent 的脑、手、眼、记忆与缰绳——最后一章把全书折叠成一页速查。",
        "脑、手、眼、记忆与缰绳都讲完了——第 10 章进车间：sub-agent 在 Claude Code / Codex 里怎么真跑起来。",
        "第9章承上启下"), "第 9 章小结 承上启下")

    def renum(x):
        n = x.count("第 10 章")
        assert n >= 1, "速查页未见「第 10 章」"
        return x.replace("第 10 章", "第 11 章")
    edit(103, lambda x: must_replace(
        must_replace(renum(x), "把十章折叠成三页", "把十一章折叠成三页", "速查章扉口径"),
        "九章对练页的电梯版精选", "十章对练页的电梯版精选", "速查章扉口径2"), "速查章扉 改号")
    edit(104, lambda x: must_replace(renum(x), "（第 3 章）", "（第 3/10 章）", "multi-agent 成本指向"), "速查 高频问题 改号")
    edit(105, renum, "速查 决策树 改号")
    edit(106, renum, "速查 串联地图 改号")
    edit(107, fix_recap, "总收束 补 ⑨")
    edit(110, fix_sources, "来源页 补行+窗口")

    app = parts["docProps/app.xml"].decode("utf-8")
    app = must_replace(app, "全书导览：十章一条主线", "全书导览：十一章一条主线", "app.xml 导览标题")
    parts["docProps/app.xml"] = app.encode("utf-8")
    print("  ✓ app.xml 导览标题")

    with zipfile.ZipFile(SRC) as zin, zipfile.ZipFile(MID, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            zout.writestr(item, parts[item.filename])
    print(f"① 完成 → {MID}")

    print("② 嫁接 12 张新页(after=102,逆序传参)")
    from kb_insert import insert_figures
    from agent_ch10_figs import PAGES
    specs = [(102, fn, t) for fn, t in reversed(PAGES)]
    npages = insert_figures(MID, DST, specs)
    print(f"② 完成 → {DST} 总页数 {npages}")

if __name__ == "__main__":
    main()
