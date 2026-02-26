// ===========================
// KON LUXURY - JavaScript
// ===========================

// ===== CANDLE INTRO =====
(function() {
  const intro    = document.getElementById('candleIntro');
  const flame    = document.getElementById('flameWrap');
  const explosion = document.getElementById('ciExplosion');
  const hint     = document.getElementById('ciHint');
  if (!intro) return;

  let fired = false;

  // Step 1: Light the candle after 1.8s automatically
  setTimeout(() => {
    flame.classList.add('lit');
    hint.textContent = '— اضغط لتدخل —';
  }, 1800);

  // Step 2: Click or auto-close after 5s
  function triggerExplosion() {
    if (fired) return;
    fired = true;

    // Explosion animation
    explosion.classList.add('boom');

    // Hide intro after explosion
    setTimeout(() => {
      intro.classList.add('hidden');
    }, 900);
  }

  intro.addEventListener('click', triggerExplosion);

  // Auto close after 5 seconds
  setTimeout(triggerExplosion, 5000);
})();

// ===== LOAD SETTINGS FROM CONTROL PANEL =====
const _saved = localStorage.getItem('konluxury_settings');
const _settings = _saved ? JSON.parse(_saved) : null;

// ===== CONTACT INFO =====
const WHATSAPP_NUMBER = _settings?.contact?.whatsapp || '9720549210470';
const INSTAGRAM_URL   = _settings?.contact?.instagram || 'https://instagram.com/konluxurycandles';

// ===== WHATSAPP MESSAGES =====
const WA_MESSAGES = {
  ar: _settings?.contact?.wa_ar || 'مرحباً، أود الاستفسار عن منتجاتكم في KON Luxury',
  he: _settings?.contact?.wa_he || 'שלום, אשמח לקבל מידע על המוצרים שלכם ב-KON Luxury',
  en: _settings?.contact?.wa_en || 'Hello, I would like to inquire about your products at KON Luxury',
};

// ===========================

