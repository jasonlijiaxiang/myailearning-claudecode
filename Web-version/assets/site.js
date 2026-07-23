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

  /* ---------- 分层链接图：点选聚焦（ego 网络）----------
     图是静态 SVG（无 JS 也完整可读、每个节点都是链接）。这里做「点一个模块 → 它滑到中间、
     关联模块环绕它连成一张小网」的动效：节点用 transform 平移、rAF 插值，中心的边每帧跟手重算。
     状态类（focus/self/on/off/faded）写成整串字面量，供 check_css_classes 静态扫到。 */
  var kg = document.querySelector("svg.kgraph");
  if (kg && kg.viewBox && kg.viewBox.baseVal) {
    var vb = kg.viewBox.baseVal;
    var CX = vb.width / 2, CY = vb.height * 0.47;
    var RX = Math.min(430, vb.width * 0.43), RY = vb.height * 0.34;
    var knodes = [].slice.call(kg.querySelectorAll(".knode"));
    var edges = [].slice.call(kg.querySelectorAll(".kedge")).map(function (el) {
      return { el: el, a: el.getAttribute("data-a"), b: el.getAttribute("data-b"),
               mapD: el.getAttribute("d") };
    });
    var N = {};
    knodes.forEach(function (el) {
      var t = /translate\(\s*([-\d.]+)[ ,]+([-\d.]+)/.exec(el.getAttribute("transform")) || [0, 0, 0];
      var id = el.getAttribute("data-m");
      N[id] = { el: el, home: { x: +t[1], y: +t[2] }, cur: { x: +t[1], y: +t[2] },
                adj: (el.getAttribute("data-adj") || "").split(",").filter(Boolean) };
    });
    var mode = "map", center = null, raf = null;

    var back = document.createElement("button");
    back.className = "kg-back";
    back.type = "button";
    back.textContent = "← 返回全景";
    back.style.display = "none";
    var wrap = kg.closest(".kgraph-wrap");
    if (wrap) wrap.insertBefore(back, wrap.firstChild);
    var hint = wrap ? wrap.querySelector(".kgraph-hint") : null;
    var hintMap = hint ? hint.textContent : "";

    function place(id, x, y) {
      var n = N[id]; n.cur.x = x; n.cur.y = y;
      n.el.setAttribute("transform", "translate(" + x.toFixed(1) + "," + y.toFixed(1) + ")");
    }
    function fpath(a, b) {              // 中心↔邻居：带一点弧度的曲线，任意方向都自然
      var A = N[a].cur, B = N[b].cur, dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1;
      var ox = -dy / L * L * 0.09, oy = dx / L * L * 0.09;
      return "M" + A.x.toFixed(1) + " " + A.y.toFixed(1) +
             "Q" + ((A.x + B.x) / 2 + ox).toFixed(1) + " " + ((A.y + B.y) / 2 + oy).toFixed(1) +
             " " + B.x.toFixed(1) + " " + B.y.toFixed(1);
    }
    function redrawCenterEdges() {
      if (center === null) return;
      edges.forEach(function (e) {
        if (e.a === center || e.b === center) e.el.setAttribute("d", fpath(e.a, e.b));
      });
    }
    function targets(id) {
      var t = {}; t[id] = { x: CX, y: CY };
      var nb = N[id].adj, n = nb.length || 1;
      nb.forEach(function (o, k) {
        var ang = -Math.PI / 2 + 2 * Math.PI * k / n;
        if (N[o]) t[o] = { x: CX + RX * Math.cos(ang), y: CY + RY * Math.sin(ang) };
      });
      Object.keys(N).forEach(function (o) { if (!(o in t)) t[o] = N[o].home; });  // 其余原地淡出
      return t;
    }
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function animate(tg, dur, done) {
      if (raf) cancelAnimationFrame(raf);
      if (reduce) {              // 尊重「减少动态效果」：直接到位，不做补间
        Object.keys(N).forEach(function (id) { var b = tg[id] || N[id].cur; place(id, b.x, b.y); });
        redrawCenterEdges(); if (done) done(); return;
      }
      var s = {}, t0 = null;
      Object.keys(N).forEach(function (id) { s[id] = { x: N[id].cur.x, y: N[id].cur.y }; });
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;  // easeInOutCubic
        Object.keys(N).forEach(function (id) {
          var a = s[id], b = tg[id] || a;
          place(id, a.x + (b.x - a.x) * e, a.y + (b.y - a.y) * e);
        });
        redrawCenterEdges();
        if (p < 1) { raf = requestAnimationFrame(step); }
        else { raf = null; if (done) done(); }
      }
      raf = requestAnimationFrame(step);
    }
    function enter(id) {
      if (!N[id]) return;
      mode = "focus"; center = id; kg.classList.add("focus");
      knodes.forEach(function (el) {
        var m = el.getAttribute("data-m");
        el.classList.remove("self", "on", "faded");
        el.classList.add(m === id ? "self" : (N[id].adj.indexOf(m) >= 0 ? "on" : "faded"));
      });
      edges.forEach(function (e) {
        var on = (e.a === id || e.b === id);
        e.el.classList.toggle("on", on);
        e.el.classList.toggle("off", !on);
      });
      animate(targets(id), 500);
      back.style.display = "inline-flex";
      if (hint) hint.textContent = "点周围的模块继续跳，点中间的「" + id +
        "」打开那一册；按「返回全景」或 Esc 回到总图。";
    }
    function toMap() {
      if (mode !== "focus") return;
      mode = "map";
      knodes.forEach(function (el) { el.classList.remove("self", "on", "faded"); });
      var tg = {}; Object.keys(N).forEach(function (id) { tg[id] = N[id].home; });
      animate(tg, 460, function () {
        center = null; kg.classList.remove("focus");
        edges.forEach(function (e) {
          e.el.setAttribute("d", e.mapD); e.el.classList.remove("on", "off");
        });
      });
      back.style.display = "none";
      if (hint) hint.textContent = hintMap;
    }
    knodes.forEach(function (el) {
      var id = el.getAttribute("data-m");
      el.addEventListener("click", function (ev) {
        if (mode === "map") { ev.preventDefault(); enter(id); }
        else if (id === center) { /* 打开该册：放行默认导航 */ }
        else if (N[center].adj.indexOf(id) >= 0) { ev.preventDefault(); enter(id); }
        else { ev.preventDefault(); }   // 已淡出的模块不响应
      });
      el.addEventListener("keydown", function (ev) {
        if ((ev.key === "Enter" || ev.key === " ") && mode === "map") {
          ev.preventDefault(); enter(id);
        }
      });
    });
    back.addEventListener("click", toMap);
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && mode === "focus") toMap();
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
