#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""库级产物的源指针与覆盖率门禁（knowledge-base-builder，零第三方依赖）。

为什么要有它（2026-07-22 全面审核的取证）：`_prep/` 三件套里每条「深潜 →」都由两半
组成——**显示的锚点标签**（`<code>模块#章节</code>`）和**真正的 href**。此前这两半
谁也没校验过，于是同时漂了两种：

  ① 73 条深潜链接**一条锚点都没有**，全部落在 `PPT-version/<模块>/README.html`
     册子首页——标签上写着 `model-landscape#ml-map`，点进去却要读者自己找章；
  ② 两处标签的模块 ID 写成了目录名（`prompt-engineering#` 而账本里是 `pe#`），
     结果 Prompt-Engineering 在覆盖率上被算成零覆盖，无人察觉。

`prep-rules.md`「A 类收尾口径回刷清单」第 3 条要求「新模块对练页至少贡献 1–2 题……
零覆盖必须是显式决定，不能是遗忘」。这条一直只是人工纪律：库长到 19 册时
AI-Gateway 与 AI-Infra-Platform 各 8 章全零，账本里没有任何豁免登记。本脚本把它变成
可执行的门禁。

两条轴：

  轴一 · **源指针有效性（FAIL）**——每条深潜链接都要①标签模块 ID 在账本里、
        ②标签章节 ID 属于该模块、③href 带锚点、④href 锚点与标签锚点一致、
        ⑤href 指向的文件真实存在、⑥**目标页面里真有这个锚点**。
        第 ⑥ 条不能靠第 ② 条替代：账本登记过不等于页面上还留着那个 section id，
        模块页改版时账本一侧毫无反应，链接照样「可解析」，点进去却停在页顶。
  轴二 · **模块覆盖率（WARN）**——实战包里某模块零题即告警，除非登记在
        `_prep/coverage-exemptions.txt`（每行 `模块ID  # 理由（登记日）`）。

账本真源是各模块 `MANIFEST.md`，本脚本读它的机器可读派生 `Web-version/data.js`
（由 build.py 生成，禁止手工双写——见 web-rules §一）。

用法: python3 check_prep_coverage.py [知识库根目录]   # 缺省为脚本上级目录
退出码: 0 = 源指针全部有效（覆盖率告警不影响退出码）, 1 = 存在无效源指针或读取失败。
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
LINK_RE = re.compile(r'<a href="([^"]+)"><code>([^<]+)</code></a>')
NUM_RE = re.compile(r'<span class="num">([^<]+)</span>')
EXEMPT_FILE = "_prep/coverage-exemptions.txt"


def load_ledger(root):
    """从 data.js 取 {模块ID: {"dir":…, "web":…, "chapters":[章节ID…]}}。"""
    path = os.path.join(root, "Web-version", "data.js")
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    payload = raw.split("=", 1)[1].strip().rstrip(";")
    data = json.loads(payload)
    return {
        m["id"]: {
            "dir": m["dir"],
            "web": m.get("web"),
            "chapters": [c["id"] for c in m["chapters"]],
        }
        for m in data["modules"]
    }


def load_exemptions(root):
    path = os.path.join(root, EXEMPT_FILE)
    if not os.path.exists(path):
        return {}
    out = {}
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            mod, _, reason = line.partition("#")
            out[mod.strip()] = reason.strip()
    return out


def prep_pages(root):
    d = os.path.join(root, "_prep")
    if not os.path.isdir(d):
        return []
    return sorted(os.path.join(d, f) for f in os.listdir(d) if f.endswith(".html"))


def check_links(root, ledger):
    """轴一：逐条校验源指针。返回 (问题列表, {模块ID: 引用到的章节集合})。"""
    issues, used = [], {}
    for page in prep_pages(root):
        rel = os.path.relpath(page, root)
        with open(page, encoding="utf-8") as f:
            html = f.read()
        for href, label in LINK_RE.findall(html):
            if "#" not in label:
                issues.append(f"{rel}: 标签 `{label}` 不是「模块#章节」格式")
                continue
            mod, _, chap = label.partition("#")
            if mod not in ledger:
                near = [m for m in ledger if ledger[m]["dir"].lower() == mod.lower()]
                hint = f"（目录名是 {mod}，账本里的模块 ID 是 {near[0]}）" if near else ""
                issues.append(f"{rel}: 标签 `{label}` 的模块 ID `{mod}` 不在账本里{hint}")
                continue
            if chap not in ledger[mod]["chapters"]:
                issues.append(f"{rel}: 标签 `{label}` 的章节 ID `{chap}` 不属于 {mod}")
                continue
            used.setdefault(mod, set()).add(chap)

            if "#" not in href:
                issues.append(f"{rel}: `{label}` 的链接没有锚点，点进去落在册子首页 → {href}")
                continue
            target, _, frag = href.partition("#")
            if frag != chap:
                issues.append(f"{rel}: `{label}` 的链接锚点是 `{frag}`，与标签不一致")
            resolved = os.path.normpath(os.path.join(os.path.dirname(page), target))
            if not os.path.exists(resolved):
                issues.append(f"{rel}: `{label}` 指向的文件不存在 → {target}")
                continue
            # 账本里登记过 ≠ 页面上真有这个锚点：模块页改版把 section id 改掉，
            # 账本一侧不会有任何反应，链接照样「可解析」，点进去却停在页顶。
            with open(resolved, encoding="utf-8") as tf:
                if f'id="{frag}"' not in tf.read():
                    issues.append(f"{rel}: `{label}` 的目标页面里没有 id=\"{frag}\" 这个锚点")
    return issues, used


def main(argv):
    root = argv[1] if len(argv) > 1 else os.path.dirname(HERE)
    try:
        ledger = load_ledger(root)
    except Exception as exc:                                   # noqa: BLE001
        print(f"读取账本失败（Web-version/data.js）：{exc}")
        return 1

    issues, used = check_links(root, ledger)

    print("===== 轴一 · 源指针有效性 =====")
    if issues:
        for i in issues:
            print(f"  [无效] {i}")
        print(f"\n共 {len(issues)} 条无效源指针。")
    else:
        total = sum(len(v) for v in used.values())
        print(f"全部源指针有效（{total} 个不重复的章节引用）。")

    print("\n===== 轴二 · 模块覆盖率（实战包）=====")
    exempt = load_exemptions(root)
    zero = []
    for mod in sorted(ledger):
        chaps = used.get(mod, set())
        total = len(ledger[mod]["chapters"])
        mark = ""
        if not chaps:
            if mod in exempt:
                mark = f"  ← 已登记豁免：{exempt[mod]}"
            else:
                mark = "  ← 零覆盖（未登记豁免）"
                zero.append(mod)
        print(f"  {ledger[mod]['dir']:<20s} {len(chaps):2d}/{total:2d} 章{mark}")
    if zero:
        print(f"\n[告警] {len(zero)} 个模块零覆盖且未登记豁免：{'、'.join(zero)}")
        print(f"       按 prep-rules 第 3 条，零覆盖必须是显式决定——补题，"
              f"或登记到 {EXEMPT_FILE} 并写明理由与登记日。")
    else:
        print("\n所有模块均有题（或已登记豁免）。")

    return 1 if issues else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
