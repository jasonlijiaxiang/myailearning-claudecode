"""安全落档：把成品复制进 history/，重名自动顺延 b/c 后缀，绝不静默覆盖。
用法:
    python3 kb_archive.py <成品文件> [模块目录]        # 默认落 <模块目录>/raw-data/history/
    python3 kb_archive.py <文件> --dest <目录>          # 指定归档目录（技能包等非模块产物）
    python3 kb_archive.py <文件> --dest <目录> --stem-suffix -v6.9
                                                       # 文件名主干后缀，得到 …-<名>-v6.9.skill
归档目录两种口径（2026-07-22 补 --dest 后定版）:
    模块成品 → <模块>/raw-data/history/（默认，不用传）
    技能包   → _skill-source/history/，且带版本后缀：YYYY-MM-DD-<名>-vN.N.skill
              （曾因工具只会往 raw-data/history 落且不带版本号，手工挪过一次）
背景: 「存在即报错/顺延」规则（module-template）靠手写 cp 自觉执行, 2026-07-12 与
2026-07-20 两次静默覆盖丢档——第三次起交给本工具。命名与 2026-07-20 善后口径一致:
首档 YYYY-MM-DD-<原名>, 同日再档 YYYY-MM-DDb-<原名>、YYYY-MM-DDc-<原名>…
后缀取「已有最高之后的下一位」而非「第一个空位」: 早先事故丢档会在序列中留下空档位,
填进去的新档读起来反而比后面的旧档还早（2026-07-20 修 ebooks/ 指向时四册踩中）。
"""
import sys, os, shutil, datetime


def archive(src, module_dir=None, dest=None, stem_suffix=""):
    src = os.path.abspath(src)
    if not os.path.isfile(src):
        raise FileNotFoundError(src)
    if dest:
        hist = os.path.abspath(dest)
    else:
        module_dir = module_dir or os.path.dirname(src)
        hist = os.path.join(module_dir, "raw-data", "history")
    os.makedirs(hist, exist_ok=True)
    date = datetime.date.today().isoformat()
    base = os.path.basename(src)
    if stem_suffix:                      # 主干后缀：foo.skill + "-v6.9" → foo-v6.9.skill
        stem, ext = os.path.splitext(base)
        base = stem + stem_suffix + ext
    suffixes = [""] + [chr(c) for c in range(ord("b"), ord("z") + 1)]
    # 从「已有最高后缀」之后接着排,不回填中间空档位——空档位多半是历史丢档留下的,
    # 回填会让新档在文件名排序上跑到旧档前面。
    taken = [i for i, s in enumerate(suffixes)
             if os.path.exists(os.path.join(hist, f"{date}{s}-{base}"))]
    start = taken[-1] + 1 if taken else 0
    for suffix in suffixes[start:]:
        dst = os.path.join(hist, f"{date}{suffix}-{base}")
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            return dst
    raise RuntimeError("同日后缀 b–z 已用尽，请人工处理")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)
    dest = suffix = None
    for flag in ("--dest", "--stem-suffix"):
        if flag in args:
            i = args.index(flag)
            val = args[i + 1] if i + 1 < len(args) else None
            if val is None:
                print(f"{flag} 后面要跟一个值")
                sys.exit(1)
            if flag == "--dest":
                dest = val
            else:
                suffix = val
            del args[i:i + 2]
    dst = archive(args[0], args[1] if len(args) > 1 else None,
                  dest=dest, stem_suffix=suffix or "")
    print(f"已落档: {dst}")
