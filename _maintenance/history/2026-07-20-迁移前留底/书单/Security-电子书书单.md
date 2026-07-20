# Security · 精选电子书书单

> 面向"售前技术"角色（有 Python/API 基础，重威胁模型与防护取舍，不啃纯攻击理论）。可免费下载的已存入 `./ebooks/`。
> 时效性事实核实日期：2026-07-09（依据见 `raw-data/2026-07-09-联网核实笔记.md`）。

| # | 书名 / 资料 | 作者/机构 | 类型 | 一句话简介 | 覆盖子主题 | 获取方式 / 文件位置 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 《OWASP Top 10 for LLM Applications 2025》 | OWASP GenAI Security Project | 🛠️实践 | LLM 应用十大风险的行业事实标准，讲义主骨架；2025 版新增系统提示词泄露、向量/嵌入弱点 | 威胁全景、注入、数据泄露、供应链、过度自主 | ✅ 已下载 `./ebooks/OWASP-Top-10-for-LLM-Applications-2025.pdf` |
| 2 | 《Agentic AI – Threats and Mitigations》 | OWASP ASI 倡议 | 🛠️实践 | Agent/工具/记忆维度的威胁分类与缓解，配套 2026《Agentic Applications Top 10》 | Agent 安全、工具滥用、记忆投毒 | ✅ 已下载 `./ebooks/OWASP-Agentic-AI-Threats-and-Mitigations.pdf` |
| 3 | 《NIST AI 600-1 · Generative AI Profile》 | NIST | 🛠️实践 | GenAI 风险管理官方框架，12 类风险 + 200+ 行动项，给客户讲治理绕不开 | 治理、风险管理、合规 | ✅ 已下载 `./ebooks/NIST-AI-600-1-GenAI-Profile.pdf` |
| 4 | 《Design Patterns for Securing LLM Agents against Prompt Injections》 | Debenedetti 等 | 🛠️实践 | 6 类架构级防注入设计模式（action-selector、dual LLM、code-then-execute 等），防护章主力 | 防护设计、Agent 安全 | ✅ 已下载 `./ebooks/arXiv-2506.08837-Design-Patterns-Securing-LLM-Agents.pdf` |
| 5 | 《Defeating Prompt Injections by Design（CaMeL）》 | Google DeepMind | 🛠️实践 | Dual-LLM 工程化落地，当前评估最充分的架构级防御（AgentDojo 77% 任务可证安全） | 提示注入防御、最小权限 | ✅ 已下载 `./ebooks/arXiv-2503.18813-CaMeL-Defeating-Prompt-Injections.pdf` |
| 6 | 《EchoLeak: First Real-World Zero-Click Prompt Injection》 | 安全研究者 | 🛠️实践 | 首个真实零点击注入案例（M365 Copilot，CVE-2025-32711），最好的"讲故事"弹药 | 间接注入、真实事件 | ✅ 已下载 `./ebooks/arXiv-2509.10540-EchoLeak-Zero-Click-Injection.pdf` |
| 7 | 《PyRIT: Security Risk Identification and Red Teaming》 | Microsoft | 🛠️实践 | 生成式 AI 红队自动化框架，动手做红队练习靠它 | 红队、评测、防护验证 | ✅ 已下载 `./ebooks/arXiv-2410.02828-PyRIT-Red-Teaming.pdf` |
| 8 | 《MITRE ATLAS》（在线知识库） | MITRE | 🛠️实践 | AI 攻击战术/技术矩阵（~16 战术/84 技术），查具体攻击手法与真实案例 | 威胁建模、攻击战术 | 🔗 在线矩阵：https://atlas.mitre.org/ |
| 9 | 《EU AI Act 实施时间线 + GPAI 指南》 | 欧盟委员会 | 🛠️实践 | GPAI 义务与执法时间点（2025-08 生效 / 2026-08 执法 / 2027-08 存量截止），售前必答 | 合规、监管、上市义务 | 🔗 官方：https://artificialintelligenceact.eu/implementation-timeline/ |
| 10 | 《A Systematic Survey of Security Threats and Defenses in LLM-Based AI Agents》 | 学界综述 | 📖理论·可选读 | 分层攻击面框架下的威胁与防御系统综述，想系统补全再看（全库理论额度仅此 1 本） | 攻击面全景、防御分类 | ✅ 已下载 `./ebooks/arXiv-2604.23338-LLM-Agents-Security-Survey.pdf` |

## 阅读建议（按售前真实场景排优先级）

1. **客户第一句必问"AI 安全到底有哪些坑"** → 先读 **#1 OWASP LLM Top 10 2025**。一份清单覆盖八成对话，是全模块的地图。
2. **要讲"提示注入能不能根治"这个尖锐问题** → 读 **#6 EchoLeak**（真实事件，讲得出故事）+ **#5 CaMeL**（讲得出"在模型外兜底"的解法），一攻一防成对用。
3. **客户在做 Agent / MCP，问"放权给它安全吗"** → 读 **#2 OWASP Agentic** + **#4 Design Patterns**：前者列威胁，后者给最小权限/双 LLM 等可落地的控制。
4. **被问合规、要过审（尤其涉欧盟业务）** → 读 **#3 NIST AI 600-1** + **#9 EU AI Act 时间线**：一个给治理框架，一个给硬性时间点和罚则。
5. **要自己做安全验收 / demo 红队** → 读 **#7 PyRIT**，配合 **#8 MITRE ATLAS** 按攻击战术设计测试用例。#10 综述留给想系统深挖的人，可跳过。
