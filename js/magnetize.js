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

  /* Golden light leads — warm yellows dominate, rose/violet only as rare accents */
  var COLORS = [
    [232, 198, 110],  /* yellow gold  */
    [229, 204, 133],  /* gold soft    */
    [255, 226, 150],  /* bright gold  */
    [255, 244, 214],  /* warm white   */
    [232, 198, 110],  /* yellow gold  */
    [229, 204, 133],  /* gold soft    */
    [255, 226, 150],  /* bright gold  */
    [245, 166, 228],  /* pink (rare)  */
    [168, 109, 223]   /* violet (rare)*/
  ];

  var COUNT = Math.min(130, Math.floor(W / 11));
  var rays = [];

  function spawn(p) {
    var a = Math.random() * Math.PI * 2;
    var r = Math.max(W, H) * (0.55 + Math.random() * 0.3);
    p.x = CX + Math.cos(a) * r;
    p.y = CY + Math.sin(a) * r * 0.8;
    /* rays head straight for the center — a touch of lateral drift only */
    var d = Math.sqrt((CX - p.x) * (CX - p.x) + (CY - p.y) * (CY - p.y)) || 1;
    var speed = 0.4 + Math.random() * 0.5;     /* unhurried, inevitable */
    p.vx = ((CX - p.x) / d) * speed;
    p.vy = ((CY - p.y) / d) * speed;
    p.accel = 1.004 + Math.random() * 0.003;   /* light gathers speed, gently */
    p.w = 2.6 + Math.random() * 4;             /* ray thickness         */
    p.trail = 60 + Math.random() * 140;        /* ray length            */
    p.c = COLORS[(Math.random() * COLORS.length) | 0];
    p.a = 0.4 + Math.random() * 0.5;
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

  /* The nucleus grows on a fixed clock: a quick bloom, then steady,
     visible growth — 80% of full size at 30 seconds, still gaining
     gently for a couple of minutes after. */
  var energy = 0;
  var CORE_BASE = 34;
  var born = performance.now();

  /* Gentle star sparkles ringing the orb — born, twinkle, gone */
  var sparkles = [];
  var SPARKLE_COUNT = 14;
  function spawnSparkle(s, coreR) {
    var a = Math.random() * Math.PI * 2;
    var dist = coreR * (1.05 + Math.random() * 1.3);
    s.x = CX + Math.cos(a) * dist;
    s.y = CY + Math.sin(a) * dist * 0.9;
    s.size = 3 + Math.random() * 7;
    s.rot = Math.random() * Math.PI;
    s.dur = 90 + Math.random() * 150;      /* frames of life      */
    s.age = -Math.random() * 200;          /* staggered births    */
    s.drift = 0.06 + Math.random() * 0.12; /* slow outward float  */
    s.dx = Math.cos(a); s.dy = Math.sin(a);
    s.warm = Math.random() < 0.6;          /* gold vs warm white  */
    return s;
  }
  for (var si = 0; si < SPARKLE_COUNT; si++) sparkles.push(spawnSparkle({}, 120));

  function drawStar4(x, y, r, rot, alpha, warm) {
    var inner = r * 0.22;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    for (var k = 0; k < 8; k++) {
      var ang = (Math.PI / 4) * k;
      var rad = (k % 2 === 0) ? r : inner;
      var px = Math.cos(ang) * rad;
      var py = Math.sin(ang) * rad;
      if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = warm
      ? "rgba(255, 228, 158, " + alpha + ")"
      : "rgba(255, 248, 230, " + alpha + ")";
    ctx.fill();
    ctx.restore();
  }

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

    /* two-phase growth: a fast bloom at first (the magnetism is working),
       easing into a long, patient swell that never quite stops */
    var CORE_LIMIT = Math.min(W, H) * 0.5;
    var ts = (performance.now() - born) / 1000;   /* seconds on the page */
    var grow = 0.45 * (1 - Math.exp(-ts / 6)) + 0.55 * (1 - Math.exp(-ts / 30));
    var coreR = CORE_BASE + (CORE_LIMIT - CORE_BASE) * grow;

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
      ctx.fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (alpha * 0.95) + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.w * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }

    /* the growing nucleus — layered bloom, breathing gently */
    var t = performance.now() / 1700;
    var breathe = 1 + 0.05 * Math.sin(t);
    var R = coreR * breathe;

    var halo = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 3.4);
    halo.addColorStop(0, "rgba(255, 247, 222, 0.46)");
    halo.addColorStop(0.35, "rgba(229, 204, 133, 0.22)");
    halo.addColorStop(1, "rgba(229, 204, 133, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(CX, CY, R * 3.4, 0, Math.PI * 2);
    ctx.fill();

    var core = ctx.createRadialGradient(CX, CY, 0, CX, CY, R);
    core.addColorStop(0, "rgba(255, 252, 240, 0.78)");
    core.addColorStop(0.5, "rgba(245, 222, 160, 0.45)");
    core.addColorStop(1, "rgba(229, 204, 133, 0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fill();

    /* star sparkles around the orb — soft twinkle in, twinkle out */
    for (var s = 0; s < sparkles.length; s++) {
      var sp2 = sparkles[s];
      sp2.age++;
      if (sp2.age < 0) continue;
      if (sp2.age > sp2.dur) { spawnSparkle(sp2, coreR); continue; }
      var ph = sp2.age / sp2.dur;                 /* 0 → 1 over life */
      var env = Math.sin(Math.PI * ph);           /* fade in and out */
      sp2.x += sp2.dx * sp2.drift;
      sp2.y += sp2.dy * sp2.drift;
      sp2.rot += 0.004;
      drawStar4(sp2.x, sp2.y, sp2.size * (0.7 + 0.3 * env), sp2.rot, 0.75 * env, sp2.warm);
    }

    requestAnimationFrame(tick);
  }
  tick();
})();
