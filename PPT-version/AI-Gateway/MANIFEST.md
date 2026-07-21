# AI-Gateway · MANIFEST(模块清单)

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | ai-gateway |
| 所在层 | 工程保障层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-12（B 类：引用 _reference/Codex 对照库,补 Kong 授权层级、APISIX 版本、AWS Guidance 定位、Envoy QuotaPolicy 成熟度；同日字体白名单合规重制；07-13 两件套吸收：增十步请求链/五层策略栈两页深潜 + 生产验收清单，79→82 页，66 处页脚页码已重排）；2026-07-14 呈现回刷：封面眉题统一为「AI 知识库 · 讲义式 PPT」，无内容变更；2026-07-15（呈现修复：删配图替代型残留源文字页 3 页，配图后 88→85 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），85→86 页；2026-07-17 内容增补：速查章增「数字弹药」页 1 页（本册及跨模块已核实数字的集中速查，每条带用法与源指针），86→87 页；2026-07-17 呈现修复：删配图替代型残留源文字页 2 页（07-14 配图批次遗留，标点差异逃过 v3.8 排查），87→85 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 内容勘误：数字弹药页（放映序 p76）缓存折扣方向修正——"约 9 折"实为"约 1 折、省约 90%"（事实源在 Prompt-Engineering 事实表，同日已同步修正），页数不变，旧版存 history/2026-07-20；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 12 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 反 AI 腔（v3.15）文案打磨：讲义 1 处「抓手」改「入口」（放映序 p50）；MANIFEST 行文 1 处「台账」改「事实表」，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b（注：本次存留痕时误用 2026-07-20 同名覆盖了当日 v3.13 回刷前快照，已改用 b 后缀；原快照丢失，改动可依 raw-data/2026-07-20-术语全称回刷清单.md 重建）；2026-07-20c 呈现修复：v4.3 撤电子书馆藏后残留的馆藏指向改为指向书单条目，1 处（放映序 p28），讲义不再指向已不存在的 ebooks/ 目录，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20c；2026-07-21 网页版落地（第四批，与 Evaluation、RAG 同批）：`Web-version/ai-gateway/index.html`，覆盖与缺口矩阵存 raw-data/2026-07-21；网页版新增「路由省钱计算器」（交互件，RouteLLM/FrugalGPT 降本叙事的算术版，单价由使用者填入不携带会过期数字），未引入新事实——事实级 0、缺口级 0，无回流欠账；MCP 授权小节挂 2026-07-28 复核徽标（与账本建议复查日同源） |
| 产出 skill 版本 | v3.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| gw-what-why | 第 1 章 | 是什么·为什么(从 API 网关到 AI 网关) | ✅ | 2026-07-09 |
| gw-unify | 第 2 章 | 统一接入与协议转换 | ✅ | 2026-07-09 |
| gw-route | 第 3 章 | 路由·负载·容灾 | ✅ | 2026-07-09 |
| gw-cost | 第 4 章 | 流量与成本治理 | ✅ | 2026-07-09 |
| gw-guardrail | 第 5 章 | 安全·合规·护栏(挂载点) | ✅ | 2026-07-09 |
| gw-observe | 第 6 章 | 可观测 | ✅ | 2026-07-09 |
| gw-mcp | 第 7 章 | AI 网关 + MCP 网关(展开章,含授权时序深潜) | ✅ | 2026-07-10 |
| gw-cheatsheet | 第 8 章 | 选型与上云·售前速查 | ✅ | 2026-07-09 |

