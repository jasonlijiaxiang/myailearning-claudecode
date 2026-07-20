# LLM 原理 · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | llm |
| 所在层 | 基础层 |
| 建立日期 | 2026-07-08 |
| 最后更新 | 2026-07-12（B 类：末页回指页字体合规修正，内容无改动；同日中英对照语序统一；07-13 两件套吸收：增生成状态机/四类失败两页深潜 + 讲解验收页，78→81 页，28 处页脚页码已重排）；2026-07-15 账实回刷：07-14 配图增页此前漏记账，实测 87 页（放映序）；2026-07-17 呈现完善：新增「总收束」页（每章一句话）+ 全册末「来源与核实」页，87→89 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 17 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20 内容增补：第 4 章「标称 1M vs 有效 200K」页后新增「窗口由什么决定（训练配方→架构→服务工程三因素链）」「2M/5M 会来吗（四堵墙与主战场转移）」2 页 + 第 4 章对练页补 1 题（友商 1M vs 你们 200K）——对话沉淀 Topic B（系统面 Topic A 同日入 LLM-Inference 第 2 章），89→91 页；数字沿用本册既有核实，新核实仅视频 token 口径（见时效性事实表），audit PASS，旧版存 history/2026-07-20；2026-07-20b 呈现修复：v4.3 撤电子书馆藏后残留的馆藏指向改为指向书单条目，2 处（放映序 p74 / p88），讲义不再指向已不存在的 ebooks/ 目录，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b |
| 产出 skill 版本 | v2.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| llm-why-transformer | 第 1 章 | 从序列问题到 Transformer | ✅ | 2026-07-08 |
| llm-attention-qkv | 第 2 章 | 注意力机制：QKV 拆解 | ✅ | 2026-07-08 |
| llm-architecture | 第 3 章 | Transformer 全解剖 | ✅ | 2026-07-08 |
| llm-inference-kv | 第 4 章 | 从架构到推理：上下文窗口与 KV 缓存 | ✅ | 2026-07-08 |
| llm-attention-zoo | 第 5 章 | 注意力的工程进化 | ✅ | 2026-07-08 |
| llm-presales-map | 第 6 章 | 售前视角收拢 | ✅ | 2026-07-08 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| GQA 8:1 是生产默认（生态支持最全）；MLA 为 DeepSeek/Kimi 系默认，KV 缓存约为同级 GQA 的 1/10，已被 Kimi K2、GLM-5 采用 | llm-attention-zoo | 2026-07-08 | raw-data/2026-07-08 联网核实笔记（Raschka 变体图解等） |
| DeepSeek V3.2 的 DSA 稀疏注意力（lightning indexer + top-k，O(L²)→O(Lk)）已生产化，GLM-5 跟进；DeepSeek-V4 用混合压缩注意力冲百万上下文 | llm-attention-zoo | 2026-07-08 | arXiv 2512.02556、arXiv 2512.12087 |
| 线性混合格局：Qwen3-Next 的 3:1 Gated DeltaNet 混合被 Qwen3.5 旗舰转正；Kimi Linear 通道级门控；反例 MiniMax M2 退回全注意力（复杂推理精度） | llm-attention-zoo | 2026-07-08 | Raschka Beyond Standard LLMs、mlabonne Qwen3.5 分析 |
| FlashAttention-4：2026-03-05 论文（arXiv 2603.05451），2026-07-01 PyPI 发包，面向 Blackwell 非对称硬件 | llm-attention-zoo | 2026-07-08 | together.ai 博客、pypi.org/project/flash-attn-4 |
| 托管商用模型 13 家提供 ≥1M 上下文窗口（Gemini 3.1 Pro 2M；开源 Llama 4 Scout 标称 10M）；RULER/MRCR v2/NoLiMa 显示多事实检索过 200K 普遍掉 30–60 分 | llm-inference-kv | 2026-07-08 | morphllm.com、ofox.ai 长上下文基准汇总 |
| 视频 token 量级：Gemini 官方口径默认分辨率约 300 token/秒（258/帧 @1fps + 音频 32/秒），1 小时视频 ≈ 108 万 token（建议复查日 2026-10-31，随 Multimodal 巡检顺带） | llm-inference-kv | 2026-07-20 | ai.google.dev/gemini-api/docs/video-understanding（raw-data/2026-07-20-联网核实笔记-视频token.md） |
| RoPE 是主流开源模型位置编码的事实标准；超长上下文靠插值/YaRN 等扩展 | llm-architecture | 2026-07-08 | 开源架构对比综述（Raschka） |
| MoE 为 2026 主流旗舰标配（DeepSeek-V3 总 671B/激活 37B；Qwen3.5、Kimi K2 同路线） | llm-architecture | 2026-07-08 | DeepSeek-V3 论文、架构对比综述 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| llm-inference-kv | pe#pe-anatomy | 提示词为什么有效的「物理学」基础：上下文窗口 / 注意力决定能放多少、放多准；讲义已加「与 Prompt Engineering 的关系」页回指 |
| llm-inference-kv | rag#rag-what-why | 「1M 窗口不是 RAG 终结者」：本模块给架构论据（成本/有效性/权限），RAG 第 1 章为应用视角，双向互为弹药 |
| llm-inference-kv | agent#agent-context | 上下文工程的物理学解释：O(n²) 成本 + 有效窗口约束是 Agent 第 5 章那套做法的根源 |
| llm-architecture | llm-training#llmtrain-pretrain | 本模块讲 MoE/参数账的架构视角，训练侧故事（Scaling Laws、MoE 训练、FP8）在 LLM-Training 第 3 章展开；对方以 llmtrain-overview/pretrain → llm#llm-why-transformer 回指，互为前置 |
| llm-inference-kv | llm-inference#llminf-kv-budget | 本章讲 KV 缓存「为什么存在」（机制），LLM-Inference 第 2 章讲「怎么管好」（服务系统），互为前后篇；对方讲义有承上启下页回指本章（2026-07-09 补）；2026-07-20 对话沉淀拆分互指：本章新增「窗口由什么决定／四堵墙」2 页（原理面）↔ 对方第 2 章新增「资源账」3 页（系统面） |
| llm-attention-qkv | multimodal#mm-encoder | ViT = 注意力吃图像：patch 即 token、QKV 原样复用、O(n²) 对图像同样成立；第 2 章已加「承上启下 · 与 Multimodal」页回指（2026-07-10） |
