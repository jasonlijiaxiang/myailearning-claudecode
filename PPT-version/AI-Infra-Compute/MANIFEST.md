# AI-Infra-Compute · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | ai-infra-compute |
| 所在层 | 算力底座层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-13（B 类·两件套吸收：增拓扑四层对齐/容量四证据两页深潜 + 生产验收清单，79→82 页）；2026-07-14 呈现回刷：封面眉题统一为「AI 知识库 · 讲义式 PPT」，无内容变更；2026-07-15（呈现修复：删配图替代型残留源文字页 7 页，配图后 91→84 页）；2026-07-17 呈现完善：新增「总收束」页（每章一句话）+ 全册末「来源与核实」页，84→86 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 22 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20 书单订正：撤馆藏回写出处时填错的链接已逐条重新核实（详见 _maintenance/2026-07-20-原电子书馆藏出处存档.md 订正说明） |
| 产出 skill 版本 | v3.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| aic-overview | 第 1 章 | 全景总览：从一张卡到一座 AI 工厂 | ✅ | 2026-07-09 |
| aic-gpu | 第 2 章 | GPU 解剖：为什么 AI 计算长在 GPU 上 | ✅ | 2026-07-09 |
| aic-hbm | 第 3 章 | 显存与 HBM：AI 时代最贵的房地产 | ✅ | 2026-07-09 |
| aic-chips | 第 4 章 | 芯片格局与选型：NVIDIA 之内与之外 | ✅ | 2026-07-09 |
| aic-scaleup | 第 5 章 | Scale-up 互联：把 72 张卡焊成一张大卡 | ✅ | 2026-07-09 |
| aic-scaleout | 第 6 章 | Scale-out 网络：把一万张卡连成集群 | ✅ | 2026-07-09 |
| aic-storage | 第 7 章 | 存储与数据管线：别让 GPU 等数据 | ✅ | 2026-07-09 |
| aic-econ | 第 8 章 | 算力经济学与售前速查 | ✅ | 2026-07-09 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| NVIDIA 年更：Blackwell/GB200 在役、GB300 2026 放量（出货约翻倍）、Rubin H2 2026（HBM4+NVLink 6）、Rubin Ultra 2027（GTC 2026 展示 Kyber）、Feynman 2028 | aic-chips | 2026-07-09 | CNBC、wccftech、vrlatech、tech-insider（GTC 2026） |
| VR200 NVL72 官方口径推理性能约为 GB300 NVL72 的 3.3 倍 | aic-chips | 2026-07-09 | NVIDIA GTC 2026 |
| AMD MI350X/MI355X 已量产（288GB HBM3e）；MI400+Helios（72×MI455X、31TB HBM4、TSMC 2nm）官方口径 2H 2026，初代用 UALink over Ethernet | aic-chips | 2026-07-09 | AMD 官方、Tom's Hardware、DCD |
| Google TPU v7 Ironwood 2025-11 GA（192GB HBM3e、7.37TB/s、4614 FP8 TFLOPS、9216 芯 42.5EFLOPS）；AWS Trainium3 已出货（3nm、2.52PF FP8、144GB HBM3e）；两家下一代排 2027 | aic-chips | 2026-07-09 | Google Cloud 官方、SemiAnalysis、Spheron 2026 盘点 |
| 昇腾 910C 2025 量产、2026 计划约 60 万颗、算力约 H100 的 60-80%、国产化率 90%+；910D 支持 FP8 预计 2026 Q2-Q3 量产；SMIC N+2 良率约 40-50% | aic-chips | 2026-07-09 | 新浪科技/36氪/EDN China 2025-12 综述、ESM China |
| NVLink 5 单卡 1.8TB/s（18 端口）、NVL72 域内 NVLink Switch 总带宽 130TB/s | aic-scaleup | 2026-07-09 | NVIDIA 官方 GB200 NVL72 页 |
| UALink 1.0（2025-04 定稿，单层交换/至多 1024 端点）与 Broadcom SUE 竞争；原生硬件平台看 2027 | aic-scaleup | 2026-07-09 | SemiAnalysis "The New AI Networks" |
| InfiniBand Quantum-X800 XDR 800Gb/s；2025 年中起新机柜配 ConnectX-8 支持 XDR（此前 NDR 400Gb/s）；Spectrum-X800 多租户以太 | aic-scaleout | 2026-07-09 | NVIDIA、NADDOD 架构分析 |
| Ultra Ethernet UEC 1.0 规范 2025-06 发布（现 1.0.2，官网免费 PDF），100+ 成员；2026 年中全栈 UET 硬件刚出货、多数设备仅"兼容"、采纳早期 | aic-scaleout | 2026-07-09 | UEC 官网、Arista/WWT/SemiAnalysis |
| HBM4 时代开启：Samsung 2026-02-12 全球首家量产（1c DRAM+4nm、11.7Gbps）、4 个月营收破 $10 亿；SK hynix 2026 商用、有意放缓爬坡、预计供 NVIDIA HBM4 约 2/3；在役主流 HBM3e（192-288GB/卡） | aic-hbm | 2026-07-09 | TrendForce、DigiTimes、TechTimes、DCD |
| DeepSeek 3FS（Fire-Flyer File System）开源：随机读优先、放弃读缓存，自报集群聚合读 6.6-7.3TB/s，支持训练加载/checkpoint/KVCache 查询 | aic-storage | 2026-07-09 | Tom's Hardware、GitHub deepseek-ai/3FS |
| FP8 为生产推理默认精度、训练主流实践；NVFP4 面向 Blackwell、工具链成熟中 | aic-gpu | 2026-07-09 | 沿用 llm-inference#llminf-quant 同源口径 |
| 成本量级：H100 级时租 $2-3/卡·时、自建盈亏线利用率约 40-50%、托管 API $2-5/百万输出 token | aic-econ | 2026-07-09 | 沿用 llm-inference#llminf-production 同源口径 |
| 行业预测 2030 推理算力占 AI 总算力约 75% | aic-overview | 2026-07-09 | 沿用 llm-training/llm-inference 同源口径 |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| aic-overview / 全书 | ai-infra-platform | 姊妹模块：本模块讲硬件（卡/网/存储/电），对方讲平台（调度/切分/容错/观测/云形态）；两模块封面/总览页互指 |
| aic-hbm | llm-inference#llminf-kv-budget | 显存账的推理下半本：机制账（KV Cache）在对方第 2 章，硬件地基（HBM 贵）在本章，互为前后篇 |
| aic-gpu | llm-inference#llminf-quant | 精度阶梯 FP8/FP4 是量化落地的硬件前提 |
| aic-hbm | llm-training#llmtrain-infra | 训练显存账（×16 字节）↔ ZeRO/FSDP 切分方案：本章讲账、对方讲怎么把账切开分摊 |
| aic-scaleup / aic-scaleout | llm-training#llmtrain-infra | 并行策略（TP/PP/EP）产生的通信量决定网络怎么建；本模块讲网络、对方讲并行 |
| aic-storage | llm-inference#llminf-disagg | KV Cache 外置 ↔ P/D 分离/Mooncake/Dynamo KV 路由：存储升级为推理性能部件 |
| aic-econ | llm-inference#llminf-production | 建 vs 租 vs API 盈亏线口径同源引用 |
| aic-overview | llm-training#llmtrain-overview | 训练一次性重投入 vs 推理持续账单、2030 推理 75% 预测同源 |
