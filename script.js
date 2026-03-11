// ===========================
// KON LUXURY - JavaScript v3
// Lenis smooth scroll + GSAP
// ===========================

// ===== CANDLE INTRO =====
// Handled by inline <script> in index.html (runs before CDN scripts load)

// ===== SETTINGS =====
const _saved    = localStorage.getItem('konluxury_settings');
const _settings = _saved ? JSON.parse(_saved) : null;

// ===== CONTACT INFO =====
const WHATSAPP_NUMBER = _settings?.contact?.whatsapp || '9720549210470';
const INSTAGRAM_URL   = _settings?.contact?.instagram || 'https://instagram.com/konluxurycandles';

const WA_MESSAGES = {
  ar: _settings?.contact?.wa_ar || 'مرحباً، أود الاستفسار عن منتجاتكم في KON Luxury',
  he: _settings?.contact?.wa_he || 'שלום, אשמח לקבל מידע על המוצרים שלכם ב-KON Luxury',
  en: _settings?.contact?.wa_en || 'Hello, I would like to inquire about your products at KON Luxury',
};

// ===== TRANSLATIONS =====
const translations = {
  ar: {
    nav_home: 'الرئيسية', nav_about: 'من نحن', nav_products: 'منتجاتنا', nav_contact: 'تواصل معنا',
    hero_sub: 'مصنوع بشغف واتقان',
    hero_desc: 'شموع فاخرة · خمسة عوالم · روح واحدة',
    hero_btn: 'استعرض العوالم',
    about_title: 'من نحن',
    about_text: 'في KON Luxury نؤمن أن كل قطعة تحكي قصة.',
    stat1: 'عميل سعيد', stat2: 'عوالم حصرية', stat3: 'يدوي الصنع',
    products_title: 'منتجاتنا',
    filter_all: 'الكل',
    testi_title: 'آراء زبائننا',
    inquire_btn: 'استفسر الآن',
    contact_title: 'تواصل معنا', contact_sub: 'نحن هنا للإجابة على كل استفساراتك وتلبية طلباتك',
    btn_whatsapp: 'واتساب', btn_instagram: 'إنستغرام',
    footer_copy: '© 2025 KON Luxury · جميع الحقوق محفوظة',
  },
  he: {
    nav_home: 'בית', nav_about: 'אודות', nav_products: 'מוצרים', nav_contact: 'צור קשר',
    hero_sub: 'עשוי בתשוקה ובמיומנות',
    hero_desc: 'נרות יוקרתיים · חמישה עולמות · נשמה אחת',
    hero_btn: 'גלה עולמות',
    about_title: 'אודותינו', about_text: 'ב-KON Luxury אנו מאמינים שכל יצירה מספרת סיפור.',
    stat1: 'לקוחות מרוצים', stat2: 'עולמות ייחודיים', stat3: 'עבודת יד',
    products_title: 'המוצרים שלנו',
    filter_all: 'הכל',
    testi_title: 'חוות דעת לקוחותינו',
    inquire_btn: 'לפרטים',
    contact_title: 'צור קשר', contact_sub: 'אנחנו כאן לענות על כל שאלה',
    btn_whatsapp: 'וואטסאפ', btn_instagram: 'אינסטגרם',
    footer_copy: '© 2025 KON Luxury · כל הזכויות שמורות',
  },
  en: {
    nav_home: 'Home', nav_about: 'About', nav_products: 'Products', nav_contact: 'Contact',
    hero_sub: 'Crafted with passion & precision',
    hero_desc: 'Luxury Candles · Five Worlds · One Soul',
    hero_btn: 'Explore Worlds',
    about_title: 'About Us', about_text: 'At KON Luxury, we believe every piece tells a story.',
    stat1: 'Happy Clients', stat2: 'Exclusive Worlds', stat3: 'Handmade',
    products_title: 'Our Products',
    filter_all: 'All',
    testi_title: 'What Our Clients Say',
    inquire_btn: 'Inquire Now',
    contact_title: 'Contact Us', contact_sub: 'We are here to answer all your questions',
    btn_whatsapp: 'WhatsApp', btn_instagram: 'Instagram',
    footer_copy: '© 2025 KON Luxury · All Rights Reserved',
  }
};

