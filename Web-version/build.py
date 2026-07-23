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
ROOT_INDEX = os.path.join(ROOT, "README.html")
MAPR_BEGIN = "<!-- MAPR:BEGIN 由 build.py 从各模块 MANIFEST.md 生成，请勿手工编辑 -->"
MAPR_END = "<!-- MAPR:END -->"
NET_BEGIN = "<!-- NET:BEGIN 由 build.py 从 MANIFEST 串联出边生成，请勿手工编辑 -->"
NET_END = "<!-- NET:END -->"
FRESH_BEGIN = "<!-- FRESH:BEGIN 由 build.py 从 MANIFEST 时效性事实生成，请勿手工编辑 -->"
FRESH_END = "<!-- FRESH:END -->"
FRESHPAGE = os.path.join(HERE, "fresh.html")
MOD_BEGIN = "<!-- UPDATED:BEGIN 由 build.py 从 MANIFEST 取，请勿手工编辑 -->"
MOD_END = "<!-- UPDATED:END -->"
QAPAGE = os.path.join(HERE, "qa", "index.html")
QA_BEGIN = "<!-- QA:BEGIN 由 build.py 从各模块页与实战包抽取，请勿手工编辑 -->"
QA_END = "<!-- QA:END -->"
PREPQA = os.path.join(ROOT, "_prep", "实战包.html")

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


# 已建网页版的模块——**单一来源**：键=模块 ID（与 MANIFEST 一致），值=站内目录名。
# 页面路径与页脚注入路径都从这里派生，不再各写一份（曾因两份格式不同，
# 批量注册脚本直接产出语法错误，返工一轮）。新增一册只改这一处。
# 不在表内的模块在知识地图显示为「仅 PPT」。
WEB_DIRS = {
    "mcp": "mcp",
    "model-landscape": "model-landscape",
    "llm-inference": "llm-inference",
    "agent": "agent",
    "evaluation": "evaluation",
    "ai-gateway": "ai-gateway",
    "rag": "rag",
    "llm": "llm",
    "fine-tuning": "fine-tuning",
    "pe": "prompt-engineering",
    "llm-training": "llm-training",
    "security": "security",
    "a2a": "a2a",
    "multimodal": "multimodal",
    "solution-patterns": "solution-patterns",
    "ai-ops": "ai-ops",
    "data-engineering": "data-engineering",
    "ai-infra-compute": "ai-infra-compute",
    "ai-infra-platform": "ai-infra-platform",
}

# 派生一：站内相对路径。必须指到文件——file:// 下目录链接不会自动打开 index.html。
WEB_PAGES = {mid: "./%s/index.html" % d for mid, d in WEB_DIRS.items()}
# 派生二：模块页绝对路径，用于注入页脚「本册最近改动」（从 MANIFEST 取，手写会漂）。
MOD_PAGES = {mid: os.path.join(HERE, d, "index.html") for mid, d in WEB_DIRS.items()}

# ============ 知识点串联（章末串联条 + 关键词索引）============
# 每个内容章的末尾生成一条「串联」行：这一章牵出的其他主题，点了就到它在库内的落点。
# 两路数据源，都不新造事实：
# ① MANIFEST「串联出边」——章节级、带关系说明，唯一账本（core-rules §一）；
# ② CONCEPTS 关键词索引——关键词 → 它在库内的主归属落点（web-rules §五
#    「同一概念只有一个主要归属模块」的机器可读形态）。只存「词 → 去处」，
#    零释义、零事实——与 MONO / LAYER_ORDER 同地位：导航配置，不是第二份内容账。
# 正文提到某个关键技术、而它的主场在别的册时，串联条给一条链接；
# 该章已有手写链接指向那一册的不重复给。落点在生成时校验，对不上直接报错。
CONCEPTS = {
    # 关键词: "模块ID#章节ID"（由 2026-07-23 十九册知识点对账盘出，见
    # _maintenance/2026-07-23-知识点对照与串联-设计.md）。
    # 只收「关键技术」——一个词在库内有唯一明确的主场章节，且常在别的册被顺带提到。
    # 不收模块名（RAG/Agent/MCP 这类）：那是引用不是术语，会把串联条变成词云。
    # 落点在生成时校验（resolve_concepts），对不上直接报错。
    # —— 微调 / 训练 ——
    "LoRA": "fine-tuning#ft-methods",
    "QLoRA": "fine-tuning#ft-methods",
    "灾难性遗忘": "fine-tuning#ft-eval-deploy",
    "RLHF": "llm-training#llmtrain-alignment",
    "DPO": "llm-training#llmtrain-alignment",
    "GRPO": "llm-training#llmtrain-reasoning",
    "RLVR": "llm-training#llmtrain-reasoning",
    "Chinchilla": "llm-training#llmtrain-pretrain",
    # —— 模型原理 ——
    "RoPE": "llm#llm-architecture",
    "MoE": "llm#llm-architecture",
    "GQA": "llm#llm-attention-zoo",
    "MLA": "llm#llm-attention-zoo",
    "FlashAttention": "llm#llm-attention-zoo",
    # —— 检索 / RAG ——
    "RRF": "rag#rag-hybrid",
    "BM25": "rag#rag-hybrid",
    "混合检索": "rag#rag-hybrid",
    "重排序": "rag#rag-reranking",
    "GraphRAG": "rag#rag-graphrag",
    "Agentic RAG": "rag#rag-agentic",
    "ColPali": "rag#rag-multimodal",
    "上下文检索": "rag#rag-chunking",
    "语义层": "rag#rag-structured",
    # —— 数据底座 ——
    "文档智能解析": "data-engineering#de-parsing",
    "向量库迁移": "data-engineering#de-vectordb",
    # —— Agent / 协议 ——
    "Sub-agent": "agent#agent-subagent",
    "Computer Use": "agent#agent-computer-use",
    "上下文工程": "agent#agent-context",
    "记忆投毒": "agent#agent-memory",
    "Streamable HTTP": "mcp#mcp-transport",
    "Agent Card": "a2a#a2a-protocol",
    "AP2": "a2a#a2a-production",
    # —— 推理服务 ——
    "KV Cache": "llm-inference#llminf-kv-budget",
    "KV 缓存": "llm-inference#llminf-kv-budget",
    "PagedAttention": "llm-inference#llminf-batching",
    "Continuous Batching": "llm-inference#llminf-batching",
    "投机解码": "llm-inference#llminf-speculative",
    "goodput": "llm-inference#llminf-production",
    "vLLM": "llm-inference#llminf-engines",
    "SGLang": "llm-inference#llminf-engines",
    # —— 算力硬件 / 平台 ——
    "HBM": "ai-infra-compute#aic-hbm",
    "NVLink": "ai-infra-compute#aic-scaleup",
    "NVL72": "ai-infra-compute#aic-scaleup",
    "RDMA": "ai-infra-compute#aic-scaleout",
    "InfiniBand": "ai-infra-compute#aic-scaleout",
    "MIG": "ai-infra-platform#aip-sharing",
    "gang scheduling": "ai-infra-platform#aip-scheduling",
    "KServe": "ai-infra-platform#aip-serving",
    # —— 评估 ——
    "LLM-as-a-Judge": "evaluation#eval-judge",
    "判官校准": "evaluation#eval-judge",
    "黄金集": "evaluation#eval-build",
    "MMLU": "evaluation#eval-benchmarks",
    "SWE-bench": "evaluation#eval-benchmarks",
    # —— 安全 / 合规 ——
    "提示注入": "security#sec-prompt-injection",
    "间接注入": "security#sec-prompt-injection",
    "MITRE ATLAS": "security#sec-landscape",
    "EU AI Act": "security#sec-governance",
    # —— 提示词 ——
    "思维链": "pe#pe-core-techniques",
    "DSPy": "pe#pe-engineering",
    "提示词缓存": "pe#pe-engineering",
    # —— 多模态 / 格局 ——
    "ViT": "multimodal#mm-encoder",
    "开放权重": "model-landscape#ml-open",
}


