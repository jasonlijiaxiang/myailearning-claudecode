#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从各模块 MANIFEST.md 生成网页面注册表 data.js（零第三方依赖）。

真源唯一：模块结构、章节、时效性事实、串联关系的唯一出处是 `PPT-version/<模块>/MANIFEST.md`
（core-rules §一）。网页需要的机器可读注册表一律由本脚本生成，**禁止手工双写第二份**。

产物 `data.js` 用 `<script>` 引入而不是 fetch——浏览器在 file:// 下会拦截 fetch 与 ES module
加载，而整库必须双击即开（web-design-system Portable 铁律）。

用法:
  python3 build.py            # 重新生成 data.js
  python3 build.py --check    # 只校验：重算一遍与现存 data.js 比对，有漂移则退出码 1
退出码: 0 = 成功 / 已同步, 1 = 生成失败或检出漂移。
"""
import datetime
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PPT = os.path.join(ROOT, "PPT-version")
OUT = os.path.join(HERE, "data.js")
INDEX = os.path.join(HERE, "index.html")
MAP_BEGIN = ("<!-- MAP:BEGIN 本段由 Web-version/build.py 从各模块 MANIFEST.md 生成，"
             "请勿手工编辑 -->")
MAP_END = "<!-- MAP:END -->"
NET_BEGIN = "<!-- NET:BEGIN 由 build.py 从 MANIFEST 串联出边生成，请勿手工编辑 -->"
NET_END = "<!-- NET:END -->"
FRESH_BEGIN = "<!-- FRESH:BEGIN 由 build.py 从 MANIFEST 时效性事实生成，请勿手工编辑 -->"
FRESH_END = "<!-- FRESH:END -->"
# 模块页页脚的「最近改动」：同样从 MANIFEST 取，手写会漂。
MOD_PAGES = {"mcp": os.path.join(HERE, "mcp", "index.html")}
SIDE_BEGIN = "<!-- SIDE:BEGIN 由 build.py 从 MANIFEST 生成，请勿手工编辑 -->"
SIDE_END = "<!-- SIDE:END -->"
FRESHPAGE = os.path.join(HERE, "fresh.html")
MOD_BEGIN = "<!-- UPDATED:BEGIN 由 build.py 从 MANIFEST 取，请勿手工编辑 -->"
MOD_END = "<!-- UPDATED:END -->"

# 保鲜看板的"今天"：写死在产物里会一天就过期，故取构建日。
# 这是生成期快照，页面上会显式标注截止日，不冒充实时。
BUILD_DATE = datetime.date.today().isoformat()

# 书架顺序以 KB-CONFIG.md「知识地图层定义」为准；这里只固定展示次序，层名本身仍从 MANIFEST 读。
LAYER_ORDER = ["解决方案层", "应用模式层", "协议层", "工程保障层", "基础层",
               "算力底座层", "数据底座层"]

# 模块字标（卡片左侧的色块缩写，导航站的"favicon 位"）；缺省取前两个字母大写。
MONO = {"A2A": "A2", "AI-Gateway": "GW", "AI-Infra-Compute": "IC",
        "AI-Infra-Platform": "IP", "AI-Ops": "OP", "Agent": "AG",
        "Data-Engineering": "DE", "Evaluation": "EV", "Fine-tuning": "FT",
        "LLM": "LM", "LLM-Inference": "LI", "LLM-Training": "LT",
        "MCP": "MC", "Model-Landscape": "ML", "Multimodal": "MM",
        "Prompt-Engineering": "PE", "RAG": "RA", "Security": "SE",
        "Solution-Patterns": "SP"}


def mono(dirname):
    if dirname in MONO:
        return MONO[dirname]
    letters = [c for c in dirname if c.isalnum()]
    return "".join(letters[:2]).upper() or "KB"


# 已建网页面的模块（试点先行：样板册定稿前不做全库转换）。
# 值为站内相对路径；不在表内的模块在总览页显示为"仅 PPT"。
WEB_PAGES = {"mcp": "./mcp/"}


def rows(section, text):
    """取某个 ## 段落下的表格数据行（跳过表头与 |---| 分隔行）。"""
    m = re.search(r"^## %s.*?$(.*?)(?=^## |\Z)" % re.escape(section),
                  text, re.S | re.M)
    if not m:
        return []
    out = []
    for line in m.group(1).split("\n"):
        line = line.strip()
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if not cells or set(cells[0]) <= set("- :"):   # 分隔行
            continue
        if cells[0] in ("字段", "章节 ID", "事实", "本模块章节"):  # 表头
            continue
        out.append(cells)
    return out


