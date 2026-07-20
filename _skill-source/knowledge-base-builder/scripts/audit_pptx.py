#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""讲义 PPTX 契约自检（knowledge-base-builder v3.12，工具中立、零第三方依赖）。

v3.12: 新增检查项 16（FAIL 级）——带文字形状超出画布右/下边界。大画布坐标页（13.333×7.5）
被嫁接进小画布册（10×5.625）时内容被裁, 旧版只查负坐标漏掉这一半; 2026-07-17 用户发现
9 册 78 页配图/插页超界即此。修复工具: fix_canvas_scale.py（整页零语义缩放）。
v3.11: ①支持脚本同目录 audit-exemptions.txt 豁免清单——人工已裁决的告警（目前支持
检查项 15 同题重复页对）登记后改为输出 [豁免] 信息行, 不再计告警, 消除巡检固定噪音;
②总收束探测词收录「讲义 · 完」批次变体（快批次册收束页题为「XX讲义 · 完」, 此前误报缺项）。

用法:
    python3 audit_pptx.py <讲义.pptx> [更多.pptx ...] [--profile reading|projection]

--profile 对应 KB-CONFIG「阅读场景」: reading=自读档(默认, 紧凑字号), projection=投屏档。

批量容错(v3.5): 逐文件独立审计——文件名以 ~$ 开头的 Office 锁文件直接跳过(不计失败);
损坏/非 pptx 文件报「无法读取」并计 FAIL, 但不中断其余文件(此前一个坏文件会让整批中断,
巡检呈现轴批量跑全库时被截断)。

检查项（对应 ppt-design-system.md）:
  1. 页面 16:9
  2. 字体白名单: Cambria(标题) / Calibri(正文) / Courier New(代码)
  3. 字号下限: 按档位(自读: 硬下限 8pt/正文 11pt; 投屏: 硬下限 9pt/正文 16pt)。
     硬下限全页生效(含表格), 低于即 FAIL。「疑似正文字号不足」告警 v3.5 起按**字符占比**
     判定: 表格外低于正文下限的字符占比 >40% 且小字量 >120 字才告警——不再数 run
     (一个长段落会碎成几十个 run, 纯计数虚高, 曾致全库 109 页假告警、告警疲劳)。
     自读档豁免**密集角色页**(对练「…会怎么问」/导览/术语/速查/来源/问答):
     2026-07-14 呈现审查渲染目检复核过这些角色页的小字属合法版式;
     投屏档不豁免——投屏问答页按设计令牌应 ≥16pt。
  4. 色板合规: 非令牌色仅告警, 分两级——系统性漂移(同一非令牌色 ≥10 页且 ≥25% 页面,
     "生成批次指纹", 建议下次 B 类更新时回正) / 零星出现(图表系列色可豁免, 人工确认)
  5. 负坐标 / 画布外元素(仅带文字形状; 无文字装饰形状出血合法)
  6. 空白页(无任何文字)
  7. 第 2 页导览、模块总页数
  8. 标题唯一性: 每页可见大标题(≥20pt 首个文本段, 启发式)联合「页眉/首行上下文」全书比对,
     「上下文+标题」都相同才判重名 FAIL(每章固定栏目页标题按设计重复, 页眉含章号自然区分)
  9. docProps/app.xml 一致性: <Slides> 计数、TitlesOfParts 向量 size、HeadingPairs 计数
     总和(仅 PowerPoint 校验此文件, 不符会弹"需要修复")
 10. 章数一致性: 正文页眉「第 N 章」最大值 vs 封面章节条最大编号(数字胶囊「N ·」,
     或 >10 章分档的分组条「第 X–Y 章」取范围最大值)、封面/导览「X 章一条主线」口径
     (中文数字可解析), 不符即 FAIL——B 类增章漏回刷的程序化兜底
 11. 孤儿 Override: [Content_Types].xml 指向包内不存在部件的条目, OPC 违规一律 FAIL
 12. OOXML 顺序契约(「PowerPoint 弹修复」事故根因, 两条都 FAIL 级):
     ①presentation.xml 的 <p:notesMasterIdLst> 必须位于 <p:sldIdLst> 之前;
     ②任何 <a:p> 段落里 <a:pPr> 必须是第一个子元素且只能有一个。
     机理与「PowerPoint 亲写基线」排查方法论见 ppt-design-system.md 第 7 节与库内
     _maintenance/ 事故复盘; 配套修复工具 fix_schema_order.py(零语义元素重定位)。
 13. 每章固定元素与收尾四件套(v3.5 新增, WARN 级——把设计系统门禁第 8 步的机械部分
     程序化, 延续"人工清单必漏→程序化兜底"的既有模式):
     以页眉「第 N 章」把页面归章(只认恰好含一个章号的页, 导览/总收束这类多章号页不参与),
     每章应检出 学习目标 / 动手做 / 对练页(「…会怎么问」) / 本章小结 四元素;
     末章缺全部四元素视为速查/特例章惯例, 静默豁免; 其余缺项逐条告警。
     全册应检出收尾四件套: 总收束(或「一句话记住」) / 生产验收 / 串联(或知识地图) /
     来源页——缺项告警(挂钩配置为「无」的库, 生产验收告警可人工忽略)。
 14. theme/notesSlide 跨对象共享(v3.6, FAIL 级): notesMaster 与 slideMaster 共用同一 theme、
     多张 slide 共用同一 notesSlide——只 Mac PowerPoint 严格通道拒收; 修复 fix_theme_sharing.py。
 15. 相邻同题重复页对(v3.8, WARN 级): 相邻两页大标题相同 = 疑似配图"替代型"漏删源文字页
     (信息图版插在源页后却没删源页)。需比对配图前基线确认: 该主题配图前 1 页→现 2 页即残留,
     删前页(源文字版)留后页(信息图版); 配图前本就两页则为合法补充, 保留。修复 kb_delete.py。

