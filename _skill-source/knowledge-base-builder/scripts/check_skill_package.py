#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""技能分发包（.skill）结构自检（零第三方依赖）。

背景：2026-07-20 用户反馈"这个包用不了"。此前每次升级都报告"已重打包、四处副本 md5 一致"
——那只证明**搬运没错**，不证明**产物能装**。打包这条链上一直缺最后一层防线（core-rules §三
分层验收：上层全绿不等于真能用）。本脚本补第 1 层（结构），真装一次仍是第 2 层、不可替代。

判据：
  1. `SKILL.md` 必须在压缩包**根层**，不能多套一层同名目录——上传安装按根层找它；
  2. `references/`、`scripts/` 同样在根层；
  3. 无 `.DS_Store` / `__MACOSX` 等 macOS 杂物；
  4. frontmatter 可解析，含 name 与 metadata.version；
  5. `description` ≤1024 字符（claude.ai 上传硬门槛，超限直接拒收）；
  6. 压缩包本身完整（CRC 校验）。

用法: python3 check_skill_package.py <包.skill>
退出码: 0 = 结构合格, 1 = 有问题。
"""
import re
import sys
import zipfile

REQUIRED_TOP = ["SKILL.md", "references/", "scripts/"]
JUNK = (".DS_Store", "__MACOSX")


def check(path):
    issues = []
    try:
        z = zipfile.ZipFile(path)
    except (zipfile.BadZipFile, FileNotFoundError) as e:
        return ["无法打开压缩包：%s" % e]

    names = z.namelist()
    if z.testzip() is not None:
        issues.append("压缩包 CRC 校验失败（内容已损坏）")

    if "SKILL.md" not in names:
        # 常见错法：整个技能目录被多套了一层
        nested = sorted({n.split("/")[0] for n in names if "/" in n})
        issues.append("SKILL.md 不在根层——安装时按根层找它。"
                      "当前根层条目：%s（多半是打包时套了一层目录，"
                      "应在技能目录内执行 zip -r ../<名>.skill .）" % (nested or "空"))
    for top in REQUIRED_TOP[1:]:
        if not any(n.startswith(top) for n in names):
            issues.append("%s 不在根层" % top)

    junk = [n for n in names if any(j in n for j in JUNK)]
    if junk:
        issues.append("含杂物文件 %d 个（如 %s）" % (len(junk), junk[0]))

    if "SKILL.md" in names:
        text = z.read("SKILL.md").decode("utf-8", "replace")
        m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
        if not m:
            issues.append("SKILL.md 缺少可解析的 frontmatter")
        else:
            fm = m.group(1)
            if not re.search(r"^name:", fm, re.M):
                issues.append("frontmatter 缺 name")
            if not re.search(r"version:", fm):
                issues.append("frontmatter 缺 metadata.version")
            d = re.search(r"^description:\s*(.*?)(?=\n[a-z_]+:|\Z)", fm, re.S | re.M)
            if not d:
                issues.append("frontmatter 缺 description")
            elif len(d.group(1).strip()) > 1024:
                issues.append("description %d 字符，超过 1024 上限（上传会被拒）"
                              % len(d.group(1).strip()))
    return issues


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1
    bad = 0
    for path in argv[1:]:
        issues = check(path)
        if issues:
            bad += 1
            print("===== %s: 结构不合格 =====" % path)
            for i in issues:
                print("  [不合格] %s" % i)
        else:
            print("%s: 结构合格" % path)
    if not bad:
        print("\n结构自检通过。注意：这只是第 1 层——**真装一次**才算验收完成"
              "（core-rules §三）。")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
