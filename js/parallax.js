/* Regina Martinelli — ornament parallax
   Background shapes (starbursts, geometry, sparkle accents) drift at
   different depths while scrolling, giving the page gentle dimension.
   Elements opt in via data-parallax="<depth>" — depth is the fraction of
   scroll distance the shape moves relative to the page (0.1 = slow/far,
   0.3 = faster/near). Progressive enhancement; reduced-motion = static. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var els = [].slice.call(document.querySelectorAll("[data-parallax]"));
  if (!els.length || !window.requestAnimationFrame) return;

  var items = els.map(function (el) {
    return { el: el, depth: parseFloat(el.getAttribute("data-parallax")) || 0.15, base: 0 };
  });

  function measure() {
    items.forEach(function (it) {
      it.el.style.transform = "";
      var r = it.el.getBoundingClientRect();
      it.base = r.top + r.height / 2 + window.scrollY;
    });
  }

  var ticking = false;
  function update() {
    ticking = false;
    var center = window.scrollY + window.innerHeight / 2;
    items.forEach(function (it) {
      var d = (center - it.base) * it.depth;
      it.el.style.transform = "translate3d(0," + d.toFixed(1) + "px,0)";
    });
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  measure();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { measure(); update(); });
  window.addEventListener("load", function () { measure(); update(); });
})();

/* Graceful bloom — ornaments arrive one by one as they scroll into view.
   Stagger is per-section, in document order. */
(function () {
  "use strict";
  var els = [].slice.call(document.querySelectorAll(".sx-bloom"));
  if (!els.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-bloomed"); });
    return;
  }
  var counts = [];
  els.forEach(function (el) {
    var sec = el.closest("section") || document.body;
    var entry = null;
    for (var i = 0; i < counts.length; i++) if (counts[i].sec === sec) entry = counts[i];
    if (!entry) { entry = { sec: sec, n: 0 }; counts.push(entry); }
    el.style.setProperty("--bloom-delay", (entry.n * 0.18).toFixed(2) + "s");
    entry.n++;
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-bloomed"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
  els.forEach(function (el) { io.observe(el); });
})();
