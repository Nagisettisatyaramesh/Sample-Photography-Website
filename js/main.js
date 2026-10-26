/* ==========================================================================
   Hollis & Vale — interactions & motion
   GSAP + ScrollTrigger for scroll choreography, Lenis for smooth scrolling.
   Everything degrades to a static, fully readable page without them.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const motion = hasGSAP && !reduced;

  if (!motion) document.documentElement.classList.add('no-motion');
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  const img = (id, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
  const full = (id) => `https://images.unsplash.com/photo-${id}?auto=format&w=2000&q=85`;

  /* ------------------------------------------------------------------
     Content
     ------------------------------------------------------------------ */
  const CATEGORY_LABEL = {
    weddings: 'Weddings', 'pre-wedding': 'Pre-Wedding', engagements: 'Engagements',
    portraits: 'Portraits', events: 'Events', films: 'Films'
  };

  // `pick` marks the curated selection shown under "All".
  const WORKS = [
    { id: '1519741497674-611481863552', cat: 'weddings', title: 'The Golden Hour Vows', loc: 'Lake Como, Italy', pick: 1 },
    { id: '1438761681033-6461ffad8d80', cat: 'portraits', title: 'Still Water', loc: 'Lake Bled, Slovenia', pick: 2 },
    { id: '1591604466107-ec97de577aff', cat: 'engagements', title: 'Yes, in the Garden', loc: 'Kent, England', pick: 3 },
    { id: '1606800052052-a08af7148866', cat: 'engagements', title: 'The Ring', loc: 'Paris, France', pick: 4 },
    { id: '1478146896981-b80fe463b330', cat: 'pre-wedding', title: 'Desert Road', loc: 'Joshua Tree, USA', pick: 5 },
    { id: '1546032996-6dfacbacbf3f', cat: 'films', title: 'Veil — A Wedding Film', loc: 'Val d\'Orcia, Tuscany', dur: '6:12', pick: 6 },
    { id: '1519225421980-715cb0215aed', cat: 'events', title: 'The Long Table', loc: 'Chianti, Tuscany', pick: 7 },
    { id: '1544005313-94ddf0286df2', cat: 'portraits', title: 'Studio Light I', loc: 'London', pick: 8 },
    { id: '1460978812857-470ed1c77af0', cat: 'weddings', title: 'In Monochrome', loc: 'Isle of Skye, Scotland', pick: 9 },
    { id: '1583939003579-730e3918a45a', cat: 'weddings', title: 'Confetti & Cathedral Bells', loc: 'Bath, England', pick: 10 },
    { id: '1537633552985-df8429e8048b', cat: 'pre-wedding', title: 'Salt & Silk', loc: 'Big Sur, California', pick: 11 },
    { id: '1470229722913-7c0e2dbbafd3', cat: 'events', title: 'After Dark', loc: 'Ibiza, Spain', pick: 12 },
    { id: '1529636798458-92182e662485', cat: 'weddings', title: 'Something Blue', loc: 'Cotswolds, England', pick: 13 },
    { id: '1524504388940-b1c1722653e1', cat: 'portraits', title: 'Chiaroscuro', loc: 'Milan, Italy', pick: 14 },

    { id: '1511285560929-80b456fea0bc', cat: 'weddings', title: 'A Garden Ceremony', loc: 'Provence, France' },
    { id: '1469371670807-013ccf25f16a', cat: 'weddings', title: 'The Long Aisle', loc: 'Sintra, Portugal' },
    { id: '1532712938310-34cb3982ef74', cat: 'pre-wedding', title: 'Before the World Woke', loc: 'Atacama, Chile' },
    { id: '1520854221256-17451cc331bf', cat: 'pre-wedding', title: 'Hold On', loc: 'Kyoto, Japan' },
    { id: '1515934751635-c81c6bc9a2d8', cat: 'engagements', title: 'Peonies & Promise', loc: 'Florence, Italy' },
    { id: '1465495976277-4387d4b0b4c6', cat: 'engagements', title: 'Hands, Held', loc: 'Copenhagen, Denmark' },
    { id: '1531746020798-e6953c6e8e04', cat: 'portraits', title: 'Rose', loc: 'Lisbon, Portugal' },
    { id: '1508214751196-bcfd4ca60f91', cat: 'portraits', title: 'Late Summer', loc: 'Mallorca, Spain' },
    { id: '1507003211169-0a1dd7228f2d', cat: 'portraits', title: 'Daniel', loc: 'New York, USA' },
    { id: '1505236858219-8359eb29e329', cat: 'events', title: 'Encore', loc: 'Berlin, Germany' },
    { id: '1540575467063-178a50c2df87', cat: 'events', title: 'Summit Keynote', loc: 'Copenhagen, Denmark' },
    { id: '1522673607200-164d1b6ce486', cat: 'events', title: 'Before the Guests', loc: 'Napa Valley, USA' },
    { id: '1492684223066-81342ee5ff30', cat: 'films', title: 'Celebration — Highlight Film', loc: 'Barcelona, Spain', dur: '3:48' },
    { id: '1525258946800-98cfd641d0de', cat: 'films', title: 'Petals — Ceremony Film', loc: 'Somerset, England', dur: '11:30' },
    { id: '1500530855697-b586d89ba3ee', cat: 'films', title: 'The Road North — Elopement', loc: 'Utah, USA', dur: '4:57' }
  ];

  const SELECTED = [
    { id: '1460978812857-470ed1c77af0', title: 'The Kiss, Unhurried', loc: 'Isle of Skye, Scotland' },
    { id: '1524504388940-b1c1722653e1', title: 'Chiaroscuro', loc: 'Milan, Italy' },
    { id: '1519741497674-611481863552', title: 'Golden Hour Vows', loc: 'Lake Como, Italy' },
    { id: '1591604466107-ec97de577aff', title: 'Yes, in the Garden', loc: 'Kent, England' },
    { id: '1544005313-94ddf0286df2', title: 'Studio Light I', loc: 'London' },
    { id: '1537633552985-df8429e8048b', title: 'Salt & Silk', loc: 'Big Sur, California' },
    { id: '1508214751196-bcfd4ca60f91', title: 'Late Summer', loc: 'Mallorca, Spain' },
    { id: '1529636798458-92182e662485', title: 'Something Blue', loc: 'Cotswolds, England' },
    { id: '1478146896981-b80fe463b330', title: 'Desert Road', loc: 'Joshua Tree, USA' },
    { id: '1470229722913-7c0e2dbbafd3', title: 'After Dark', loc: 'Ibiza, Spain' }
  ];

  /* ------------------------------------------------------------------
     Smooth scroll
     ------------------------------------------------------------------ */
  let lenis = null;
  if (motion && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const scrollToTarget = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.6, offset: 0 });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  /* ------------------------------------------------------------------
     Navigation: scrolled state, theme over dark sections, active link,
     hide-on-scroll-down, mobile menu
     ------------------------------------------------------------------ */
  const nav = $('#nav');
  const navLinks = $$('.nav__links a');
  const themed = $$('[data-nav]');
  const linkSections = ['home', 'portfolio', 'story', 'services', 'experience', 'contact'].map((id) => document.getElementById(id));
  let lastY = window.scrollY;
  let ticking = false;

  const updateNav = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const probe = nav.offsetHeight / 2;

    nav.classList.toggle('is-scrolled', y > 40);

    const under = themed.find((s) => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; });
    nav.classList.toggle('is-dark', !!under && under.dataset.nav === 'dark');

    if (!document.body.classList.contains('menu-open')) {
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (goingDown && y > vh * 1.2) nav.classList.add('is-hidden');
      else if (goingUp || y < vh) nav.classList.remove('is-hidden');
    }
    lastY = y;

    let current = 'home';
    linkSections.forEach((s) => { if (s && s.getBoundingClientRect().top <= vh * 0.45) current = s.id; });
    navLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.link === current));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateNav); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  updateNav();

  const toggle = $('.nav__toggle');
  const menu = $('#menu');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    if (open) nav.classList.remove('is-hidden');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
    else document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });

  // In-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = id === 'home' ? 0 : document.getElementById(id);
    if (target === null) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) setMenu(false);
    nav.classList.remove('is-hidden');
    scrollToTarget(target);
    history.replaceState(null, '', '#' + id);
  });

  /* ------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------ */
  const lb = (() => {
    const root = $('#lightbox');
    const image = $('.lightbox__frame img', root);
    const count = $('.lightbox__count', root);
    const title = $('.lightbox__title', root);
    const meta = $('.lightbox__meta', root);
    let list = [];
    let index = 0;
    let lastFocus = null;

    const render = () => {
      const item = list[index];
      image.classList.add('is-loading');
      const next = new Image();
      next.onload = next.onerror = () => {
        image.src = next.src;
        image.alt = item.title + (item.loc ? ', ' + item.loc : '');
        requestAnimationFrame(() => image.classList.remove('is-loading'));
      };
      next.src = full(item.id);
      count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0');
      title.textContent = item.title;
      const parts = [item.loc, item.cat && CATEGORY_LABEL[item.cat], item.dur && 'Film still · ' + item.dur].filter(Boolean);
      meta.textContent = parts.join(' — ');
      // Warm the neighbours
      [list[(index + 1) % list.length], list[(index - 1 + list.length) % list.length]].forEach((n) => { new Image().src = full(n.id); });
    };
    const go = (d) => { index = (index + d + list.length) % list.length; render(); };
    const open = (items, i) => {
      list = items; index = i; lastFocus = document.activeElement;
      root.hidden = false;
      requestAnimationFrame(() => root.classList.add('is-open'));
      render();
      if (lenis) lenis.stop(); else document.body.style.overflow = 'hidden';
      $('.lightbox__close', root).focus();
    };
    const close = () => {
      root.classList.remove('is-open');
      setTimeout(() => { root.hidden = true; image.removeAttribute('src'); }, 450);
      if (lenis) lenis.start(); else document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };

    $('.lightbox__close', root).addEventListener('click', close);
    $('.lightbox__nav--prev', root).addEventListener('click', () => go(-1));
    $('.lightbox__nav--next', root).addEventListener('click', () => go(1));
    root.addEventListener('click', (e) => { if (e.target === root || e.target.classList.contains('lightbox__frame')) close(); });
    document.addEventListener('keydown', (e) => {
      if (root.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const f = $$('button', root);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    let sx = 0, sy = 0;
    root.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    root.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    });
    return { open };
  })();

  /* ------------------------------------------------------------------
     Custom "View" cursor (desktop)
     ------------------------------------------------------------------ */
  const cursor = $('.cursor');
  const cursorLabel = $('span', cursor);
  if (finePointer) {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
      requestAnimationFrame(loop);
    };
    loop();
  }
  const showCursor = (label) => { if (!finePointer) return; cursorLabel.textContent = label; cursor.classList.add('is-on'); };
  const hideCursor = () => cursor.classList.remove('is-on');

  /* ------------------------------------------------------------------
     Portfolio gallery
     ------------------------------------------------------------------ */
  const gallery = $('#gallery');
  const countEl = $('.filters__count');
  const PATTERN = ['l', 'p', 't', 's', 't', 's', 'w', 'p', 'l', 't', 't', 's', 'w', 's'];
  let currentList = [];
  let tileTriggers = [];

  const listFor = (filter) => filter === 'all'
    ? WORKS.filter((w) => w.pick).sort((a, b) => a.pick - b.pick)
    : WORKS.filter((w) => w.cat === filter);

  const tileHTML = (w, i) => {
    const size = PATTERN[i % PATTERN.length];
    const wide = size === 'l' || size === 'w';
    const srcset = [600, 900, 1400].map((px) => `${img(w.id, px)} ${px}w`).join(', ');
    const sizes = wide ? '(max-width: 760px) 100vw, 58vw' : '(max-width: 760px) 50vw, 42vw';
    return `
      <article class="tile tile--${size}" data-index="${i}" tabindex="0" role="button"
               aria-label="Open ${w.title.replace(/"/g, '&quot;')}, ${w.loc}">
        <div class="tile__card">
          <div class="tile__media">
            <img src="${img(w.id, wide ? 1400 : 900)}" srcset="${srcset}" sizes="${sizes}" alt="${w.title} — ${w.loc}" loading="lazy" decoding="async">
            ${w.dur ? `<span class="tile__play" aria-hidden="true">Film</span><span class="tile__dur">${w.dur}</span>` : ''}
            <span class="tile__tag">${CATEGORY_LABEL[w.cat]}</span>
          </div>
          <div class="tile__info">
            <span class="tile__title">${w.title}</span>
            <span class="tile__loc">${w.loc}</span>
          </div>
        </div>
      </article>`;
  };

  const bindTiles = () => {
    $$('.tile', gallery).forEach((tile) => {
      const card = $('.tile__card', tile);
      const i = +tile.dataset.index;
      const open = () => lb.open(currentList, i);
      tile.addEventListener('click', open);
      tile.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      if (finePointer && !reduced) {
        tile.addEventListener('pointermove', (e) => {
          const r = tile.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateZ(0)`;
        });
      }
      tile.addEventListener('pointerenter', () => showCursor('View'));
      tile.addEventListener('pointerleave', () => { card.style.transform = ''; hideCursor(); });
    });
  };

  const revealTiles = (immediate) => {
    tileTriggers.forEach((t) => t.kill());
    tileTriggers = [];
    if (!motion) return;
    $$('.tile', gallery).forEach((tile, i) => {
      const media = $('.tile__media', tile);
      const tl = gsap.timeline({ paused: true })
        .fromTo(tile, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out' })
        .fromTo(media, { clipPath: 'inset(12% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out' }, 0);
      const r = tile.getBoundingClientRect();
      if (immediate && r.top < innerHeight) { tl.delay((i % 6) * 0.07).play(); return; }
      tileTriggers.push(ScrollTrigger.create({ trigger: tile, start: 'top 92%', once: true, onEnter: () => tl.play() }));
    });
  };

  const renderGallery = (filter, immediate) => {
    currentList = listFor(filter);
    gallery.innerHTML = currentList.map(tileHTML).join('');
    countEl.textContent = (filter === 'all' ? 'Selected works · ' : '') + String(currentList.length).padStart(2, '0');
    bindTiles();
    revealTiles(immediate);
    if (hasGSAP) ScrollTrigger.refresh();
  };

  $$('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;
      $$('.filter').forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
      const f = btn.dataset.filter;
      if (!motion) { renderGallery(f); return; }
      const top = gallery.getBoundingClientRect().top + window.scrollY - 220;
      gsap.to($$('.tile', gallery), {
        opacity: 0, y: 24, duration: 0.45, ease: 'power2.in', stagger: 0.025,
        onComplete: () => {
          renderGallery(f, true);
          if (window.scrollY > top + 200) scrollToTarget(top);
        }
      });
    });
  });

  renderGallery('all');

  /* ------------------------------------------------------------------
     Curved 3D gallery ("Selected Frames")
     ------------------------------------------------------------------ */
  (() => {
    const ring = $('#ring');
    const track = $('#ringTrack');
    const idxEl = $('.selected__index');
    const titleEl = $('.selected__title');
    const placeEl = $('.selected__place');
    const N = SELECTED.length;
    const STEP = 360 / N;

    track.innerHTML = SELECTED.map((s, i) => `
      <figure class="ring__card" data-i="${i}">
        <img src="${img(s.id, 700)}" alt="${s.title} — ${s.loc}" loading="lazy" draggable="false">
      </figure>`).join('');
    const cards = $$('.ring__card', track);

    let radius = 500;
    let rot = 0;        // rendered rotation
    let target = 0;     // desired rotation
    let active = -1;
    let dragging = false;
    let inView = false;
    let lastInteract = 0;

    const layout = () => {
      const w = clamp(window.innerWidth * (window.innerWidth < 760 ? 0.56 : 0.21), 200, 330);
      track.style.setProperty('--card-w', w + 'px');
      radius = (w / 2) / Math.tan(Math.PI / N) * 1.16;
      cards.forEach((c, i) => {
        c.style.setProperty('--card-w', w + 'px');
        c.style.transform = `rotateY(${i * STEP}deg) translateZ(${radius}px)`;
      });
    };

    const updateCaption = (i) => {
      if (i === active) return;
      active = i;
      const s = SELECTED[i];
      idxEl.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
      titleEl.textContent = s.title;
      placeEl.textContent = s.loc;
    };

    const render = () => {
      track.style.transform = `translateZ(${-radius}px) rotateY(${-rot}deg)`;
      cards.forEach((c, i) => {
        let d = ((i * STEP - rot) % 360 + 540) % 360 - 180; // signed angle from front
        c.style.setProperty('--dim', clamp(Math.abs(d) / 110, 0, 0.78).toFixed(3));
      });
      updateCaption(((Math.round(rot / STEP) % N) + N) % N);
    };

    const tick = () => {
      const diff = target - rot;
      if (Math.abs(diff) > 0.01) { rot += diff * (reduced ? 1 : 0.075); render(); }
      if (!reduced && inView && !dragging && performance.now() - lastInteract > 6000) {
        target += STEP; lastInteract = performance.now();
      }
      requestAnimationFrame(tick);
    };

    const snap = (v) => Math.round(v / STEP) * STEP;
    const goBy = (d) => { target = snap(target) + d * STEP; lastInteract = performance.now(); };
    const goTo = (i) => {
      const cur = snap(target);
      let d = ((i * STEP - cur) % 360 + 540) % 360 - 180;
      target = cur + d; lastInteract = performance.now();
    };

    // Drag with inertia
    let startX = 0, startTarget = 0, lastX = 0, lastT = 0, vel = 0, moved = 0;
    ring.addEventListener('pointerdown', (e) => {
      dragging = true; moved = 0;
      startX = lastX = e.clientX; startTarget = target; lastT = performance.now(); vel = 0;
      ring.setPointerCapture(e.pointerId);
    });
    ring.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      vel = dx / Math.max(1, now - lastT);
      lastX = e.clientX; lastT = now;
      moved = Math.max(moved, Math.abs(e.clientX - startX));
      target = startTarget - (e.clientX - startX) * 0.16;
    });
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false; lastInteract = performance.now();
      if (moved < 6) {
        // Treat as click: front card opens the viewer, side cards rotate to front
        const card = document.elementFromPoint(e.clientX, e.clientY)?.closest('.ring__card');
        if (card) {
          const i = +card.dataset.i;
          if (i === active) lb.open(SELECTED, i); else goTo(i);
        }
        target = snap(target);
        return;
      }
      target = snap(target - vel * 120);
    };
    ring.addEventListener('pointerup', endDrag);
    ring.addEventListener('pointercancel', endDrag);
    ring.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goBy(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goBy(-1); }
      else if (e.key === 'Enter') lb.open(SELECTED, active);
    });
    $('[data-ring="next"]').addEventListener('click', () => goBy(1));
    $('[data-ring="prev"]').addEventListener('click', () => goBy(-1));

    new IntersectionObserver(([en]) => { inView = en.isIntersecting; if (inView) lastInteract = performance.now(); }, { threshold: 0.4 }).observe(ring);

    layout(); render(); tick();
    window.addEventListener('resize', () => { layout(); render(); });
  })();

  /* ------------------------------------------------------------------
     Services — floating image preview that follows the cursor
     ------------------------------------------------------------------ */
  (() => {
    if (!finePointer) return;
    const preview = $('.service-preview');
    const pImg = $('img', preview);
    let x = 0, y = 0, px = 0, py = 0, on = false, raf = 0;
    const loop = () => {
      px += (x - px) * 0.14; py += (y - py) * 0.14;
      const tilt = clamp((x - px) * 0.08, -8, 8);
      preview.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) rotate(${tilt}deg) scale(${on ? 1 : 0.85})`;
      raf = on || Math.abs(x - px) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    $$('.service').forEach((s) => {
      s.addEventListener('pointerenter', (e) => {
        pImg.src = s.dataset.img;
        if (!on) { px = x = e.clientX + 120; py = y = e.clientY; }
        on = true; preview.classList.add('is-on');
        if (!raf) raf = requestAnimationFrame(loop);
      });
      s.addEventListener('pointermove', (e) => { x = e.clientX + 140; y = e.clientY; });
    });
    $('#serviceList').addEventListener('pointerleave', () => { on = false; preview.classList.remove('is-on'); });
  })();

  /* ------------------------------------------------------------------
     Config-driven content (js/config.js). Unverified items stay hidden.
     ------------------------------------------------------------------ */
  const CONFIG = window.SITE_CONFIG || {};
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  if (CONFIG.email) {
    $$('[data-email]').forEach((a) => { a.href = 'mailto:' + CONFIG.email; a.textContent = CONFIG.email; });
  }

  $$('[data-price]').forEach((el) => {
    const price = (CONFIG.prices || {})[el.dataset.price];
    if (price) el.textContent = price; else el.hidden = true;
  });

  if (CONFIG.showStats && Array.isArray(CONFIG.stats) && CONFIG.stats.length) {
    const stats = $('#stats');
    stats.innerHTML = CONFIG.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('');
    stats.hidden = false;
  }

  if (CONFIG.showPress && Array.isArray(CONFIG.press) && CONFIG.press.length) {
    const press = $('#press');
    press.innerHTML = CONFIG.press.map((p) => `<li>${esc(p)}</li>`).join('');
    press.hidden = false;
  }

  if (CONFIG.showTestimonials && Array.isArray(CONFIG.testimonials) && CONFIG.testimonials.length) {
    const wrap = $('#testimonials');
    wrap.insertAdjacentHTML('afterbegin', CONFIG.testimonials.map((t, n) => `
      <figure class="testimonial${n === 0 ? ' is-active' : ''}">
        <blockquote>“${esc(t.quote)}”</blockquote>
        <figcaption>${esc(t.name)} <span>${esc(t.detail || '')}</span></figcaption>
      </figure>`).join(''));
    wrap.hidden = false;
  }

  /* ------------------------------------------------------------------
     Testimonials
     ------------------------------------------------------------------ */
  (() => {
    const items = $$('.testimonial');
    const dots = $('.testimonials__dots');
    if (items.length < 2) return;
    let i = 0, timer;
    items.forEach((_, n) => {
      const b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Show testimonial ' + (n + 1));
      b.setAttribute('aria-selected', String(n === 0));
      b.addEventListener('click', () => { show(n); restart(); });
      dots.appendChild(b);
    });
    const show = (n) => {
      i = n;
      items.forEach((t, k) => t.classList.toggle('is-active', k === n));
      $$('button', dots).forEach((b, k) => b.setAttribute('aria-selected', String(k === n)));
    };
    const restart = () => { clearInterval(timer); if (!reduced) timer = setInterval(() => show((i + 1) % items.length), 7000); };
    restart();
  })();

  /* ------------------------------------------------------------------
     Contact form
     Posts to CONFIG.formEndpoint when one is set and reports success only
     on a 2xx response. Without an endpoint it hands the enquiry to the
     visitor's email app rather than pretending it was sent.
     ------------------------------------------------------------------ */
  (() => {
    const form = $('#contactForm');
    const status = $('.form__status', form);
    const btn = $('.form__submit', form);
    const btnLabel = $('span', btn);
    const dateInput = form.elements.date;
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = today;

    const rules = {
      name: (v) => v.trim().length > 1,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      date: (v) => !v || v >= today,
      type: (v) => !!v
    };
    const check = (el) => {
      const ok = rules[el.name] ? rules[el.name](el.value) : true;
      el.closest('.field').classList.toggle('is-invalid', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    Object.keys(rules).forEach((n) => {
      const el = form.elements[n];
      el.addEventListener('blur', () => { if (el.value) check(el); });
      el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
        if (el.closest('.field').classList.contains('is-invalid')) check(el);
      });
    });

    const setStatus = (msg, kind) => {
      status.textContent = msg;
      status.className = 'form__status' + (kind ? ' is-' + kind : '');
    };
    const setBusy = (busy) => {
      btn.disabled = busy;
      form.setAttribute('aria-busy', String(busy));
      btnLabel.textContent = busy ? 'Sending…' : 'Send enquiry';
    };

    // "Enquire" links in Services preselect the commission type
    $$('[data-enquire]').forEach((a) => a.addEventListener('click', () => {
      form.elements.type.value = a.dataset.enquire;
      check(form.elements.type);
    }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('');
      const fields = Object.keys(rules).map((n) => form.elements[n]);
      const results = fields.map(check);
      const firstBad = fields[results.indexOf(false)];
      if (firstBad) { firstBad.focus(); return; }

      // Honeypot: real visitors never fill this hidden field
      if (form.elements.company.value) { form.reset(); return; }

      const data = new FormData(form);
      data.delete('company');

      if (!CONFIG.formEndpoint) {
        const body = [
          'Name: ' + data.get('name'),
          'Email: ' + data.get('email'),
          'Date: ' + (data.get('date') || 'Not decided yet'),
          'Commission: ' + data.get('type'),
          '',
          data.get('message') || ''
        ].join('\n');
        const subject = `${data.get('type')} enquiry — ${data.get('name')}`;
        window.location.href = `mailto:${CONFIG.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus(`Your email app should now open with your enquiry ready to send. If it doesn't, write to us at ${CONFIG.email}.`, 'info');
        return;
      }

      setBusy(true);
      try {
        const res = await fetch(CONFIG.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        $$('.field', form).forEach((f) => f.classList.remove('is-invalid'));
        setStatus('Thank you — your enquiry has been sent. We’ll be in touch soon.', 'success');
      } catch (err) {
        setStatus(`Sorry, your enquiry couldn’t be sent just now. Please try again, or email us at ${CONFIG.email}.`, 'error');
      } finally {
        setBusy(false);
      }
    });
  })();

  /* ------------------------------------------------------------------
     Manifesto: split into words (used for the scroll-lit reading effect)
     ------------------------------------------------------------------ */
  const splitWords = (el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(' '));
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
    return $$('.w', el);
  };

  /* ==================================================================
     Motion choreography (GSAP only)
     ================================================================== */
  if (!motion) return;

  const isMobile = () => window.innerWidth < 760;

  /* ---------- Hero intro ---------- */
  const heroImg = $('.hero__media img');
  const frames = $$('.frame');
  // Gentle resting tilt; deeper frames sit further back so the layers read as one composition
  const restRot = [2.5, -2, 3, -2.5];
  const restZ = [-40, 60, -120, -20];
  frames.forEach((f, i) => gsap.set(f, { rotation: restRot[i], transformPerspective: 1200 }));

  // The photograph is visible almost immediately; type and frames follow it
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro
    .fromTo(heroImg, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' })
    .fromTo(heroImg, { scale: 1.2 }, { scale: 1.06, duration: 2.4, ease: 'power3.out' }, 0)
    .fromTo('.hero__media', { clipPath: 'inset(5% 5% 5% 5% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.8, ease: 'expo.inOut' }, 0)
    .fromTo('.nav', { opacity: 0 }, { opacity: 1, duration: 1 }, 0.3)
    .fromTo(frames, { opacity: 0, z: -500, rotationY: -18, rotationX: 8 }, { opacity: 1, z: (i) => restZ[i], rotationY: 0, rotationX: 0, duration: 1.8, stagger: 0.12 }, 0.7)
    .fromTo('.hero__eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2 }, 0.9)
    .fromTo('.hero__title .line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.5, stagger: 0.14 }, 1.0)
    .fromTo('.hero__sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 }, 1.4)
    .fromTo('.hero__ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 }, 1.55)
    .fromTo('.hero__scroll', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.8);

  /* ---------- Hero pointer parallax ---------- */
  if (finePointer) {
    const qx = frames.map((f) => gsap.quickTo(f, 'x', { duration: 1.2, ease: 'power3' }));
    const qy = frames.map((f) => gsap.quickTo(f, 'y', { duration: 1.2, ease: 'power3' }));
    const qry = frames.map((f) => gsap.quickTo(f, 'rotationY', { duration: 1.4, ease: 'power3' }));
    const qrx = frames.map((f) => gsap.quickTo(f, 'rotationX', { duration: 1.4, ease: 'power3' }));
    const ix = gsap.quickTo(heroImg, 'x', { duration: 1.6, ease: 'power3' });
    const iy = gsap.quickTo(heroImg, 'y', { duration: 1.6, ease: 'power3' });
    window.addEventListener('pointermove', (e) => {
      if (intro.isActive() || window.scrollY > window.innerHeight * 1.6) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      frames.forEach((f, i) => {
        const d = parseFloat(f.dataset.depth) || 0.5;
        qx[i](nx * 46 * d); qy[i](ny * 32 * d);
        qry[i](nx * 10 * d); qrx[i](-ny * 8 * d);
      });
      ix(-nx * 16); iy(-ny * 10);
    }, { passive: true });
  }

  /* ---------- Hero scroll transformation ---------- */
  gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true }
  })
    .to('.hero__copy', { y: -90, autoAlpha: 0, ease: 'power1.in', duration: 0.32 }, 0)
    .to('.hero__scroll', { autoAlpha: 0, duration: 0.1 }, 0)
    .to('.hero__shade', { opacity: 0, duration: 0.5 }, 0.15)
    .fromTo('.hero__media',
      { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
      { clipPath: () => isMobile() ? 'inset(15% 7% 20% 7% round 4px)' : 'inset(14% 25% 12% 25% round 4px)', ease: 'power2.inOut', duration: 0.8, immediateRender: false }, 0.05)    .to(frames[0], { xPercent: 90, yPercent: -70, ease: 'none', duration: 0.85 }, 0)
    .to(frames[1], { xPercent: 70, yPercent: 60, ease: 'none', duration: 0.85 }, 0)
    .to(frames[2], { xPercent: 160, yPercent: 20, ease: 'none', duration: 0.85 }, 0)
    .to(frames[3], { xPercent: -110, yPercent: -50, ease: 'none', duration: 0.85 }, 0)
    .to('.hero__frames', { autoAlpha: 0, duration: 0.3 }, 0.55)
    .to('.hero__plate', { opacity: 1, duration: 0.2 }, 0.78);

  /* ---------- Manifesto reading effect ---------- */
  const words = splitWords($('[data-split]'));
  gsap.to(words, {
    opacity: 1, ease: 'none', stagger: 0.08,
    scrollTrigger: { trigger: '.manifesto__text', start: 'top 82%', end: 'bottom 50%', scrub: 0.8 }
  });

  /* ---------- Generic reveals ---------- */
  const revealTargets = [
    ...$$('.section-head > div > *'), ...$$('.section-head__aside'), '.filters',
    ...$$('.story__copy > *'), ...$$('.service'), ...$$('.step'),
    ...$$('.contact__intro > *'), ...$$('.form > *:not(.form__success)'),
    '.selected__head', '.footer__word', '.manifesto__meta', '.manifesto .eyebrow'
  ].map((t) => (typeof t === 'string' ? $(t) : t)).filter(Boolean);
  revealTargets.forEach((el) => el.setAttribute('data-reveal', ''));
  ScrollTrigger.batch(revealTargets, {
    start: 'top 90%', once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, overwrite: true })
  });

  /* ---------- Featured project: image expands, story unfolds ---------- */
  const feature = $('.feature');
  gsap.timeline({
    scrollTrigger: {
      trigger: feature, start: 'top top', end: 'bottom bottom', scrub: 0.7, invalidateOnRefresh: true,
      onUpdate: (st) => gsap.set('.feature__progress i', { scaleY: st.progress })
    }
  })
    .fromTo('.feature__sticky', { backgroundColor: '#F7F4EE' }, { backgroundColor: '#171715', ease: 'power2.in', duration: 0.3 }, 0.12)
    .fromTo('.feature__media',
      { clipPath: () => isMobile() ? 'inset(26% 16% 26% 16% round 6px)' : 'inset(22% 34% 22% 34% round 6px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 0.45 }, 0)
    .fromTo('.feature__media img', { scale: 1.25, yPercent: -25 }, { scale: 1, yPercent: 0, ease: 'power2.inOut', duration: 0.5 }, 0)
    .to('.feature__shade', { opacity: 1, duration: 0.15 }, 0.38)
    .to('.feature__copy .eyebrow', { opacity: 1, duration: 0.08 }, 0.45)
    .fromTo('.feature__title .line > span', { yPercent: 110 }, { yPercent: 0, ease: 'power3.out', stagger: 0.06, duration: 0.18 }, 0.47)
    .fromTo('.feature__story', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.16 }, 0.64)
    .to({}, { duration: 0.2 });

  /* ---------- Selected gallery entrance ---------- */
  gsap.fromTo('.ring__scene', { opacity: 0, rotationX: 14, y: 80 }, {
    opacity: 1, rotationX: 0, y: 0, duration: 1.8, ease: 'expo.out',
    scrollTrigger: { trigger: '.ring', start: 'top 85%', once: true }
  });

  /* ---------- Story parallax ---------- */
  $$('[data-parallax]').forEach((el) => {
    const f = parseFloat(el.dataset.parallax);
    gsap.fromTo(el, { yPercent: -f * 100 }, {
      yPercent: f * 100, ease: 'none',
      scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
  gsap.fromTo('.story__img--main img', { scale: 1.2 }, {
    scale: 1, ease: 'none',
    scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  /* ---------- Footer wordmark drift ---------- */
  gsap.fromTo('.footer__word', { xPercent: -6 }, {
    xPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
