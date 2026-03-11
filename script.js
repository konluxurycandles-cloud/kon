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
let WHATSAPP_NUMBER = _settings?.contact?.whatsapp || '9720549210470';
let INSTAGRAM_URL   = _settings?.contact?.instagram || 'https://instagram.com/konluxurycandles';
let DELIVERY        = 25;

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
    stat1: 'عميل سعيد', stat2: 'منتج حصري', stat3: 'صنع يدوي', stat4: 'تقييم العملاء',
    products_title: 'منتجاتنا',
    filter_all: 'الكل',
    inquire_btn: 'استفسر الآن',
    contact_title: 'تواصل معنا', contact_sub: 'نحن هنا للإجابة على كل استفساراتك وتلبية طلباتك',
    btn_whatsapp: 'واتساب', btn_instagram: 'إنستغرام',
    footer_copy: '© 2025 KON Luxury · جميع الحقوق محفوظة',
    // Product descriptions
    eclipse_desc: 'من ظلام الهدوء — عطر دخاني يلف المكان بأسرار الليل',
    onyx_desc:    'من أعماق البركان — ثقل فاخر وصلابة هادئة',
    vanta_desc:   'العتمة المطلقة — ما وراء السواد تجد نوراً خفياً',
    ember_desc:   'جمر ساكن لا ينطفئ — دفء يغمر المكان بهدوء',
    aurora_desc:  'شفق الصباح — ضوء دافئ يملأ المكان بعطر الفجر',
    vesper_desc:  'غسق الوداع — رقة لا تُنسى حين يلتقي النهار بالليل',
    // Badges
    badge_ghamid: 'غامض', badge_hasri: 'حصري', badge_jari: 'جريء',
    badge_dafi: 'دافئ', badge_mudi: 'مضيء', badge_naim: 'ناعم',
    // Buttons
    btn_discover: '✦ اكتشف',
    // Mood section
    mood_title: 'اكتشف مزاجك',
    mood_sub:   'اختر الحالة التي تعبّر عنك — وسنرشدك إلى شمعتك',
    mood_night: 'ظلام هادئ وعميق', mood_warm: 'دفء يملأ المكان',
    mood_calm:  'هدوء ونقاء',      mood_luxury: 'فخامة لا تُنسى',
    // Cart
    cart_title:    'سلّتك',
    cart_empty:    'سلّتك فارغة',
    cart_browse:   'اكتشف مجموعاتنا',
    cart_subtotal: 'المجموع الفرعي',
    cart_delivery: 'التوصيل',
    cart_total:    'الإجمالي',
    cart_remove:   'حذف',
    cart_order_btn:'اطلب عبر واتساب',
  },
  he: {
    nav_home: 'בית', nav_about: 'אודות', nav_products: 'מוצרים', nav_contact: 'צור קשר',
    hero_sub: 'עשוי בתשוקה ובמיומנות',
    hero_desc: 'נרות יוקרתיים · חמישה עולמות · נשמה אחת',
    hero_btn: 'גלה עולמות',
    about_title: 'אודותינו', about_text: 'ב-KON Luxury אנו מאמינים שכל יצירה מספרת סיפור.',
    stat1: 'לקוחות מרוצים', stat2: 'מוצרים ייחודיים', stat3: 'עבודת יד', stat4: 'דירוג לקוחות',
    products_title: 'המוצרים שלנו',
    filter_all: 'הכל',
    inquire_btn: 'לפרטים',
    contact_title: 'צור קשר', contact_sub: 'אנחנו כאן לענות על כל שאלה',
    btn_whatsapp: 'וואטסאפ', btn_instagram: 'אינסטגרם',
    footer_copy: '© 2025 KON Luxury · כל הזכויות שמורות',
    // Product descriptions
    eclipse_desc: 'מחשכת השקט — ניחוח מעושן אוחז את המקום בסודות הלילה',
    onyx_desc:    'מעומקי הוולקן — כובד מפואר ומוצקות שקטה',
    vanta_desc:   'החשכה המוחלטת — מעבר לשחור תמצא אור נסתר',
    ember_desc:   'גחלת שקטה שאינה כבה — חמימות עוטפת את המקום בשלווה',
    aurora_desc:  'שחר האור — אור חם ממלא את המקום בניחוח הבוקר',
    vesper_desc:  'דמדומי פרידה — עדינות בלתי נשכחת כשהיום פוגש הלילה',
    // Badges
    badge_ghamid: 'מסתורי', badge_hasri: 'בלעדי', badge_jari: 'נועז',
    badge_dafi: 'חם', badge_mudi: 'זוהר', badge_naim: 'עדין',
    // Buttons
    btn_discover: '✦ גלה',
    // Mood section
    mood_title: 'גלה את מצב הרוח שלך',
    mood_sub:   'בחר את המצב שמבטא אותך — ונוביל אותך לנר שלך',
    mood_night: 'חשכה שקטה ועמוקה', mood_warm: 'חמימות ממלאת את המקום',
    mood_calm:  'שקט וטוהר',         mood_luxury: 'רגע יוקרה בלתי נשכח',
    // Cart
    cart_title:    'הסל שלך',
    cart_empty:    'הסל שלך ריק',
    cart_browse:   'גלה את הקולקציה שלנו',
    cart_subtotal: 'סכום ביניים',
    cart_delivery: 'משלוח',
    cart_total:    'סה״כ',
    cart_remove:   'הסר',
    cart_order_btn:'הזמן דרך וואטסאפ',
  },
  en: {
    nav_home: 'Home', nav_about: 'About', nav_products: 'Products', nav_contact: 'Contact',
    hero_sub: 'Crafted with passion & precision',
    hero_desc: 'Luxury Candles · Five Worlds · One Soul',
    hero_btn: 'Explore Worlds',
    about_title: 'About Us', about_text: 'At KON Luxury, we believe every piece tells a story.',
    stat1: 'Happy Clients', stat2: 'Exclusive Products', stat3: 'Handmade', stat4: 'Customer Rating',
    products_title: 'Our Products',
    filter_all: 'All',
    inquire_btn: 'Inquire Now',
    contact_title: 'Contact Us', contact_sub: 'We are here to answer all your questions',
    btn_whatsapp: 'WhatsApp', btn_instagram: 'Instagram',
    footer_copy: '© 2025 KON Luxury · All Rights Reserved',
    // Product descriptions
    eclipse_desc: 'From the silence of darkness — a smoky scent wrapping the room in night secrets',
    onyx_desc:    'From the depths of the volcano — luxurious weight and quiet solidity',
    vanta_desc:   'Absolute darkness — beyond black, a hidden light awaits',
    ember_desc:   'A quiet ember that never fades — warmth enveloping the room in peace',
    aurora_desc:  'Morning light — warm radiance filling the room with dawn\'s fragrance',
    vesper_desc:  'Farewell dusk — unforgettable softness as day meets night',
    // Badges
    badge_ghamid: 'Mysterious', badge_hasri: 'Exclusive', badge_jari: 'Bold',
    badge_dafi: 'Warm', badge_mudi: 'Luminous', badge_naim: 'Soft',
    // Buttons
    btn_discover: '✦ Discover',
    // Mood section
    mood_title: 'Discover Your Mood',
    mood_sub:   'Choose the mood that speaks to you — we\'ll guide you to your candle',
    mood_night: 'Quiet and deep darkness', mood_warm: 'Warmth filling the space',
    mood_calm:  'Serenity and purity',     mood_luxury: 'An unforgettable luxury moment',
    // Cart
    cart_title:    'Your Cart',
    cart_empty:    'Your cart is empty',
    cart_browse:   'Explore our collection',
    cart_subtotal: 'Subtotal',
    cart_delivery: 'Delivery',
    cart_total:    'Total',
    cart_remove:   'Remove',
    cart_order_btn:'Order via WhatsApp',
  }
};

