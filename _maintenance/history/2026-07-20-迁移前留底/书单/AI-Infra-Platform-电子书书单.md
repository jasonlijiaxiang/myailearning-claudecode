# AI-Infra-Platform · 精选电子书书单

> 面向售前技术（有 Python/API 基础，重底层概念与取舍）。可免费下载的已存入 ./ebooks/。
> 时效性事实核实日期：2026-07-09（依据见 raw-data/2026-07-09-联网核实笔记.md）。
> 说明：平台层的权威资料多为**持续更新的在线文档**，下载快照反而容易过期，故本书单以链接为主，仅版本无关的白皮书落地为 PDF。

| # | 书名 | 作者/机构 | 类型 | 一句话简介 | 覆盖子主题 | 获取方式 / 文件位置 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Cloud Native AI 白皮书 | CNCF AI 工作组 | 🛠️实践 | 云原生 AI 生态的官方全景图：一份看清调度、切分、观测各环节都有哪些项目占位 | 平台全景 | ✅ 已下载 `./ebooks/CNCF-Cloud-Native-AI-Whitepaper-2024.pdf` |
| 2 | Kubernetes DRA 官方文档 + v1.34 GA 发布博客 | Kubernetes SIG | 🛠️实践 | GPU 调度新主线的权威出处：为什么 device plugin 不够用、DRA 怎么按属性申请设备 | K8s + GPU | 🔗 https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/ ；GA 博客：https://kubernetes.io/blog/2025/09/01/kubernetes-v1-34-dra-updates/ |
| 3 | NVIDIA GPU Operator 官方文档 | NVIDIA | 🛠️实践 | K8s 上管 GPU 的落地第一站：驱动、设备插件、MIG、时间片全在这一套里配 | K8s + GPU, GPU 切分 | 🔗 https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/ |
| 4 | KAI Scheduler（代码库 + 发布博客） | NVIDIA（原 Run:ai） | 🛠️实践 | gang 调度、拓扑感知、bin-packing 的开源标杆，与商业版 Run:ai 同一调度核 | 作业调度 | 🔗 https://github.com/NVIDIA/KAI-Scheduler |
| 5 | Kueue 官方文档 | Kubernetes SIG | 🛠️实践 | 配额与作业排队的社区标准：讲清"准入控制"和"调度"为什么是两层 | 作业调度, 多租户 | 🔗 https://kueue.sigs.k8s.io/docs/ |
| 6 | SageMaker HyperPod 文档 + 官方 Workshop | AWS | 🛠️实践 | 托管训练集群的代表作：弹性容错（自动检测-替换-续训）的设计当教科书读 | 容错, 云上形态 | 🔗 文档：https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-hyperpod.html ；Workshop：https://workshops.aws/ 检索 HyperPod |
| 7 | GKE AI/ML 最佳实践 + AI Hypercomputer 文档 | Google Cloud | 🛠️实践 | 第二朵云对照：TPU/GPU 统一编排与 DRA 在托管 K8s 上的实际形态，避免单一视角 | 云上形态, K8s + GPU | 🔗 https://cloud.google.com/kubernetes-engine/docs/concepts/machine-learning ；https://cloud.google.com/ai-hypercomputer |
| 8 | HAMi 项目文档 | CNCF（sandbox） | 🛠️实践 | 任意 NVIDIA 卡上做细粒度切分（显存/算力百分比运行时强制）的开源方案，MIG 之外的多租户选项 | GPU 切分, 多租户 | 🔗 https://project-hami.io/ |
| 9 | ClusterMax：GPU 云评级方法 | SemiAnalysis | 🛠️实践 | 评估一朵 GPU 云好不好的完整 checklist（网络、存储、调度、SLA），售前对标竞品直接套用 | 云上形态, 利用率运营 | 🔗 https://newsletter.semianalysis.com/p/the-gpu-cloud-clustermax-rating-system |
| 10 | NVIDIA DCGM 官方文档 | NVIDIA | 🛠️实践 | GPU 可观测性的指标底座：利用率、显存、NVLink、XID 错误码都从它出 | 可观测性 | 🔗 https://docs.nvidia.com/datacenter/dcgm/latest/ |

## 阅读建议

1. **先建全景再钻细节**：#1 CNCF 白皮书 30 分钟通读一遍，后面每个工具都能在图上找到位置——没有这张图，10 个项目名对客户就是名词轰炸。
2. **客户问"K8s 上怎么管 GPU"**（平台侧最高频问题）：#3 GPU Operator 文档的概念页 + #2 DRA 文档，两份读完能讲清新旧两代方案。
3. **要做调度选型 demo**：#5 Kueue 快速上手（半天能跑通）→ 再看 #4 KAI 的 gang 调度示例；给客户讲分层（Kueue 管准入、KAI/Volcano 管调度）就用这两份。
4. **对标云厂商方案**：#6 HyperPod 和 #7 GKE 对照读，尤其 HyperPod 的容错设计——客户问"托管训练比自建强在哪"，答案基本都在里面。
5. **被问成本/利用率**：#9 ClusterMax 的评级维度 + #10 DCGM 指标，配合讲义第 6 章的 MFU/goodput 页用。
