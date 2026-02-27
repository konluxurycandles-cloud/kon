// ===========================
// KON LUXURY - JavaScript v3
// Lenis smooth scroll + GSAP
// ===========================

// ===== CANDLE INTRO =====
(function() {
  const intro     = document.getElementById('candleIntro');
  const flame     = document.getElementById('flameWrap');
  const explosion = document.getElementById('ciExplosion');
  const hint      = document.getElementById('ciHint');
  if (!intro) return;

  let fired = false;

  setTimeout(() => {
    flame.classList.add('lit');
    hint.textContent = '— اضغط لتدخل —';
  }, 1800);

  function triggerExplosion() {
    if (fired) return;
    fired = true;
    explosion.classList.add('boom');
    setTimeout(() => { intro.classList.add('hidden'); }, 900);
  }

  intro.addEventListener('click', triggerExplosion);
  setTimeout(triggerExplosion, 2500);
})();

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
    hero_desc: 'شموع فاخرة · ريزن يدوي · فخار أصيل',
    hero_btn: 'استعرض المنتجات',
    about_title: 'من نحن',
    about_text: 'في KON Luxury نؤمن أن كل قطعة تحكي قصة.',
    stat1: 'عميل سعيد', stat2: 'أنواع منتجات', stat3: 'يدوي الصنع',
    products_title: 'منتجاتنا',
    filter_all: 'الكل', filter_candles: 'الشموع', filter_resin: 'ريزن', filter_pottery: 'الفخار',
    inquire_btn: 'استفسر الآن',
    prod1_name: 'شمعة فاخرة كلاسيكية', prod1_desc: 'شمعة يدوية بعطور راقية تملأ المكان برائحة دافئة مميزة',
    prod2_name: 'شمعة ديكور فخمة',     prod2_desc: 'تصميم أنيق يناسب ديكور البيت الراقي والهدايا الفاخرة',
    prod3_name: 'لوحة ريزن فنية',       prod3_desc: 'لوحة فنية مصنوعة يدوياً من الريزن بتشكيلات ذهبية فريدة',
    prod4_name: 'إكسسوار إيبوكسي',      prod4_desc: 'قطع ديكورية وإكسسوارات من الإيبوكسي بألوان وأشكال مبتكرة',
    prod5_name: 'إناء فخار أصيل',        prod5_desc: 'فخار يدوي بلمسات تقليدية وحديثة يزين أي ركن في منزلك',
    prod6_name: 'مجموعة فخار فاخرة',    prod6_desc: 'مجموعة متناسقة من الفخار اليدوي لأناقة لا مثيل لها',
    badge_handmade: 'يدوي الصنع', badge_luxury: 'فاخر', badge_unique: 'تحفة فريدة', badge_artisan: 'حرفة أصيلة',
    contact_title: 'تواصل معنا', contact_sub: 'نحن هنا للإجابة على كل استفساراتك وتلبية طلباتك',
    btn_whatsapp: 'واتساب', btn_instagram: 'إنستغرام',
    footer_copy: '© 2025 KON Luxury · جميع الحقوق محفوظة',
  },
  he: {
    nav_home: 'בית', nav_about: 'אודות', nav_products: 'מוצרים', nav_contact: 'צור קשר',
    hero_sub: 'עשוי בתשוקה ובמיומנות',
    hero_desc: 'נרות יוקרתיים · שרף בעבודת יד · קרמיקה מקורית',
    hero_btn: 'גלה מוצרים',
    about_title: 'אודותינו', about_text: 'ב-KON Luxury אנו מאמינים שכל יצירה מספרת סיפור.',
    stat1: 'לקוחות מרוצים', stat2: 'קטגוריות מוצרים', stat3: 'עבודת יד',
    products_title: 'המוצרים שלנו',
    filter_all: 'הכל', filter_candles: 'נרות', filter_resin: 'שרף', filter_pottery: 'קרמיקה',
    inquire_btn: 'לפרטים',
    prod1_name: 'נר קלאסי יוקרתי',   prod1_desc: 'נר בעבודת יד עם בושם עדין שממלא את החדר בריח חמים',
    prod2_name: 'נר דקורטיבי מפואר', prod2_desc: 'עיצוב אלגנטי המתאים לדקור הבית היוקרתי',
    prod3_name: 'ציור שרף אמנותי',    prod3_desc: 'לוח אמנות עשוי בעבודת יד משרף עם עיצובים זהב',
    prod4_name: 'אביזר אפוקסי',       prod4_desc: 'פריטי דקור ואביזרים מאפוקסי בצבעים וצורות מקוריות',
    prod5_name: 'כד קרמיקה מקורי',   prod5_desc: 'קרמיקה בעבודת יד עם נגיעות מסורתיות ומודרניות',
    prod6_name: 'סט קרמיקה יוקרתי',  prod6_desc: 'קולקציה מתואמת של קרמיקה בעבודת יד',
    badge_handmade: 'עבודת יד', badge_luxury: 'יוקרה', badge_unique: 'יצירה ייחודית', badge_artisan: 'אומנות',
    contact_title: 'צור קשר', contact_sub: 'אנחנו כאן לענות על כל שאלה',
    btn_whatsapp: 'וואטסאפ', btn_instagram: 'אינסטגרם',
    footer_copy: '© 2025 KON Luxury · כל הזכויות שמורות',
  },
  en: {
    nav_home: 'Home', nav_about: 'About', nav_products: 'Products', nav_contact: 'Contact',
    hero_sub: 'Crafted with passion & precision',
    hero_desc: 'Luxury Candles · Handmade Resin · Authentic Pottery',
    hero_btn: 'Explore Products',
    about_title: 'About Us', about_text: 'At KON Luxury, we believe every piece tells a story.',
    stat1: 'Happy Clients', stat2: 'Product Types', stat3: 'Handmade',
    products_title: 'Our Products',
    filter_all: 'All', filter_candles: 'Candles', filter_resin: 'Resin', filter_pottery: 'Pottery',
    inquire_btn: 'Inquire Now',
    prod1_name: 'Classic Luxury Candle',    prod1_desc: 'Handcrafted candle with premium fragrances',
    prod2_name: 'Decorative Luxury Candle', prod2_desc: 'Elegant design for luxury home decor',
    prod3_name: 'Artistic Resin Panel',     prod3_desc: 'Handmade art piece with unique gold formations',
    prod4_name: 'Epoxy Accessory',          prod4_desc: 'Decorative pieces made from epoxy',
    prod5_name: 'Authentic Pottery Vase',   prod5_desc: 'Handmade pottery with traditional touches',
    prod6_name: 'Luxury Pottery Set',       prod6_desc: 'A coordinated collection of handmade pottery',
    badge_handmade: 'Handmade', badge_luxury: 'Luxury', badge_unique: 'One of a Kind', badge_artisan: 'Artisan Craft',
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

// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.9,
});

