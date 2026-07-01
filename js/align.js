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

  /* phones: 1.5x is visually identical for soft glows at half the pixel cost */
  var DPR = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2);
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

  /* golden braid: motes are gold-dominant, cool tones as rare accents */
  var COLORS = [
    [232, 198, 110],  /* yellow gold      */
    [255, 226, 150],  /* bright gold      */
    [229, 204, 133],  /* gold soft        */
    [255, 244, 214],  /* warm white       */
    [232, 198, 110],  /* yellow gold      */
    [171, 222, 218],  /* turquoise (rare) */
    [168, 109, 223]   /* violet (rare)    */
  ];
  /* pre-rendered glow sprites — one per color, drawn once. Per frame we
     drawImage instead of building a radial gradient per mote (the old way
     allocated ~130 gradients every frame; phones felt it) */
  var SPRITE_R = 32;
  var SPRITES = COLORS.map(function (c) {
    var s = document.createElement("canvas");
    s.width = s.height = SPRITE_R * 2;
    var sctx = s.getContext("2d");
    var g = sctx.createRadialGradient(SPRITE_R, SPRITE_R, 0, SPRITE_R, SPRITE_R, SPRITE_R);
    g.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",1)");
    g.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, SPRITE_R * 2, SPRITE_R * 2);
    return s;
  });

  /* concentric orbit radii (base units, scaled to hero) — outer ring
     carries the braid out to the hero's edges */
  var RINGS = [120, 210, 310, 420, 545];
  var RING_SPEED = [0.00022, -0.00016, 0.00011, -0.00008, 0.00006];

  var COUNT = Math.min(130, Math.floor(W / 11));
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
      /* when and how gracefully it aligns — early and quick, the hero
         must be alive before the visitor thinks of scrolling */
      delay: 150 + Math.random() * 2200,         /* ms before it begins  */
      ease: 1500 + Math.random() * 1700,         /* ms to settle         */
      size: 1 + Math.random() * 2.2,
      ci: (Math.random() * COLORS.length) | 0,
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

      var twinkle = 0.6 + 0.4 * Math.sin(m.tw);
      var alpha = (0.45 + 0.45 * a) * twinkle;  /* prominent, brighter once home */
      var rad = m.size * (0.9 + 0.6 * a);

      var d = rad * 6;
      ctx.globalAlpha = alpha;
      ctx.drawImage(SPRITES[m.ci], x - d / 2, y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;

    /* precise golden orbits — clean concentric rings whose color shimmers
       through gold tones, each carrying a travelling glint of light */
    /* small floor so the blueprint is faintly present from frame one */
    var ringAlpha = Math.min(1, 0.18 + (totalAlign / motes.length) * 0.95);
    if (ringAlpha > 0.01) {
      for (var k = 0; k < RINGS.length; k++) {
        var rx = RINGS[k] * SCALE;
        var ry = rx * 0.82;

        /* shimmering stroke — hue breathes between deep and bright gold;
           the two innermost orbits stay quieter so the headline reads */
        var kAlpha = ringAlpha * (k <= 1 ? 0.4 : 1);
        var ph = (Math.sin(now * 0.0012 + k * 1.4) + 1) / 2;
        var cr = (198 + 57 * ph) | 0;
        var cg = (162 + 68 * ph) | 0;
        var cb = (75 + 90 * ph) | 0;
        ctx.strokeStyle = "rgba(" + cr + "," + cg + "," + cb + "," + kAlpha + ")";
        ctx.lineWidth = 2.1;
        ctx.beginPath();
        ctx.ellipse(CX, CY, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        /* the shine — a bright glint travelling along the orbit */
        var shineAng = now * RING_SPEED[k] * 4 + k * 1.7;
        ctx.strokeStyle = "rgba(255, 252, 238, " + Math.min(0.95, kAlpha * 1.4) + ")";
        ctx.lineWidth = 2.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.ellipse(CX, CY, rx, ry, 0, shineAng, shineAng + 0.5);
        ctx.stroke();
      }
    }

    /* the bright center — a radiant veil drawn OVER the orbits, washing
       them out across the headline zone so the text always reads clean */
    var bt = now / 1900;
    var spread = RINGS[RINGS.length - 1] * SCALE * 2.6 * (1 + 0.03 * Math.sin(bt));
    var core = ctx.createRadialGradient(CX, CY, 0, CX, CY, spread);
    core.addColorStop(0, "rgba(255, 255, 253, 1)");
    core.addColorStop(0.1, "rgba(255, 249, 228, 0.8)");
    core.addColorStop(0.24, "rgba(252, 245, 222, 0.55)");
    core.addColorStop(0.45, "rgba(235, 240, 226, 0.3)");
    core.addColorStop(0.7, "rgba(205, 226, 224, 0.13)");
    core.addColorStop(1, "rgba(150, 168, 235, 0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(CX, CY, spread, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(tick);
  }
  tick();
})();
