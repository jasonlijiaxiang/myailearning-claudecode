# Solution-Patterns · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | solution-patterns |
| 所在层 | 解决方案层（2026-07-10 层调整：自应用模式层迁入，与 Model-Landscape 同层） |
| 建立日期 | 2026-07-10 |
| 最后更新 | 2026-07-11（B 类增第 8/9 章，速查顺延为第 10 章）；07-13 两件套吸收：增 intake 一页纸/四阶段交付门两页深潜 + 方案验收页，96→99 页；2026-07-15（呈现修复：删配图替代型残留源文字页 7 页，配图后 106→99 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），99→100 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 14 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 反 AI 腔（v3.15）文案打磨：1 处「抓手」改「入口」（放映序 p44），零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b（注：本次存留痕时误用 2026-07-20 同名覆盖了当日 v3.13 回刷前快照，已改用 b 后缀；原快照丢失，改动可依 raw-data/2026-07-20-术语全称回刷清单.md 重建） |
| 产出 skill 版本 | v3.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| sp-what-why | 第 1 章 | 从技术轴到场景轴（方案 = 场景 × 积木） | ✅ | 2026-07-10 |
| sp-method | 第 2 章 | 方案共性方法（五层架构 / POC 三要素 / 三本账 / 口径鉴别） | ✅ | 2026-07-10 |
| sp-customer-service | 第 3 章 | 智能客服（三层漏斗 / 解决率口径 / 语音客服） | ✅ | 2026-07-10 |
| sp-knowledge-search | 第 4 章 | 企业知识库与 AI 搜索（权限命门 / Glean 模式） | ✅ | 2026-07-10 |
| sp-content-gen | 第 5 章 | 营销与内容生成（品牌工程 / 商业安全 / 人审） | ✅ | 2026-07-10 |
| sp-ai-coding | 第 6 章 | AI Coding 与研发提效（双层格局 / 企业三关注） | ✅ | 2026-07-10 |
| sp-digital-human | 第 7 章 | 数字人（离线 vs 实时 / 合规红线） | ✅ | 2026-07-10 |
| sp-chatbi | 第 8 章 | ChatBI 与数据分析（语义层口径战场 / 三道闸 / 产品格局） | ✅ | 2026-07-11 |
| sp-meeting | 第 9 章 | 会议与办公助手（记忆库资产 / 三层口径 / 合规红线） | ✅ | 2026-07-11 |
| sp-cheatsheet | 第 10 章 | 售前速查（七场景→积木总表 / 分诊树 / 成本卡） | ✅ | 2026-07-11 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| 客服解决率口径：厂商自报 Fin 51–67% / Sierra ~70%（WeightWatchers）/ Decagon 80%（deflection）；独立口径 Zendesk 企业中位 41.2%、top quartile 58.7%；宣传与实测差 30–40pp | sp-customer-service / sp-method | 2026-07-10 | fin.ai 对比页 / digitalapplied 2026 统计 |
| 客服 AI 采用度：Salesforce 报 66% 服务组织已跑 AI agent（2025 年 39%）；Gartner 91% CX 负责人有部署压力 | sp-customer-service | 2026-07-10 | digitalapplied 2026 统计 |
| Glean：ARR $300M（2026-05，+89% YoY）、估值 $7.2B（2025-06 Series F）；Glean Agents 年化 1 亿+ actions | sp-knowledge-search | 2026-07-10 | TechCrunch 2026-05-28 / Glean press |
| AI Coding 市场：2026 年 $12.8B、85% 开发者在用；Copilot 4.7M 付费（用户第一）、Cursor $2B ARR（收入第一）、Claude Code 46% most-loved（JetBrains 2026-04 满意度第一）；采用率 29%/18%/18%；70% 工程师同时用 2–4 个工具 | sp-ai-coding | 2026-07-10 | ideaplan / tech-insider / JetBrains 2026 调查 |
| 数字人：HeyGen Avatar V（2026-04-08，15 秒素材建分身、10 分钟身份不漂移）；LiveAvatar 为 WebRTC 实时交互数字人独立平台 | sp-digital-human | 2026-07-10 | HeyGen 官方 blog / help center |
| 内容生成格局：Jasper（品牌一致性：风格指南/禁用词全局生效）、Canva Magic Studio（模板驱动）、Adobe Firefly Enterprise（商业安全定位：授权数据训练 + 企业 IP 赔付 + 可训品牌定制模型） | sp-content-gen | 2026-07-10 | Adobe 官方 / genesysgrowth 2026 对比 |
| 语音客服成本：级联 $0.01–0.17/分钟；gpt-realtime 未缓存 $0.18–0.46/分钟、优化后 $0.05–0.10（与 multimodal#mm-voice-realtime 同源口径） | sp-customer-service / sp-cheatsheet | 2026-07-10 | 沿用 mm-voice-realtime 同源 |
| 成本速查卡量级：文本客服 $0.01–0.05/会话、文案 $0.001–0.01/条、图 $0.02–0.1/张、AI Coding $19–40/人/月 + 用量 | sp-cheatsheet | 2026-07-10 | 各厂商定价页综合量级（2026-07 口径） |
| Text-to-SQL 准确率口径：裸 LLM 真实企业任务仅 10–21%（学术基准五六成）；语义模型加持后 Snowflake 内部 150 题基准 51%→90%+、dbt 语义层基准 98–100% | sp-chatbi | 2026-07-11 | promethium 2026 企业对比 / Snowflake 工程博客 / colrows |
| ChatBI 产品格局：垂直一体派 Cortex Analyst（YAML 语义模型）/ Databricks AI/BI Genie（Unity Catalog）/ Fabric Copilot；独立派 ThoughtSpot / dbt / Cube；Snowflake 2026 推 Semantic View Autopilot（ML 自动发现指标定义，天级→分钟级） | sp-chatbi | 2026-07-11 | promethium 语义层十强 / colrows |
| 会议助手格局：两分野（笔记器 vs agentic 平台）；原生派 Zoom AI Companion / Teams Copilot（M365 +$30/人/月）/ 飞书妙记；独立派 Otter / Fireflies / Granola（2026-03 融资 $125M、估值 $1.5B、bot-free 代表）；bot 疲劳为 2026 趋势 | sp-meeting | 2026-07-11 | read.ai / zapier / tana / meetily 2026 横评 |

