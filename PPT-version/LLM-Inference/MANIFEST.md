# LLM-Inference · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | llm-inference |
| 所在层 | 基础层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-12（B 类：引用 _reference/Codex 对照库,修正 TensorRT-LLM 口径、压测工具换代 AIPerf、复核引擎版本；07-13 两件套吸收：增请求状态机/容量四证据两页深潜 + 生产验收清单，85→88 页）；2026-07-14 呈现回刷：封面眉题统一为「AI 知识库 · 讲义式 PPT」，无内容变更；2026-07-15（呈现修复：删配图替代型残留源文字页 6 页，配图后 96→90 页）；2026-07-17 账实回刷：「讲义页数」字段 88→90（07-14/15 增删页后漏改，全面 review 页数账实核对发现）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），90→91 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 18 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20 内容增补：第 2 章「长上下文的价格」页后新增「窗口与缓存（容量 vs 复用）／资源占用（不锁）／容量规划（售前算账，含对练角 1 题）」3 页——对话沉淀 Topic A（原理面 Topic B 同日入 LLM 原理第 4 章），91→94 页；插页按目标册小画布 sldSz ×0.75 缩放且正文字号预抬档（缩放后 ≥11pt，无新增小字告警），audit PASS，旧版存 history/2026-07-20 |
| 产出 skill 版本 | v2.0（2026-07-12 增补由 v3.3 执行） |
| 讲义页数 | 94 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| llminf-anatomy | 第 1 章 | 推理是怎么跑起来的 | ✅ | 2026-07-09 |
| llminf-kv-budget | 第 2 章 | KV Cache 与显存账 | ✅ | 2026-07-09 |
| llminf-batching | 第 3 章 | 把 GPU 喂饱：批处理与调度 | ✅ | 2026-07-09 |
| llminf-engines | 第 4 章 | 推理框架图鉴 | ✅ | 2026-07-09 |
| llminf-quant | 第 5 章 | 让模型变小：量化 | ✅ | 2026-07-09 |
| llminf-speculative | 第 6 章 | 让模型变快：投机解码与算法加速 | ✅ | 2026-07-09 |
| llminf-disagg | 第 7 章 | 集群级：P/D 分离与分布式推理 | ✅ | 2026-07-09 |
| llminf-production | 第 8 章 | 生产化与售前速查 | ✅ | 2026-07-09 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| vLLM 当前 v0.25.0（2026-07-11），事实上的默认推理引擎（硬件覆盖最广、NVIDIA NGC 收编） | llminf-engines | 2026-07-12 | GitHub releases、2026 对比评测（见 raw-data 核实笔记） |
| SGLang 当前 v0.5.15（2026-07-10）；v0.5.13 起投机解码 Spec V2 默认开启；DeepSeek 系 day-0 支持 | llminf-engines | 2026-07-12 | GitHub releases |
| TensorRT-LLM 进入 1.x（1.0 起 PyTorch 架构转正）；稳定版 v1.2.1，1.3.0 处于 RC（rc20 为最后支持 TensorRT backend 的 RC，下版移除）；商业包装为 NIM | llminf-engines | 2026-07-12 | GitHub releases（github.com/NVIDIA/TensorRT-LLM/releases） |
| FP8 为生产推理默认精度（校准后损失约 0.5–2%）；NVFP4 面向 Blackwell、工具链成熟中、尚未大规模生产 | llminf-quant | 2026-07-09 | vrlatech/sesamedisk 2026 量化综述 |
| 投机解码已生产标配：EAGLE-3 主流、vLLM 报告最高 ~2.5x、接受率>80% 时 2–4x | llminf-speculative | 2026-07-09 | spheron/sesamedisk 2026 实测综述 |
| 行业预测 2030 推理算力占 AI 总算力 ~75%（与 LLM-Training llmtrain-overview 同源事实） | llminf-speculative | 2026-07-09 | 行业分析综述 |
| NVIDIA Dynamo 1.0 于 2026-03-16 GTC GA，当前稳定版 v1.2.1（2026-06-13）：P/D 分离编排 + KV 感知路由 + NIXL；官方宣称 DeepSeek-R1/Blackwell 最高 7x 吞吐 | llminf-disagg | 2026-07-12 | NVIDIA 官方博客、GitHub releases（github.com/ai-dynamo/dynamo） |
| 压测工具换代：NVIDIA AIPerf v0.11.0（2026-07-08）接棒 GenAI-Perf（官方提供迁移指南），配合 vllm bench serve 为 token 级压测主力 | llminf-production | 2026-07-12 | pypi.org/project/aiperf、github.com/ai-dynamo/aiperf |
| P/D 分离成大规模服务共识：Mooncake（FAST'25 最佳论文）、DistServe（OSDI'24）、开源 llm-d（K8s 系） | llminf-disagg | 2026-07-09 | arXiv 2407.00079 等 |
| 成本量级参考：H100 级时租 $2–3/卡、70B FP8 双卡 ~3000 token/s、自建盈亏线利用率 ~40–50%、托管 API $2–5/百万输出 token | llminf-production | 2026-07-09 | 2026 年中多方评测量级归纳（讲义中已标注"参考"口径） |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| llminf-kv-budget | llm#llm-inference-kv | KV Cache「为什么存在」（机制）在 LLM 原理第 4 章，「怎么管好」（系统）在本章——互为前后篇，讲义内有承上启下页；2026-07-20 对话沉淀拆分互指：本章新增「资源账」3 页（系统面）↔ 对方第 4 章新增「窗口由什么决定／四堵墙」2 页（原理面） |
| llminf-anatomy | llm-training#llmtrain-overview | 「训练一次性重投入 vs 推理持续账单」同一事实两侧；2030 推理算力 75% 预测两边同源引用 |
| llminf-speculative | llm-training#llmtrain-reasoning | 推理模型（RLVR）让 decode 负载暴涨十几倍，是推理优化 2026 成为刚需的直接原因 |
| llminf-batching | agent#agent-context | Prefix Caching/RadixAttention 的最大受益者是多轮 Agent——上下文工程在推理侧的回报 |
| llminf-kv-budget | rag#rag-what-why | 长上下文 prefill 平方级+KV 线性级两头吃钱，是「1M 窗口不是 RAG 终结者」的推理侧论据 |
| llminf-production | （候选）Evaluation | 推理压测/SLO/goodput 这条线待未来 Evaluation 模块收编 |
| llminf-kv-budget | ai-infra-compute#aic-hbm | KV Cache 显存账（机制）↔ HBM 硬件账（地基）：互为前后篇，2026-07-09 建 AI-Infra-Compute 时补 |
| llminf-quant | ai-infra-compute#aic-gpu | 量化落地 ↔ FP8/FP4 精度阶梯硬件前提，同源口径（2026-07-09 补） |
| llminf-disagg | ai-infra-compute#aic-storage | P/D 分离/KV 路由 ↔ KV Cache 外置存储：存储升级为推理性能部件（2026-07-09 补） |
| llminf-disagg | ai-infra-platform#aip-serving | P/D 分离/Dynamo/llm-d 机制在本模块，平台承载（编排/扩缩/路由）在 AI-Infra-Platform 第 7 章（2026-07-09 补） |
| llminf-production | ai-infra-platform#aip-observability | 利用率/goodput/SLO 运营两侧互指（2026-07-09 补） |
