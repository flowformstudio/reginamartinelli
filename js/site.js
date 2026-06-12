/* Regina Martinelli — site behaviour
   Plain, dependency-free. Progressive enhancement only: the site is fully
   readable with JS disabled. */
(function () {
  "use strict";

  // Mark that JS is available so the CSS can safely hide-then-reveal.
  document.documentElement.classList.add("has-js");

  // ---- Mobile menu -------------------------------------------------------
  var burger = document.querySelector("[data-menu-toggle]");
  var mobile = document.querySelector("[data-mobile-menu]");
  if (burger && mobile) {
    var setOpen = function (open) {
      mobile.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", function () {
      setOpen(!mobile.classList.contains("is-open"));
    });
    mobile.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // ---- Opt-in forms (front-end only demo) --------------------------------
  document.querySelectorAll("[data-optin]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var wrap = form.closest(".rm-optin");
      if (!wrap) return;
      var name = (form.querySelector('input[name="name"]') || {}).value || "";
      var thanksName = wrap.querySelector("[data-optin-name]");
      if (thanksName) thanksName.textContent = name ? ", " + name.trim() : "";
      wrap.classList.add("is-sent");
    });
  });

  // ---- Reveal on scroll --------------------------------------------------
  var reveals = document.querySelectorAll(".rm-reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
