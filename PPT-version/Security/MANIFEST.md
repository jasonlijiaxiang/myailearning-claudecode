# Security · MANIFEST(模块清单)

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | security |
| 所在层 | 工程保障层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-12（B 类：字体白名单合规重制，YaHei→Cambria/Calibri，内容无改动）；07-13 两件套吸收：增四层工件证据/三条链两页深潜 + 安全验收页，73→76 页，39 处页脚页码已重排；2026-07-14 呈现回刷：封面眉题统一为「AI 知识库 · 讲义式 PPT」，无内容变更；2026-07-15 账实回刷：07-14 配图增页此前漏记账，实测 83 页（放映序）；2026-07-17（B 类增章：新增第 8 章「中国监管合规」12 页——监管地图/双备案/备案 vs 登记分诊/内容标识/安全国标/数据出境/云上配套/动手做/对练/小结，售前速查顺延第 9 章；封面章节条 8→9（5 列布局）与导览「九章一条防线」同步回刷；联网核实笔记 raw-data/2026-07-17；83→95 页）；2026-07-17 内容增补：速查章增「数字弹药」页 1 页（本册及跨模块已核实数字的集中速查，每条带用法与源指针），95→96 页；2026-07-17 呈现修复：删配图替代型残留源文字页 7 页（07-14 配图批次遗留——信息图版与源文字页标题存在全/半角标点差异，逃过 v3.8 排查与 audit 同题检查；其中 2 页为改写标题版，经基线核实与目检确认为替代型），96→89 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 14 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS |
| 产出 skill 版本 | v3.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| sec-landscape | 第 1 章 | 为什么 AI 安全是新问题(威胁全景) | ✅ | 2026-07-09 |
| sec-prompt-injection | 第 2 章 | 提示注入与越狱 | ✅ | 2026-07-09 |
| sec-data-privacy | 第 3 章 | 数据与隐私安全 | ✅ | 2026-07-09 |
| sec-supply-chain | 第 4 章 | 供应链与模型来源 | ✅ | 2026-07-09 |
| sec-agentic | 第 5 章 | Agent 与工具安全 | ✅ | 2026-07-09 |
| sec-defense | 第 6 章 | 防护工程:护栏·模式·红队 | ✅ | 2026-07-09 |
| sec-governance | 第 7 章 | 治理与合规框架 | ✅ | 2026-07-09 |
| sec-china | 第 8 章 | 中国监管合规 | ✅ | 2026-07-17 |
| sec-cheatsheet | 第 9 章 | 售前速查 | ✅ | 2026-07-09 |