// Hook Lenis into GSAP ScrollTrigger (single RAF via GSAP ticker)
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
lenis.on('scroll', ({ scroll }) => {
  navbar.classList.toggle('scrolled', scroll > 50);
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
lenis.on('scroll', ({ scroll }) => {
  let current = '';
  sections.forEach(sec => {
    if (scroll >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active-nav', link.getAttribute('href') === `#${current}`);
  });
});

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
      gsap.to(card, {
        opacity: match ? 1 : 0,
        scale: match ? 1 : 0.95,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => card.classList.toggle('hidden', !match),
      });
      if (match) card.classList.remove('hidden');
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

// ===== CUSTOM CURSOR =====
const cursorDot    = document.getElementById('cursorDot');
const cursorRing   = document.getElementById('cursorRing');
const cursorRingEl = document.getElementById('cursorRingEl');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursorDot) cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});
(function animateRing() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  if (cursorRing) cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .product-card, .filter-btn, .lang-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRingEl?.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRingEl?.classList.remove('hover'));
});

// ===== GSAP HERO CINEMATIC ENTRANCE =====
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;
  const tl = gsap.timeline({ delay: 0.2 });

  // 1. Candle rises from below — slow, cinematic
  tl.from('#heroCandle',
    { opacity: 0, y: 50, duration: 2.0, ease: 'power3.out', clearProps: 'all' }
  )
  // 2. Text slides in — overlapping
  .from('#heroText',
    { opacity: 0, y: 30, duration: 1.6, ease: 'power3.out', clearProps: 'all' },
    '-=1.2'
  )
  // 3. Scroll indicator fades last
  .from('.hero-scroll',
    { opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'opacity' },
    '-=0.6'
  );
});

// ===== GSAP SCROLL ANIMATIONS =====
// Section headers
gsap.utils.toArray('.section-header').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    }
  );
});

// Filter tabs
gsap.utils.toArray('.filter-tabs').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    }
  );
});

// Product cards — stagger
gsap.utils.toArray('.product-card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.06,
      scrollTrigger: { trigger: card, start: 'top 92%', once: true }
    }
  );
});

// Featured section
gsap.fromTo('.featured-frame',
  { opacity: 0, x: -50 },
  { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.featured-frame', start: 'top 80%', once: true }
  }
);
gsap.fromTo('.featured-info',
  { opacity: 0, x: 50 },
  { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.featured-info', start: 'top 80%', once: true }
  }
);

// Testimonials
gsap.utils.toArray('.testi-card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: i * 0.14,
      scrollTrigger: { trigger: card, start: 'top 88%', once: true }
    }
  );
});

// Contact
gsap.utils.toArray('.contact-sub, .contact-buttons').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    }
  );
});

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