let currentLang = 'ar';

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  const isRTL = (lang === 'ar' || lang === 'he');
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  document.body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// ===== SMOOTH SCROLL (Lenis optional — fallback to native) =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let _lenis = null;
try {
  if (typeof Lenis !== 'undefined') {
    _lenis = new Lenis({ duration: 1.4, smoothWheel: true, wheelMultiplier: 0.9 });
    _lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => _lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
} catch(e) { _lenis = null; }

// ===== NAVBAR =====
const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');

function handleScroll(scrollY) {
  navbar.classList.toggle('scrolled', scrollY > 50);
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active-nav', link.getAttribute('href') === `#${current}`);
  });
}

if (_lenis) {
  _lenis.on('scroll', ({ scroll }) => handleScroll(scroll));
} else {
  window.addEventListener('scroll', () => handleScroll(window.scrollY));
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== LANG BUTTONS =====
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

// ===== PRODUCT FILTER =====
const filterBtns  = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    productCards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          opacity: match ? 1 : 0,
          scale: match ? 1 : 0.95,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => card.classList.toggle('hidden', !match),
        });
        if (match) card.classList.remove('hidden');
      } else {
        card.style.opacity = match ? '1' : '0';
        card.classList.toggle('hidden', !match);
      }
    });
  });
});

// ===== WHATSAPP & INSTAGRAM =====
function openWhatsapp() {
  const msg = encodeURIComponent(WA_MESSAGES[currentLang] || WA_MESSAGES.ar);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}
function openInstagram() {
  window.open(INSTAGRAM_URL, '_blank');
}

// ===== APPLY SETTINGS =====
function applySettingsToPage() {
  if (!_settings) return;
  const prods = _settings.products;
  if (prods) {
    prods.forEach((p, i) => {
      const n = i + 1;
      if (translations.ar) {
        translations.ar[`prod${n}_name`] = p.name_ar || translations.ar[`prod${n}_name`];
        translations.ar[`prod${n}_desc`] = p.desc_ar || translations.ar[`prod${n}_desc`];
        if (p.name_en) translations.en[`prod${n}_name`] = p.name_en;
      }
      const cards = document.querySelectorAll('.product-card');
      if (cards[i] && p.category) cards[i].setAttribute('data-category', p.category);
      if (cards[i] && p.badge) {
        const badgeEl = cards[i].querySelector('.product-badge');
        if (badgeEl) badgeEl.textContent = p.badge;
      }
      if (cards[i] && p.image) {
        const parentDiv = cards[i].querySelector('.product-img');
        if (parentDiv && !parentDiv.querySelector('img.real-img')) {
          const imgEl = document.createElement('img');
          imgEl.src = p.image;
          imgEl.className = 'real-img';
          imgEl.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
          const placeholder = parentDiv.querySelector('.product-placeholder');
          if (placeholder) placeholder.style.display = 'none';
          parentDiv.style.position = 'relative';
          parentDiv.insertBefore(imgEl, parentDiv.firstChild);
        }
      }
    });
  }
  if (_settings.hero) {
    const h = _settings.hero;
    if (h.sub_ar && translations.ar) translations.ar.hero_sub = h.sub_ar;
    if (h.desc_ar && translations.ar) translations.ar.hero_desc = h.desc_ar;
    if (h.btn_ar && translations.ar) translations.ar.hero_btn = h.btn_ar;
  }
}
document.addEventListener('DOMContentLoaded', applySettingsToPage);

// ===== INIT LANGUAGE =====
setLanguage('ar');

// ===== CURSOR HALO (golden glow — lags behind candle cursor) =====
const cursorRing   = document.getElementById('cursorRing');
const cursorRingEl = document.getElementById('cursorRingEl');
let mouseX = 0, mouseY = 0, haloX = 0, haloY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
});
(function animateHalo() {
  haloX += (mouseX - haloX) * 0.08;
  haloY += (mouseY - haloY) * 0.08;
  if (cursorRing) cursorRing.style.transform = `translate(${haloX}px, ${haloY}px)`;
  requestAnimationFrame(animateHalo);
})();

