# 2026-07-09 · 补实与 LLM-Inference 的串联

- 背景：今日新建 LLM-Inference 模块（基础层，「原理 → 训练 → 推理」三部曲补齐）。
- 动作：在本模块 MANIFEST「串联出边」新增一行：llm-inference-kv → llm-inference#llminf-kv-budget
  （KV 缓存机制 ↔ 服务系统治理，互为前后篇）。对方讲义第 2 章有承上启下页回指本模块第 4 章。
- 本模块讲义与书单内容未改动，无需存档历史版本。
