---
日期：2026-07-10
本次动作：B 类微更新。Multimodal 模块 2026-07-09 建成后，按其 MANIFEST 串联出边（mm-encoder → llm 注意力章）补实反向回指：在第 2 章「QKV 注意力」的多头注意力页之后、动手做页之前插入一页「承上启下 · 与 Multimodal：ViT 就是注意力吃图像」（克隆第 4 章「承上启下 · 与 RAG」页版式，要点卡三条 + 承上启下卡）。讲义 77 → 78 页；页脚页码已全书重排。
旧版已存档为 `history/2026-07-10-LLM-讲义.pptx`。
产出 skill 版本：v3.0
---

## 输入来源

Multimodal 模块建设收尾时的串联建议，用户确认「继续」后执行。
关系口径：视觉只是换了 token 的来源——ViT 把图切成 patch 当 token，QKV 注意力原样复用；O(n²) 成本对图像同样成立（高分辨率 → patch 多 → prefill 重）。模型怎么看懂图、模态怎么融合，详见 multimodal#mm-encoder / mm-fusion。
