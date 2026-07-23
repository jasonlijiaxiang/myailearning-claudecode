// 本文件由 Web-version/build.py 从各模块 MANIFEST.md 生成，请勿手工编辑。
// 改内容请改 MANIFEST，然后重跑 build.py。
window.KB = {
 "generated_from": "PPT-version/*/MANIFEST.md（结构）+ Web-version/*/index.html（问答）+ build.py CONCEPTS/CHKW（关键词落点与联想）",
 "layers": [
  "解决方案层",
  "应用模式层",
  "协议层",
  "工程保障层",
  "基础层",
  "算力底座层",
  "数据底座层"
 ],
 "modules": [
  {
   "id": "a2a",
   "dir": "A2A",
   "layer": "协议层",
   "created": "2026-07-09",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "a2a-what-why",
     "no": "第 1 章",
     "title": "是什么/为什么（与 MCP 分工）",
     "verified": "2026-07-09"
    },
    {
     "id": "a2a-protocol",
     "no": "第 2 章",
     "title": "协议解剖（五大对象与生命周期）",
     "verified": "2026-07-09"
    },
    {
     "id": "a2a-transport",
     "no": "第 3 章",
     "title": "发现与传输（Agent Card 发现·三绑定·流式）",
     "verified": "2026-07-09"
    },
    {
     "id": "a2a-handson",
     "no": "第 4 章",
     "title": "动手做：跑通一次 A2A 协作",
     "verified": "2026-07-09"
    },
    {
     "id": "a2a-orchestration",
     "no": "第 5 章",
     "title": "多智能体协作（opaque agents·任务委派）",
     "verified": "2026-07-09"
    },
    {
     "id": "a2a-production",
     "no": "第 6 章",
     "title": "生产落地·上云",
     "verified": "2026-07-09"
    },
    {
     "id": "a2a-security",
     "no": "第 7 章",
     "title": "安全 · 售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "规范稳定线 1.0（正文 Latest Released 1.0.0）；项目 release 当前 v1.0.1（2026-05-28 补丁；v1.0.0 于 2026-03-12 发布）；历史 0.1.0→0.2.6→0.3.0→1.0.0；以 Protocol Buffers 为唯一权威规范定义",
     "chapter": "a2a-protocol",
     "verified": "2026-07-12",
     "source": "a2a-protocol.org 规范页、github.com/a2aproject/A2A/releases",
     "recheck": "—"
    },
    {
     "text": "v1.0 头号新特性 Signed Agent Cards（签名版 Agent Card，密码学验证签发方）",
     "chapter": "a2a-security",
     "verified": "2026-07-09",
     "source": "LF 一周年 press",
     "recheck": "—"
    },
    {
     "text": "治理：Google 2025-04 发布并开源，2025-06 捐赠 Linux Foundation 成立中立的 A2A Project",
     "chapter": "a2a-what-why",
     "verified": "2026-07-09",
     "source": "LF 项目成立公告",
     "recheck": "—"
    },
    {
     "text": "采用度 150+ 组织、核心仓库 22,000+ stars；5 官方 SDK（Python/JS/Java/Go/.NET），Python SDK 实现 1.0 并提供 0.3 兼容模式、三种传输绑定 Client/Server 全覆盖",
     "chapter": "a2a-production",
     "verified": "2026-07-12",
     "source": "LF 一周年 press、github.com/a2aproject/a2a-python",
     "recheck": "—"
    },
    {
     "text": "官方配套工具：Inspector（联调）与 TCK（协议一致性测试）提供一致性证据，不替代安全与业务评测",
     "chapter": "a2a-handson",
     "verified": "2026-07-12",
     "source": "github.com/a2aproject/a2a-inspector、github.com/a2aproject/a2a-tck",
     "recheck": "—"
    },
    {
     "text": "云支持：Azure AI Foundry / Copilot Studio、AWS Bedrock AgentCore Runtime、Google Cloud（Vertex AI Agent Engine）",
     "chapter": "a2a-production",
     "verified": "2026-07-09",
     "source": "LF 一周年 press",
     "recheck": "—"
    },
    {
     "text": "三种传输绑定：JSON-RPC 2.0 / gRPC / HTTP+JSON-REST；流式走 SSE，长任务用推送通知回调",
     "chapter": "a2a-transport",
     "verified": "2026-07-09",
     "source": "a2a-protocol.org 规范页",
     "recheck": "—"
    },
    {
     "text": "AP2（Agent Payments Protocol）为 A2A 之上支付扩展，60+ 组织",
     "chapter": "a2a-production",
     "verified": "2026-07-09",
     "source": "LF 一周年 press",
     "recheck": "—"
    },
    {
     "text": "Task 状态机共九种状态（进行中 2 + 中断 2 + 终态 4 + 兜底 unspecified），终态不可回跳、重试建新 Task",
     "chapter": "a2a-protocol",
     "verified": "2026-07-12",
     "source": "a2a-protocol.org 规范 TaskState 枚举",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "a2a-what-why",
     "to": "mcp#mcp-what-why",
     "why": "协议层两兄弟：MCP 接工具（纵向）/ A2A 接 Agent（横向），双向互引分工",
     "resolved": true
    },
    {
     "from": "a2a-orchestration",
     "to": "agent#agent-orchestration",
     "why": "多 Agent 协作 ↔ Agent 编排模式；A2A 是跨 Agent 协作的标准化通道",
     "resolved": true
    },
    {
     "from": "a2a-orchestration",
     "to": "agent#agent-tools-mcp",
     "why": "Agent 第 4 章已登记 A2A fact，本模块为其深入入口（Agent 侧应回指本模块）",
     "resolved": true
    },
    {
     "from": "a2a-security",
     "to": "mcp#mcp-security",
     "why": "安全共识对照：签名/最小权限/鉴权/opaque 边界",
     "resolved": true
    },
    {
     "from": "a2a-production",
     "to": "（候选）evaluation",
     "why": "多 Agent 协作的评估验收，留待后续补",
     "resolved": false
    }
   ],
   "web": "./a2a/index.html",
   "questions": [
    {
     "id": "q-a2a-1",
     "q": "A2A 和 MCP 到底啥区别，是不是二选一？",
     "added": "2026-07-09",
     "chapters": [
      "a2a-what-why"
     ]
    },
    {
     "id": "q-a2a-2",
     "q": "能不能只用一个 Agent，别搞这么复杂？",
     "added": "2026-07-09",
     "chapters": [
      "picker",
      "a2a-what-why"
     ]
    },
    {
     "id": "q-a2a-3",
     "q": "这是不是 Google 的私有协议，用了会被锁定吗？",
     "added": "2026-07-09",
     "chapters": [
      "a2a-production"
     ]
    },
    {
     "id": "q-a2a-4",
     "q": "接 A2A 要不要换我现在的 Agent 框架？",
     "added": "2026-07-09",
     "chapters": [
      "a2a-handson"
     ]
    },
    {
     "id": "q-a2a-5",
     "q": "Task 有状态，服务端要一直存着？会不会很重？",
     "added": "2026-07-09",
     "chapters": [
      "a2a-protocol"
     ]
    },
    {
     "id": "q-a2a-6",
     "q": "长任务客户端断了怎么办？",
     "added": "2026-07-12",
     "chapters": [
      "a2a-transport"
     ]
    },
    {
     "id": "q-a2a-7",
     "q": "怎么防止别人伪造一个 Agent 冒充我们？",
     "added": "2026-07-09",
     "chapters": [
      "a2a-security"
     ]
    },
    {
     "id": "q-a2a-8",
     "q": "跨多个 Agent，出错了怎么定位？",
     "added": "2026-07-09",
     "chapters": [
      "a2a-production"
     ]
    }
   ]
  },
  {
   "id": "ai-gateway",
   "dir": "AI-Gateway",
   "layer": "工程保障层",
   "created": "2026-07-09",
   "updated": "2026-07-21",
   "chapters": [
    {
     "id": "gw-what-why",
     "no": "第 1 章",
     "title": "是什么·为什么(从 API 网关到 AI 网关)",
     "verified": "2026-07-09"
    },
    {
     "id": "gw-unify",
     "no": "第 2 章",
     "title": "统一接入与协议转换",
     "verified": "2026-07-09"
    },
    {
     "id": "gw-route",
     "no": "第 3 章",
     "title": "路由·负载·容灾",
     "verified": "2026-07-09"
    },
    {
     "id": "gw-cost",
     "no": "第 4 章",
     "title": "流量与成本治理",
     "verified": "2026-07-09"
    },
    {
     "id": "gw-guardrail",
     "no": "第 5 章",
     "title": "安全·合规·护栏(挂载点)",
     "verified": "2026-07-09"
    },
    {
     "id": "gw-observe",
     "no": "第 6 章",
     "title": "可观测",
     "verified": "2026-07-09"
    },
    {
     "id": "gw-mcp",
     "no": "第 7 章",
     "title": "AI 网关 + MCP 网关(展开章,含授权时序深潜)",
     "verified": "2026-07-10"
    },
    {
     "id": "gw-cheatsheet",
     "no": "第 8 章",
     "title": "选型与上云·售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "Envoy AI Gateway v1.0 于 2026-06-23 发布(Tetrate+Bloomberg,基于 CNCF Envoy Gateway);token 限流 + OpenInference/OTel GenAI 观测,语义缓存与按美元成本治理在路线图",
     "chapter": "gw-cheatsheet",
     "verified": "2026-07-09",
     "source": "PRNewswire / Tetrate v1.0 博客 / aigateway.envoyproxy.io",
     "recheck": "—"
    },
    {
     "text": "Portkey 完整开源发布于 2026-03,主打护栏 + 语义缓存 + 提示词管理",
     "chapter": "gw-cheatsheet",
     "verified": "2026-07-09",
     "source": "techsy / openziti 2026 横评",
     "recheck": "—"
    },
    {
     "text": "LiteLLM 为最广泛采用的开源 LLM 网关(Python,100+ provider);虚拟密钥、按项目预算/花费追踪、复杂度自动路由(7 维打分)、实时护栏;版本迭代极快(v1.81.x, 2026)",
     "chapter": "gw-unify",
     "verified": "2026-07-09",
     "source": "docs.litellm.ai / GitHub / release_notes",
     "recheck": "—"
    },
    {
     "text": "Azure API Management 是唯一原生内置\"按 token 限流 + LLM 专属策略\"的云厂商网关;Unified Model API(含 Bedrock 后端)、语义缓存(llm-semantic-cache + Managed Redis)",
     "chapter": "gw-cost",
     "verified": "2026-07-09",
     "source": "learn.microsoft.com genai-gateway-capabilities",
     "recheck": "—"
    },
    {
     "text": "Azure APIM 于 Build 2026 起提供 MCP 内容安全,把 MCP 纳入统一治理",
     "chapter": "gw-mcp",
     "verified": "2026-07-09",
     "source": "InfoQ 2026-06 / sjwiggers",
     "recheck": "—"
    },
    {
     "text": "Higress(阿里,AI-Native,Istio+Envoy+Wasm):多模型统一路由 + 协议转换(100+ 模型)、语义缓存、token 限流、提示注入检测、模型级 Fallback;托管 MCP Server、openapi-to-mcp、自建 MCP Marketplace",
     "chapter": "gw-guardrail",
     "verified": "2026-07-09",
     "source": "github.com/higress-group/higress / higress.ai",
     "recheck": "—"
    },
    {
     "text": "AI 网关正与 MCP 网关融合(统一代理 LLM API + MCP Server + Agent);Envoy 路线图含 MCP 授权、后端安全策略、OIDC token 交换",
     "chapter": "gw-mcp",
     "verified": "2026-07-09",
     "source": "Envoy release-notes / Apache APISIX",
     "recheck": "—"
    },
    {
     "text": "可观测正收敛到 OpenTelemetry GenAI 语义约定 / OpenInference",
     "chapter": "gw-observe",
     "verified": "2026-07-09",
     "source": "opentelemetry.io semconv/gen-ai / Envoy v1.0",
     "recheck": "—"
    },
    {
     "text": "云厂商格局:Cloudflare AI Gateway 主打花费上限与缓存;AWS 以 Bedrock 为主,无 APIM 式统一多模型 API;Google Apigee 有部分 AI 网关能力",
     "chapter": "gw-cheatsheet",
     "verified": "2026-07-09",
     "source": "zuplo / truefoundry 2026 横评",
     "recheck": "—"
    },
    {
     "text": "MCP 授权现行规范修订版为 2025-11-25(授权模型自 2025-06-18 起以 OAuth 2.1 为底座):MCP Server=资源服务器,RFC 8707 audience 校验与 RFC 9728 资源元数据为 MUST,PKCE 强制,token 透传明令禁止;下一版规范预计 2026-07-28 发布",
     "chapter": "gw-mcp",
     "verified": "2026-07-10",
     "source": "modelcontextprotocol.io spec 2025-11-25 / solo.io / kane.mx",
     "recheck": "—"
    },
    {
     "text": "网关身份传递主流做法:RFC 8693 Token 交换铸造 audience 限定窄凭证,act 委派链可验证\"用户→Agent→本次调用\";Azure APIM 策略同时支持 RFC 8693 与 Entra On-Behalf-Of,Red Hat/MuleSoft/Maverics 均已落地",
     "chapter": "gw-mcp",
     "verified": "2026-07-10",
     "source": "Red Hat Developer 2025-12 / Salesforce Architect / Uber Eng",
     "recheck": "—"
    },
    {
     "text": "Kong AI Gateway 高级插件（AI Proxy Advanced / Semantic Cache 等）标注 tier: ai_gateway_enterprise,需企业订阅;开源版仅基础 AI Proxy",
     "chapter": "gw-cheatsheet",
     "verified": "2026-07-12",
     "source": "developer.konghq.com/plugins/ai-proxy-advanced/",
     "recheck": "—"
    },
    {
     "text": "Apache APISIX 当前正式版 3.17.0(2026-06-15),支持 MCP 与 Agent 流量治理",
     "chapter": "gw-cheatsheet",
     "verified": "2026-07-12",
     "source": "apisix.apache.org/downloads/",
     "recheck": "—"
    },
    {
     "text": "AWS Multi-Provider Generative AI Gateway 为官方 Guidance(LiteLLM+ECS/EKS 自部署方案),非托管网关产品——AWS 侧仍无 APIM 式托管统一多模型网关",
     "chapter": "gw-cheatsheet",
     "verified": "2026-07-12",
     "source": "docs.aws.amazon.com/solutions/multi-provider-generative-ai-gateway-on-aws/",
     "recheck": "—"
    },
    {
     "text": "Envoy AI Gateway 核心 CRD 已 v1beta1,QuotaPolicy 仍 v1alpha1(不能与核心一并描述为稳定)",
     "chapter": "gw-cheatsheet",
     "verified": "2026-07-12",
     "source": "aigateway.envoyproxy.io/docs/api/",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "gw-guardrail",
     "to": "security#sec-defense",
     "why": "网关是护栏/审计/内容安全的统一落地位;Security 出\"要防什么\",网关做\"能集中执行的那部分\"",
     "resolved": true
    },
    {
     "from": "gw-guardrail",
     "to": "security#sec-agentic",
     "why": "虚拟密钥落地\"最小权限/爆炸半径\";数据驻留/脱敏在路由与护栏里强制",
     "resolved": true
    },
    {
     "from": "gw-mcp",
     "to": "mcp#(全模块)",
     "why": "把 MCP 流量统一代理、发现、鉴权、限流、审计的运营层(MCP 讲协议,网关讲治理)",
     "resolved": true
    },
    {
     "from": "gw-mcp",
     "to": "a2a#(全模块)",
     "why": "Agent↔Agent 流量经网关做统一身份传递与可观测",
     "resolved": true
    },
    {
     "from": "gw-mcp",
     "to": "agent#(全模块)",
     "why": "给 Agent 的多模型/多工具调用提供统一入口与护栏",
     "resolved": true
    },
    {
     "from": "gw-route",
     "to": "evaluation#eval-scenarios",
     "why": "路由降级后的质量靠 Evaluation 持续打分验收",
     "resolved": true
    },
    {
     "from": "gw-observe",
     "to": "evaluation#(全模块)",
     "why": "可观测的\"质量维度\"接 Evaluation(快不快贵不贵 vs 好不好)",
     "resolved": true
    },
    {
     "from": "gw-cost",
     "to": "llm-inference#(全模块)",
     "why": "网关在推理服务之上:单模型加速(Inference) vs 多模型统一治理(网关),互补分工",
     "resolved": true
    },
    {
     "from": "gw-route / gw-cost",
     "to": "model-landscape#ml-selection",
     "why": "\"选哪些模型进路由池\"的格局与方法在 Model-Landscape(三层路由/五约束决策树),网关是其工程落地件——双向互指(2026-07-10)",
     "resolved": true
    },
    {
     "from": "gw-observe",
     "to": "ai-ops#ops-tracing",
     "why": "网关是数据源与统一采集层,AI-Ops 是消费与行动层(在线评估/漂移/告警);trace id 两层贯通——双向互指(2026-07-10)",
     "resolved": true
    }
   ],
   "web": "./ai-gateway/index.html",
   "questions": [
    {
     "id": "q-ai-gateway-1",
     "q": "我已经有 API 网关了，为什么还要 AI 网关？",
     "added": "2026-07-09",
     "chapters": [
      "gw-what-why"
     ]
    },
    {
     "id": "q-ai-gateway-2",
     "q": "上网关到底能省多少钱？",
     "added": "2026-07-09",
     "chapters": [
      "saver",
      "gw-route",
      "gw-cost"
     ]
    },
    {
     "id": "q-ai-gateway-3",
     "q": "自动路由到便宜模型，质量掉了怎么办？",
     "added": "2026-07-09",
     "chapters": [
      "gw-route"
     ]
    },
    {
     "id": "q-ai-gateway-4",
     "q": "语义缓存会不会给不同用户串答、泄露数据？",
     "added": "2026-07-09",
     "chapters": [
      "gw-cost"
     ]
    },
    {
     "id": "q-ai-gateway-5",
     "q": "护栏能 100% 挡住提示注入吗？",
     "added": "2026-07-09",
     "chapters": [
      "gw-guardrail"
     ]
    },
    {
     "id": "q-ai-gateway-6",
     "q": "合规审计具体能提供什么证据？",
     "added": "2026-07-09",
     "chapters": [
      "gw-guardrail",
      "gw-observe"
     ]
    },
    {
     "id": "q-ai-gateway-7",
     "q": "我们有几百个内部 API，要让 Agent 用，是不是要一个个改造？",
     "added": "2026-07-10",
     "chapters": [
      "gw-mcp"
     ]
    },
    {
     "id": "q-ai-gateway-8",
     "q": "Agent 替用户调工具，权限会不会被放大、被滥用？",
     "added": "2026-07-10",
     "chapters": [
      "gw-mcp",
      "src-mcp-auth"
     ]
    },
    {
     "id": "q-ai-gateway-9",
     "q": "我们该自建还是买托管？",
     "added": "2026-07-12",
     "chapters": [
      "gw-cheatsheet"
     ]
    },
    {
     "id": "q-ai-gateway-10",
     "q": "一句话，AI 网关到底给我带来什么？",
     "added": "2026-07-09",
     "chapters": [
      "gw-what-why",
      "gw-mcp"
     ]
    }
   ]
  },
  {
   "id": "ai-infra-compute",
   "dir": "AI-Infra-Compute",
   "layer": "算力底座层",
   "created": "2026-07-09",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "aic-overview",
     "no": "第 1 章",
     "title": "全景总览：从一张卡到一座 AI 工厂",
     "verified": "2026-07-09"
    },
    {
     "id": "aic-gpu",
     "no": "第 2 章",
     "title": "GPU 解剖：为什么 AI 计算长在 GPU 上",
     "verified": "2026-07-09"
    },
    {
     "id": "aic-hbm",
     "no": "第 3 章",
     "title": "显存与 HBM：AI 时代最贵的房地产",
     "verified": "2026-07-09"
    },
    {
     "id": "aic-chips",
     "no": "第 4 章",
     "title": "芯片格局与选型：NVIDIA 之内与之外",
     "verified": "2026-07-09"
    },
    {
     "id": "aic-scaleup",
     "no": "第 5 章",
     "title": "Scale-up 互联：把 72 张卡焊成一张大卡",
     "verified": "2026-07-09"
    },
    {
     "id": "aic-scaleout",
     "no": "第 6 章",
     "title": "Scale-out 网络：把一万张卡连成集群",
     "verified": "2026-07-09"
    },
    {
     "id": "aic-storage",
     "no": "第 7 章",
     "title": "存储与数据管线：别让 GPU 等数据",
     "verified": "2026-07-09"
    },
    {
     "id": "aic-econ",
     "no": "第 8 章",
     "title": "算力经济学与售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "NVIDIA 年更：Blackwell/GB200 在役、GB300 2026 放量（出货约翻倍）、Rubin H2 2026（HBM4+NVLink 6）、Rubin Ultra 2027（GTC 2026 展示 Kyber）、Feynman 2028",
     "chapter": "aic-chips",
     "verified": "2026-07-09",
     "source": "CNBC、wccftech、vrlatech、tech-insider（GTC 2026）",
     "recheck": "—"
    },
    {
     "text": "VR200 NVL72 官方口径推理性能约为 GB300 NVL72 的 3.3 倍",
     "chapter": "aic-chips",
     "verified": "2026-07-09",
     "source": "NVIDIA GTC 2026",
     "recheck": "—"
    },
    {
     "text": "AMD MI350X/MI355X 已量产（288GB HBM3e）；MI400+Helios（72×MI455X、31TB HBM4、TSMC 2nm）官方口径 2H 2026，初代用 UALink over Ethernet",
     "chapter": "aic-chips",
     "verified": "2026-07-09",
     "source": "AMD 官方、Tom's Hardware、DCD",
     "recheck": "—"
    },
    {
     "text": "Google TPU v7 Ironwood 2025-11 GA（192GB HBM3e、7.37TB/s、4614 FP8 TFLOPS、9216 芯 42.5EFLOPS）；AWS Trainium3 已出货（3nm、2.52PF FP8、144GB HBM3e）；两家下一代排 2027",
     "chapter": "aic-chips",
     "verified": "2026-07-09",
     "source": "Google Cloud 官方、SemiAnalysis、Spheron 2026 盘点",
     "recheck": "—"
    },
    {
     "text": "昇腾 910C 2025 量产、2026 计划约 60 万颗、算力约 H100 的 60-80%、国产化率 90%+；910D 支持 FP8 预计 2026 Q2-Q3 量产；SMIC N+2 良率约 40-50%",
     "chapter": "aic-chips",
     "verified": "2026-07-09",
     "source": "新浪科技/36氪/EDN China 2025-12 综述、ESM China",
     "recheck": "—"
    },
    {
     "text": "NVLink 5 单卡 1.8TB/s（18 端口）、NVL72 域内 NVLink Switch 总带宽 130TB/s",
     "chapter": "aic-scaleup",
     "verified": "2026-07-09",
     "source": "NVIDIA 官方 GB200 NVL72 页",
     "recheck": "—"
    },
    {
     "text": "UALink 1.0（2025-04 定稿，单层交换/至多 1024 端点）与 Broadcom SUE 竞争；原生硬件平台看 2027",
     "chapter": "aic-scaleup",
     "verified": "2026-07-09",
     "source": "SemiAnalysis \"The New AI Networks\"",
     "recheck": "—"
    },
    {
     "text": "InfiniBand Quantum-X800 XDR 800Gb/s；2025 年中起新机柜配 ConnectX-8 支持 XDR（此前 NDR 400Gb/s）；Spectrum-X800 多租户以太",
     "chapter": "aic-scaleout",
     "verified": "2026-07-09",
     "source": "NVIDIA、NADDOD 架构分析",
     "recheck": "—"
    },
    {
     "text": "Ultra Ethernet UEC 1.0 规范 2025-06 发布（现 1.0.2，官网免费 PDF），100+ 成员；2026 年中全栈 UET 硬件刚出货、多数设备仅\"兼容\"、采纳早期",
     "chapter": "aic-scaleout",
     "verified": "2026-07-09",
     "source": "UEC 官网、Arista/WWT/SemiAnalysis",
     "recheck": "—"
    },
    {
     "text": "HBM4 时代开启：Samsung 2026-02-12 全球首家量产（1c DRAM+4nm、11.7Gbps）、4 个月营收破 $10 亿；SK hynix 2026 商用、有意放缓爬坡、预计供 NVIDIA HBM4 约 2/3；在役主流 HBM3e（192-288GB/卡）",
     "chapter": "aic-hbm",
     "verified": "2026-07-09",
     "source": "TrendForce、DigiTimes、TechTimes、DCD",
     "recheck": "—"
    },
    {
     "text": "DeepSeek 3FS（Fire-Flyer File System）开源：随机读优先、放弃读缓存，自报集群聚合读 6.6-7.3TB/s，支持训练加载/checkpoint/KVCache 查询",
     "chapter": "aic-storage",
     "verified": "2026-07-09",
     "source": "Tom's Hardware、GitHub deepseek-ai/3FS",
     "recheck": "—"
    },
    {
     "text": "FP8 为生产推理默认精度、训练主流实践；NVFP4 面向 Blackwell、工具链成熟中",
     "chapter": "aic-gpu",
     "verified": "2026-07-09",
     "source": "沿用 llm-inference#llminf-quant 同源口径",
     "recheck": "—"
    },
    {
     "text": "成本量级：H100 级时租 $2-3/卡·时、自建盈亏线利用率约 40-50%、托管 API $2-5/百万输出 token",
     "chapter": "aic-econ",
     "verified": "2026-07-09",
     "source": "沿用 llm-inference#llminf-production 同源口径",
     "recheck": "—"
    },
    {
     "text": "行业预测 2030 推理算力占 AI 总算力约 75%",
     "chapter": "aic-overview",
     "verified": "2026-07-09",
     "source": "沿用 llm-training/llm-inference 同源口径",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "aic-overview / 全书",
     "to": "ai-infra-platform",
     "why": "姊妹模块：本模块讲硬件（卡/网/存储/电），对方讲平台（调度/切分/容错/观测/云形态）；两模块封面/总览页互指",
     "resolved": true
    },
    {
     "from": "aic-hbm",
     "to": "llm-inference#llminf-kv-budget",
     "why": "显存账的推理下半本：机制账（KV Cache）在对方第 2 章，硬件地基（HBM 贵）在本章，互为前后篇",
     "resolved": true
    },
    {
     "from": "aic-gpu",
     "to": "llm-inference#llminf-quant",
     "why": "精度阶梯 FP8/FP4 是量化落地的硬件前提",
     "resolved": true
    },
    {
     "from": "aic-hbm",
     "to": "llm-training#llmtrain-infra",
     "why": "训练显存账（×16 字节）↔ ZeRO/FSDP 切分方案：本章讲账、对方讲怎么把账切开分摊",
     "resolved": true
    },
    {
     "from": "aic-scaleup / aic-scaleout",
     "to": "llm-training#llmtrain-infra",
     "why": "并行策略（TP/PP/EP）产生的通信量决定网络怎么建；本模块讲网络、对方讲并行",
     "resolved": true
    },
    {
     "from": "aic-storage",
     "to": "llm-inference#llminf-disagg",
     "why": "KV Cache 外置 ↔ P/D 分离/Mooncake/Dynamo KV 路由：存储升级为推理性能部件",
     "resolved": true
    },
    {
     "from": "aic-econ",
     "to": "llm-inference#llminf-production",
     "why": "建 vs 租 vs API 盈亏线口径同源引用",
     "resolved": true
    },
    {
     "from": "aic-overview",
     "to": "llm-training#llmtrain-overview",
     "why": "训练一次性重投入 vs 推理持续账单、2030 推理 75% 预测同源",
     "resolved": true
    }
   ],
   "web": "./ai-infra-compute/index.html",
   "questions": [
    {
     "id": "q-ai-infra-compute-1",
     "q": "我们已经有机房，直接买卡装进去行不行？",
     "added": "2026-07-09",
     "chapters": [
      "aic-overview"
     ]
    },
    {
     "id": "q-ai-infra-compute-2",
     "q": "标称几千 TFLOPS，为什么我们实测差那么远？",
     "added": "2026-07-09",
     "chapters": [
      "aic-gpu"
     ]
    },
    {
     "id": "q-ai-infra-compute-3",
     "q": "70B 模型到底要几张卡？",
     "added": "2026-07-09",
     "chapters": [
      "aic-hbm"
     ]
    },
    {
     "id": "q-ai-infra-compute-4",
     "q": "不用 NVIDIA 到底行不行？",
     "added": "2026-07-09",
     "chapters": [
      "aic-chips"
     ]
    },
    {
     "id": "q-ai-infra-compute-5",
     "q": "NVLink 和 InfiniBand 到底什么关系？",
     "added": "2026-07-09",
     "chapters": [
      "aic-scaleup"
     ]
    },
    {
     "id": "q-ai-infra-compute-6",
     "q": "存储要配多少才够？直接用对象存储训练行不行？",
     "added": "2026-07-09",
     "chapters": [
      "aic-storage"
     ]
    },
    {
     "id": "q-ai-infra-compute-7",
     "q": "自建和上云到底哪个便宜？",
     "added": "2026-07-09",
     "chapters": [
      "tco",
      "aic-econ"
     ]
    },
    {
     "id": "q-ai-infra-compute-8",
     "q": "现在下单还是等下一代卡？",
     "added": "2026-07-09",
     "chapters": [
      "aic-chips"
     ]
    }
   ]
  },
  {
   "id": "ai-infra-platform",
   "dir": "AI-Infra-Platform",
   "layer": "算力底座层",
   "created": "2026-07-09",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "aip-overview",
     "no": "第 1 章",
     "title": "平台全景：从「一堆卡」到「一个平台」",
     "verified": "2026-07-09"
    },
    {
     "id": "aip-k8s-gpu",
     "no": "第 2 章",
     "title": "K8s + GPU 基础：从数卡到懂卡",
     "verified": "2026-07-09"
    },
    {
     "id": "aip-scheduling",
     "no": "第 3 章",
     "title": "作业调度：让最贵的卡不空转",
     "verified": "2026-07-09"
    },
    {
     "id": "aip-sharing",
     "no": "第 4 章",
     "title": "GPU 切分与多租户",
     "verified": "2026-07-09"
    },
    {
     "id": "aip-faulttol",
     "no": "第 5 章",
     "title": "训练容错工程：万卡集群故障是常态",
     "verified": "2026-07-09"
    },
    {
     "id": "aip-observability",
     "no": "第 6 章",
     "title": "可观测性与利用率运营",
     "verified": "2026-07-09"
    },
    {
     "id": "aip-serving",
     "no": "第 7 章",
     "title": "推理服务平台化",
     "verified": "2026-07-09"
    },
    {
     "id": "aip-cloud",
     "no": "第 8 章",
     "title": "云上算力形态与售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "DRA（Dynamic Resource Allocation）K8s v1.34（2025-08）GA 并默认启用，取代 device plugin 的\"只数卡\"模式；GKE/AKS/OpenShift 4.21 等托管发行版已跟进",
     "chapter": "aip-k8s-gpu",
     "verified": "2026-07-09",
     "source": "kubernetes.io 官方博客、Red Hat、Google Cloud、AKS 工程博客",
     "recheck": "—"
    },
    {
     "text": "KubeCon EU 2026 上 NVIDIA 把 NVIDIA DRA Driver for GPUs 捐给 CNCF；DRA 成 GPU 调度社区主线",
     "chapter": "aip-k8s-gpu",
     "verified": "2026-07-09",
     "source": "KubeCon EU 2026 报道、AKS 博客 2026-03",
     "recheck": "—"
    },
    {
     "text": "KAI Scheduler：NVIDIA 2025-04 开源（Apache 2.0），与商业版 Run:ai 同一调度核（gang/拓扑感知/bin-packing/DRA 集成）；Run:ai 差异=UI/多集群/SLA/fractional GPU",
     "chapter": "aip-scheduling",
     "verified": "2026-07-09",
     "source": "zenml/cloudoptimo/rack2cloud 2026 对比综述",
     "recheck": "—"
    },
    {
     "text": "调度分层共识：Kueue 管准入配额、Volcano/KAI 管 gang 与放置，生产常两层叠用；小集群（<16 卡）单用 Kueue 或 KAI 够用；Slurm 在 HPC 与托管服务中仍主力",
     "chapter": "aip-scheduling",
     "verified": "2026-07-09",
     "source": "cloudoptimo/zenml 2026 综述",
     "recheck": "—"
    },
    {
     "text": "GPU 切分三板斧口径：MIG（硬件隔离、最多 7 实例）、时间片（高密度无隔离、不宜生产多租户）、MPS；HAMi（CNCF）任意 NVIDIA 卡细粒度配额；MIG 正与 DRA 打通",
     "chapter": "aip-sharing",
     "verified": "2026-07-09",
     "source": "NVIDIA GPU Operator 文档、scaleops/collabnix/rafay 2026 教程",
     "recheck": "—"
    },
    {
     "text": "SageMaker HyperPod：EKS/Slurm 双编排 + 弹性容错（自动检测-替换-续训）；2026 上新一键建集群、Slurm continuous provisioning（2026-03）、G7e 实例（2026-04）",
     "chapter": "aip-faulttol",
     "verified": "2026-07-09",
     "source": "AWS 官方文档/What's New",
     "recheck": "—"
    },
    {
     "text": "llm-d（K8s 系 P/D 分离）、NVIDIA Dynamo 1.0（2026-03 GTC GA，P/D 编排+KV 感知路由+NIXL）为推理平台化承载",
     "chapter": "aip-serving",
     "verified": "2026-07-09",
     "source": "沿用 llm-inference#llminf-disagg 同源口径",
     "recheck": "—"
    },
    {
     "text": "自建盈亏线利用率约 40-50%、托管 API $2-5/百万输出 token",
     "chapter": "aip-cloud",
     "verified": "2026-07-09",
     "source": "沿用 llm-inference#llminf-production 同源口径",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "aip-overview / 全书",
     "to": "ai-infra-compute",
     "why": "姊妹模块：本模块讲平台（调度/切分/容错/观测/云形态），对方讲硬件（卡/网/存储/电）；两模块封面/总览页互指",
     "resolved": true
    },
    {
     "from": "aip-scheduling / aip-faulttol",
     "to": "llm-training#llmtrain-infra",
     "why": "训练作业是集群调度与容错的头号负载；那边讲并行怎么切模型，本模块讲作业怎么被调度、崩了怎么续",
     "resolved": true
    },
    {
     "from": "aip-serving",
     "to": "llm-inference#llminf-disagg",
     "why": "推理引擎（vLLM/SGLang）与 P/D 分离（Dynamo/llm-d）机制在对方讲，本章讲平台承载：怎么被编排、部署、扩缩、路由",
     "resolved": true
    },
    {
     "from": "aip-observability",
     "to": "llm-inference#llminf-production",
     "why": "利用率/MFU/goodput/SLO 运营两侧互指；推理压测那条线待未来 Evaluation 收编",
     "resolved": true
    },
    {
     "from": "aip-cloud",
     "to": "fine-tuning#ft-cloud",
     "why": "云上托管训练形态（HyperPod/Vertex/PAI 类）两边互指",
     "resolved": true
    },
    {
     "from": "aip-sharing",
     "to": "ai-infra-compute#aic-gpu",
     "why": "切分建立在 GPU 内部组织（SM/Tensor Core）之上，硬件概念见姊妹模块第 2 章",
     "resolved": true
    }
   ],
   "web": "./ai-infra-platform/index.html",
   "questions": [
    {
     "id": "q-ai-infra-platform-1",
     "q": "我们卡不多，直接 SSH 上去跑不行吗？",
     "added": "2026-07-09",
     "chapters": [
      "aip-overview"
     ]
    },
    {
     "id": "q-ai-infra-platform-2",
     "q": "K8s 自带调度器不能跑训练吗？",
     "added": "2026-07-09",
     "chapters": [
      "aip-scheduling"
     ]
    },
    {
     "id": "q-ai-infra-platform-3",
     "q": "一张卡到底能给几个团队用？",
     "added": "2026-07-09",
     "chapters": [
      "aip-sharing"
     ]
    },
    {
     "id": "q-ai-infra-platform-4",
     "q": "故障真有那么频繁吗？感觉有点夸张。",
     "added": "2026-07-09",
     "chapters": [
      "aip-faulttol"
     ]
    },
    {
     "id": "q-ai-infra-platform-5",
     "q": "nvidia-smi 利用率一直 90%+，还有优化空间吗？",
     "added": "2026-07-09",
     "chapters": [
      "aip-observability"
     ]
    },
    {
     "id": "q-ai-infra-platform-6",
     "q": "有了 vLLM 这些引擎，为什么还要推理平台？",
     "added": "2026-07-09",
     "chapters": [
      "aip-serving"
     ]
    },
    {
     "id": "q-ai-infra-platform-7",
     "q": "我们到底该自建平台还是用托管？",
     "added": "2026-07-09",
     "chapters": [
      "tierpicker",
      "aip-cloud"
     ]
    }
   ]
  },
  {
   "id": "ai-ops",
   "dir": "AI-Ops",
   "layer": "工程保障层",
   "created": "2026-07-10",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "ops-what-why",
     "no": "第 1 章",
     "title": "为什么 LLM 应用的 Ops 是新学科（两根新轴 / 静默退化 / 边界地图 / 观测成本）",
     "verified": "2026-07-10"
    },
    {
     "id": "ops-tracing",
     "no": "第 2 章",
     "title": "Tracing 与 OTel GenAI 深潜（span 四类 / trace 旅程 / PII 三开关）",
     "verified": "2026-07-10"
    },
    {
     "id": "ops-online-eval",
     "no": "第 3 章",
     "title": "在线评估与反馈回流（采样异步打分 / 评估漏斗 / 闭环三件套）",
     "verified": "2026-07-10"
    },
    {
     "id": "ops-drift",
     "no": "第 4 章",
     "title": "漂移与静默退化监测（三类漂移 / 检测组合拳 / 巡检节奏）",
     "verified": "2026-07-10"
    },
    {
     "id": "ops-release",
     "no": "第 5 章",
     "title": "发布管理（版本注册表 / 评估门禁 / 金丝雀 / 回滚 / 环境与 A/B）",
     "verified": "2026-07-10"
    },
    {
     "id": "ops-incident",
     "no": "第 6 章",
     "title": "事故响应（AI runbook 四问 / 急停 / HITL 分级 / 事故分级 SLA）",
     "verified": "2026-07-10"
    },
    {
     "id": "ops-tooling",
     "no": "第 7 章",
     "title": "工具格局与选型（六平台 / Braintrust · AgentOps / APM vs 专用 / 上云）",
     "verified": "2026-07-10"
    },
    {
     "id": "ops-cheatsheet",
     "no": "第 8 章",
     "title": "售前速查（运营包五件套 / 指标速查 / 选型卡 / 串联地图）",
     "verified": "2026-07-10"
    }
   ],
   "facts": [
    {
     "text": "OTel GenAI 语义约定总体仍 Development；gen_ai.client span 2026 年初出实验期转稳定；agent/workflow/tool span 实验态但实践稳；v1.41 定义四类 span + token/延迟指标；多数 gen_ai.* 属性仍带 Development 标签",
     "chapter": "ops-tracing",
     "verified": "2026-07-10",
     "source": "opentelemetry.io semconv / OTel 官方博客 2026",
     "recheck": "—"
    },
    {
     "text": "OTLP 规范 1.10.0：Trace/Metric/Log 三信号 Stable（profiles 仍开发中）——与 GenAI 语义约定的 Development 状态是两条轨，售前别混谈",
     "chapter": "ops-tracing",
     "verified": "2026-07-12",
     "source": "opentelemetry.io/docs/specs/otlp/",
     "recheck": "—"
    },
    {
     "text": "平台许可证与版本锚点：Phoenix 主仓 ELv2（限托管转售）；Langfuse core MIT、ee/ 目录除外（v3.212.0，2026-07-10）；MLflow v3.14.0（2026-06-17，Apache-2.0）",
     "chapter": "ops-tooling",
     "verified": "2026-07-12",
     "source": "GitHub（Arize-ai/phoenix、langfuse/langfuse、mlflow/mlflow）",
     "recheck": "—"
    },
    {
     "text": "六平台锚定：LangSmith（LangChain 原生）/ Langfuse（开源领袖，2026-01 被 ClickHouse 收购、开源线维护不变）/ Arize Phoenix（漂移与嵌入分析）/ Helicone（drop-in 代理）/ Datadog LLM Obs / Honeycomb",
     "chapter": "ops-tooling",
     "verified": "2026-07-10",
     "source": "digitalapplied / latitude / laminar 2026 横评",
     "recheck": "—"
    },
    {
     "text": "Braintrust（观测评估一体，免费档 1M span/月 + 10K eval）；AgentOps（会话回放 time-travel debugging、无限循环检测）",
     "chapter": "ops-tooling",
     "verified": "2026-07-10",
     "source": "braintrust.dev / github.com/agentops-ai",
     "recheck": "—"
    },
    {
     "text": "APM 系 vs 专用系分工共识：Datadog 类管 token 成本与延迟够用；输出质量评估/漂移/评审队列需专用工具",
     "chapter": "ops-tooling",
     "verified": "2026-07-10",
     "source": "confident-ai / techsy 2026 对比",
     "recheck": "—"
    },
    {
     "text": "观测成本：RAG 管线遥测量为等价传统 API 的 10–50 倍；接入 AI 负载后 APM 账单普遍 +40–200%",
     "chapter": "ops-what-why",
     "verified": "2026-07-10",
     "source": "oneuptime 2026-04",
     "recheck": "—"
    },
    {
     "text": "在线评估实践口径：采样 5–10% 真实流量、异步打分零应用时延；低分 trace 标注失败模式→晋升进回归集（dataset promotion）；闭环三件套 = 告警/评审队列/数据集晋升",
     "chapter": "ops-online-eval",
     "verified": "2026-07-10",
     "source": "braintrust.dev / towardsai 2026-04",
     "recheck": "—"
    },
    {
     "text": "漂移三类：供应商静默换 checkpoint（上月测的≠这月答的）/ 输出漂移 / 性能漂移；检测靠嵌入距离 + judge 持续打分 + 回归集重跑",
     "chapter": "ops-drift",
     "verified": "2026-07-10",
     "source": "stackpulsar / galileo 2026",
     "recheck": "—"
    },
    {
     "text": "发布管理成熟形态：版本注册表 + 评估门禁 + 金丝雀 5–10% 流量；LLM 金丝雀与传统的关键差异 = 必须在金丝雀流量上跑自动评估；回滚 = 改配置指针非重部署",
     "chapter": "ops-release",
     "verified": "2026-07-10",
     "source": "tianpan.co 2026-03 / arthur.ai / calmops",
     "recheck": "—"
    },
    {
     "text": "事故响应：成本尖峰常是第一信号（死循环/注入先表现为 token 暴涨）；急停开关（停任务不砸状态）；HITL 三分级（in/on/out-of-the-loop）",
     "chapter": "ops-incident",
     "verified": "2026-07-10",
     "source": "zylos 2026-03 SRE-AI / deepinspect",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "ops-online-eval",
     "to": "evaluation#eval-build / evaluation#eval-judge",
     "why": "全库最强新搭档：离线建集与判官方法在那边，在线采样运营在本模块——共享判分器定义（双向）",
     "resolved": true
    },
    {
     "from": "ops-what-why / ops-tracing",
     "to": "ai-gateway#gw-observe",
     "why": "网关是数据源与统一采集层，本模块是消费与行动层；trace id 两层贯通（双向）",
     "resolved": true
    },
    {
     "from": "ops-incident",
     "to": "security#sec-defense / security#sec-agentic",
     "why": "「被攻破了怎么办」的防护弹药在 Security；注入检测与工具权限急冻同源",
     "resolved": true
    },
    {
     "from": "ops-release",
     "to": "pe#pe-engineering",
     "why": "提示词版本化在 PE 第 5 章点过，本模块升级为发布工程（注册表/门禁/金丝雀）",
     "resolved": true
    },
    {
     "from": "ops-cheatsheet",
     "to": "solution-patterns#sp-method",
     "why": "运营包五件套 = SP「人力账」的展开：那边说要卖，这边说卖什么、怎么定 SLA（双向）",
     "resolved": true
    },
    {
     "from": "ops-drift",
     "to": "model-landscape#ml-selection",
     "why": "换模型/供应商静默更新的回归验证是「保持可换」的运维面",
     "resolved": true
    },
    {
     "from": "ops-what-why",
     "to": "ai-infra-platform#aip-observability",
     "why": "边界声明：GPU/集群层可观测归 Infra-Platform，应用与质量层归本模块",
     "resolved": true
    }
   ],
   "web": "./ai-ops/index.html",
   "questions": [
    {
     "id": "q-ai-ops-1",
     "q": "我们已经有 Datadog 了，为什么还要一套 AI 观测？",
     "added": "2026-07-10",
     "chapters": [
      "ops-tooling"
     ]
    },
    {
     "id": "q-ai-ops-2",
     "q": "系统没报错，但用户说 AI 变笨了，怎么排查？",
     "added": "2026-07-10",
     "chapters": [
      "ops-drift"
     ]
    },
    {
     "id": "q-ai-ops-3",
     "q": "大厂的模型还能悄悄变吗？",
     "added": "2026-07-10",
     "chapters": [
      "ops-drift"
     ]
    },
    {
     "id": "q-ai-ops-4",
     "q": "线上打分会不会拖慢用户请求？LLM 判官可信吗？",
     "added": "2026-07-10",
     "chapters": [
      "ops-online-eval"
     ]
    },
    {
     "id": "q-ai-ops-5",
     "q": "改个提示词而已，为什么要走发布流程？",
     "added": "2026-07-10",
     "chapters": [
      "ops-release"
     ]
    },
    {
     "id": "q-ai-ops-6",
     "q": "你们的 AI 有没有「刹车」？",
     "added": "2026-07-10",
     "chapters": [
      "ops-incident"
     ]
    },
    {
     "id": "q-ai-ops-7",
     "q": "trace 里有客户的对话内容，安全吗？",
     "added": "2026-07-10",
     "chapters": [
      "ops-tracing"
     ]
    },
    {
     "id": "q-ai-ops-8",
     "q": "上线之后你们还管吗？管什么、怎么收费？",
     "added": "2026-07-12",
     "chapters": [
      "ops-cheatsheet"
     ]
    }
   ]
  },
  {
   "id": "agent",
   "dir": "Agent",
   "layer": "应用模式层",
   "created": "2026-07-07",
   "updated": "2026-07-21",
   "chapters": [
    {
     "id": "agent-what-why",
     "no": "第 1 章",
     "title": "是什么/为什么",
     "verified": "2026-07-07"
    },
    {
     "id": "agent-components",
     "no": "第 2 章",
     "title": "核心组件",
     "verified": "2026-07-07"
    },
    {
     "id": "agent-orchestration",
     "no": "第 3 章",
     "title": "编排模式",
     "verified": "2026-07-07"
    },
    {
     "id": "agent-tools-mcp",
     "no": "第 4 章",
     "title": "工具接入与 MCP",
     "verified": "2026-07-07"
    },
    {
     "id": "agent-context",
     "no": "第 5 章",
     "title": "上下文工程",
     "verified": "2026-07-07"
    },
    {
     "id": "agent-eval-guardrails",
     "no": "第 6 章",
     "title": "评估与护栏",
     "verified": "2026-07-07"
    },
    {
     "id": "agent-lowcode",
     "no": "第 7 章",
     "title": "低代码 Agent 平台（Coze/Dify/n8n/HiAgent 与 code-first 边界）",
     "verified": "2026-07-10"
    },
    {
     "id": "agent-memory",
     "no": "第 8 章",
     "title": "记忆系统（四种记忆分层 / 框架四强 / 记忆投毒 ASI06）",
     "verified": "2026-07-11"
    },
    {
     "id": "agent-computer-use",
     "no": "第 9 章",
     "title": "Computer Use 与 GUI Agent（三路线 / 基准两口径 / RPA 混合 / 安全四件）",
     "verified": "2026-07-11"
    },
    {
     "id": "agent-subagent",
     "no": "第 10 章",
     "title": "多智能体 / Sub-agent 编排（三层框架 / 三性质 / CC·Codex 实操 / 四层触发 / 决策账）",
     "verified": "2026-07-17"
    },
    {
     "id": "agent-cheatsheet",
     "no": "第 11 章",
     "title": "售前速查（高频问题 / 启用条件决策树 / 串联地图；替代原全书串联页）",
     "verified": "2026-07-11"
    }
   ],
   "facts": [
    {
     "text": "MCP 当前稳定版规范 2025-11-25；2026-07-28 新版 RC 已发布",
     "chapter": "agent-tools-mcp",
     "verified": "2026-07-07",
     "source": "modelcontextprotocol.io 官方博客",
     "recheck": "2026-07-28"
    },
    {
     "text": "A2A v1.0 于 2026-03-12 发布（当前补丁 v1.0.1，2026-05-28），150+ 组织采用",
     "chapter": "agent-tools-mcp",
     "verified": "2026-07-12",
     "source": "github.com/a2aproject/A2A/releases、Linux Foundation 公告",
     "recheck": "—"
    },
    {
     "text": "Microsoft Agent Framework 1.0 GA（2026-04-03，.NET/Python 生产可用；Go 版仍 public preview），合并 AutoGen 与 Semantic Kernel",
     "chapter": "agent-orchestration",
     "verified": "2026-07-12",
     "source": "微软官方公告、learn.microsoft.com/agent-framework",
     "recheck": "—"
    },
    {
     "text": "生产可用框架短名单：LangGraph、Claude Agent SDK、OpenAI Agents SDK、Google ADK、MS Agent Framework",
     "chapter": "agent-orchestration",
     "verified": "2026-07-07",
     "source": "2026 多方对比评测",
     "recheck": "—"
    },
    {
     "text": "框架成熟度锚点：OpenAI Agents SDK 仍 0.x（Python v0.18.2，2026-07-11）；LangGraph 已过 1.0（v1.2.9，2026-07-10）——「短名单都能用，但 API 稳定性承诺不同」",
     "chapter": "agent-orchestration",
     "verified": "2026-07-12",
     "source": "GitHub releases（openai-agents-python、langgraph）",
     "recheck": "—"
    },
    {
     "text": "OWASP Top 10 for Agentic Applications 2026 为 agent 安全行业标准清单",
     "chapter": "agent-eval-guardrails",
     "verified": "2026-07-07",
     "source": "genai.owasp.org",
     "recheck": "—"
    },
    {
     "text": "评估/可观测平台格局：LangSmith、Langfuse、Arize Phoenix、W&B Weave；τ-bench 用 pass^k",
     "chapter": "agent-eval-guardrails",
     "verified": "2026-07-07",
     "source": "各官方文档",
     "recheck": "—"
    },
    {
     "text": "Coze Studio 开源（2025-07，Apache 2.0）：21.1k stars、V0.5.1（2026-02）；SaaS 扣子 3.0（2026-06）多人多 Agent 协作",
     "chapter": "agent-lowcode",
     "verified": "2026-07-10",
     "source": "github.com/coze-dev/coze-studio / 36kr",
     "recheck": "—"
    },
    {
     "text": "Dify：148k stars、v1.15.0（2026-06-25）；许可证 = Apache 2.0 + 附加条款（多租户 SaaS / 去 logo 需商业授权）",
     "chapter": "agent-lowcode",
     "verified": "2026-07-10",
     "source": "github.com/langgenius/dify",
     "recheck": "—"
    },
    {
     "text": "n8n：~127k stars；Sustainable Use License（fair-code，不得转售）；2025-10 融资 $180M（Accel/NVIDIA 参投），估值 ~$2.5B",
     "chapter": "agent-lowcode",
     "verified": "2026-07-10",
     "source": "docs.n8n.io / 融资报道",
     "recheck": "—"
    },
    {
     "text": "HiAgent 2.0 主打数字员工治理；火山引擎居中国智能体开发平台私有化 17.8% / 公有云 19.3% 双第一（IDC 口径）",
     "chapter": "agent-lowcode",
     "verified": "2026-07-10",
     "source": "volcengine.com / IDC 报道",
     "recheck": "—"
    },
    {
     "text": "低代码选型共识：问答→Dify、集成→n8n、对话 bot→Coze、私有化+治理→HiAgent 类；生产范式 = 平台做壳、复杂节点下沉代码",
     "chapter": "agent-lowcode",
     "verified": "2026-07-10",
     "source": "jimmysong.io / meterra 2026 横评",
     "recheck": "—"
    },
    {
     "text": "记忆框架四强：Mem0（托管最快、47K+ stars、向量+图+KV）/ Letta 前 MemGPT（OS 式内存块）/ Zep（时序知识图谱，自报 LoCoMo 94.7%）/ LangMem（LangGraph 原生）；生产模式 = 小核心常驻 + 检索层 + 遗忘策略",
     "chapter": "agent-memory",
     "verified": "2026-07-11",
     "source": "vectorize / evermind / jobsbyculture 2026 横评",
     "recheck": "—"
    },
    {
     "text": "记忆投毒：OWASP Agentic Top 10 于 2026 新增 ASI06；MINJA 注入成功率 >95%、多研究报 80–99.8%；防线 = 写入过滤/任务间清理/鉴权审计",
     "chapter": "agent-memory",
     "verified": "2026-07-11",
     "source": "arXiv 2601.05504 / 2607.06595 / beyondscale",
     "recheck": "—"
    },
    {
     "text": "Computer Use 三路线：Claude（截图+鼠键全桌面）/ Gemini（DOM 感知浏览器）/ OpenAI Codex Background CU（2026-04-16，macOS 并行）；开源代表 Browser Use；Claude Cowork 2026-03-23 上线",
     "chapter": "agent-computer-use",
     "verified": "2026-07-11",
     "source": "digitalapplied 2026 对比矩阵 / particula",
     "recheck": "—"
    },
    {
     "text": "CU 基准两口径：Opus 4.8 OSWorld-Verified 83.5%（2024 年起步 14.9%）；OSWorld 2.0 长程仅 20.6%；OpenAI CUA WebVoyager 87% / OSWorld 38.1%——基准 ≠ 生产就绪",
     "chapter": "agent-computer-use",
     "verified": "2026-07-11",
     "source": "coasty 榜 / arXiv 2606.29537",
     "recheck": "—"
    },
    {
     "text": "Claude Code sub-agent 机制：`.claude/agents/*.md`（name/description 必填，tools/model 等可选）；内置 Explore / Plan / general-purpose；v2.1.172 起可嵌套、深度 5 层封顶（固定）；v2.1.198 起默认后台运行、`/agents` 交互向导移除；skill 可绑 `context: fork` 强制在 sub-agent 里跑",
     "chapter": "agent-subagent",
     "verified": "2026-07-17",
     "source": "code.claude.com/docs（sub-agents、skills）",
     "recheck": "—"
    },
    {
     "text": "Codex sub-agent：当前版本默认启用；内置 explorer / worker / default；`.codex/agents/*.toml`（name/description/developer_instructions 必填）；agents.max_threads 默认 6、agents.max_depth 默认 1；spawn_agents_on_csv（CSV 一行一工人）为实验特性",
     "chapter": "agent-subagent",
     "verified": "2026-07-17",
     "source": "developers.openai.com/codex/subagents",
     "recheck": "—"
    },
    {
     "text": "Anthropic 多 agent 研究系统：比单 agent Opus 4 高 90.2%；agent ≈ 4×、multi-agent ≈ 15× token；token 用量单因素解释 80% 性能方差（BrowseComp）；复杂查询典型并行 3–5 个子 agent，研究时长最多压缩 90%",
     "chapter": "agent-subagent",
     "verified": "2026-07-17",
     "source": "anthropic.com/engineering/built-multi-agent-research-system",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "agent-context",
     "to": "pe#pe-advanced-reasoning",
     "why": "上下文工程 / ReAct 是提示词技巧在工具循环里的应用；讲义已加「与 Prompt Engineering 的关系」页回指",
     "resolved": true
    },
    {
     "from": "agent-tools-mcp",
     "to": "mcp#mcp-what-why",
     "why": "Agent 第 4 章讲 MCP 概览，协议细节深入见 MCP 模块",
     "resolved": true
    },
    {
     "from": "agent-context",
     "to": "rag#rag-agentic",
     "why": "Agent 第 5 章\"与 RAG 的握手\" ↔ RAG 第 8 章，双向互引",
     "resolved": true
    },
    {
     "from": "agent-eval-guardrails",
     "to": "evaluation#eval-scenarios",
     "why": "agent 评估（turn/milestone/trajectory）已在 Evaluation 第 6 章场景验收展开（原「候选」于 2026-07-10 补实）",
     "resolved": true
    },
    {
     "from": "agent-tools-mcp",
     "to": "a2a#a2a-what-why",
     "why": "Agent 第 4 章提及 A2A（v1.0）；跨厂商 Agent 协作的协议细节深入见 A2A 模块",
     "resolved": true
    },
    {
     "from": "agent-context",
     "to": "llm#llm-inference-kv",
     "why": "上下文工程的架构根源（O(n²) 成本 + KV 缓存 + 有效窗口）见 LLM 原理第 4 章",
     "resolved": true
    },
    {
     "from": "agent-components",
     "to": "multimodal#mm-what-why",
     "why": "多模态感知让 agent「能看」屏幕 / 图表，是 computer use 的前提；第 2 章已加「多模态感知」串联页回指（2026-07-10），护栏侧接 multimodal#mm-production",
     "resolved": true
    },
    {
     "from": "agent-lowcode",
     "to": "mcp#mcp-what-why",
     "why": "四平台都在补 MCP 支持（工具接入标准化），协议细节见 MCP 模块",
     "resolved": true
    },
    {
     "from": "agent-lowcode",
     "to": "rag#rag-pipeline",
     "why": "Dify 内置 RAG = RAG 第 6 章最小管线的产品化，配知识库即建库",
     "resolved": true
    },
    {
     "from": "agent-lowcode",
     "to": "multimodal#mm-voice-realtime",
     "why": "平台搭的客服 bot 要上语音时，实时链路工程（延迟/打断/RTC）见 Multimodal 第 8 章",
     "resolved": true
    },
    {
     "from": "agent-lowcode",
     "to": "solution-patterns#sp-cheatsheet",
     "why": "平台是各场景方案的落地工具层；「有没有平台」在 Solution-Patterns 分诊树中指回本章（模块 2026-07-10 建成，原「候选」补实）",
     "resolved": true
    },
    {
     "from": "agent-memory",
     "to": "security#sec-agentic / rag#rag-what-why",
     "why": "记忆投毒防线与 Security 第 5 章「记忆投毒」同源展开；记忆 vs RAG 边界 = 用户交互史 vs 组织知识",
     "resolved": true
    },
    {
     "from": "agent-computer-use",
     "to": "multimodal#mm-what-why / security#sec-prompt-injection",
     "why": "视觉感知是 CU 前提（第 2 章串联页已埋\"computer use 前提\"）；屏幕内容 = 新注入面",
     "resolved": true
    },
    {
     "from": "agent-subagent",
     "to": "agent#agent-orchestration",
     "why": "模块内串联：orchestrator-workers 是模式（蓝图），sub-agent 是 coding agent 产品里的机制（车间）；两章互指",
     "resolved": true
    },
    {
     "from": "agent-subagent",
     "to": "agent#agent-context",
     "why": "模块内串联：上下文隔离是第 5 章「子 agent」板斧的机制展开；任务书自包含 = 上下文工程纪律",
     "resolved": true
    },
    {
     "from": "agent-cheatsheet",
     "to": "（全库）",
     "why": "启用条件决策树与串联地图；替代 v1.0 全书串联页（旧页随 2026-07-11 历史版本存档）",
     "resolved": false
    }
   ],
   "web": "./agent/index.html",
   "questions": [
    {
     "id": "q-agent-1",
     "q": "Agent 和普通的对话机器人到底有什么区别？",
     "added": "2026-07-07",
     "chapters": [
      "agent-what-why"
     ]
    },
    {
     "id": "q-agent-2",
     "q": "是不是所有场景都该升级成 agent？",
     "added": "2026-07-07",
     "chapters": [
      "advisor",
      "agent-what-why",
      "agent-cheatsheet"
     ]
    },
    {
     "id": "q-agent-3",
     "q": "模型会不会直接操作我们的生产系统？",
     "added": "2026-07-07",
     "chapters": [
      "agent-components",
      "agent-tools-mcp"
     ]
    },
    {
     "id": "q-agent-4",
     "q": "多个 agent 是不是一定比一个强？",
     "added": "2026-07-07",
     "chapters": [
      "agent-orchestration",
      "agent-subagent"
     ]
    },
    {
     "id": "q-agent-5",
     "q": "现在模型上下文都百万级了，还需要上下文工程吗？",
     "added": "2026-07-07",
     "chapters": [
      "agent-context"
     ]
    },
    {
     "id": "q-agent-6",
     "q": "怎么证明 agent 上线后不会出乱子？",
     "added": "2026-07-07",
     "chapters": [
      "agent-eval-guardrails",
      "agent-cheatsheet"
     ]
    },
    {
     "id": "q-agent-7",
     "q": "Dify 是开源的，我们为什么要付钱？",
     "added": "2026-07-10",
     "chapters": [
      "agent-lowcode"
     ]
    },
    {
     "id": "q-agent-8",
     "q": "Agent 的记忆会不会被人「教坏」？",
     "added": "2026-07-11",
     "chapters": [
      "agent-memory"
     ]
    },
    {
     "id": "q-agent-9",
     "q": "Computer Use 和 RPA 有什么区别？我们已经买了 RPA。",
     "added": "2026-07-11",
     "chapters": [
      "agent-computer-use"
     ]
    },
    {
     "id": "q-agent-10",
     "q": "Sub-agent 会不会把费用跑爆？",
     "added": "2026-07-17",
     "chapters": [
      "agent-subagent"
     ]
    },
    {
     "id": "q-agent-11",
     "q": "怎么保证某个 sub-agent 每次都被调用？",
     "added": "2026-07-17",
     "chapters": [
      "agent-subagent",
      "src-subagent"
     ]
    }
   ]
  },
  {
   "id": "data-engineering",
   "dir": "Data-Engineering",
   "layer": "数据底座层",
   "created": "2026-07-11",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "de-what-why",
     "no": "第 1 章",
     "title": "数据就绪度是第一风险（四问 / 管线总图 / 报价项）",
     "verified": "2026-07-11"
    },
    {
     "id": "de-parsing",
     "no": "第 2 章",
     "title": "文档解析管线（四强格局 / 基准口径 / 选型分水岭）",
     "verified": "2026-07-11"
    },
    {
     "id": "de-pipeline",
     "no": "第 3 章",
     "title": "连接器与增量同步（五件事 / 增量三模式 / 去重失效）",
     "verified": "2026-07-11"
    },
    {
     "id": "de-vectordb",
     "no": "第 4 章",
     "title": "向量库选型深潜（五锚点 / 按规模演进 / 迁移纪律）",
     "verified": "2026-07-11"
    },
    {
     "id": "de-quality",
     "no": "第 5 章",
     "title": "数据质量与覆盖率（四指标 / 坏答案回流 / 运营节奏）",
     "verified": "2026-07-11"
    },
    {
     "id": "de-labeling",
     "no": "第 6 章",
     "title": "标注与合成数据运营（预算三去向 / 双线运营 / 分流口诀）",
     "verified": "2026-07-11"
    },
    {
     "id": "de-governance",
     "no": "第 7 章",
     "title": "治理与权限衔接（三执行点 / 越权测试 / 向量化≠匿名化）",
     "verified": "2026-07-11"
    },
    {
     "id": "de-cheatsheet",
     "no": "第 8 章",
     "title": "售前速查（管线总图 / 工具速查 / 八坑清单 / 串联）",
     "verified": "2026-07-11"
    }
   ],
   "facts": [
    {
     "text": "解析四强：LlamaParse（VLM 托管、agentic OCR、<1000 页/天甜区）/ Docling（IBM 开源、AI 版面检测）/ MinerU（OpenDataLab，CJK 最强，PaddleOCR+自研版面）/ Unstructured；云文档智能三家为企业默认起点",
     "chapter": "de-parsing",
     "verified": "2026-07-11",
     "source": "mixpeek / pdfmux / llamaindex 2026 横评",
     "recheck": "—"
    },
    {
     "text": "基准口径（opendataloader-bench，200 PDF）：Docling 0.877 > marker 0.861 > MinerU 0.831；LlamaParse/Unstructured 未公布该基准",
     "chapter": "de-parsing",
     "verified": "2026-07-11",
     "source": "themenonlab / pdfmux 2026",
     "recheck": "—"
    },
    {
     "text": "向量库口径：pgvector 生产上限约 50–100M 向量（HNSW 重建成瓶颈）；Qdrant p50 4ms/p99 25ms、过滤最强开源；Milvus/Zilliz 十亿级；Weaviate/ES 原生混合最成熟；Pinecone 等托管按量",
     "chapter": "de-vectordb",
     "verified": "2026-07-11",
     "source": "firecrawl / layerbase / encore 2026 对比",
     "recheck": "—"
    },
    {
     "text": "选型共识：已有 Postgres→pgvector、有 ES→就地升级、重过滤→Qdrant、十亿级→Milvus、免运维→托管",
     "chapter": "de-vectordb",
     "verified": "2026-07-11",
     "source": "同上（\"100+ 企业部署决策指南\"口径）",
     "recheck": "—"
    },
    {
     "text": "增量同步三模式（轮询/webhook/CDC）与连接器五件事（认证/拉取/解析/ACL/增量）为工程量估算框架；成熟源参照 Airbyte 模式",
     "chapter": "de-pipeline",
     "verified": "2026-07-11",
     "source": "dbt/Airbyte 文档模式（稳定工程共识）",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "de-what-why",
     "to": "solution-patterns#sp-method",
     "why": "SP 说「数据坑是第一风险」，本模块把它变成显性工程件与报价项（双向）",
     "resolved": true
    },
    {
     "from": "de-parsing",
     "to": "rag#rag-chunking",
     "why": "解析产物交给 RAG 切分：解析质量决定切分质量——上游下游（双向）",
     "resolved": true
    },
    {
     "from": "de-pipeline",
     "to": "solution-patterns#sp-knowledge-search",
     "why": "SP 说「连接器是报价大头」，本章给五件事工程清单（双向）",
     "resolved": true
    },
    {
     "from": "de-vectordb",
     "to": "rag#rag-embedding",
     "why": "RAG 第 2 章讲原理与起步，本章讲规模化选型与迁移",
     "resolved": true
    },
    {
     "from": "de-quality",
     "to": "ai-ops#ops-online-eval",
     "why": "坏答案由 AI-Ops 在线评估抓到，归因到数据层由本章接住；运营节奏合并交付",
     "resolved": true
    },
    {
     "from": "de-labeling",
     "to": "fine-tuning#ft-data / evaluation#eval-build",
     "why": "配方在 Fine-tuning、评估集方法在 Evaluation；本章管预算与双线运营",
     "resolved": true
    },
    {
     "from": "de-governance",
     "to": "security#sec-data-privacy",
     "why": "Security 定规则，本章是数据管线上的三个执行点；越权测试集同 SP 第 4 章验收",
     "resolved": true
    }
   ],
   "web": "./data-engineering/index.html",
   "questions": [
    {
     "id": "q-data-engineering-1",
     "q": "我们数据很乱，AI 项目是不是做不了？",
     "added": "2026-07-11",
     "chapters": [
      "readiness",
      "de-what-why"
     ]
    },
    {
     "id": "q-data-engineering-2",
     "q": "我们全是扫描件和图纸，能处理吗？",
     "added": "2026-07-11",
     "chapters": [
      "de-parsing"
     ]
    },
    {
     "id": "q-data-engineering-3",
     "q": "接一个系统要多久？数据多久能同步一次？",
     "added": "2026-07-11",
     "chapters": [
      "de-pipeline"
     ]
    },
    {
     "id": "q-data-engineering-4",
     "q": "要不要专门买一套向量数据库？",
     "added": "2026-07-11",
     "chapters": [
      "de-vectordb"
     ]
    },
    {
     "id": "q-data-engineering-5",
     "q": "AI 老答错，是不是模型不行？",
     "added": "2026-07-11",
     "chapters": [
      "de-quality"
     ]
    },
    {
     "id": "q-data-engineering-6",
     "q": "标注要雇多少人？合成数据可靠吗？",
     "added": "2026-07-11",
     "chapters": [
      "de-labeling"
     ]
    },
    {
     "id": "q-data-engineering-7",
     "q": "数据向量化之后是不是就安全了？删除能真删干净吗？",
     "added": "2026-07-11",
     "chapters": [
      "de-governance"
     ]
    }
   ]
  },
  {
   "id": "evaluation",
   "dir": "Evaluation",
   "layer": "工程保障层",
   "created": "2026-07-09",
   "updated": "2026-07-21",
   "chapters": [
    {
     "id": "eval-why-hard",
     "no": "第 1 章",
     "title": "为什么评估这么难",
     "verified": "2026-07-09"
    },
    {
     "id": "eval-benchmarks",
     "no": "第 2 章",
     "title": "模型基准测试全景",
     "verified": "2026-07-09"
    },
    {
     "id": "eval-methods",
     "no": "第 3 章",
     "title": "评估方法谱系",
     "verified": "2026-07-09"
    },
    {
     "id": "eval-judge",
     "no": "第 4 章",
     "title": "LLM-as-a-Judge 深潜",
     "verified": "2026-07-09"
    },
    {
     "id": "eval-build",
     "no": "第 5 章",
     "title": "自建评估:数据集与指标设计",
     "verified": "2026-07-09"
    },
    {
     "id": "eval-scenarios",
     "no": "第 6 章",
     "title": "场景验收:RAG / Agent / 微调",
     "verified": "2026-07-09"
    },
    {
     "id": "eval-tooling",
     "no": "第 7 章",
     "title": "评估工具链与生产闭环",
     "verified": "2026-07-09"
    },
    {
     "id": "eval-cheatsheet",
     "no": "第 8 章",
     "title": "售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "MMLU / MMLU-Pro 已功能性饱和,前沿模型普遍 88%+,顶部无区分度",
     "chapter": "eval-benchmarks",
     "verified": "2026-07-09",
     "source": "techjacksolutions / kili-technology 2026 基准综述",
     "recheck": "—"
    },
    {
     "text": "GPQA Diamond 头部分数:Gemini 3.1 Pro 94.3 / Claude Opus 4.6 91.3 / Qwen3.5-plus 88.4 / GPT-5.3 Codex 81(2026-02 口径)",
     "chapter": "eval-benchmarks",
     "verified": "2026-07-09",
     "source": "lmmarketcap / kili-technology",
     "recheck": "—"
    },
    {
     "text": "HLE 前沿模型约 35~50%,人类专家约 90%,当前区分度最好的知识型基准之一",
     "chapter": "eval-benchmarks",
     "verified": "2026-07-09",
     "source": "techjacksolutions 2026 基准综述",
     "recheck": "—"
    },
    {
     "text": "Agent 基准主战场:SWE-bench Verified / Terminal-Bench 2.0(89 任务)/ τ²-bench / OSWorld;BFCL v4(2026-04)改 Agentic 加权 40%",
     "chapter": "eval-benchmarks",
     "verified": "2026-07-09",
     "source": "benchmarkingagents / spheron / arXiv 2601.11868",
     "recheck": "—"
    },
    {
     "text": "2026 中头部格局:Claude Opus 4.6 领跑 SWE-bench/Terminal-Bench/OSWorld,Gemini 3.1 Pro 领跑 ARC-AGI-2 等,GPT-5.2 领跑 τ²-bench",
     "chapter": "eval-benchmarks",
     "verified": "2026-07-09",
     "source": "benchlm / awesomeagents 榜单",
     "recheck": "—"
    },
    {
     "text": "Chatbot Arena → LMArena → Arena(2026-01 更名),累计 600 万+ 投票,估值 17 亿美元",
     "chapter": "eval-benchmarks",
     "verified": "2026-07-09",
     "source": "openlm.ai / news.lmarena.ai",
     "recheck": "—"
    },
    {
     "text": "《The Leaderboard Illusion》(2025):厂商私测多变体择优公开,曾有厂商私测 27 变体只公开最优",
     "chapter": "eval-benchmarks",
     "verified": "2026-07-09",
     "source": "arXiv 2504.20879 / openreview",
     "recheck": "—"
    },
    {
     "text": "判官三大偏差:位置(换序判决漂移 >10%)、冗长(无新信息加长版被偏好 >90%)、自我偏好(与困惑度相关)",
     "chapter": "eval-judge",
     "verified": "2026-07-09",
     "source": "arXiv 2306.05685 / 2410.21819 / 2410.02736",
     "recheck": "—"
    },
    {
     "text": "Judge Reliability Harness(2026-03 开源)结论:无判官全面可靠,可靠性是逐任务属性",
     "chapter": "eval-judge",
     "verified": "2026-07-09",
     "source": "adaline / emergentmind 2026",
     "recheck": "—"
    },
    {
     "text": "开发期开源框架格局:Ragas(RAG 专项)/ DeepEval(50+ 指标, pytest CI)/ promptfoo(矩阵+红队 40+ 插件)",
     "chapter": "eval-tooling",
     "verified": "2026-07-09",
     "source": "confident-ai / genai.qa / aiml.qa 2026 对比",
     "recheck": "—"
    },
    {
     "text": "OpenAI 平台内置 Evals:2026-10-31 起只读,2026-11-30 关停",
     "chapter": "eval-tooling",
     "verified": "2026-07-09",
     "source": "developers.openai.com 官方文档",
     "recheck": "—"
    },
    {
     "text": "三大云托管评估服务:AWS Bedrock 模型评估作业 / Azure AI Foundry 评估器 / Vertex AI Gen AI 评估服务",
     "chapter": "eval-tooling",
     "verified": "2026-07-09",
     "source": "internative / bitslovers / epcgroup 2026 平台对比",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "eval-methods",
     "to": "pe#pe-engineering",
     "why": "提示词的评估驱动优化用本模块判分四法 / LLM-as-a-Judge；讲义已加「与 Prompt Engineering 的关系」页回指",
     "resolved": true
    },
    {
     "from": "eval-scenarios",
     "to": "rag#rag-eval",
     "why": "RAG 检索质量指标在本模块收编为「场景验收」并补全端到端方法",
     "resolved": true
    },
    {
     "from": "eval-scenarios",
     "to": "agent#agent-eval",
     "why": "Agent「评估与护栏」提出「要评」,本模块给出轨迹/结果分层的「怎么评」",
     "resolved": true
    },
    {
     "from": "eval-scenarios",
     "to": "fine-tuning#ft-eval-deploy",
     "why": "微调验收四层与回归门禁在本模块展开成完整验收方案",
     "resolved": true
    },
    {
     "from": "eval-benchmarks",
     "to": "llm-training#评估章",
     "why": "模型厂「炼模型时评什么」vs 应用方「选模型时评什么」,视角互补",
     "resolved": true
    },
    {
     "from": "eval-why-hard",
     "to": "llm-inference#性能指标",
     "why": "边界声明:质量归本模块,延迟/吞吐归 LLM-Inference",
     "resolved": true
    },
    {
     "from": "eval-scenarios",
     "to": "security#sec-defense",
     "why": "安全维度验收(注入抵抗率、有害内容率)由 Security 模块第 6 章红队产出并回流,候选边已兑现(2026-07-09)",
     "resolved": true
    },
    {
     "from": "eval-benchmarks",
     "to": "model-landscape#ml-selection",
     "why": "本模块讲\"榜单怎么骗人/怎么自建评估\",Model-Landscape 第 8 章把它用作选型两道防线——双向互指(2026-07-10)",
     "resolved": true
    },
    {
     "from": "eval-build / eval-judge",
     "to": "ai-ops#ops-online-eval",
     "why": "全库最强新搭档:本模块给离线建集与判官方法,AI-Ops 第 3 章做在线采样运营(共享判分器定义)——双向互指(2026-07-10)",
     "resolved": true
    }
   ],
   "web": "./evaluation/index.html",
   "questions": [
    {
     "id": "q-evaluation-1",
     "q": "你们模型在榜单上分数很高，是不是拿来就好用？",
     "added": "2026-07-09",
     "chapters": [
      "eval-why-hard",
      "eval-cheatsheet"
     ]
    },
    {
     "id": "q-evaluation-2",
     "q": "让 AI 评 AI，靠谱吗？",
     "added": "2026-07-09",
     "chapters": [
      "eval-judge",
      "src-jrh"
     ]
    },
    {
     "id": "q-evaluation-3",
     "q": "判官会不会偏向你们自家模型？",
     "added": "2026-07-09",
     "chapters": [
      "eval-judge"
     ]
    },
    {
     "id": "q-evaluation-4",
     "q": "我们没数据、没标注团队，评估怎么起步？",
     "added": "2026-07-09",
     "chapters": [
      "eval-build"
     ]
    },
    {
     "id": "q-evaluation-5",
     "q": "RAG 答错了，怎么知道是检索还是生成的锅？",
     "added": "2026-07-09",
     "chapters": [
      "eval-scenarios"
     ]
    },
    {
     "id": "q-evaluation-6",
     "q": "Agent 这种多步任务怎么验收？",
     "added": "2026-07-12",
     "chapters": [
      "eval-scenarios"
     ]
    },
    {
     "id": "q-evaluation-7",
     "q": "微调完的模型，怎么证明没有「变笨」？",
     "added": "2026-07-09",
     "chapters": [
      "eval-scenarios"
     ]
    },
    {
     "id": "q-evaluation-8",
     "q": "万一评估平台以后停服了怎么办？",
     "added": "2026-07-09",
     "chapters": [
      "eval-tooling",
      "src-openai-evals"
     ]
    },
    {
     "id": "q-evaluation-9",
     "q": "评估体系建起来要多久、多少钱？",
     "added": "2026-07-09",
     "chapters": [
      "eval-build",
      "eval-tooling"
     ]
    },
    {
     "id": "q-evaluation-10",
     "q": "有了护栏是不是就不用评估了？",
     "added": "2026-07-09",
     "chapters": [
      "eval-scenarios",
      "eval-tooling"
     ]
    }
   ]
  },
  {
   "id": "fine-tuning",
   "dir": "Fine-tuning",
   "layer": "工程保障层",
   "created": "2026-07-09",
   "updated": "2026-07-21",
   "chapters": [
    {
     "id": "ft-when",
     "no": "第 1 章",
     "title": "什么时候该微调",
     "verified": "2026-07-09"
    },
    {
     "id": "ft-methods",
     "no": "第 2 章",
     "title": "微调方法谱系（全参 / LoRA / QLoRA）",
     "verified": "2026-07-09"
    },
    {
     "id": "ft-data",
     "no": "第 3 章",
     "title": "数据准备：微调成败在此",
     "verified": "2026-07-09"
    },
    {
     "id": "ft-training",
     "no": "第 4 章",
     "title": "训练实操与框架图鉴",
     "verified": "2026-07-09"
    },
    {
     "id": "ft-alignment",
     "no": "第 5 章",
     "title": "偏好对齐落地（DPO / RFT）",
     "verified": "2026-07-09"
    },
    {
     "id": "ft-cloud",
     "no": "第 6 章",
     "title": "托管微调服务与上云落地",
     "verified": "2026-07-09"
    },
    {
     "id": "ft-eval-deploy",
     "no": "第 7 章",
     "title": "评估与部署",
     "verified": "2026-07-09"
    },
    {
     "id": "ft-field-guide",
     "no": "第 8 章",
     "title": "售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "OpenAI 托管微调三方法并存：SFT/DPO 可调 GPT-4.1 / GPT-4.1-mini，RFT 可调 o4-mini（可编程 grader）",
     "chapter": "ft-cloud",
     "verified": "2026-07-09",
     "source": "OpenAI 官方微调文档",
     "recheck": "—"
    },
    {
     "text": "Claude 微调唯一托管路径：Amazon Bedrock 上 Claude 3 Haiku SFT（us-west-2）；官方建议 50–10,000 条样本",
     "chapter": "ft-cloud",
     "verified": "2026-07-09",
     "source": "AWS 官方博客、Claude Cookbook",
     "recheck": "—"
    },
    {
     "text": "三大云格局：Vertex 微调形态最灵活（全参/LoRA/adapter）；Azure AI Foundry 蒸馏 GA（GPT-4o→Phi-4）；AWS Bedrock 托管 + SageMaker 兜底",
     "chapter": "ft-cloud",
     "verified": "2026-07-09",
     "source": "平台官方与 2026 对比评测",
     "recheck": "—"
    },
    {
     "text": "开源框架四强功能趋同，stars（2026-07）：LLaMA-Factory ~68K、Unsloth ~54K、TRL ~18K、Axolotl ~11K",
     "chapter": "ft-training",
     "verified": "2026-07-09",
     "source": "GitHub、框架对比评测",
     "recheck": "—"
    },
    {
     "text": "PEFT 稳定版 v0.19.1；0.18.0+ 起才兼容 Transformers v5、要求 Python 3.10+（老环境升级边界）",
     "chapter": "ft-training",
     "verified": "2026-07-12",
     "source": "github.com/huggingface/peft/releases",
     "recheck": "—"
    },
    {
     "text": "TRL v1.8.0（2026-07-09）：KTO 自 experimental 转正为顶层 API（旧导入路径 v2.0 前发 FutureWarning）",
     "chapter": "ft-training",
     "verified": "2026-07-12",
     "source": "github.com/huggingface/trl/releases",
     "recheck": "—"
    },
    {
     "text": "vLLM 动态加载 LoRA adapter 有官方安全警告：仅限隔离、完全受信环境（需显式开 VLLM_ALLOW_RUNTIME_LORA_UPDATING）",
     "chapter": "ft-eval-deploy",
     "verified": "2026-07-12",
     "source": "docs.vllm.ai/en/stable/features/lora/",
     "recheck": "—"
    },
    {
     "text": "Unsloth 宣称较 HF+FA2 快 2×、省 70% 显存；3GB 显存可玩，Colab/Kaggle 免费笔记本生态",
     "chapter": "ft-training",
     "verified": "2026-07-09",
     "source": "Unsloth 官方文档",
     "recheck": "—"
    },
    {
     "text": "RFT（可验证奖励微调）为 2026 年微调新风向；开源侧主力算法 GRPO",
     "chapter": "ft-alignment",
     "verified": "2026-07-09",
     "source": "OpenAI RFT 文档、行业综述",
     "recheck": "—"
    },
    {
     "text": "显存量级：7B 全参约 110GB（多卡）；QLoRA 后 6–8GB 单张消费卡可跑，70B 可入单张 48GB 卡",
     "chapter": "ft-methods",
     "verified": "2026-07-09",
     "source": "QLoRA 论文、2026 实践指南",
     "recheck": "—"
    },
    {
     "text": "合成数据 + 蒸馏为微调数据主流来源（种子→扩展→judge 过滤）；DeepSeek-R1/Qwen 蒸馏系小模型涌现",
     "chapter": "ft-data",
     "verified": "2026-07-09",
     "source": "行业综述、Azure/厂商公告",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "ft-when",
     "to": "pe#pe-what-why",
     "why": "选型链两端：提示词到头才微调；讲义已加「与 Prompt Engineering 的关系」页回指",
     "resolved": true
    },
    {
     "from": "ft-when",
     "to": "rag#rag-what-why",
     "why": "「微调 vs RAG」互为镜像：RAG 从应用侧答，本章从微调侧收口（讲义第 1 章有专页）",
     "resolved": true
    },
    {
     "from": "ft-methods",
     "to": "llm-training#llmtrain-sft",
     "why": "SFT 原理在那边，「拿自己数据落地」的方法选择在这边",
     "resolved": true
    },
    {
     "from": "ft-alignment",
     "to": "llm-training#llmtrain-alignment",
     "why": "对齐原理（奖励模型/RLHF）↔ 落地选择（DPO/RFT 决策表）",
     "resolved": true
    },
    {
     "from": "ft-alignment",
     "to": "llm-training#llmtrain-reasoning",
     "why": "RFT/GRPO 的训练侧原理与推理模型脉络在那边",
     "resolved": true
    },
    {
     "from": "ft-data",
     "to": "llm-training#llmtrain-data",
     "why": "合成数据两侧互参：那边讲预训练/后训练语料，这边讲微调数据流水线",
     "resolved": true
    },
    {
     "from": "ft-eval-deploy",
     "to": "llm-inference#llminf-engines",
     "why": "微调产物经 vLLM 多 LoRA adapter 部署进推理服务（讲义第 7 章有承接页）",
     "resolved": true
    },
    {
     "from": "ft-eval-deploy",
     "to": "llm-inference#llminf-quant",
     "why": "微调后部署常配量化，质量门禁两边口径一致",
     "resolved": true
    },
    {
     "from": "ft-eval-deploy",
     "to": "（候选）Evaluation",
     "why": "微调验收这条评估线，与 RAG/Agent/LLM-Training 三条共同待 Evaluation 模块收编",
     "resolved": false
    },
    {
     "from": "ft-cloud",
     "to": "ai-infra-platform#aip-cloud",
     "why": "云上托管训练/微调形态（HyperPod/Vertex/PAI 类）两边互指：本章从微调视角、对方从平台形态视角（2026-07-09 补）",
     "resolved": true
    }
   ],
   "web": "./fine-tuning/index.html",
   "questions": [
    {
     "id": "q-fine-tuning-1",
     "q": "30 秒说清：提示词、RAG、微调怎么选？",
     "added": "2026-07-09",
     "chapters": [
      "advisor",
      "ft-when"
     ]
    },
    {
     "id": "q-fine-tuning-2",
     "q": "要多少数据、多少钱、多久见效？",
     "added": "2026-07-09",
     "chapters": [
      "ft-data",
      "ft-training"
     ]
    },
    {
     "id": "q-fine-tuning-3",
     "q": "微调会不会把模型调笨？",
     "added": "2026-07-09",
     "chapters": [
      "ft-methods",
      "ft-eval-deploy"
     ]
    },
    {
     "id": "q-fine-tuning-4",
     "q": "GPT / Claude / 开源，微调路径分别是什么？",
     "added": "2026-07-09",
     "chapters": [
      "ft-cloud",
      "src-cloud-ft"
     ]
    },
    {
     "id": "q-fine-tuning-5",
     "q": "SFT 和 DPO 我们都要做吗？",
     "added": "2026-07-09",
     "chapters": [
      "ft-alignment"
     ]
    },
    {
     "id": "q-fine-tuning-6",
     "q": "怎么证明微调真的有效？",
     "added": "2026-07-09",
     "chapters": [
      "ft-eval-deploy"
     ]
    },
    {
     "id": "q-fine-tuning-7",
     "q": "怎么灰度？出问题怎么回滚？",
     "added": "2026-07-13",
     "chapters": [
      "ft-eval-deploy"
     ]
    },
    {
     "id": "q-fine-tuning-8",
     "q": "用 GPT 生成的数据训我们的模型，合规吗？",
     "added": "2026-07-09",
     "chapters": [
      "ft-data"
     ]
    }
   ]
  },
  {
   "id": "llm",
   "dir": "LLM",
   "layer": "基础层",
   "created": "2026-07-08",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "llm-why-transformer",
     "no": "第 1 章",
     "title": "从序列问题到 Transformer",
     "verified": "2026-07-08"
    },
    {
     "id": "llm-attention-qkv",
     "no": "第 2 章",
     "title": "注意力机制：QKV 拆解",
     "verified": "2026-07-08"
    },
    {
     "id": "llm-architecture",
     "no": "第 3 章",
     "title": "Transformer 全解剖",
     "verified": "2026-07-08"
    },
    {
     "id": "llm-inference-kv",
     "no": "第 4 章",
     "title": "从架构到推理：上下文窗口与 KV 缓存",
     "verified": "2026-07-08"
    },
    {
     "id": "llm-attention-zoo",
     "no": "第 5 章",
     "title": "注意力的工程进化",
     "verified": "2026-07-08"
    },
    {
     "id": "llm-presales-map",
     "no": "第 6 章",
     "title": "售前视角收拢",
     "verified": "2026-07-08"
    }
   ],
   "facts": [
    {
     "text": "GQA 8:1 是生产默认（生态支持最全）；MLA 为 DeepSeek/Kimi 系默认，KV 缓存约为同级 GQA 的 1/10，已被 Kimi K2、GLM-5 采用",
     "chapter": "llm-attention-zoo",
     "verified": "2026-07-08",
     "source": "raw-data/2026-07-08 联网核实笔记（Raschka 变体图解等）",
     "recheck": "—"
    },
    {
     "text": "DeepSeek V3.2 的 DSA 稀疏注意力（lightning indexer + top-k，O(L²)→O(Lk)）已生产化，GLM-5 跟进；DeepSeek-V4 用混合压缩注意力冲百万上下文",
     "chapter": "llm-attention-zoo",
     "verified": "2026-07-08",
     "source": "arXiv 2512.02556、arXiv 2512.12087",
     "recheck": "—"
    },
    {
     "text": "线性混合格局：Qwen3-Next 的 3:1 Gated DeltaNet 混合被 Qwen3.5 旗舰转正；Kimi Linear 通道级门控；反例 MiniMax M2 退回全注意力（复杂推理精度）",
     "chapter": "llm-attention-zoo",
     "verified": "2026-07-08",
     "source": "Raschka Beyond Standard LLMs、mlabonne Qwen3.5 分析",
     "recheck": "—"
    },
    {
     "text": "FlashAttention-4：2026-03-05 论文（arXiv 2603.05451），2026-07-01 PyPI 发包，面向 Blackwell 非对称硬件",
     "chapter": "llm-attention-zoo",
     "verified": "2026-07-08",
     "source": "together.ai 博客、pypi.org/project/flash-attn-4",
     "recheck": "—"
    },
    {
     "text": "托管商用模型 13 家提供 ≥1M 上下文窗口（Gemini 3.1 Pro 2M；开源 Llama 4 Scout 标称 10M）；RULER/MRCR v2/NoLiMa 显示多事实检索过 200K 普遍掉 30–60 分",
     "chapter": "llm-inference-kv",
     "verified": "2026-07-08",
     "source": "morphllm.com、ofox.ai 长上下文基准汇总",
     "recheck": "—"
    },
    {
     "text": "视频 token 量级：Gemini 官方口径默认分辨率约 300 token/秒（258/帧 @1fps + 音频 32/秒），1 小时视频 ≈ 108 万 token（建议复查日 2026-10-31，随 Multimodal 巡检顺带）",
     "chapter": "llm-inference-kv",
     "verified": "2026-07-20",
     "source": "ai.google.dev/gemini-api/docs/video-understanding（raw-data/2026-07-20-联网核实笔记-视频token.md）",
     "recheck": "—"
    },
    {
     "text": "RoPE 是主流开源模型位置编码的事实标准；超长上下文靠插值/YaRN 等扩展",
     "chapter": "llm-architecture",
     "verified": "2026-07-08",
     "source": "开源架构对比综述（Raschka）",
     "recheck": "—"
    },
    {
     "text": "MoE 为 2026 主流旗舰标配（DeepSeek-V3 总 671B/激活 37B；Qwen3.5、Kimi K2 同路线）",
     "chapter": "llm-architecture",
     "verified": "2026-07-08",
     "source": "DeepSeek-V3 论文、架构对比综述",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "llm-inference-kv",
     "to": "pe#pe-anatomy",
     "why": "提示词为什么有效的「物理学」基础：上下文窗口 / 注意力决定能放多少、放多准；讲义已加「与 Prompt Engineering 的关系」页回指",
     "resolved": true
    },
    {
     "from": "llm-inference-kv",
     "to": "rag#rag-what-why",
     "why": "「1M 窗口不是 RAG 终结者」：本模块给架构论据（成本/有效性/权限），RAG 第 1 章为应用视角，双向互为弹药",
     "resolved": true
    },
    {
     "from": "llm-inference-kv",
     "to": "agent#agent-context",
     "why": "上下文工程的物理学解释：O(n²) 成本 + 有效窗口约束是 Agent 第 5 章那套做法的根源",
     "resolved": true
    },
    {
     "from": "llm-architecture",
     "to": "llm-training#llmtrain-pretrain",
     "why": "本模块讲 MoE/参数账的架构视角，训练侧故事（Scaling Laws、MoE 训练、FP8）在 LLM-Training 第 3 章展开；对方以 llmtrain-overview/pretrain → llm#llm-why-transformer 回指，互为前置",
     "resolved": true
    },
    {
     "from": "llm-inference-kv",
     "to": "llm-inference#llminf-kv-budget",
     "why": "本章讲 KV 缓存「为什么存在」（机制），LLM-Inference 第 2 章讲「怎么管好」（服务系统），互为前后篇；对方讲义有承上启下页回指本章（2026-07-09 补）；2026-07-20 对话沉淀拆分互指：本章新增「窗口由什么决定／四堵墙」2 页（原理面）↔ 对方第 2 章新增「资源账」3 页（系统面）",
     "resolved": true
    },
    {
     "from": "llm-attention-qkv",
     "to": "multimodal#mm-encoder",
     "why": "ViT = 注意力吃图像：patch 即 token、QKV 原样复用、O(n²) 对图像同样成立；第 2 章已加「承上启下 · 与 Multimodal」页回指（2026-07-10）",
     "resolved": true
    }
   ],
   "web": "./llm/index.html",
   "questions": [
    {
     "id": "q-llm-1",
     "q": "为什么现在的大模型清一色 Transformer？",
     "added": "2026-07-08",
     "chapters": [
      "llm-why-transformer"
     ]
    },
    {
     "id": "q-llm-2",
     "q": "参数量 7B、70B 到底意味着什么？",
     "added": "2026-07-08",
     "chapters": [
      "kvcalc",
      "llm-architecture",
      "llm-inference-kv"
     ]
    },
    {
     "id": "q-llm-3",
     "q": "都有 1M 上下文了，还要 RAG 吗？",
     "added": "2026-07-08",
     "chapters": [
      "llm-inference-kv"
     ]
    },
    {
     "id": "q-llm-4",
     "q": "私有化部署为什么并发上不去？",
     "added": "2026-07-08",
     "chapters": [
      "llm-inference-kv"
     ]
    },
    {
     "id": "q-llm-5",
     "q": "DeepSeek 为什么那么便宜？",
     "added": "2026-07-08",
     "chapters": [
      "llm-attention-zoo"
     ]
    },
    {
     "id": "q-llm-6",
     "q": "被问到完全没听过的架构名词怎么办？",
     "added": "2026-07-08",
     "chapters": [
      "llm-attention-zoo",
      "llm-presales-map"
     ]
    },
    {
     "id": "q-llm-7",
     "q": "模型知识为什么会过时？能打补丁吗？",
     "added": "2026-07-08",
     "chapters": [
      "llm-architecture"
     ]
    },
    {
     "id": "q-llm-8",
     "q": "客户抱怨「AI 又胡说」，怎么系统性接住？",
     "added": "2026-07-13",
     "chapters": [
      "llm-presales-map"
     ]
    }
   ]
  },
  {
   "id": "llm-inference",
   "dir": "LLM-Inference",
   "layer": "基础层",
   "created": "2026-07-09",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "llminf-anatomy",
     "no": "第 1 章",
     "title": "推理是怎么跑起来的",
     "verified": "2026-07-09"
    },
    {
     "id": "llminf-kv-budget",
     "no": "第 2 章",
     "title": "KV Cache 与显存账",
     "verified": "2026-07-09"
    },
    {
     "id": "llminf-batching",
     "no": "第 3 章",
     "title": "把 GPU 喂饱：批处理与调度",
     "verified": "2026-07-09"
    },
    {
     "id": "llminf-engines",
     "no": "第 4 章",
     "title": "推理框架图鉴",
     "verified": "2026-07-09"
    },
    {
     "id": "llminf-quant",
     "no": "第 5 章",
     "title": "让模型变小：量化",
     "verified": "2026-07-09"
    },
    {
     "id": "llminf-speculative",
     "no": "第 6 章",
     "title": "让模型变快：投机解码与算法加速",
     "verified": "2026-07-09"
    },
    {
     "id": "llminf-disagg",
     "no": "第 7 章",
     "title": "集群级：P/D 分离与分布式推理",
     "verified": "2026-07-09"
    },
    {
     "id": "llminf-production",
     "no": "第 8 章",
     "title": "生产化与售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "vLLM 当前 v0.25.0（2026-07-11），事实上的默认推理引擎（硬件覆盖最广、NVIDIA NGC 收编）",
     "chapter": "llminf-engines",
     "verified": "2026-07-12",
     "source": "GitHub releases、2026 对比评测（见 raw-data 核实笔记）",
     "recheck": "—"
    },
    {
     "text": "SGLang 当前 v0.5.15（2026-07-10）；v0.5.13 起投机解码 Spec V2 默认开启；DeepSeek 系 day-0 支持",
     "chapter": "llminf-engines",
     "verified": "2026-07-12",
     "source": "GitHub releases",
     "recheck": "—"
    },
    {
     "text": "TensorRT-LLM 进入 1.x（1.0 起 PyTorch 架构转正）；稳定版 v1.2.1，1.3.0 处于 RC（rc20 为最后支持 TensorRT backend 的 RC，下版移除）；商业包装为 NIM",
     "chapter": "llminf-engines",
     "verified": "2026-07-12",
     "source": "GitHub releases（github.com/NVIDIA/TensorRT-LLM/releases）",
     "recheck": "—"
    },
    {
     "text": "FP8 为生产推理默认精度（校准后损失约 0.5–2%）；NVFP4 面向 Blackwell、工具链成熟中、尚未大规模生产",
     "chapter": "llminf-quant",
     "verified": "2026-07-09",
     "source": "vrlatech/sesamedisk 2026 量化综述",
     "recheck": "—"
    },
    {
     "text": "投机解码已生产标配：EAGLE-3 主流、vLLM 报告最高 ~2.5x、接受率>80% 时 2–4x",
     "chapter": "llminf-speculative",
     "verified": "2026-07-09",
     "source": "spheron/sesamedisk 2026 实测综述",
     "recheck": "—"
    },
    {
     "text": "行业预测 2030 推理算力占 AI 总算力 ~75%（与 LLM-Training llmtrain-overview 同源事实）",
     "chapter": "llminf-speculative",
     "verified": "2026-07-09",
     "source": "行业分析综述",
     "recheck": "—"
    },
    {
     "text": "NVIDIA Dynamo 1.0 于 2026-03-16 GTC GA，当前稳定版 v1.2.1（2026-06-13）：P/D 分离编排 + KV 感知路由 + NIXL；官方宣称 DeepSeek-R1/Blackwell 最高 7x 吞吐",
     "chapter": "llminf-disagg",
     "verified": "2026-07-12",
     "source": "NVIDIA 官方博客、GitHub releases（github.com/ai-dynamo/dynamo）",
     "recheck": "—"
    },
    {
     "text": "压测工具换代：NVIDIA AIPerf v0.11.0（2026-07-08）接棒 GenAI-Perf（官方提供迁移指南），配合 vllm bench serve 为 token 级压测主力",
     "chapter": "llminf-production",
     "verified": "2026-07-12",
     "source": "pypi.org/project/aiperf、github.com/ai-dynamo/aiperf",
     "recheck": "—"
    },
    {
     "text": "P/D 分离成大规模服务共识：Mooncake（FAST'25 最佳论文）、DistServe（OSDI'24）、开源 llm-d（K8s 系）",
     "chapter": "llminf-disagg",
     "verified": "2026-07-09",
     "source": "arXiv 2407.00079 等",
     "recheck": "—"
    },
    {
     "text": "成本量级参考：H100 级时租 $2–3/卡、70B FP8 双卡 ~3000 token/s、自建盈亏线利用率 ~40–50%、托管 API $2–5/百万输出 token",
     "chapter": "llminf-production",
     "verified": "2026-07-09",
     "source": "2026 年中多方评测量级归纳（讲义中已标注\"参考\"口径）",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "llminf-kv-budget",
     "to": "llm#llm-inference-kv",
     "why": "KV Cache「为什么存在」（机制）在 LLM 原理第 4 章，「怎么管好」（系统）在本章——互为前后篇，讲义内有承上启下页；2026-07-20 对话沉淀拆分互指：本章新增「资源账」3 页（系统面）↔ 对方第 4 章新增「窗口由什么决定／四堵墙」2 页（原理面）",
     "resolved": true
    },
    {
     "from": "llminf-anatomy",
     "to": "llm-training#llmtrain-overview",
     "why": "「训练一次性重投入 vs 推理持续账单」同一事实两侧；2030 推理算力 75% 预测两边同源引用",
     "resolved": true
    },
    {
     "from": "llminf-speculative",
     "to": "llm-training#llmtrain-reasoning",
     "why": "推理模型（RLVR）让 decode 负载暴涨十几倍，是推理优化 2026 成为刚需的直接原因",
     "resolved": true
    },
    {
     "from": "llminf-batching",
     "to": "agent#agent-context",
     "why": "Prefix Caching/RadixAttention 的最大受益者是多轮 Agent——上下文工程在推理侧的回报",
     "resolved": true
    },
    {
     "from": "llminf-kv-budget",
     "to": "rag#rag-what-why",
     "why": "长上下文 prefill 平方级+KV 线性级两头吃钱，是「1M 窗口不是 RAG 终结者」的推理侧论据",
     "resolved": true
    },
    {
     "from": "llminf-production",
     "to": "（候选）Evaluation",
     "why": "推理压测/SLO/goodput 这条线待未来 Evaluation 模块收编",
     "resolved": false
    },
    {
     "from": "llminf-kv-budget",
     "to": "ai-infra-compute#aic-hbm",
     "why": "KV Cache 显存账（机制）↔ HBM 硬件账（地基）：互为前后篇，2026-07-09 建 AI-Infra-Compute 时补",
     "resolved": true
    },
    {
     "from": "llminf-quant",
     "to": "ai-infra-compute#aic-gpu",
     "why": "量化落地 ↔ FP8/FP4 精度阶梯硬件前提，同源口径（2026-07-09 补）",
     "resolved": true
    },
    {
     "from": "llminf-disagg",
     "to": "ai-infra-compute#aic-storage",
     "why": "P/D 分离/KV 路由 ↔ KV Cache 外置存储：存储升级为推理性能部件（2026-07-09 补）",
     "resolved": true
    },
    {
     "from": "llminf-disagg",
     "to": "ai-infra-platform#aip-serving",
     "why": "P/D 分离/Dynamo/llm-d 机制在本模块，平台承载（编排/扩缩/路由）在 AI-Infra-Platform 第 7 章（2026-07-09 补）",
     "resolved": true
    },
    {
     "from": "llminf-production",
     "to": "ai-infra-platform#aip-observability",
     "why": "利用率/goodput/SLO 运营两侧互指（2026-07-09 补）",
     "resolved": true
    }
   ],
   "web": "./llm-inference/index.html",
   "questions": [
    {
     "id": "q-llm-inference-1",
     "q": "为什么模型回答是一个字一个字往外蹦？能不能一次出全文？",
     "added": "2026-07-09",
     "chapters": [
      "llminf-anatomy"
     ]
    },
    {
     "id": "q-llm-inference-2",
     "q": "我买了 8 张卡，为什么并发一高就排队？显存明明够装模型。",
     "added": "2026-07-09",
     "chapters": [
      "calc",
      "llminf-kv-budget"
     ]
    },
    {
     "id": "q-llm-inference-3",
     "q": "128K 长上下文这么好，为什么按输入收费还这么贵？",
     "added": "2026-07-09",
     "chapters": [
      "llminf-kv-budget"
     ]
    },
    {
     "id": "q-llm-inference-4",
     "q": "1000 个用户都开 1M 窗口，要备多少张卡？",
     "added": "2026-07-20",
     "chapters": [
      "llminf-kv-budget"
     ]
    },
    {
     "id": "q-llm-inference-5",
     "q": "vLLM 和 SGLang 到底选哪个？给句准话。",
     "added": "2026-07-12",
     "chapters": [
      "llminf-engines",
      "src-engines"
     ]
    },
    {
     "id": "q-llm-inference-6",
     "q": "量化会不会把模型「变笨」？我们业务敢用吗？",
     "added": "2026-07-09",
     "chapters": [
      "llminf-quant"
     ]
    },
    {
     "id": "q-llm-inference-7",
     "q": "投机解码听着像「猜答案」，会不会导致质量下降？",
     "added": "2026-07-09",
     "chapters": [
      "llminf-speculative"
     ]
    },
    {
     "id": "q-llm-inference-8",
     "q": "我们要支撑几千并发，直接堆卡行不行？",
     "added": "2026-07-09",
     "chapters": [
      "llminf-disagg",
      "llminf-production"
     ]
    },
    {
     "id": "q-llm-inference-9",
     "q": "你们能承诺多少并发？",
     "added": "2026-07-09",
     "chapters": [
      "llminf-production"
     ]
    },
    {
     "id": "q-llm-inference-10",
     "q": "别家报价比你们便宜一半，是不是你们黑？",
     "added": "2026-07-09",
     "chapters": [
      "llminf-production"
     ]
    }
   ]
  },
  {
   "id": "llm-training",
   "dir": "LLM-Training",
   "layer": "基础层",
   "created": "2026-07-08",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "llmtrain-overview",
     "no": "第 1 章",
     "title": "全景总览：从随机权重到可用助手",
     "verified": "2026-07-08"
    },
    {
     "id": "llmtrain-data",
     "no": "第 2 章",
     "title": "数据：模型的粮食",
     "verified": "2026-07-08"
    },
    {
     "id": "llmtrain-pretrain",
     "no": "第 3 章",
     "title": "预训练：压缩互联网",
     "verified": "2026-07-08"
    },
    {
     "id": "llmtrain-sft",
     "no": "第 4 章",
     "title": "后训练 I · SFT：教会听话",
     "verified": "2026-07-08"
    },
    {
     "id": "llmtrain-alignment",
     "no": "第 5 章",
     "title": "后训练 II · 对齐：教会分寸",
     "verified": "2026-07-08"
    },
    {
     "id": "llmtrain-reasoning",
     "no": "第 6 章",
     "title": "后训练 III · RLVR 与推理模型：教会思考",
     "verified": "2026-07-08"
    },
    {
     "id": "llmtrain-infra",
     "no": "第 7 章",
     "title": "训练基础设施与算力账",
     "verified": "2026-07-08"
    },
    {
     "id": "llmtrain-eval",
     "no": "第 8 章",
     "title": "评估与发布：怎么知道练成了",
     "verified": "2026-07-08"
    }
   ],
   "facts": [
    {
     "text": "后训练主流栈为 SFT →（可选 DPO）→ RLVR，GRPO/DAPO 一族为主力算法",
     "chapter": "llmtrain-reasoning",
     "verified": "2026-07-08",
     "source": "llm-stats.com 2026 后训练综述；arXiv 2407.16216",
     "recheck": "—"
    },
    {
     "text": "旗舰开源模型几乎全是稀疏 MoE（DeepSeek V4-Pro 1.6T/49B、Llama 4 Maverick 400B/17B、Qwen 3.5 397B/17B、Kimi K2.6 约 1T）",
     "chapter": "llmtrain-pretrain",
     "verified": "2026-07-08",
     "source": "OpenRouter 2026-06 开源模型盘点",
     "recheck": "—"
    },
    {
     "text": "FP8 混合精度训练进入主流实践（如 MiMo-V2.5-Pro 27T token FP8）",
     "chapter": "llmtrain-pretrain",
     "verified": "2026-07-08",
     "source": "OpenRouter 盘点、厂商技术报告",
     "recheck": "—"
    },
    {
     "text": "Muon/MuonClip：Kimi K2 15.5T token 零 spike；PyTorch 2.9 原生内置 torch.optim.Muon",
     "chapter": "llmtrain-pretrain",
     "verified": "2026-07-08",
     "source": "PyTorch 官方博客；arXiv 2507.20534",
     "recheck": "—"
    },
    {
     "text": "数据墙：互联网高质量文本存量约 10–50 万亿 token",
     "chapter": "llmtrain-data",
     "verified": "2026-07-08",
     "source": "多方分析（aimultiple、lifearchitect 等）",
     "recheck": "—"
    },
    {
     "text": "预测 2030 年推理算力占 AI 总算力约 75%",
     "chapter": "llmtrain-overview",
     "verified": "2026-07-08",
     "source": "行业分析（aibarcelona 等综述引用）",
     "recheck": "—"
    },
    {
     "text": "开源许可格局：Apache 2.0 成主流（Qwen/Mistral/Gemma），DeepSeek 用 MIT",
     "chapter": "llmtrain-eval",
     "verified": "2026-07-08",
     "source": "OpenRouter 2026-06 盘点",
     "recheck": "—"
    },
    {
     "text": "RLHF Book 2026-01 完成章节重组（对齐 Manning 印刷版），免费在线",
     "chapter": "书单",
     "verified": "2026-07-08",
     "source": "rlhfbook.com",
     "recheck": "—"
    },
    {
     "text": "Stanford CS336 Spring 2026 视频与作业全部公开",
     "chapter": "书单",
     "verified": "2026-07-08",
     "source": "cs336.stanford.edu",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "llmtrain-overview / llmtrain-pretrain",
     "to": "llm#llm-why-transformer",
     "why": "LLM 原理讲架构（发动机舱），本模块讲训练（流水线），互为前置；第 3 章「可并行」一页对应其第 1 章",
     "resolved": true
    },
    {
     "from": "llmtrain-sft",
     "to": "rag#rag-what-why",
     "why": "「微调 vs RAG」互为镜像：RAG 从应用侧答，本章从训练侧补全",
     "resolved": true
    },
    {
     "from": "llmtrain-reasoning",
     "to": "agent#agent-what-why",
     "why": "推理模型/RLVR 是「agent 为什么现在能成」的模型侧原因",
     "resolved": true
    },
    {
     "from": "llmtrain-eval",
     "to": "rag#rag-evaluation",
     "why": "模型本体评估 ↔ 检索质量评估，两条评估线互参",
     "resolved": true
    },
    {
     "from": "llmtrain-eval",
     "to": "agent#agent-eval-guardrails",
     "why": "模型本体评估 ↔ 智能体评估与护栏",
     "resolved": true
    },
    {
     "from": "llmtrain-eval",
     "to": "（候选）Evaluation",
     "why": "三条评估线待未来 Evaluation 模块收编成总纲",
     "resolved": false
    },
    {
     "from": "llmtrain-sft / llmtrain-alignment",
     "to": "fine-tuning#ft-methods / fine-tuning#ft-alignment",
     "why": "本模块讲原理，Fine-tuning 模块讲「拿自己数据落地」的工程实践（2026-07-09 建成，候选转正）",
     "resolved": true
    },
    {
     "from": "llmtrain-overview",
     "to": "llm-inference#llminf-anatomy",
     "why": "「训练一次性重投入 vs 推理持续账单」两侧互指；2030 推理算力 75% 预测两边同源引用（2026-07-09 补）",
     "resolved": true
    },
    {
     "from": "llmtrain-reasoning",
     "to": "llm-inference#llminf-speculative",
     "why": "RLVR 推理模型让 decode 负载暴涨，是推理优化成为刚需的原因；对方第 6 章以承上页回指本章（2026-07-09 补）",
     "resolved": true
    },
    {
     "from": "llmtrain-infra",
     "to": "ai-infra-compute#aic-scaleup / aic-scaleout",
     "why": "并行策略（TP/PP/EP）产生的通信量决定网络怎么建；本模块讲并行、AI-Infra-Compute 讲承载它的两级互联（2026-07-09 补）",
     "resolved": true
    },
    {
     "from": "llmtrain-infra",
     "to": "ai-infra-compute#aic-hbm",
     "why": "训练显存账（ZeRO/FSDP 切分）↔ HBM 硬件账；本模块讲切分、对方讲硬件地基（2026-07-09 补）",
     "resolved": true
    },
    {
     "from": "llmtrain-infra",
     "to": "ai-infra-platform#aip-scheduling / aip-faulttol",
     "why": "训练作业是集群调度与容错的头号负载；本模块讲并行怎么切，AI-Infra-Platform 讲作业怎么被调度、崩了怎么续（2026-07-09 补）",
     "resolved": true
    }
   ],
   "web": "./llm-training/index.html",
   "questions": [
    {
     "id": "q-llm-training-1",
     "q": "你们的模型到底是怎么训出来的？",
     "added": "2026-07-08",
     "chapters": [
      "llmtrain-overview"
     ]
    },
    {
     "id": "q-llm-training-2",
     "q": "训练一个大模型到底要多少钱多少卡？",
     "added": "2026-07-08",
     "chapters": [
      "calc6nd",
      "llmtrain-infra"
     ]
    },
    {
     "id": "q-llm-training-3",
     "q": "为什么 DeepSeek 能把训练成本压那么低？",
     "added": "2026-07-08",
     "chapters": [
      "llmtrain-pretrain"
     ]
    },
    {
     "id": "q-llm-training-4",
     "q": "MoE 模型报的 400B 参数，跟稠密 70B 怎么比？",
     "added": "2026-07-08",
     "chapters": [
      "llmtrain-pretrain"
     ]
    },
    {
     "id": "q-llm-training-5",
     "q": "我们只有几千条数据，够微调吗？",
     "added": "2026-07-08",
     "chapters": [
      "llmtrain-sft"
     ]
    },
    {
     "id": "q-llm-training-6",
     "q": "对齐会不会把模型调笨？",
     "added": "2026-07-08",
     "chapters": [
      "llmtrain-alignment"
     ]
    },
    {
     "id": "q-llm-training-7",
     "q": "推理模型和普通模型到底差在哪？",
     "added": "2026-07-08",
     "chapters": [
      "llmtrain-reasoning"
     ]
    },
    {
     "id": "q-llm-training-8",
     "q": "榜单分数能信吗？",
     "added": "2026-07-08",
     "chapters": [
      "llmtrain-eval"
     ]
    },
    {
     "id": "q-llm-training-9",
     "q": "我们该自建集群还是用云？",
     "added": "2026-07-13",
     "chapters": [
      "llmtrain-infra"
     ]
    }
   ]
  },
  {
   "id": "mcp",
   "dir": "MCP",
   "layer": "协议层",
   "created": "2026-07-08",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "mcp-what-why",
     "no": "第 1 章",
     "title": "是什么/为什么",
     "verified": "2026-07-08"
    },
    {
     "id": "mcp-protocol",
     "no": "第 2 章",
     "title": "协议解剖",
     "verified": "2026-07-08"
    },
    {
     "id": "mcp-transport",
     "no": "第 3 章",
     "title": "传输与演进",
     "verified": "2026-07-08"
    },
    {
     "id": "mcp-server",
     "no": "第 4 章",
     "title": "动手写 server",
     "verified": "2026-07-08"
    },
    {
     "id": "mcp-production",
     "no": "第 5 章",
     "title": "生产落地",
     "verified": "2026-07-08"
    },
    {
     "id": "mcp-security",
     "no": "第 6 章",
     "title": "安全",
     "verified": "2026-07-08"
    },
    {
     "id": "mcp-cheatsheet",
     "no": "第 7 章",
     "title": "售前速查（高频问题 / 上手排错 / 版本口径与串联；2026-07-11 补齐全库速查惯例）",
     "verified": "2026-07-11"
    }
   ],
   "facts": [
    {
     "text": "当前稳定版规范 2025-11-25",
     "chapter": "mcp-protocol",
     "verified": "2026-07-08",
     "source": "modelcontextprotocol.io 规范页",
     "recheck": "—"
    },
    {
     "text": "新版规范 2026-07-28 即将发布（RC 已锁定）：无状态核心、Extensions、Tasks 转为官方扩展（experimental core → extension，不入核心规范）、MCP Apps、授权加固、弃用政策（Roots/Sampling/Logging 首批）",
     "chapter": "mcp-transport",
     "verified": "2026-07-12",
     "source": "MCP 官方博客 RC 发布文",
     "recheck": "2026-07-28"
    },
    {
     "text": "官方 SDK Tier 1 为 TypeScript、Python、C#、Go（Tier 是支持等级承诺，不是安全认证）",
     "chapter": "mcp-server",
     "verified": "2026-07-12",
     "source": "modelcontextprotocol.io/docs/sdk",
     "recheck": "—"
    },
    {
     "text": "SDK 面向新规范的 beta 已发：Python v2.0.0b1（FastMCP 更名 MCPServer）、TS v2 拆包",
     "chapter": "mcp-server",
     "verified": "2026-07-08",
     "source": "MCP 官方博客 SDK beta 文",
     "recheck": "—"
    },
    {
     "text": "官方 Registry 仍 preview 未 GA，不支持私有 server（企业需自建）",
     "chapter": "mcp-production",
     "verified": "2026-07-08",
     "source": "registry 官方页",
     "recheck": "—"
    },
    {
     "text": "2026 年 1–4 月披露 40+ CVE；CVE-2025-6514（mcp-remote RCE）；MCPTox 工具投毒成功率 84.2%",
     "chapter": "mcp-security",
     "verified": "2026-07-08",
     "source": "dev.to 汇总、arXiv 2508.14925",
     "recheck": "—"
    },
    {
     "text": "治理归 AAIF（2025-12 捐赠，Linux Foundation 旗下），变更走 SEP 机制",
     "chapter": "mcp-what-why",
     "verified": "2026-07-08",
     "source": "aaif.io 官方博客",
     "recheck": "—"
    },
    {
     "text": "MCP 工具定义随每条消息进上下文（非每会话一次）；GitHub 官方 server 94 工具 ≈ 17,600 tokens，描述压缩后可降至约 3,900（低压缩）／约 500（最激进）",
     "chapter": "mcp-production",
     "verified": "2026-07-20",
     "source": "Atlassian 工程博客《MCP Compression》2026-03-29（未公布模型与计数方法）",
     "recheck": "2026-10-31"
    },
    {
     "text": "MCP 流量经网关一跳的额外延迟：加密迭代调至约 100 次后 1–2ms／会话；默认 10 万次 KDF 迭代下为数十毫秒",
     "chapter": "mcp-production",
     "verified": "2026-07-20",
     "source": "Envoy AI Gateway 官方基准 2025-12-08（MacBook Pro M1 八核、echo 工具、按会话计）",
     "recheck": "2026-10-31"
    }
   ],
   "edges": [
    {
     "from": "mcp-what-why",
     "to": "agent#agent-tools-mcp",
     "why": "MCP 是 Agent 工具接入的标准化层，Agent 第 4 章为入口视角",
     "resolved": true
    },
    {
     "from": "mcp-security",
     "to": "agent#agent-eval-guardrails",
     "why": "防护共识一致：最小权限、人工审批、持续监控",
     "resolved": true
    },
    {
     "from": "mcp-what-why",
     "to": "a2a#a2a-what-why",
     "why": "协议层双子：MCP 接工具（纵向）/ A2A 接 Agent（横向），双向互引「分工」",
     "resolved": true
    },
    {
     "from": "mcp-production",
     "to": "ai-gateway#gw-mcp",
     "why": "生产落地的治理面：MCP 流量的统一代理/发现/鉴权/限流/审计由网关承接（协议归本模块、治理归网关，双向互引）",
     "resolved": true
    },
    {
     "from": "mcp-security",
     "to": "security#sec-agentic",
     "why": "工具描述投毒与 MCP 供应链风险在 Security 第 4/5 章深化（本章讲协议侧防线，双向互引）",
     "resolved": true
    },
    {
     "from": "mcp-security",
     "to": "a2a#a2a-security",
     "why": "两协议安全共识对照：签名/最小权限/鉴权/opaque 边界（A2A 侧已有入边，此为回边）",
     "resolved": true
    }
   ],
   "web": "./mcp/index.html",
   "questions": [
    {
     "id": "q-mcp-1",
     "q": "MCP 和 Function Calling 到底什么关系，是不是替代？",
     "added": "2026-07-08",
     "chapters": [
      "mcp-what-why"
     ]
    },
    {
     "id": "q-mcp-2",
     "q": "这是不是 Anthropic 的私有协议，用了会被锁定吗？",
     "added": "2026-07-08",
     "chapters": [
      "mcp-what-why",
      "src-aaif"
     ]
    },
    {
     "id": "q-mcp-3",
     "q": "我们已经在用 Function Calling 了，还有必要上 MCP 吗？",
     "added": "2026-07-08",
     "chapters": [
      "boundary"
     ]
    },
    {
     "id": "q-mcp-4",
     "q": "能不能不让模型自己决定调用？我们不放心。",
     "added": "2026-07-20",
     "chapters": [
      "mcp-protocol"
     ]
    },
    {
     "id": "q-mcp-5",
     "q": "月底新版发布，我现在的 server 要立刻改代码吗？",
     "added": "2026-07-08",
     "chapters": [
      "mcp-transport",
      "src-rc"
     ]
    },
    {
     "id": "q-mcp-6",
     "q": "开发一个 MCP server 到底要多少工作量？",
     "added": "2026-07-08",
     "chapters": [
      "mcp-server"
     ]
    },
    {
     "id": "q-mcp-7",
     "q": "员工乱接外面的 server 怎么治？",
     "added": "2026-07-08",
     "chapters": [
      "mcp-production",
      "mcp-security"
     ]
    },
    {
     "id": "q-mcp-8",
     "q": "我们内部系统的 server 能放到官方 Registry 吗？",
     "added": "2026-07-08",
     "chapters": [
      "mcp-production",
      "src-registry"
     ]
    },
    {
     "id": "q-mcp-9",
     "q": "MCP 出了这么多 CVE，还能用吗？",
     "added": "2026-07-08",
     "chapters": [
      "mcp-security",
      "src-cve",
      "src-mcptox"
     ]
    },
    {
     "id": "q-mcp-10",
     "q": "上线之后出了问题，怎么定位是谁的责任？",
     "added": "2026-07-20",
     "chapters": [
      "mcp-production",
      "wire"
     ]
    }
   ]
  },
  {
   "id": "model-landscape",
   "dir": "Model-Landscape",
   "layer": "解决方案层",
   "created": "2026-07-10",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "ml-map",
     "no": "第 1 章",
     "title": "全景地图（三大阵营 / 两个市场 / 一年三变局）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-closed",
     "no": "第 2 章",
     "title": "闭源旗舰家族图谱（五张名片 + 对比总表）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-open",
     "no": "第 3 章",
     "title": "开放权重格局（中国四强榜首 / 西方线 / 追平叙事）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-china",
     "no": "第 4 章",
     "title": "中国格局与豆包定位（四强横评 / 豆包家族 / 场景口径）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-license",
     "no": "第 5 章",
     "title": "许可证与合规边界（open weight vs open source / 三级分类）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-price",
     "no": "第 6 章",
     "title": "价格带与成本工程（光谱 / 三档制 / 缓存经济学）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-capability",
     "no": "第 7 章",
     "title": "能力矩阵与推理模型（窗口 / 模态 / 思考预算 / overthinking）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-selection",
     "no": "第 8 章",
     "title": "选型方法论（多模型默认解 / 三层路由 / 两道防线）",
     "verified": "2026-07-10"
    },
    {
     "id": "ml-platforms",
     "no": "第 9 章",
     "title": "国内平台格局（方舟/百炼/千帆/腾讯四平台画像、货架哲学、价格锚点、选型三问）",
     "verified": "2026-07-17"
    },
    {
     "id": "ml-cheatsheet",
     "no": "第 10 章",
     "title": "售前速查（总表 / 价格卡 / 许可证卡 / 保鲜声明 / 串联）",
     "verified": "2026-07-10"
    }
   ],
   "facts": [
    {
     "text": "GPT-5.6 家族 2026-07-09 GA：Sol $5/$30、Terra $2.50/$15、Luna $1/$6（每百万 token 输入/输出）；缓存读 -90%、写 1.25×",
     "chapter": "ml-closed / ml-price",
     "verified": "2026-07-10",
     "source": "OpenAI 官方 / aipricing.guru",
     "recheck": "—"
    },
    {
     "text": "Claude 5 家族：Fable 5（Mythos 级、1M 上下文/128K 输出）、Mythos 5 限量、Opus 4.8、Sonnet 5 尝鲜价 $2/$10（至 2026-08-31，后 $3/$15）；Fable/Mythos 出口管制风波后 2026-07-01 恢复",
     "chapter": "ml-closed",
     "verified": "2026-07-10",
     "source": "Anthropic 官方 docs / ghacks",
     "recheck": "2026-08-31"
    },
    {
     "text": "企业 LLM 支出份额（Menlo）：Anthropic 40% / OpenAI 27% / Google 21%；ChatGPT 消费份额约 74%、日 25 亿+ prompts；企业支出 $8.4B、年底看 $15B；Claude Code 年化 $1B、企业编码 54%",
     "chapter": "ml-map",
     "verified": "2026-07-10",
     "source": "Menlo 报告 / officechai / aimultiple",
     "recheck": "—"
    },
    {
     "text": "Gemini 3.1 Pro（推理/长视频旗舰、旗舰中 API 最低价）；Flash-Lite $0.10/$0.40 为最低闭源档",
     "chapter": "ml-closed / ml-price",
     "verified": "2026-07-10",
     "source": "benchlm / cloudzero 价格页",
     "recheck": "—"
    },
    {
     "text": "Grok 4.3：$1.25/$2.50、缓存输入 $0.20（比上代降 40–60%）；AA 智能指数 53；2026-06-15 上 Bedrock（第三家独立实验室）；SOC2/HIPAA",
     "chapter": "ml-closed",
     "verified": "2026-07-10",
     "source": "VentureBeat / digitalapplied",
     "recheck": "—"
    },
    {
     "text": "Meta 转向：Behemoth（2T）实质搁置；Muse Spark 2026-04-08 发布（首个闭源 API-only）；Llama 4 Scout（109B/17B 激活、10M ctx）与 Maverick（400B/17B、1M）成最后开放版本",
     "chapter": "ml-closed / ml-open",
     "verified": "2026-07-10",
     "source": "digitimes / serenitiesai / ai.meta.com",
     "recheck": "—"
    },
    {
     "text": "开源榜首（2026-07 快照）：DeepSeek V4 Pro 综合 87（SWE-bench Verified 80.6% 追平闭源；MIT）、GLM-5.1 83（MIT）、Kimi K2.6（AA 54，开源第一/总榜第四）、Qwen3.5 397B（122B/激活 10B 超 GPT-5-mini）",
     "chapter": "ml-open",
     "verified": "2026-07-10",
     "source": "benchlm / wavect 横评",
     "recheck": "—"
    },
    {
     "text": "GLM-5 为首个完全用华为昇腾训练的前沿模型（零英伟达）",
     "chapter": "ml-open / ml-china",
     "verified": "2026-07-10",
     "source": "国产四强横评（qiniu 2026-06）",
     "recheck": "—"
    },
    {
     "text": "国产四强（2026-06 横评口径）：GLM 5.2 / Kimi K2（agent swarm 百级并行）/ Qwen3（0.6B–397B 谱系）/ DeepSeek V4（API 便宜 20–50 倍）——各至少一个主流基准超国际闭源",
     "chapter": "ml-china",
     "verified": "2026-07-10",
     "source": "qiniu 横评 / aitoolcn",
     "recheck": "—"
    },
    {
     "text": "豆包：2.1 Pro 2026-06-23 发布（¥6/¥30、缓存命中 ¥1.2）；2.1 Turbo 半价；Seed-Evolving 月更 2–4 次；Seed-2.0-lite（2026-05，家族首个原生统一全模态）；累计 tokens 180 万亿+",
     "chapter": "ml-china",
     "verified": "2026-07-10",
     "source": "新华网 / 火山方舟价格页 / 网易",
     "recheck": "—"
    },
    {
     "text": "许可证格局：OSAID v1.0（2024-10）口径下主流\"开源\"模型均为 open weight；DeepSeek/GLM-5.1 = MIT、Qwen3 主系 = Apache 2.0、Mistral Large 3/Small 4 转 Apache 2.0；Llama 社区证含 700M MAU 帽 + 欧盟条款",
     "chapter": "ml-license",
     "verified": "2026-07-10",
     "source": "qubittool / HF blog / LICENSE 原文",
     "recheck": "—"
    },
    {
     "text": "价格光谱：地板 DeepSeek V4 Flash $0.14/$0.28、Gemini Flash-Lite $0.10/$0.40；超旗舰 GPT-5.4 Pro $30/$180；整体对比 2025 降 30–60%",
     "chapter": "ml-price",
     "verified": "2026-07-10",
     "source": "pricepertoken / cloudzero / tldl",
     "recheck": "—"
    },
    {
     "text": "小模型：Phi-4 / Gemma 4（26B MoE 激活 ~4B；E2B 2.3B 有效参数 4GB 内存）/ SmolLM-3 为三大部署家族；sub-10B 常规超 2024 版 GPT-4",
     "chapter": "ml-map / ml-capability",
     "verified": "2026-07-10",
     "source": "bentoml / callsphere 2026",
     "recheck": "—"
    },
    {
     "text": "推理模型：思考预算两旋钮（Anthropic budget_tokens / Gemini thinkingBudget）；L1 可控 vs L2 自适应（arXiv 2507.02076）；overthinking 实证——超临界预算准确率下降（arXiv 2506.04210）",
     "chapter": "ml-capability",
     "verified": "2026-07-10",
     "source": "arXiv 两篇（书单列官方链接）",
     "recheck": "—"
    },
    {
     "text": "选型实践：Walmart Code Puppy 跨 GPT/Claude/Gemini 动态路由；ServiceNow 2026-01 同签 OpenAI+Anthropic；Gartner 预计 2028 年 70% 多模型组织用 AI 网关（2024 <5%）",
     "chapter": "ml-selection",
     "verified": "2026-07-10",
     "source": "chatgptaihub / datatobiz / Gartner 转引",
     "recheck": "—"
    },
    {
     "text": "榜单防线：Leaderboard Illusion（私测多变体择优，arXiv 2504.20879）；MMLU 类饱和 88%+ 无区分度（与 evaluation 模块同源口径）",
     "chapter": "ml-selection",
     "verified": "2026-07-10",
     "source": "arXiv（书单列官方链接）/ evaluation 模块",
     "recheck": "—"
    },
    {
     "text": "火山方舟：Doubao-Seed-2.1 Pro（06-23）¥6/¥30、缓存 ¥1.2，按输入长度分段计价；Coding Plan 订阅 Pro 首月 ¥44.91 续费 5 折（含 Seed-2.0-Code/DeepSeek V3.2/Kimi K2.5/GLM-4.7）；企业版支持私有化接入",
     "chapter": "ml-platforms",
     "verified": "2026-07-17",
     "source": "火山方舟官网/计费文档",
     "recheck": "2026-08-31"
    },
    {
     "text": "阿里百炼：150+ 模型（Qwen 全系+DeepSeek/GLM/Kimi/MiniMax/Llama）；Qwen3-Max（≤32K）¥2.5/¥10、Qwen3.5-Plus（≤128K）¥0.8/¥4.8；Batch 批量一律 5 折；2026-05 大版本上架 Qwen3.7 全系与百万上下文模型",
     "chapter": "ml-platforms",
     "verified": "2026-07-17",
     "source": "help.aliyun.com 模型价格/百炼平台页",
     "recheck": "2026-08-31"
    },
    {
     "text": "百度千帆：文心 5.0 正式版 2026-01-22（2.4 万亿参数原生全模态）、5.1（2026-05，厂商称搜索登顶国内/预训练成本 6%——厂商口径）；150+ SOTA 统一纳管；平台 130 万 Agents、工具日调用超千万次",
     "chapter": "ml-platforms",
     "verified": "2026-07-17",
     "source": "新华网/量子位/cloud.baidu.com",
     "recheck": "2026-08-31"
    },
    {
     "text": "腾讯：混元 2.0 API ¥0.8/¥2、Hunyuan Standard 输入 ¥0.3；智能体开发平台 ADP 订阅制；三方模型可切换（MiniMax-M2.x/Kimi-K2.5/GLM-5 系/DeepSeek-V4 系）",
     "chapter": "ml-platforms",
     "verified": "2026-07-17",
     "source": "腾讯云计费与产品文档",
     "recheck": "2026-08-31"
    }
   ],
   "edges": [
    {
     "from": "ml-selection",
     "to": "evaluation#eval-benchmarks",
     "why": "榜单饱和与 Leaderboard Illusion 的完整弹药在 Evaluation 第 2 章；自建评估集方法在其第 5 章——选型终审依赖它（双向）",
     "resolved": true
    },
    {
     "from": "ml-selection / ml-price",
     "to": "ai-gateway#gw-route / ai-gateway#gw-cost",
     "why": "三层路由与成本治理的工程落地件；Gartner 网关趋势同源（双向）",
     "resolved": true
    },
    {
     "from": "ml-map / ml-open",
     "to": "llm#llm-architecture",
     "why": "MoE 稀疏激活是「开源追平」与三档定价的架构根源",
     "resolved": true
    },
    {
     "from": "ml-capability",
     "to": "llm-inference#llminf-batching",
     "why": "思考预算烧的是 decode；长上下文成本机制在 LLM-Inference",
     "resolved": true
    },
    {
     "from": "ml-capability",
     "to": "rag#rag-what-why",
     "why": "「1M 窗口 vs RAG」：窗口≠有效窗口，权限/新鲜度/成本三关——与 RAG 第 1 章互为弹药",
     "resolved": true
    },
    {
     "from": "ml-open / ml-license",
     "to": "fine-tuning#ft-cloud",
     "why": "开放权重 + 宽松许可证是私有化微调的前提",
     "resolved": true
    },
    {
     "from": "ml-platforms",
     "to": "security#sec-china",
     "why": "平台合规配套（备案材料/护栏）与「私有化不免合规」口径在 Security 第 8 章中国监管合规展开（讲义内已互引）",
     "resolved": true
    },
    {
     "from": "ml-platforms",
     "to": "ai-gateway#gw-unify",
     "why": "「平台锁定」的解法=兼容层/网关保切换能力，机制在 AI-Gateway 统一接入章",
     "resolved": true
    },
    {
     "from": "ml-platforms",
     "to": "multimodal#mm-fusion",
     "why": "文心 5.0 原生全模态 vs 拼管线之争的机制展开在 Multimodal 第 3 章",
     "resolved": true
    },
    {
     "from": "ml-cheatsheet",
     "to": "solution-patterns#sp-method",
     "why": "「模型是可替换件」的方案叙事在 SP 第 2 章；各场景章的模型选型格子引用本模块",
     "resolved": true
    },
    {
     "from": "ml-china",
     "to": "（候选）中国合规章",
     "why": "国内商用备案与内容合规——Security 增章待用户决策",
     "resolved": false
    }
   ],
   "web": "./model-landscape/index.html",
   "questions": [
    {
     "id": "q-model-landscape-1",
     "q": "现在到底谁家模型最强？",
     "added": "2026-07-10",
     "chapters": [
      "ml-map"
     ]
    },
    {
     "id": "q-model-landscape-2",
     "q": "GPT 和 Claude 到底该选哪个？",
     "added": "2026-07-10",
     "chapters": [
      "ml-closed",
      "ml-selection"
     ]
    },
    {
     "id": "q-model-landscape-3",
     "q": "开源模型和 GPT 们到底还差多少？",
     "added": "2026-07-10",
     "chapters": [
      "ml-open"
     ]
    },
    {
     "id": "q-model-landscape-4",
     "q": "Llama 不是开源吗，为什么法务不让我们用？",
     "added": "2026-07-10",
     "chapters": [
      "ml-license"
     ]
    },
    {
     "id": "q-model-landscape-5",
     "q": "用开源模型微调出来的模型算谁的？",
     "added": "2026-07-10",
     "chapters": [
      "ml-license"
     ]
    },
    {
     "id": "q-model-landscape-6",
     "q": "为什么不全用最便宜的 DeepSeek？",
     "added": "2026-07-10",
     "chapters": [
      "ml-price",
      "ml-selection"
     ]
    },
    {
     "id": "q-model-landscape-7",
     "q": "现在签一年合同，明年价格跌了怎么办？",
     "added": "2026-07-10",
     "chapters": [
      "ml-price"
     ]
    },
    {
     "id": "q-model-landscape-8",
     "q": "上下文窗口越大越好吗？",
     "added": "2026-07-10",
     "chapters": [
      "ml-capability"
     ]
    },
    {
     "id": "q-model-landscape-9",
     "q": "评测榜单第一的模型，为什么你们不推荐？",
     "added": "2026-07-10",
     "chapters": [
      "ml-selection",
      "src-arxiv"
     ]
    },
    {
     "id": "q-model-landscape-10",
     "q": "国内这几个平台，到底选哪个？",
     "added": "2026-07-17",
     "chapters": [
      "ml-platforms"
     ]
    },
    {
     "id": "q-model-landscape-11",
     "q": "平台会不会把我们锁死？",
     "added": "2026-07-17",
     "chapters": [
      "ml-platforms",
      "ml-selection"
     ]
    }
   ]
  },
  {
   "id": "multimodal",
   "dir": "Multimodal",
   "layer": "应用模式层",
   "created": "2026-07-09",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "mm-what-why",
     "no": "第 1 章",
     "title": "是什么 / 为什么（感知面全景、理解 vs 生成）",
     "verified": "2026-07-09"
    },
    {
     "id": "mm-encoder",
     "no": "第 2 章",
     "title": "机器怎么「看」（ViT / CLIP / 编码器选型）",
     "verified": "2026-07-09"
    },
    {
     "id": "mm-fusion",
     "no": "第 3 章",
     "title": "模态怎么「拼」（三路线 + 原生 vs 拼管线）",
     "verified": "2026-07-09"
    },
    {
     "id": "mm-understanding",
     "no": "第 4 章",
     "title": "理解侧能力盘点（图 / 文档 / 视频 / 语音 + 格局）",
     "verified": "2026-07-09"
    },
    {
     "id": "mm-generation",
     "no": "第 5 章",
     "title": "生成侧能力盘点（扩散 vs 自回归 / 视频 / 语音）",
     "verified": "2026-07-09"
    },
    {
     "id": "mm-selection",
     "no": "第 6 章",
     "title": "选型与动手做（成本 / 延迟 / 精度、调用、部署）",
     "verified": "2026-07-09"
    },
    {
     "id": "mm-production",
     "no": "第 7 章",
     "title": "生产落地与坑（成本 / 幻觉 / 评估 / 安全）",
     "verified": "2026-07-09"
    },
    {
     "id": "mm-voice-realtime",
     "no": "第 8 章",
     "title": "语音与实时交互（延迟预算 / 级联 vs 端到端 / 打断 / RTC 框架）",
     "verified": "2026-07-10"
    },
    {
     "id": "mm-video-generation",
     "no": "第 9 章",
     "title": "视频生成（四家旗舰格局、按秒计价成本账、工作流与标识合规）",
     "verified": "2026-07-17"
    },
    {
     "id": "mm-cheatsheet",
     "no": "第 10 章",
     "title": "售前速查（术语 / 决策树 / 串联地图）",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "闭源旗舰原生多模态：GPT-5（统一路由）/ Gemini 2.5 Pro（原生图音视频 + 1M~2M 上下文 + MoE）/ Claude 4.5（视觉 + 1M）；test-time compute「thinking」成主流",
     "chapter": "mm-understanding",
     "verified": "2026-07-09",
     "source": "Pluralsight / Shakudo 2026 模型盘点",
     "recheck": "2026-08-01"
    },
    {
     "text": "开源 VLM SOTA：InternVL3-78B（MIT）MMMU≈72.2%；Qwen2.5-VL-72B MMMU≈70.2%/OCRBench≈888；Qwen3-VL 文档基准最强开源",
     "chapter": "mm-understanding",
     "verified": "2026-07-09",
     "source": "BentoML / DataCamp / Spheron 2026",
     "recheck": "2026-08-01"
    },
    {
     "text": "原生图像生成两大流派：扩散（FLUX.2 / Midjourney）vs 自回归（GPT Image 2〔2026-04〕、Nano Banana 2 = Gemini 3.1 Flash Image〔2026-02〕、Luma）",
     "chapter": "mm-generation",
     "verified": "2026-07-09",
     "source": "Modelize / DualView / Curify 2026",
     "recheck": "2026-08-01"
    },
    {
     "text": "GPT Image 2 全新自回归架构，比前代快 3–5×，多约束指令≈98% 准确、文字渲染近字符级",
     "chapter": "mm-generation",
     "verified": "2026-07-09",
     "source": "nanobananafree / Picsart 2026",
     "recheck": "2026-08-01"
    },
    {
     "text": "开源 VLM 可用 vLLM / SGLang 在 GPU 云自部署（Qwen3-VL / Llama 4 Scout / InternVL3）",
     "chapter": "mm-selection",
     "verified": "2026-07-09",
     "source": "Spheron 部署指南 2026",
     "recheck": "—"
    },
    {
     "text": "理解侧主基准：MMMU（多学科理解）、OCRBench / DocVQA（文档）、Video-MME（视频）",
     "chapter": "mm-production",
     "verified": "2026-07-09",
     "source": "2026 VLM 评测综述",
     "recheck": "—"
    },
    {
     "text": "语音延迟口径：人类换话空隙 300–500ms；级联生产目标 P50 <1.5s；端到端标杆 <800ms（gpt-realtime 实测量级）；>1.5s 用户判定「坏了」",
     "chapter": "mm-voice-realtime",
     "verified": "2026-07-10",
     "source": "softcery / telnyx 2026 横评",
     "recheck": "—"
    },
    {
     "text": "级联时延拆帐：ASR 100–300ms + LLM 350–1000ms + TTS 90–200ms + 网络 50–200ms；2026 企业生产以级联为主（可审计 / 可换供应商）",
     "chapter": "mm-voice-realtime",
     "verified": "2026-07-10",
     "source": "softcery / speko.ai / modulate",
     "recheck": "—"
    },
    {
     "text": "端到端 S2S 格局：OpenAI gpt-realtime 家族（GA、128K、工具调用入音频环路）/ Gemini 3.1 Flash Live（2026-03-26，~200ms 首响、200+ 语言）/ Qwen3-Omni 系开源（113 语种 ASR、可自部署）/ Kyutai Moshi（全双工先驱）",
     "chapter": "mm-voice-realtime",
     "verified": "2026-07-10",
     "source": "flowtivity / QwenLM GitHub / marktechpost",
     "recheck": "—"
    },
    {
     "text": "语音成本：级联 $0.01–0.17/分钟；gpt-realtime 未缓存实测 $0.18–0.46/分钟、开缓存 $0.05–0.10（音频输入缓存折扣 ~99%）；gpt-realtime-mini 约便宜 60%",
     "chapter": "mm-voice-realtime",
     "verified": "2026-07-10",
     "source": "hackernoon 4000 会话实测 / OpenAI 定价页",
     "recheck": "—"
    },
    {
     "text": "语音框架：Pipecat v1.0（2026-04，帧管线）/ LiveKit Agents（房间模型）；实测端到端 750–950ms 同量级；Vapi / Retell 为托管层",
     "chapter": "mm-voice-realtime",
     "verified": "2026-07-10",
     "source": "webrtc.ventures 2026-03 / cekura / f22labs",
     "recheck": "—"
    },
    {
     "text": "视频生成格局（多方评测交叉）：Seedance 2.0（≤15s/1080p、原生音视频同步、参考输入 12 文件、Fast $0.022/秒）；Sora 2（故事板最长 25s）；可灵 3.0（$0.029/秒、原生 4K@60fps）；Veo 3.1（$0.75/秒、电影级+原生音频）——价差约 34 倍",
     "chapter": "mm-video-generation",
     "verified": "2026-07-17",
     "source": "devtk.ai/atlascloud/laozhang/opencreator 2026 横评",
     "recheck": "2026-08-31"
    },
    {
     "text": "即梦消费端口径：注册送 260 积分、5 秒视频约 20 积分（新用户约 13 次免费生成）",
     "chapter": "mm-video-generation",
     "verified": "2026-07-17",
     "source": "即梦平台/评测转述",
     "recheck": "2026-08-31"
    }
   ],
   "edges": [
    {
     "from": "mm-understanding",
     "to": "rag#rag-multimodal",
     "why": "本模块讲「模型多模态能力」↔ RAG 第 11 章讲「多模态内容怎么检索」，互为上下游；RAG 第 11 章已加回指页（2026-07-10），双向互指",
     "resolved": true
    },
    {
     "from": "mm-fusion",
     "to": "rag#rag-multimodal",
     "why": "「原生 vs 拼管线」的模型侧取舍 ↔ 多模态 RAG 的三条检索路线，同一取舍两个视角",
     "resolved": true
    },
    {
     "from": "mm-what-why",
     "to": "agent#agent-components",
     "why": "多模态感知（能看屏幕 / 图表）是 Agent computer use 的前提，视觉作为 Agent 的新「工具输入」；Agent 第 2 章已加回指页（2026-07-10），双向互指",
     "resolved": true
    },
    {
     "from": "mm-encoder",
     "to": "llm#llm-attention-qkv",
     "why": "ViT 与 Transformer 同源、注意力机制复用；视觉编码器 = Transformer 用在图像 patch 上；LLM 第 2 章已加「承上启下」回指页（2026-07-10），双向互指",
     "resolved": true
    },
    {
     "from": "mm-production",
     "to": "evaluation",
     "why": "多模态评估基准（MMMU / OCRBench / DocVQA / Video-MME）↔ Evaluation 模块判分方法与自建评估集",
     "resolved": true
    },
    {
     "from": "mm-production",
     "to": "security",
     "why": "跨模态提示注入（图 / 文档里藏指令）↔ Security 模块提示注入防护，注入入口从文本扩展到图像",
     "resolved": true
    },
    {
     "from": "mm-selection",
     "to": "llm-inference",
     "why": "视觉 token 膨胀让 prefill 变重、显存占用增大 ↔ LLM-Inference 的 prefill/decode 与 KV Cache",
     "resolved": true
    },
    {
     "from": "mm-voice-realtime",
     "to": "llm-inference#llminf-batching",
     "why": "语音链路延迟大头 = LLM 首 token；首 token 优化（批处理 / KV 缓存 / 流式）机制在 LLM-Inference 展开",
     "resolved": true
    },
    {
     "from": "mm-voice-realtime",
     "to": "agent#agent-components",
     "why": "语音是 Agent 的「耳与嘴」：实时链路为语音 Agent 提供交互层，Agent 侧编排与工具调用不变",
     "resolved": true
    },
    {
     "from": "mm-voice-realtime",
     "to": "solution-patterns#sp-customer-service",
     "why": "语音客服场景的方案视角（分流漏斗 / 解决率口径）在 Solution-Patterns 第 3 章展开（模块 2026-07-10 建成，原「候选」补实）；数字人场景另接 sp-digital-human",
     "resolved": true
    },
    {
     "from": "mm-video-generation",
     "to": "security#sec-china",
     "why": "AI 生成视频的标识义务与执法口径在 Security 第 8 章中国监管合规（讲义内已互引）",
     "resolved": true
    },
    {
     "from": "mm-video-generation",
     "to": "solution-patterns#sp-content-gen",
     "why": "营销素材工厂场景图纸在 SP 第 5 章；本章供「视频积木」的能力与成本口径",
     "resolved": true
    }
   ],
   "web": "./multimodal/index.html",
   "questions": [
    {
     "id": "q-multimodal-1",
     "q": "我的场景到底要不要上多模态？",
     "added": "2026-07-09",
     "chapters": [
      "triage",
      "mm-what-why"
     ]
    },
    {
     "id": "q-multimodal-2",
     "q": "该用原生多模态，还是自己拼 OCR + LLM？",
     "added": "2026-07-09",
     "chapters": [
      "mm-fusion"
     ]
    },
    {
     "id": "q-multimodal-3",
     "q": "传一张图到底要多少钱？为什么比文本慢？",
     "added": "2026-07-09",
     "chapters": [
      "mm-selection"
     ]
    },
    {
     "id": "q-multimodal-4",
     "q": "开源 VLM 能打过闭源旗舰吗？",
     "added": "2026-07-09",
     "chapters": [
      "mm-understanding"
     ]
    },
    {
     "id": "q-multimodal-5",
     "q": "模型看图会不会瞎编、看错？",
     "added": "2026-07-09",
     "chapters": [
      "mm-production"
     ]
    },
    {
     "id": "q-multimodal-6",
     "q": "生成图片用扩散还是自回归？",
     "added": "2026-07-09",
     "chapters": [
      "mm-generation"
     ]
    },
    {
     "id": "q-multimodal-7",
     "q": "端到端语音又快又自然，为什么还推级联？",
     "added": "2026-07-10",
     "chapters": [
      "mm-voice-realtime"
     ]
    },
    {
     "id": "q-multimodal-8",
     "q": "语音客服的延迟能压到多少？",
     "added": "2026-07-10",
     "chapters": [
      "mm-voice-realtime"
     ]
    },
    {
     "id": "q-multimodal-9",
     "q": "视频生成到底能不能商用了？",
     "added": "2026-07-17",
     "chapters": [
      "mm-video-generation"
     ]
    }
   ]
  },
  {
   "id": "pe",
   "dir": "Prompt-Engineering",
   "layer": "基础层",
   "created": "2026-07-09",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "pe-what-why",
     "no": "第 1 章",
     "title": "是什么 / 为什么",
     "verified": "2026-07-09"
    },
    {
     "id": "pe-anatomy",
     "no": "第 2 章",
     "title": "提示词解剖（角色/四要素/分隔符）",
     "verified": "2026-07-09"
    },
    {
     "id": "pe-core-techniques",
     "no": "第 3 章",
     "title": "核心技巧（zero/few-shot、CoT、结构化输出、清晰指令）",
     "verified": "2026-07-09"
    },
    {
     "id": "pe-advanced-reasoning",
     "no": "第 4 章",
     "title": "进阶推理与编排（自洽性、ReAct、提示词链、推理模型时代）",
     "verified": "2026-07-09"
    },
    {
     "id": "pe-engineering",
     "no": "第 5 章",
     "title": "工程化与自动优化（版本化、评估驱动、DSPy、缓存）",
     "verified": "2026-07-09"
    },
    {
     "id": "pe-security",
     "no": "第 6 章",
     "title": "安全与风险（提示词注入、越狱、OWASP、纵深防御）",
     "verified": "2026-07-09"
    },
    {
     "id": "pe-presales-map",
     "no": "第 7 章",
     "title": "售前视角收拢（问题速查、选型树、上云全景、串联）",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "推理模型（GPT-5、Claude 4.7 扩展思考、Gemini 3 Pro deep think、DeepSeek R1）已把 CoT 内建，不再需手写「一步步思考」；重点转为控推理预算 / effort。OpenAI 区分推理模型（少给显式步骤）vs 通用 GPT（需更明确指令）",
     "chapter": "pe-advanced-reasoning",
     "verified": "2026-07-09",
     "source": "raw-data/2026-07-09-联网核实笔记（futureagi、stevekinney、OpenAI/Anthropic 文档综述）",
     "recheck": "—"
    },
    {
     "text": "DSPy 2.x 默认优化器 MIPROv2（贝叶斯联合优化指令+示例，结构化任务较手写 +10~40%）；GEPA 反射式进化优化器较 MIPROv2 +13%、rollout 少 35×，ICLR 2026 oral",
     "chapter": "pe-engineering",
     "verified": "2026-07-09",
     "source": "futureagi（DSPy optimizers 2026）、morphllm（GEPA）",
     "recheck": "—"
    },
    {
     "text": "提示词缓存：截至 2026-06 三大厂缓存读取价约为基础输入价 0.1×（约 1 折，省约 90%）；OpenAI 自动（≥1024 token）、Anthropic 手动 cache_control 且写入加价（5min 1.25×/1h 2×）、Gemini 显式+按小时存储计费",
     "chapter": "pe-engineering",
     "verified": "2026-07-20",
     "source": "leanlm、prompthub、ofox.ai、artificialanalysis；2026-07-20 对照 Anthropic 官方定价文档修正折扣方向（原核实笔记为\"省约 90%\"，成品曾误写成\"打 9 折\"）",
     "recheck": "—"
    },
    {
     "text": "各云提示词服务：AWS Bedrock Prompt Management + Advanced Prompt Optimization（改写/迁移+评估环）；Vertex AI / Gemini Enterprise Prompt Optimizer；Azure AI Foundry Prompt Flow",
     "chapter": "pe-engineering / pe-presales-map",
     "verified": "2026-07-09",
     "source": "aws.amazon.com/bedrock/prompt-management、AWS News Blog、InfoWorld",
     "recheck": "—"
    },
    {
     "text": "OWASP Top 10 for LLM Applications 2025：LLM01 提示词注入连续两版第一；RAG 与微调都不能根治注入，只能纵深防御",
     "chapter": "pe-security",
     "verified": "2026-07-09",
     "source": "OWASP GenAI（https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/）、mend/aembit/promptfoo 解读",
     "recheck": "—"
    },
    {
     "text": "云护栏：AWS Bedrock Guardrails、Azure AI Content Safety、Google Vertex 安全过滤 / Model Armor",
     "chapter": "pe-security",
     "verified": "2026-07-09",
     "source": "各云官方文档",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "pe-what-why",
     "to": "fine-tuning#ft-when",
     "why": "选型边界：提示词到头了、才上微调；对方第 1 章讲「何时微调 vs 提示词/RAG」，互为参照",
     "resolved": true
    },
    {
     "from": "pe-what-why",
     "to": "rag#rag-what-why",
     "why": "「提示词 vs RAG」的选型边界：补知识用 RAG，改行为用提示词",
     "resolved": true
    },
    {
     "from": "pe-anatomy",
     "to": "llm#llm-inference-kv",
     "why": "提示词为什么有效，根子在上下文窗口与注意力——上下文工程的「物理学」（讲义第 2/4 章埋点）",
     "resolved": true
    },
    {
     "from": "pe-advanced-reasoning",
     "to": "agent#agent-context",
     "why": "ReAct、上下文工程就是提示词技巧在「工具循环」里的应用；Agent 第 5 章为工程化展开",
     "resolved": true
    },
    {
     "from": "pe-engineering",
     "to": "evaluation#eval-methods",
     "why": "评估驱动的提示词优化直接用 Evaluation 的判分四法 / LLM-as-a-Judge（eval-judge）",
     "resolved": true
    },
    {
     "from": "pe-security",
     "to": "security（候选）",
     "why": "提示词注入是未来 Security 模块的一块",
     "resolved": false
    }
   ],
   "web": "./prompt-engineering/index.html",
   "questions": [
    {
     "id": "q-pe-1",
     "q": "提示词工程会不会很快就没用了？",
     "added": "2026-07-09",
     "chapters": [
      "pe-what-why",
      "pe-advanced-reasoning"
     ]
    },
    {
     "id": "q-pe-2",
     "q": "怎么保证输出永远是合法 JSON？",
     "added": "2026-07-09",
     "chapters": [
      "pe-core-techniques"
     ]
    },
    {
     "id": "q-pe-3",
     "q": "推理模型还需要写思维链提示吗？",
     "added": "2026-07-09",
     "chapters": [
      "pe-advanced-reasoning"
     ]
    },
    {
     "id": "q-pe-4",
     "q": "怎么降低我们的 API 成本？",
     "added": "2026-07-09",
     "chapters": [
      "pe-engineering",
      "src-cache"
     ]
    },
    {
     "id": "q-pe-5",
     "q": "提示词能自动优化吗？",
     "added": "2026-07-09",
     "chapters": [
      "pe-engineering",
      "src-dspy"
     ]
    },
    {
     "id": "q-pe-6",
     "q": "提示词注入能彻底防住吗？",
     "added": "2026-07-09",
     "chapters": [
      "pe-security",
      "src-owasp"
     ]
    },
    {
     "id": "q-pe-7",
     "q": "提示词也要版本管理？至于吗？",
     "added": "2026-07-09",
     "chapters": [
      "pe-engineering",
      "pe-anatomy"
     ]
    },
    {
     "id": "q-pe-8",
     "q": "为什么我说「不要 X」它还是做了？",
     "added": "2026-07-09",
     "chapters": [
      "pe-core-techniques"
     ]
    }
   ]
  },
  {
   "id": "rag",
   "dir": "RAG",
   "layer": "应用模式层",
   "created": "2026-07-07",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "rag-what-why",
     "no": "第 1 章",
     "title": "是什么/为什么",
     "verified": "2026-07-07"
    },
    {
     "id": "rag-embedding",
     "no": "第 2 章",
     "title": "向量检索与 Embedding",
     "verified": "2026-07-07"
    },
    {
     "id": "rag-chunking",
     "no": "第 3 章",
     "title": "切分策略 Chunking",
     "verified": "2026-07-07"
    },
    {
     "id": "rag-reranking",
     "no": "第 4 章",
     "title": "重排序 Reranking",
     "verified": "2026-07-07"
    },
    {
     "id": "rag-evaluation",
     "no": "第 5 章",
     "title": "常见评估方法",
     "verified": "2026-07-07"
    },
    {
     "id": "rag-pipeline",
     "no": "第 6 章",
     "title": "最小 RAG 管线",
     "verified": "2026-07-08"
    },
    {
     "id": "rag-hybrid",
     "no": "第 7 章",
     "title": "混合检索",
     "verified": "2026-07-08"
    },
    {
     "id": "rag-agentic",
     "no": "第 8 章",
     "title": "Agentic RAG",
     "verified": "2026-07-08"
    },
    {
     "id": "rag-production",
     "no": "第 9 章",
     "title": "生产化与常见坑",
     "verified": "2026-07-08"
    },
    {
     "id": "rag-graphrag",
     "no": "第 10 章",
     "title": "GraphRAG：图谱增强检索",
     "verified": "2026-07-09"
    },
    {
     "id": "rag-multimodal",
     "no": "第 11 章",
     "title": "多模态 RAG",
     "verified": "2026-07-09"
    },
    {
     "id": "rag-structured",
     "no": "第 12 章",
     "title": "结构化数据 RAG（Text-to-SQL 与语义层）",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "Cohere Rerank 当前主线 v4.0（pro 重质量 / fast 低延迟高吞吐，多语言+半结构化），v3.5 与 v3.0 系仍在服务线",
     "chapter": "rag-reranking",
     "verified": "2026-07-12",
     "source": "docs.cohere.com/docs/rerank",
     "recheck": "—"
    },
    {
     "text": "混合检索为生产最低标配，RRF k≈60 为主流引擎原生支持",
     "chapter": "rag-hybrid",
     "verified": "2026-07-08",
     "source": "Elasticsearch / Qdrant 官方文档",
     "recheck": "—"
    },
    {
     "text": "Agentic RAG 五大生产模式（Router/ReAct/Plan-Execute/Multi-Agent/Self-RAG）+ CRAG",
     "chapter": "rag-agentic",
     "verified": "2026-07-08",
     "source": "arXiv 2501.09136、LangGraph 官方教程",
     "recheck": "—"
    },
    {
     "text": "生产组合主流：LlamaIndex + LangGraph + Langfuse/LangSmith",
     "chapter": "rag-production",
     "verified": "2026-07-08",
     "source": "2026-07 框架对比评测",
     "recheck": "—"
    },
    {
     "text": "朴素 RAG 检索环节失败率约四成",
     "chapter": "rag-production",
     "verified": "2026-07-08",
     "source": "raw-data/2026-07-08 核实笔记",
     "recheck": "—"
    },
    {
     "text": "Contextual Retrieval 实测降检索失败率 49%~67%",
     "chapter": "rag-chunking",
     "verified": "2026-07-07",
     "source": "Anthropic Cookbook",
     "recheck": "—"
    },
    {
     "text": "BGE M3 为开源多语言 embedding 代表方案",
     "chapter": "rag-embedding",
     "verified": "2026-07-07",
     "source": "arXiv 2402.03216",
     "recheck": "—"
    },
    {
     "text": "全量 GraphRAG 索引成本 6–8 倍；LazyGraphRAG 压至 0.1%、全局查询省约 700 倍",
     "chapter": "rag-graphrag",
     "verified": "2026-07-09",
     "source": "Microsoft GraphRAG 文档、2026 实践者评测",
     "recheck": "—"
    },
    {
     "text": "多模态三路线：Caption / 统一嵌入（Cohere Embed 4、voyage-multimodal）/ ColPali 系晚交互",
     "chapter": "rag-multimodal",
     "verified": "2026-07-09",
     "source": "arXiv 2407.01449、BigData Boutique 2026",
     "recheck": "—"
    },
    {
     "text": "裸 Text-to-SQL 准确率随基准真实度分档（学术单轮 80–90% / 中等企业化基准 50–70% / 最难企业基准 Spider 2.0 类约 20%），语义层抬至 85–95%（覆盖查询近 100%）；对客讲最低那档",
     "chapter": "rag-structured",
     "verified": "2026-07-23（分档口径与 SP 对齐，原 07-09 只登 50–70% 与 SP 的 10–21% 打架，已按基准真实度合成一套）",
     "source": "dbt 2026 基准 + Spider 2.0 / BEAVER / Spider-Ent（2026-07-23 复核）",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "rag-what-why",
     "to": "pe#pe-what-why",
     "why": "「提示词 vs RAG」选型两面 + 检索内容要塞进提示词才生效；讲义已加「与 Prompt Engineering 的关系」页回指",
     "resolved": true
    },
    {
     "from": "rag-agentic",
     "to": "agent#agent-context",
     "why": "RAG 第 8 章串联页 ↔ Agent 第 5 章\"与 RAG 的握手\"，双向互引",
     "resolved": true
    },
    {
     "from": "rag-evaluation",
     "to": "evaluation",
     "why": "检索质量指标（忠实度、上下文精确率/召回率）↔ Evaluation 模块指标体系（2026-07-09 转正）",
     "resolved": true
    },
    {
     "from": "rag-what-why",
     "to": "fine-tuning",
     "why": "\"改知识用 RAG vs 改行为用微调\"的取舍，与 Fine-tuning 模块互为参照（2026-07-09 转正）",
     "resolved": true
    },
    {
     "from": "rag-what-why",
     "to": "llm#llm-inference-kv",
     "why": "\"长上下文 vs RAG\"的架构论据（成本/有效性/权限）在 LLM 原理第 4 章，双向互为弹药",
     "resolved": true
    },
    {
     "from": "rag-graphrag",
     "to": "rag#rag-agentic",
     "why": "向量+图谱\"按问题类型路由\"是第 8 章 Router 模式的应用（章内承接）",
     "resolved": true
    },
    {
     "from": "rag-structured",
     "to": "agent#agent-components",
     "why": "SQL 查数包成 agent 工具，与文档检索并列路由，指向 Agent 模块工具使用章",
     "resolved": true
    },
    {
     "from": "rag-multimodal",
     "to": "multimodal#mm-fusion",
     "why": "本章讲「多模态内容怎么检索」，Multimodal 模块讲「模型怎么看懂图」，互为上下游；第 11 章已加「与 Multimodal 模块的关系」页（2026-07-10），双向互指",
     "resolved": true
    },
    {
     "from": "rag-structured",
     "to": "solution-patterns#sp-chatbi",
     "why": "本章讲 Text-to-SQL 与语义层的机制，SP 第 8 章是其场景视角（口径战场/三道闸/产品格局）——双向互指（2026-07-11）",
     "resolved": true
    },
    {
     "from": "rag-chunking / rag-embedding",
     "to": "data-engineering#de-parsing / de-vectordb",
     "why": "上游供给：解析产物进切分（解析质量决定切分质量）；向量库规模化选型与迁移在 Data-Engineering 第 4 章——双向互指（2026-07-11）",
     "resolved": true
    }
   ],
   "web": "./rag/index.html",
   "questions": [
    {
     "id": "q-rag-1",
     "q": "RAG 和直接微调模型，我到底该选哪个？",
     "added": "2026-07-07",
     "chapters": [
      "rag-what-why"
     ]
    },
    {
     "id": "q-rag-2",
     "q": "块到底该切多大？有没有标准答案？",
     "added": "2026-07-07",
     "chapters": [
      "rag-chunking"
     ]
    },
    {
     "id": "q-rag-3",
     "q": "已经有向量检索了，为什么还要单独加重排序？",
     "added": "2026-07-07",
     "chapters": [
      "rag-reranking"
     ]
    },
    {
     "id": "q-rag-4",
     "q": "回答不准，到底是检索的锅还是模型的锅？",
     "added": "2026-07-07",
     "chapters": [
      "doctor",
      "rag-evaluation"
     ]
    },
    {
     "id": "q-rag-5",
     "q": "向量检索不是更先进吗，为什么还要「老古董」BM25？",
     "added": "2026-07-08",
     "chapters": [
      "rag-hybrid"
     ]
    },
    {
     "id": "q-rag-6",
     "q": "Agentic RAG 比普通 RAG 贵多少、慢多少？",
     "added": "2026-07-08",
     "chapters": [
      "rag-agentic"
     ]
    },
    {
     "id": "q-rag-7",
     "q": "上线后效果越来越差，怎么排查？",
     "added": "2026-07-08",
     "chapters": [
      "rag-production"
     ]
    },
    {
     "id": "q-rag-8",
     "q": "数据安全怎么保证？会不会泄露？",
     "added": "2026-07-08",
     "chapters": [
      "rag-production"
     ]
    },
    {
     "id": "q-rag-9",
     "q": "GraphRAG 是不是智商税？听说索引贵好几倍。",
     "added": "2026-07-09",
     "chapters": [
      "rag-graphrag"
     ]
    },
    {
     "id": "q-rag-10",
     "q": "我们的资料全是扫描件 PDF，怎么办？",
     "added": "2026-07-09",
     "chapters": [
      "rag-multimodal"
     ]
    },
    {
     "id": "q-rag-11",
     "q": "问数这块，这不就是 BI 吗？会不会替代我们 BI 团队？",
     "added": "2026-07-09",
     "chapters": [
      "rag-structured"
     ]
    }
   ]
  },
  {
   "id": "security",
   "dir": "Security",
   "layer": "工程保障层",
   "created": "2026-07-09",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "sec-landscape",
     "no": "第 1 章",
     "title": "为什么 AI 安全是新问题(威胁全景)",
     "verified": "2026-07-09"
    },
    {
     "id": "sec-prompt-injection",
     "no": "第 2 章",
     "title": "提示注入与越狱",
     "verified": "2026-07-09"
    },
    {
     "id": "sec-data-privacy",
     "no": "第 3 章",
     "title": "数据与隐私安全",
     "verified": "2026-07-09"
    },
    {
     "id": "sec-supply-chain",
     "no": "第 4 章",
     "title": "供应链与模型来源",
     "verified": "2026-07-09"
    },
    {
     "id": "sec-agentic",
     "no": "第 5 章",
     "title": "Agent 与工具安全",
     "verified": "2026-07-09"
    },
    {
     "id": "sec-defense",
     "no": "第 6 章",
     "title": "防护工程:护栏·模式·红队",
     "verified": "2026-07-09"
    },
    {
     "id": "sec-governance",
     "no": "第 7 章",
     "title": "治理与合规框架",
     "verified": "2026-07-09"
    },
    {
     "id": "sec-china",
     "no": "第 8 章",
     "title": "中国监管合规",
     "verified": "2026-07-17"
    },
    {
     "id": "sec-cheatsheet",
     "no": "第 9 章",
     "title": "售前速查",
     "verified": "2026-07-09"
    }
   ],
   "facts": [
    {
     "text": "OWASP LLM Top 10 现行版为 2025 版;新增 LLM07 系统提示词泄露、LLM08 向量与嵌入弱点,敏感信息泄露升至第 2",
     "chapter": "sec-landscape",
     "verified": "2026-07-09",
     "source": "genai.owasp.org/llm-top-10",
     "recheck": "—"
    },
    {
     "text": "OWASP 另有《Agentic AI Threats & Mitigations》(2025-02)与《Top 10 for Agentic Applications 2026》",
     "chapter": "sec-agentic",
     "verified": "2026-07-09",
     "source": "genai.owasp.org(ASI)",
     "recheck": "—"
    },
    {
     "text": "EchoLeak(CVE-2025-32711):M365 Copilot 首个零点击间接注入,CVSS 9.3",
     "chapter": "sec-prompt-injection",
     "verified": "2026-07-09",
     "source": "arXiv 2509.10540 / Sentra",
     "recheck": "—"
    },
    {
     "text": "在野间接注入 2026 起规模化:Unit42 2026-03 记录 22 种载荷手法;CrowdStrike 报 2025 影响 90+ 组织",
     "chapter": "sec-prompt-injection",
     "verified": "2026-07-09",
     "source": "unit42 / helpnetsecurity 2026-04",
     "recheck": "—"
    },
    {
     "text": "OpenAI/Anthropic/Google DeepMind 均公开承认:现有架构下提示注入无法彻底根治,需模型外确定性策略兜底",
     "chapter": "sec-prompt-injection",
     "verified": "2026-07-09",
     "source": "三厂 2025 研究",
     "recheck": "—"
    },
    {
     "text": "护栏格局:开源 Llama Guard/NeMo Guardrails/Guardrails AI/LLM Guard;商业 Lakera;云托管 Bedrock Guardrails/Azure AI Content Safety(Prompt Shields)",
     "chapter": "sec-defense",
     "verified": "2026-07-09",
     "source": "generalanalysis / galileo 2026 对比",
     "recheck": "—"
    },
    {
     "text": "CaMeL(Google DeepMind,arXiv 2503.18813)Dual-LLM 工程化,AgentDojo 约 77% 任务可证安全",
     "chapter": "sec-defense",
     "verified": "2026-07-09",
     "source": "arXiv 2503.18813",
     "recheck": "—"
    },
    {
     "text": "架构级防注入六类模式(action-selector/plan-then-execute/dual LLM/code-then-execute/context-minimization/map-reduce)",
     "chapter": "sec-defense",
     "verified": "2026-07-09",
     "source": "arXiv 2506.08837",
     "recheck": "—"
    },
    {
     "text": "NIST AI 600-1(GenAI Profile)2024-07-26 发布,12 类风险 +200 行动项;RMF 下一大版本预计 2026–2027",
     "chapter": "sec-governance",
     "verified": "2026-07-09",
     "source": "nist.gov / nvlpubs",
     "recheck": "—"
    },
    {
     "text": "EU AI Act:GPAI 义务 2025-08-02 生效 / 2026-08-02 执法罚款(GPAI 最高 €15M 或营收 3%;广义最高 €35M 或 7%)/ 2027-08-02 存量截止",
     "chapter": "sec-governance",
     "verified": "2026-07-09",
     "source": "artificialintelligenceact.eu / EC",
     "recheck": "—"
    },
    {
     "text": "MITRE ATLAS v5.x(2025 末–2026):约 16 战术/84 技术,2025-11 v5.1.0 加 C2 战术,2025 起大量 GenAI/Agent 技术",
     "chapter": "sec-landscape",
     "verified": "2026-07-09",
     "source": "atlas.mitre.org",
     "recheck": "—"
    },
    {
     "text": "上云 AI 安全服务名:AWS Bedrock Guardrails/Macie/GuardDuty+SecurityHub;Azure AI Content Safety/Purview/Defender for Cloud AI-SPM;GCP Model Armor/DLP/Security Command Center",
     "chapter": "sec-cheatsheet",
     "verified": "2026-07-09",
     "source": "三云 2025–2026 文档",
     "recheck": "—"
    },
    {
     "text": "备案现状:截至 2026-06-30 累计 988 款生成式 AI 服务备案、598 款应用/功能登记;双备案全流程 5–8 个月(北京 8–10),算法备案审核 30 个工作日、大模型备案 3–6 个月",
     "chapter": "sec-china",
     "verified": "2026-07-17",
     "source": "网信办公告(cac.gov.cn)+备案实务多方一致口径",
     "recheck": "—"
    },
    {
     "text": "《AI 生成合成内容标识办法》2025-09-01 施行(四部门),显式+隐式双轨,配套强标 GB 45438-2025;已有 App 因标识违规被约谈/下架",
     "chapter": "sec-china",
     "verified": "2026-07-17",
     "source": "cac.gov.cn / 央视新闻 / samr openstd",
     "recheck": "—"
    },
    {
     "text": "GB/T 45654-2025《生成式 AI 服务安全基本要求》2025-11-01 实施(TC260 归口),训练数据/模型/安全措施三方面,五大类 31 小类风险;配套 GB/T 45674 数据标注安全",
     "chapter": "sec-china",
     "verified": "2026-07-17",
     "source": "tc260.org.cn / samr / 火山引擎备案实务",
     "recheck": "—"
    },
    {
     "text": "立法风向(易过期):网安法修订 2026-01-01 施行新增 AI 专条(第 20 条);国务院 2026 立法计划部署 AI 综合性立法;《拟人化互动服务办法》征求意见中",
     "chapter": "sec-china",
     "verified": "2026-07-17",
     "source": "cac.gov.cn 专家解读 / 国务院立法计划",
     "recheck": "—"
    },
    {
     "text": "数据出境:三通道(安全评估/标准合同/认证)+《促进和规范数据跨境流动规定》(2024-03)六类豁免+自贸区负面清单;官方口径《政策问答(2025-10)》",
     "chapter": "sec-china",
     "verified": "2026-07-17",
     "source": "cac.gov.cn",
     "recheck": "—"
    },
    {
     "text": "ISO/IEC 42001 为首个 AI 管理体系(AIMS)国际标准",
     "chapter": "sec-governance",
     "verified": "2026-07-09",
     "source": "ISO 官方",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "sec-defense",
     "to": "evaluation#eval-scenarios",
     "why": "红队产出的攻破率/有害内容率/注入抵抗率汇入 Evaluation 安全维度验收,兑现其 `eval-scenarios → security(候选)` 边",
     "resolved": true
    },
    {
     "from": "sec-agentic",
     "to": "agent#(护栏章)",
     "why": "Agent「评估与护栏」提出要防,本模块给系统性威胁与控权(最小权限/爆炸半径)",
     "resolved": true
    },
    {
     "from": "sec-agentic",
     "to": "mcp#(安全章)",
     "why": "MCP 工具描述投毒与供应链安全,本模块第 4/5 章深化",
     "resolved": true
    },
    {
     "from": "sec-data-privacy",
     "to": "rag#(向量检索/数据)",
     "why": "向量库投毒、跨租户泄露、带权限检索,对应 RAG 检索质量与数据面",
     "resolved": true
    },
    {
     "from": "sec-supply-chain",
     "to": "fine-tuning# / llm-training#",
     "why": "微调数据泄露、模型投毒与来源验证,是这两个模块的安全侧",
     "resolved": true
    }
   ],
   "web": "./security/index.html",
   "questions": [
    {
     "id": "q-security-1",
     "q": "大模型不就是个聊天框，能有多大安全风险？",
     "added": "2026-07-09",
     "chapters": [
      "riskcheck",
      "sec-landscape"
     ]
    },
    {
     "id": "q-security-2",
     "q": "提示注入到底能不能彻底解决？",
     "added": "2026-07-09",
     "chapters": [
      "sec-prompt-injection"
     ]
    },
    {
     "id": "q-security-3",
     "q": "我们的数据会不会被模型学走、被别人问出来？",
     "added": "2026-07-09",
     "chapters": [
      "sec-data-privacy"
     ]
    },
    {
     "id": "q-security-4",
     "q": "从开源社区下模型很方便，有什么风险？",
     "added": "2026-07-09",
     "chapters": [
      "sec-supply-chain"
     ]
    },
    {
     "id": "q-security-5",
     "q": "给 Agent 放权自动干活，出了事谁负责、怎么控？",
     "added": "2026-07-09",
     "chapters": [
      "sec-agentic"
     ]
    },
    {
     "id": "q-security-6",
     "q": "买一个 AI 护栏产品，是不是就安全了？",
     "added": "2026-07-09",
     "chapters": [
      "sec-defense"
     ]
    },
    {
     "id": "q-security-7",
     "q": "我们要过 EU AI Act，具体要做什么、什么时候？",
     "added": "2026-07-09",
     "chapters": [
      "sec-governance"
     ]
    },
    {
     "id": "q-security-8",
     "q": "我们私有化部署、只给内部员工用，要备案吗？",
     "added": "2026-07-17",
     "chapters": [
      "sec-china"
     ]
    },
    {
     "id": "q-security-9",
     "q": "不打 AI 标识会怎样？",
     "added": "2026-07-17",
     "chapters": [
      "sec-china"
     ]
    }
   ]
  },
  {
   "id": "solution-patterns",
   "dir": "Solution-Patterns",
   "layer": "解决方案层",
   "created": "2026-07-10",
   "updated": "2026-07-23",
   "chapters": [
    {
     "id": "sp-what-why",
     "no": "第 1 章",
     "title": "从技术轴到场景轴（方案 = 场景 × 积木）",
     "verified": "2026-07-10"
    },
    {
     "id": "sp-method",
     "no": "第 2 章",
     "title": "方案共性方法（五层架构 / POC 三要素 / 三本账 / 口径鉴别）",
     "verified": "2026-07-10"
    },
    {
     "id": "sp-customer-service",
     "no": "第 3 章",
     "title": "智能客服（三层漏斗 / 解决率口径 / 语音客服）",
     "verified": "2026-07-10"
    },
    {
     "id": "sp-knowledge-search",
     "no": "第 4 章",
     "title": "企业知识库与 AI 搜索（权限命门 / Glean 模式）",
     "verified": "2026-07-10"
    },
    {
     "id": "sp-content-gen",
     "no": "第 5 章",
     "title": "营销与内容生成（品牌工程 / 商业安全 / 人审）",
     "verified": "2026-07-10"
    },
    {
     "id": "sp-ai-coding",
     "no": "第 6 章",
     "title": "AI Coding 与研发提效（双层格局 / 企业三关注）",
     "verified": "2026-07-10"
    },
    {
     "id": "sp-digital-human",
     "no": "第 7 章",
     "title": "数字人（离线 vs 实时 / 合规红线）",
     "verified": "2026-07-10"
    },
    {
     "id": "sp-chatbi",
     "no": "第 8 章",
     "title": "ChatBI 与数据分析（语义层口径战场 / 三道闸 / 产品格局）",
     "verified": "2026-07-11"
    },
    {
     "id": "sp-meeting",
     "no": "第 9 章",
     "title": "会议与办公助手（记忆库资产 / 三层口径 / 合规红线）",
     "verified": "2026-07-11"
    },
    {
     "id": "sp-cheatsheet",
     "no": "第 10 章",
     "title": "售前速查（七场景→积木总表 / 分诊树 / 成本卡）",
     "verified": "2026-07-11"
    }
   ],
   "facts": [
    {
     "text": "客服解决率口径：厂商自报 Fin 51–67% / Sierra ~70%（WeightWatchers）/ Decagon 80%（deflection）；独立口径 Zendesk 企业中位 41.2%、top quartile 58.7%；宣传与实测差 30–40pp",
     "chapter": "sp-customer-service / sp-method",
     "verified": "2026-07-10",
     "source": "fin.ai 对比页 / digitalapplied 2026 统计",
     "recheck": "—"
    },
    {
     "text": "客服 AI 采用度：Salesforce 报 66% 服务组织已跑 AI agent（2025 年 39%）；Gartner 91% CX 负责人有部署压力",
     "chapter": "sp-customer-service",
     "verified": "2026-07-10",
     "source": "digitalapplied 2026 统计",
     "recheck": "—"
    },
    {
     "text": "Glean：ARR $300M（2026-05，+89% YoY）、估值 $7.2B（2025-06 Series F）；Glean Agents 年化 1 亿+ actions",
     "chapter": "sp-knowledge-search",
     "verified": "2026-07-10",
     "source": "TechCrunch 2026-05-28 / Glean press",
     "recheck": "—"
    },
    {
     "text": "AI Coding 市场：2026 年 $12.8B、85% 开发者在用；Copilot 4.7M 付费（用户第一）、Cursor $2B ARR（收入第一）、Claude Code 46% most-loved（JetBrains 2026-04 满意度第一）；采用率 29%/18%/18%；70% 工程师同时用 2–4 个工具",
     "chapter": "sp-ai-coding",
     "verified": "2026-07-10",
     "source": "ideaplan / tech-insider / JetBrains 2026 调查",
     "recheck": "—"
    },
    {
     "text": "数字人：HeyGen Avatar V（2026-04-08，15 秒素材建分身、10 分钟身份不漂移）；LiveAvatar 为 WebRTC 实时交互数字人独立平台",
     "chapter": "sp-digital-human",
     "verified": "2026-07-10",
     "source": "HeyGen 官方 blog / help center",
     "recheck": "—"
    },
    {
     "text": "内容生成格局：Jasper（品牌一致性：风格指南/禁用词全局生效）、Canva Magic Studio（模板驱动）、Adobe Firefly Enterprise（商业安全定位：授权数据训练 + 企业 IP 赔付 + 可训品牌定制模型）",
     "chapter": "sp-content-gen",
     "verified": "2026-07-10",
     "source": "Adobe 官方 / genesysgrowth 2026 对比",
     "recheck": "—"
    },
    {
     "text": "语音客服成本：级联 $0.01–0.17/分钟；gpt-realtime 未缓存 $0.18–0.46/分钟、优化后 $0.05–0.10（与 multimodal#mm-voice-realtime 同源口径）",
     "chapter": "sp-customer-service / sp-cheatsheet",
     "verified": "2026-07-10",
     "source": "沿用 mm-voice-realtime 同源",
     "recheck": "—"
    },
    {
     "text": "成本速查卡量级：文本客服 $0.01–0.05/会话、文案 $0.001–0.01/条、图 $0.02–0.1/张、AI Coding $19–40/人/月 + 用量",
     "chapter": "sp-cheatsheet",
     "verified": "2026-07-10",
     "source": "各厂商定价页综合量级（2026-07 口径）",
     "recheck": "—"
    },
    {
     "text": "Text-to-SQL 准确率口径（分档，与 RAG 册对齐）：裸 LLM 随基准真实度分档——学术单轮 80–90% / 较干净企业化基准五六成 / 最难企业基准（Spider 2.0 类）10–21%，对客讲最低那档；语义模型加持后 Snowflake 内部 150 题基准 51%→90%+、dbt 语义层基准 98–100%",
     "chapter": "sp-chatbi",
     "verified": "2026-07-23（原「学术基准五六成」与 RAG「学术 80–90%」冲突，已合成分档口径两册一致）",
     "source": "promethium 2026 企业对比 / Snowflake 工程博客 / Spider 2.0 / colrows",
     "recheck": "—"
    },
    {
     "text": "ChatBI 产品格局：垂直一体派 Cortex Analyst（YAML 语义模型）/ Databricks AI/BI Genie（Unity Catalog）/ Fabric Copilot；独立派 ThoughtSpot / dbt / Cube；Snowflake 2026 推 Semantic View Autopilot（ML 自动发现指标定义，天级→分钟级）",
     "chapter": "sp-chatbi",
     "verified": "2026-07-11",
     "source": "promethium 语义层十强 / colrows",
     "recheck": "—"
    },
    {
     "text": "会议助手格局：两分野（笔记器 vs agentic 平台）；原生派 Zoom AI Companion / Teams Copilot（M365 +$30/人/月）/ 飞书妙记；独立派 Otter / Fireflies / Granola（2026-03 融资 $125M、估值 $1.5B、bot-free 代表）；bot 疲劳为 2026 趋势",
     "chapter": "sp-meeting",
     "verified": "2026-07-11",
     "source": "read.ai / zapier / tana / meetily 2026 横评",
     "recheck": "—"
    }
   ],
   "edges": [
    {
     "from": "sp-what-why",
     "to": "（全库）",
     "why": "本模块是场景索引层：单向引用所有技术模块，技术模块无需反向依赖",
     "resolved": false
    },
    {
     "from": "sp-method",
     "to": "ai-gateway#gw-cost",
     "why": "三本账的 token/并发治理在网关落地；成本治理机制见 AI-Gateway 第 4 章",
     "resolved": true
    },
    {
     "from": "sp-method",
     "to": "evaluation#eval-build",
     "why": "POC 三要素中「签字的指标」= 自建评估集方法，见 Evaluation 第 5 章",
     "resolved": true
    },
    {
     "from": "sp-method",
     "to": "ai-ops#ops-cheatsheet",
     "why": "三本账的「人力账/运营包」在 AI-Ops 第 8 章展开为五件套清单与 SLA 报价口径——双向互指（2026-07-10）",
     "resolved": true
    },
    {
     "from": "sp-method / sp-knowledge-search",
     "to": "data-engineering#de-what-why / de-pipeline",
     "why": "「数据坑是第一风险」「连接器是报价大头」在 Data-Engineering 展开为工程清单与报价明细——双向互指（2026-07-11）",
     "resolved": true
    },
    {
     "from": "sp-customer-service",
     "to": "rag#rag-hybrid / agent#agent-orchestration",
     "why": "客服主料：知识兜底 + 业务办理",
     "resolved": true
    },
    {
     "from": "sp-customer-service",
     "to": "multimodal#mm-voice-realtime",
     "why": "语音客服链路（级联/延迟/SIP）深潜入口",
     "resolved": true
    },
    {
     "from": "sp-knowledge-search",
     "to": "rag#rag-hybrid / rag#rag-graphrag / rag#rag-structured",
     "why": "按知识形态选检索路线",
     "resolved": true
    },
    {
     "from": "sp-knowledge-search",
     "to": "security#sec-data-privacy",
     "why": "权限感知检索 / ACL / 越权测试的安全侧依据",
     "resolved": true
    },
    {
     "from": "sp-content-gen",
     "to": "multimodal#mm-generation / pe#pe-anatomy",
     "why": "生成能力 + 风格注入两大主料",
     "resolved": true
    },
    {
     "from": "sp-ai-coding",
     "to": "agent#agent-lowcode / ai-gateway#gw-cost",
     "why": "工具组合与统一预算治理",
     "resolved": true
    },
    {
     "from": "sp-digital-human",
     "to": "multimodal#mm-voice-realtime / multimodal#mm-generation",
     "why": "数字人 = 语音链路 + 生成的脸",
     "resolved": true
    },
    {
     "from": "sp-cheatsheet",
     "to": "agent#agent-lowcode",
     "why": "「有没有平台」的分诊去向",
     "resolved": true
    },
    {
     "from": "sp-chatbi",
     "to": "rag#rag-structured",
     "why": "技术底座：Text-to-SQL 与语义层机制在 RAG 第 12 章，本章是其场景视角（双向）",
     "resolved": true
    },
    {
     "from": "sp-chatbi",
     "to": "security#sec-data-privacy / evaluation#eval-build",
     "why": "行级权限与只读闸；高频指标验收集 + 越权测试",
     "resolved": true
    },
    {
     "from": "sp-meeting",
     "to": "multimodal#mm-understanding / multimodal#mm-voice-realtime",
     "why": "ASR 与说话人分离能力底座；实时字幕走语音链路",
     "resolved": true
    },
    {
     "from": "sp-meeting",
     "to": "rag#rag-hybrid / agent#agent-eval-guardrails",
     "why": "会议记忆库 = 权限感知检索；行动项自动执行的审批边界",
     "resolved": true
    }
   ],
   "web": "./solution-patterns/index.html",
   "questions": [
    {
     "id": "q-solution-patterns-1",
     "q": "POC 成功了，为什么上生产还要再收一笔钱？",
     "added": "2026-07-10",
     "chapters": [
      "sp-method"
     ]
    },
    {
     "id": "q-solution-patterns-2",
     "q": "你们报价比竞品贵 30%，贵在哪？",
     "added": "2026-07-10",
     "chapters": [
      "sp-method"
     ]
    },
    {
     "id": "q-solution-patterns-3",
     "q": "客服解决率能承诺多少？",
     "added": "2026-07-10",
     "chapters": [
      "sp-customer-service"
     ]
    },
    {
     "id": "q-solution-patterns-4",
     "q": "员工会不会搜到不该看的东西？",
     "added": "2026-07-10",
     "chapters": [
      "sp-knowledge-search"
     ]
    },
    {
     "id": "q-solution-patterns-5",
     "q": "生成的内容侵权了算谁的？",
     "added": "2026-07-10",
     "chapters": [
      "sp-content-gen"
     ]
    },
    {
     "id": "q-solution-patterns-6",
     "q": "AI Coding 该买 Copilot 还是 Cursor 还是 Claude Code？",
     "added": "2026-07-10",
     "chapters": [
      "sp-ai-coding"
     ]
    },
    {
     "id": "q-solution-patterns-7",
     "q": "数字人会不会有法律风险？",
     "added": "2026-07-10",
     "chapters": [
      "sp-digital-human"
     ]
    },
    {
     "id": "q-solution-patterns-8",
     "q": "ChatBI 准确率能到多少？算错数怎么办？",
     "added": "2026-07-11",
     "chapters": [
      "sp-chatbi"
     ]
    },
    {
     "id": "q-solution-patterns-9",
     "q": "会议助手和 Teams/Zoom 自带的 AI 比，强在哪？",
     "added": "2026-07-11",
     "chapters": [
      "sp-meeting"
     ]
    }
   ]
  }
 ],
 "concepts": [
  {
   "t": "AP2",
   "m": "A2A",
   "u": "./a2a/index.html#a2a-production"
  },
  {
   "t": "Agent Card",
   "m": "A2A",
   "u": "./a2a/index.html#a2a-protocol"
  },
  {
   "t": "Agentic RAG",
   "m": "RAG",
   "u": "./rag/index.html#rag-agentic"
  },
  {
   "t": "BM25",
   "m": "RAG",
   "u": "./rag/index.html#rag-hybrid"
  },
  {
   "t": "Chinchilla",
   "m": "LLM-Training",
   "u": "./llm-training/index.html#llmtrain-pretrain"
  },
  {
   "t": "ColPali",
   "m": "RAG",
   "u": "./rag/index.html#rag-multimodal"
  },
  {
   "t": "Computer Use",
   "m": "Agent",
   "u": "./agent/index.html#agent-computer-use"
  },
  {
   "t": "Continuous Batching",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-batching"
  },
  {
   "t": "DPO",
   "m": "LLM-Training",
   "u": "./llm-training/index.html#llmtrain-alignment"
  },
  {
   "t": "DSPy",
   "m": "Prompt-Engineering",
   "u": "./prompt-engineering/index.html#pe-engineering"
  },
  {
   "t": "EU AI Act",
   "m": "Security",
   "u": "./security/index.html#sec-governance"
  },
  {
   "t": "FlashAttention",
   "m": "LLM",
   "u": "./llm/index.html#llm-attention-zoo"
  },
  {
   "t": "GQA",
   "m": "LLM",
   "u": "./llm/index.html#llm-attention-zoo"
  },
  {
   "t": "GRPO",
   "m": "LLM-Training",
   "u": "./llm-training/index.html#llmtrain-reasoning"
  },
  {
   "t": "GraphRAG",
   "m": "RAG",
   "u": "./rag/index.html#rag-graphrag"
  },
  {
   "t": "HBM",
   "m": "AI-Infra-Compute",
   "u": "./ai-infra-compute/index.html#aic-hbm"
  },
  {
   "t": "InfiniBand",
   "m": "AI-Infra-Compute",
   "u": "./ai-infra-compute/index.html#aic-scaleout"
  },
  {
   "t": "KServe",
   "m": "AI-Infra-Platform",
   "u": "./ai-infra-platform/index.html#aip-serving"
  },
  {
   "t": "KV Cache",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-kv-budget"
  },
  {
   "t": "KV 缓存",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-kv-budget"
  },
  {
   "t": "LLM-as-a-Judge",
   "m": "Evaluation",
   "u": "./evaluation/index.html#eval-judge"
  },
  {
   "t": "LoRA",
   "m": "Fine-tuning",
   "u": "./fine-tuning/index.html#ft-methods"
  },
  {
   "t": "MIG",
   "m": "AI-Infra-Platform",
   "u": "./ai-infra-platform/index.html#aip-sharing"
  },
  {
   "t": "MITRE ATLAS",
   "m": "Security",
   "u": "./security/index.html#sec-landscape"
  },
  {
   "t": "MLA",
   "m": "LLM",
   "u": "./llm/index.html#llm-attention-zoo"
  },
  {
   "t": "MMLU",
   "m": "Evaluation",
   "u": "./evaluation/index.html#eval-benchmarks"
  },
  {
   "t": "MoE",
   "m": "LLM",
   "u": "./llm/index.html#llm-architecture"
  },
  {
   "t": "NVL72",
   "m": "AI-Infra-Compute",
   "u": "./ai-infra-compute/index.html#aic-scaleup"
  },
  {
   "t": "NVLink",
   "m": "AI-Infra-Compute",
   "u": "./ai-infra-compute/index.html#aic-scaleup"
  },
  {
   "t": "PagedAttention",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-batching"
  },
  {
   "t": "QLoRA",
   "m": "Fine-tuning",
   "u": "./fine-tuning/index.html#ft-methods"
  },
  {
   "t": "RDMA",
   "m": "AI-Infra-Compute",
   "u": "./ai-infra-compute/index.html#aic-scaleout"
  },
  {
   "t": "RLHF",
   "m": "LLM-Training",
   "u": "./llm-training/index.html#llmtrain-alignment"
  },
  {
   "t": "RLVR",
   "m": "LLM-Training",
   "u": "./llm-training/index.html#llmtrain-reasoning"
  },
  {
   "t": "RRF",
   "m": "RAG",
   "u": "./rag/index.html#rag-hybrid"
  },
  {
   "t": "RoPE",
   "m": "LLM",
   "u": "./llm/index.html#llm-architecture"
  },
  {
   "t": "SGLang",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-engines"
  },
  {
   "t": "SWE-bench",
   "m": "Evaluation",
   "u": "./evaluation/index.html#eval-benchmarks"
  },
  {
   "t": "Streamable HTTP",
   "m": "MCP",
   "u": "./mcp/index.html#mcp-transport"
  },
  {
   "t": "Sub-agent",
   "m": "Agent",
   "u": "./agent/index.html#agent-subagent"
  },
  {
   "t": "ViT",
   "m": "Multimodal",
   "u": "./multimodal/index.html#mm-encoder"
  },
  {
   "t": "gang scheduling",
   "m": "AI-Infra-Platform",
   "u": "./ai-infra-platform/index.html#aip-scheduling"
  },
  {
   "t": "goodput",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-production"
  },
  {
   "t": "vLLM",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-engines"
  },
  {
   "t": "上下文工程",
   "m": "Agent",
   "u": "./agent/index.html#agent-context"
  },
  {
   "t": "上下文检索",
   "m": "RAG",
   "u": "./rag/index.html#rag-chunking"
  },
  {
   "t": "判官校准",
   "m": "Evaluation",
   "u": "./evaluation/index.html#eval-judge"
  },
  {
   "t": "向量库迁移",
   "m": "Data-Engineering",
   "u": "./data-engineering/index.html#de-vectordb"
  },
  {
   "t": "开放权重",
   "m": "Model-Landscape",
   "u": "./model-landscape/index.html#ml-open"
  },
  {
   "t": "思维链",
   "m": "Prompt-Engineering",
   "u": "./prompt-engineering/index.html#pe-core-techniques"
  },
  {
   "t": "投机解码",
   "m": "LLM-Inference",
   "u": "./llm-inference/index.html#llminf-speculative"
  },
  {
   "t": "提示注入",
   "m": "Security",
   "u": "./security/index.html#sec-prompt-injection"
  },
  {
   "t": "提示词缓存",
   "m": "Prompt-Engineering",
   "u": "./prompt-engineering/index.html#pe-engineering"
  },
  {
   "t": "文档智能解析",
   "m": "Data-Engineering",
   "u": "./data-engineering/index.html#de-parsing"
  },
  {
   "t": "混合检索",
   "m": "RAG",
   "u": "./rag/index.html#rag-hybrid"
  },
  {
   "t": "灾难性遗忘",
   "m": "Fine-tuning",
   "u": "./fine-tuning/index.html#ft-eval-deploy"
  },
  {
   "t": "记忆投毒",
   "m": "Agent",
   "u": "./agent/index.html#agent-memory"
  },
  {
   "t": "语义层",
   "m": "RAG",
   "u": "./rag/index.html#rag-structured"
  },
  {
   "t": "重排序",
   "m": "RAG",
   "u": "./rag/index.html#rag-reranking"
  },
  {
   "t": "间接注入",
   "m": "Security",
   "u": "./security/index.html#sec-prompt-injection"
  },
  {
   "t": "黄金集",
   "m": "Evaluation",
   "u": "./evaluation/index.html#eval-build"
  }
 ],
 "kw": {
  "ch": {
   "mcp-what-why": [
    "MCP",
    "Function Calling",
    "M×N→M+N",
    "AAIF",
    "SEP"
   ],
   "mcp-protocol": [
    "Host/Client/Server",
    "JSON-RPC 2.0",
    "Tools/Resources/Prompts",
    "控制面",
    "tools/call 报文"
   ],
   "mcp-transport": [
    "stdio",
    "Streamable HTTP",
    "无状态核心",
    "Extensions/Tasks",
    "弃用政策"
   ],
   "mcp-server": [
    "FastMCP",
    "MCP Inspector",
    "工具描述",
    "REST 包装"
   ],
   "mcp-production": [
    "OAuth 2.1",
    "MCP 网关",
    "MCP Registry",
    "私有 registry",
    "token 透传禁令"
   ],
   "mcp-security": [
    "工具投毒",
    "rug pull",
    "confused deputy",
    "MCPTox",
    "NSA/CISA 指引"
   ],
   "mcp-cheatsheet": [
    "上手四步",
    "排错三板斧",
    "Inspector 分层定位"
   ],
   "a2a-what-why": [
    "A2A",
    "MCP/A2A 分工",
    "Linux Foundation",
    "多专精 Agent 协作"
   ],
   "a2a-protocol": [
    "Agent Card",
    "Task 状态机",
    "Message/Part",
    "Artifact",
    "Protocol Buffers"
   ],
   "a2a-transport": [
    "well-known URI",
    "三绑定",
    "SSE",
    "推送通知 webhook",
    "四种交付"
   ],
   "a2a-handson": [
    "官方 SDK",
    "message/send",
    "a2a-inspector",
    "TCK"
   ],
   "a2a-orchestration": [
    "opaque agents",
    "编排者—执行者",
    "链式流水线",
    "并行汇聚"
   ],
   "a2a-production": [
    "多租户",
    "Bedrock AgentCore",
    "Vertex Agent Engine",
    "AP2",
    "采用度"
   ],
   "a2a-security": [
    "Signed Agent Cards",
    "OAuth2/mTLS",
    "授权范围 scope",
    "五个信任边界",
    "跨 Agent 提示注入"
   ],
   "gw-what-why": [
    "AI 网关",
    "LLM 专属六件套",
    "M×N 收敛",
    "边界辨析"
   ],
   "gw-unify": [
    "OpenAI 兼容层",
    "虚拟密钥",
    "十步请求链",
    "五层策略栈",
    "优雅降级"
   ],
   "gw-route": [
    "路由五策略",
    "复杂度路由",
    "语义路由",
    "fallback/熔断",
    "RouteLLM/FrugalGPT"
   ],
   "gw-cost": [
    "按 token 限流",
    "花费归集 FinOps",
    "语义缓存",
    "相似度阈值"
   ],
   "gw-guardrail": [
    "pre/post 护栏",
    "统一执行点",
    "审计证据链",
    "PII 脱敏",
    "注入检测"
   ],
   "gw-observe": [
    "OpenTelemetry GenAI",
    "OpenInference",
    "日志/指标/追踪"
   ],
   "gw-mcp": [
    "MCP 网关",
    "openapi-to-mcp",
    "RFC 8693 token 交换",
    "token 透传禁令",
    "三大授权反模式"
   ],
   "gw-cheatsheet": [
    "自托管 vs 托管",
    "LiteLLM",
    "Higress",
    "Envoy AI Gateway",
    "Azure APIM"
   ],
   "sec-landscape": [
    "指令数据不分离",
    "三层攻击面",
    "OWASP LLM Top 10",
    "MITRE ATLAS"
   ],
   "sec-prompt-injection": [
    "提示注入",
    "间接注入",
    "越狱",
    "EchoLeak 零点击",
    "模型外兜底"
   ],
   "sec-data-privacy": [
    "系统提示词泄露",
    "成员推断",
    "投毒三时机",
    "嵌入反演",
    "RAG 优于微调"
   ],
   "sec-supply-chain": [
    "pickle RCE",
    "后门模型",
    "safetensors",
    "模型签名",
    "AI-BOM"
   ],
   "sec-agentic": [
    "过度自主",
    "爆炸半径",
    "工具描述投毒",
    "记忆投毒",
    "HITL"
   ],
   "sec-defense": [
    "纵深防御四道闸",
    "Llama Guard",
    "NeMo Guardrails",
    "双 LLM/CaMeL",
    "PyRIT 红队"
   ],
   "sec-governance": [
    "NIST AI RMF",
    "EU AI Act",
    "ISO/IEC 42001",
    "AI-SPM"
   ],
   "sec-china": [
    "双备案",
    "内容标识办法",
    "GB/T 45654",
    "数据出境三通道",
    "988 款备案"
   ],
   "sec-cheatsheet": [
    "威胁→防护映射",
    "风险与合规自查",
    "爆炸半径分级"
   ],
   "eval-why-hard": [
    "非确定性",
    "三层分工",
    "评估集护城河",
    "隐性回归"
   ],
   "eval-benchmarks": [
    "MMLU 饱和",
    "GPQA",
    "HLE",
    "SWE-bench",
    "Arena/Elo",
    "数据污染"
   ],
   "eval-methods": [
    "判分四法",
    "代码判分",
    "人工评估",
    "BLEU/ROUGE 失灵"
   ],
   "eval-judge": [
    "LLM-as-a-Judge",
    "位置偏差",
    "冗长偏差",
    "自我偏好",
    "判官校准"
   ],
   "eval-build": [
    "黄金集",
    "错误分析",
    "冷启动三路",
    "CI 门禁",
    "保留集"
   ],
   "eval-scenarios": [
    "RAG 三角",
    "轨迹评估",
    "pass^k",
    "回归门禁",
    "幻觉率"
   ],
   "eval-tooling": [
    "Ragas",
    "DeepEval",
    "promptfoo",
    "LangSmith/Phoenix",
    "四道发布门"
   ],
   "eval-cheatsheet": [
    "POC 验收四件套",
    "应答三步",
    "误区总表"
   ],
   "ft-when": [
    "微调时机",
    "定制光谱",
    "知识 vs 行为",
    "劝退清单"
   ],
   "ft-methods": [
    "全参微调",
    "LoRA",
    "QLoRA",
    "显存心算",
    "学得少忘得少"
   ],
   "ft-data": [
    "聊天模板",
    "JSONL",
    "LIMA",
    "合成数据",
    "蒸馏",
    "PII 治理三问"
   ],
   "ft-training": [
    "Unsloth",
    "LLaMA-Factory",
    "Axolotl",
    "TRL",
    "eval loss/过拟合"
   ],
   "ft-alignment": [
    "SFT",
    "DPO",
    "RFT",
    "GRPO",
    "偏好对",
    "reward hacking"
   ],
   "ft-cloud": [
    "托管微调",
    "OpenAI 微调 API",
    "Bedrock Haiku",
    "数据出域"
   ],
   "ft-eval-deploy": [
    "验收四层",
    "灾难性遗忘",
    "回归门禁",
    "adapter 热插拔",
    "多 LoRA"
   ],
   "ft-field-guide": [
    "误区总表",
    "成本心算",
    "决策树"
   ],
   "ops-what-why": [
    "质量轴",
    "token 成本轴",
    "静默退化",
    "观测成本",
    "采样率"
   ],
   "ops-tracing": [
    "OTel GenAI",
    "span 四类",
    "trace 旅程",
    "PII 脱敏",
    "保留期分级"
   ],
   "ops-online-eval": [
    "在线评估",
    "评估漏斗",
    "判官采样打分",
    "评审队列",
    "数据集晋升"
   ],
   "ops-drift": [
    "漂移监测",
    "静默换 checkpoint",
    "嵌入距离",
    "回归集重跑"
   ],
   "ops-release": [
    "版本注册表",
    "评估门禁",
    "金丝雀",
    "秒级回滚",
    "四层版本键"
   ],
   "ops-incident": [
    "AI runbook 四问",
    "成本尖峰",
    "急停开关",
    "HITL 分级",
    "事故 SLA"
   ],
   "ops-tooling": [
    "LangSmith",
    "Langfuse",
    "Arize Phoenix",
    "Braintrust",
    "AgentOps"
   ],
   "ops-cheatsheet": [
    "运营包五件套",
    "月度质量报告",
    "观测验收六个可"
   ],
   "rag-what-why": [
    "RAG 三步流程",
    "RAG vs 微调",
    "幻觉"
   ],
   "rag-embedding": [
    "Embedding",
    "余弦相似度",
    "ANN",
    "HNSW",
    "pgvector",
    "向量库选型"
   ],
   "rag-chunking": [
    "Chunking",
    "块大小/重叠",
    "Contextual Retrieval",
    "语义切分"
   ],
   "rag-reranking": [
    "两阶段检索",
    "交叉编码器",
    "Bi-Encoder",
    "Cohere Rerank",
    "BGE-reranker"
   ],
   "rag-evaluation": [
    "Ragas",
    "Faithfulness",
    "上下文精确率/召回率",
    "六段诊断",
    "DeepEval"
   ],
   "rag-pipeline": [
    "离线建库/在线查询",
    "最小 RAG 管线",
    "LlamaIndex",
    "LangGraph"
   ],
   "rag-hybrid": [
    "BM25",
    "混合检索",
    "RRF",
    "k≈60"
   ],
   "rag-agentic": [
    "Agentic RAG",
    "CRAG",
    "Self-RAG",
    "Router",
    "ReAct"
   ],
   "rag-production": [
    "质量漂移",
    "语义缓存",
    "检索层 ACL",
    "Trace",
    "四层证明"
   ],
   "rag-graphrag": [
    "GraphRAG",
    "Leiden 社区检测",
    "LazyGraphRAG",
    "LightRAG",
    "全局查询"
   ],
   "rag-multimodal": [
    "多模态 RAG",
    "ColPali",
    "MaxSim 晚交互",
    "转述索引",
    "统一多模态嵌入"
   ],
   "rag-structured": [
    "Text-to-SQL",
    "语义层",
    "静默错误",
    "查文/查数路由"
   ],
   "agent-what-why": [
    "Agent 循环",
    "Chatbot/Workflow/Agent 光谱",
    "停机条件"
   ],
   "agent-components": [
    "ReAct",
    "Function Calling",
    "工具设计",
    "短期/长期记忆"
   ],
   "agent-orchestration": [
    "编排五模式",
    "Orchestrator-Workers",
    "A2A",
    "Agent Card"
   ],
   "agent-tools-mcp": [
    "MCP",
    "M×N 问题",
    "六层工具契约",
    "Resources vs Tools"
   ],
   "agent-context": [
    "上下文工程",
    "context rot",
    "Compaction",
    "Just-in-time 检索",
    "子 agent 隔离"
   ],
   "agent-eval-guardrails": [
    "pass^k",
    "轨迹级评估",
    "LLM-as-judge",
    "OWASP Agentic Top 10",
    "提示注入"
   ],
   "agent-lowcode": [
    "Coze",
    "Dify",
    "n8n",
    "HiAgent",
    "fair-code 许可证"
   ],
   "agent-memory": [
    "Mem0",
    "Letta (MemGPT)",
    "Zep",
    "LangMem",
    "记忆投毒 MINJA"
   ],
   "agent-computer-use": [
    "Computer Use",
    "GUI Agent",
    "OSWorld",
    "Browser Use",
    "RPA 混合"
   ],
   "agent-subagent": [
    "Sub-agent",
    "扇出/扇入",
    "任务书",
    "context: fork",
    "15× token 账"
   ],
   "agent-cheatsheet": [
    "启用条件决策树",
    "六条验收线",
    "按症状导航"
   ],
   "mm-what-why": [
    "理解侧 vs 生成侧",
    "能力谱系",
    "OCR 分工",
    "方案分诊"
   ],
   "mm-encoder": [
    "ViT",
    "patch",
    "CLIP",
    "SigLIP",
    "视觉 token"
   ],
   "mm-fusion": [
    "投影层 LLaVA",
    "交叉注意力 Flamingo",
    "Q-Former BLIP-2",
    "原生 vs 拼管线"
   ],
   "mm-understanding": [
    "MMMU",
    "OCRBench",
    "InternVL3",
    "Qwen3-VL",
    "能力边界"
   ],
   "mm-generation": [
    "扩散 vs 自回归",
    "GPT Image 2",
    "Nano Banana 2",
    "音色克隆",
    "any-to-any"
   ],
   "mm-selection": [
    "成本/延迟/精度铁三角",
    "视觉 token 成本",
    "vLLM 自部署",
    "五层输入合同"
   ],
   "mm-production": [
    "视觉幻觉",
    "跨模态提示注入",
    "评估四把尺",
    "分辨率上限"
   ],
   "mm-voice-realtime": [
    "级联管线",
    "端到端 S2S",
    "gpt-realtime",
    "VAD",
    "打断 barge-in",
    "WebRTC"
   ],
   "mm-video-generation": [
    "Seedance",
    "Sora 2",
    "可灵 Kling",
    "Veo",
    "按秒计价",
    "内容标识"
   ],
   "sp-what-why": [
    "场景×积木",
    "需求分诊",
    "一物三用"
   ],
   "sp-method": [
    "五层参考架构",
    "POC 三要素",
    "三本账",
    "口径鉴别术",
    "方案验收六条线"
   ],
   "sp-customer-service": [
    "三层漏斗",
    "deflection vs resolution",
    "解决率口径",
    "语音客服"
   ],
   "sp-knowledge-search": [
    "权限感知检索",
    "连接器",
    "Glean",
    "越权测试集"
   ],
   "sp-content-gen": [
    "品牌一致性",
    "禁用词护栏",
    "Firefly 商业安全",
    "人审分级"
   ],
   "sp-ai-coding": [
    "Copilot",
    "Cursor",
    "Claude Code",
    "双层格局",
    "DORA 指标"
   ],
   "sp-digital-human": [
    "数字人",
    "HeyGen",
    "离线 vs 实时",
    "深度合成标识"
   ],
   "sp-chatbi": [
    "ChatBI",
    "语义层",
    "Cortex Analyst",
    "三道闸",
    "Semantic View Autopilot"
   ],
   "sp-meeting": [
    "会议助手",
    "WER",
    "说话人分离",
    "会议记忆库",
    "bot 疲劳"
   ],
   "llm-why-transformer": [
    "Transformer",
    "RNN",
    "长距离依赖",
    "Attention Is All You Need",
    "可扩展性"
   ],
   "llm-attention-qkv": [
    "QKV",
    "缩放点积注意力",
    "Softmax",
    "因果掩码",
    "多头注意力"
   ],
   "llm-architecture": [
    "Embedding",
    "RoPE",
    "FFN",
    "残差连接/LayerNorm",
    "Decoder-only",
    "MoE"
   ],
   "llm-inference-kv": [
    "KV 缓存",
    "prefill/decode",
    "TTFT/TPOT",
    "上下文窗口",
    "有效窗口 RULER"
   ],
   "llm-attention-zoo": [
    "GQA",
    "MLA",
    "稀疏注意力 DSA",
    "滑动窗口 SWA",
    "线性混合",
    "FlashAttention"
   ],
   "llm-presales-map": [
    "架构选型七问",
    "四类失败分诊",
    "Mamba/SSM"
   ],
   "pe-what-why": [
    "提示词工程",
    "能力杠杆",
    "提示词→RAG→微调"
   ],
   "pe-anatomy": [
    "system prompt",
    "消息角色",
    "四要素",
    "分隔符",
    "五层结构"
   ],
   "pe-core-techniques": [
    "zero-shot/few-shot",
    "CoT 思维链",
    "结构化输出",
    "正向表述"
   ],
   "pe-advanced-reasoning": [
    "自洽性",
    "ReAct",
    "提示词链",
    "ToT",
    "推理预算"
   ],
   "pe-engineering": [
    "提示词版本化",
    "评估驱动",
    "DSPy MIPROv2/GEPA",
    "提示词缓存",
    "上下文预算四分区"
   ],
   "pe-security": [
    "提示词注入",
    "间接注入",
    "越狱",
    "OWASP LLM01",
    "纵深防御",
    "护栏"
   ],
   "pe-presales-map": [
    "选型判断树",
    "六步白板演练",
    "上线验收四条线"
   ],
   "llminf-anatomy": [
    "自回归",
    "prefill/decode 两阶段",
    "TTFT",
    "TPOT",
    "带宽墙"
   ],
   "llminf-kv-budget": [
    "KV Cache 心算",
    "GQA/MLA",
    "显存账本",
    "长上下文成本",
    "容量规划"
   ],
   "llminf-batching": [
    "Continuous Batching",
    "PagedAttention",
    "Prefix Caching",
    "RadixAttention",
    "Chunked Prefill"
   ],
   "llminf-engines": [
    "vLLM",
    "SGLang",
    "TensorRT-LLM/NIM",
    "llama.cpp/Ollama",
    "OpenAI 兼容 API"
   ],
   "llminf-quant": [
    "FP8",
    "INT4",
    "AWQ/GPTQ",
    "NVFP4",
    "GGUF",
    "校准"
   ],
   "llminf-speculative": [
    "投机解码",
    "EAGLE-3",
    "MTP",
    "接受率",
    "Test-time Scaling"
   ],
   "llminf-disagg": [
    "P/D 分离",
    "Mooncake",
    "Dynamo",
    "llm-d",
    "TP/PP/EP",
    "KV 分层存储"
   ],
   "llminf-production": [
    "SLO",
    "goodput",
    "压测",
    "成本心算",
    "盈亏线利用率"
   ],
   "llmtrain-overview": [
    "训练流水线六道工序",
    "base/instruct/reasoning",
    "训练 vs 推理成本"
   ],
   "llmtrain-data": [
    "清洗去重",
    "FineWeb",
    "分词/BPE",
    "数据墙",
    "模型坍缩"
   ],
   "llmtrain-pretrain": [
    "下一词预测",
    "Scaling Laws/Chinchilla",
    "稀疏 MoE",
    "FP8 训练",
    "Muon"
   ],
   "llmtrain-sft": [
    "SFT",
    "LIMA 质量>数量",
    "蒸馏造数据",
    "Chat Template"
   ],
   "llmtrain-alignment": [
    "RLHF",
    "奖励模型",
    "Reward Hacking",
    "DPO",
    "对齐税"
   ],
   "llmtrain-reasoning": [
    "RLVR",
    "GRPO",
    "DeepSeek-R1",
    "思维链",
    "推理蒸馏",
    "推理时扩展"
   ],
   "llmtrain-infra": [
    "16 字节/参数显存账",
    "DP/TP/PP/EP",
    "ZeRO",
    "6ND 法则",
    "MFU",
    "checkpoint 容错"
   ],
   "llmtrain-eval": [
    "benchmark 三层",
    "数据污染/刷榜",
    "Arena",
    "模型卡五盯点",
    "开源许可"
   ],
   "aic-overview": [
    "五层栈",
    "功率密度/液冷",
    "东西向流量",
    "训练 vs 推理曲线"
   ],
   "aic-gpu": [
    "Tensor Core",
    "精度阶梯 FP8/FP4",
    "Roofline",
    "MFU"
   ],
   "aic-hbm": [
    "HBM 堆叠",
    "HBM4",
    "16 字节/参数训练账",
    "权重+KV 推理账"
   ],
   "aic-chips": [
    "NVIDIA Rubin",
    "CUDA 护城河",
    "AMD MI400",
    "TPU Ironwood",
    "昇腾 910C"
   ],
   "aic-scaleup": [
    "NVLink 5",
    "NVSwitch",
    "NVL72",
    "带宽阶梯",
    "UALink"
   ],
   "aic-scaleout": [
    "RDMA/GPUDirect",
    "NCCL",
    "AllReduce/AllToAll",
    "InfiniBand vs RoCE",
    "Ultra Ethernet",
    "轨道优化"
   ],
   "aic-storage": [
    "并行文件系统",
    "checkpoint 洪峰写",
    "对象存储分层",
    "KV Cache 外置"
   ],
   "aic-econ": [
    "TCO",
    "PUE/液冷",
    "建 vs 租 vs API",
    "盈亏线利用率"
   ],
   "aip-overview": [
    "平台四大职责",
    "裸机之痛",
    "利用率翻倍 ROI",
    "K8s + 插件",
    "四条控制链"
   ],
   "aip-k8s-gpu": [
    "Device Plugin",
    "DRA",
    "GPU Operator",
    "拓扑感知申请"
   ],
   "aip-scheduling": [
    "gang scheduling",
    "碎片/bin-packing",
    "Kueue",
    "Volcano",
    "KAI/Run:ai"
   ],
   "aip-sharing": [
    "MIG",
    "时间片",
    "MPS",
    "HAMi",
    "多租户隔离"
   ],
   "aip-faulttol": [
    "checkpoint 异步/分级",
    "自愈循环",
    "466 次中断",
    "HyperPod"
   ],
   "aip-observability": [
    "利用率三层口径",
    "MFU",
    "goodput",
    "四大黑洞",
    "DCGM",
    "chargeback"
   ],
   "aip-serving": [
    "训练 vs 推理调度",
    "KServe",
    "llm-d/Dynamo",
    "扩缩信号",
    "冷启动"
   ],
   "aip-cloud": [
    "云上四形态",
    "责任递交线",
    "三问定档",
    "自建隐藏工作量"
   ],
   "ml-map": [
    "三大阵营",
    "企业/消费份额分裂",
    "Menlo 口径",
    "模型贬值资产"
   ],
   "ml-closed": [
    "闭源旗舰家族",
    "GPT-5.6 三档",
    "Claude 5",
    "Gemini 3.1",
    "Grok 4.3"
   ],
   "ml-open": [
    "开放权重",
    "开源追平",
    "SWE-bench",
    "MoE 稀疏激活",
    "Llama 4"
   ],
   "ml-china": [
    "国产四强",
    "豆包家族",
    "昇腾全国产训练",
    "模型即入口"
   ],
   "ml-platforms": [
    "火山方舟",
    "阿里百炼",
    "百度千帆",
    "腾讯混元",
    "模型货架哲学"
   ],
   "ml-license": [
    "open weight",
    "OSAID",
    "MIT/Apache 2.0",
    "社区许可证",
    "蒸馏条款继承"
   ],
   "ml-price": [
    "价格光谱",
    "三档家族制",
    "缓存经济学",
    "报价纪律",
    "降价传导"
   ],
   "ml-capability": [
    "上下文窗口",
    "有效窗口",
    "多模态矩阵",
    "思考预算",
    "overthinking"
   ],
   "ml-selection": [
    "多模型组合",
    "三层路由",
    "五约束决策树",
    "Leaderboard Illusion",
    "评估集终审"
   ],
   "ml-cheatsheet": [
    "赏味期限",
    "保鲜声明",
    "定点复查"
   ],
   "de-what-why": [
    "数据就绪度",
    "四问评估",
    "显性工程件",
    "数据工程报价"
   ],
   "de-parsing": [
    "文档智能解析",
    "LlamaParse",
    "Docling",
    "MinerU",
    "表格保真",
    "CJK 版面"
   ],
   "de-pipeline": [
    "连接器五件事",
    "增量同步",
    "webhook/CDC",
    "内容指纹去重",
    "失效下架"
   ],
   "de-vectordb": [
    "向量库选型",
    "pgvector",
    "Qdrant",
    "Milvus",
    "混合检索",
    "向量库迁移"
   ],
   "de-quality": [
    "质量四指标",
    "覆盖率仪表盘",
    "坏答案回流",
    "修数据不改提示词"
   ],
   "de-labeling": [
    "标注预算三去向",
    "合成数据",
    "种子样本",
    "坏例分流",
    "保留集防应试"
   ],
   "de-governance": [
    "ACL 映射",
    "采集点脱敏",
    "越权测试集",
    "向量化≠匿名化",
    "遗忘权",
    "血缘"
   ]
  },
  "meta": {
   "mcp-what-why": {
    "mod": "MCP",
    "modId": "mcp",
    "title": "是什么/为什么",
    "web": "./mcp/index.html",
    "hue": 2
   },
   "mcp-protocol": {
    "mod": "MCP",
    "modId": "mcp",
    "title": "协议解剖",
    "web": "./mcp/index.html",
    "hue": 2
   },
   "mcp-transport": {
    "mod": "MCP",
    "modId": "mcp",
    "title": "传输与演进",
    "web": "./mcp/index.html",
    "hue": 2
   },
   "mcp-server": {
    "mod": "MCP",
    "modId": "mcp",
    "title": "动手写 server",
    "web": "./mcp/index.html",
    "hue": 2
   },
   "mcp-production": {
    "mod": "MCP",
    "modId": "mcp",
    "title": "生产落地",
    "web": "./mcp/index.html",
    "hue": 2
   },
   "mcp-security": {
    "mod": "MCP",
    "modId": "mcp",
    "title": "安全",
    "web": "./mcp/index.html",
    "hue": 2
   },
   "mcp-cheatsheet": {
    "mod": "MCP",
    "modId": "mcp",
    "title": "售前速查（高频问题 / 上手排错 / 版本口径与串联；2026-07-11 补齐全库速查惯例）",
    "web": "./mcp/index.html",
    "hue": 2
   },
   "a2a-what-why": {
    "mod": "A2A",
    "modId": "a2a",
    "title": "是什么/为什么（与 MCP 分工）",
    "web": "./a2a/index.html",
    "hue": 2
   },
   "a2a-protocol": {
    "mod": "A2A",
    "modId": "a2a",
    "title": "协议解剖（五大对象与生命周期）",
    "web": "./a2a/index.html",
    "hue": 2
   },
   "a2a-transport": {
    "mod": "A2A",
    "modId": "a2a",
    "title": "发现与传输（Agent Card 发现·三绑定·流式）",
    "web": "./a2a/index.html",
    "hue": 2
   },
   "a2a-handson": {
    "mod": "A2A",
    "modId": "a2a",
    "title": "动手做：跑通一次 A2A 协作",
    "web": "./a2a/index.html",
    "hue": 2
   },
   "a2a-orchestration": {
    "mod": "A2A",
    "modId": "a2a",
    "title": "多智能体协作（opaque agents·任务委派）",
    "web": "./a2a/index.html",
    "hue": 2
   },
   "a2a-production": {
    "mod": "A2A",
    "modId": "a2a",
    "title": "生产落地·上云",
    "web": "./a2a/index.html",
    "hue": 2
   },
   "a2a-security": {
    "mod": "A2A",
    "modId": "a2a",
    "title": "安全 · 售前速查",
    "web": "./a2a/index.html",
    "hue": 2
   },
   "gw-what-why": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "是什么·为什么(从 API 网关到 AI 网关)",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "gw-unify": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "统一接入与协议转换",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "gw-route": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "路由·负载·容灾",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "gw-cost": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "流量与成本治理",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "gw-guardrail": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "安全·合规·护栏(挂载点)",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "gw-observe": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "可观测",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "gw-mcp": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "AI 网关 + MCP 网关(展开章,含授权时序深潜)",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "gw-cheatsheet": {
    "mod": "AI-Gateway",
    "modId": "ai-gateway",
    "title": "选型与上云·售前速查",
    "web": "./ai-gateway/index.html",
    "hue": 3
   },
   "sec-landscape": {
    "mod": "Security",
    "modId": "security",
    "title": "为什么 AI 安全是新问题(威胁全景)",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-prompt-injection": {
    "mod": "Security",
    "modId": "security",
    "title": "提示注入与越狱",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-data-privacy": {
    "mod": "Security",
    "modId": "security",
    "title": "数据与隐私安全",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-supply-chain": {
    "mod": "Security",
    "modId": "security",
    "title": "供应链与模型来源",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-agentic": {
    "mod": "Security",
    "modId": "security",
    "title": "Agent 与工具安全",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-defense": {
    "mod": "Security",
    "modId": "security",
    "title": "防护工程:护栏·模式·红队",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-governance": {
    "mod": "Security",
    "modId": "security",
    "title": "治理与合规框架",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-china": {
    "mod": "Security",
    "modId": "security",
    "title": "中国监管合规",
    "web": "./security/index.html",
    "hue": 3
   },
   "sec-cheatsheet": {
    "mod": "Security",
    "modId": "security",
    "title": "售前速查",
    "web": "./security/index.html",
    "hue": 3
   },
   "eval-why-hard": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "为什么评估这么难",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "eval-benchmarks": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "模型基准测试全景",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "eval-methods": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "评估方法谱系",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "eval-judge": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "LLM-as-a-Judge 深潜",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "eval-build": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "自建评估:数据集与指标设计",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "eval-scenarios": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "场景验收:RAG / Agent / 微调",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "eval-tooling": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "评估工具链与生产闭环",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "eval-cheatsheet": {
    "mod": "Evaluation",
    "modId": "evaluation",
    "title": "售前速查",
    "web": "./evaluation/index.html",
    "hue": 3
   },
   "ft-when": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "什么时候该微调",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ft-methods": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "微调方法谱系（全参 / LoRA / QLoRA）",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ft-data": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "数据准备：微调成败在此",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ft-training": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "训练实操与框架图鉴",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ft-alignment": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "偏好对齐落地（DPO / RFT）",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ft-cloud": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "托管微调服务与上云落地",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ft-eval-deploy": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "评估与部署",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ft-field-guide": {
    "mod": "Fine-tuning",
    "modId": "fine-tuning",
    "title": "售前速查",
    "web": "./fine-tuning/index.html",
    "hue": 3
   },
   "ops-what-why": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "为什么 LLM 应用的 Ops 是新学科（两根新轴 / 静默退化 / 边界地图 / 观测成本）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "ops-tracing": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "Tracing 与 OTel GenAI 深潜（span 四类 / trace 旅程 / PII 三开关）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "ops-online-eval": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "在线评估与反馈回流（采样异步打分 / 评估漏斗 / 闭环三件套）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "ops-drift": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "漂移与静默退化监测（三类漂移 / 检测组合拳 / 巡检节奏）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "ops-release": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "发布管理（版本注册表 / 评估门禁 / 金丝雀 / 回滚 / 环境与 A/B）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "ops-incident": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "事故响应（AI runbook 四问 / 急停 / HITL 分级 / 事故分级 SLA）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "ops-tooling": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "工具格局与选型（六平台 / Braintrust · AgentOps / APM vs 专用 / 上云）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "ops-cheatsheet": {
    "mod": "AI-Ops",
    "modId": "ai-ops",
    "title": "售前速查（运营包五件套 / 指标速查 / 选型卡 / 串联地图）",
    "web": "./ai-ops/index.html",
    "hue": 3
   },
   "rag-what-why": {
    "mod": "RAG",
    "modId": "rag",
    "title": "是什么/为什么",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-embedding": {
    "mod": "RAG",
    "modId": "rag",
    "title": "向量检索与 Embedding",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-chunking": {
    "mod": "RAG",
    "modId": "rag",
    "title": "切分策略 Chunking",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-reranking": {
    "mod": "RAG",
    "modId": "rag",
    "title": "重排序 Reranking",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-evaluation": {
    "mod": "RAG",
    "modId": "rag",
    "title": "常见评估方法",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-pipeline": {
    "mod": "RAG",
    "modId": "rag",
    "title": "最小 RAG 管线",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-hybrid": {
    "mod": "RAG",
    "modId": "rag",
    "title": "混合检索",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-agentic": {
    "mod": "RAG",
    "modId": "rag",
    "title": "Agentic RAG",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-production": {
    "mod": "RAG",
    "modId": "rag",
    "title": "生产化与常见坑",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-graphrag": {
    "mod": "RAG",
    "modId": "rag",
    "title": "GraphRAG：图谱增强检索",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-multimodal": {
    "mod": "RAG",
    "modId": "rag",
    "title": "多模态 RAG",
    "web": "./rag/index.html",
    "hue": 1
   },
   "rag-structured": {
    "mod": "RAG",
    "modId": "rag",
    "title": "结构化数据 RAG（Text-to-SQL 与语义层）",
    "web": "./rag/index.html",
    "hue": 1
   },
   "agent-what-why": {
    "mod": "Agent",
    "modId": "agent",
    "title": "是什么/为什么",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-components": {
    "mod": "Agent",
    "modId": "agent",
    "title": "核心组件",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-orchestration": {
    "mod": "Agent",
    "modId": "agent",
    "title": "编排模式",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-tools-mcp": {
    "mod": "Agent",
    "modId": "agent",
    "title": "工具接入与 MCP",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-context": {
    "mod": "Agent",
    "modId": "agent",
    "title": "上下文工程",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-eval-guardrails": {
    "mod": "Agent",
    "modId": "agent",
    "title": "评估与护栏",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-lowcode": {
    "mod": "Agent",
    "modId": "agent",
    "title": "低代码 Agent 平台（Coze/Dify/n8n/HiAgent 与 code-first 边界）",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-memory": {
    "mod": "Agent",
    "modId": "agent",
    "title": "记忆系统（四种记忆分层 / 框架四强 / 记忆投毒 ASI06）",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-computer-use": {
    "mod": "Agent",
    "modId": "agent",
    "title": "Computer Use 与 GUI Agent（三路线 / 基准两口径 / RPA 混合 / 安全四件）",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-subagent": {
    "mod": "Agent",
    "modId": "agent",
    "title": "多智能体 / Sub-agent 编排（三层框架 / 三性质 / CC·Codex 实操 / 四层触发 / 决策账）",
    "web": "./agent/index.html",
    "hue": 1
   },
   "agent-cheatsheet": {
    "mod": "Agent",
    "modId": "agent",
    "title": "售前速查（高频问题 / 启用条件决策树 / 串联地图；替代原全书串联页）",
    "web": "./agent/index.html",
    "hue": 1
   },
   "mm-what-why": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "是什么 / 为什么（感知面全景、理解 vs 生成）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-encoder": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "机器怎么「看」（ViT / CLIP / 编码器选型）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-fusion": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "模态怎么「拼」（三路线 + 原生 vs 拼管线）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-understanding": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "理解侧能力盘点（图 / 文档 / 视频 / 语音 + 格局）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-generation": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "生成侧能力盘点（扩散 vs 自回归 / 视频 / 语音）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-selection": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "选型与动手做（成本 / 延迟 / 精度、调用、部署）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-production": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "生产落地与坑（成本 / 幻觉 / 评估 / 安全）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-voice-realtime": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "语音与实时交互（延迟预算 / 级联 vs 端到端 / 打断 / RTC 框架）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "mm-video-generation": {
    "mod": "Multimodal",
    "modId": "multimodal",
    "title": "视频生成（四家旗舰格局、按秒计价成本账、工作流与标识合规）",
    "web": "./multimodal/index.html",
    "hue": 1
   },
   "sp-what-why": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "从技术轴到场景轴（方案 = 场景 × 积木）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-method": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "方案共性方法（五层架构 / POC 三要素 / 三本账 / 口径鉴别）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-customer-service": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "智能客服（三层漏斗 / 解决率口径 / 语音客服）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-knowledge-search": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "企业知识库与 AI 搜索（权限命门 / Glean 模式）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-content-gen": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "营销与内容生成（品牌工程 / 商业安全 / 人审）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-ai-coding": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "AI Coding 与研发提效（双层格局 / 企业三关注）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-digital-human": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "数字人（离线 vs 实时 / 合规红线）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-chatbi": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "ChatBI 与数据分析（语义层口径战场 / 三道闸 / 产品格局）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "sp-meeting": {
    "mod": "Solution-Patterns",
    "modId": "solution-patterns",
    "title": "会议与办公助手（记忆库资产 / 三层口径 / 合规红线）",
    "web": "./solution-patterns/index.html",
    "hue": 0
   },
   "llm-why-transformer": {
    "mod": "LLM",
    "modId": "llm",
    "title": "从序列问题到 Transformer",
    "web": "./llm/index.html",
    "hue": 4
   },
   "llm-attention-qkv": {
    "mod": "LLM",
    "modId": "llm",
    "title": "注意力机制：QKV 拆解",
    "web": "./llm/index.html",
    "hue": 4
   },
   "llm-architecture": {
    "mod": "LLM",
    "modId": "llm",
    "title": "Transformer 全解剖",
    "web": "./llm/index.html",
    "hue": 4
   },
   "llm-inference-kv": {
    "mod": "LLM",
    "modId": "llm",
    "title": "从架构到推理：上下文窗口与 KV 缓存",
    "web": "./llm/index.html",
    "hue": 4
   },
   "llm-attention-zoo": {
    "mod": "LLM",
    "modId": "llm",
    "title": "注意力的工程进化",
    "web": "./llm/index.html",
    "hue": 4
   },
   "llm-presales-map": {
    "mod": "LLM",
    "modId": "llm",
    "title": "售前视角收拢",
    "web": "./llm/index.html",
    "hue": 4
   },
   "pe-what-why": {
    "mod": "Prompt-Engineering",
    "modId": "pe",
    "title": "是什么 / 为什么",
    "web": "./prompt-engineering/index.html",
    "hue": 4
   },
   "pe-anatomy": {
    "mod": "Prompt-Engineering",
    "modId": "pe",
    "title": "提示词解剖（角色/四要素/分隔符）",
    "web": "./prompt-engineering/index.html",
    "hue": 4
   },
   "pe-core-techniques": {
    "mod": "Prompt-Engineering",
    "modId": "pe",
    "title": "核心技巧（zero/few-shot、CoT、结构化输出、清晰指令）",
    "web": "./prompt-engineering/index.html",
    "hue": 4
   },
   "pe-advanced-reasoning": {
    "mod": "Prompt-Engineering",
    "modId": "pe",
    "title": "进阶推理与编排（自洽性、ReAct、提示词链、推理模型时代）",
    "web": "./prompt-engineering/index.html",
    "hue": 4
   },
   "pe-engineering": {
    "mod": "Prompt-Engineering",
    "modId": "pe",
    "title": "工程化与自动优化（版本化、评估驱动、DSPy、缓存）",
    "web": "./prompt-engineering/index.html",
    "hue": 4
   },
   "pe-security": {
    "mod": "Prompt-Engineering",
    "modId": "pe",
    "title": "安全与风险（提示词注入、越狱、OWASP、纵深防御）",
    "web": "./prompt-engineering/index.html",
    "hue": 4
   },
   "pe-presales-map": {
    "mod": "Prompt-Engineering",
    "modId": "pe",
    "title": "售前视角收拢（问题速查、选型树、上云全景、串联）",
    "web": "./prompt-engineering/index.html",
    "hue": 4
   },
   "llminf-anatomy": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "推理是怎么跑起来的",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llminf-kv-budget": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "KV Cache 与显存账",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llminf-batching": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "把 GPU 喂饱：批处理与调度",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llminf-engines": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "推理框架图鉴",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llminf-quant": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "让模型变小：量化",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llminf-speculative": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "让模型变快：投机解码与算法加速",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llminf-disagg": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "集群级：P/D 分离与分布式推理",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llminf-production": {
    "mod": "LLM-Inference",
    "modId": "llm-inference",
    "title": "生产化与售前速查",
    "web": "./llm-inference/index.html",
    "hue": 4
   },
   "llmtrain-overview": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "全景总览：从随机权重到可用助手",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "llmtrain-data": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "数据：模型的粮食",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "llmtrain-pretrain": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "预训练：压缩互联网",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "llmtrain-sft": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "后训练 I · SFT：教会听话",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "llmtrain-alignment": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "后训练 II · 对齐：教会分寸",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "llmtrain-reasoning": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "后训练 III · RLVR 与推理模型：教会思考",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "llmtrain-infra": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "训练基础设施与算力账",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "llmtrain-eval": {
    "mod": "LLM-Training",
    "modId": "llm-training",
    "title": "评估与发布：怎么知道练成了",
    "web": "./llm-training/index.html",
    "hue": 4
   },
   "aic-overview": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "全景总览：从一张卡到一座 AI 工厂",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aic-gpu": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "GPU 解剖：为什么 AI 计算长在 GPU 上",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aic-hbm": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "显存与 HBM：AI 时代最贵的房地产",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aic-chips": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "芯片格局与选型：NVIDIA 之内与之外",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aic-scaleup": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "Scale-up 互联：把 72 张卡焊成一张大卡",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aic-scaleout": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "Scale-out 网络：把一万张卡连成集群",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aic-storage": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "存储与数据管线：别让 GPU 等数据",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aic-econ": {
    "mod": "AI-Infra-Compute",
    "modId": "ai-infra-compute",
    "title": "算力经济学与售前速查",
    "web": "./ai-infra-compute/index.html",
    "hue": 5
   },
   "aip-overview": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "平台全景：从「一堆卡」到「一个平台」",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "aip-k8s-gpu": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "K8s + GPU 基础：从数卡到懂卡",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "aip-scheduling": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "作业调度：让最贵的卡不空转",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "aip-sharing": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "GPU 切分与多租户",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "aip-faulttol": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "训练容错工程：万卡集群故障是常态",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "aip-observability": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "可观测性与利用率运营",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "aip-serving": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "推理服务平台化",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "aip-cloud": {
    "mod": "AI-Infra-Platform",
    "modId": "ai-infra-platform",
    "title": "云上算力形态与售前速查",
    "web": "./ai-infra-platform/index.html",
    "hue": 5
   },
   "ml-map": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "全景地图（三大阵营 / 两个市场 / 一年三变局）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-closed": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "闭源旗舰家族图谱（五张名片 + 对比总表）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-open": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "开放权重格局（中国四强榜首 / 西方线 / 追平叙事）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-china": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "中国格局与豆包定位（四强横评 / 豆包家族 / 场景口径）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-platforms": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "国内平台格局（方舟/百炼/千帆/腾讯四平台画像、货架哲学、价格锚点、选型三问）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-license": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "许可证与合规边界（open weight vs open source / 三级分类）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-price": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "价格带与成本工程（光谱 / 三档制 / 缓存经济学）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-capability": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "能力矩阵与推理模型（窗口 / 模态 / 思考预算 / overthinking）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-selection": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "选型方法论（多模型默认解 / 三层路由 / 两道防线）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "ml-cheatsheet": {
    "mod": "Model-Landscape",
    "modId": "model-landscape",
    "title": "售前速查（总表 / 价格卡 / 许可证卡 / 保鲜声明 / 串联）",
    "web": "./model-landscape/index.html",
    "hue": 0
   },
   "de-what-why": {
    "mod": "Data-Engineering",
    "modId": "data-engineering",
    "title": "数据就绪度是第一风险（四问 / 管线总图 / 报价项）",
    "web": "./data-engineering/index.html",
    "hue": 6
   },
   "de-parsing": {
    "mod": "Data-Engineering",
    "modId": "data-engineering",
    "title": "文档解析管线（四强格局 / 基准口径 / 选型分水岭）",
    "web": "./data-engineering/index.html",
    "hue": 6
   },
   "de-pipeline": {
    "mod": "Data-Engineering",
    "modId": "data-engineering",
    "title": "连接器与增量同步（五件事 / 增量三模式 / 去重失效）",
    "web": "./data-engineering/index.html",
    "hue": 6
   },
   "de-vectordb": {
    "mod": "Data-Engineering",
    "modId": "data-engineering",
    "title": "向量库选型深潜（五锚点 / 按规模演进 / 迁移纪律）",
    "web": "./data-engineering/index.html",
    "hue": 6
   },
   "de-quality": {
    "mod": "Data-Engineering",
    "modId": "data-engineering",
    "title": "数据质量与覆盖率（四指标 / 坏答案回流 / 运营节奏）",
    "web": "./data-engineering/index.html",
    "hue": 6
   },
   "de-labeling": {
    "mod": "Data-Engineering",
    "modId": "data-engineering",
    "title": "标注与合成数据运营（预算三去向 / 双线运营 / 分流口诀）",
    "web": "./data-engineering/index.html",
    "hue": 6
   },
   "de-governance": {
    "mod": "Data-Engineering",
    "modId": "data-engineering",
    "title": "治理与权限衔接（三执行点 / 越权测试 / 向量化≠匿名化）",
    "web": "./data-engineering/index.html",
    "hue": 6
   }
  }
 }
};
