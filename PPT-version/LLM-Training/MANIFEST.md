# LLM-Training · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | llm-training |
| 所在层 | 基础层 |
| 建立日期 | 2026-07-08 |
| 最后更新 | 2026-07-12（B 类：全景图「基座模型（Base Model）」中英对照语序统一，内容无改动；07-13 两件套吸收：增省显存转移/恢复状态机两页深潜 + 生产验收清单，78→81 页）；2026-07-14 呈现回刷：封面眉题统一为「AI 知识库 · 讲义式 PPT」，无内容变更；2026-07-15（呈现修复：删配图替代型残留源文字页 6 页，配图后 89→83 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），83→84 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 20 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 反 AI 腔（v3.15）文案打磨：1 处「抓手」改「切入点」（放映序 p81），零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b（注：本次存留痕时误用 2026-07-20 同名覆盖了当日 v3.13 回刷前快照，已改用 b 后缀；原快照丢失，改动可依 raw-data/2026-07-20-术语全称回刷清单.md 重建）；2026-07-20 书单订正：撤馆藏回写出处时填错的链接已逐条重新核实（详见 _maintenance/2026-07-20-原电子书馆藏出处存档.md 订正说明） |
| 产出 skill 版本 | v2.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| llmtrain-overview | 第 1 章 | 全景总览：从随机权重到可用助手 | ✅ | 2026-07-08 |
| llmtrain-data | 第 2 章 | 数据：模型的粮食 | ✅ | 2026-07-08 |
| llmtrain-pretrain | 第 3 章 | 预训练：压缩互联网 | ✅ | 2026-07-08 |
| llmtrain-sft | 第 4 章 | 后训练 I · SFT：教会听话 | ✅ | 2026-07-08 |
| llmtrain-alignment | 第 5 章 | 后训练 II · 对齐：教会分寸 | ✅ | 2026-07-08 |
| llmtrain-reasoning | 第 6 章 | 后训练 III · RLVR 与推理模型：教会思考 | ✅ | 2026-07-08 |
| llmtrain-infra | 第 7 章 | 训练基础设施与算力账 | ✅ | 2026-07-08 |
| llmtrain-eval | 第 8 章 | 评估与发布：怎么知道练成了 | ✅ | 2026-07-08 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| 后训练主流栈为 SFT →（可选 DPO）→ RLVR，GRPO/DAPO 一族为主力算法 | llmtrain-reasoning | 2026-07-08 | llm-stats.com 2026 后训练综述；arXiv 2407.16216 |
| 旗舰开源模型几乎全是稀疏 MoE（DeepSeek V4-Pro 1.6T/49B、Llama 4 Maverick 400B/17B、Qwen 3.5 397B/17B、Kimi K2.6 约 1T） | llmtrain-pretrain | 2026-07-08 | OpenRouter 2026-06 开源模型盘点 |
| FP8 混合精度训练进入主流实践（如 MiMo-V2.5-Pro 27T token FP8） | llmtrain-pretrain | 2026-07-08 | OpenRouter 盘点、厂商技术报告 |
| Muon/MuonClip：Kimi K2 15.5T token 零 spike；PyTorch 2.9 原生内置 torch.optim.Muon | llmtrain-pretrain | 2026-07-08 | PyTorch 官方博客；arXiv 2507.20534 |
| 数据墙：互联网高质量文本存量约 10–50 万亿 token | llmtrain-data | 2026-07-08 | 多方分析（aimultiple、lifearchitect 等） |
| 预测 2030 年推理算力占 AI 总算力约 75% | llmtrain-overview | 2026-07-08 | 行业分析（aibarcelona 等综述引用） |
| 开源许可格局：Apache 2.0 成主流（Qwen/Mistral/Gemma），DeepSeek 用 MIT | llmtrain-eval | 2026-07-08 | OpenRouter 2026-06 盘点 |
| RLHF Book 2026-01 完成章节重组（对齐 Manning 印刷版），免费在线 | 书单 | 2026-07-08 | rlhfbook.com |
| Stanford CS336 Spring 2026 视频与作业全部公开 | 书单 | 2026-07-08 | cs336.stanford.edu |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| llmtrain-overview / llmtrain-pretrain | llm#llm-why-transformer | LLM 原理讲架构（发动机舱），本模块讲训练（流水线），互为前置；第 3 章「可并行」一页对应其第 1 章 |
| llmtrain-sft | rag#rag-what-why | 「微调 vs RAG」互为镜像：RAG 从应用侧答，本章从训练侧补全 |
| llmtrain-reasoning | agent#agent-what-why | 推理模型/RLVR 是「agent 为什么现在能成」的模型侧原因 |
| llmtrain-eval | rag#rag-evaluation | 模型本体评估 ↔ 检索质量评估，两条评估线互参 |
| llmtrain-eval | agent#agent-eval-guardrails | 模型本体评估 ↔ 智能体评估与护栏 |
| llmtrain-eval | （候选）Evaluation | 三条评估线待未来 Evaluation 模块收编成总纲 |
| llmtrain-sft / llmtrain-alignment | fine-tuning#ft-methods / fine-tuning#ft-alignment | 本模块讲原理，Fine-tuning 模块讲「拿自己数据落地」的工程实践（2026-07-09 建成，候选转正） |
| llmtrain-overview | llm-inference#llminf-anatomy | 「训练一次性重投入 vs 推理持续账单」两侧互指；2030 推理算力 75% 预测两边同源引用（2026-07-09 补） |
| llmtrain-reasoning | llm-inference#llminf-speculative | RLVR 推理模型让 decode 负载暴涨，是推理优化成为刚需的原因；对方第 6 章以承上页回指本章（2026-07-09 补） |
| llmtrain-infra | ai-infra-compute#aic-scaleup / aic-scaleout | 并行策略（TP/PP/EP）产生的通信量决定网络怎么建；本模块讲并行、AI-Infra-Compute 讲承载它的两级互联（2026-07-09 补） |
| llmtrain-infra | ai-infra-compute#aic-hbm | 训练显存账（ZeRO/FSDP 切分）↔ HBM 硬件账；本模块讲切分、对方讲硬件地基（2026-07-09 补） |
| llmtrain-infra | ai-infra-platform#aip-scheduling / aip-faulttol | 训练作业是集群调度与容错的头号负载；本模块讲并行怎么切，AI-Infra-Platform 讲作业怎么被调度、崩了怎么续（2026-07-09 补） |