## 时效性事实(巡检盘查对象)
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| Envoy AI Gateway v1.0 于 2026-06-23 发布(Tetrate+Bloomberg,基于 CNCF Envoy Gateway);token 限流 + OpenInference/OTel GenAI 观测,语义缓存与按美元成本治理在路线图 | gw-cheatsheet | 2026-07-09 | PRNewswire / Tetrate v1.0 博客 / aigateway.envoyproxy.io |
| Portkey 完整开源发布于 2026-03,主打护栏 + 语义缓存 + 提示词管理 | gw-cheatsheet | 2026-07-09 | techsy / openziti 2026 横评 |
| LiteLLM 为最广泛采用的开源 LLM 网关(Python,100+ provider);虚拟密钥、按项目预算/花费追踪、复杂度自动路由(7 维打分)、实时护栏;版本迭代极快(v1.81.x, 2026) | gw-unify | 2026-07-09 | docs.litellm.ai / GitHub / release_notes |
| Azure API Management 是唯一原生内置"按 token 限流 + LLM 专属策略"的云厂商网关;Unified Model API(含 Bedrock 后端)、语义缓存(llm-semantic-cache + Managed Redis) | gw-cost | 2026-07-09 | learn.microsoft.com genai-gateway-capabilities |
| Azure APIM 于 Build 2026 起提供 MCP 内容安全,把 MCP 纳入统一治理 | gw-mcp | 2026-07-09 | InfoQ 2026-06 / sjwiggers |
| Higress(阿里,AI-Native,Istio+Envoy+Wasm):多模型统一路由 + 协议转换(100+ 模型)、语义缓存、token 限流、提示注入检测、模型级 Fallback;托管 MCP Server、openapi-to-mcp、自建 MCP Marketplace | gw-guardrail | 2026-07-09 | github.com/higress-group/higress / higress.ai |
| AI 网关正与 MCP 网关融合(统一代理 LLM API + MCP Server + Agent);Envoy 路线图含 MCP 授权、后端安全策略、OIDC token 交换 | gw-mcp | 2026-07-09 | Envoy release-notes / Apache APISIX |
| 可观测正收敛到 OpenTelemetry GenAI 语义约定 / OpenInference | gw-observe | 2026-07-09 | opentelemetry.io semconv/gen-ai / Envoy v1.0 |
| 云厂商格局:Cloudflare AI Gateway 主打花费上限与缓存;AWS 以 Bedrock 为主,无 APIM 式统一多模型 API;Google Apigee 有部分 AI 网关能力 | gw-cheatsheet | 2026-07-09 | zuplo / truefoundry 2026 横评 |
| MCP 授权现行规范修订版为 2025-11-25(授权模型自 2025-06-18 起以 OAuth 2.1 为底座):MCP Server=资源服务器,RFC 8707 audience 校验与 RFC 9728 资源元数据为 MUST,PKCE 强制,token 透传明令禁止;下一版规范预计 2026-07-28 发布 | gw-mcp | 2026-07-10 | modelcontextprotocol.io spec 2025-11-25 / solo.io / kane.mx |
| 网关身份传递主流做法:RFC 8693 Token 交换铸造 audience 限定窄凭证,act 委派链可验证"用户→Agent→本次调用";Azure APIM 策略同时支持 RFC 8693 与 Entra On-Behalf-Of,Red Hat/MuleSoft/Maverics 均已落地 | gw-mcp | 2026-07-10 | Red Hat Developer 2025-12 / Salesforce Architect / Uber Eng |
| Kong AI Gateway 高级插件（AI Proxy Advanced / Semantic Cache 等）标注 tier: ai_gateway_enterprise,需企业订阅;开源版仅基础 AI Proxy | gw-cheatsheet | 2026-07-12 | developer.konghq.com/plugins/ai-proxy-advanced/ |
| Apache APISIX 当前正式版 3.17.0(2026-06-15),支持 MCP 与 Agent 流量治理 | gw-cheatsheet | 2026-07-12 | apisix.apache.org/downloads/ |
| AWS Multi-Provider Generative AI Gateway 为官方 Guidance(LiteLLM+ECS/EKS 自部署方案),非托管网关产品——AWS 侧仍无 APIM 式托管统一多模型网关 | gw-cheatsheet | 2026-07-12 | docs.aws.amazon.com/solutions/multi-provider-generative-ai-gateway-on-aws/ |
| Envoy AI Gateway 核心 CRD 已 v1beta1,QuotaPolicy 仍 v1alpha1(不能与核心一并描述为稳定) | gw-cheatsheet | 2026-07-12 | aigateway.envoyproxy.io/docs/api/ |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| gw-guardrail | security#sec-defense | 网关是护栏/审计/内容安全的统一落地位;Security 出"要防什么",网关做"能集中执行的那部分" |
| gw-guardrail | security#sec-agentic | 虚拟密钥落地"最小权限/爆炸半径";数据驻留/脱敏在路由与护栏里强制 |
| gw-mcp | mcp#(全模块) | 把 MCP 流量统一代理、发现、鉴权、限流、审计的运营层(MCP 讲协议,网关讲治理) |
| gw-mcp | a2a#(全模块) | Agent↔Agent 流量经网关做统一身份传递与可观测 |
| gw-mcp | agent#(全模块) | 给 Agent 的多模型/多工具调用提供统一入口与护栏 |
| gw-route | evaluation#eval-scenarios | 路由降级后的质量靠 Evaluation 持续打分验收 |
| gw-observe | evaluation#(全模块) | 可观测的"质量维度"接 Evaluation(快不快贵不贵 vs 好不好) |
| gw-cost | llm-inference#(全模块) | 网关在推理服务之上:单模型加速(Inference) vs 多模型统一治理(网关),互补分工 |
| gw-route / gw-cost | model-landscape#ml-selection | "选哪些模型进路由池"的格局与方法在 Model-Landscape(三层路由/五约束决策树),网关是其工程落地件——双向互指(2026-07-10) |
| gw-observe | ai-ops#ops-tracing | 网关是数据源与统一采集层,AI-Ops 是消费与行动层(在线评估/漂移/告警);trace id 两层贯通——双向互指(2026-07-10) |