注意: 本脚本不能发现溢出/遮挡/渲染丢字——那些必须渲染后逐页目检。
页码口径: 一律按放映顺序(presentation.xml 的 sldIdLst)报告, 不按 slideN.xml 文件名
——插页工具常把新页追加到文件名序列末尾再挪放映位置, 两者可以不一致。
退出码: 0 = 通过(可有告警), 1 = 存在错误。
"""
import os
import re
import unicodedata
import sys
import xml.etree.ElementTree as ET
import zipfile

ALLOWED_FONTS = {"Cambria", "Calibri", "Courier New"}
PALETTE = {
    "FFFFFF", "FEFEFE", "0B2540", "1A2733", "51606E", "128199", "1CA3B8",
    "0E4D64", "F2A65A", "2F855A", "F3F8FA", "EAF3F5", "D6E1E8", "9FB3C0",
    "000000",  # 纯黑允许用于线条/阴影
}
PROFILES = {
    # (硬下限, 正文下限)
    "reading": dict(min_pt=8.0, body_min=11.0),
    "projection": dict(min_pt=9.0, body_min=16.0),
}
# 检查项 3: 表格外小字字符占比阈值与最小字符量(低于该量的页面不值得告警)
SMALL_RATIO = 0.40
SMALL_MIN_CHARS = 120
# 自读档豁免的密集角色页标记(命中页标题/眉题/页首文本即豁免)
DENSE_ROLE_MARKERS = ("会怎么问", "被追问", "导览", "术语", "速查", "来源", "问答")
# 检查项 13: 每章固定元素(各批次讲义用词有方言, 词表取并集; 命中任一词即算该元素存在)
CHAPTER_ELEMENTS = {
    "学习目标": ("学习目标", "学完这章", "学完本章"),
    "动手做": ("动手做", "动手练", "上手练"),
    "对练页": ("会怎么问", "最可能被追问", "面试题", "对练"),
    "本章小结": ("本章小结", "章小结"),
}
# 归章用眉题格式「第 N 章 ·」(后必须跟分隔符)——排除"参见 RAG 第 11 章"这类
# 跨模块/跨章引用把幽灵章号带进统计(SP 曾因引用 RAG 第 11 章被记出不存在的第 11 章)
CH_EYEBROW = re.compile(r"第\s*(\d{1,3})\s*章\s*[·．.、|—–:：]")
# 收尾四件套探测词(同样取各批次并集; v3.11 收录「讲义 · 完」批次变体——
# 快批次册收束页题为「XX讲义 · 完」, 语义即总收束, 此前误报缺项)
CLOSING_MARKERS = {
    "总收束": ("总收束", "一句话记住", "全书小结", "一张地图带走", "一张表带走",
               "讲义 · 完"),
    "生产验收": ("验收",),
    "串联/知识地图": ("串联", "知识地图", "知识库里的位置", "知识库的位置", "和谁握手"),
}

# 豁免清单(v3.11): 脚本同目录 audit-exemptions.txt, 登记"人工已裁决、无需再报"的告警。
# 格式每行: <讲义文件名>|<豁免类型>|<匹配串>   (#开头为注释)
# 目前支持豁免类型: 同题重复(检查项 15)——匹配串=归一化大标题(去空白), 前缀匹配。
# 用途: v3.8 全库排查后裁决保留的"补充型"同题页对(如各册开篇导览), 每次巡检重复
# 告警属固定噪音; 登记进清单后 audit 改为输出一行 [豁免] 信息, 不再计告警。


def norm_title(t):
    """标题归一化(v3.12 加强): NFKC 全半角统一 + 去所有标点/空白——
    半角冒号 vs 全角冒号曾让 5 对替代型残留页逃过检查项 15(2026-07-17 用户发现)。"""
    t = unicodedata.normalize("NFKC", t)
    return re.sub(r"[^\w一-鿿]+", "", t).lower()


def load_exemptions(script_dir):
    exmap = {}
    fp = os.path.join(script_dir, "audit-exemptions.txt")
    if not os.path.exists(fp):
        return exmap
    for line in open(fp, encoding="utf8"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = [p.strip() for p in line.split("|")]
        if len(parts) != 3:
            continue
        fname, etype, pat = parts
        exmap.setdefault((fname, etype), []).append(norm_title(pat))
    return exmap


EXEMPTIONS = load_exemptions(os.path.dirname(os.path.abspath(__file__)))

CN_NUM = {"零": 0, "一": 1, "二": 2, "两": 2, "三": 3, "四": 4, "五": 5,
          "六": 6, "七": 7, "八": 8, "九": 9, "十": 10}


def cn2int(s):
    """中文数字(1–99)或阿拉伯数字 → int; 解析失败返回 None。"""
    s = s.strip()
    if s.isdigit():
        return int(s)
    if not s or any(ch not in CN_NUM for ch in s):
        return None
    if "十" not in s:
        return CN_NUM[s] if len(s) == 1 else None
    left, _, right = s.partition("十")
    tens = CN_NUM.get(left, 1) if left else 1
    ones = CN_NUM.get(right, 0) if right else 0
    return tens * 10 + ones


def audit(path, profile="reading"):
    prof = PROFILES[profile]
    MIN_PT, BODY_MIN_PT = prof["min_pt"], prof["body_min"]
    errors, warnings = [], []
    z = zipfile.ZipFile(path)

    pres = z.read("ppt/presentation.xml").decode("utf8")
    m = re.search(r'<p:sldSz[^>]*cx="(\d+)"[^>]*cy="(\d+)"', pres)
    canvas_cx = canvas_cy = None
    if m:
        cx, cy = int(m.group(1)), int(m.group(2))
        canvas_cx, canvas_cy = cx, cy
        if abs(cx / cy - 16 / 9) > 0.01:
            errors.append(f"页面不是 16:9（{cx}x{cy} EMU）")
    else:
        warnings.append("presentation.xml 未找到 sldSz，无法确认页面比例")

    # 页码按放映顺序(sldIdLst)统计, 不按文件名
    slides = None
    try:
        rels = z.read("ppt/_rels/presentation.xml.rels").decode("utf8")
        rid2part = dict(re.findall(
            r'Id="([^"]+)"[^>]*Target="slides/(slide\d+\.xml)"', rels))
        order = [rid2part[rid]
                 for rid in re.findall(r'<p:sldId[^>]*r:id="([^"]+)"', pres)
                 if rid in rid2part]
        if order:
            slides = ["ppt/slides/" + p for p in order]
    except KeyError:
        pass
    if not slides:  # 兜底: 按文件名排序
        slides = sorted(
            (n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
            key=lambda n: int(re.search(r"\d+", n).group()),
        )
    if not slides:
        errors.append("没有任何幻灯片")

    # 检查项 17(v3.12, FAIL 级): slide XML 良构性——本审计其余检查全是正则式,
    # 字节级手术引入的标签错配(如重复闭合标签)会让 PowerPoint/渲染器丢整页,
    # 正则检查全部失明(2026-07-17 章眉统一脚本双闭合事故即此)。ET 解析零依赖兜底。
    for _pos, _name in enumerate(slides, start=1):
        try:
            ET.fromstring(z.read(_name))
        except ET.ParseError as _e:
            errors.append(f"第 {_pos} 页 XML 非良构（{_e}）——字节级手术引入的标签错配, 渲染器会丢整页")

    # 检查项 18(v3.16, FAIL 级): slide XML 命名空间前缀约定——本审计其余检查全是按
    # a:/p: 前缀的正则式, XML 库(如 ET.tostring)回写会把前缀重写成 ns0:/ns1:,
    # XML 良构、语义等价、检查项 17 放行, 但正则检查全线失明(2026-07-20 实测 8 册全挂)。
    for _pos, _name in enumerate(slides, start=1):
        _head = z.read(_name)[:400].decode("utf-8", "ignore")
        if "<p:sld" not in _head:
            errors.append(
                f"第 {_pos} 页根元素前缀非 p:（疑似被 XML 库回写成 ns0:/ns1:）"
                "——纯文本改写须走字节级 str.replace, 不得 ET.tostring 回写"
            )

    bad_fonts, offpal = {}, {}
    titles = {}
    max_chapter = 0          # 检查项 10/13: 全书「第 N 章」最大值
    cover_chip_grouped = False  # 封面为分组条口径(v3.12 修订三): 用眉题严格口径对比
    cover_chip_max = None    # 封面数字胶囊最大编号
    mainline_claims = []     # 「X 章一条主线」口径, (页码, 数值, 原文)
    elem_cov = {e: set() for e in CHAPTER_ELEMENTS}   # 检查项 13: 元素 → 已覆盖章号
    strict_max_chapter = 0   # 眉题口径的章数(检查项 13 用, 免疫跨模块引用)
    cheat_chaps = set()      # 眉题章题含「速查」的章(速查/特例章, 豁免每章固定元素)
    closing = {k: False for k in CLOSING_MARKERS}
    closing["来源页"] = False
    small_flag_pages = []    # 检查项 3: 疑似正文字号不足的页(先收集, 循环后分级报告)
    for pos, name in enumerate(slides, start=1):
        idx = pos  # 放映序页码
        xml = z.read(name).decode("utf8")
        texts = [t for t in re.findall(r"<a:t>([^<]*)</a:t>", xml)]
        joined = "".join(texts)

        # 可见大标题（启发式）：第一个字号 ≥20pt 的 run 视为本页标题。
        # 判重键 =（页眉/首行上下文, 标题）；标题与上下文同时用于密集角色页识别。
        title = None
        for run in re.findall(r"<a:r>(.*?)</a:r>", xml, re.S):
            msz = re.search(r'sz="(\d+)"', run)
            mtx = re.search(r"<a:t>([^<]*)</a:t>", run)
            if msz and mtx and int(msz.group(1)) >= 2000 and mtx.group(1).strip():
                title = mtx.group(1).strip()
                break
        context = ""
        if title:
            for t in texts:
                t = t.strip()
                if t and t != title:
                    context = t
                    break
            titles.setdefault((context, title), []).append(idx)

        for f in re.findall(r'typeface="([^"]+)"', xml):
            if f not in ALLOWED_FONTS and not f.startswith("+"):
                bad_fonts.setdefault(f, set()).add(idx)

        # 检查项 3: 硬下限全页生效(含表格) FAIL
        sizes_all = [int(s) / 100 for s in re.findall(r'sz="(\d+)"', xml)]
        tiny = [s for s in sizes_all if s < MIN_PT]
        if tiny:
            errors.append(f"第 {idx} 页存在 <{MIN_PT:g}pt 文字（{sorted(set(tiny))}）")
        # 「疑似正文字号不足」按表格外字符占比判定; 自读档豁免密集角色页
        xml_no_tbl = re.sub(r"<a:tbl>.*?</a:tbl>", "", xml, flags=re.S)
        small_chars = all_chars = 0
        for rmatch in re.finditer(r"<a:r>(.*?)</a:r>", xml_no_tbl, re.S):
            run = rmatch.group(1)
            msz = re.search(r'sz="(\d+)"', run)
            mtx = re.search(r"<a:t>([^<]*)</a:t>", run)
            if not (msz and mtx):
                continue
            n_ch = len(mtx.group(1))
            all_chars += n_ch
            if int(msz.group(1)) / 100 < BODY_MIN_PT:
                small_chars += n_ch
        head = " ".join(t.strip() for t in texts[:4])
        dense_role = profile == "reading" and any(
            mk in (title or "") or mk in context or mk in head
            for mk in DENSE_ROLE_MARKERS)
        if (idx > 1 and small_chars > SMALL_MIN_CHARS and all_chars
                and small_chars / all_chars > SMALL_RATIO and not dense_role):
            # 封面(第 1 页)豁免——封面契约本就由眉题/章节胶囊/核实日期等小字元素构成
            small_flag_pages.append((idx, small_chars, all_chars))

        # 章号统计: 检查项 10 沿用宽松口径(v3.4 行为), 检查项 13 用眉题严格口径
        loose = [int(mch.group(1))
                 for mch in re.finditer(r"第\s*(\d{1,3})\s*章", joined)]
        if loose:
            max_chapter = max(max_chapter, max(loose))
        eyebrow_matches = list(CH_EYEBROW.finditer(joined))
        eyebrow_chaps = [int(m.group(1)) for m in eyebrow_matches]
        distinct = set(eyebrow_chaps)
        if distinct:
            strict_max_chapter = max(strict_max_chapter, max(distinct))
        # 眉题章题含「速查」的章 = 速查/特例章, 不适用每章固定元素
        for m in eyebrow_matches:
            if "速查" in joined[m.end():m.end() + 16]:
                cheat_chaps.add(int(m.group(1)))
        # 归章 = 页面首个眉题章号; 含 ≥3 个不同眉题章号的页(导览/总收束/串联)不参与归章
        if eyebrow_chaps and len(distinct) < 3:
            c = eyebrow_chaps[0]
            for e, marks in CHAPTER_ELEMENTS.items():
                if any(mk in joined for mk in marks):
                    elem_cov[e].add(c)
        # 收尾四件套(全册任一页命中即算有)
        for k, marks in CLOSING_MARKERS.items():
            if any(mk in joined for mk in marks):
                closing[k] = True
        if (title and "来源" in title) or "访问日期" in joined:
            closing["来源页"] = True

        if idx <= 2:
            for mcl in re.finditer(r"([一二三四五六七八九十两零]{1,3}|\d{1,2})\s*章一条主线", joined):
                v = cn2int(mcl.group(1))
                if v:
                    mainline_claims.append((idx, v, mcl.group(0)))
        if idx == 1:
            chips = []
            group_tops = []  # v3.12 修订: 分组条封面(>10 章按契约分档)「第 X–Y 章」
            for t in texts:
                t = t.strip()
                mnum = re.match(r"^(\d{1,2})\s*[·.．・]", t)
                if not mnum and len(t) <= 12:
                    mnum = re.match(r"^(\d{1,2})\s+\S", t)
                if mnum:
                    chips.append(int(mnum.group(1)))
                mgrp = re.search(r"第\s*(\d{1,2})\s*[–—\-~至]\s*(\d{1,2})\s*章", t)
                if mgrp:
                    group_tops.append(max(int(mgrp.group(1)), int(mgrp.group(2))))
                elif re.match(r"^第\s*\d{1,2}\s*章", t):
                    # 不带范围的分组条(如「第 6 章 · 速查」)——封面短文本才会以「第 N 章」开头
                    group_tops.append(int(re.match(r"^第\s*(\d{1,2})\s*章", t).group(1)))
            if len(chips) >= 3:
                cover_chip_max = max(chips)
            elif len(group_tops) >= 2:
                cover_chip_max = max(group_tops)
                cover_chip_grouped = True

        for c in set(re.findall(r'<a:srgbClr val="([0-9A-Fa-f]{6})"', xml)):
            cu = c.upper()
            if cu not in PALETTE:
                offpal.setdefault(cu, set()).add(idx)

        # 负坐标只对"带文字的形状"报错——无文字的装饰形状出血到画布外是合法设计
        for block in re.split(r"<p:sp>", xml)[1:]:
            off = re.search(r'<a:off x="(-?\d+)" y="(-?\d+)"', block)
            has_text = bool("".join(re.findall(r"<a:t>([^<]*)</a:t>", block)).strip())
            if off and has_text and (int(off.group(1)) < 0 or int(off.group(2)) < 0):
                errors.append(
                    f"第 {idx} 页存在带文字的负坐标形状（off={off.groups()}）——疑似隐藏 placeholder"
                )
                break

        # 检查项 16(v3.12, FAIL 级): 带文字形状超出画布右/下边界——大画布坐标页被嫁接进
        # 小画布册(如 13.333×7.5 页进 10×5.625 册)内容会被裁掉, 此前只查负坐标漏掉这一半
        # (2026-07-17 用户发现 9 册 78 页配图/插页超界, 根因即此)。容差 0.15in=137160 EMU;
        # 修法: _maintenance/fix_canvas_scale.py 整页零语义缩放。
        if canvas_cx:
            for block in re.split(r"<p:sp>", xml)[1:]:
                off = re.search(r'<a:off x="(-?\d+)" y="(-?\d+)"', block)
                ext = re.search(r'<a:ext cx="(\d+)" cy="(\d+)"', block)
                has_text = bool("".join(re.findall(r"<a:t>([^<]*)</a:t>", block)).strip())
                if not (off and ext and has_text):
                    continue
                r_edge = int(off.group(1)) + int(ext.group(1))
                b_edge = int(off.group(2)) + int(ext.group(2))
                if r_edge > canvas_cx + 137160 or b_edge > canvas_cy + 137160:
                    errors.append(
                        f"第 {idx} 页带文字形状超出画布（右缘 {r_edge/914400:.1f}in/底缘 "
                        f"{b_edge/914400:.1f}in vs 画布 {canvas_cx/914400:.1f}×{canvas_cy/914400:.2f}in）"
                        "——疑似大画布坐标页嫁接进小画布册，内容会被裁；用 fix_canvas_scale.py 整页缩放"
                    )
                    break

        if not joined.strip():
            errors.append(f"第 {idx} 页没有任何文字")

    if len(slides) >= 2:
        xml2 = z.read(slides[1]).decode("utf8")
        if "导览" not in "".join(re.findall(r"<a:t>([^<]*)</a:t>", xml2)):
            errors.append('第 2 页未出现"导览"字样')

    # 检查项 10: 章数一致性(封面章节条/导览口径 vs 正文最大章号)
    if max_chapter:
        cover_ref = (strict_max_chapter or max_chapter) if cover_chip_grouped else max_chapter
        if cover_chip_max is not None and cover_chip_max != cover_ref:
            errors.append(
                f"封面章节条最大编号 {cover_chip_max} 与正文最大章号 {cover_ref} 不符"
                "——增章后封面未回刷（回刷清单点名项）"
            )
        for pg, v, raw in mainline_claims:
            if v != max_chapter:
                errors.append(
                    f"第 {pg} 页「{raw}」与正文最大章号 {max_chapter} 不符"
                    "——增章后封面/导览口径未回刷"
                )

    # 检查项 3 分级报告: 整册系统性(≥10 页且 ≥25%)=批次指纹一条汇总; 零星逐页报
    n_slides = max(len(slides), 1)
    if len(small_flag_pages) >= 10 and len(small_flag_pages) / n_slides >= 0.25:
        warnings.append(
            f"整册正文字号疑似低于档位下限：{len(small_flag_pages)}/{n_slides} 页"
            f"表格外小字字符占比超 {SMALL_RATIO:.0%}（生成批次指纹，常见于档位规则"
            "之前的批次）——渲染观感已目检放行的可暂不重排，下次 B 类更新时评估回正"
        )
    else:
        for idx, s, a in small_flag_pages:
            warnings.append(
                f"第 {idx} 页表格外 <{BODY_MIN_PT:g}pt 字符占比 {s}/{a}={s / a:.0%}"
                "，疑似正文字号不足（非对练/导览/术语/速查/来源等密集角色页）"
            )

    # 检查项 13: 每章固定元素与收尾四件套(WARN 级; 章数用眉题严格口径)
    if strict_max_chapter >= 2:
        chapters = set(range(1, strict_max_chapter + 1)) - cheat_chaps
        missing_all = {c for c in chapters
                       if all(c not in elem_cov[e] for e in CHAPTER_ELEMENTS)}
        # 末章缺全部四元素=未带「速查」章题的特例章惯例, 同样豁免
        exempt = {strict_max_chapter} & missing_all
        for c in sorted(missing_all - exempt):
            warnings.append(
                f"第 {c} 章未检出任何固定元素（学习目标/动手做/对练/小结）"
                "——若为速查/特例章可忽略，否则为漏配"
            )
        for e in CHAPTER_ELEMENTS:
            miss = sorted(chapters - elem_cov[e] - missing_all)
            if miss:
                warnings.append(
                    f"「{e}」未覆盖第 {miss} 章（每章固定元素，见 ppt-rules 每章结构）"
                )
        lacking = [k for k, v in closing.items() if not v]
        if lacking:
            warnings.append(
                f"收尾四件套缺：{'、'.join(lacking)}"
                "（工作场景挂钩为「无」的库，生产验收缺项可人工忽略）"
            )

    # 检查项 15: 相邻同题重复页对(疑似配图"替代型"未删源文字页; WARN 级, 需基线确认)
    # ——配图把信息图版"插在源页之后"却漏删源页, 会留下前后两页同大标题(前=文字版, 后=信息图版)。
    #   模板页(学习目标/动手做/对练/小结)分散不相邻, 天然不误报; 真相邻同题都值得人工核。
    adj_titles = []
    for name in slides:
        sx = z.read(name).decode("utf8")
        bt = ""
        for t in re.findall(r"<a:t>([^<]*)</a:t>", sx):
            t = t.strip()
            if not t or re.match(r"^第\s*\d+\s*章", t) or "讲义" in t:
                continue
            if len(norm_title(t)) >= 6:
                bt = norm_title(t); break
        adj_titles.append(bt)
    dup_exempts = EXEMPTIONS.get(
        (path.replace("\\", "/").rsplit("/", 1)[-1], "同题重复"), [])
    for i in range(len(adj_titles) - 1):
        if adj_titles[i] and adj_titles[i] == adj_titles[i + 1]:
            if any(adj_titles[i].startswith(p) for p in dup_exempts):
                warnings.append(
                    f"[豁免] 第 {i+1}/{i+2} 页同题（『{adj_titles[i][:16]}』）"
                    "——已登记为合法补充型页对（audit-exemptions.txt），不计告警"
                )
                continue
            warnings.append(
                f"第 {i+1}/{i+2} 页大标题相同（『{adj_titles[i][:16]}』）——疑似配图"
                "替代型未删源页。确认法：比对配图前基线，该主题若配图前 1 页→现 2 页即为"
                "残留，删前页(源文字版)留后页(信息图版)；若配图前本就两页则为合法补充，保留"
            )

    # 检查项 9: docProps/app.xml 一致性(仅 PowerPoint 校验, 不符会要求"修复")
    if "docProps/app.xml" in z.namelist():
        app = z.read("docProps/app.xml").decode("utf8")
        m_slides = re.search(r"<Slides>(\d+)</Slides>", app)
        if m_slides and int(m_slides.group(1)) != len(slides):
            errors.append(
                f"docProps/app.xml 登记 Slides={m_slides.group(1)} 与实际页数 {len(slides)} 不符"
                "——PowerPoint 会弹\"需要修复\";插/删页后须重建 app.xml"
            )
        m_vec = re.search(r'<TitlesOfParts>.*?<vt:vector size="(\d+)"', app, re.S)
        if m_vec:
            lp = len(re.findall(r"<vt:lpstr>", app.split("<TitlesOfParts>")[-1]))
            if int(m_vec.group(1)) != lp:
                errors.append(
                    f"docProps/app.xml TitlesOfParts 向量 size={m_vec.group(1)} 与标题条目数 {lp} 不符"
                )
            m_hp = re.search(r"<HeadingPairs>(.*?)</HeadingPairs>", app, re.S)
            if m_hp:
                hp_sum = sum(int(x) for x in re.findall(r"<vt:i4>(\d+)</vt:i4>", m_hp.group(1)))
                if hp_sum != int(m_vec.group(1)):
                    errors.append(
                        f"docProps/app.xml HeadingPairs 计数总和 {hp_sum} 与 TitlesOfParts "
                        f"size={m_vec.group(1)} 不符（PowerPoint 校验两者必须相等）"
                    )

    # 检查项 11: [Content_Types].xml 孤儿 Override
    ct = z.read("[Content_Types].xml").decode("utf8")
    nameset = set(z.namelist())
    orphans = [o for o in set(re.findall(r'PartName="([^"]+)"', ct))
               if o.lstrip("/") not in nameset]
    if orphans:
        errors.append(
            f"[Content_Types].xml 有 {len(orphans)} 条孤儿 Override（指向不存在的部件，"
            f"如 {sorted(orphans)[:3]}）——OPC 违规，须清理"
        )

    # 检查项 12: OOXML 顺序契约——Office 严格校验(不受信文件通道)的两条已知致命规则
    m_nml = re.search(r"<p:notesMasterIdLst[ />]", pres)
    m_sld = re.search(r"<p:sldIdLst[ />]", pres)
    if m_nml and m_sld and m_nml.start() > m_sld.start():
        errors.append(
            "presentation.xml: notesMasterIdLst 位于 sldIdLst 之后——违反 CT_Presentation "
            "元素序, Office 严格校验拒收(弹修复), 须移回 sldMasterIdLst 之后"
        )
    bad_ppr = []
    for name in z.namelist():
        if not re.match(r"ppt/(slides|notesSlides|slideMasters|slideLayouts|notesMasters)/[^/]+\.xml$", name):
            continue
        xml_part = z.read(name).decode("utf8")
        for para in re.findall(r"<a:p>(.*?)</a:p>", xml_part, re.S):
            pprs = [m.start() for m in re.finditer(r"<a:pPr[ />]", para)]
            if len(pprs) > 1 or (pprs and re.search(r"<a:(r|br|fld)[ >]", para[: pprs[0]])):
                bad_ppr.append(name.rsplit("/", 1)[-1])
                break
    if bad_ppr:
        errors.append(
            f"a:p 段落存在重复/非段首的 a:pPr（{len(bad_ppr)} 个部件，如 {bad_ppr[:3]}）"
            "——违反 CT_TextParagraph 元素序, Office 严格校验拒收(弹修复); "
            "修复=删除杂散 pPr、首个 pPr 归段首(零语义)"
        )

    # 检查项 14: theme / notesSlide 共享——Office 严格校验(不受信文件通道)拒收, LibreOffice/宽松通道发现不了
    nm_rels = "ppt/notesMasters/_rels/notesMaster1.xml.rels"
    if nm_rels in nameset:
        nm_t = re.search(r"theme(\d+)\.xml", z.read(nm_rels).decode("utf8"))
        sm_path = "ppt/slideMasters/_rels/slideMaster1.xml.rels"
        sm_t = re.search(r"theme(\d+)\.xml", z.read(sm_path).decode("utf8")) if sm_path in nameset else None
        if nm_t and sm_t and nm_t.group(1) == sm_t.group(1):
            errors.append(
                f"notesMaster 与 slideMaster 共用 theme{nm_t.group(1)}——每个 master 须独立 theme, "
                "Office 严格校验拒收(弹修复); 修复=fix_theme_sharing.py（复制出独立 theme）"
            )
    ns_ref = {}
    for name in nameset:
        if not re.match(r"ppt/slides/_rels/slide\d+\.xml\.rels$", name):
            continue
        for r in re.finditer(r'Target="\.\./notesSlides/(notesSlide\d+\.xml)"', z.read(name).decode("utf8")):
            ns_ref[r.group(1)] = ns_ref.get(r.group(1), 0) + 1
    shared_ns = {k: v for k, v in ns_ref.items() if v > 1}
    if shared_ns:
        dup = sum(v - 1 for v in shared_ns.values())
        errors.append(
            f"{dup} 处 notesSlide 被多个 slide 共享（如 {sorted(shared_ns)[:3]}）——每 slide 须独立 notesSlide, "
            "Office 严格校验拒收(弹修复); 修复=fix_theme_sharing.py（拆分共享副本）"
        )

    for (ctx, t), pages in sorted(titles.items(), key=lambda kv: -len(kv[1])):
        if len(pages) > 1:
            errors.append(
                f'标题重名 ×{len(pages)}「{t[:30]}」'
                f'（页眉/首行上下文亦相同「{ctx[:24]}」，第 {pages[:8]} 页）'
            )

    for f, pages in sorted(bad_fonts.items()):
        errors.append(f"非白名单字体 {f}（{len(pages)} 页，如第 {sorted(pages)[:5]} 页）")
    systemic = {c: p for c, p in offpal.items()
                if len(p) >= 10 and len(p) / n_slides >= 0.25}
    for c, pages in sorted(systemic.items(), key=lambda kv: -len(kv[1])):
        warnings.append(
            f"系统性色板漂移 #{c}：出现在 {len(pages)}/{n_slides} 页（生成批次指纹）"
            "——观感自洽可暂不整册重着色，但下次 B 类内容更新时应随手按令牌回正"
        )
    for c, pages in sorted(offpal.items(), key=lambda kv: -len(kv[1])):
        if c in systemic:
            continue
        warnings.append(
            f"非令牌色 #{c} 出现在 {len(pages)} 页（如第 {sorted(pages)[:5]} 页）"
            "——图表系列色可豁免，其余需改回色板"
        )

    return len(slides), errors, warnings


def main(argv):
    args = [a for a in argv[1:] if not a.startswith("--")]
    profile = "reading"
    for a in argv[1:]:
        if a.startswith("--profile"):
            profile = a.split("=", 1)[1] if "=" in a else "reading"
    if "--profile" in argv:
        i = argv.index("--profile")
        if i + 1 < len(argv):
            profile = argv[i + 1]
            args = [a for a in args if a != profile]
    if not args or profile not in PROFILES:
        print(__doc__)
        return 1
    print(f"档位: {profile}（{'自读' if profile == 'reading' else '投屏'}）")
    failed = False
    for path in args:
        base = path.replace("\\", "/").rsplit("/", 1)[-1]
        if base.startswith("~$"):
            print(f"\n===== {path}: SKIP（Office 锁文件，非讲义，不计结果）=====")
            continue
        try:
            n, errors, warnings = audit(path, profile)
        except Exception as e:
            print(f"\n===== {path}: FAIL =====")
            print(f"  [错误] 无法读取（{type(e).__name__}: {e}）"
                  "——损坏或非 .pptx；跳过本文件，继续审计其余文件")
            failed = True
            continue
        status = "FAIL" if errors else "PASS"
        print(f"\n===== {path}（{n} 页）: {status} =====")
        for e in errors:
            print(f"  [错误] {e}")
        for w in warnings:
            print(f"  {w}" if w.startswith("[豁免]") else f"  [告警] {w}")
        if errors:
            failed = True
        if not errors and not any(not w.startswith("[豁免]") for w in warnings):
            print("  全部契约检查通过。仍需渲染后逐页目检（溢出/遮挡/丢字）。")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
