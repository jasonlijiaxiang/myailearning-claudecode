# A2A · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | a2a |
| 所在层 | 协议层 |
| 建立日期 | 2026-07-09 |
| 最后更新 | 2026-07-12（B 类：引用 _reference/Codex 对照库,补 v1.0.1 口径、SDK 兼容模式、Inspector/TCK；同日两件套吸收：增 3 页框架深潜（Task 状态机/四种交付/五边界五控制）+ 1 页生产验收清单，71→75 页）；2026-07-15（呈现修复：删配图替代型残留源文字页 1 页，配图后 82→81 页）；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），81→82 页；2026-07-17 内容增补：速查章增「数字弹药」页 1 页（本册及跨模块已核实数字的集中速查，每条带用法与源指针），82→83 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 6 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 错字修正：第 3 章对练页（放映序 p39）「持续推进展」补字为「持续推送进展」，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b（注：本次存留痕时误用 2026-07-20 同名覆盖了当日 v3.13 回刷前快照，已改用 b 后缀；原快照丢失，改动可依 raw-data/2026-07-20-术语全称回刷清单.md 重建） |
| 产出 skill 版本 | v3.0 |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| a2a-what-why | 第 1 章 | 是什么/为什么（与 MCP 分工） | ✅ | 2026-07-09 |
| a2a-protocol | 第 2 章 | 协议解剖（五大对象与生命周期） | ✅ | 2026-07-09 |
| a2a-transport | 第 3 章 | 发现与传输（Agent Card 发现·三绑定·流式） | ✅ | 2026-07-09 |
| a2a-handson | 第 4 章 | 动手做：跑通一次 A2A 协作 | ✅ | 2026-07-09 |
| a2a-orchestration | 第 5 章 | 多智能体协作（opaque agents·任务委派） | ✅ | 2026-07-09 |
| a2a-production | 第 6 章 | 生产落地·上云 | ✅ | 2026-07-09 |
| a2a-security | 第 7 章 | 安全 · 售前速查 | ✅ | 2026-07-09 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 |
| --- | --- | --- | --- |
| 规范稳定线 1.0（正文 Latest Released 1.0.0）；项目 release 当前 v1.0.1（2026-05-28 补丁；v1.0.0 于 2026-03-12 发布）；历史 0.1.0→0.2.6→0.3.0→1.0.0；以 Protocol Buffers 为唯一权威规范定义 | a2a-protocol | 2026-07-12 | a2a-protocol.org 规范页、github.com/a2aproject/A2A/releases |
| v1.0 头号新特性 Signed Agent Cards（签名版 Agent Card，密码学验证签发方） | a2a-security | 2026-07-09 | LF 一周年 press |
| 治理：Google 2025-04 发布并开源，2025-06 捐赠 Linux Foundation 成立中立的 A2A Project | a2a-what-why | 2026-07-09 | LF 项目成立公告 |
| 采用度 150+ 组织、核心仓库 22,000+ stars；5 官方 SDK（Python/JS/Java/Go/.NET），Python SDK 实现 1.0 并提供 0.3 兼容模式、三种传输绑定 Client/Server 全覆盖 | a2a-production | 2026-07-12 | LF 一周年 press、github.com/a2aproject/a2a-python |
| 官方配套工具：Inspector（联调）与 TCK（协议一致性测试）提供一致性证据，不替代安全与业务评测 | a2a-handson | 2026-07-12 | github.com/a2aproject/a2a-inspector、github.com/a2aproject/a2a-tck |
| 云支持：Azure AI Foundry / Copilot Studio、AWS Bedrock AgentCore Runtime、Google Cloud（Vertex AI Agent Engine） | a2a-production | 2026-07-09 | LF 一周年 press |
| 三种传输绑定：JSON-RPC 2.0 / gRPC / HTTP+JSON-REST；流式走 SSE，长任务用推送通知回调 | a2a-transport | 2026-07-09 | a2a-protocol.org 规范页 |
| AP2（Agent Payments Protocol）为 A2A 之上支付扩展，60+ 组织 | a2a-production | 2026-07-09 | LF 一周年 press |

| Task 状态机共九种状态（进行中 2 + 中断 2 + 终态 4 + 兜底 unspecified），终态不可回跳、重试建新 Task | a2a-protocol | 2026-07-12 | a2a-protocol.org 规范 TaskState 枚举 |
## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| a2a-what-why | mcp#mcp-what-why | 协议层两兄弟：MCP 接工具（纵向）/ A2A 接 Agent（横向），双向互引分工 |
| a2a-orchestration | agent#agent-orchestration | 多 Agent 协作 ↔ Agent 编排模式；A2A 是跨 Agent 协作的标准化通道 |
| a2a-orchestration | agent#agent-tools-mcp | Agent 第 4 章已登记 A2A fact，本模块为其深入入口（Agent 侧应回指本模块） |
| a2a-security | mcp#mcp-security | 安全共识对照：签名/最小权限/鉴权/opaque 边界 |
| a2a-production | （候选）evaluation | 多 Agent 协作的评估验收，留待后续补 |
