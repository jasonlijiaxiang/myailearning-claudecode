# Multimodal · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | multimodal |
| 所在层 | 应用模式层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-12（B 类：延迟页「预填充（prefill）」中英对照语序统一，内容无改动）；07-13 两件套吸收：增生成资产状态机/五层输入合同两页深潜 + 多模态验收页，96→99 页；2026-07-14 呈现回刷：封面章节条补「8·语音实时」「9·速查」、核实日期更新，无内容变更；2026-07-15（呈现修复：删配图替代型残留源文字页 2 页，配图后 106→104 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），104→105 页；2026-07-17（B 类增章：新增第 9 章「视频生成」10 页——四家旗舰格局、三大难、按秒计价成本账、四步工作流、标识合规，售前速查顺延第 10 章；封面章节条与导览「十章一条线」同步回刷；联网核实笔记 raw-data/2026-07-17；105→115 页）；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 18 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS |
| 产出 skill 版本 | v3.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| mm-what-why | 第 1 章 | 是什么 / 为什么（感知面全景、理解 vs 生成） | ✅ | 2026-07-09 |
| mm-encoder | 第 2 章 | 机器怎么「看」（ViT / CLIP / 编码器选型） | ✅ | 2026-07-09 |
| mm-fusion | 第 3 章 | 模态怎么「拼」（三路线 + 原生 vs 拼管线） | ✅ | 2026-07-09 |
| mm-understanding | 第 4 章 | 理解侧能力盘点（图 / 文档 / 视频 / 语音 + 格局） | ✅ | 2026-07-09 |
| mm-generation | 第 5 章 | 生成侧能力盘点（扩散 vs 自回归 / 视频 / 语音） | ✅ | 2026-07-09 |
| mm-selection | 第 6 章 | 选型与动手做（成本 / 延迟 / 精度、调用、部署） | ✅ | 2026-07-09 |
| mm-production | 第 7 章 | 生产落地与坑（成本 / 幻觉 / 评估 / 安全） | ✅ | 2026-07-09 |
| mm-voice-realtime | 第 8 章 | 语音与实时交互（延迟预算 / 级联 vs 端到端 / 打断 / RTC 框架） | ✅ | 2026-07-10 |
| mm-video-generation | 第 9 章 | 视频生成（四家旗舰格局、按秒计价成本账、工作流与标识合规） | ✅ | 2026-07-17 |
| mm-cheatsheet | 第 10 章 | 售前速查（术语 / 决策树 / 串联地图） | ✅ | 2026-07-09 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 | 建议复查日 |
| --- | --- | --- | --- | --- |
| 闭源旗舰原生多模态：GPT-5（统一路由）/ Gemini 2.5 Pro（原生图音视频 + 1M~2M 上下文 + MoE）/ Claude 4.5（视觉 + 1M）；test-time compute「thinking」成主流 | mm-understanding | 2026-07-09 | Pluralsight / Shakudo 2026 模型盘点 | 2026-08-01 |
| 开源 VLM SOTA：InternVL3-78B（MIT）MMMU≈72.2%；Qwen2.5-VL-72B MMMU≈70.2%/OCRBench≈888；Qwen3-VL 文档基准最强开源 | mm-understanding | 2026-07-09 | BentoML / DataCamp / Spheron 2026 | 2026-08-01 |
| 原生图像生成两大流派：扩散（FLUX.2 / Midjourney）vs 自回归（GPT Image 2〔2026-04〕、Nano Banana 2 = Gemini 3.1 Flash Image〔2026-02〕、Luma） | mm-generation | 2026-07-09 | Modelize / DualView / Curify 2026 | 2026-08-01 |
| GPT Image 2 全新自回归架构，比前代快 3–5×，多约束指令≈98% 准确、文字渲染近字符级 | mm-generation | 2026-07-09 | nanobananafree / Picsart 2026 | 2026-08-01 |
| 开源 VLM 可用 vLLM / SGLang 在 GPU 云自部署（Qwen3-VL / Llama 4 Scout / InternVL3） | mm-selection | 2026-07-09 | Spheron 部署指南 2026 | — |
| 理解侧主基准：MMMU（多学科理解）、OCRBench / DocVQA（文档）、Video-MME（视频） | mm-production | 2026-07-09 | 2026 VLM 评测综述 | — |
| 语音延迟口径：人类换话空隙 300–500ms；级联生产目标 P50 <1.5s；端到端标杆 <800ms（gpt-realtime 实测量级）；>1.5s 用户判定「坏了」 | mm-voice-realtime | 2026-07-10 | softcery / telnyx 2026 横评 | — |
| 级联时延拆帐：ASR 100–300ms + LLM 350–1000ms + TTS 90–200ms + 网络 50–200ms；2026 企业生产以级联为主（可审计 / 可换供应商） | mm-voice-realtime | 2026-07-10 | softcery / speko.ai / modulate | — |
| 端到端 S2S 格局：OpenAI gpt-realtime 家族（GA、128K、工具调用入音频环路）/ Gemini 3.1 Flash Live（2026-03-26，~200ms 首响、200+ 语言）/ Qwen3-Omni 系开源（113 语种 ASR、可自部署）/ Kyutai Moshi（全双工先驱） | mm-voice-realtime | 2026-07-10 | flowtivity / QwenLM GitHub / marktechpost | — |
| 语音成本：级联 $0.01–0.17/分钟；gpt-realtime 未缓存实测 $0.18–0.46/分钟、开缓存 $0.05–0.10（音频输入缓存折扣 ~99%）；gpt-realtime-mini 约便宜 60% | mm-voice-realtime | 2026-07-10 | hackernoon 4000 会话实测 / OpenAI 定价页 | — |
| 语音框架：Pipecat v1.0（2026-04，帧管线）/ LiveKit Agents（房间模型）；实测端到端 750–950ms 同量级；Vapi / Retell 为托管层 | mm-voice-realtime | 2026-07-10 | webrtc.ventures 2026-03 / cekura / f22labs | — |