// ===== TRANSLATIONS =====
const translations = {
  ar: {
    nav_home: 'الرئيسية',
    nav_about: 'من نحن',
    nav_products: 'منتجاتنا',
    nav_contact: 'تواصل معنا',
    hero_sub: 'مصنوع بشغف واتقان',
    hero_desc: 'شموع فاخرة · ريزن يدوي · فخار أصيل',
    hero_btn: 'استعرض المنتجات',
    about_title: 'من نحن',
    about_text: 'في KON Luxury نؤمن أن كل قطعة تحكي قصة. نصنع شموعنا وإبداعاتنا الريزن وفخارنا بأيدينا بعشق واتقان، لتُضيف لمسة من الجمال والفخامة لحياتكم.',
    stat1: 'عميل سعيد',
    stat2: 'أنواع منتجات',
    stat3: 'يدوي الصنع',
    products_title: 'منتجاتنا',
    filter_all: 'الكل',
    filter_candles: 'الشموع',
    filter_resin: 'ريزن',
    filter_pottery: 'الفخار',
    inquire_btn: 'استفسر الآن',
    prod1_name: 'شمعة فاخرة كلاسيكية',
    prod1_desc: 'شمعة يدوية بعطور راقية تملأ المكان برائحة دافئة مميزة',
    prod2_name: 'شمعة ديكور فخمة',
    prod2_desc: 'تصميم أنيق يناسب ديكور البيت الراقي والهدايا الفاخرة',
    prod3_name: 'لوحة ريزن فنية',
    prod3_desc: 'لوحة فنية مصنوعة يدوياً من الريزن بتشكيلات ذهبية فريدة',
    prod4_name: 'إكسسوار إيبوكسي',
    prod4_desc: 'قطع ديكورية وإكسسوارات من الإيبوكسي بألوان وأشكال مبتكرة',
    prod5_name: 'إناء فخار أصيل',
    prod5_desc: 'فخار يدوي بلمسات تقليدية وحديثة يزين أي ركن في منزلك',
    prod6_name: 'مجموعة فخار فاخرة',
    prod6_desc: 'مجموعة متناسقة من الفخار اليدوي لأناقة لا مثيل لها',
    badge_handmade: 'يدوي الصنع',
    badge_luxury: 'فاخر',
    badge_unique: 'تحفة فريدة',
    badge_artisan: 'حرفة أصيلة',
    contact_title: 'تواصل معنا',
    contact_sub: 'نحن هنا للإجابة على كل استفساراتك وتلبية طلباتك',
    btn_whatsapp: 'واتساب',
    btn_instagram: 'إنستغرام',
    footer_copy: '© 2025 KON Luxury · جميع الحقوق محفوظة',
  },
  he: {
    nav_home: 'בית',
    nav_about: 'אודות',
    nav_products: 'מוצרים',
    nav_contact: 'צור קשר',
    hero_sub: 'עשוי בתשוקה ובמיומנות',
    hero_desc: 'נרות יוקרתיים · שרף בעבודת יד · קרמיקה מקורית',
    hero_btn: 'גלה מוצרים',
    about_title: 'אודותינו',
    about_text: 'ב-KON Luxury אנו מאמינים שכל יצירה מספרת סיפור. אנחנו מייצרים את הנרות, יצירות הרזין והקרמיקה שלנו בידיים עם אהבה ומיומנות, כדי להוסיף נגיעה של יופי ויוקרה לחייכם.',
    stat1: 'לקוחות מרוצים',
    stat2: 'קטגוריות מוצרים',
    stat3: 'עבודת יד',
    products_title: 'המוצרים שלנו',
    filter_all: 'הכל',
    filter_candles: 'נרות',
    filter_resin: 'שרף',
    filter_pottery: 'קרמיקה',
    inquire_btn: 'לפרטים',
    prod1_name: 'נר קלאסי יוקרתי',
    prod1_desc: 'נר בעבודת יד עם בושם עדין שממלא את החדר בריח חמים וייחודי',
    prod2_name: 'נר דקורטיבי מפואר',
    prod2_desc: 'עיצוב אלגנטי המתאים לדקור הבית היוקרתי ולמתנות מיוחדות',
    prod3_name: 'ציור שרף אמנותי',
    prod3_desc: 'לוח אמנות עשוי בעבודת יד משרף עם עיצובים זהב ייחודיים',
    prod4_name: 'אביזר אפוקסי',
    prod4_desc: 'פריטי דקור ואביזרים מאפוקסי בצבעים וצורות מקוריות',
    prod5_name: 'כד קרמיקה מקורי',
    prod5_desc: 'קרמיקה בעבודת יד עם נגיעות מסורתיות ומודרניות לעיטור הבית',
    prod6_name: 'סט קרמיקה יוקרתי',
    prod6_desc: 'קולקציה מתואמת של קרמיקה בעבודת יד לאלגנטיות ייחודית',
    badge_handmade: 'עבודת יד',
    badge_luxury: 'יוקרה',
    badge_unique: 'יצירה ייחודית',
    badge_artisan: 'אומנות',
    contact_title: 'צור קשר',
    contact_sub: 'אנחנו כאן לענות על כל שאלה ולמלא את בקשותיכם',
    btn_whatsapp: 'וואטסאפ',
    btn_instagram: 'אינסטגרם',
    footer_copy: '© 2025 KON Luxury · כל הזכויות שמורות',
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_products: 'Products',
    nav_contact: 'Contact',
    hero_sub: 'Crafted with passion & precision',
    hero_desc: 'Luxury Candles · Handmade Resin · Authentic Pottery',
    hero_btn: 'Explore Products',
    about_title: 'About Us',
    about_text: 'At KON Luxury, we believe every piece tells a story. We handcraft our candles, resin creations, and pottery with love and dedication, adding a touch of beauty and luxury to your life.',
    stat1: 'Happy Clients',
    stat2: 'Product Types',
    stat3: 'Handmade',
    products_title: 'Our Products',
    filter_all: 'All',
    filter_candles: 'Candles',
    filter_resin: 'Resin',
    filter_pottery: 'Pottery',
    inquire_btn: 'Inquire Now',
    prod1_name: 'Classic Luxury Candle',
    prod1_desc: 'Handcrafted candle with premium fragrances that fill your space with warmth',
    prod2_name: 'Decorative Luxury Candle',
    prod2_desc: 'Elegant design perfect for luxury home decor and special gifts',
    prod3_name: 'Artistic Resin Panel',
    prod3_desc: 'Handmade art piece crafted from resin with unique gold formations',
    prod4_name: 'Epoxy Accessory',
    prod4_desc: 'Decorative pieces and accessories made from epoxy in innovative shapes',
    prod5_name: 'Authentic Pottery Vase',
    prod5_desc: 'Handmade pottery with traditional and modern touches to adorn your home',
    prod6_name: 'Luxury Pottery Set',
    prod6_desc: 'A coordinated collection of handmade pottery for unmatched elegance',
    badge_handmade: 'Handmade',
    badge_luxury: 'Luxury',
    badge_unique: 'One of a Kind',
    badge_artisan: 'Artisan Craft',
    contact_title: 'Contact Us',
    contact_sub: 'We are here to answer all your questions and fulfill your requests',
    btn_whatsapp: 'WhatsApp',
    btn_instagram: 'Instagram',
    footer_copy: '© 2025 KON Luxury · All Rights Reserved',
  }
};

// ===== CURRENT LANG =====
let currentLang = 'ar';

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  const isRTL = (lang === 'ar' || lang === 'he');

  // Set direction
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  document.body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  // Update all text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update mobile nav direction
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.style.left = '';
    navLinks.style.right = '';
  }
}

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== LANG BUTTONS =====
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.getAttribute('data-lang'));
  });
});

// ===== PRODUCT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    productCards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => {
        if (match) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      }, 200);
    });
  });
});

