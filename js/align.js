/* Regina Martinelli — hero "alignment" animation (Inner Alignment Blueprint)
   Motes of light begin scattered — drifting, aimless, foggy — and one by one
   they find their orbit: concentric rings turning slowly around a calm gold
   center. Chaos resolving into pattern. Finding your way back to yourself.

   Progressive enhancement: requires JS + canvas + motion preference. */
(function () {
  "use strict";

  var hero = document.querySelector("[data-align]");
  if (!hero || !window.requestAnimationFrame) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  canvas.className = "sx-hero__canvas";
  canvas.setAttribute("aria-hidden", "true");
  hero.insertBefore(canvas, hero.firstChild);
  var ctx = canvas.getContext("2d");

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, CX = 0, CY = 0, SCALE = 1;

  function size() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    CX = W * 0.5;
    CY = H * 0.55;
    SCALE = Math.min(W, H) / 900;
  }
  size();
  window.addEventListener("resize", size);

  var COLORS = [
    [229, 204, 133],  /* gold soft  */
    [198, 162, 75],   /* gold       */
    [255, 244, 214],  /* warm white */
    [245, 166, 228],  /* pink light */
    [168, 109, 223]   /* violet     */
  ];
  /* concentric orbit radii (base units, scaled to hero) */
  var RINGS = [120, 200, 290, 390];
  var RING_SPEED = [0.00022, -0.00016, 0.00011, -0.00008];

  var COUNT = Math.min(96, Math.floor(W / 15));
  var motes = [];
  for (var i = 0; i < COUNT; i++) {
    var ring = i % RINGS.length;
    motes.push({
      /* scattered birth */
      sx: Math.random() * 1.4 - 0.2,            /* chaos pos, fractions of W/H */
      sy: Math.random() * 1.4 - 0.2,
      wob: Math.random() * Math.PI * 2,          /* wander phase   */
      wobSpeed: 0.004 + Math.random() * 0.008,
      wobAmp: 30 + Math.random() * 70,
      /* destined orbit */
      ring: ring,
      slot: Math.random() * Math.PI * 2,
      /* when and how gracefully it aligns */
      delay: 800 + Math.random() * 7000,         /* ms before it begins  */
      ease: 2600 + Math.random() * 2600,         /* ms to settle         */
      size: 1 + Math.random() * 2.2,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      tw: Math.random() * Math.PI * 2,
      twSpeed: 0.015 + Math.random() * 0.04
    });
  }

  var born = performance.now();
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

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function tick() {
    if (!running) return;
    var now = performance.now();
    var t = now - born;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    var totalAlign = 0;

    for (var i = 0; i < motes.length; i++) {
      var m = motes[i];
      m.wob += m.wobSpeed;
      m.tw += m.twSpeed;

      /* chaos position: scattered home + slow wander */
      var chx = m.sx * W + Math.cos(m.wob) * m.wobAmp;
      var chy = m.sy * H + Math.sin(m.wob * 0.8) * m.wobAmp;

      /* orbit position: its ring, its slot, the ring's own slow turn */
      var ang = m.slot + t * RING_SPEED[m.ring];
      var r = RINGS[m.ring] * SCALE;
      var ox = CX + Math.cos(ang) * r;
      var oy = CY + Math.sin(ang) * r * 0.82;   /* gentle ellipse */

      /* alignment progress */
      var a = Math.max(0, Math.min(1, (t - m.delay) / m.ease));
      a = easeInOut(a);
      totalAlign += a;

      var x = chx + (ox - chx) * a;
      var y = chy + (oy - chy) * a;

      var twinkle = 0.55 + 0.45 * Math.sin(m.tw);
      var alpha = (0.22 + 0.4 * a) * twinkle;   /* brighter once home */
      var c = m.c;
      var rad = m.size * (0.7 + 0.5 * a);

      var glow = ctx.createRadialGradient(x, y, 0, x, y, rad * 3);
      glow.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + alpha + ")");
      glow.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, rad * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    /* orbit rings fade in as the field aligns */
    var ringAlpha = (totalAlign / motes.length) * 0.16;
    if (ringAlpha > 0.005) {
      ctx.strokeStyle = "rgba(198, 162, 75, " + ringAlpha + ")";
      ctx.lineWidth = 1;
      for (var k = 0; k < RINGS.length; k++) {
        ctx.beginPath();
        ctx.ellipse(CX, CY, RINGS[k] * SCALE, RINGS[k] * SCALE * 0.82, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    /* the calm center — still point of the turning world */
    var bt = now / 1900;
    var R = (26 + 10 * (totalAlign / motes.length)) * (1 + 0.05 * Math.sin(bt));
    var core = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 3);
    core.addColorStop(0, "rgba(255, 250, 232, " + (0.4 + 0.08 * Math.sin(bt)) + ")");
    core.addColorStop(0.4, "rgba(229, 204, 133, 0.16)");
    core.addColorStop(1, "rgba(229, 204, 133, 0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(CX, CY, R * 3, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(tick);
  }
  tick();
})();