> 说明：融合三路线（投影层 / 交叉注意力 / Q-Former）、ViT patch 化、CLIP 图文对齐属稳定原理，不会半年过期，未登记。2026-08 上旬若旗舰版本号迭代（GPT/Gemini/Claude/Qwen 新版），mm-understanding 与 mm-generation 两章的模型清单需定点复查。

| 视频生成格局（多方评测交叉）：Seedance 2.0（≤15s/1080p、原生音视频同步、参考输入 12 文件、Fast $0.022/秒）；Sora 2（故事板最长 25s）；可灵 3.0（$0.029/秒、原生 4K@60fps）；Veo 3.1（$0.75/秒、电影级+原生音频）——价差约 34 倍 | mm-video-generation | 2026-07-17 | devtk.ai/atlascloud/laozhang/opencreator 2026 横评 | 2026-08-31 |
| 即梦消费端口径：注册送 260 积分、5 秒视频约 20 积分（新用户约 13 次免费生成） | mm-video-generation | 2026-07-17 | 即梦平台/评测转述 | 2026-08-31 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| mm-understanding | rag#rag-multimodal | 本模块讲「模型多模态能力」↔ RAG 第 11 章讲「多模态内容怎么检索」，互为上下游；RAG 第 11 章已加回指页（2026-07-10），双向互指 |
| mm-fusion | rag#rag-multimodal | 「原生 vs 拼管线」的模型侧取舍 ↔ 多模态 RAG 的三条检索路线，同一取舍两个视角 |
| mm-what-why | agent#agent-components | 多模态感知（能看屏幕 / 图表）是 Agent computer use 的前提，视觉作为 Agent 的新「工具输入」；Agent 第 2 章已加回指页（2026-07-10），双向互指 |
| mm-encoder | llm#llm-attention-qkv | ViT 与 Transformer 同源、注意力机制复用；视觉编码器 = Transformer 用在图像 patch 上；LLM 第 2 章已加「承上启下」回指页（2026-07-10），双向互指 |
| mm-production | evaluation | 多模态评估基准（MMMU / OCRBench / DocVQA / Video-MME）↔ Evaluation 模块判分方法与自建评估集 |
| mm-production | security | 跨模态提示注入（图 / 文档里藏指令）↔ Security 模块提示注入防护，注入入口从文本扩展到图像 |
| mm-selection | llm-inference | 视觉 token 膨胀让 prefill 变重、显存占用增大 ↔ LLM-Inference 的 prefill/decode 与 KV Cache |
| mm-voice-realtime | llm-inference#llminf-batching | 语音链路延迟大头 = LLM 首 token；首 token 优化（批处理 / KV 缓存 / 流式）机制在 LLM-Inference 展开 |
| mm-voice-realtime | agent#agent-components | 语音是 Agent 的「耳与嘴」：实时链路为语音 Agent 提供交互层，Agent 侧编排与工具调用不变 |
| mm-voice-realtime | solution-patterns#sp-customer-service | 语音客服场景的方案视角（分流漏斗 / 解决率口径）在 Solution-Patterns 第 3 章展开（模块 2026-07-10 建成，原「候选」补实）；数字人场景另接 sp-digital-human |
| mm-video-generation | security#sec-china | AI 生成视频的标识义务与执法口径在 Security 第 8 章中国监管合规（讲义内已互引） |
| mm-video-generation | solution-patterns#sp-content-gen | 营销素材工厂场景图纸在 SP 第 5 章；本章供「视频积木」的能力与成本口径 |
