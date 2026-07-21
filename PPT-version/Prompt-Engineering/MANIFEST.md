# Prompt Engineering · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | pe |
| 所在层 | 基础层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-12（B 类：字体白名单合规重制，Arial→Cambria/Calibri，内容无改动）；07-13 两件套吸收：增五层结构/预算四分区两页深潜 + 生产验收页，71→74 页，50 处页脚页码已重排；2026-07-15 账实回刷：07-14 配图增页此前漏记账，实测 80 页（放映序）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），80→81 页；2026-07-17 内容增补：速查章增「数字弹药」页 1 页（本册及跨模块已核实数字的集中速查，每条带用法与源指针），81→82 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 内容勘误：缓存折扣方向修正——"打 9 折"实为"约 1 折（0.1×，省约 90%）"，改讲义 6 页 7 处（放映序 p56/60/61/73/74/76）+ 本表 1 行，双口径并写（skill v3.13 换算陷阱规则首用），页数不变，旧版存 history/2026-07-20；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 5 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 呈现修复：v4.3 撤电子书馆藏后残留的馆藏指向改为指向书单条目，1 处（放映序 p82），讲义不再指向已不存在的 ebooks/ 目录，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b；2026-07-21 网页版落地（第五批，与 LLM、Fine-tuning 同批）：`Web-version/prompt-engineering/index.html`，覆盖与缺口矩阵存 raw-data/2026-07-21；网页版新增「提示词处方器」（交互件，症状 × 模型类型 → 技巧组合），未引入新事实——事实级 0、缺口级 0，无回流欠账 |
| 产出 skill 版本 | v3.0 |
| 状态 | ✅ 已完成（书单 10 项 / 5 份落地；讲义页数见页数账） |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| pe-what-why | 第 1 章 | 是什么 / 为什么 | ✅ | 2026-07-09 |
| pe-anatomy | 第 2 章 | 提示词解剖（角色/四要素/分隔符） | ✅ | 2026-07-09 |
| pe-core-techniques | 第 3 章 | 核心技巧（zero/few-shot、CoT、结构化输出、清晰指令） | ✅ | 2026-07-09 |
| pe-advanced-reasoning | 第 4 章 | 进阶推理与编排（自洽性、ReAct、提示词链、推理模型时代） | ✅ | 2026-07-09 |
| pe-engineering | 第 5 章 | 工程化与自动优化（版本化、评估驱动、DSPy、缓存） | ✅ | 2026-07-09 |
| pe-security | 第 6 章 | 安全与风险（提示词注入、越狱、OWASP、纵深防御） | ✅ | 2026-07-09 |
| pe-presales-map | 第 7 章 | 售前视角收拢（问题速查、选型树、上云全景、串联） | ✅ | 2026-07-09 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| 推理模型（GPT-5、Claude 4.7 扩展思考、Gemini 3 Pro deep think、DeepSeek R1）已把 CoT 内建，不再需手写「一步步思考」；重点转为控推理预算 / effort。OpenAI 区分推理模型（少给显式步骤）vs 通用 GPT（需更明确指令） | pe-advanced-reasoning | 2026-07-09 | raw-data/2026-07-09-联网核实笔记（futureagi、stevekinney、OpenAI/Anthropic 文档综述） |
| DSPy 2.x 默认优化器 MIPROv2（贝叶斯联合优化指令+示例，结构化任务较手写 +10~40%）；GEPA 反射式进化优化器较 MIPROv2 +13%、rollout 少 35×，ICLR 2026 oral | pe-engineering | 2026-07-09 | futureagi（DSPy optimizers 2026）、morphllm（GEPA） |
| 提示词缓存：截至 2026-06 三大厂缓存读取价约为基础输入价 0.1×（约 1 折，省约 90%）；OpenAI 自动（≥1024 token）、Anthropic 手动 cache_control 且写入加价（5min 1.25×/1h 2×）、Gemini 显式+按小时存储计费 | pe-engineering | 2026-07-20 | leanlm、prompthub、ofox.ai、artificialanalysis；2026-07-20 对照 Anthropic 官方定价文档修正折扣方向（原核实笔记为"省约 90%"，成品曾误写成"打 9 折"） |
| 各云提示词服务：AWS Bedrock Prompt Management + Advanced Prompt Optimization（改写/迁移+评估环）；Vertex AI / Gemini Enterprise Prompt Optimizer；Azure AI Foundry Prompt Flow | pe-engineering / pe-presales-map | 2026-07-09 | aws.amazon.com/bedrock/prompt-management、AWS News Blog、InfoWorld |
| OWASP Top 10 for LLM Applications 2025：LLM01 提示词注入连续两版第一；RAG 与微调都不能根治注入，只能纵深防御 | pe-security | 2026-07-09 | OWASP GenAI（https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/）、mend/aembit/promptfoo 解读 |
| 云护栏：AWS Bedrock Guardrails、Azure AI Content Safety、Google Vertex 安全过滤 / Model Armor | pe-security | 2026-07-09 | 各云官方文档 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| pe-what-why | fine-tuning#ft-when | 选型边界：提示词到头了、才上微调；对方第 1 章讲「何时微调 vs 提示词/RAG」，互为参照 |
| pe-what-why | rag#rag-what-why | 「提示词 vs RAG」的选型边界：补知识用 RAG，改行为用提示词 |
| pe-anatomy | llm#llm-inference-kv | 提示词为什么有效，根子在上下文窗口与注意力——上下文工程的「物理学」（讲义第 2/4 章埋点） |
| pe-advanced-reasoning | agent#agent-context | ReAct、上下文工程就是提示词技巧在「工具循环」里的应用；Agent 第 5 章为工程化展开 |
| pe-engineering | evaluation#eval-methods | 评估驱动的提示词优化直接用 Evaluation 的判分四法 / LLM-as-a-Judge（eval-judge） |
| pe-security | security（候选） | 提示词注入是未来 Security 模块的一块 |

> 备注：以上为本模块的出边（本次讲义已在第 1/4/7 章埋入串联点）。**反向回指已双向落账（2026-07-09）**：LLM / Agent / RAG / Evaluation / Fine-tuning 五个模块的讲义各已追加一页「附 · 与 Prompt Engineering 的关系」，各模块 MANIFEST 亦新增对应回指行（llm-inference-kv / agent-context / rag-what-why / eval-methods / ft-when → pe#…）。security 边仍为候选（模块待建）。