def field(text, name):
    for cells in rows("模块信息", text):
        if len(cells) >= 2 and cells[0] == name:
            return cells[1]
    return ""


def clean_layer(raw):
    """所在层可能带括注（如「解决方案层（2026-07-10 层调整：…）」），只取层名。"""
    return re.split(r"[（(]", raw, 1)[0].strip()


def read_module(dirname):
    path = os.path.join(PPT, dirname, "MANIFEST.md")
    text = open(path, encoding="utf-8").read()
    mid = field(text, "模块 ID")
    if not mid:
        raise SystemExit("%s：MANIFEST 缺「模块 ID」" % dirname)

    chapters = []
    for c in rows("章节清单", text):
        if len(c) < 3:
            continue
        chapters.append({"id": c[0], "no": c[1], "title": c[2],
                         "verified": c[4] if len(c) > 4 else ""})

    facts = []
    for c in rows("时效性事实（巡检盘查对象）", text) or rows("时效性事实", text):
        if len(c) < 4:
            continue
        facts.append({"text": c[0], "chapter": c[1], "verified": c[2],
                      "source": c[3], "recheck": c[4] if len(c) > 4 else "—"})

    edges = []
    for c in rows("串联出边", text):
        if len(c) < 3:
            continue
        edges.append({"from": c[0], "to": c[1], "why": c[2]})

    # 「最后更新」是长散文，里面混着两类日期：改动日与内容里提到的日期
    # （如"2026-07-28 新版规范"）。取**不晚于构建日的最大值**——
    # 取第一个会拿到最早那次改动（19 个模块曾全显示成 2026-07-12），
    # 取最大值会拿到未来的内容日期。
    _dates = [d for d in re.findall(r"\d{4}-\d{2}-\d{2}", field(text, "最后更新"))
              if d <= BUILD_DATE]
    m = max(_dates) if _dates else ""
    return {
        "id": mid,
        "dir": dirname,
        "layer": clean_layer(field(text, "所在层")),
        "created": field(text, "建立日期"),
        "updated": m,
        "chapters": chapters,
        "facts": facts,
        "edges": edges,
        "web": WEB_PAGES.get(mid, ""),
    }


def load_blurbs():
    """模块一句话简介，解析自 PPT 总览的模块表——那是「主题一句话」的账面位置
    （library-rules 索引两层），这里是读账，不是另建第二份。"""
    path = os.path.join(PPT, "README.html")
    try:
        text = open(path, encoding="utf-8").read()
    except OSError:
        return {}
    out = {}
    for d, raw in re.findall(
            r'<td><a href="\./([^/]+)/README\.html">[^<]*</a></td>\s*<td>(.*?)</td>',
            text, re.S):
        txt = re.sub(r"<[^>]+>", "", raw)
        out[d] = re.sub(r"\s+", " ", txt).strip()
    return out


def build():
    dirs = sorted(d for d in os.listdir(PPT)
                  if os.path.isfile(os.path.join(PPT, d, "MANIFEST.md")))
    mods = [read_module(d) for d in dirs]

    seen = {}
    for m in mods:
        if m["id"] in seen:
            raise SystemExit("模块 ID 重复：%s（%s / %s）"
                             % (m["id"], seen[m["id"]], m["dir"]))
        seen[m["id"]] = m["dir"]

    known = {m["id"] for m in mods}
    layers = [l for l in LAYER_ORDER if any(m["layer"] == l for m in mods)]
    for m in mods:                      # 层出现在模块里却不在书架顺序表 → 显式报错而非静默丢失
        if m["layer"] not in layers:
            raise SystemExit("%s 的所在层「%s」不在 LAYER_ORDER，"
                             "请同步 KB-CONFIG 知识地图层定义" % (m["dir"], m["layer"]))

    # 串联出边指向「模块#章节ID」；指向未建模块的写法（如「（候选）X」）标为待建，不算坏边。
    for m in mods:
        for e in m["edges"]:
            tgt = e["to"].split("#")[0].strip()
            e["resolved"] = tgt in known

    data = {"generated_from": "PPT-version/*/MANIFEST.md",
            "layers": layers, "modules": mods}
    return ("// 本文件由 Web-version/build.py 从各模块 MANIFEST.md 生成，请勿手工编辑。\n"
            "// 改内容请改 MANIFEST，然后重跑 build.py。\n"
            "window.KB = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
             .replace('"', "&quot;"))


