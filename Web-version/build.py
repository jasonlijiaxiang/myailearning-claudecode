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

# 书架顺序以 KB-CONFIG.md「知识地图层定义」为准；这里只固定展示次序，层名本身仍从 MANIFEST 读。
LAYER_ORDER = ["解决方案层", "应用模式层", "协议层", "工程保障层", "基础层",
               "算力底座层", "数据底座层"]

# 已建网页面的模块（试点先行：样板册定稿前不做全库转换）。
# 值为站内相对路径；不在表内的模块在总览页显示为"仅 PPT 面"。
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

    # 「最后更新」是长散文，只取开头的日期，不解析其余内容。
    m = re.match(r"(\d{4}-\d{2}-\d{2})", field(text, "最后更新"))
    return {
        "id": mid,
        "dir": dirname,
        "layer": clean_layer(field(text, "所在层")),
        "created": field(text, "建立日期"),
        "updated": m.group(1) if m else "",
        "chapters": chapters,
        "facts": facts,
        "edges": edges,
        "web": WEB_PAGES.get(mid, ""),
    }


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


def render_map(data):
    """知识地图渲染成静态 HTML 注入 index.html。

    为什么不在浏览器里用 JS 渲染：web-design-system 的可访问性底线要求「无 JavaScript 时
    保留基本阅读路径」，地图是首页的主要内容，靠 JS 渲染等于无 JS 时首页空白。为什么不
    手写：那就成了 MANIFEST 之外的第二份模块清单，必漂移（core-rules §一）。故生成期注入。
    """
    out = []
    for layer in data["layers"]:
        mods = [m for m in data["modules"] if m["layer"] == layer]
        if not mods:
            continue
        out.append('  <section class="layer">')
        out.append('   <h3>%s<span class="n">%d 个模块</span></h3>'
                   % (esc(layer), len(mods)))
        out.append('   <div class="cards">')
        for m in mods:
            href = m["web"] or ("../PPT-version/%s/README.html" % m["dir"])
            tag = ("web", "网页版") if m["web"] else ("ppt", "仅 PPT 面")
            out.append('    <a class="card" href="%s">' % esc(href))
            out.append('     <div class="nm">%s</div>' % esc(m["dir"]))
            out.append('     <div class="meta">%d 章 · 更新 %s '
                       '<span class="tag %s">%s</span></div>'
                       % (len(m["chapters"]), esc(m["updated"] or "—"), tag[0], tag[1]))
            out.append("    </a>")
        out.append("   </div>")
        out.append("  </section>")
    return "\n".join(out)


def inject_map(html, block):
    i = html.find(MAP_BEGIN)
    j = html.find(MAP_END)
    if i < 0 or j < 0 or j < i:
        raise SystemExit("index.html 缺少 MAP:BEGIN / MAP:END 标记")
    return html[:i + len(MAP_BEGIN)] + "\n" + block + "\n  " + html[j:]


def main(argv):
    try:
        text = build()
        data = json.loads(text[text.index("{"):text.rindex("}") + 1])
        html_cur = open(INDEX, encoding="utf-8").read()
        html_new = inject_map(html_cur, render_map(data))
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
            bad.append("index.html 的知识地图")
        if bad:
            print("与 MANIFEST 已漂移：%s——请重跑 build.py 并提交产物。" % "、".join(bad))
            return 1
        print("data.js 与 index.html 知识地图均与 MANIFEST 一致。")
        return 0

    open(OUT, "w", encoding="utf-8").write(text)
    open(INDEX, "w", encoding="utf-8").write(html_new)
    print("已生成 %s 与 index.html 知识地图（%d 个模块）"
          % (os.path.relpath(OUT, ROOT), len(data["modules"])))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
