# Evaluation · MANIFEST(模块清单)

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | evaluation |
| 所在层 | 工程保障层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-12（B 类：字体白名单合规重制；同日两件套吸收：增 Agent 五层评测栈/四道发布门两页深潜 + 评估体系验收页，88→91 页，插页后页脚页码已重排）；2026-07-14 呈现回刷：封面眉题统一为「AI 知识库 · 讲义式 PPT」，无内容变更；2026-07-15 账实回刷：07-14 配图增页此前漏记账，实测 98 页（放映序）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），98→99 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 4 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 反 AI 腔（v3.15）文案打磨：1 处「抓手」改「凭据」（放映序 p70），零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b（注：本次存留痕时误用 2026-07-20 同名覆盖了当日 v3.13 回刷前快照，已改用 b 后缀；原快照丢失，改动可依 raw-data/2026-07-20-术语全称回刷清单.md 重建）；2026-07-20 书单订正：撤馆藏回写出处时填错的链接已逐条重新核实（详见 _maintenance/2026-07-20-原电子书馆藏出处存档.md 订正说明）；2026-07-21 网页版落地（第四批，与 AI-Gateway、RAG 同批）：`Web-version/evaluation/index.html`，覆盖与缺口矩阵存 raw-data/2026-07-21；网页版新增「判分方案设计器」（交互件，第 3 章设计顺序 + 第 4 章判官三问的交互版），未引入新事实——事实级 0、缺口级 0，无回流欠账 |
| 产出 skill 版本 | v3.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| eval-why-hard | 第 1 章 | 为什么评估这么难 | ✅ | 2026-07-09 |
| eval-benchmarks | 第 2 章 | 模型基准测试全景 | ✅ | 2026-07-09 |
| eval-methods | 第 3 章 | 评估方法谱系 | ✅ | 2026-07-09 |
| eval-judge | 第 4 章 | LLM-as-a-Judge 深潜 | ✅ | 2026-07-09 |
| eval-build | 第 5 章 | 自建评估:数据集与指标设计 | ✅ | 2026-07-09 |
| eval-scenarios | 第 6 章 | 场景验收:RAG / Agent / 微调 | ✅ | 2026-07-09 |
| eval-tooling | 第 7 章 | 评估工具链与生产闭环 | ✅ | 2026-07-09 |
| eval-cheatsheet | 第 8 章 | 售前速查 | ✅ | 2026-07-09 |

## 时效性事实(巡检盘查对象)
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| MMLU / MMLU-Pro 已功能性饱和,前沿模型普遍 88%+,顶部无区分度 | eval-benchmarks | 2026-07-09 | techjacksolutions / kili-technology 2026 基准综述 |
| GPQA Diamond 头部分数:Gemini 3.1 Pro 94.3 / Claude Opus 4.6 91.3 / Qwen3.5-plus 88.4 / GPT-5.3 Codex 81(2026-02 口径) | eval-benchmarks | 2026-07-09 | lmmarketcap / kili-technology |
| HLE 前沿模型约 35~50%,人类专家约 90%,当前区分度最好的知识型基准之一 | eval-benchmarks | 2026-07-09 | techjacksolutions 2026 基准综述 |
| Agent 基准主战场:SWE-bench Verified / Terminal-Bench 2.0(89 任务)/ τ²-bench / OSWorld;BFCL v4(2026-04)改 Agentic 加权 40% | eval-benchmarks | 2026-07-09 | benchmarkingagents / spheron / arXiv 2601.11868 |
| 2026 中头部格局:Claude Opus 4.6 领跑 SWE-bench/Terminal-Bench/OSWorld,Gemini 3.1 Pro 领跑 ARC-AGI-2 等,GPT-5.2 领跑 τ²-bench | eval-benchmarks | 2026-07-09 | benchlm / awesomeagents 榜单 |
| Chatbot Arena → LMArena → Arena(2026-01 更名),累计 600 万+ 投票,估值 17 亿美元 | eval-benchmarks | 2026-07-09 | openlm.ai / news.lmarena.ai |
| 《The Leaderboard Illusion》(2025):厂商私测多变体择优公开,曾有厂商私测 27 变体只公开最优 | eval-benchmarks | 2026-07-09 | arXiv 2504.20879 / openreview |
| 判官三大偏差:位置(换序判决漂移 >10%)、冗长(无新信息加长版被偏好 >90%)、自我偏好(与困惑度相关) | eval-judge | 2026-07-09 | arXiv 2306.05685 / 2410.21819 / 2410.02736 |
| Judge Reliability Harness(2026-03 开源)结论:无判官全面可靠,可靠性是逐任务属性 | eval-judge | 2026-07-09 | adaline / emergentmind 2026 |
| 开发期开源框架格局:Ragas(RAG 专项)/ DeepEval(50+ 指标, pytest CI)/ promptfoo(矩阵+红队 40+ 插件) | eval-tooling | 2026-07-09 | confident-ai / genai.qa / aiml.qa 2026 对比 |
| OpenAI 平台内置 Evals:2026-10-31 起只读,2026-11-30 关停 | eval-tooling | 2026-07-09 | developers.openai.com 官方文档 |
| 三大云托管评估服务:AWS Bedrock 模型评估作业 / Azure AI Foundry 评估器 / Vertex AI Gen AI 评估服务 | eval-tooling | 2026-07-09 | internative / bitslovers / epcgroup 2026 平台对比 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| eval-methods | pe#pe-engineering | 提示词的评估驱动优化用本模块判分四法 / LLM-as-a-Judge；讲义已加「与 Prompt Engineering 的关系」页回指 |
| eval-scenarios | rag#rag-eval | RAG 检索质量指标在本模块收编为「场景验收」并补全端到端方法 |
| eval-scenarios | agent#agent-eval | Agent「评估与护栏」提出「要评」,本模块给出轨迹/结果分层的「怎么评」 |
| eval-scenarios | fine-tuning#ft-eval-deploy | 微调验收四层与回归门禁在本模块展开成完整验收方案 |
| eval-benchmarks | llm-training#评估章 | 模型厂「炼模型时评什么」vs 应用方「选模型时评什么」,视角互补 |
| eval-why-hard | llm-inference#性能指标 | 边界声明:质量归本模块,延迟/吞吐归 LLM-Inference |
| eval-scenarios | security#sec-defense | 安全维度验收(注入抵抗率、有害内容率)由 Security 模块第 6 章红队产出并回流,候选边已兑现(2026-07-09) |
| eval-benchmarks | model-landscape#ml-selection | 本模块讲"榜单怎么骗人/怎么自建评估",Model-Landscape 第 8 章把它用作选型两道防线——双向互指(2026-07-10) |
| eval-build / eval-judge | ai-ops#ops-online-eval | 全库最强新搭档:本模块给离线建集与判官方法,AI-Ops 第 3 章做在线采样运营(共享判分器定义)——双向互指(2026-07-10) |