def render_map(data, blurbs):
    """知识地图 → 导航站式卡片矩阵（生成期静态注入，无 JS 时仍完整可读）。"""
    out = []
    for i, layer in enumerate(data["layers"]):
        mods = [m for m in data["modules"] if m["layer"] == layer]
        if not mods:
            continue
        out.append('  <section class="layer hue-%d" id="lay-%d">' % (i, i))
        out.append('   <h3>%s<span class="n">%d 个模块</span></h3>'
                   % (esc(layer), len(mods)))
        out.append('   <div class="cards">')
        for m in mods:
            href = m["web"] or ("../PPT-version/%s/README.html" % m["dir"])
            tag = ("web", "网页版") if m["web"] else ("ppt", "仅 PPT")
            blurb = blurbs.get(m["dir"], "")
            out.append('    <a class="card" href="%s"%s>'
                       % (esc(href), (' title="%s"' % esc(blurb)) if blurb else ""))
            out.append('     <div class="chead"><span class="tile">%s</span>'
                       '<span class="cname">%s</span><span class="tag %s">%s</span></div>'
                       % (esc(mono(m["dir"])), esc(m["dir"]), tag[0], tag[1]))
            if blurb:
                out.append('     <div class="blurb">%s</div>' % esc(blurb))
            out.append('     <div class="meta">%d 章 · 更新 %s</div>'
                       % (len(m["chapters"]), esc(m["updated"] or "—")))
            out.append("    </a>")
        out.append("   </div>")
        out.append("  </section>")
    return "\n".join(out)


def render_side(data):
    """左侧导航：分组 + 层锚点（纯锚点链接，无 JS 可用）。"""
    o = ['  <nav>']
    o.append('   <div class="sgroup">每日取用</div>')
    for name, href in [("实战包", "../_prep/实战包.html"),
                       ("学习路径", "../_prep/学习路径.html"),
                       ("全库一页纸", "../_prep/全库一页纸.html")]:
        o.append('   <a class="sl" href="%s">%s</a>' % (href, name))
    o.append('   <div class="sgroup">知识地图</div>')
    for i, layer in enumerate(data["layers"]):
        n = sum(1 for m in data["modules"] if m["layer"] == layer)
        if not n:
            continue
        o.append('   <a class="sl hue-%d" href="#lay-%d"><span class="lbl">%s</span>'
                 '<span class="cnt">%d</span></a>'
                 % (i, i, esc(layer), n))
    o.append('   <div class="sgroup">全库视图</div>')
    o.append('   <a class="sl" href="#net">关系网</a>')
    o.append('   <a class="sl" href="#fresh">保鲜看板</a>')
    o.append('   <a class="sl" href="./fresh.html">完整保鲜看板</a>')
    o.append('   <div class="sgroup">入口</div>')
    o.append('   <a class="sl" href="./mcp/">MCP 网页版<span class="cnt">样板</span></a>')
    o.append('   <a class="sl" href="../PPT-version/README.html">PPT 总览</a>')
    o.append('   <a class="sl" href="../README.html">知识库首页</a>')
    o.append('  </nav>')
    return "\n".join(o)


