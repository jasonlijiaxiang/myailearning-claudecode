# 2026-07-11 · 记忆系统 + Computer Use 增章 · 联网核实笔记

> 元信息：agent-memory / agent-computer-use / agent-cheatsheet 三章建前核实。口径 2026-07-11。

## 一、记忆系统
- **四种记忆分类（生产共识）**：working（当前上下文）/ episodic（过往事件）/ semantic（事实与偏好）/ procedural（agent 自身指令的习得）。主流生产模式 = 分层：小核心常驻上下文 + 向量检索层 + 显式遗忘策略。
- **框架格局四强**：Mem0（托管服务集成最快；向量+图+KV 混合存储、自动记忆抽取；47K+ stars 社区最大）；Letta（前 MemGPT；OS 式显式内存块：core memory 常驻提示、archival 存库靠工具取；状态化 runtime）；Zep（时序知识图谱、情景记忆；自报 LoCoMo 94.7% / LongMemEval 90.2%）；LangMem（LangGraph 原生）。
- **记忆投毒**：OWASP Agentic AI Top 10 于 2026 新增 **ASI06「记忆与上下文投毒」**；与提示注入的区别 = 注入会话即失效、投毒**跨会话持续发作**；研究口径：MINJA 注入成功率 >95%、理想条件攻击成功率 70%，多项研究报 80–99.8% 成功率；还有「隐式记忆」攻击（输出中编码状态、回流成时间炸弹，arXiv 2607.06595 等）。防线：不可信内容写入前过滤、任务间清理临时上下文、记忆写入鉴权与来源标记、定期记忆审计。
- 来源：vectorize/evermind/jobsbyculture 2026 框架横评；beyondscale 投毒防御指南；arXiv 2601.05504（投毒攻防）、2607.06595。

## 二、Computer Use / GUI Agent
- **三条技术路线**：Claude Computer Use（截图+鼠键通用原语，跨 VM/容器/远程桌面，唯一全桌面路线）；OpenAI Codex Background Computer Use（2026-04-16 发布，macOS 优先桌面自动化、并行会话；Operator 已并入 ChatGPT Agent）；Gemini Computer Use（源自 Project Mariner，DOM 感知浏览器优化）。开源代表 Browser Use。
- **基准口径**：Claude Opus 4.8 OSWorld-Verified **83.5%**（2024 年 Claude 3.5 Sonnet 起步仅 14.9%）；Claude Sonnet 4.6 72.5%；OpenAI CUA：WebVoyager 87% / WebArena 58.1% / OSWorld 38.1%。**OSWorld 2.0（长程真实任务，arXiv 2606.29537）上 Opus 4.8 仅 20.6% 二元准确率**——短窄任务能用、长程多应用还早。基准 ≠ 生产就绪认证。
- 产品化：Claude Cowork（桌面控制）2026-03-23 上线。
- **安全要点**：屏幕内容也是不可信输入（页面里藏指令=注入面）；生产要沙箱/虚拟桌面隔离、最小权限、关键步人审；与 RPA 关系 = RPA 写死流程脆但稳，CU agent 自适应但慢贵，混合（RPA 骨架+CU 兜底）是落地常态。
- 来源：digitalapplied 2026 三家对比矩阵、particula、aimultiple、coasty OSWorld 榜、arXiv 2606.29537。

## 三、速查章素材
- 取自本模块 9 章对练页精选 + 选型树（agent vs 工作流 vs 低代码 vs 多 agent vs 记忆 vs CU 的启用条件）。
- 原「全书串联」页（v1.0 时期）含过时表述（称 MCP 为"未来模块"），由新速查章串联地图替代，旧页随历史版本存档。
