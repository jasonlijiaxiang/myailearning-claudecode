/* 知识库网页面 · 交互底座
   纪律（web-rules §九）：搜索、目录高亮、字段注释都必须帮助定位/比较/理解/追证/决策，
   否则不做；无 JS 时保留完整阅读路径，本文件只做增强。
   Portable：不用 ES module、不 fetch——file:// 下两者都会被浏览器拦截。 */
(function () {
  "use strict";
  document.documentElement.className += " js-on";

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

  /* ---------- 模块页目录高亮（当前位置指示） ---------- */
  var toc = document.querySelector(".toc");
  if (toc && "IntersectionObserver" in window) {
    var links = {}, secs = [];
    Array.prototype.forEach.call(toc.querySelectorAll("a[href^='#']"), function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) { links[id] = a; secs.push(el); }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].className = ""; });
        var a = links[en.target.id];
        if (a) a.className = "on";
      });
    }, { rootMargin: "0px 0px -70% 0px", threshold: 0 });
    secs.forEach(function (s) { io.observe(s); });
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