// Add transition to product cards
productCards.forEach(card => {
  card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, border-color 0.35s ease, box-shadow 0.35s ease';
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.about, .products, .contact, .product-card, .stat-item');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== WHATSAPP & INSTAGRAM =====
function openWhatsapp() {
  const msg = encodeURIComponent(WA_MESSAGES[currentLang] || WA_MESSAGES.ar);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function openInstagram() {
  window.open(INSTAGRAM_URL, '_blank');
}

// ===== APPLY SETTINGS FROM CONTROL PANEL =====
function applySettingsToPage() {
  if (!_settings) return;

  // Apply product names/descriptions
  const prods = _settings.products;
  if (prods) {
    prods.forEach((p, i) => {
      const n = i + 1;
      // Update translations object
      if (translations.ar) {
        translations.ar[`prod${n}_name`] = p.name_ar || translations.ar[`prod${n}_name`];
        translations.ar[`prod${n}_desc`] = p.desc_ar || translations.ar[`prod${n}_desc`];
        if (p.name_en) translations.en[`prod${n}_name`] = p.name_en;
      }
      // Update category on card
      const cards = document.querySelectorAll('.product-card');
      if (cards[i] && p.category) cards[i].setAttribute('data-category', p.category);
      // Update badge text
      if (cards[i] && p.badge) {
        const badgeEl = cards[i].querySelector('.product-badge');
        if (badgeEl) badgeEl.textContent = p.badge;
      }
      // Update image
      if (cards[i] && p.image) {
        const imgArea = cards[i].querySelector('.product-placeholder, .product-img img');
        if (imgArea) {
          const parentDiv = cards[i].querySelector('.product-img');
          if (parentDiv) {
            const existingImg = parentDiv.querySelector('img.real-img');
            if (!existingImg) {
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
        }
      }
    });
  }

  // Apply hero texts
  if (_settings.hero) {
    const h = _settings.hero;
    if (translations.ar) {
      if (h.sub_ar) translations.ar.hero_sub = h.sub_ar;
      if (h.desc_ar) translations.ar.hero_desc = h.desc_ar;
      if (h.btn_ar) translations.ar.hero_btn = h.btn_ar;
    }
    if (translations.he) {
      if (h.sub_he) translations.he.hero_sub = h.sub_he;
      if (h.desc_he) translations.he.hero_desc = h.desc_he;
    }
    if (translations.en) {
      if (h.sub_en) translations.en.hero_sub = h.sub_en;
      if (h.desc_en) translations.en.hero_desc = h.desc_en;
    }
  }

  // Apply about texts
  if (_settings.texts) {
    const t = _settings.texts;
    if (translations.ar) {
      if (t.about_ar) translations.ar.about_text = t.about_ar;
      if (t.stat1_ar) translations.ar.stat1 = t.stat1_ar;
      if (t.stat2_ar) translations.ar.stat2 = t.stat2_ar;
      if (t.stat3_ar) translations.ar.stat3 = t.stat3_ar;
    }
    if (translations.he && t.about_he) translations.he.about_text = t.about_he;
    if (translations.en && t.about_en) translations.en.about_text = t.about_en;

    // Update stat numbers
    const statNums = document.querySelectorAll('.stat-num');
    if (statNums[0] && t.stat1_num) statNums[0].textContent = t.stat1_num + '+';
    if (statNums[1] && t.stat2_num) statNums[1].textContent = t.stat2_num;
    if (statNums[2] && t.stat3_num) statNums[2].textContent = t.stat3_num + '%';
  }
}

// Run settings after DOM ready
document.addEventListener('DOMContentLoaded', applySettingsToPage);

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-nav');
    }
  });
});

// ===== INIT =====
setLanguage('ar');

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1200);
});

// ===== CUSTOM CURSOR =====
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const cursorRingEl = document.getElementById('cursorRingEl');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .product-card, .filter-btn, .lang-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRingEl && cursorRingEl.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRingEl && cursorRingEl.classList.remove('hover'));
});

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 10 + 8;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      bottom:-${size}px;
      animation-delay:${delay}s;
      animation-duration:${duration}s;
      opacity:${Math.random() * 0.5 + 0.2};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== SMOOTH SCROLL REVEAL with stagger =====
document.querySelectorAll('.stat-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll('.product-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));
document.querySelectorAll('.about-text').forEach(el => el.classList.add('reveal'));
document.querySelectorAll('.contact-sub, .contact-buttons').forEach(el => el.classList.add('reveal'));

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-gold, .btn-inquire, .btn-whatsapp, .btn-instagram').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== PARALLAX HERO =====
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && window.scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
  }
});

// ===== TILT EFFECT ON PRODUCT CARDS =====
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
});

// ===== STAT COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(eased * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent.trim();
        if (text.includes('500')) animateCounter(num, 500, '+');
        else if (text === '4') animateCounter(num, 4, '');
        else if (text.includes('100')) animateCounter(num, 100, '%');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);