def resolve_concepts(by_id):
    """校验 CONCEPTS 的落点真实存在，返回 词 → (模块ID, 章节ID)。"""
    out = {}
    for term, home in CONCEPTS.items():
        tmod, _, tch = home.partition("#")
        m = by_id.get(tmod)
        if not m or tmod not in WEB_DIRS:
            raise SystemExit("CONCEPTS「%s」指向未知或未建网页版的模块：%s" % (term, home))
        if tch not in {c["id"] for c in m["chapters"]}:
            raise SystemExit("CONCEPTS「%s」指向不存在的章节：%s" % (term, home))
        out[term] = (tmod, tch)
    return out


SEC_RE = re.compile(
    r'(<section class="sec" id="(?P<sid>[^"]+)">)(?P<body>.*?)(</section>)', re.S)
XLINKS_OLD_RE = re.compile(r'\n?[ \t]*<div class="xlinks">.*?</div>\n?', re.S)
TAG_RE = re.compile(r"<[^>]+>")
_WORDY = re.compile(r"[A-Za-z0-9-]")


def _ascii_hit(text, term):
    """英文词按词边界找：避免「MoE」命中「MoEngage」这类半截词。"""
    start = 0
    while True:
        i = text.find(term, start)
        if i < 0:
            return -1
        before = text[i - 1] if i else ""
        after = text[i + len(term)] if i + len(term) < len(text) else ""
        if not (_WORDY.match(before) or _WORDY.match(after)):
            return i
        start = i + 1


def parse_edge_targets(e):
    """拆「串联出边」的复合写法：from 可能「a / b」（两章共用一条边），
    to 可能「mod#c1 / c2」（后半截沿用前面的模块）或不带锚点的裸模块名。"""
    froms = [f.strip() for f in e["from"].split("/") if f.strip()]
    outs, tmod = [], ""
    for part in (p.strip() for p in e["to"].split("/")):
        if not part:
            continue
        if "#" in part:
            tmod, tch = (x.strip() for x in part.split("#", 1))
        elif tmod:
            tch = part
        else:
            tmod, tch = part, ""
        outs.append((tmod, tch))
    return froms, outs


def _short(title):
    """串联条标签用短章题：去掉「（五锚点 / 按规模演进…）」这类目录式括注。"""
    return re.split(r"[（(]", title, 1)[0].strip()


def _clip(s, n=88):
    return s if len(s) <= n else s[:n] + "…"


def module_xlinks(m, by_id):
    """账本出边 → 每章的串联条目（人工判定的边排在前，关系说明进 title）。"""
    chap_ids = {c["id"] for c in m["chapters"]}
    per = {}
    for e in m["edges"]:
        if not e.get("resolved"):
            continue
        froms, outs = parse_edge_targets(e)
        for sid in froms:
            if sid not in chap_ids:
                continue
            for tmod, tch in outs:
                t = by_id.get(tmod)
                if not t:
                    continue
                titles = {c["id"]: c["title"] for c in t["chapters"]}
                anchor = ("#" + tch) if tch in titles else ""
                if tmod == m["id"]:
                    if not anchor or tch == sid:
                        continue        # 指回本章或没有可用锚点，无导航价值
                    href, label, sub = anchor, _short(titles[tch]), "本页"
                elif tmod in WEB_DIRS:
                    href = "../%s/index.html%s" % (WEB_DIRS[tmod], anchor)
                    label = _short(titles.get(tch, "")) or t["dir"]
                    sub = t["dir"] if label != t["dir"] else ""
                else:
                    continue
                per.setdefault(sid, []).append({
                    "href": href, "label": label, "sub": sub,
                    "title": _clip(e["why"]), "mod": tmod,
                })
    return per