let currentLang = 'ar';

// Quick translation helper — t('key') → string in currentLang
function t(key) {
  return (translations[currentLang] || translations.ar)[key] || key;
}

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
  // Re-render cart if it's open so labels update immediately
  const cartDrawer = document.getElementById('cartDrawer');
  if (cartDrawer && cartDrawer.classList.contains('open')) renderCart();
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

// ── Product Catalogue (6 candles) ──
const PRODUCTS = {
  eclipse: { id:'eclipse', name:'Eclipse', waxShade:'Black',       waxHex:'#1a1a1a', img:'images/eclipse.avif', desc:'من ظلام الهدوء — عطر دخاني يلف المكان بأسرار الليل', badge:'غامض', badgeKey:'badge_ghamid' },
  onyx:    { id:'onyx',    name:'Onyx',    waxShade:'Deep Black',  waxHex:'#0d0d0d', img:'images/onyx.avif',    desc:'من أعماق البركان — ثقل فاخر وصلابة هادئة',           badge:'حصري', badgeKey:'badge_hasri'  },
  vanta:   { id:'vanta',   name:'Vanta',   waxShade:'Matte Black', waxHex:'#111111', img:null,                  desc:'العتمة المطلقة — ما وراء السواد تجد نوراً خفياً',    badge:'جريء', badgeKey:'badge_jari'   },
  ember:   { id:'ember',   name:'Ember',   waxShade:'Amber',       waxHex:'#c87941', img:'images/ember.avif',   desc:'جمر ساكن لا ينطفئ — دفء يغمر المكان بهدوء',          badge:'دافئ', badgeKey:'badge_dafi'   },
  aurora:  { id:'aurora',  name:'Aurora',  waxShade:'Ivory',       waxHex:'#f5f0e8', img:'images/aurora.avif',  desc:'شفق الصباح — ضوء دافئ يملأ المكان بعطر الفجر',        badge:'مضيء', badgeKey:'badge_mudi'   },
  vesper:  { id:'vesper',  name:'Vesper',  waxShade:'Cream',       waxHex:'#ede8d8', img:'images/vesper.avif',  desc:'غسق الوداع — رقة لا تُنسى حين يلتقي النهار بالليل',   badge:'ناعم', badgeKey:'badge_naim'   },
  // ← legacy alias kept so old product.html URLs still resolve:
  nocturne:{id:'nocturne',name:'Eclipse',waxShade:'Black',waxHex:'#1a1a1a',img:'images/eclipse.avif',desc:'من ظلام الهدوء — عطر دخاني يلف المكان بأسرار الليل',badge:'غامض',badgeKey:'badge_ghamid'},
};

