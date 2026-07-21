#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""打分享包：把整库打成一个拷走即用的 zip，并解压自检（零第三方依赖）。

分享单元是**整个库目录**（Portable 铁律按整库定义：网页样式在 `_assets/`、门禁在
`_maintenance/`，只拷单页会掉样式、只拷讲义会丢账本）。默认瘦身：

  带走：讲义与书单、网页版、_assets、_prep、_maintenance 工具与门禁、KB-CONFIG、
        各索引页、raw-data 的输入与核实笔记（事实溯源要随库走）、
        当前技能包 _skill-source/knowledge-base-builder.skill（同事装它接着建自己的库）。
  不带：.git、raw-data/history/（旧版成品留痕，49M，是作者的回滚保险不是读者的内容）、
        _skill-source/history/ 与 _skill-source/knowledge-base-builder/（旧包与解包源）、
        _maintenance/history/、_reference/（作者的外部输入档案）、.DS_Store。
  `--full` 全量（仍排除 .git 与 .DS_Store）。

打完必自检：解压到临时目录，在里面跑布局与坏链两道门禁——**打包这条链的"真装一次"**：
zip 建成功只证明压缩没错，不证明拆开还是一个能用的库（同款教训见技能包 v4.8）。

用法: python3 _maintenance/make_share.py [输出目录] [--full]
退出码: 0 = 打包且自检通过, 1 = 失败（zip 保留，便于排查）。
"""
import datetime
import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SKIP_ALWAYS = {".git"}
SKIP_FILES = {".DS_Store"}
# 相对库根的前缀；命中即整棵不带（瘦身模式）
SKIP_SLIM_PREFIX = (
    "_skill-source/history",
    "_skill-source/knowledge-base-builder/",   # 解包源目录；分享只带 .skill 包本体
    "_maintenance/history",
    "_reference",
)
SKIP_SLIM_DIRNAME = "history"                  # raw-data/history/


def kb_name():
    try:
        t = open(os.path.join(ROOT, "KB-CONFIG.md"), encoding="utf-8").read()
        m = re.search(r"\|\s*知识库显示名\s*\|\s*([^|（(]+)", t)
        if m:
            return re.sub(r"\s+", "", m.group(1))
    except OSError:
        pass
    return "知识库"


def want(rel, full):
    parts = rel.split(os.sep)
    if parts[0] in SKIP_ALWAYS or os.path.basename(rel) in SKIP_FILES:
        return False
    if full:
        return True
    posix = rel.replace(os.sep, "/")
    for pre in SKIP_SLIM_PREFIX:
        if posix == pre.rstrip("/") or posix.startswith(pre):
            return False
    # <模块>/raw-data/history/：留痕不入分享包
    if SKIP_SLIM_DIRNAME in parts and "raw-data" in parts:
        if parts.index(SKIP_SLIM_DIRNAME) == parts.index("raw-data") + 1:
            return False
    return True


def build(outdir, full):
    date = datetime.date.today().isoformat()
    top = "%s-%s" % (kb_name(), date)
    path = os.path.join(outdir, top + (".full.zip" if full else ".zip"))
    n = 0
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        for dirpath, dirnames, filenames in os.walk(ROOT):
            rel_dir = os.path.relpath(dirpath, ROOT)
            dirnames[:] = sorted(
                d for d in dirnames
                if want(os.path.normpath(os.path.join(rel_dir, d)), full))
            for fn in sorted(filenames):
                rel = os.path.normpath(os.path.join(rel_dir, fn))
                if not want(rel, full):
                    continue
                z.write(os.path.join(dirpath, fn), os.path.join(top, rel))
                n += 1
        if not full:
            # 布局契约要求 _reference/ 目录存在（check_kb_layout 会验）；瘦身包排除的是
            # 作者的参考档案内容，目录本身要留着——接收者自己的参考资料以后放这。
            z.writestr(zipfile.ZipInfo(top + "/_reference/"), b"")
    return path, n


def selfcheck(path):
    """解压 → 在解压出的库里跑布局与坏链门禁。"""
    tmp = tempfile.mkdtemp(prefix="kbshare-")
    try:
        with zipfile.ZipFile(path) as z:
            z.extractall(tmp)
        inner = os.path.join(tmp, os.listdir(tmp)[0])
        ok = True
        for script in ("check_kb_layout.py", "check_html_links.py"):
            r = subprocess.run([sys.executable,
                                os.path.join(inner, "_maintenance", script)],
                               cwd=inner, capture_output=True, text=True)
            tail = (r.stdout or r.stderr).strip().splitlines()[-1:] or ["(无输出)"]
            print("  [%s] %s → %s" % ("通过" if r.returncode == 0 else "不通过",
                                      script, tail[0]))
            ok = ok and r.returncode == 0
        return ok
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main(argv):
    full = "--full" in argv
    args = [a for a in argv[1:] if not a.startswith("--")]
    outdir = args[0] if args else ROOT
    path, n = build(outdir, full)
    size = os.path.getsize(path) / 1024 / 1024
    print("已打包 %s（%d 个文件，%.1f MB，%s）"
          % (os.path.relpath(path, ROOT), n, size, "全量" if full else "瘦身"))
    print("解压自检：")
    if not selfcheck(path):
        print("自检不通过——zip 已保留，修完重打。")
        return 1
    print("自检通过：拆开就是一个能用的库。拿去分享吧。")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
