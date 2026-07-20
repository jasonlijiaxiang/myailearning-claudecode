# 2026-07-14 · PowerPoint 修复弹窗事故复盘

> **⚠️ 本文第一、二节的根因归因与处置结论当天即被推翻，最终定案见文末「三次复盘 · 最终真相」
> 一节。保留原文以警示：归因要以可复现实验为准。**

> 上午呈现审查收尾后，用户双击打开主库 `AI-Infra-Platform-讲义.pptx`（PowerPoint 书签证实
> 为主库文件，08:48 本地时间），PowerPoint 弹「found a problem with content…Repair」。
> 而当时我已宣布"修复后 19/19 门禁 PASS"。本文记录根因、处置与教训。

## 一、根因

1. **直接诱因：python-pptx 整包 round-trip。** 上午的封面/眉题修复用 python-pptx 打开并
   保存了 12 册讲义。它重写了包内全部部件（slide 文件名按放映序重编、rId 重排、XML 重新
   序列化）。产物通过了当时全部静态检查——app.xml 三元一致、rels 全解析、内容类型完整、
   LibreOffice 正常打开渲染、契约自检 PASS——**但 Mac PowerPoint 交互式打开仍判「内容有
   问题」**。逐部件语义比对未能在字节层定位到确切违规点（各项 OPC 不变量均成立），定性为
   round-trip 序列化产物与 PowerPoint 校验器的不兼容。
2. **验证盲区（为什么我没发现）**：验证手段（LibreOffice 渲染、python 解析、契约脚本）都比
   PowerPoint 宽松；尝试用 AppleScript / LaunchServices 驱动 PowerPoint 自动验证，实测
   **脚本化打开不会触发修复弹窗**（连故意构造的非法 XML、错误计数都静默放行），只有用户
   双击的交互路径才校验——自动化 oracle 不存在，这个盲区当时不可自知。
3. **并发暴露的旧病（非本次诱因，但同类风险）**：
   - Prompt-Engineering 主库件及多份历史批次产物携带成批**孤儿 Override**（[Content_Types].xml
     指向不存在的 slideMaster 部件，生成器遗留）；
   - 三个副本目录（`AI Learning Notes - Consolidated By LJX`、`ClaudeCode - AI Learning`、
     `myAILearning-Codex/_reference/CC-20260713`）共 54 册全部带 07-13 那类 app.xml 病
     （Slides 计数错到 54/121 的程度、孤儿 Override 成批）——**07-13 修复批次只治了主库，
     副本目录漏网**。

## 二、处置（全部完成）

| 对象 | 手段 | 验证 |
| --- | --- | --- |
| 主库 12 册 python-pptx 经手件 + Prompt-Engineering | **PowerPoint 原生重存**：复制到暂存目录 → AppleScript 打开 + 原地保存（沙箱只允许写它打开的文件）→ 替换回库 | 逐册「页数 + 逐页文本清单」零差异 + 契约审计 PASS + 封面渲染抽检；替换前旧件备份 `/tmp/pre-ppresave/` |
| Prompt-Engineering 残留 70 条孤儿 Override（PowerPoint 重存也不清理） | zip 级手术删除 Override 条目 | 审计 PASS |
| 三个副本目录 54 册 | zip 级元数据手术：按真实页序重建 app.xml（Slides/HeadingPairs/TitlesOfParts 含真实标题）+ 清孤儿 Override，**内容字节不动** | 三目录结构普查 54/54 一致 |
| 主库未经手的 6 册（A2A/AI-Ops/DE/LLM/ML/SP） | 不动（07-13 修复态，结构一致） | 普查通过 |

上午的封面/导览/眉题修复成果全部保留（重存后文本零差异、RAG 封面渲染复核完好）。

## 三、教训 → 技能升级（v3.4 修订一，已当场执行）