def inject_xlinks(html_text, m, by_id, concepts):
    """向每个内容章 </section> 前注入串联条；qa/相关模块/来源三节不注入。
    幂等：先摘掉上一轮生成的块再插，重跑结果一致（--check 依赖这一点）。"""
    html_text = XLINKS_OLD_RE.sub("\n", html_text)
    per = module_xlinks(m, by_id)
    chap_ids = {c["id"] for c in m["chapters"]}

    def repl(match):
        sid = match.group("sid")
        if sid not in chap_ids:
            return match.group(0)
        body = match.group("body")
        items = list(per.get(sid, []))
        # 关键词命中：查纯文本（去掉标签与脚本），别把 href/title 里的词也算上
        text = TAG_RE.sub(" ", re.sub(r"<script\b.*?</script>", " ", body, flags=re.S))
        linked = {d.lower() for d in
                  re.findall(r'href="\.\./([a-z0-9-]+)/index\.html', body)}
        linked |= {d.lower() for d in
                   re.findall(r'href="\.\./\.\./PPT-version/([^/"]+)/', body)}
        used = {it["mod"] for it in items}
        hits = []
        for term, (tmod, tch) in concepts.items():
            if tmod == m["id"] or tmod in used:
                continue
            if WEB_DIRS[tmod] in linked or by_id[tmod]["dir"].lower() in linked:
                continue                # 本章正文已手写链接指向那一册，不重复给
            pos = _ascii_hit(text, term) if term.isascii() else text.find(term)
            if pos >= 0:
                hits.append((pos, term, tmod, tch))
        hits.sort()
        seen_mod = set()
        for pos, term, tmod, tch in hits:
            if tmod in seen_mod:        # 关键词路一册只给一条，防止串联条变词云
                continue
            seen_mod.add(tmod)
            t = by_id[tmod]
            titles = {c["id"]: c["title"] for c in t["chapters"]}
            items.append({
                "href": "../%s/index.html#%s" % (WEB_DIRS[tmod], tch),
                "label": term, "sub": t["dir"],
                "title": "这个词的主场：%s · %s" % (t["dir"], _short(titles.get(tch, ""))),
                "mod": tmod,
            })
        if not items:
            return match.group(0)
        seen_href, links = set(), []
        for it in items:
            if it["href"] in seen_href:
                continue
            seen_href.add(it["href"])
            sub = ('<span class="xm">%s</span>' % esc(it["sub"])) if it["sub"] else ""
            links.append('<a href="%s" title="%s">%s%s</a>'
                         % (esc(it["href"]), esc(it["title"]), esc(it["label"]), sub))
        block = ('\n\n  <div class="xlinks"><span class="xk">串联</span>%s</div>\n'
                 % "".join(links))
        return match.group(1) + body.rstrip() + block + match.group(4)

    return SEC_RE.sub(repl, html_text)


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


# ============ 问答抽取（跨册问答库的数据源）============
# 为什么从页面抽而不是从 MANIFEST 抽：问答是页面内容，账本里本来就没有这一项。
# 同 load_blurbs() 读 PPT 总览取一句话简介——都是「读现成的成品」，不是另建第二份。
DETAILS_RE = re.compile(
    r"<details(?P<attrs>[^>]*)>\s*<summary>(?P<sum>.*?)</summary>(?P<body>.*?)</details>", re.S)
ADDED_RE = re.compile(r'<span class="added">([^<]*)</span>')
# 实战包的题：.qa 卡片 + .num 徽标（兜底话术的 num 是「兜底」，四条重名，另按序号编）
PREP_Q_RE = re.compile(
    r'<div class="qa"(?P<attrs>[^>]*)>\s*<div class="q"><span class="num">(?P<num>[^<]+)</span>'
    r'(?P<sum>.*?)</div>\s*<div class="a">(?P<body>.*?)</div>', re.S)


def plain(raw):
    """去标签 + 反转义 + 压空白。"""
    return re.sub(r"\s+", " ", html_unescape(re.sub(r"<[^>]+>", "", raw))).strip()


