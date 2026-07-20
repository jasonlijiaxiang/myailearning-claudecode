# Model-Landscape · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | model-landscape |
| 所在层 | 解决方案层（2026-07-10 层调整：自基础层迁入，与 Solution-Patterns 同层） |
| 建立日期 | 2026-07-10 |
| 最后更新 | 2026-07-10；07-13 两件套吸收：增升级回滚链深潜 + 选型验收六证据线，83→85 页；2026-07-15（呈现修复：删配图替代型残留源文字页 5 页，配图后 91→86 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），86→87 页；2026-07-17（B 类增章：新增第 9 章「国内平台格局」11 页——方舟/百炼/千帆/腾讯四平台画像、两种货架哲学、价格锚点与口径警示、选型三问，售前速查顺延第 10 章；封面保鲜引用与导览「十章一条线」同步回刷；联网核实笔记 raw-data/2026-07-17；87→98 页）；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 11 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 呈现修复：v4.3 撤电子书馆藏后残留的馆藏指向改为指向书单条目，2 处（放映序 p98），讲义不再指向已不存在的 ebooks/ 目录，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b |
| 产出 skill 版本 | v3.0 |

> **巡检特别标注：本模块是全库事实密度最高、最易过期的模块**——价格与版本号赏味期 1–3 个月，
> 榜单排名数周，份额半年。巡检时本模块优先核；讲义第 9 章有面向读者的保鲜声明页。

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| ml-map | 第 1 章 | 全景地图（三大阵营 / 两个市场 / 一年三变局） | ✅ | 2026-07-10 |
| ml-closed | 第 2 章 | 闭源旗舰家族图谱（五张名片 + 对比总表） | ✅ | 2026-07-10 |
| ml-open | 第 3 章 | 开放权重格局（中国四强榜首 / 西方线 / 追平叙事） | ✅ | 2026-07-10 |
| ml-china | 第 4 章 | 中国格局与豆包定位（四强横评 / 豆包家族 / 场景口径） | ✅ | 2026-07-10 |
| ml-license | 第 5 章 | 许可证与合规边界（open weight vs open source / 三级分类） | ✅ | 2026-07-10 |
| ml-price | 第 6 章 | 价格带与成本工程（光谱 / 三档制 / 缓存经济学） | ✅ | 2026-07-10 |
| ml-capability | 第 7 章 | 能力矩阵与推理模型（窗口 / 模态 / 思考预算 / overthinking） | ✅ | 2026-07-10 |
| ml-selection | 第 8 章 | 选型方法论（多模型默认解 / 三层路由 / 两道防线） | ✅ | 2026-07-10 |
| ml-platforms | 第 9 章 | 国内平台格局（方舟/百炼/千帆/腾讯四平台画像、货架哲学、价格锚点、选型三问） | ✅ | 2026-07-17 |
| ml-cheatsheet | 第 10 章 | 售前速查（总表 / 价格卡 / 许可证卡 / 保鲜声明 / 串联） | ✅ | 2026-07-10 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 | 建议复查日 |
| --- | --- | --- | --- | --- |
| GPT-5.6 家族 2026-07-09 GA：Sol $5/$30、Terra $2.50/$15、Luna $1/$6（每百万 token 输入/输出）；缓存读 -90%、写 1.25× | ml-closed / ml-price | 2026-07-10 | OpenAI 官方 / aipricing.guru | — |
| Claude 5 家族：Fable 5（Mythos 级、1M 上下文/128K 输出）、Mythos 5 限量、Opus 4.8、Sonnet 5 尝鲜价 $2/$10（至 2026-08-31，后 $3/$15）；Fable/Mythos 出口管制风波后 2026-07-01 恢复 | ml-closed | 2026-07-10 | Anthropic 官方 docs / ghacks | 2026-08-31 |
| 企业 LLM 支出份额（Menlo）：Anthropic 40% / OpenAI 27% / Google 21%；ChatGPT 消费份额约 74%、日 25 亿+ prompts；企业支出 $8.4B、年底看 $15B；Claude Code 年化 $1B、企业编码 54% | ml-map | 2026-07-10 | Menlo 报告 / officechai / aimultiple | — |
| Gemini 3.1 Pro（推理/长视频旗舰、旗舰中 API 最低价）；Flash-Lite $0.10/$0.40 为最低闭源档 | ml-closed / ml-price | 2026-07-10 | benchlm / cloudzero 价格页 | — |
| Grok 4.3：$1.25/$2.50、缓存输入 $0.20（比上代降 40–60%）；AA 智能指数 53；2026-06-15 上 Bedrock（第三家独立实验室）；SOC2/HIPAA | ml-closed | 2026-07-10 | VentureBeat / digitalapplied | — |
| Meta 转向：Behemoth（2T）实质搁置；Muse Spark 2026-04-08 发布（首个闭源 API-only）；Llama 4 Scout（109B/17B 激活、10M ctx）与 Maverick（400B/17B、1M）成最后开放版本 | ml-closed / ml-open | 2026-07-10 | digitimes / serenitiesai / ai.meta.com | — |
| 开源榜首（2026-07 快照）：DeepSeek V4 Pro 综合 87（SWE-bench Verified 80.6% 追平闭源；MIT）、GLM-5.1 83（MIT）、Kimi K2.6（AA 54，开源第一/总榜第四）、Qwen3.5 397B（122B/激活 10B 超 GPT-5-mini） | ml-open | 2026-07-10 | benchlm / wavect 横评 | — |
| GLM-5 为首个完全用华为昇腾训练的前沿模型（零英伟达） | ml-open / ml-china | 2026-07-10 | 国产四强横评（qiniu 2026-06） | — |
| 国产四强（2026-06 横评口径）：GLM 5.2 / Kimi K2（agent swarm 百级并行）/ Qwen3（0.6B–397B 谱系）/ DeepSeek V4（API 便宜 20–50 倍）——各至少一个主流基准超国际闭源 | ml-china | 2026-07-10 | qiniu 横评 / aitoolcn | — |
| 豆包：2.1 Pro 2026-06-23 发布（¥6/¥30、缓存命中 ¥1.2）；2.1 Turbo 半价；Seed-Evolving 月更 2–4 次；Seed-2.0-lite（2026-05，家族首个原生统一全模态）；累计 tokens 180 万亿+ | ml-china | 2026-07-10 | 新华网 / 火山方舟价格页 / 网易 | — |
| 许可证格局：OSAID v1.0（2024-10）口径下主流"开源"模型均为 open weight；DeepSeek/GLM-5.1 = MIT、Qwen3 主系 = Apache 2.0、Mistral Large 3/Small 4 转 Apache 2.0；Llama 社区证含 700M MAU 帽 + 欧盟条款 | ml-license | 2026-07-10 | qubittool / HF blog / LICENSE 原文 | — |
| 价格光谱：地板 DeepSeek V4 Flash $0.14/$0.28、Gemini Flash-Lite $0.10/$0.40；超旗舰 GPT-5.4 Pro $30/$180；整体对比 2025 降 30–60% | ml-price | 2026-07-10 | pricepertoken / cloudzero / tldl | — |
| 小模型：Phi-4 / Gemma 4（26B MoE 激活 ~4B；E2B 2.3B 有效参数 4GB 内存）/ SmolLM-3 为三大部署家族；sub-10B 常规超 2024 版 GPT-4 | ml-map / ml-capability | 2026-07-10 | bentoml / callsphere 2026 | — |
| 推理模型：思考预算两旋钮（Anthropic budget_tokens / Gemini thinkingBudget）；L1 可控 vs L2 自适应（arXiv 2507.02076）；overthinking 实证——超临界预算准确率下降（arXiv 2506.04210） | ml-capability | 2026-07-10 | arXiv 两篇（书单列官方链接） | — |
| 选型实践：Walmart Code Puppy 跨 GPT/Claude/Gemini 动态路由；ServiceNow 2026-01 同签 OpenAI+Anthropic；Gartner 预计 2028 年 70% 多模型组织用 AI 网关（2024 <5%） | ml-selection | 2026-07-10 | chatgptaihub / datatobiz / Gartner 转引 | — |
| 榜单防线：Leaderboard Illusion（私测多变体择优，arXiv 2504.20879）；MMLU 类饱和 88%+ 无区分度（与 evaluation 模块同源口径） | ml-selection | 2026-07-10 | arXiv（书单列官方链接）/ evaluation 模块 | — |

