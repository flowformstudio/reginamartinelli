/* Regina Martinelli — hero "magnetize" animation
   Rays of light stream in from beyond the edges and converge on a single
   point beneath the headline. Each ray that arrives feeds the center, and
   the center grows — slowly, steadily — into a radiant nucleus.
   The page's metaphor made visible: the right people, drawn to one center.

   Progressive enhancement: requires JS + canvas + motion preference. Without
   any of those the hero simply shows its watercolor gradient. */
(function () {
  "use strict";

  var hero = document.querySelector("[data-magnetize]");
  if (!hero || !window.requestAnimationFrame) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  canvas.className = "sx-hero__canvas";
  canvas.setAttribute("aria-hidden", "true");
  hero.insertBefore(canvas, hero.firstChild);
  var ctx = canvas.getContext("2d");

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, CX = 0, CY = 0;

  function size() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    CX = W * 0.5;          /* convergence point: centered…  */
    CY = H * 0.55;         /* …just beneath the headline    */
  }
  size();
  window.addEventListener("resize", size);

  /* Brand light: golds lead, rose and violet support */
  var COLORS = [
    [229, 204, 133],  /* gold soft   */
    [198, 162, 75],   /* gold        */
    [255, 244, 214],  /* warm white  */
    [245, 166, 228],  /* pink light  */
    [168, 109, 223]   /* violet      */
  ];

  var COUNT = Math.min(70, Math.floor(W / 20));
  var rays = [];

  function spawn(p) {
    var a = Math.random() * Math.PI * 2;
    var r = Math.max(W, H) * (0.55 + Math.random() * 0.3);
    p.x = CX + Math.cos(a) * r;
    p.y = CY + Math.sin(a) * r * 0.8;
    /* rays head straight for the center — a touch of lateral drift only */
    var d = Math.sqrt((CX - p.x) * (CX - p.x) + (CY - p.y) * (CY - p.y)) || 1;
    var speed = 1.2 + Math.random() * 1.6;
    p.vx = ((CX - p.x) / d) * speed;
    p.vy = ((CY - p.y) / d) * speed;
    p.accel = 1.012 + Math.random() * 0.01;    /* light gathers speed   */
    p.w = 0.6 + Math.random() * 1.6;           /* ray thickness         */
    p.trail = 26 + Math.random() * 60;         /* ray length            */
    p.c = COLORS[(Math.random() * COLORS.length) | 0];
    p.a = 0.25 + Math.random() * 0.45;
    p.life = 0;
    return p;
  }
  for (var i = 0; i < COUNT; i++) {
    var p = spawn({});
    /* pre-roll: distribute along their journeys so frame 1 is alive */
    var k = Math.pow(Math.random(), 1.6);
    p.x += (CX - p.x) * k;
    p.y += (CY - p.y) * k;
    p.life = 60;
    rays.push(p);
  }

  /* The nucleus grows as rays arrive — slow, inevitable accumulation */
  var energy = 0;
  var CORE_BASE = 22;
  var CORE_MAX = 130;

  var running = true;
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) tick();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      running = entries[0].isIntersecting && !document.hidden;
      if (running) tick();
    }).observe(hero);
  }

  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    var coreR = CORE_BASE + (CORE_MAX - CORE_BASE) * (1 - Math.exp(-energy / 140));

    for (var i = 0; i < rays.length; i++) {
      var p = rays[i];
      p.vx *= p.accel;
      p.vy *= p.accel;
      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      var dx = CX - p.x, dy = CY - p.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;

      /* the ray reaches the nucleus: absorbed, the center grows */
      if (d < coreR * 0.55) {
        energy++;
        spawn(p);
        continue;
      }

      var bornFade = Math.min(1, p.life / 50);
      var nearFade = Math.min(1, (d - coreR * 0.55) / 160);
      var alpha = p.a * bornFade * (0.35 + 0.65 * (1 - nearFade)); /* brighten on approach */

      /* the ray: a tapered streak of light pointing at the center */
      var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
      var tx = p.x - (p.vx / sp) * p.trail;
      var ty = p.y - (p.vy / sp) * p.trail;
      var c = p.c;
      var grad = ctx.createLinearGradient(tx, ty, p.x, p.y);
      grad.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
      grad.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + alpha + ")");
      ctx.strokeStyle = grad;
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      /* bright head of the ray */
      ctx.fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (alpha * 0.9) + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.w * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    /* the growing nucleus — layered bloom, breathing gently */
    var t = performance.now() / 1700;
    var breathe = 1 + 0.05 * Math.sin(t);
    var R = coreR * breathe;

    var halo = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 3);
    halo.addColorStop(0, "rgba(255, 247, 222, 0.30)");
    halo.addColorStop(0.35, "rgba(229, 204, 133, 0.14)");
    halo.addColorStop(1, "rgba(229, 204, 133, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(CX, CY, R * 3, 0, Math.PI * 2);
    ctx.fill();

    var core = ctx.createRadialGradient(CX, CY, 0, CX, CY, R);
    core.addColorStop(0, "rgba(255, 252, 240, 0.55)");
    core.addColorStop(0.5, "rgba(245, 222, 160, 0.30)");
    core.addColorStop(1, "rgba(229, 204, 133, 0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(tick);
  }
  tick();
})();