// ── Burn Sizes ──
const BURN_SIZES = [
  { label:'250g',  price:90  },
  { label:'500g',  price:150 },
  { label:'1000g', price:240 },
];

// ── Fragrance Moods ──
const FRAGRANCE_MOODS = [
  { id:'vanilla',    label:'Vanilla',    labelAr:'فانيليا', icon:'🌸' },
  { id:'oud',        label:'Oud',        labelAr:'عود',     icon:'🪵' },
  { id:'musk',       label:'Musk',       labelAr:'مسك',     icon:'🌫️' },
  { id:'amber',      label:'Amber',      labelAr:'عنبر',    icon:'🟠' },
  { id:'sandalwood', label:'Sandalwood', labelAr:'صندل',    icon:'🌿' },
];


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

// prod may include { burnSize, fragrance } from product page
function addToCart(prod) {
  const cartKey = prod.id + '-' + (prod.burnSize||'') + '-' + (prod.fragrance||'');
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

// ── Discover Your Mood ──
function filterMood(btn, ...productIds) {
  // Highlight active mood card
  document.querySelectorAll('.mood-card').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  // Show/hide product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const h3 = card.querySelector('h3');
    if (!h3) return;
    const id = h3.textContent.trim().toLowerCase();
    const match = productIds.includes(id);
    card.style.opacity    = match ? '1' : '0.25';
    card.style.transform  = match ? 'scale(1)' : 'scale(0.96)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
  // Smooth scroll to products
  const sec = document.getElementById('products');
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addToCartFromCard(btn) {
  // Send to product page to choose Burn Size + Fragrance Mood first
  const card = btn.closest('.product-card');
  if (!card) return;
  const h3 = card.querySelector('h3');
  if (h3) window.location = 'product.html?id=' + h3.textContent.trim().toLowerCase();
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
        <p>${t('cart_empty')}</p>
        <span>${t('cart_browse')}</span>
      </div>`;
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map(item => {
    const imgHtml = item.img
      ? `<img src="${item.img}" alt="${item.name}" class="ci-img">`
      : `<div class="ci-img-placeholder">🕯️</div>`;
    const optLine = [item.burnSize||'', item.fragrance||''].filter(Boolean).join(' · ');
    const ck = item.cartKey.replace(/'/g, "\\'");
    return `
      <div class="cart-item">
        ${imgHtml}
        <div class="ci-info">
          <span class="ci-name">${item.name.toUpperCase()}</span>
          <span class="ci-options" style="color:rgba(201,168,76,0.55);font-size:0.68rem">Wax: ${item.waxShade||''}</span>
          ${optLine ? `<span class="ci-options">${optLine}</span>` : ''}
          <span class="ci-price">₪${item.price * item.qty}</span>
        </div>
        <div class="ci-controls">
          <div class="ci-qty">
            <button onclick="updateQty('${ck}',-1)" aria-label="تقليل">−</button>
            <span class="ci-qty-val">${item.qty}</span>
            <button onclick="updateQty('${ck}',1)" aria-label="زيادة">+</button>
          </div>
          <button class="ci-remove" onclick="removeFromCart('${ck}')">${t('cart_remove')}</button>
        </div>
      </div>`;
  }).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = DELIVERY;
  const total = subtotal + delivery;

  foot.innerHTML = `
    <div class="cart-subtotal">
      <span>${t('cart_subtotal')}</span>
      <span class="cart-subtotal-val">₪${subtotal}</span>
    </div>
    <div class="cart-delivery">
      <span>${t('cart_delivery')}</span>
      <span>₪${delivery}</span>
    </div>
    <div class="cart-total-row">
      <span>${t('cart_total')}</span>
      <span class="cart-total-val">₪${total}</span>
    </div>
    <button class="cart-checkout-btn" onclick="checkoutWhatsapp()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.561 4.145 1.54 5.889L0 24l6.321-1.502A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.928 0-3.736-.5-5.308-1.375L2 22l1.408-4.567A9.965 9.965 0 012 12C2 6.477 6.477 2 12 2s10 5.477 10 10-4.477 10-10 10z"/></svg>
      ${t('cart_order_btn')}
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
  const delivery = DELIVERY;
  const total = subtotal + delivery;
  const lines = cart.map(i => `• ${i.name} — ${i.burnSize||''} · ${i.fragrance||''} × ${i.qty}  ₪${i.price * i.qty}`).join('\n');
  const msg = `🕯️ *طلب جديد — KON Luxury*\n──────────────────\n${lines}\n──────────────────\n💰 *المجموع: ₪${subtotal}*\n🚚 *التوصيل: ₪${delivery}*\n💎 *الإجمالي: ₪${total}*\n──────────────────\nأرجو التواصل لتأكيد الطلب 🙏`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ===== LOAD DATA.JSON (admin edits applied to all visitors) =====
async function loadDataJson() {
  try {
    const res = await fetch('data.json?v=' + Date.now());
    if (!res.ok) return;
    const data = await res.json();

    // Merge products
    if (data.products) {
      Object.entries(data.products).forEach(([id, p]) => {
        if (!PRODUCTS[id]) return;
        const descKey = id + '_desc';
        if (p.desc)     { PRODUCTS[id].desc = p.desc; translations.ar[descKey] = p.desc; }
        if (p.badge)    { PRODUCTS[id].badge = p.badge; translations.ar[PRODUCTS[id].badgeKey] = p.badge; }
        if (p.waxShade) PRODUCTS[id].waxShade = p.waxShade;
        if (p.waxHex)   PRODUCTS[id].waxHex = p.waxHex;
        if (p.img)      PRODUCTS[id].img = p.img;
      });
    }

    // Merge burn sizes
    if (data.burnSizes) {
      data.burnSizes.forEach((bs, i) => {
        if (BURN_SIZES[i]) BURN_SIZES[i].price = bs.price;
      });
    }

    // Delivery
    if (data.delivery !== undefined) DELIVERY = data.delivery;

    // Contact config
    if (data.config) {
      if (data.config.whatsapp) WHATSAPP_NUMBER = data.config.whatsapp;
      if (data.config.instagram) INSTAGRAM_URL = data.config.instagram;
    }

    // Re-apply current language so updated translations render
    setLanguage(currentLang);

    // Update product card images + prices in DOM
    document.querySelectorAll('.product-card').forEach(card => {
      const h3 = card.querySelector('h3');
      if (!h3) return;
      const key = h3.textContent.trim().toLowerCase();
      const prod = PRODUCTS[key];
      if (!prod) return;
      // Update image src
      if (prod.img) {
        const imgEl = card.querySelector('img.product-real-img');
        if (imgEl) imgEl.src = prod.img;
      }
      // Update price label
      const priceEl = card.querySelector('.product-price');
      if (priceEl) priceEl.textContent = `من ₪${BURN_SIZES[0].price}`;
    });

  } catch(e) {
    // data.json not found or parse error — use hardcoded defaults silently
  }
}

// Inject prices into product cards + init badge on load
document.addEventListener('DOMContentLoaded', async () => {
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
    row.innerHTML = `<span class="product-price">من ₪${BURN_SIZES[0].price}</span><span class="product-price-currency">ILS</span>`;
    info.appendChild(row);
  });
  // Load admin edits from data.json (overwrites defaults if changed via admin panel)
  await loadDataJson();
});