def render_network(data):
    """跨模块关系网：讲一个模块时还该带上哪几块。

    这是网页面相对 PPT 的结构性优势——19 册讲义各印各的，纸面上无法互相指；
    而串联关系本来就登记在各模块 MANIFEST 的「串联出边」里，这里只是把它们汇到一处。
    """
    mods = data["modules"]
    by_id = {m["id"]: m for m in mods}
    out_map, in_map = {}, {}
    for m in mods:
        for e in m["edges"]:
            tgt = e["to"].split("#")[0].strip()
            if not e.get("resolved") or tgt == m["id"]:
                continue
            out_map.setdefault(m["id"], {}).setdefault(tgt, e["why"])
            in_map.setdefault(tgt, {}).setdefault(m["id"], e["why"])

    def name(mid):
        return by_id[mid]["dir"] if mid in by_id else mid

    def href(mid):
        m = by_id.get(mid)
        if not m:
            return ""
        return m["web"] or ("../PPT-version/%s/README.html" % m["dir"])

    deg = sorted(mods, key=lambda m: -(len(out_map.get(m["id"], {}))
                                       + len(in_map.get(m["id"], {}))))
    hubs = "、".join("%s（%d）" % (m["dir"],
                                 len(out_map.get(m["id"], {})) + len(in_map.get(m["id"], {})))
                    for m in deg[:3])

    o = ['  <p class="net-lead">关联最密的三块：<b>%s</b>——括号是它连出与连入的模块数。'
         '讲这几块时最容易牵出别的话题，也最值得先吃透。</p>' % esc(hubs)]
    # 窄屏另给一个「相关模块」合并列：出边与入边对读者是同一个用途，
    # 三列硬撑到手机上一行会高到 400px（2026-07-20 实测），故窄屏合并（CSS 切换）。
    o.append('  <div class="tw">')
    o.append('  <table class="net">')
    o.append('   <thead><tr><th>模块</th><th class="c-out">讲它时还该带上</th>'
             '<th class="c-in">谁会引到它</th><th class="c-all">相关模块</th></tr></thead>')
    o.append("   <tbody>")

    def links(d):
        if not d:
            return '<span class="none">—</span>'
        return "、".join('<a href="%s" title="%s">%s</a>'
                        % (esc(href(k)), esc(v[:60]), esc(name(k)))
                        for k, v in sorted(d.items()))

    for m in mods:
        outs = out_map.get(m["id"], {})
        ins = in_map.get(m["id"], {})
        merged = dict(ins)
        merged.update(outs)          # 出边的关系说明优先
        o.append('    <tr><td><b>%s</b></td><td class="c-out">%s</td>'
                 '<td class="c-in">%s</td><td class="c-all">%s</td></tr>'
                 % (esc(m["dir"]), links(outs), links(ins), links(merged)))
    o.append("   </tbody></table></div>")
    return "\n".join(o)


def _fresh_rows(data):
    rows_ = [(m, f) for m in data["modules"] for f in m["facts"]]
    due = [(m, f) for m, f in rows_
           if re.match(r"^\d{4}-\d{2}-\d{2}$", f.get("recheck", "").strip())]
    due.sort(key=lambda x: x[1]["recheck"])
    stale = sorted(rows_, key=lambda x: x[1]["verified"])[:8]
    return rows_, due, stale


def _href(m):
    return m["web"] or ("../PPT-version/%s/README.html" % m["dir"])


def _fact_table(rows, kind):
    """kind='due' 按复查日排，'stale' 按核实日排。"""
    head = "复查日" if kind == "due" else "核实于"
    o = ['  <div class="tw"><table class="fresh">',
         "   <thead><tr><th>%s</th><th>模块</th><th>事实</th></tr></thead><tbody>" % head]
    for m, f in rows:
        txt = esc(f["text"][:78] + ("…" if len(f["text"]) > 78 else ""))
        if kind == "due":
            overdue = f["recheck"] < BUILD_DATE
            o.append('    <tr%s><td><span class="badge %s">%s%s</span></td>'
                     '<td><a href="%s">%s</a></td><td>%s</td></tr>'
                     % (' class="over"' if overdue else "",
                        "over" if overdue else "recheck",
                        "已过期 " if overdue else "", esc(f["recheck"]),
                        esc(_href(m)), esc(m["dir"]), txt))
        else:
            o.append('    <tr><td>%s</td><td><a href="%s">%s</a></td><td>%s</td></tr>'
                     % (esc(f["verified"]), esc(_href(m)), esc(m["dir"]), txt))
    o.append("   </tbody></table></div>")
    return "\n".join(o)


def render_fresh(data):
    """首页只放「该管的」：已过期 + 30 天内到期。长尾去 fresh.html。

    理由：首页是学习入口，不是维护看板。真到期的该在首页拦住人，
    「最久未核实」这类长尾是巡检时才翻的（2026-07-20 用户裁决）。
    """
    rows_, due, stale = _fresh_rows(data)
    y, mo, d = (int(x) for x in BUILD_DATE.split("-"))
    mo2, y2 = (mo + 1, y) if mo < 12 else (1, y + 1)
    horizon = "%04d-%02d-%02d" % (y2, mo2, d)      # 约 30 天
    near = [(m, f) for m, f in due if f["recheck"] <= horizon]
    later = len(due) - len(near)

    o = []
    if near:
        o.append('  <p class="net-lead">截至构建日 <b>%s</b>，'
                 '<b>%d 条</b>已到期或将在一个月内到期。</p>' % (BUILD_DATE, len(near)))
        o.append(_fact_table(near, "due"))
    else:
        o.append('  <p class="net-lead">截至构建日 <b>%s</b>，一个月内没有需要复查的事实。</p>'
                 % BUILD_DATE)
    o.append('  <p class="net-lead">全库共 %d 条时效性事实；另有 %d 条排在一个月之后、'
             '以及核实日期最早的若干条，见 <a href="./fresh.html">完整保鲜看板</a>。</p>'
             % (len(rows_), later))
    return "\n".join(o)