## 稳定事实（不会过期，无需巡检）
| 事实 | 章节 ID | 说明 |
| --- | --- | --- |
| 三大阵营结构（闭源旗舰/开放权重/端侧小模型）与三档家族定价制、三层路由框架、五约束决策树 | ml-map / ml-price / ml-selection | 方法论骨架，比数字保值 |

| 火山方舟：Doubao-Seed-2.1 Pro（06-23）¥6/¥30、缓存 ¥1.2，按输入长度分段计价；Coding Plan 订阅 Pro 首月 ¥44.91 续费 5 折（含 Seed-2.0-Code/DeepSeek V3.2/Kimi K2.5/GLM-4.7）；企业版支持私有化接入 | ml-platforms | 2026-07-17 | 火山方舟官网/计费文档 | 2026-08-31 |
| 阿里百炼：150+ 模型（Qwen 全系+DeepSeek/GLM/Kimi/MiniMax/Llama）；Qwen3-Max（≤32K）¥2.5/¥10、Qwen3.5-Plus（≤128K）¥0.8/¥4.8；Batch 批量一律 5 折；2026-05 大版本上架 Qwen3.7 全系与百万上下文模型 | ml-platforms | 2026-07-17 | help.aliyun.com 模型价格/百炼平台页 | 2026-08-31 |
| 百度千帆：文心 5.0 正式版 2026-01-22（2.4 万亿参数原生全模态）、5.1（2026-05，厂商称搜索登顶国内/预训练成本 6%——厂商口径）；150+ SOTA 统一纳管；平台 130 万 Agents、工具日调用超千万次 | ml-platforms | 2026-07-17 | 新华网/量子位/cloud.baidu.com | 2026-08-31 |
| 腾讯：混元 2.0 API ¥0.8/¥2、Hunyuan Standard 输入 ¥0.3；智能体开发平台 ADP 订阅制；三方模型可切换（MiniMax-M2.x/Kimi-K2.5/GLM-5 系/DeepSeek-V4 系） | ml-platforms | 2026-07-17 | 腾讯云计费与产品文档 | 2026-08-31 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| ml-selection | evaluation#eval-benchmarks | 榜单饱和与 Leaderboard Illusion 的完整弹药在 Evaluation 第 2 章；自建评估集方法在其第 5 章——选型终审依赖它（双向） |
| ml-selection / ml-price | ai-gateway#gw-route / ai-gateway#gw-cost | 三层路由与成本治理的工程落地件；Gartner 网关趋势同源（双向） |
| ml-map / ml-open | llm#llm-architecture | MoE 稀疏激活是「开源追平」与三档定价的架构根源 |
| ml-capability | llm-inference#llminf-batching | 思考预算烧的是 decode；长上下文成本机制在 LLM-Inference |
| ml-capability | rag#rag-what-why | 「1M 窗口 vs RAG」：窗口≠有效窗口，权限/新鲜度/成本三关——与 RAG 第 1 章互为弹药 |
| ml-open / ml-license | fine-tuning#ft-cloud | 开放权重 + 宽松许可证是私有化微调的前提 |
| ml-platforms | security#sec-china | 平台合规配套（备案材料/护栏）与「私有化不免合规」口径在 Security 第 8 章中国监管合规展开（讲义内已互引） |
| ml-platforms | ai-gateway#gw-unify | 「平台锁定」的解法=兼容层/网关保切换能力，机制在 AI-Gateway 统一接入章 |
| ml-platforms | multimodal#mm-fusion | 文心 5.0 原生全模态 vs 拼管线之争的机制展开在 Multimodal 第 3 章 |
| ml-cheatsheet | solution-patterns#sp-method | 「模型是可替换件」的方案叙事在 SP 第 2 章；各场景章的模型选型格子引用本模块 |
| ml-china | （候选）中国合规章 | 国内商用备案与内容合规——Security 增章待用户决策 |
