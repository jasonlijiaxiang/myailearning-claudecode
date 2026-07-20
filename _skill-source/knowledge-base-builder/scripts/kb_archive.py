"""安全落档：把成品复制进模块 raw-data/history/，重名自动顺延 b/c 后缀，绝不静默覆盖。
用法: python3 kb_archive.py <成品文件> [模块目录]   （模块目录省略时取成品所在目录）
背景: 「存在即报错/顺延」规则（module-template）靠手写 cp 自觉执行, 2026-07-12 与
2026-07-20 两次静默覆盖丢档——第三次起交给本工具。命名与 2026-07-20 善后口径一致:
首档 YYYY-MM-DD-<原名>, 同日再档 YYYY-MM-DDb-<原名>、YYYY-MM-DDc-<原名>…
"""
import sys, os, shutil, datetime


def archive(src, module_dir=None):
    src = os.path.abspath(src)
    if not os.path.isfile(src):
        raise FileNotFoundError(src)
    module_dir = module_dir or os.path.dirname(src)
    hist = os.path.join(module_dir, "raw-data", "history")
    os.makedirs(hist, exist_ok=True)
    date = datetime.date.today().isoformat()
    base = os.path.basename(src)
    for suffix in [""] + [chr(c) for c in range(ord("b"), ord("z") + 1)]:
        dst = os.path.join(hist, f"{date}{suffix}-{base}")
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            return dst
    raise RuntimeError("同日后缀 b–z 已用尽，请人工处理")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    dst = archive(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
    print(f"已落档: {dst}")