## 时效性事实(巡检盘查对象)
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| OWASP LLM Top 10 现行版为 2025 版;新增 LLM07 系统提示词泄露、LLM08 向量与嵌入弱点,敏感信息泄露升至第 2 | sec-landscape | 2026-07-09 | genai.owasp.org/llm-top-10 |
| OWASP 另有《Agentic AI Threats & Mitigations》(2025-02)与《Top 10 for Agentic Applications 2026》 | sec-agentic | 2026-07-09 | genai.owasp.org(ASI) |
| EchoLeak(CVE-2025-32711):M365 Copilot 首个零点击间接注入,CVSS 9.3 | sec-prompt-injection | 2026-07-09 | arXiv 2509.10540 / Sentra |
| 在野间接注入 2026 起规模化:Unit42 2026-03 记录 22 种载荷手法;CrowdStrike 报 2025 影响 90+ 组织 | sec-prompt-injection | 2026-07-09 | unit42 / helpnetsecurity 2026-04 |
| OpenAI/Anthropic/Google DeepMind 均公开承认:现有架构下提示注入无法彻底根治,需模型外确定性策略兜底 | sec-prompt-injection | 2026-07-09 | 三厂 2025 研究 |
| 护栏格局:开源 Llama Guard/NeMo Guardrails/Guardrails AI/LLM Guard;商业 Lakera;云托管 Bedrock Guardrails/Azure AI Content Safety(Prompt Shields) | sec-defense | 2026-07-09 | generalanalysis / galileo 2026 对比 |
| CaMeL(Google DeepMind,arXiv 2503.18813)Dual-LLM 工程化,AgentDojo 约 77% 任务可证安全 | sec-defense | 2026-07-09 | arXiv 2503.18813 |
| 架构级防注入六类模式(action-selector/plan-then-execute/dual LLM/code-then-execute/context-minimization/map-reduce) | sec-defense | 2026-07-09 | arXiv 2506.08837 |
| NIST AI 600-1(GenAI Profile)2024-07-26 发布,12 类风险 +200 行动项;RMF 下一大版本预计 2026–2027 | sec-governance | 2026-07-09 | nist.gov / nvlpubs |
| EU AI Act:GPAI 义务 2025-08-02 生效 / 2026-08-02 执法罚款(GPAI 最高 €15M 或营收 3%;广义最高 €35M 或 7%)/ 2027-08-02 存量截止 | sec-governance | 2026-07-09 | artificialintelligenceact.eu / EC |
| MITRE ATLAS v5.x(2025 末–2026):约 16 战术/84 技术,2025-11 v5.1.0 加 C2 战术,2025 起大量 GenAI/Agent 技术 | sec-landscape | 2026-07-09 | atlas.mitre.org |
| 上云 AI 安全服务名:AWS Bedrock Guardrails/Macie/GuardDuty+SecurityHub;Azure AI Content Safety/Purview/Defender for Cloud AI-SPM;GCP Model Armor/DLP/Security Command Center | sec-cheatsheet | 2026-07-09 | 三云 2025–2026 文档 |
| 备案现状:截至 2026-06-30 累计 988 款生成式 AI 服务备案、598 款应用/功能登记;双备案全流程 5–8 个月(北京 8–10),算法备案审核 30 个工作日、大模型备案 3–6 个月 | sec-china | 2026-07-17 | 网信办公告(cac.gov.cn)+备案实务多方一致口径 |
| 《AI 生成合成内容标识办法》2025-09-01 施行(四部门),显式+隐式双轨,配套强标 GB 45438-2025;已有 App 因标识违规被约谈/下架 | sec-china | 2026-07-17 | cac.gov.cn / 央视新闻 / samr openstd |
| GB/T 45654-2025《生成式 AI 服务安全基本要求》2025-11-01 实施(TC260 归口),训练数据/模型/安全措施三方面,五大类 31 小类风险;配套 GB/T 45674 数据标注安全 | sec-china | 2026-07-17 | tc260.org.cn / samr / 火山引擎备案实务 |
| 立法风向(易过期):网安法修订 2026-01-01 施行新增 AI 专条(第 20 条);国务院 2026 立法计划部署 AI 综合性立法;《拟人化互动服务办法》征求意见中 | sec-china | 2026-07-17 | cac.gov.cn 专家解读 / 国务院立法计划 |
| 数据出境:三通道(安全评估/标准合同/认证)+《促进和规范数据跨境流动规定》(2024-03)六类豁免+自贸区负面清单;官方口径《政策问答(2025-10)》 | sec-china | 2026-07-17 | cac.gov.cn |
| ISO/IEC 42001 为首个 AI 管理体系(AIMS)国际标准 | sec-governance | 2026-07-09 | ISO 官方 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| sec-defense | evaluation#eval-scenarios | 红队产出的攻破率/有害内容率/注入抵抗率汇入 Evaluation 安全维度验收,兑现其 `eval-scenarios → security(候选)` 边 |
| sec-agentic | agent#(护栏章) | Agent「评估与护栏」提出要防,本模块给系统性威胁与控权(最小权限/爆炸半径) |
| sec-agentic | mcp#(安全章) | MCP 工具描述投毒与供应链安全,本模块第 4/5 章深化 |
| sec-data-privacy | rag#(向量检索/数据) | 向量库投毒、跨租户泄露、带权限检索,对应 RAG 检索质量与数据面 |
| sec-supply-chain | fine-tuning# / llm-training# | 微调数据泄露、模型投毒与来源验证,是这两个模块的安全侧 |
