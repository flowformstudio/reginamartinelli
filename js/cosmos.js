/* ==========================================================================
   cosmos.js — a quiet, premium atmosphere layer for the Inner Alignment
   Blueprint (v2) page. Renders a slow drifting starfield + soft floating
   sparkles on a fixed full-viewport canvas behind all content, and drives
   delicate parallax on [data-parallax] ornaments.

   Design intent: barely-there motion. Everything drifts slowly and glows
   softly — the page should feel alive, never busy. Fully disabled under
   prefers-reduced-motion.
   ========================================================================== */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- parallax ornaments (works even with reduced motion off-state) ---- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  function applyParallax() {
    var vh = window.innerHeight;
    for (var i = 0; i < parallaxEls.length; i++) {
      var el = parallaxEls[i];
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.06;
      var rect = el.getBoundingClientRect();
      var center = rect.top + rect.height / 2;
      var offset = (center - vh / 2) * speed;
      el.style.transform = 'translate3d(0,' + (-offset).toFixed(1) + 'px,0)';
    }
  }

  /* ---- starfield ---- */
  var canvas, ctx, dpr, W, H, stars = [], raf = null;

  var PALETTE = [
    'rgba(255,255,255,',   // white light
    'rgba(229,204,133,',   // soft gold
    'rgba(201,183,239,',   // lavender
    'rgba(245,166,228,'    // blush (rare)
  ];

  function makeStars() {
    stars = [];
    var area = W * H;
    var count = Math.min(120, Math.round(area / 17000));
    for (var i = 0; i < count; i++) {
      var colorPick = Math.random();
      var ci = colorPick < 0.6 ? 0 : colorPick < 0.85 ? 1 : colorPick < 0.96 ? 2 : 3;
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.5 + 0.18,          // base alpha
        tw: Math.random() * 0.6 + 0.2,          // twinkle amount
        ph: Math.random() * Math.PI * 2,        // twinkle phase
        sp: Math.random() * 0.0006 + 0.0002,    // twinkle speed
        vx: (Math.random() - 0.5) * 0.08,       // slow horizontal drift
        vy: -(Math.random() * 0.10 + 0.03),     // slow upward drift
        c: PALETTE[ci],
        big: Math.random() < 0.06                // a few are 4-point sparkles
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeStars();
  }

  function drawSparkle(s, alpha) {
    var len = s.r * 4.2;
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.strokeStyle = s.c + alpha + ')';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(-len, 0); ctx.lineTo(len, 0);
    ctx.moveTo(0, -len); ctx.lineTo(0, len);
    ctx.stroke();
    ctx.restore();
  }

  var t = 0;
  function frame() {
    t += 1;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      // drift
      s.x += s.vx; s.y += s.vy;
      if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
      if (s.x < -4) s.x = W + 4; else if (s.x > W + 4) s.x = -4;
      // twinkle
      var alpha = s.a + Math.sin(t * s.sp * 60 + s.ph) * s.tw * 0.5;
      if (alpha < 0.04) alpha = 0.04;
      if (s.big) {
        drawSparkle(s, Math.min(alpha, 0.7));
      } else {
        ctx.beginPath();
        ctx.fillStyle = s.c + alpha.toFixed(3) + ')';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    raf = requestAnimationFrame(frame);
  }

  function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.className = 'iab-cosmos';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    if (!reduce) frame();
  }

  function start() {
    initCanvas();
    if (parallaxEls.length) {
      applyParallax();
      window.addEventListener('scroll', function () {
        window.requestAnimationFrame(applyParallax);
      }, { passive: true });
      window.addEventListener('resize', applyParallax);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
