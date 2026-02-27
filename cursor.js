(function () {
  /* Skip on touch / mobile devices */
  if (window.matchMedia('(pointer:coarse)').matches) return;

  /* ── Inject keyframe animation for sparkle particles ── */
  const st = document.createElement('style');
  st.textContent = `
    @keyframes konSparkFloat {
      0%   { opacity: .9; transform: translate(-50%,-50%) scale(1) rotate(var(--r)); }
      60%  { opacity: .5; }
      100% { opacity: 0;  transform: translate(-50%, calc(-50% - 24px)) scale(0) rotate(var(--r)); }
    }
  `;
  document.head.appendChild(st);

  /* ── Create the golden halo ring ── */
  const wrap = document.createElement('div');
  wrap.className = 'cursor-wrap';
  const halo = document.createElement('div');
  halo.className = 'cursor-halo';
  wrap.appendChild(halo);
  document.body.appendChild(wrap);

  /* ── Halo follows cursor with a smooth lag ── */
  let hx = -200, hy = -200;   /* current halo position */
  let tx = -200, ty = -200;   /* target (mouse) position */

  function animHalo() {
    hx += (tx - hx) * 0.12;
    hy += (ty - hy) * 0.12;
    wrap.style.transform = `translate(${hx}px, ${hy}px)`;
    requestAnimationFrame(animHalo);
  }
  animHalo();

  /* ── Hover state on interactive elements ── */
  const HOVER_SEL = 'a, button, label, [onclick], .product-card, .filter-btn, .ai-tab, .nav-links a';
  function setHover(on) { halo.classList.toggle('hover', on); }

  /* ── Sparkle particle pool ── */
  let lastX = 0, lastY = 0;
  const GOLD   = [[201,168,76],[226,201,126],[255,236,180],[180,140,50]];
  const SHAPES = ['✦','◆','✧','·','∙'];

  function spawn(x, y) {
    const color = GOLD[Math.floor(Math.random() * GOLD.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const size  = Math.random() * 6 + 4;
    const alpha = Math.random() * 0.5 + 0.4;
    const rot   = (Math.random() * 70 - 35) + 'deg';
    const dur   = Math.random() * 300 + 420;
    const ox    = (Math.random() - 0.5) * 16;
    const oy    = (Math.random() - 0.5) * 16;

    const d = document.createElement('span');
    d.textContent = shape;
    d.style.cssText = [
      `position:fixed`,
      `left:${x + ox}px`,
      `top:${y + oy}px`,
      `font-size:${size}px`,
      `line-height:1`,
      `color:rgba(${color},${alpha})`,
      `text-shadow:0 0 ${size * 1.5}px rgba(${color},0.35)`,
      `pointer-events:none`,
      `user-select:none`,
      `z-index:2147483647`,
      `--r:${rot}`,
      `animation:konSparkFloat ${dur}ms ease-out forwards`,
    ].join(';');

    document.body.appendChild(d);
    setTimeout(() => d.remove(), dur + 50);
  }

  /* ── Unified mousemove ── */
  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;

    /* Hover detection */
    const el = document.elementFromPoint(e.clientX, e.clientY);
    setHover(el ? !!el.closest(HOVER_SEL) : false);

    /* Sparkle trail – throttled by distance */
    if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 18) return;
    lastX = e.clientX;
    lastY = e.clientY;
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) spawn(e.clientX, e.clientY);
  });

  /* ── Click burst ── */
  document.addEventListener('click', e => {
    for (let i = 0; i < 7; i++) spawn(e.clientX, e.clientY);
  });

  /* ── Hide halo when leaving window ── */
  document.addEventListener('mouseleave', () => { tx = -200; ty = -200; });
})();