document.querySelectorAll('a, button, .product-card, .filter-btn, .lang-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRingEl?.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRingEl?.classList.remove('hover'));
});

// Hero entrance is handled via CSS keyframes (heroFadeUp / heroFadeIn) — no GSAP needed.

// ===== GSAP SCROLL ANIMATIONS =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

  // Section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el,
      { opacity: 0, y: 28, duration: 1.1, ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // Filter tabs
  gsap.utils.toArray('.filter-tabs').forEach(el => {
    gsap.from(el,
      { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    );
  });

  // Product cards — stagger
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card,
      { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', delay: i * 0.06, clearProps: 'all',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true }
      }
    );
  });

  // Featured section
  gsap.from('.featured-frame',
    { opacity: 0, x: -50, duration: 1.2, ease: 'power3.out', clearProps: 'all',
      scrollTrigger: { trigger: '.featured-frame', start: 'top 80%', once: true }
    }
  );
  gsap.from('.featured-info',
    { opacity: 0, x: 50, duration: 1.2, ease: 'power3.out', clearProps: 'all',
      scrollTrigger: { trigger: '.featured-info', start: 'top 80%', once: true }
    }
  );

  // Testimonials
  gsap.utils.toArray('.testi-card').forEach((card, i) => {
    gsap.from(card,
      { opacity: 0, y: 36, duration: 1, ease: 'power3.out', delay: i * 0.14, clearProps: 'all',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      }
    );
  });

  // Contact
  gsap.utils.toArray('.contact-sub, .contact-buttons').forEach(el => {
    gsap.from(el,
      { opacity: 0, y: 24, duration: 0.9, ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

}

// ===== GSAP HERO PARALLAX (subtle — no opacity) =====
gsap.to('.hero-inner', {
  y: 60,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: '80% top',
    scrub: 2,
  }
});

// ===== SUBTLE LIFT ON PRODUCT CARDS =====
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -6, duration: 0.7, ease: 'power3.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, duration: 0.9, ease: 'power3.out' });
  });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-inquire, .btn-whatsapp, .btn-instagram').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

// ===== STATS COUNTER ANIMATION =====
(function () {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur = 1800;
      const start = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => obs.observe(n));
})();

// ===== STATS SECTION ENTRANCE (GSAP) =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.utils.toArray('.stat-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, y: 28, duration: 0.85, ease: 'power3.out', delay: i * 0.09,
      clearProps: 'all',
      scrollTrigger: { trigger: '.stats-section', start: 'top 80%', once: true }
    });
  });
  gsap.from('.marquee-wrap', {
    opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'all',
    scrollTrigger: { trigger: '.marquee-wrap', start: 'top 90%', once: true }
  });
}

// ===========================
// SHOPPING CART
// ===========================

