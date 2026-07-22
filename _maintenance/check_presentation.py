#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""网页版呈现体检（零第三方依赖）——**报告型，不设配额**。

为什么要有它：八批扩建的封版标准是「事实级 0 + 缺口级 0」，那量的是**内容缺口**。
呈现规格（图/表/卡/段长）**从来没有被量过**，于是 19 册全部报「已封版」，而规格从样板册的
5 图 17 卡一路退到 0 图 0 卡——八道门禁一道都查不出。2026-07-22 用户翻页时指出
「都是文字罗列，没有交互、没有图片、没有 flowchart」，才把这根轴补上。

**为什么不硬判**（用户 2026-07-22 裁决）：「非散文承载」的数量要按具体需求来，不能是一个
硬性数字。这实质是把本库已有的**「不设配额」铁律**（`web-rules` §七，此前只写在问答轴上：
「不逐章机械配题，不同模块不追求相同题数」）**扩展到呈现轴**——同一条原则，此前只管了问答，
没管图表。所以本脚本**只报不判**：把事实摆出来，拆不拆、拆成什么，由内容性质决定。

报四样：
  ① 每章的承载构成——表 / 图 / 卡组 / 交互件各几个，以及是否通篇散文；
  ② 超长段落清单——超长通常不是话多，是一段里塞了多个知识对象（默认阈值 260 字）；
  ③ **并列项挤成一句**——一段里 ≥3 个粗体并列项，段长却没超阈值，②那一轴完全查不到；
  ④ 每册的图数——不设下限，但摆出来。

第 ③ 轴是 2026-07-22 补的：用户指着 Agent「规划是大脑、记忆是笔记本、工具是双手」说
「没有突出重点」，才发现前一轮只量了「一段有多长」，没量「一句里塞了几个并列项」——
80 字的句子塞三个知识对象，一样是散文墙，只是短。同一个病的第二种形态。

用法: python3 check_presentation.py [模块名…]   # 缺省全库
退出码: 恒为 0——这是体检不是门禁。
"""
import glob
import html
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(ROOT, "Web-version")
LONG_P = 260          # 超长段阈值：只用来"点名"，不是上限

SECTION = re.compile(r'<section class="sec" id="([^"]+)">(.*?)</section>', re.S)
H2 = re.compile(r"<h2[^>]*>(.*?)</h2>", re.S)
# `<p[^>]*>` 会顺手匹配 SVG 的 `<path …>`，把「图里的文字 + 图注」拼成一个假的超长段
# （2026-07-22 加图后实测）。要求 `<p` 后面跟空白或直接闭合。
P = re.compile(r"<p(?:\s[^>]*)?>(.*?)</p>", re.S)
GUARD = re.compile(r"<pre\b.*?</pre>|<script\b.*?</script>|<style\b.*?</style>", re.S | re.I)
BOLD = re.compile(r"<b>([^<]{1,14})</b>")
PARALLEL = 3          # 一段里几个粗体并列项算"挤"
LEAD_OPEN = '<div class="lead">'


def plain(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s))).strip()


def scan(path):
    src = io.open(path, encoding="utf-8").read()
    body = GUARD.sub(" ", src)
    out = []
    for sid, blk in SECTION.findall(body):
        h2 = H2.search(blk)
        title = plain(h2.group(1)) if h2 else sid
        title = re.sub(r"^\d+\s*", "", title).replace("#" + sid, "").strip()
        longs = []
        crammed = []
        # 证据注（.ev）是标注不是正文：它天然要写全「核实日期 + 来源 + 不可外推边界」，
        # 长是应该的，不该被当成散文墙点名。
        for m in re.finditer(r"<p(?:\s[^>]*)?>.*?</p>", blk, re.S):
            tag = m.group(0)
            if 'class="ev"' in tag[:40]:
                continue
            t = plain(tag)
            if len(t) > LONG_P:
                longs.append((len(t), t[:38]))
            # 问答区的基线声明（「每题标出它加入本题库的日期：2026-07-09 来自…」）粗体是
            # 日期不是并列的知识对象，排除，否则每册都稳定假阳一条。
            elif len(BOLD.findall(tag)) >= PARALLEL and "加入本题库的日期" not in t:
                pre = blk[:m.start()]
                in_lead = pre.rfind(LEAD_OPEN) > pre.rfind("</div>")
                crammed.append((len(BOLD.findall(tag)), in_lead, t[:36]))
        out.append({
            "id": sid, "title": title,
            "svg": len(re.findall(r"<svg\b", blk)),
            "table": len(re.findall(r"<table\b", blk)),
            # <details> 折叠问答与 <ul>/<ol> 列表本身就是结构化承载，不算散文
            "card": len(re.findall(r'class="box|class="hitcard|class="grid"|<details\b|<ul\b|<ol\b',
                                   blk)),
            "tool": len(re.findall(r'class="tool"|class="wire"', blk)),
            "longs": sorted(longs, reverse=True),
            "crammed": sorted(crammed, reverse=True),
        })
    return out


def main(argv):
    want = [a for a in argv[1:] if not a.startswith("-")]
    dirs = sorted(os.path.dirname(p) for p in glob.glob(os.path.join(WEB, "*", "index.html")))
    # qa/ 是站级问答索引，不是模块页——它本来就该是长列表，不参与呈现体检
    dirs = [d for d in dirs if os.path.basename(d) != "qa"]
    dirs = [d for d in dirs if not want or os.path.basename(d) in want]

    grand_long = grand_prose = grand_svg = grand_cram = 0
    for d in dirs:
        name = os.path.basename(d)
        secs = scan(os.path.join(d, "index.html"))
        n_svg = sum(s["svg"] for s in secs)
        prose_only = [s for s in secs if not (s["svg"] or s["table"] or s["card"] or s["tool"])]
        longs = [(n, s["title"], txt) for s in secs for n, txt in s["longs"]]
        crams = [(n, lead, s["title"], txt) for s in secs for n, lead, txt in s["crammed"]]
        grand_svg += n_svg
        grand_prose += len(prose_only)
        grand_long += len(longs)
        grand_cram += len(crams)

        print("\n%s%s" % (name, "" if n_svg else "   ← 全册 0 图"))
        print("  章数 %d ｜ 图 %d ｜ 表 %d ｜ 卡 %d ｜ 交互件 %d"
              % (len(secs), n_svg, sum(s["table"] for s in secs),
                 sum(s["card"] for s in secs), sum(s["tool"] for s in secs)))
        if prose_only:
            print("  通篇散文的章（值得看一眼，不一定是错）：")
            for s in prose_only:
                print("    · %s" % (s["title"] or s["id"]))
        if longs:
            print("  超长段（>%d 字，多半是一段里塞了多个知识对象）：" % LONG_P)
            for n, title, txt in sorted(longs, reverse=True)[:6]:
                print("    %4d 字  [%s] %s…" % (n, title or "—", txt))
        if crams:
            print("  并列项挤成一句（≥%d 个并列项，段不长所以上一轴查不到）：" % PARALLEL)
            for n, lead, title, txt in sorted(crams, reverse=True)[:6]:
                print("    %d 项%s  [%s] %s…"
                      % (n, " ←引言块" if lead else "     ", title or "—", txt))

    print("\n" + "=" * 64)
    print("全库：%d 册 ｜ 图 %d 张 ｜ 通篇散文的章 %d 个 ｜ 超长段 %d 处 ｜ 并列项挤成一句 %d 处"
          % (len(dirs), grand_svg, grand_prose, grand_long, grand_cram))
    print("这是体检报告，不是门禁——「该有几张图、哪一章要换承载」由内容性质决定，不设配额。")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
