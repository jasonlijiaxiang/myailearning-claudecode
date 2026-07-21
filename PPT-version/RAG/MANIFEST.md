# RAG · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | rag |
| 所在层 | 应用模式层 |
| 建立日期 | 2026-07-07 |
| 最后更新 | 2026-07-12（B 类：引用 _reference/Codex 对照库,Reranker 格局刷新至 Cohere v4.0 系；同日字体白名单合规重制；同日统一中英对照语序（切分策略 Chunking）；同日两件套吸收：评估章增六段诊断/四层证明两页深潜 + 十二章生产验收清单，121→124 页）；2026-07-14 呈现回刷：封面章节条改为三篇分组（原理/实践/进阶，修复胶囊重叠与只列前 5 章）、核实日期更新，无内容变更；2026-07-15（呈现修复：删配图替代型残留源文字页 8 页，配图后 135→127 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），127→128 页；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 15 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 呈现修复：v4.3 撤电子书馆藏后残留的馆藏指向改为指向书单条目，1 处（放映序 p125），讲义不再指向已不存在的 ebooks/ 目录，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b；2026-07-21 网页版落地（第四批，与 Evaluation、AI-Gateway 同批）：`Web-version/rag/index.html`，覆盖与缺口矩阵存 raw-data/2026-07-21；网页版新增「管线症状诊断器」（交互件，第 5 章六段诊断 + 第 9 章排障三问的交互合成），评估方法论按「同一概念一个主要归属」深链 Evaluation 网页版，未引入新事实——事实级 0、缺口级 0，无回流欠账 |
| 产出 skill 版本 | v1.0（清单由 v2.0 回填） |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| rag-what-why | 第 1 章 | 是什么/为什么 | ✅ | 2026-07-07 |
| rag-embedding | 第 2 章 | 向量检索与 Embedding | ✅ | 2026-07-07 |
| rag-chunking | 第 3 章 | 切分策略 Chunking | ✅ | 2026-07-07 |
| rag-reranking | 第 4 章 | 重排序 Reranking | ✅ | 2026-07-07 |
| rag-evaluation | 第 5 章 | 常见评估方法 | ✅ | 2026-07-07 |
| rag-pipeline | 第 6 章 | 最小 RAG 管线 | ✅ | 2026-07-08 |
| rag-hybrid | 第 7 章 | 混合检索 | ✅ | 2026-07-08 |
| rag-agentic | 第 8 章 | Agentic RAG | ✅ | 2026-07-08 |
| rag-production | 第 9 章 | 生产化与常见坑 | ✅ | 2026-07-08 |
| rag-graphrag | 第 10 章 | GraphRAG：图谱增强检索 | ✅ | 2026-07-09 |
| rag-multimodal | 第 11 章 | 多模态 RAG | ✅ | 2026-07-09 |
| rag-structured | 第 12 章 | 结构化数据 RAG（Text-to-SQL 与语义层） | ✅ | 2026-07-09 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| Cohere Rerank 当前主线 v4.0（pro 重质量 / fast 低延迟高吞吐，多语言+半结构化），v3.5 与 v3.0 系仍在服务线 | rag-reranking | 2026-07-12 | docs.cohere.com/docs/rerank |
| 混合检索为生产最低标配，RRF k≈60 为主流引擎原生支持 | rag-hybrid | 2026-07-08 | Elasticsearch / Qdrant 官方文档 |
| Agentic RAG 五大生产模式（Router/ReAct/Plan-Execute/Multi-Agent/Self-RAG）+ CRAG | rag-agentic | 2026-07-08 | arXiv 2501.09136、LangGraph 官方教程 |
| 生产组合主流：LlamaIndex + LangGraph + Langfuse/LangSmith | rag-production | 2026-07-08 | 2026-07 框架对比评测 |
| 朴素 RAG 检索环节失败率约四成 | rag-production | 2026-07-08 | raw-data/2026-07-08 核实笔记 |
| Contextual Retrieval 实测降检索失败率 49%~67% | rag-chunking | 2026-07-07 | Anthropic Cookbook |
| BGE M3 为开源多语言 embedding 代表方案 | rag-embedding | 2026-07-07 | arXiv 2402.03216 |
| 全量 GraphRAG 索引成本 6–8 倍；LazyGraphRAG 压至 0.1%、全局查询省约 700 倍 | rag-graphrag | 2026-07-09 | Microsoft GraphRAG 文档、2026 实践者评测 |
| 多模态三路线：Caption / 统一嵌入（Cohere Embed 4、voyage-multimodal）/ ColPali 系晚交互 | rag-multimodal | 2026-07-09 | arXiv 2407.01449、BigData Boutique 2026 |
| 裸 Text-to-SQL 企业库准确率 50–70%，语义层抬至 85–95%（覆盖查询近 100%） | rag-structured | 2026-07-09 | dbt 2026 基准 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| rag-what-why | pe#pe-what-why | 「提示词 vs RAG」选型两面 + 检索内容要塞进提示词才生效；讲义已加「与 Prompt Engineering 的关系」页回指 |
| rag-agentic | agent#agent-context | RAG 第 8 章串联页 ↔ Agent 第 5 章"与 RAG 的握手"，双向互引 |
| rag-evaluation | evaluation | 检索质量指标（忠实度、上下文精确率/召回率）↔ Evaluation 模块指标体系（2026-07-09 转正） |
| rag-what-why | fine-tuning | "改知识用 RAG vs 改行为用微调"的取舍，与 Fine-tuning 模块互为参照（2026-07-09 转正） |
| rag-what-why | llm#llm-inference-kv | "长上下文 vs RAG"的架构论据（成本/有效性/权限）在 LLM 原理第 4 章，双向互为弹药 |
| rag-graphrag | rag#rag-agentic | 向量+图谱"按问题类型路由"是第 8 章 Router 模式的应用（章内承接） |
| rag-structured | agent#agent-components | SQL 查数包成 agent 工具，与文档检索并列路由，指向 Agent 模块工具使用章 |
| rag-multimodal | multimodal#mm-fusion | 本章讲「多模态内容怎么检索」，Multimodal 模块讲「模型怎么看懂图」，互为上下游；第 11 章已加「与 Multimodal 模块的关系」页（2026-07-10），双向互指 |
| rag-structured | solution-patterns#sp-chatbi | 本章讲 Text-to-SQL 与语义层的机制，SP 第 8 章是其场景视角（口径战场/三道闸/产品格局）——双向互指（2026-07-11） |
| rag-chunking / rag-embedding | data-engineering#de-parsing / de-vectordb | 上游供给：解析产物进切分（解析质量决定切分质量）；向量库规模化选型与迁移在 Data-Engineering 第 4 章——双向互指（2026-07-11） |