const PRODUCTS = {
  eclipse: {
    id:'eclipse', name:'Eclipse', world:'Shadow', worldColor:'#b0b0e0', price:185, img:'images/eclipse.avif',
    desc:'من ظلام الهدوء — عطر دخاني يلف المكان بأسرار الليل',
    badge:'غامض',
    colors:[
      {hex:'#0d0d1a',name:'قاتم'},{hex:'#1a1a2e',name:'ليلي'},{hex:'#2e2e4a',name:'غسق'},
      {hex:'#4a3f55',name:'ضباب'},{hex:'#2d1b33',name:'أرجواني'},{hex:'#3d2b4a',name:'ظل'}
    ],
    scents:['عود وعنبر','دخان صندل','مسك شرقي','ياسمين ليلي']
  },
  nocturne: {
    id:'nocturne', name:'Nocturne', world:'Shadow', worldColor:'#b0b0e0', price:175, img:'images/nocturne.avif',
    desc:'لحن الليل الهادئ — تموجات دافئة تسري في ظلام ناعم',
    badge:'غامض',
    colors:[
      {hex:'#1a1530',name:'قمري'},{hex:'#1a1a2e',name:'نجمي'},{hex:'#252540',name:'أزرق داكن'},
      {hex:'#3d3a5c',name:'لافندر ليلي'},{hex:'#2d2240',name:'رماد بنفسجي'},{hex:'#30284a',name:'سديمي'}
    ],
    scents:['ياسمين ليلي','لافندر وفانيليا','مسك شرقي','زهر البرتقال']
  },
  onyx: {
    id:'onyx', name:'Onyx', world:'Obsidian', worldColor:'#C9A84C', price:195, img:'images/onyx.avif',
    desc:'من أعماق البركان — ثقل فاخر وصلابة هادئة',
    badge:'حصري',
    colors:[
      {hex:'#0d0800',name:'عقيق'},{hex:'#1a0a00',name:'بركاني'},{hex:'#2d1a0a',name:'طين'},
      {hex:'#3d1500',name:'دم'},{hex:'#4a2a10',name:'ذهبي محروق'},{hex:'#1a1000',name:'أسود'}
    ],
    scents:['عود وعنبر','تين وعود','دخان صندل','مسك شرقي']
  },
  ember: {
    id:'ember', name:'Ember', world:'Obsidian', worldColor:'#C9A84C', price:190, img:'images/ember.avif',
    desc:'جمر ساكن لا ينطفئ — دفء يغمر المكان بهدوء',
    badge:'حصري',
    colors:[
      {hex:'#2a0f00',name:'بني داكن'},{hex:'#3d1500',name:'جمري'},{hex:'#5c2010',name:'نار'},
      {hex:'#7a3a18',name:'تراب أحمر'},{hex:'#4a1a00',name:'عنبر محروق'},{hex:'#6a2a0a',name:'طوبي'}
    ],
    scents:['عود وعنبر','دخان صندل','توت بري','تين وعود']
  },
  aether: {
    id:'aether', name:'Aether', world:'Vanta', worldColor:'#aa77ff', price:240, img:null,
    desc:'العتمة المطلقة — ما وراء السواد تجد نوراً بنفسجياً خفياً',
    badge:'جريء',
    colors:[
      {hex:'#0d0015',name:'كوني'},{hex:'#1a0033',name:'عميق'},{hex:'#2d0055',name:'بنفسجي'},
      {hex:'#4a1a7a',name:'أرجواني'},{hex:'#1d0040',name:'ليلي بنفسجي'},{hex:'#330066',name:'عنابي'}
    ],
    scents:['مسك شرقي','عود وعنبر','دخان صندل','ياسمين ليلي']
  },
  mirage: {
    id:'mirage', name:'Mirage', world:'Vanta', worldColor:'#aa77ff', price:225, img:'images/mirage.avif',
    desc:'سراب يسحرك — خيال كوني يتراقص في الظلام الأرجواني',
    badge:'جريء',
    colors:[
      {hex:'#1a0033',name:'مجري'},{hex:'#220040',name:'ظلام كوني'},{hex:'#330055',name:'نبتون'},
      {hex:'#4a0080',name:'كريستالي'},{hex:'#3d1a66',name:'سماوي'},{hex:'#0f0020',name:'أسود بنفسجي'}
    ],
    scents:['مسك شرقي','لافندر وفانيليا','ياسمين ليلي','زهر البرتقال']
  },
  aurora: {
    id:'aurora', name:'Aurora', world:'Lumi', worldColor:'#ffd740', price:210, img:'images/aurora.avif',
    desc:'شفق الصباح — ضوء دافئ يملأ المكان بعطر الفجر',
    badge:'مضيء',
    colors:[
      {hex:'#fff8e7',name:'عاجي'},{hex:'#faecd0',name:'قمحي'},{hex:'#f5d5a0',name:'ذهبي فاتح'},
      {hex:'#e8c070',name:'عسلي'},{hex:'#fff3d6',name:'كريمي'},{hex:'#f0ddb0',name:'نيلوفر'}
    ],
    scents:['زهر البرتقال','لافندر وفانيليا','ياسمين ليلي','توت بري']
  },
  solstice: {
    id:'solstice', name:'Solstice', world:'Lumi', worldColor:'#ffd740', price:200, img:null,
    desc:'لحظة الانقلاب — ذروة الضوء حين يقف الزمن',
    badge:'مضيء',
    colors:[
      {hex:'#fff8e7',name:'شمسي'},{hex:'#fdecc8',name:'ليموني'},{hex:'#f8dfa0',name:'برتقالي فاتح'},
      {hex:'#ffe8b0',name:'زعفراني'},{hex:'#fff0d0',name:'وردي فاتح'},{hex:'#f5e6b8',name:'تراب فاتح'}
    ],
    scents:['زهر البرتقال','ياسمين ليلي','توت بري','لافندر وفانيليا']
  },
  reverie: {
    id:'reverie', name:'Reverie', world:'Veil', worldColor:'#90c8ee', price:185, img:null,
    desc:'حلم يقظة — ضباب ناعم يخفي أسرار الفجر الهادئ',
    badge:'ناعم',
    colors:[
      {hex:'#ddeef5',name:'ثلجي'},{hex:'#e8f4f8',name:'ضبابي'},{hex:'#d0e8f0',name:'سماوي فاتح'},
      {hex:'#b8d8e8',name:'نهري'},{hex:'#c8d8e8',name:'رمادي ناعم'},{hex:'#e0ecf5',name:'لؤلؤي'}
    ],
    scents:['لافندر وفانيليا','ياسمين ليلي','زهر البرتقال','توت بري']
  },
  vesper: {
    id:'vesper', name:'Vesper', world:'Veil', worldColor:'#90c8ee', price:180, img:'images/vesper.avif',
    desc:'غسق الوداع — رقة لا تُنسى حين يلتقي النهار بالليل',
    badge:'ناعم',
    colors:[
      {hex:'#e4eef4',name:'رخامي'},{hex:'#e8f4f8',name:'فضي'},{hex:'#cce0ea',name:'رمادي بحري'},
      {hex:'#aaccd8',name:'أزرق حجري'},{hex:'#d8eaf2',name:'زمردي ناعم'},{hex:'#b8ccd8',name:'ضبابي داكن'}
    ],
    scents:['ياسمين ليلي','لافندر وفانيليا','مسك شرقي','زهر البرتقال']
  },
};

