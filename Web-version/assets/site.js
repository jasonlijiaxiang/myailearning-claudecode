/* 知识库网页面 · 交互底座
   纪律（web-rules §九）：搜索、目录高亮、字段注释都必须帮助定位/比较/理解/追证/决策，
   否则不做；无 JS 时保留完整阅读路径，本文件只做增强。
   Portable：不用 ES module、不 fetch——file:// 下两者都会被浏览器拦截。 */
(function () {
  "use strict";
  document.documentElement.className += " js-on";

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
        hits.innerHTML = '<li><a href="#" onclick="return false">没有匹配的模块、章节或事实</a></li>';
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