1. **改成品只做 zip 级最小手术，禁止整包 round-trip**——已写入 ppt-design-system §7；
2. **弹修复根治管线 = PowerPoint 原生重存**（暂存 + 原地保存 + 文本清单门禁）——同上；
3. **副本目录同病同修**——修 app.xml 类问题时快照/导出目录一并处理；
4. audit_pptx.py 新增检查项 11（孤儿 Override 即 FAIL）、检查项 9 补 HeadingPairs 总和
   校验——正反用例回归通过，主库 19/19 PASS；
5. **门禁 PASS ≠ PowerPoint 认可**：改动成品的收尾话术不再说"全部修复"，改为"门禁与渲染
   验证通过，请抽验一册双击打开"——自动化验证够不到的部分要如实交还给用户。

---

## 三次复盘 · 最终真相（同日晚定案，推翻上文归因）

**用户按上文处置后重开 19 册，7 册仍弹修复**（Agent/AI-Infra-Compute/AI-Infra-Platform/
Evaluation/Fine-tuning/Prompt-Engineering/RAG）——且"PowerPoint 原生重存"被字节对比证明是
**空操作**（沙箱下 AppleScript `save` 静默不写盘，我当时的"已由 PowerPoint 写出"证据不成立）。

### 真根因（ECMA-376 schema 校验 + PowerPoint 亲写文件基线定位）
1. **生成器 OOXML 顺序违规**，从产出当天就在这 7 册里：
   - `presentation.xml`：`<p:notesMasterIdLst>` 被写到 `<p:sldIdLst>` 之后
     （CT_Presentation 固定序列要求它紧跟 `<p:sldMasterIdLst>`）；
   - 段落元素序：`<a:p>` 里存在**重复/非段首**的 `<a:pPr>` 共 1012 处
     （生成脚本合并段落时把第二段的 pPr 留在 runs 中间）。
2. **触发条件 = com.apple.quarantine**：Mac PowerPoint 会给它打开过的文件盖隔离标记；
   带标记文件下次打开走「不受信文件」**严格 schema 校验** → 违规即弹修复。无标记走宽松
   通道不弹——这解释了全部矛盾现象：LibreOffice/渲染/契约门禁全绿仍弹；07-13 修复器新写
   文件（无标记）当晚正常、标记随打开积累后爆发；LLM 三册（07-13 手点 Repair 保存 =
   PowerPoint 亲写字节）永不弹；我的自动化 oracle 全盲（/tmp 测试件无标记）。
3. 上文第一轮的两个归因均错误：python-pptx round-trip 只是**原样保留**了生成器违规
   （非引入者）；孤儿 Override 是并发旧病（清理正确但非弹窗主因）。

### 根治处置（全部完成并验证）
- `fix_schema_order.py`（零语义元素重定位）：7 册主库修复（notesMasterIdLst 归位 ×6 +
  杂散 pPr 删除 ×1012，修复前先存 `-b` 历史档）；CC-20260713 参考快照 10 册同修；
  另两个副本目录用户已自行清理。
- 验证四重：全库 schema 复扫 0 违规（以 PowerPoint 亲写文件为基线排除 XSD 误报）、
  7 册逐页文本零差异、审计 19/19 PASS、重复 pPr 最多页渲染**逐像素相同**。
- 技能 v3.4 修订二：audit_pptx.py 新增**检查项 12（OOXML 顺序契约，FAIL 级）**——
  正（19 册）反（-b 快照）用例回归通过；`fix_schema_order.py` 入技能包与库
  `_maintenance/`；排查方法论（PowerPoint 亲写基线 + XSD 对照）写入 ppt-design-system。

### 教训
- **"只有 PowerPoint 拒收"不是玄学，是 schema**——严格校验只对不受信文件开启，所以其它
  工具全测不出来；拿"弹窗后手点 Repair 保存"的文件当基线做 schema 对照，一次就能定位。
- 归因必须做可复现实验（字节对比、正反用例），"处置后没复现"可能只是触发条件未满足。
