(function () {
  var root = document.getElementById("detail");
  function render() {
    var id = new URLSearchParams(location.search).get("id");
    var p = PROJECTS.filter(function (x) { return x.id === id && x.category === "web"; })[0];
    if (!p) {
      document.title = t("detail.notfound");
      root.innerHTML = "<h1>" + esc(t("detail.notfound")) + '</h1><p><a href="../index.html#projects">' + esc(t("detail.back")) + "</a></p>";
      return;
    }
    var d = p.details || {};
    document.title = tr(p.title) + " | Md Rayhan Hossain";
    function sec(key, val) { return "<section><h2>" + esc(t(key)) + "</h2>" + val + "</section>"; }
    function para(v) { return "<p>" + esc(tr(v)) + "</p>"; }
    function link(href, key) {
      return href ? '<a class="btn ' + (key === "btn.demo" ? "primary" : "ghost") + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(t(key)) + "</a>"
                  : '<span class="btn ghost is-disabled" aria-disabled="true">' + esc(t(key)) + " (" + esc(t("btn.soon")) + ")</span>";
    }
    root.innerHTML =
      '<p class="kicker">' + esc(t("cat.web")) + "</p><h1>" + esc(tr(p.title)) + "</h1><p class=\"lead\">" + esc(tr(p.desc)) + "</p>" +
      '<div class="thumb"><span>' + esc(t("img.ph")) + '</span><img src="../' + esc(p.image) + '" alt="' + esc(tr(p.title)) + '" hidden onload="this.hidden=false;this.previousElementSibling.hidden=true"></div>' +
      sec("detail.overview", para(d.overview)) + sec("detail.problem", para(d.problem)) + sec("detail.role", para(d.role)) +
      sec("detail.stack", p.tags && p.tags.length ? '<ul class="tags">' + p.tags.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : para(TBD)) +
      sec("detail.features", '<ul class="list">' + (d.features || [TBD]).map(function (f) { return "<li>" + esc(tr(f)) + "</li>"; }).join("") + "</ul>") +
      sec("detail.challenges", para(d.challenges)) + sec("detail.solutions", para(d.solutions)) +
      sec("detail.lessons", para(d.lessons)) + sec("detail.improve", para(d.improvements)) +
      sec("detail.links", '<div class="actions">' + link(p.demo, "btn.demo") + link(p.repo, "btn.repo") + "</div>");
  }
  render();
  document.addEventListener("langchange", render);
})();