let cart = (JSON.parse(localStorage.getItem('konCart') || '[]')).map(item =>
  item.cartKey ? item : { ...item, cartKey: item.id }
);

function saveCart() {
  localStorage.setItem('konCart', JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const total = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = total;
  badge.classList.toggle('show', total > 0);
}

// prod may include { color, colorName, scent } from product page
function addToCart(prod) {
  const cartKey = prod.id + (prod.color ? '-' + prod.color : '') + (prod.scent ? '-' + prod.scent : '');
  const existing = cart.find(i => i.cartKey === cartKey);
  if (existing) { existing.qty++; }
  else { cart.push({ ...prod, qty: 1, cartKey }); }
  saveCart();
  updateCartBadge();
}

function removeFromCart(cartKey) {
  cart = cart.filter(i => i.cartKey !== cartKey);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateQty(cartKey, delta) {
  const item = cart.find(i => i.cartKey === cartKey);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartBadge();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartBadge();
  renderCart();
}

function addToCartFromCard(btn) {
  const card = btn.closest('.product-card');
  if (!card) return;
  const h3 = card.querySelector('h3');
  if (!h3) return;
  const key = h3.textContent.trim().toLowerCase();
  const prod = PRODUCTS[key];
  if (!prod) return;
  addToCart(prod);
  showCartToast(prod.name);
}

function goToProduct(btn) {
  const card = btn.closest('.product-card');
  if (!card) return;
  const h3 = card.querySelector('h3');
  if (h3) window.location = 'product.html?id=' + h3.textContent.trim().toLowerCase();
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');
  if (!body || !foot) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🕯️</div>
        <p>سلّتك فارغة</p>
        <span>اكتشف مجموعاتنا</span>
      </div>`;
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map(item => {
    const imgHtml = item.img
      ? `<img src="${item.img}" alt="${item.name}" class="ci-img">`
      : `<div class="ci-img-placeholder">🕯️</div>`;
    const optLine = [
      item.color ? `<span class="ci-color-dot" style="background:${item.color}"></span>${item.colorName||''}` : '',
      item.scent || ''
    ].filter(Boolean).join(' · ');
    const ck = item.cartKey.replace(/'/g, "\\'");
    return `
      <div class="cart-item">
        ${imgHtml}
        <div class="ci-info">
          <span class="ci-world" style="color:${item.worldColor}">${item.world.toUpperCase()}</span>
          <span class="ci-name">${item.name.toUpperCase()}</span>
          ${optLine ? `<span class="ci-options">${optLine}</span>` : ''}
          <span class="ci-price">₪${item.price * item.qty}</span>
        </div>
        <div class="ci-controls">
          <div class="ci-qty">
            <button onclick="updateQty('${ck}',-1)" aria-label="تقليل">−</button>
            <span class="ci-qty-val">${item.qty}</span>
            <button onclick="updateQty('${ck}',1)" aria-label="زيادة">+</button>
          </div>
          <button class="ci-remove" onclick="removeFromCart('${ck}')">حذف</button>
        </div>
      </div>`;
  }).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 25;
  const total = subtotal + delivery;

  foot.innerHTML = `
    <div class="cart-subtotal">
      <span>المجموع الفرعي</span>
      <span class="cart-subtotal-val">₪${subtotal}</span>
    </div>
    <div class="cart-delivery">
      <span>التوصيل</span>
      <span>₪${delivery}</span>
    </div>
    <div class="cart-total-row">
      <span>الإجمالي</span>
      <span class="cart-total-val">₪${total}</span>
    </div>
    <button class="cart-checkout-btn" onclick="checkoutWhatsapp()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.561 4.145 1.54 5.889L0 24l6.321-1.502A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.928 0-3.736-.5-5.308-1.375L2 22l1.408-4.567A9.965 9.965 0 012 12C2 6.477 6.477 2 12 2s10 5.477 10 10-4.477 10-10 10z"/></svg>
      اطلب عبر واتساب
    </button>
    <button class="cart-clear-btn" onclick="clearCart()">CLEAR CART</button>`;
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer || !overlay) return;
  const isOpen = drawer.classList.contains('open');
  if (!isOpen) {
    renderCart();
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function showCartToast(name) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.textContent = `✦ أُضيف إلى السلة — ${name}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function checkoutWhatsapp() {
  if (cart.length === 0) return;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 25;
  const total = subtotal + delivery;
  const lines = cart.map(i => `• ${i.name} (${i.world}) × ${i.qty}  —  ₪${i.price * i.qty}`).join('\n');
  const msg = `🕯️ *طلب جديد — KON Luxury*\n──────────────────\n${lines}\n──────────────────\n💰 *المجموع: ₪${subtotal}*\n🚚 *التوصيل: ₪${delivery}*\n💎 *الإجمالي: ₪${total}*\n──────────────────\nأرجو التواصل لتأكيد الطلب 🙏`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Inject prices into product cards + init badge on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  document.querySelectorAll('.product-card').forEach(card => {
    const h3 = card.querySelector('h3');
    if (!h3) return;
    const key = h3.textContent.trim().toLowerCase();
    const prod = PRODUCTS[key];
    if (!prod) return;
    const info = card.querySelector('.product-info');
    if (!info || info.querySelector('.product-price-row')) return;
    const row = document.createElement('div');
    row.className = 'product-price-row';
    row.innerHTML = `<span class="product-price">₪${prod.price}</span><span class="product-price-currency">ILS</span>`;
    info.appendChild(row);
  });
});
