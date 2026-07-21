# Data-Engineering · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | data-engineering |
| 所在层 | 数据底座层（2026-07-11 增设，本模块为该层首模块） |
| 建立日期 | 2026-07-11 |
| 最后更新 | 2026-07-12（B 类：引用 _reference/Codex 对照库,补治理工具锚点；07-13 两件套吸收：增访问决策四输入深潜 + 生产验收清单，56→58 页）；2026-07-15（呈现修复：删配图替代型残留源文字页 3 页，配图后 64→61 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），61→62 页；2026-07-17 呈现修复：删配图替代型残留源文字页 1 页（07-14 配图批次遗留，标点差异逃过 v3.8 排查；另核实 p49/50 同题两连页为配图前既有的合法设计，登记 audit 豁免），62→61 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 10 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 反 AI 腔（v3.15）文案打磨：讲义 4 处「抓手」改「入口／用法」（p33、p38×2、p35）；README 1 处同步，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b（注：本次存留痕时误用 2026-07-20 同名覆盖了当日 v3.13 回刷前快照，已改用 b 后缀；原快照丢失，改动可依 raw-data/2026-07-20-术语全称回刷清单.md 重建）；2026-07-21 网页版落地（第八批收官，与 AI-Infra-Compute、AI-Infra-Platform 同批）：`Web-version/data-engineering/index.html`，覆盖与缺口矩阵存 raw-data/2026-07-21；网页版新增「数据就绪度评估器」（交互件，六输入出排期量级/连接器工程量/解析与向量库路线/治理提醒，判据全部来自第 1–5/7 章），未引入新事实——事实级 0、缺口级 0，无回流欠账 |
| 产出 skill 版本 | v3.0 |

> 边界纪律：切分策略在 rag#rag-chunking、向量检索原理在 rag#rag-embedding、合成数据配方在
> fine-tuning#ft-data、权限与脱敏规则在 security——全部引用不重讲；本模块讲上游的「数据就绪」工程与选型深潜。

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| de-what-why | 第 1 章 | 数据就绪度是第一风险（四问 / 管线总图 / 报价项） | ✅ | 2026-07-11 |
| de-parsing | 第 2 章 | 文档解析管线（四强格局 / 基准口径 / 选型分水岭） | ✅ | 2026-07-11 |
| de-pipeline | 第 3 章 | 连接器与增量同步（五件事 / 增量三模式 / 去重失效） | ✅ | 2026-07-11 |
| de-vectordb | 第 4 章 | 向量库选型深潜（五锚点 / 按规模演进 / 迁移纪律） | ✅ | 2026-07-11 |
| de-quality | 第 5 章 | 数据质量与覆盖率（四指标 / 坏答案回流 / 运营节奏） | ✅ | 2026-07-11 |
| de-labeling | 第 6 章 | 标注与合成数据运营（预算三去向 / 双线运营 / 分流口诀） | ✅ | 2026-07-11 |
| de-governance | 第 7 章 | 治理与权限衔接（三执行点 / 越权测试 / 向量化≠匿名化） | ✅ | 2026-07-11 |
| de-cheatsheet | 第 8 章 | 售前速查（管线总图 / 工具速查 / 八坑清单 / 串联） | ✅ | 2026-07-11 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| 解析四强：LlamaParse（VLM 托管、agentic OCR、<1000 页/天甜区）/ Docling（IBM 开源、AI 版面检测）/ MinerU（OpenDataLab，CJK 最强，PaddleOCR+自研版面）/ Unstructured；云文档智能三家为企业默认起点 | de-parsing | 2026-07-11 | mixpeek / pdfmux / llamaindex 2026 横评 |
| 基准口径（opendataloader-bench，200 PDF）：Docling 0.877 > marker 0.861 > MinerU 0.831；LlamaParse/Unstructured 未公布该基准 | de-parsing | 2026-07-11 | themenonlab / pdfmux 2026 |
| 向量库口径：pgvector 生产上限约 50–100M 向量（HNSW 重建成瓶颈）；Qdrant p50 4ms/p99 25ms、过滤最强开源；Milvus/Zilliz 十亿级；Weaviate/ES 原生混合最成熟；Pinecone 等托管按量 | de-vectordb | 2026-07-11 | firecrawl / layerbase / encore 2026 对比 |
| 选型共识：已有 Postgres→pgvector、有 ES→就地升级、重过滤→Qdrant、十亿级→Milvus、免运维→托管 | de-vectordb | 2026-07-11 | 同上（"100+ 企业部署决策指南"口径） |
| 增量同步三模式（轮询/webhook/CDC）与连接器五件事（认证/拉取/解析/ACL/增量）为工程量估算框架；成熟源参照 Airbyte 模式 | de-pipeline | 2026-07-11 | dbt/Airbyte 文档模式（稳定工程共识） |

## 稳定事实（不会过期，无需巡检）
| 事实 | 章节 ID | 说明 |
| --- | --- | --- |
| 数据就绪度四问、质量四指标、坏例分流口诀（不知道→修数据/不听话→训练集）、治理三执行点 | 各章 | 方法论骨架 |
| 治理工具锚点：OpenLineage 1.51.0（2026-07-09，Run/Job/Dataset 三实体 + facets）、OPA v1.18.2（2026-07-02）；注意血缘解释「数据怎么来」≠ 访问控制 | de-governance | 2026-07-12 | github.com/OpenLineage/OpenLineage、github.com/open-policy-agent/opa |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| de-what-why | solution-patterns#sp-method | SP 说「数据坑是第一风险」，本模块把它变成显性工程件与报价项（双向） |
| de-parsing | rag#rag-chunking | 解析产物交给 RAG 切分：解析质量决定切分质量——上游下游（双向） |
| de-pipeline | solution-patterns#sp-knowledge-search | SP 说「连接器是报价大头」，本章给五件事工程清单（双向） |
| de-vectordb | rag#rag-embedding | RAG 第 2 章讲原理与起步，本章讲规模化选型与迁移 |
| de-quality | ai-ops#ops-online-eval | 坏答案由 AI-Ops 在线评估抓到，归因到数据层由本章接住；运营节奏合并交付 |
| de-labeling | fine-tuning#ft-data / evaluation#eval-build | 配方在 Fine-tuning、评估集方法在 Evaluation；本章管预算与双线运营 |
| de-governance | security#sec-data-privacy | Security 定规则，本章是数据管线上的三个执行点；越权测试集同 SP 第 4 章验收 |