> 说明：五层参考架构、POC 三要素、三本账、口径鉴别术属方法论，不会过期，未登记。成本速查卡整卡是全库最易过期的一页，巡检时优先核。

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| sp-what-why | （全库） | 本模块是场景索引层：单向引用所有技术模块，技术模块无需反向依赖 |
| sp-method | ai-gateway#gw-cost | 三本账的 token/并发治理在网关落地；成本治理机制见 AI-Gateway 第 4 章 |
| sp-method | evaluation#eval-build | POC 三要素中「签字的指标」= 自建评估集方法，见 Evaluation 第 5 章 |
| sp-method | ai-ops#ops-cheatsheet | 三本账的「人力账/运营包」在 AI-Ops 第 8 章展开为五件套清单与 SLA 报价口径——双向互指（2026-07-10） |
| sp-method / sp-knowledge-search | data-engineering#de-what-why / de-pipeline | 「数据坑是第一风险」「连接器是报价大头」在 Data-Engineering 展开为工程清单与报价明细——双向互指（2026-07-11） |
| sp-customer-service | rag#rag-hybrid / agent#agent-orchestration | 客服主料：知识兜底 + 业务办理 |
| sp-customer-service | multimodal#mm-voice-realtime | 语音客服链路（级联/延迟/SIP）深潜入口 |
| sp-knowledge-search | rag#rag-hybrid / rag#rag-graphrag / rag#rag-structured | 按知识形态选检索路线 |
| sp-knowledge-search | security#sec-data-privacy | 权限感知检索 / ACL / 越权测试的安全侧依据 |
| sp-content-gen | multimodal#mm-generation / pe#pe-anatomy | 生成能力 + 风格注入两大主料 |
| sp-ai-coding | agent#agent-lowcode / ai-gateway#gw-cost | 工具组合与统一预算治理 |
| sp-digital-human | multimodal#mm-voice-realtime / multimodal#mm-generation | 数字人 = 语音链路 + 生成的脸 |
| sp-cheatsheet | agent#agent-lowcode | 「有没有平台」的分诊去向 |
| sp-chatbi | rag#rag-structured | 技术底座：Text-to-SQL 与语义层机制在 RAG 第 12 章，本章是其场景视角（双向） |
| sp-chatbi | security#sec-data-privacy / evaluation#eval-build | 行级权限与只读闸；高频指标验收集 + 越权测试 |
| sp-meeting | multimodal#mm-understanding / multimodal#mm-voice-realtime | ASR 与说话人分离能力底座；实时字幕走语音链路 |
| sp-meeting | rag#rag-hybrid / agent#agent-eval-guardrails | 会议记忆库 = 权限感知检索；行动项自动执行的审批边界 |