def html_unescape(s):
    for a, b in (("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
                 ("&quot;", '"'), ("&#39;", "'"), ("&nbsp;", " ")):
        s = s.replace(a, b)
    return s


def read_questions(dirname, mid):
    """抽一册模块页的「现场高频追问」，并回写稳定锚点 id。

    锚点用位序（`q-<模块ID>-<n>`）而不是文本哈希：本库的问答是**追加式**的
    （新章带来的新题都排在该册末尾，看 `.added` 日期即可确认），位序因此稳定；
    而哈希会在改一个错别字时静默失效，把已经分享出去的链接变成死链。
    """
    path = os.path.join(HERE, dirname, "index.html")
    if not os.path.exists(path):
        return [], None, None
    cur = open(path, encoding="utf-8").read()
    qs, pieces, last = [], [], 0
    for n, m in enumerate(DETAILS_RE.finditer(cur), 1):
        qid = "q-%s-%d" % (mid, n)
        added = ADDED_RE.search(m.group("sum"))
        qs.append({
            "id": qid,
            "q": plain(ADDED_RE.sub("", m.group("sum"))),
            "added": added.group(1).strip() if added else "",
            # 每题末尾「依据」行指向本册章节——问答与章节的关系是现成的，不用另猜
            "chapters": re.findall(r'href="#([a-z0-9\-]+)"', m.group("body")),
        })
        pieces.append(cur[last:m.start()])
        pieces.append('<details id="%s">' % qid)
        last = m.start() + len("<details") + len(m.group("attrs")) + 1
    pieces.append(cur[last:])
    return qs, cur, "".join(pieces)


def read_prep_questions():
    """抽实战包的题，并回写稳定锚点 id（题号本身就是稳定标识，直接用）。"""
    if not os.path.exists(PREPQA):
        return [], None, None
    cur = open(PREPQA, encoding="utf-8").read()
    dims = dict(re.findall(r'<h2 id="sec-([A-Z])">([^<]*?)(?:<span|</h2>)', cur))
    qs, pieces, last, nfb = [], [], 0, 0
    for m in PREP_Q_RE.finditer(cur):
        num = m.group("num").strip()
        if num == "兜底":
            nfb += 1
            qid = "q-prep-fallback-%d" % nfb
        else:
            qid = "q-prep-%s" % num
        fresh = re.search(r'<span class="fresh">⏳ 口径 ([\d-]+)</span>', m.group("sum"))
        qs.append({
            "id": qid, "num": num,
            "q": plain(re.sub(r'<span class="(?:fresh|must)">.*?</span>', "", m.group("sum"))),
            "dim": dims.get(num[0], "附 · 兜底话术") if num != "兜底" else "附 · 兜底话术",
            "fresh": fresh.group(1) if fresh else "",
            "must": '<span class="must">' in m.group("sum"),
        })
        pieces.append(cur[last:m.start()])
        pieces.append('<div class="qa" id="%s">' % qid)
        last = m.start() + len('<div class="qa"') + len(m.group("attrs")) + 1
    pieces.append(cur[last:])
    return qs, cur, "".join(pieces)


def render_qa(data, prep_qs):
    """跨册问答库：19 册的现场高频追问 + 实战包的电梯版题，汇到一处可搜可筛。

    **它是索引不是副本**——只登记题目、出处与深链，答案留在原处。
    同一段答案文本全库只有一份，改答案不用记得改第二个地方
    （web-rules §一「账本唯一」在问答这条轴上的落法）。
    """
    mods = [m for m in data["modules"] if m.get("questions")]
    total_m = sum(len(m["questions"]) for m in mods)
    n_prep = sum(1 for q in prep_qs if q["num"] != "兜底")
    n_fb = len(prep_qs) - n_prep
    n_must = sum(1 for q in prep_qs if q["must"])
    o = ['  <p class="net-lead">全库 <b>%d 道</b>现场高频追问（分散在 %d 册里）'
         '＋实战包 <b>%d 道</b>电梯版交锋题，这一页把它们汇到一处。'
         '客户问了一句话，就搜那句话。</p>' % (total_m, len(mods), n_prep)]
    o.append('  <p class="net-lead">这里只放题目与去处——<b>答案留在原处</b>，'
             '点进去读。这样同一段答案全库只有一份，不会两处各说一套。</p>')

    o.append('  <div class="qa-tools">')
    o.append('   <input id="qf" type="search" placeholder="搜题目里的词（如：备案、注入、显存、并发）" '
             'autocomplete="off">')
    o.append('   <div class="qa-chips" id="qc"><button class="chip on" data-g="">全部</button>'
             '<button class="chip" data-g="prep">实战包</button>'
             '<button class="chip" data-g="mod">模块追问</button></div>')
    o.append('   <p class="qa-count" id="qn"></p>')
    o.append("  </div>")

    o.append('  <div class="qa-group" data-g="prep">')
    o.append('   <h3>实战包 · 对客交锋 %d 题 + %d 条兜底话术<span class="n">'
             '每题 15–30 秒的电梯版；★ 是必背，共 %d 道</span></h3>'
             % (n_prep, n_fb, n_must))
    cur_dim = None
    for q in prep_qs:
        if q["dim"] != cur_dim:
            cur_dim = q["dim"]
            o.append('   <p class="qa-dim">%s</p>' % esc(cur_dim))
        badge = '<span class="fresh">⏳ %s</span>' % esc(q["fresh"]) if q["fresh"] else ""
        star = '<span class="must">★</span>' if q["must"] else ""
        o.append('   <a class="qrow" href="../../_prep/实战包.html#%s">'
                 '<span class="qn">%s</span>%s%s%s</a>'
                 % (esc(q["id"]), esc(q["num"]), star, esc(q["q"]), badge))
    o.append("  </div>")

    o.append('  <div class="qa-group" data-g="mod">')
    o.append('   <h3>模块现场高频追问 %d 道<span class="n">'
             '每题给结论、机制或权衡、下一步与依据</span></h3>' % total_m)
    for m in mods:
        o.append('   <p class="qa-dim">%s<span class="n">%d 道</span></p>'
                 % (esc(m["dir"]), len(m["questions"])))
        for q in m["questions"]:
            badge = ('<span class="added">%s</span>' % esc(q["added"])) if q["added"] else ""
            o.append('   <a class="qrow" href="../%s/index.html#%s">'
                     '<span class="qn">%s</span>%s%s</a>'
                     % (esc(WEB_DIRS[m["id"]]), esc(q["id"]), esc(mono(m["dir"])),
                        esc(q["q"]), badge))
    o.append("  </div>")
    return "\n".join(o)


def shelf_order(data):
    """七层书架顺序里的模块序列——前后册导航按它走。

    此前模块页只有语义跳转的「相关模块」，没有线性读法的入口：想按书架从头读一遍，
    每翻一册都得回首页。顺序取 LAYER_ORDER × 层内 MANIFEST 目录序，与首页知识地图一致。
    """
    out = []
    for layer in data["layers"]:
        for m in data["modules"]:
            if m["layer"] == layer and m["id"] in WEB_DIRS:
                out.append(m)
    return out


def prevnext(shelf, mid):
    ids = [m["id"] for m in shelf]
    if mid not in ids:
        return ""
    i = ids.index(mid)
    parts = ['\n  <nav class="prevnext" aria-label="书架前后册">']
    if i > 0:
        p = shelf[i - 1]
        parts.append('   <a href="../%s/index.html"><span class="k">上一册 · %s</span>'
                     "<b>%s</b></a>" % (esc(WEB_DIRS[p["id"]]), esc(p["layer"]), esc(p["dir"])))
    if i < len(shelf) - 1:
        n = shelf[i + 1]
        parts.append('   <a class="nx" href="../%s/index.html"><span class="k">下一册 · %s</span>'
                     "<b>%s</b></a>" % (esc(WEB_DIRS[n["id"]]), esc(n["layer"]), esc(n["dir"])))
    parts.append("  </nav>")
    return "\n".join(parts) if len(parts) > 2 else ""


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

    # 问答：结构与事实来自 MANIFEST，问答文本来自各模块页——两个来源各管各的，不重叠。
    page_edits = {}
    for m in mods:
        if m["id"] not in WEB_DIRS:
            m["questions"] = []
            continue
        qs, cur, new = read_questions(WEB_DIRS[m["id"]], m["id"])
        m["questions"] = qs
        if cur is not None and cur != new:
            page_edits[os.path.join(HERE, WEB_DIRS[m["id"]], "index.html")] = (cur, new)

    by_id = {m["id"]: m for m in mods}
    concepts = resolve_concepts(by_id)
    data = {"generated_from": "PPT-version/*/MANIFEST.md（结构）+ Web-version/*/index.html（问答）"
                              "+ build.py CONCEPTS（关键词落点）",
            "layers": layers, "modules": mods,
            "concepts": [{"t": t, "m": by_id[tm]["dir"],
                          "u": "./%s/index.html#%s" % (WEB_DIRS[tm], tc)}
                         for t, (tm, tc) in sorted(concepts.items())]}
    text = ("// 本文件由 Web-version/build.py 从各模块 MANIFEST.md 生成，请勿手工编辑。\n"
            "// 改内容请改 MANIFEST，然后重跑 build.py。\n"
            "window.KB = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
    return text, data, page_edits


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
             .replace('"', "&quot;"))


def render_map(data, blurbs):
    """知识地图 → 卡片矩阵，只注入根首页（生成期静态注入，无 JS 时仍完整可读）。

    知识地图全站只有一份、住首页——曾同时放在网页版首页与首页，用户指出重复
    （2026-07-21 定版：同一内容不在两页重复铺开，跨页导航靠全站顶栏）。"""
    ppt_fmt = "./PPT-version/%s/README.html"
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
            web_href = m["web"]
            if web_href:
                web_href = "./Web-version/" + web_href[2:]
            href = web_href or (ppt_fmt % m["dir"])
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


# 每条连线的「关联词」：桥接两个模块的关键技术名词/核心概念，供「关联学习」模式的
# 连线标签用（读者顺着这个词深挖）。键＝两个模块 ID 字典序排序后 "|" 连；由 2026-07-23
# 十九册 MANIFEST 串联出边的关系文字提炼。没登记的边不显标签（不强求每条都有）。
EDGE_TERMS = {
    "a2a|agent": "跨 Agent 协作", "a2a|ai-gateway": "统一身份传递",
    "a2a|mcp": "纵向 vs 横向", "a2a|security": "签名 · 最小权限",
    "agent|ai-gateway": "统一入口 · 护栏", "agent|evaluation": "轨迹评估",
    "agent|llm": "上下文工程根源", "agent|llm-inference": "Prefix Caching",
    "agent|llm-training": "推理模型 · RLVR", "agent|mcp": "工具接入 · MCP",
    "agent|multimodal": "多模态感知 · CU", "agent|pe": "上下文工程 · ReAct",
    "agent|rag": "Agentic RAG", "agent|security": "记忆投毒 · 控权",
    "agent|solution-patterns": "低代码平台",
    "ai-gateway|ai-ops": "trace 贯通", "ai-gateway|evaluation": "路由质量验收",
    "ai-gateway|llm-inference": "网关 vs 引擎", "ai-gateway|mcp": "MCP 网关治理",
    "ai-gateway|model-landscape": "路由 · 防锁定", "ai-gateway|security": "护栏 · 爆炸半径",
    "ai-gateway|solution-patterns": "token · 并发治理",
    "ai-infra-compute|ai-infra-platform": "硬件 vs 平台",
    "ai-infra-compute|llm-inference": "KV Cache · HBM",
    "ai-infra-compute|llm-training": "并行 · 显存切分",
    "ai-infra-platform|fine-tuning": "云上托管训练",
    "ai-infra-platform|llm-inference": "P/D 分离 · 承载",
    "ai-infra-platform|llm-training": "调度 · 容错",
    "ai-ops|data-engineering": "坏答案回流", "ai-ops|evaluation": "离线 vs 在线评估",
    "ai-ops|model-landscape": "换模型回归", "ai-ops|pe": "提示词发布工程",
    "ai-ops|security": "急停 · 事故响应", "ai-ops|solution-patterns": "运营包 · SLA",
    "ai-infra-platform|ai-ops": "集群可观测边界",
    "data-engineering|evaluation": "评估集方法", "data-engineering|fine-tuning": "数据配方",
    "data-engineering|rag": "解析 · 向量库", "data-engineering|security": "ACL · 越权测试",
    "data-engineering|solution-patterns": "数据就绪 · 报价",
    "evaluation|fine-tuning": "微调验收门禁", "evaluation|llm-inference": "质量 vs 延迟",
    "evaluation|llm-training": "选 vs 炼模型", "evaluation|model-landscape": "榜单幻觉 · 自建集",
    "evaluation|multimodal": "MMMU · OCRBench", "evaluation|pe": "评估驱动优化",
    "evaluation|rag": "RAG 三角验收", "evaluation|security": "红队 · 注入抵抗",
    "evaluation|solution-patterns": "POC 签字指标",
    "fine-tuning|llm-inference": "多 LoRA 部署", "fine-tuning|llm-training": "SFT · DPO 落地",
    "fine-tuning|model-landscape": "开放权重 · 许可证", "fine-tuning|pe": "选型链 · 到头才微调",
    "fine-tuning|rag": "改知识 vs 改行为", "fine-tuning|security": "投毒 · 来源验证",
    "llm|llm-inference": "KV Cache 机制↔系统", "llm|llm-training": "架构 vs 训练",
    "llm|model-landscape": "MoE 稀疏激活", "llm|multimodal": "ViT · 注意力复用",
    "llm|pe": "窗口 · 注意力",
    "llm-inference|llm-training": "训练 vs 推理账", "llm-inference|model-landscape": "思考预算 · decode",
    "llm-inference|multimodal": "视觉 token 膨胀", "llm-inference|rag": "1M 窗口不是终结者",
    "llm-training|rag": "微调 vs RAG", "llm-training|security": "投毒 · 来源验证",
    "mcp|security": "工具投毒 · 供应链",
    "model-landscape|multimodal": "原生 vs 拼管线", "model-landscape|rag": "1M 窗口 vs RAG",
    "model-landscape|security": "平台合规 · 备案", "model-landscape|solution-patterns": "模型可替换件",
    "multimodal|rag": "多模态检索", "multimodal|security": "跨模态注入",
    "multimodal|solution-patterns": "语音客服 · 数字人",
    "pe|rag": "提示词 vs RAG", "pe|security": "提示注入", "pe|solution-patterns": "风格注入",
    "rag|security": "向量库投毒 · ACL", "rag|solution-patterns": "检索路线选型",
    "security|solution-patterns": "权限感知检索",
}


def render_graph(data):
    """分层链接图：19 模块按 7 层排布 + 串联出边画成图（替代原来的表格）。

    节点＝模块（按 KB-CONFIG 层级从上到下分带，就是 PPT 总览那套层级），
    边＝各模块 MANIFEST「串联出边」的无向去重关系。默认边极淡、悬停高亮一个模块的邻接。
    布局用重心排序（barycenter）减少交叉，确定性无随机——出静态 SVG，file:// 与无 JS 都完整可读；
    无 JS 的文字路径由随后的 `<details>` 表格兜底（复用 render_network，故 table.net 类不失联）。
    """
    mods = data["modules"]
    by_id = {m["id"]: m for m in mods}
    layers = data["layers"]
    layer_i = {l: i for i, l in enumerate(layers)}

    adj = {m["id"]: {} for m in mods}      # 无向邻接：id -> {邻居id: 关系说明}
    for m in mods:
        for e in m["edges"]:
            tgt = e["to"].split("#")[0].strip()
            if not e.get("resolved") or tgt == m["id"] or tgt not in by_id:
                continue
            adj[m["id"]].setdefault(tgt, e["why"])
            adj[tgt].setdefault(m["id"], e["why"])

    lay_nodes = {l: [m["id"] for m in mods if m["layer"] == l] for l in layers}

    # 几何：viewBox 1000 宽，每层一条带
    W, padTop, bandH, areaL, areaR, nw, nh = 1000, 16, 98, 172, 980, 132, 40
    H = padTop * 2 + len(layers) * bandH
    chip = 26

    def xcenter(j, n):
        return (areaL + areaR) / 2 if n <= 1 else areaL + (j + 0.5) * (areaR - areaL) / n

    pos = {}

    def place():
        for l in layers:
            yc = padTop + layer_i[l] * bandH + bandH / 2
            n = len(lay_nodes[l])
            for j, mid in enumerate(lay_nodes[l]):
                pos[mid] = (xcenter(j, n), yc)

    place()
    # 重心排序：每层内按「邻居平均 x」重排，上下交替扫，收敛到较少交叉
    for p in range(6):
        seq = layers if p % 2 == 0 else list(reversed(layers))
        for l in seq:
            n = len(lay_nodes[l])
            lay_nodes[l] = sorted(
                lay_nodes[l],
                key=lambda mid: (sum(pos[k][0] for k in adj[mid]) / len(adj[mid]))
                if adj[mid] else pos[mid][0])
            yc = padTop + layer_i[l] * bandH + bandH / 2
            for j, mid in enumerate(lay_nodes[l]):
                pos[mid] = (xcenter(j, n), yc)

    # 节点宽度按名字长短算，不写死——否则 Solution-Patterns / Prompt-Engineering
    # 这类长名会撑出胶囊框（用户实测「框比字短」）。字面量：左内边距 7 + 字标 26 +
    # 间距 8 + 名字宽（每字符约 7.0px，加宽估避免裁字）+ 右内边距 16，最短兜底 100。
    NW = {m["id"]: max(100, int(7 + chip + 8 + len(m["dir"]) * 7.0 + 16)) for m in mods}

    # 出口点分散：一个节点的每条边从它「上沿 / 下沿」的不同 x 出发，避免多条边挤成一束
    # （悬停枢纽节点时最明显——12 条边若共用一个出口点会糊成乱线）。
    pairs = sorted(set(tuple(sorted((m["id"], k))) for m in mods for k in adj[m["id"]]))
    inc = {m["id"]: [] for m in mods}
    for a, b in pairs:
        inc[a].append(b)
        inc[b].append(a)
    exitpt = {}
    for mid, others in inc.items():
        x0, y0 = pos[mid]
        top = sorted((o for o in others if pos[o][1] < y0 - 1), key=lambda o: pos[o][0])
        bot = sorted((o for o in others if pos[o][1] >= y0 - 1), key=lambda o: pos[o][0])
        for grp, ey in ((top, y0 - nh / 2), (bot, y0 + nh / 2)):
            n = len(grp)
            for i, o in enumerate(grp):
                ex = x0 + NW[mid] * 0.72 * ((i + 1.0) / (n + 1) - 0.5)
                exitpt[(mid, o)] = (ex, ey)

    def edge_path(a, b):
        ax, ay = exitpt[(a, b)]
        bx, by = exitpt[(b, a)]
        if abs(ay - by) < 1:                       # 同层：下凸弧
            cy = ay + 28
            return "M%.1f %.1fC%.1f %.1f %.1f %.1f %.1f %.1f" % (ax, ay, ax, cy, bx, cy, bx, by)
        my = (ay + by) / 2                          # 跨层：竖向 S 曲线（两端出口已错开）
        return "M%.1f %.1fC%.1f %.1f %.1f %.1f %.1f %.1f" % (ax, ay, ax, my, bx, my, bx, by)

    # 边按「上端所在层」着色（hue-N 类携带该层色令牌，深浅色自动跟随）——
    # 于是每层的连线像一束该层色的流线往下淌，比统一灰线有生气；悬停时再统一压成蓝色。
    def edge_hue(a, b):
        up = a if pos[a][1] <= pos[b][1] else b
        return layer_i[by_id[up]["layer"]]
    edges = ['    <path class="kedge hue-%d" data-a="%s" data-b="%s" data-term="%s" d="%s">'
             '<title>%s ↔ %s%s</title></path>'
             % (edge_hue(a, b), esc(a), esc(b),
                esc(EDGE_TERMS.get(a + "|" + b, "")), edge_path(a, b),
                esc(by_id[a]["dir"]), esc(by_id[b]["dir"]),
                ("　·　" + esc(EDGE_TERMS[a + "|" + b])) if (a + "|" + b) in EDGE_TERMS else "")
             for a, b in pairs]

    # 三遍分层画，顺序决定层叠——① 层带背景（最底）② 边（中间，连续不被挡）③ 节点（最上，压住出口）
    o = ['  <svg class="kgraph" viewBox="0 0 %d %d" role="img" '
         'aria-label="全库 19 个模块按七层排布的关系图，边表示讲一块时该带上的另一块">' % (W, H)]

    o.append('   <g class="kbands">')
    for l in layers:                                # ① 层带背景 + 层标签
        i = layer_i[l]
        yc = padTop + i * bandH + bandH / 2
        bandY = padTop + i * bandH + 4
        o.append('    <g class="hue-%d">' % i)
        o.append('     <rect class="kband" x="8" y="%.1f" width="%d" height="%d" rx="12"/>'
                 % (bandY, W - 16, bandH - 8))
        o.append('     <circle cx="26" cy="%.1f" r="5" fill="var(--hue)"/>' % yc)
        o.append('     <text class="klabel" x="38" y="%.1f" font-size="12.5">%s</text>'
                 % (yc + 4, esc(l)))
        o.append("    </g>")
    o.append("   </g>")

    o.append('   <g class="kedges">')               # ② 边
    o.extend(edges)
    o.append("   </g>")

    # ③ 节点（压在边之上）。用 transform 定位、子元素相对中心画——点选聚焦时 JS 靠
    #    改 translate 平滑挪动节点；hue-N 类给胶囊上层色（深浅色自动跟随）。
    o.append('   <g class="knodes">')
    for l in layers:
        i = layer_i[l]
        yc = padTop + i * bandH + bandH / 2
        for mid in lay_nodes[l]:
            m = by_id[mid]
            xc, _ = pos[mid]
            w = NW[mid]
            deg = len(adj[mid])
            adjids = ",".join(sorted(adj[mid]))
            o.append('    <a class="knode hue-%d" href="./%s/index.html" data-m="%s" '
                     'data-adj="%s" transform="translate(%.1f,%.1f)" tabindex="0">'
                     % (i, esc(WEB_DIRS[mid]), esc(mid), esc(adjids), xc, yc))
            o.append('     <title>%s · 关联 %d 个模块</title>' % (esc(m["dir"]), deg))
            o.append('     <rect class="kbox" x="%.1f" y="%.1f" width="%d" height="%d" rx="10"/>'
                     % (-w / 2, -nh / 2, w, nh))
            o.append('     <rect class="kchip" x="%.1f" y="%.1f" width="%d" height="%d" rx="7"/>'
                     % (-w / 2 + 7, -chip / 2, chip, chip))
            o.append('     <text class="kmono" x="%.1f" y="4" font-size="11" text-anchor="middle">%s</text>'
                     % (-w / 2 + 7 + chip / 2, esc(mono(m["dir"]))))
            o.append('     <text class="knm" x="%.1f" y="4" font-size="12.5">%s</text>'
                     % (-w / 2 + 7 + chip + 8, esc(m["dir"])))
            o.append("    </a>")
    o.append("   </g>")
    o.append("  </svg>")

    deg_all = sorted(mods, key=lambda m: -len(adj[m["id"]]))
    hubs = "、".join("%s（%d）" % (m["dir"], len(adj[m["id"]])) for m in deg_all[:3])
    lead = ('  <p class="net-lead">按 7 层排布的全库 19 个模块。<b>两种学法</b>——'
            '<b>单点学习</b>：直接点模块进那一册；<b>关联学习</b>：显示连线，'
            '点一个模块它会滑到中间、把关联的模块拉到身边连成小网，连线上标着'
            '桥接两块的关键技术词，顺着一路深挖。关联最密的三块：<b>%s</b>。</p>' % esc(hubs))
    toggle = ('  <div class="kg-modes" role="tablist">'
              '<button type="button" class="kg-mode on" data-mode="link">关联学习</button>'
              '<button type="button" class="kg-mode" data-mode="solo">单点学习</button>'
              '<span class="kg-modenote">关联＝看连线、逐步深挖；单点＝直接进册</span></div>')
    graph = (lead + '\n' + toggle
             + '\n  <div class="kgraph-wrap"><div class="kgraph-scroll">\n'
             + "\n".join(o) + "\n  </div>\n"
             '  <p class="kgraph-hint">「单点学习」点模块直接进册；「关联学习」下点模块看它'
             '连着谁、连线上是关键技术词，点中心可打开该册，按返回全景 / Esc 回总图。'
             '需要逐条读关系，展开下面的文字表。</p></div>')

    alt = ('  <details class="kgraph-alt"><summary>换成文字表看（逐模块列出边）</summary>\n'
           + render_network(data) + "\n  </details>")
    return graph + "\n" + alt


def render_network(data):
    """跨模块关系网：讲一个模块时还该带上哪几块。

    这是网页版相对 PPT 的结构性优势——19 册讲义各印各的，纸面上无法互相指；
    而串联关系本来就登记在各模块 MANIFEST 的「串联出边」里，这里只是把它们汇到一处。
    窄屏另给一个「相关模块」合并列：出边与入边对读者是同一个用途，
    三列硬撑到手机上一行会高到 400px（2026-07-20 实测），故窄屏合并（CSS 切换）。"""
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
    o = ['  <p class="net-lead">截至构建日 <b>%s</b>。全库共 %d 条时效性事实登记在各模块清单里，'
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
        text, data, page_edits = build()
        prep_qs, prep_cur, prep_new = read_prep_questions()
        if prep_cur is not None and prep_cur != prep_new:
            page_edits[PREPQA] = (prep_cur, prep_new)
        qa_cur = open(QAPAGE, encoding="utf-8").read()
        qa_new = inject(qa_cur, QA_BEGIN, QA_END, render_qa(data, prep_qs), "QA")
        blurbs = load_blurbs()
        html_cur = open(INDEX, encoding="utf-8").read()
        root_cur = open(ROOT_INDEX, encoding="utf-8").read()
        root_new = inject(root_cur, MAPR_BEGIN, MAPR_END,
                          render_map(data, blurbs), "MAPR")
        html_new = inject(html_cur, NET_BEGIN, NET_END, render_graph(data), "NET")
        html_new = inject(html_new, FRESH_BEGIN, FRESH_END, render_fresh(data), "FRESH")
        fp_cur = open(FRESHPAGE, encoding="utf-8").read()
        fp_new = inject(fp_cur, FRESH_BEGIN, FRESH_END, render_fresh_full(data), "FRESH@full")

        mod_cur, mod_new, anchored = {}, {}, 0
        by_id = {m["id"]: m for m in data["modules"]}
        concepts = resolve_concepts(by_id)
        shelf = shelf_order(data)
        for mid, path in MOD_PAGES.items():
            if not os.path.exists(path) or mid not in by_id:
                continue
            # 底稿要取**回写过问答锚点的那一版**——两处都写同一个文件，
            # 后写的会把先写的盖掉（第一版就踩了：锚点写进去又被页脚注入抹平）。
            cur = open(path, encoding="utf-8").read()
            base = page_edits[path][1] if path in page_edits else cur
            base = inject_xlinks(base, by_id[mid], by_id, concepts)
            block = ('  <p class="updated">本册最近改动 <b>%s</b>'
                     '（以模块清单 MANIFEST 为准）。</p>' % esc(by_id[mid]["updated"])
                     + prevnext(shelf, mid))
            mod_cur[path] = cur
            mod_new[path] = inject(base, MOD_BEGIN, MOD_END, block, "UPDATED@" + mid)
            if page_edits.pop(path, None):  # 已并进 mod_new，别再单独写一遍
                anchored += 1
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
        if root_cur != root_new:
            bad.append("库根 README.html 的知识地图")
        if qa_cur != qa_new:
            bad.append("qa/index.html 的问答库")
        for path in mod_new:
            if mod_cur[path] != mod_new[path]:
                bad.append("%s 的最近改动" % os.path.relpath(path, ROOT))
        for path in page_edits:
            bad.append("%s 的问答锚点" % os.path.relpath(path, ROOT))
        if bad:
            print("与 MANIFEST 已漂移：%s——请重跑 build.py 并提交产物。" % "、".join(bad))
            return 1
        print("data.js 与 index.html 生成区块均与 MANIFEST 一致。")
        return 0

    # 锚点回写要先落盘：qa 页里的链接指向它们，反过来就会指到还不存在的锚点。
    for path, (_, new) in page_edits.items():
        open(path, "w", encoding="utf-8").write(new)
    open(OUT, "w", encoding="utf-8").write(text)
    open(INDEX, "w", encoding="utf-8").write(html_new)
    open(FRESHPAGE, "w", encoding="utf-8").write(fp_new)
    open(ROOT_INDEX, "w", encoding="utf-8").write(root_new)
    open(QAPAGE, "w", encoding="utf-8").write(qa_new)
    for path, content in mod_new.items():
        open(path, "w", encoding="utf-8").write(content)
    nq = sum(len(m.get("questions", [])) for m in data["modules"])
    nx = sum(v.count('<div class="xlinks">') for v in mod_new.values())
    print("已生成 %s、index.html 的三个区块（知识地图/关系网/保鲜看板，%d 个模块）"
          "与 qa/index.html（%d 道模块追问 + %d 道实战题），"
          "补写问答锚点 %d 个文件，章末串联条 %d 处（关键词 %d 个）"
          % (os.path.relpath(OUT, ROOT), len(data["modules"]),
             nq, len(prep_qs), anchored + len(page_edits), nx, len(CONCEPTS)))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
