(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var base = document.body.dataset.base || "";
  var lang = "en";
  try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
  if (!I18N[lang]) lang = "en";

  // t(key) translates a UI key; tr(value) picks a language from {en,bn} or returns a string
  window.t = function (k) { return I18N[lang][k] || I18N.en[k] || k; };
  window.tr = function (v) { return v && typeof v === "object" && !Array.isArray(v) ? (v[lang] || v.en) : v; };
  window.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    $("#lang").textContent = lang === "en" ? "বাংলা" : "English";
    $("#lang").setAttribute("aria-label", lang === "en" ? "বাংলায় দেখুন" : "Switch to English");
    updateResume();
    renderContact();
    renderProjects();
    document.dispatchEvent(new Event("langchange"));
  }
  $("#lang").addEventListener("click", function () {
    lang = lang === "en" ? "bn" : "en";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    applyLang();
  });

  // Mobile menu
  var burger = $("#burger"), menu = $("#menu");
  function closeMenu() { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  // Scroll reveal
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 }) : null;
  function observe() {
    $$(".reveal:not(.in)").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });
  }

  // Resume: only enabled if the PDF really exists
  var resumeOk = false;
  function updateResume() {
    var a = $("#resume"); if (!a) return;
    a.setAttribute("aria-disabled", resumeOk ? "false" : "true");
    a.textContent = t(resumeOk ? "hero.resume" : "hero.resume.soon");
  }
  var resume = $("#resume");
  if (resume) {
    resume.addEventListener("click", function (e) { if (!resumeOk) e.preventDefault(); });
    if (window.fetch) {
      fetch(base + "assets/resume/resume.pdf", { method: "HEAD" })
        .then(function (r) { resumeOk = r.ok; updateResume(); })
        .catch(function () {});
    }
  }

  // Project cards
  function btn(href, label, cls) {
    if (href) return '<a class="btn ' + cls + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
    return '<span class="btn ' + cls + ' is-disabled" aria-disabled="true">' + esc(label) + " (" + esc(t("btn.soon")) + ")</span>";
  }
  function card(p) {
    var web = p.category === "web";
    var actions = web
      ? btn(p.demo, t("btn.demo"), "primary") + btn(p.repo, t("btn.repo"), "ghost") +
        '<a class="btn ghost" href="project-details/project.html?id=' + encodeURIComponent(p.id) + '">' + esc(t("btn.details")) + "</a>"
      : btn(p.drive, t("btn.drive"), "primary");
    return '<article class="card reveal in"><div class="thumb"><span>' + esc(t("img.ph")) + '</span>' +
      '<img src="' + esc(p.image) + '" alt="' + esc(tr(p.title)) + '" loading="lazy" hidden onload="this.hidden=false;this.previousElementSibling.hidden=true"></div>' +
      '<div class="body">' + (p.placeholder ? '<span class="badge">' + esc(t("projects.placeholder")) + "</span>" : "") +
      '<span class="cat">' + esc(t(web ? "cat.web" : "cat.mkt")) + "</span><h3>" + esc(tr(p.title)) + "</h3><p>" + esc(tr(p.desc)) + "</p>" +
      '<ul class="tags">' + (p.tags || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<div class="actions">' + actions + "</div></div></article>";
  }
  function renderProjects() {
    var web = $("#web-grid"), mkt = $("#mkt-grid"); if (!web) return;
    web.innerHTML = PROJECTS.filter(function (p) { return p.category === "web"; }).map(card).join("");
    mkt.innerHTML = PROJECTS.filter(function (p) { return p.category === "marketing"; }).map(card).join("");
    var anyPh = PROJECTS.some(function (p) { return p.placeholder; });
    $("#web-note").hidden = !anyPh;
  }

  // Contact list
  function renderContact() {
    var ul = $("#contact-list"); if (!ul) return;
    var rows = [
      ["contact.email", SITE.email, SITE.email && "mailto:" + SITE.email],
      ["contact.phone", SITE.phone, SITE.phone && "tel:" + SITE.phone],
      ["contact.whatsapp", SITE.whatsapp, SITE.whatsapp && "https://wa.me/" + SITE.whatsapp]
    ];
    ul.innerHTML = rows.map(function (r) {
      var val = r[1] ? '<a href="' + esc(r[2]) + '"' + (r[0] === "contact.whatsapp" ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + esc(r[1]) + "</a>"
                     : '<span class="ph">' + esc(t("contact.missing")) + "</span>";
      return "<li>" + esc(t(r[0])) + ": " + val + "</li>";
    }).join("");
  }

  // Contact form: validates, then opens the visitor's email app (mailto). It never claims a message was sent.
  var form = $("#form");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    function check(id, errId, key, valid) {
      var el = f[id], err = $("#" + errId);
      el.setAttribute("aria-invalid", valid ? "false" : "true");
      err.dataset.i18n = valid ? "" : key; err.textContent = valid ? "" : t(key);
      if (!valid && ok) { el.focus(); ok = false; }
    }
    check("name", "e-name", "err.name", f.name.value.trim().length > 0);
    check("email", "e-email", "err.email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim()));
    check("message", "e-msg", "err.msg", f.message.value.trim().length > 0);
    var st = $("#status");
    if (!ok) { st.dataset.i18n = ""; st.textContent = ""; return; }
    if (!SITE.email) { st.dataset.i18n = "form.noemail"; st.textContent = t("form.noemail"); return; }
    var body = f.message.value.trim() + "\n\n" + f.name.value.trim() + " (" + f.email.value.trim() + ")";
    st.dataset.i18n = "form.mailto"; st.textContent = t("form.mailto");
    location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Portfolio message from " + f.name.value.trim()) + "&body=" + encodeURIComponent(body);
  });

  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  applyLang();
  observe();
})();
