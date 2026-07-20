# MCP · MANIFEST（模块清单）

## 模块信息
| 字段 | 值 |
| --- | --- |
| 模块 ID | mcp |
| 所在层 | 协议层 |
| 建立日期 | 2026-07-08 |
| 最后更新 | 2026-07-12（B 类：引用 _reference/Codex 对照库,澄清 Tasks 口径、补 SDK Tier 事实；同日两件套吸收：增 2 页深潜（谁控制三原语/两套信任模型）+ 1 页生产验收清单，66→69 页）；2026-07-14 呈现回刷：封面章节条 6→7 章、导览页补第 7 章并改题「七章一条主线」（含 app.xml 标题同步）、核实日期更新，无内容变更；2026-07-15（呈现修复：删配图替代型残留源文字页 3 页，配图后 75→72 页）；2026-07-17 账面完善：串联出边 3→6 条（补 AI-Gateway/Security/A2A 三条既存关系的回边，全面 review 发现枢纽模块出边偏少），无内容变更；2026-07-17 呈现完善：全册末新增「来源与核实」页（关键信源一览 + 核实窗口，补齐收尾四件套），72→73 页；2026-07-17 内容增补：速查章增「数字弹药」页 1 页（本册及跨模块已核实数字的集中速查，每条带用法与源指针），73→74 页；2026-07-17 呈现统一：全册章眉统一为青色加粗（#128199，对齐配图页样式；用户发现正文页与配图页眉题两套字体并存），无内容变更；2026-07-20 呈现完善：按新语言策略（缩写型术语首次出现展开英文全称，全角逗号格式，译名视语境）存量回刷，补 7 处、零增删页，清单见 raw-data/2026-07-20-术语全称回刷清单.md，audit PASS；2026-07-20b 反 AI 腔（v3.15）文案打磨：1 处「抓手」改「着落」（放映序 p52），零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20b（注：本次存留痕时误用 2026-07-20 同名覆盖了当日 v3.13 回刷前快照，已改用 b 后缀；原快照丢失，改动可依 raw-data/2026-07-20-术语全称回刷清单.md 重建）；2026-07-20c 呈现修复：v4.3 撤电子书馆藏后残留的馆藏指向改为指向书单条目，2 处（放映序 p62 / p66），讲义不再指向已不存在的 ebooks/ 目录，零增删页，audit PASS、渲染目检通过，旧版存 history/2026-07-20c |
| 产出 skill 版本 | v1.0（清单由 v2.0 回填） |

## 章节清单
| 章节 ID | 现编号 | 标题 | 状态 | 最后核实 |
| --- | --- | --- | --- | --- |
| mcp-what-why | 第 1 章 | 是什么/为什么 | ✅ | 2026-07-08 |
| mcp-protocol | 第 2 章 | 协议解剖 | ✅ | 2026-07-08 |
| mcp-transport | 第 3 章 | 传输与演进 | ✅ | 2026-07-08 |
| mcp-server | 第 4 章 | 动手写 server | ✅ | 2026-07-08 |
| mcp-production | 第 5 章 | 生产落地 | ✅ | 2026-07-08 |
| mcp-security | 第 6 章 | 安全 | ✅ | 2026-07-08 |
| mcp-cheatsheet | 第 7 章 | 售前速查（高频问题 / 上手排错 / 版本口径与串联；2026-07-11 补齐全库速查惯例） | ✅ | 2026-07-11 |

## 时效性事实（巡检盘查对象）
| 事实 | 章节 ID | 核实日期 | 来源 | 建议复查日 |
| --- | --- | --- | --- | --- |
| 当前稳定版规范 2025-11-25 | mcp-protocol | 2026-07-08 | modelcontextprotocol.io 规范页 | — |
| 新版规范 2026-07-28 即将发布（RC 已锁定）：无状态核心、Extensions、Tasks 转为官方扩展（experimental core → extension，不入核心规范）、MCP Apps、授权加固、弃用政策（Roots/Sampling/Logging 首批） | mcp-transport | 2026-07-12 | MCP 官方博客 RC 发布文 | 2026-07-28 |
| 官方 SDK Tier 1 为 TypeScript、Python、C#、Go（Tier 是支持等级承诺，不是安全认证） | mcp-server | 2026-07-12 | modelcontextprotocol.io/docs/sdk | — |
| SDK 面向新规范的 beta 已发：Python v2.0.0b1（FastMCP 更名 MCPServer）、TS v2 拆包 | mcp-server | 2026-07-08 | MCP 官方博客 SDK beta 文 | — |
| 官方 Registry 仍 preview 未 GA，不支持私有 server（企业需自建） | mcp-production | 2026-07-08 | registry 官方页 | — |
| 2026 年 1–4 月披露 40+ CVE；CVE-2025-6514（mcp-remote RCE）；MCPTox 工具投毒成功率 84.2% | mcp-security | 2026-07-08 | dev.to 汇总、arXiv 2508.14925 | — |
| 治理归 AAIF（2025-12 捐赠，Linux Foundation 旗下），变更走 SEP 机制 | mcp-what-why | 2026-07-08 | aaif.io 官方博客 | — |

## 串联出边
| 本模块章节 | 指向 | 关系 |
| --- | --- | --- |
| mcp-what-why | agent#agent-tools-mcp | MCP 是 Agent 工具接入的标准化层，Agent 第 4 章为入口视角 |
| mcp-security | agent#agent-eval-guardrails | 防护共识一致：最小权限、人工审批、持续监控 |
| mcp-what-why | a2a#a2a-what-why | 协议层双子：MCP 接工具（纵向）/ A2A 接 Agent（横向），双向互引「分工」 |
| mcp-production | ai-gateway#gw-mcp | 生产落地的治理面：MCP 流量的统一代理/发现/鉴权/限流/审计由网关承接（协议归本模块、治理归网关，双向互引） |
| mcp-security | security#sec-agentic | 工具描述投毒与 MCP 供应链风险在 Security 第 4/5 章深化（本章讲协议侧防线，双向互引） |
| mcp-security | a2a#a2a-security | 两协议安全共识对照：签名/最小权限/鉴权/opaque 边界（A2A 侧已有入边，此为回边） |
