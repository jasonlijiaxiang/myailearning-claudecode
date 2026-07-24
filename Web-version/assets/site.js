/* 知识库网页面 · 交互底座
   纪律（web-rules §九）：搜索、目录高亮、字段注释都必须帮助定位/比较/理解/追证/决策，
   否则不做；无 JS 时保留完整阅读路径，本文件只做增强。
   Portable：不用 ES module、不 fetch——file:// 下两者都会被浏览器拦截。 */
(function () {
  "use strict";
  document.documentElement.className += " js-on";

  /* 顶栏实高写进 --topbar-h：所有吸顶元素（模块页目录、问答库筛选条）都吸在它下沿。
     顶栏自己也是 sticky，窄屏还会折成两行——写死一个 top 值必然在某个宽度上错位。 */
  (function () {
    var bar = document.querySelector(".topbar");
    if (!bar) return;
    var sync = function () {
      document.documentElement.style.setProperty("--topbar-h", bar.offsetHeight + "px");
    };
    sync();
    /* 脚本解析时字体可能还没加载完，顶栏高度会量偏，而下游的锚点落点、目录吸顶位置
       全挂在这个值上。load 后再量一次自我校正——量错一次不报错，只是所有跳转都差一截。 */
    window.addEventListener("load", sync);
    window.addEventListener("resize", sync);
  }());

  /* ---------- 交互件公共渲染件：全站唯一出处 ----------
     各模块交互件的结果卡片与指标块由这里统一渲染，页面内联脚本只留数据与判定逻辑。
     缘由：这两个函数曾在 11 个交互件里各复制一份，card() 已漂成三个变体——参数顺序、
     DOM 顺序、href 是否可选都不一致，属「组件契约漂移」（与类名契约漂移同族）。
     DOM 顺序以 kb.css 的 .tagline2 上紧下松边距为准：标题在前、标签作副标题、正文在后。
     类名一律写成完整字面量，不做字符串拼接——静态扫描（check_css_classes.py）看不见拼接。 */
  function card(name, tag, body, href) {
    var head = '<div class="hitcard"><b>' + name + '</b>';
    var line = tag ? '<div class="tagline2">' + tag + '</div>' : '';
    var more = href ? ' <a href="' + href + '">详见</a>' : '';
    return head + line + '<p>' + body + more + '</p></div>';
  }
  function kpi(label, val, warn) {
    var open = warn ? '<div class="kpi warn2">' : '<div class="kpi">';
    return open + label + '<b>' + val + '</b></div>';
  }
  window.KBUI = { card: card, kpi: kpi };

  /* ---------- 全站搜索：索引由 data.js（MANIFEST 生成）来，不另维护一份 ---------- */
  function buildIndex() {
    var kb = window.KB, out = [];
    if (!kb) return out;
    kb.modules.forEach(function (m) {
      var base = m.web || ("../PPT-version/" + m.dir + "/README.html");
      out.push({ t: m.dir, k: m.layer + " · 模块", u: base, s: m.dir + " " + m.id + " " + m.layer });
      m.chapters.forEach(function (c) {
        out.push({
          t: c.title, k: m.dir + " " + c.no,
          u: m.web ? (m.web + "#" + c.id) : base,
          s: c.title + " " + c.id + " " + m.dir
        });
      });
      m.facts.forEach(function (f) {
        out.push({
          t: f.text.length > 58 ? f.text.slice(0, 58) + "…" : f.text,
          k: m.dir + " · 时效性事实 · 核实 " + f.verified,
          u: m.web ? (m.web + "#" + f.chapter) : base,
          s: f.text + " " + m.dir
        });
      });
      /* 问答也进索引：客户问的是一句话，读者搜的就该是那句话。
         此前索引只有模块/章节/事实三类，搜「备案」「串答」这种问句里的词一无所获。 */
      (m.questions || []).forEach(function (q) {
        out.push({
          t: q.q,
          k: m.dir + " · 现场高频追问",
          u: m.web ? (m.web + "#" + q.id) : base,
          s: q.q + " " + m.dir
        });
      });
    });
    /* 关键词也进索引：词 → 它在库内的主归属章节（build.py CONCEPTS，
       与章末串联条同一份落点表）。搜「LoRA」直达微调册对应章。 */
    (kb.concepts || []).forEach(function (c) {
      out.push({ t: c.t, k: c.m + " · 关键词", u: c.u, s: c.t + " " + c.m });
    });
    return out;
  }

  var input = document.getElementById("q");
  var hits = document.getElementById("hits");
  if (input && hits) {
    var idx = buildIndex();
    var run = function () {
      var q = input.value.trim().toLowerCase();
      hits.innerHTML = "";
      if (q.length < 2) return;
      var found = [], i;
      for (i = 0; i < idx.length && found.length < 12; i++) {
        if (idx[i].s.toLowerCase().indexOf(q) !== -1) found.push(idx[i]);
      }
      if (!found.length) {
        hits.innerHTML = '<li><a href="#" onclick="return false">'
          + "没有匹配的模块、章节、事实或问答</a></li>";
        return;
      }
      found.forEach(function (h) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = h.u;
        a.innerHTML = "";
        var t = document.createElement("span"); t.textContent = h.t;
        var k = document.createElement("span"); k.className = "k"; k.textContent = "  " + h.k;
        a.appendChild(t); a.appendChild(k);
        li.appendChild(a); hits.appendChild(li);
      });
    };
    input.addEventListener("input", run);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; run(); }
    });
  }

  /* 知识地图不在这里渲染——它由 build.py 生成期静态注入 index.html，
     以保证无 JavaScript 时首页仍有完整阅读路径（web-design-system 可访问性底线）。 */

  /* ---------- 分层链接图：关键词联想 ----------
     模块图作入口；「关联学习」下点一个模块 → 它滑到中间、散开它的**关键技术词**（不是相关模块）；
     点一个关键词 → 它到中间，散开同一章的相关词，并给一个「读这一章」的链接，一路顺着术语深挖。
     联想有边界：面包屑记路径，最多 MAXKW 个关键词步。节点用 rAF 从中心散出，尊重 reduce-motion。
     动态类（kwon/kwnode/kw-center/kw-ring/kwedge/kwt 等）走白名单，供 check_css_classes 静态放行。 */
  var kg = document.querySelector("svg.kgraph");
  if (kg && kg.viewBox && kg.viewBox.baseVal && window.KB && window.KB.kw) {
    var vb = kg.viewBox.baseVal;
    var CX = vb.width / 2, CY = vb.height * 0.47;
    var RX = Math.min(430, vb.width * 0.43), RY = vb.height * 0.34;
    var SVGNS = "http://www.w3.org/2000/svg";
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var knodes = [].slice.call(kg.querySelectorAll(".knode"));
    var NAME = {};
    knodes.forEach(function (el) {
      var nm = el.querySelector(".knm");
      NAME[el.getAttribute("data-m")] = nm ? nm.textContent : el.getAttribute("data-m");
    });
    var MI = {};                                   // 模块 → {dir,hue,web}
    var layers = window.KB.layers || [];
    (window.KB.modules || []).forEach(function (m) {
      MI[m.id] = { dir: m.dir, hue: layers.indexOf(m.layer), web: m.web || ("./" + m.dir + "/index.html") };
    });

    var learn = "link";
    kg.classList.add("kmode-link");

    var wrap = kg.closest(".kgraph-wrap");
    var back = document.createElement("button"); back.className = "kg-back"; back.type = "button";
    back.textContent = "← 返回全景"; back.style.display = "none";
    var crumb = document.createElement("div"); crumb.className = "kg-crumb"; crumb.style.display = "none";
    var read = document.createElement("a"); read.className = "kg-read"; read.style.display = "none";
    if (wrap) { wrap.insertBefore(back, wrap.firstChild); wrap.insertBefore(crumb, back.nextSibling); wrap.insertBefore(read, crumb.nextSibling); }
    var hint = wrap ? wrap.querySelector(".kgraph-hint") : null;
    var hintMap = hint ? hint.textContent : "";

    /* 关键词索引：章 → 词、词 → 章 */
    var CH = window.KB.kw.ch, META = window.KB.kw.meta, T2C = {};
    Object.keys(CH).forEach(function (ch) { CH[ch].forEach(function (t) { (T2C[t] = T2C[t] || []).push(ch); }); });
    function moduleKW(modId) {                      // 该模块各章关键词，跨章轮询取一批（≤14）
      var chs = Object.keys(META).filter(function (c) { return META[c].modId === modId; });
      var out = [], seen = {}, maxL = 0;
      chs.forEach(function (c) { if (CH[c].length > maxL) maxL = CH[c].length; });
      for (var i = 0; i < maxL; i++) for (var j = 0; j < chs.length; j++) {
        var t = CH[chs[j]][i];
        if (t && !seen[t] && out.length < 14) { seen[t] = 1; out.push({ term: t, ch: chs[j] }); }
      }
      return out;
    }
    function relatedKW(term) {                      // 同章相关词（≤12）
      var out = [], seen = {}; seen[term] = 1;
      (T2C[term] || []).forEach(function (ch) {
        CH[ch].forEach(function (t) { if (!seen[t]) { seen[t] = 1; out.push({ term: t, ch: ch }); } });
      });
      return out.slice(0, 12);
    }
    function labelW(s) { var w = 0; for (var i = 0; i < s.length; i++) w += s.charCodeAt(i) > 255 ? 14.5 : 7.3; return Math.min(220, Math.max(58, w + 22)); }

    var kwlayer = document.createElementNS(SVGNS, "g"); kwlayer.setAttribute("class", "kwlayer"); kg.appendChild(kwlayer);
    var kwraf = null, kwto = null, active = false, path = [], MAXKW = 3, cur = { center: null, ring: [], spokes: [] };

    function makeNode(kind, label, hueIdx, href, x, y) {
      var g = document.createElementNS(SVGNS, href ? "a" : "g");
      g.setAttribute("class", "kwnode " + kind + " hue-" + hueIdx);
      if (href) g.setAttribute("href", href);
      var w = labelW(label);
      var box = document.createElementNS(SVGNS, "rect"); box.setAttribute("class", "kbox");
      box.setAttribute("x", (-w / 2).toFixed(1)); box.setAttribute("y", "-16");
      box.setAttribute("width", w.toFixed(1)); box.setAttribute("height", "32"); box.setAttribute("rx", "9");
      var tx = document.createElementNS(SVGNS, "text"); tx.setAttribute("class", "kwt");
      tx.setAttribute("text-anchor", "middle"); tx.setAttribute("y", "4"); tx.setAttribute("font-size", "12.5"); tx.textContent = label;
      g.appendChild(box); g.appendChild(tx); kwlayer.appendChild(g);
      var o = { g: g, x: x, y: y };
      o.setPos = function (nx, ny) { o.x = nx; o.y = ny; g.setAttribute("transform", "translate(" + nx.toFixed(1) + "," + ny.toFixed(1) + ")"); };
      o.setOp = function (v) { g.setAttribute("opacity", v.toFixed(2)); };
      o.setPos(x, y); o.setOp(0);
      return o;
    }
    function spoke(A, B) {
      var dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, ox = -dy / L * L * 0.09, oy = dx / L * L * 0.09;
      return "M" + A.x.toFixed(1) + " " + A.y.toFixed(1) + "Q" + ((A.x + B.x) / 2 + ox).toFixed(1) + " " +
             ((A.y + B.y) / 2 + oy).toFixed(1) + " " + B.x.toFixed(1) + " " + B.y.toFixed(1);
    }
    function runAnim(frame, dur, done) {
      if (kwraf) cancelAnimationFrame(kwraf);
      if (kwto) clearTimeout(kwto);
      if (reduce) { frame(1); if (done) done(); return; }
      var t0 = null, fin = false;
      function finish() { if (fin) return; fin = true; if (kwraf) cancelAnimationFrame(kwraf); kwraf = null; frame(1); if (done) done(); }
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur), e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        frame(e);
        if (p < 1) kwraf = requestAnimationFrame(step); else { fin = true; kwraf = null; if (done) done(); }
      }
      kwraf = requestAnimationFrame(step);
      kwto = setTimeout(finish, dur + 250);   // 兜底：若 rAF 被节流没跑，到时直接落终态，绝不停在 opacity 0
    }

    function focusItem(item, startPos) {
      var isMod = item.type === "mod";
      var raw = isMod ? moduleKW(item.key) : relatedKW(item.key);
      var ringData = raw.map(function (k) { var m = META[k.ch]; return { term: k.term, ch: k.ch, hue: m.hue, href: m.web + "#" + k.ch }; });
      var centerHref = isMod ? MI[item.key].web : (item.ch ? (META[item.ch].web + "#" + item.ch) : null);
      var oldNodes = (cur.center ? [cur.center] : []).concat(cur.ring);
      cur.spokes.forEach(function (p) { if (p.parentNode) p.parentNode.removeChild(p); });
      var sX = startPos ? startPos.x : CX, sY = startPos ? startPos.y : CY;
      var center = makeNode("kw-center", item.name, item.hue, centerHref, sX, sY);
      var n = ringData.length || 1;
      var ring = ringData.map(function (rd, i) {
        var node = makeNode("kw-ring", rd.term, rd.hue, rd.href, CX, CY);
        var ang = -Math.PI / 2 + 2 * Math.PI * i / n; node.tx = CX + RX * Math.cos(ang); node.ty = CY + RY * Math.sin(ang);
        node.g.addEventListener("click", function (ev) { ev.preventDefault(); clickKW(rd.term, rd.ch, node); });
        return node;
      });
      var spokes = ring.map(function () { var p = document.createElementNS(SVGNS, "path"); p.setAttribute("class", "kwedge"); kwlayer.insertBefore(p, kwlayer.firstChild); return p; });
      if (centerHref) {
        read.setAttribute("href", centerHref);
        read.textContent = isMod ? ("读：" + item.name + " 网页版  →") : ("读：" + META[item.ch].mod + " · " + META[item.ch].title + "  →");
        read.style.display = "inline-flex";
      } else read.style.display = "none";
      runAnim(function (e) {
        center.setPos(sX + (CX - sX) * e, sY + (CY - sY) * e); center.setOp(Math.min(1, e * 1.5));
        ring.forEach(function (node) { node.setPos(CX + (node.tx - CX) * e, CY + (node.ty - CY) * e); node.setOp(e); });
        oldNodes.forEach(function (o) { o.setOp(1 - e); });
        ring.forEach(function (node, i) { spokes[i].setAttribute("d", spoke(center, node)); });
      }, 470, function () {
        oldNodes.forEach(function (o) { if (o.g.parentNode) o.g.parentNode.removeChild(o.g); });
        cur = { center: center, ring: ring, spokes: spokes };
      });
    }

    function renderCrumb() {
      while (crumb.firstChild) crumb.removeChild(crumb.firstChild);
      if (!path.length) { crumb.style.display = "none"; return; }
      crumb.style.display = "flex";
      var lbl = document.createElement("span"); lbl.className = "kg-crumb-lbl"; lbl.textContent = "联想路径"; crumb.appendChild(lbl);
      path.forEach(function (it, i) {
        if (i) { var s = document.createElement("span"); s.className = "kg-crumb-sep"; s.textContent = "›"; crumb.appendChild(s); }
        var b = document.createElement("button"); b.type = "button";
        b.className = i === path.length - 1 ? "kg-crumb-b cur" : "kg-crumb-b"; b.textContent = it.name;
        b.addEventListener("click", function () { jumpTo(i); }); crumb.appendChild(b);
      });
      var d = document.createElement("span"); d.className = "kg-crumb-depth"; d.textContent = "深度 " + (path.length - 1) + " / " + MAXKW; crumb.appendChild(d);
    }
    function jumpTo(i) { if (i < 0 || i >= path.length) return; path = path.slice(0, i + 1); focusItem(path[i]); renderCrumb(); }

    function openModule(id) {
      if (!MI[id]) return;
      active = true; kg.classList.add("kwon");
      while (kwlayer.firstChild) kwlayer.removeChild(kwlayer.firstChild);
      cur = { center: null, ring: [], spokes: [] };
      path = [{ type: "mod", key: id, name: NAME[id], hue: MI[id].hue }];
      focusItem(path[0]);
      back.style.display = "inline-flex"; renderCrumb();
      if (hint) hint.textContent = "散开的是这册的关键技术词——点一个词跳到讲它的那一章、并散开相关词，最多联想 " +
        MAXKW + " 步。点中心可读该册，按「返回全景」或 Esc 回总图。";
    }
    function clickKW(term, ch, node) {
      for (var i = 0; i < path.length; i++) if (path[i].type === "kw" && path[i].key === term) { jumpTo(i); return; }
      if (path.length - 1 >= MAXKW) {
        if (hint) hint.textContent = "联想已到 " + MAXKW + " 步的边界——再点就离题太远了。点上面「联想路径」回到某一步，或「返回全景」换个起点。";
        crumb.classList.add("nudge"); setTimeout(function () { crumb.classList.remove("nudge"); }, 900);
        return;
      }
      path.push({ type: "kw", key: term, name: term, ch: ch, hue: META[ch].hue });
      focusItem(path[path.length - 1], node ? { x: node.x, y: node.y } : null);
      renderCrumb();
    }
    function closeKW() {
      if (!active) return; active = false;
      var oldNodes = (cur.center ? [cur.center] : []).concat(cur.ring);
      runAnim(function (e) { oldNodes.forEach(function (o) { o.setOp(1 - e); }); }, 280, function () {
        while (kwlayer.firstChild) kwlayer.removeChild(kwlayer.firstChild);
        cur = { center: null, ring: [], spokes: [] }; kg.classList.remove("kwon");
      });
      path = []; renderCrumb(); back.style.display = "none"; read.style.display = "none";
      if (hint) hint.textContent = hintMap;
    }

    knodes.forEach(function (el) {
      var id = el.getAttribute("data-m");
      el.addEventListener("click", function (ev) {
        if (learn === "solo") return;                // 单点学习：放行导航，直接进册
        ev.preventDefault();
        if (!active) openModule(id);
      });
    });
    back.addEventListener("click", closeKW);
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && active) closeKW(); });

    /* 学习模式切换：单点（直接进册、无连线）/ 关联（关键词联想） */
    var modeBtns = wrap ? [].slice.call(wrap.parentNode.querySelectorAll(".kg-mode")) : [];
    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-mode");
        if (next === learn) return;
        learn = next;
        modeBtns.forEach(function (b) { b.classList.toggle("on", b === btn); });
        if (learn === "solo") { closeKW(); kg.classList.add("kmode-solo"); kg.classList.remove("kmode-link"); }
        else { kg.classList.remove("kmode-solo"); kg.classList.add("kmode-link"); }
      });
    });
  }

  /* ---------- 全库问答库：就地过滤 ----------
     题目由 build.py 生成期写进页面，这里只做显示/隐藏——无 JS 时整份分组长列表照样读得完，
     筛选条自己隐藏（.qa-tools 默认 display:none，靠 .js-on 打开），不留一个点不动的假控件。 */
  var qf = document.getElementById("qf");
  var qcount = document.getElementById("qn");
  if (qf && qcount) {
    var rows = [].slice.call(document.querySelectorAll(".qrow"));
    var dims = [].slice.call(document.querySelectorAll(".qa-dim"));
    var groups = [].slice.call(document.querySelectorAll(".qa-group"));
    var chips = [].slice.call(document.querySelectorAll("#qc .chip"));
    /* 隐藏用的状态类写成整串字面量（"qrow qa-hide"），供 check_css_classes 静态扫到。 */
    var texts = rows.map(function (r) { return r.textContent.toLowerCase(); });
    var group = "";

    var apply = function () {
      var q = qf.value.trim().toLowerCase(), shown = 0, i;
      for (i = 0; i < rows.length; i++) {
        var inGroup = !group || rows[i].closest(".qa-group").getAttribute("data-g") === group;
        var hit = inGroup && (!q || texts[i].indexOf(q) !== -1);
        if (hit) { rows[i].className = "qrow"; shown += 1; }
        else { rows[i].className = "qrow qa-hide"; }
      }
      /* 小标题跟着它下面的行走：一组全被筛掉还留个孤零零的标题，读者会以为是搜索坏了。 */
      dims.forEach(function (d) {
        var n = d.nextElementSibling, live = false;
        while (n && n.className.indexOf("qrow") === 0) {
          if (n.className.indexOf("qa-hide") === -1) { live = true; break; }
          n = n.nextElementSibling;
        }
        if (live) { d.className = "qa-dim"; } else { d.className = "qa-dim qa-hide"; }
      });
      groups.forEach(function (g) {
        if (g.querySelectorAll(".qrow:not(.qa-hide)").length) { g.className = "qa-group"; }
        else { g.className = "qa-group qa-hide"; }
      });
      qcount.textContent = (q || group)
        ? ("匹配 " + shown + " 道 / 共 " + rows.length + " 道")
        : ("共 " + rows.length + " 道题");
    };

    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        group = c.getAttribute("data-g") || "";
        chips.forEach(function (x) { x.className = "chip"; });
        c.className = "chip on";
        apply();
      });
    });
    qf.addEventListener("input", apply);
    qf.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { qf.value = ""; apply(); }
    });
    apply();
  }

  /* ---------- 模块页：本页查找 + 窄屏折叠目录 ----------
     两件都由脚本注入，19 册标记不用各改一遍；无 JavaScript 时都不出现，
     目录本身仍是完整的阅读路径（web-design-system 可访问性底线）。 */
  var tocEl = document.querySelector(".toc");
  if (tocEl && document.querySelector("article")) {
    /* 本页查找：索引本页的章标题、小标题与问答题面——单册最长两万余字，靠滚找太慢。 */
    var targets = [];
    /* 章标题里混着序号徽标和锚点链接（<span class="num">01</span>…<a>#id</a>），
       直接取 textContent 会把「06生产落地#mcp-production」整串当成小节名。 */
    var label = function (el) {
      var c = el.cloneNode(true);
      Array.prototype.forEach.call(c.querySelectorAll("a, .num, .added"), function (x) {
        x.parentNode.removeChild(x);
      });
      return c.textContent.replace(/\s+/g, " ").trim();
    };
    Array.prototype.forEach.call(
      document.querySelectorAll("article h2, article h3, article summary"),
      function (el) {
        var host = el.tagName === "SUMMARY" ? el.parentElement : el;
        var id = host.id || (el.closest("section") || {}).id;
        if (!id) return;
        var txt = label(el);
        if (!txt) return;
        var sec = el.closest("section");
        var where = sec && sec.querySelector("h2");
        targets.push({
          id: host.id || id,
          t: txt.length > 44 ? txt.slice(0, 44) + "…" : txt,
          k: where && where !== el ? label(where).slice(0, 24) : "",
          s: txt.toLowerCase()
        });
      });

    var box = document.createElement("div");
    box.className = "pf";
    box.innerHTML = '<input type="search" placeholder="在本页找…" autocomplete="off">'
      + "<ol></ol>";
    tocEl.appendChild(box);
    var pfIn = box.querySelector("input");
    var pfList = box.querySelector("ol");
    pfIn.addEventListener("input", function () {
      var v = pfIn.value.trim().toLowerCase();
      pfList.innerHTML = "";
      if (v.length < 1) return;
      var n = 0, i;
      for (i = 0; i < targets.length && n < 10; i++) {
        if (targets[i].s.indexOf(v) === -1) continue;
        n += 1;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + targets[i].id;
        a.textContent = targets[i].t;
        if (targets[i].k) {
          var k = document.createElement("span");
          k.className = "k";
          k.textContent = targets[i].k;
          a.appendChild(k);
        }
        li.appendChild(a);
        pfList.appendChild(li);
      }
      if (!n) {
        var p = document.createElement("p");
        p.className = "miss";
        p.textContent = "本页没有匹配的小节或问答";
        pfList.appendChild(p);
      }
    });

    /* 窄屏折叠：默认收起，点标题开合；宽屏（>960px）侧栏常驻，不加这个开关。 */
    var narrow = window.matchMedia("(max-width: 960px)");
    var head = tocEl.querySelector("h4");
    if (head) {
      var syncFold = function () {
        if (narrow.matches) {
          tocEl.setAttribute("data-fold", "shut");
        } else {
          tocEl.removeAttribute("data-fold");
        }
      };
      head.addEventListener("click", function () {
        if (!narrow.matches) return;
        tocEl.setAttribute("data-fold",
          tocEl.getAttribute("data-fold") === "shut" ? "open" : "shut");
      });
      /* 跳走之后自动收起，否则目录会一直盖着刚跳到的那一段 */
      tocEl.addEventListener("click", function (e) {
        if (narrow.matches && e.target.tagName === "A") {
          tocEl.setAttribute("data-fold", "shut");
        }
      });
      syncFold();
      if (narrow.addEventListener) narrow.addEventListener("change", syncFold);
    }
  }

  /* ---------- 模块页目录高亮（当前位置指示） ----------
     算「读到哪一节」，而不是「哪一节恰好落进观察带」。旧版用 IntersectionObserver
     逐条 entry 设高亮：两节同时压在带里时谁后触发谁赢，于是点开第 7 节、再往下滚
     一点，高亮就跳回第 6 节（2026-07-22 用户报）。观察带那套本身没有「当前」的
     概念，换成直接判定——**取最后一个顶边已经越过阅读线的节**，结果与滚动方向无关。 */
  var toc = document.querySelector(".toc");
  if (toc) {
    var links = {}, secs = [];
    Array.prototype.forEach.call(toc.querySelectorAll("a[href^='#']"), function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) { links[id] = a; secs.push(el); }
    });
    if (secs.length) {
      var bar = document.querySelector(".topbar");
      var pending = false;
      var spy = function () {
        pending = false;
        /* 阅读线必须落在**锚点落点之下**。落点由 CSS 的 --anchor-top 定 = 顶栏 + 1rem
           (16px)；线若取得比它高，跳转后当前节的顶边还没越过线，高亮就停在上一节——
           那是把同一个 bug 换个数字重演。这里取顶栏 + 28px，留 12px 余量。
           改 --anchor-top 时这个数要跟着改，两者是一对。 */
        var line = (bar ? bar.offsetHeight : 0) + 28;
        var cur = secs[0];
        for (var i = 0; i < secs.length; i++) {
          if (secs[i].getBoundingClientRect().top <= line) cur = secs[i]; else break;
        }
        for (var k in links) { if (links[k]) links[k].className = ""; }
        if (links[cur.id]) links[cur.id].className = "on";
      };
      var queue = function () {
        if (pending) return;
        pending = true;
        window.requestAnimationFrame(spy);
      };
      spy();
      window.addEventListener("scroll", queue, { passive: true });
      window.addEventListener("resize", queue);
    }
  }

  /* ---------- 首页统计条（装饰性增强：无 JS 时不显示，不影响阅读路径） ---------- */
  var stats = document.getElementById("stats");
  if (stats && window.KB) {
    var kb2 = window.KB;
    var chapters = 0, facts = 0, webs = 0;
    kb2.modules.forEach(function (m) {
      chapters += m.chapters.length; facts += m.facts.length;
      if (m.web) webs += 1;
    });
    [[kb2.modules.length, "个模块"], [chapters, "章"],
     [facts, "条已核实事实"], [webs, "册网页版"]].forEach(function (it) {
      var s = document.createElement("span");
      s.className = "stat";
      var b = document.createElement("b"); b.textContent = it[0];
      s.appendChild(b); s.appendChild(document.createTextNode(" " + it[1]));
      stats.appendChild(s);
    });
  }

  /* ---------- 报文逐字段注释器 ---------- */
  var wire = document.querySelector(".wire");
  if (wire) {
    var note = wire.querySelector(".wire-note");
    var fields = wire.querySelectorAll(".f");
    if (note && fields.length) {
      var dl = wire.querySelector(".wire-all");
      var texts = {};
      if (dl) {
        var dts = dl.querySelectorAll("dt");
        Array.prototype.forEach.call(dts, function (dt) {
          var dd = dt.nextElementSibling;
          if (dd) texts[dt.getAttribute("data-f")] = { t: dt.textContent, d: dd.innerHTML };
        });
      }
      var show = function (key, el) {
        var item = texts[key];
        if (!item) return;
        Array.prototype.forEach.call(fields, function (f) { f.className = "f"; });
        el.className = "f on";
        note.innerHTML = "<h4>" + item.t + "</h4>" + "<div>" + item.d + "</div>";
      };
      Array.prototype.forEach.call(fields, function (f) {
        f.setAttribute("tabindex", "0");
        f.setAttribute("role", "button");
        var key = f.getAttribute("data-f");
        f.addEventListener("click", function () { show(key, f); });
        f.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(key, f); }
        });
      });
      // 初始给第一条，避免右侧开局是空盒子
      var first = fields[0];
      show(first.getAttribute("data-f"), first);
    }
  }
})();
