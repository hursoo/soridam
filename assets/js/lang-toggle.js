(function () {
  var STORAGE_KEY = "soridam_lang";

  function getInitialLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored === "ko" || stored === "en") return stored;
    var nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    return nav.indexOf("ko") === 0 ? "ko" : "en";
  }

  function getValue(obj, path) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function applyLang(lang) {
    var dict = window.SITE_I18N && window.SITE_I18N[lang];
    if (!dict) return;

    document.documentElement.lang = lang;
    if (dict.meta && dict.meta.title) document.title = dict.meta.title;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.meta && dict.meta.description) {
      metaDesc.setAttribute("content", dict.meta.description);
    }

    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var val = getValue(dict, el.getAttribute("data-i18n"));
      if (typeof val === "string") {
        el.innerHTML = escapeHtml(val).replace(/\n/g, "<br>");
      }
    }

    var lists = document.querySelectorAll("[data-i18n-list]");
    for (var j = 0; j < lists.length; j++) {
      var lel = lists[j];
      var lval = getValue(dict, lel.getAttribute("data-i18n-list"));
      if (Object.prototype.toString.call(lval) === "[object Array]") {
        var html = "";
        for (var k = 0; k < lval.length; k++) {
          html += "<li>" + escapeHtml(lval[k]) + "</li>";
        }
        lel.innerHTML = html;
      }
    }

    var hrefs = document.querySelectorAll("[data-i18n-href]");
    for (var m = 0; m < hrefs.length; m++) {
      var hel = hrefs[m];
      var hval = getValue(dict, hel.getAttribute("data-i18n-href"));
      if (typeof hval === "string") hel.setAttribute("href", hval);
    }

    var toggle = document.getElementById("lang-toggle");
    if (toggle && dict.meta && dict.meta.lang_label) {
      toggle.textContent = dict.meta.lang_label;
    }
  }

  var currentLang = getInitialLang();
  applyLang(currentLang);

  var toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      currentLang = currentLang === "ko" ? "en" : "ko";
      try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) {}
      applyLang(currentLang);
    });
  }
})();