def render_fresh_full(data):
    rows_, due, stale = _fresh_rows(data)
    o = ['  <p class="net-lead">截至构建日 <b>%s</b>。全库共 %d 条时效性事实登记在各模块账本里，'
         '其中 %d 条写了定点复查日。引用任何数字前先核日期。</p>' % (BUILD_DATE, len(rows_), len(due))]
    o.append("  <h2>定点复查日已排期</h2>")
    o.append(_fact_table(due, "due"))
    o.append("  <h2>核实日期最早的几条</h2>")
    o.append('  <p class="net-lead">没写定点复查日，但放得最久——巡检默认按 90 天阈值筛，'
             '这几条是每次巡检最先该看的。</p>')
    o.append(_fact_table(stale, "stale"))
    return "\n".join(o)


def inject(html, begin, end, block, what):
    i = html.find(begin)
    j = html.find(end)
    if i < 0 or j < 0 or j < i:
        raise SystemExit("index.html 缺少 %s 标记" % what)
    return html[:i + len(begin)] + "\n" + block + "\n  " + html[j:]


def main(argv):
    try:
        text = build()
        data = json.loads(text[text.index("{"):text.rindex("}") + 1])
        blurbs = load_blurbs()
        html_cur = open(INDEX, encoding="utf-8").read()
        html_new = inject(html_cur, MAP_BEGIN, MAP_END, render_map(data, blurbs), "MAP")
        html_new = inject(html_new, SIDE_BEGIN, SIDE_END, render_side(data), "SIDE")
        html_new = inject(html_new, NET_BEGIN, NET_END, render_network(data), "NET")
        html_new = inject(html_new, FRESH_BEGIN, FRESH_END, render_fresh(data), "FRESH")
        fp_cur = open(FRESHPAGE, encoding="utf-8").read()
        fp_new = inject(fp_cur, FRESH_BEGIN, FRESH_END, render_fresh_full(data), "FRESH@full")

        mod_cur, mod_new = {}, {}
        by_id = {m["id"]: m for m in data["modules"]}
        for mid, path in MOD_PAGES.items():
            if not os.path.exists(path) or mid not in by_id:
                continue
            cur = open(path, encoding="utf-8").read()
            block = ('  <p class="updated">本册最近改动 <b>%s</b>'
                     '（以模块账本 MANIFEST 为准）。</p>' % esc(by_id[mid]["updated"]))
            mod_cur[path] = cur
            mod_new[path] = inject(cur, MOD_BEGIN, MOD_END, block, "UPDATED@" + mid)
    except SystemExit as e:
        print("生成失败：%s" % e)
        return 1

    if "--check" in argv:
        if not os.path.exists(OUT):
            print("data.js 不存在，请先跑 build.py")
            return 1
        bad = []
        if open(OUT, encoding="utf-8").read() != text:
            bad.append("data.js")
        if html_cur != html_new:
            bad.append("index.html 的生成区块（知识地图/关系网/保鲜看板）")
        if fp_cur != fp_new:
            bad.append("fresh.html")
        for path in mod_new:
            if mod_cur[path] != mod_new[path]:
                bad.append("%s 的最近改动" % os.path.relpath(path, ROOT))
        if bad:
            print("与 MANIFEST 已漂移：%s——请重跑 build.py 并提交产物。" % "、".join(bad))
            return 1
        print("data.js 与 index.html 生成区块均与 MANIFEST 一致。")
        return 0

    open(OUT, "w", encoding="utf-8").write(text)
    open(INDEX, "w", encoding="utf-8").write(html_new)
    open(FRESHPAGE, "w", encoding="utf-8").write(fp_new)
    for path, content in mod_new.items():
        open(path, "w", encoding="utf-8").write(content)
    print("已生成 %s 与 index.html 的三个区块（知识地图/关系网/保鲜看板，%d 个模块）"
          % (os.path.relpath(OUT, ROOT), len(data["modules"])))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
