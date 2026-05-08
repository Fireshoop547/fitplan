'use strict';
// ===== FITPLAN MAIN.JS – v2.1 =====

document.addEventListener('DOMContentLoaded', () => {
    initHeroVideo();
    initHeroCardRotator();
    injectMobileNav();
    initTheme();
    initNavigation();
    initMobileNav();
    initInteractiveBackground();
    initAdvancedCardInteractions();
    initPremiumScrollAnimations();
    initFAQ();
    initSmoothScroll();
    initModals();
    initWorkoutFilters();
    initProtocolFilters();
    initKeyboardNavigation();
    initHeaderScroll();
    initHeroCounters();
    initBuilder();
    initCalculators();
    injectWorkoutModal();
});

// ===== HERO CARD ROTATOR =====
function initHeroCardRotator() {
    const card = document.getElementById('heroRotatingCard');
    if (!card) return;

    const protocols = [
        { level: 'Beginner',     title: 'Foundational Strength',      duration: '4 weeks',  freq: '3x/week', session: '45 min', tags: ['Compound', 'Full Body'],   bar: 30 },
        { level: 'Beginner',     title: 'Conditioning Foundation',     duration: '3 weeks',  freq: '4x/week', session: '30 min', tags: ['Conditioning', 'Metabolic'], bar: 25 },
        { level: 'Intermediate', title: 'Upper/Lower Hypertrophy',     duration: '8 weeks',  freq: '4x/week', session: '60 min', tags: ['Hypertrophy', 'Volume'],    bar: 55 },
        { level: 'Intermediate', title: 'Push / Pull / Legs Split',    duration: '12 weeks', freq: '6x/week', session: '75 min', tags: ['Hypertrophy', 'Periodized'],bar: 70 },
        { level: 'Advanced',     title: 'Elite Strength Protocol',     duration: '16 weeks', freq: '5x/week', session: '90 min', tags: ['Strength', 'Power'],        bar: 85 },
        { level: 'Advanced',     title: 'Competition Periodization',   duration: '20 weeks', freq: '5–6x/week',session: '90 min',tags: ['Periodized', 'Competition'],bar: 95 },
    ];

    // Build dots
    const dotsEl = document.getElementById('heroCardDots');
    protocols.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'hero-card-dot' + (i === 0 ? ' active' : '');
        dotsEl.appendChild(dot);
    });

    let current = 0;

    function update(idx) {
        const p = protocols[idx];
        card.classList.add('fading');

        setTimeout(() => {
            document.getElementById('heroCardLevel').textContent    = p.level.toUpperCase();
            document.getElementById('heroCardTitle').textContent    = p.title;
            document.getElementById('heroCardDuration').textContent = p.duration;
            document.getElementById('heroCardFreq').textContent     = p.freq;
            document.getElementById('heroCardSession').textContent  = p.session;
            document.getElementById('heroCardBar').style.width      = p.bar + '%';
            document.getElementById('heroCardTags').innerHTML       = p.tags.map(t => `<span class="exercise-tag">${t}</span>`).join('');
            document.querySelectorAll('.hero-card-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
            card.classList.remove('fading');
        }, 320);
    }

    setInterval(() => {
        current = (current + 1) % protocols.length;
        update(current);
    }, 3200);
}

// ===== HERO VIDEO =====
function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    function fadeIn() { video.classList.add('loaded'); }

    if (video.readyState >= 3) {
        fadeIn();
    } else {
        video.addEventListener('canplay', fadeIn, { once: true });
        // Fallback: show after 2s even if still buffering
        setTimeout(fadeIn, 2000);
    }

    // Pause video when tab is hidden to save resources
    document.addEventListener('visibilitychange', () => {
        document.hidden ? video.pause() : video.play().catch(() => {});
    });
}

// ===== THEME =====
function initTheme() {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'dark') { document.body.classList.add('dark'); setThemeIcon(true, toggle); }
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        setThemeIcon(isDark, toggle);
    });
}

function setThemeIcon(isDark, toggle) {
    toggle.innerHTML = isDark
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// ===== MOBILE NAV INJECTION =====
function injectMobileNav() {
    // Inject hamburger button into header
    const headerRight = document.querySelector('.header__right');
    if (headerRight && !document.querySelector('.nav-mobile-toggle')) {
        const btn = document.createElement('button');
        btn.className = 'nav-mobile-toggle';
        btn.setAttribute('aria-label', 'Open navigation menu');
        btn.setAttribute('data-mobile-nav-toggle', '');
        btn.innerHTML = '<span></span><span></span><span></span>';
        headerRight.appendChild(btn);
    }

    // Inject overlay
    if (!document.getElementById('mobileNavOverlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        overlay.id = 'mobileNavOverlay';
        overlay.setAttribute('data-mobile-nav-close', '');
        document.body.appendChild(overlay);
    }

    // Inject drawer
    if (!document.getElementById('mobileNav')) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = [
            { href: 'index.html', label: 'Home', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
            { href: 'protocols.html', label: 'Preset Workouts', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
            { href: 'protocol-builder.html', label: 'Build My Workout', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
            { href: 'tools.html', label: 'Tools', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
            { href: 'chef.html', label: 'Nutrition', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>' },
        ];

        const trackerActive = currentPage === 'tracker.html';
        const linksHTML = links.map(l => `
            <a href="${l.href}" class="mobile-nav-link${l.href === currentPage ? ' active' : ''}">
                <span class="mobile-nav-icon">${l.icon}</span>
                ${l.label}
            </a>
        `).join('');

        const nav = document.createElement('div');
        nav.className = 'mobile-nav';
        nav.id = 'mobileNav';
        nav.setAttribute('aria-hidden', 'true');
        nav.innerHTML = `
            <div class="mobile-nav-top">
                <span class="mobile-nav-logo">FitPlan</span>
                <button class="mobile-nav-close" data-mobile-nav-close aria-label="Close menu">×</button>
            </div>
            <div class="mobile-nav-links">${linksHTML}</div>
            <div class="mobile-nav-cta">
                <a href="tracker.html" class="mobile-nav-link${trackerActive ? ' active' : ''}" style="margin-bottom:14px;">
                    <span class="mobile-nav-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></span>
                    My Progress
                </a>
                <button class="btn btn-primary btn-large" style="width:100%;" onclick="window.location.href='protocol-builder.html'">Build Routine</button>
            </div>
        `;
        document.body.appendChild(nav);
    }
}

// ===== MOBILE NAV LOGIC =====
function initMobileNav() {
    const toggle = document.querySelector('[data-mobile-nav-toggle]');
    const nav = document.getElementById('mobileNav');
    const overlay = document.getElementById('mobileNavOverlay');
    if (!toggle || !nav) return;

    function open() {
        nav.classList.add('open');
        overlay?.classList.add('open');
        nav.setAttribute('aria-hidden', 'false');
        toggle.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        nav.classList.remove('open');
        overlay?.classList.remove('open');
        nav.setAttribute('aria-hidden', 'true');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => nav.classList.contains('open') ? close() : open());

    document.querySelectorAll('[data-mobile-nav-close]').forEach(el => {
        el.addEventListener('click', close);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('open')) close();
    });
}

// ===== NAVIGATION ACTIVE STATE =====
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === currentPage || (currentPage === '' && href === 'index.html');
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
}

// ===== INTERACTIVE BACKGROUND =====
function initInteractiveBackground() {
    const orb = document.getElementById('mouseGlowOrb');
    if (!orb) return;
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let targetX = mouseX, targetY = mouseY;
    let running = false, rafId = null;
    const ease = 0.07;

    document.addEventListener('mousemove', e => {
        targetX = e.clientX; targetY = e.clientY;
        if (!running) { running = true; rafId = requestAnimationFrame(tick); }
    });
    document.addEventListener('mouseleave', () => { running = false; if (rafId) cancelAnimationFrame(rafId); });
    document.addEventListener('mouseenter', () => { if (!running) { running = true; rafId = requestAnimationFrame(tick); } });

    function tick() {
        mouseX += (targetX - mouseX) * ease;
        mouseY += (targetY - mouseY) * ease;
        orb.style.setProperty('--mouse-glow-x', `${mouseX - 275}px`);
        orb.style.setProperty('--mouse-glow-y', `${mouseY - 275}px`);
        if (Math.hypot(targetX - mouseX, targetY - mouseY) > 0.5) { rafId = requestAnimationFrame(tick); } else { running = false; }
    }
}

// ===== 3D CARD TILT + SPOTLIGHT =====
function initAdvancedCardInteractions() {
    document.querySelectorAll('.feature-card, .workout-card, .protocol-item, .tool-card').forEach(card => {
        if (!card.querySelector('.card-spotlight')) {
            const spot = document.createElement('div');
            spot.className = 'card-spotlight';
            card.appendChild(spot);
        }
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
            const cx = r.width / 2, cy = r.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${((e.clientY - r.top - cy) / cy) * -7}deg) rotateY(${((e.clientX - r.left - cx) / cx) * 7}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initPremiumScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.feature-card, .workout-card, .step, .protocol-item, .testimonial-card').forEach((el, i) => {
                el.style.opacity = '0';
                el.style.animation = `fadeInUpPremium 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms forwards`;
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.features-grid, .workouts-grid, .steps-container, .protocols-grid, .testimonials-grid').forEach(container => {
        container.querySelectorAll('.feature-card, .workout-card, .step, .protocol-item, .testimonial-card').forEach(el => el.style.opacity = '0');
        observer.observe(container);
    });
}

// ===== FAQ =====
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            items.forEach(i => { i.classList.remove('open'); i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false'); });
            if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });
}

// ===== MODALS =====
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
function initModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal.id); });
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') document.querySelectorAll('.modal.active').forEach(m => closeModal(m.id));
    });
}

// ===== WORKOUT FILTERS =====
function initWorkoutFilters() {
    const btns = document.querySelectorAll('.workout-filters .filter-btn');
    const cards = document.querySelectorAll('.workout-card');
    if (!btns.length) return;
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const match = filter === 'all' || card.dataset.level === filter;
                card.style.display = match ? 'block' : 'none';
                if (match) { card.style.opacity = '1'; card.style.transform = 'none'; }
            });
        });
    });
}

// ===== PROTOCOL FILTERS =====
function initProtocolFilters() {
    const items = document.querySelectorAll('.protocol-item');
    if (!items.length) return;

    const levelBtns = document.querySelectorAll('[data-filter-level]');
    const muscleBtns = document.querySelectorAll('[data-filter-muscle]');
    const searchInput = document.getElementById('protocolSearch');
    const noResults = document.getElementById('protocolNoResults');

    let activeLevelFilter = 'all';
    let activeMuscleFilter = 'all';
    let searchQuery = '';

    function applyFilters() {
        let visibleCount = 0;
        items.forEach(item => {
            const level = item.dataset.level || '';
            const muscles = item.dataset.muscles || '';
            const text = ((item.querySelector('h3')?.textContent || '') + ' ' + (item.querySelector('p')?.textContent || '')).toLowerCase();

            const levelMatch = activeLevelFilter === 'all' || level === activeLevelFilter;
            const muscleMatch = activeMuscleFilter === 'all' || muscles.includes(activeMuscleFilter);
            const searchMatch = !searchQuery || text.includes(searchQuery);

            const visible = levelMatch && muscleMatch && searchMatch;
            item.style.display = visible ? '' : 'none';
            if (visible) {
                item.style.opacity = '1';
                item.style.transform = 'none';
                visibleCount++;
            }
        });
        if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            levelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeLevelFilter = btn.dataset.filterLevel;
            applyFilters();
        });
    });

    muscleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            muscleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMuscleFilter = btn.dataset.filterMuscle;
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim().toLowerCase();
            applyFilters();
        });
    }

    window.resetProtocolFilters = function() {
        activeLevelFilter = 'all';
        activeMuscleFilter = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        levelBtns.forEach(b => b.classList.toggle('active', b.dataset.filterLevel === 'all'));
        muscleBtns.forEach(b => b.classList.toggle('active', b.dataset.filterMuscle === 'all'));
        applyFilters();
    };
}

// ===== KEYBOARD NAV =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') document.querySelectorAll('.faq-item.open').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false'); });
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const fc = document.querySelector('.workout-filters, .protocols-filters');
            if (!fc) return;
            const btns = Array.from(fc.querySelectorAll('.filter-btn'));
            const idx = btns.indexOf(fc.querySelector('.filter-btn.active'));
            const next = e.key === 'ArrowRight' ? btns[(idx + 1) % btns.length] : btns[(idx - 1 + btns.length) % btns.length];
            next?.click();
        }
    });
}

// ===== HEADER SCROLL =====
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.pageYOffset > 80 ? '0 4px 30px rgba(0,0,0,0.4)' : '';
    }, { passive: true });
}

// ===== HERO COUNTERS =====
function initHeroCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.counter, 10);
            const suffix = el.dataset.suffix || '';
            const start = performance.now();
            (function tick(now) {
                const p = Math.min((now - start) / 1800, 1);
                el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString() + suffix;
                if (p < 1) requestAnimationFrame(tick);
            })(start);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(el => observer.observe(el));
}

// ===== PROTOCOL BUILDER =====
function initBuilder() {
    if (!document.querySelector('.builder-container')) return;
    const state = { level: null, gym: null, goal: null, frequency: null };

    const PROTOCOLS = {
        beginner: {
            strength: {
                '3': { name: 'Foundational Strength', desc: 'Full-body compound movements 3 days per week. Perfect for building the strength foundation every serious lifter needs.', duration: '4 weeks', session: '45 min', volume: 'Moderate', tags: ['Compound', 'Full Body'], why: "Beginners gain strength fastest from full-body sessions with low frequency. You'll master the big lifts without accumulating fatigue.", workoutId: 'foundational-strength' },
                '4': { name: 'Foundational Strength+', desc: 'Four days of structured strength work with an extra accessory day.', duration: '6 weeks', session: '45 min', volume: 'Moderate', tags: ['Compound', 'Full Body'], why: 'Four days lets you hit each pattern twice weekly — the sweet spot for beginners who recover well.', workoutId: 'foundational-strength' },
                '5+': { name: 'Daily Strength Habit', desc: 'Five short sessions to build consistency. Lower per-session volume, higher frequency.', duration: '4 weeks', session: '35 min', volume: 'Low', tags: ['Compound', 'Habit'], why: 'High frequency with low volume is ideal for beginners building motor patterns.', workoutId: 'foundational-strength' },
            },
            hypertrophy: {
                '3': { name: 'Conditioning Foundation', desc: 'Build work capacity and metabolic resilience. A great introduction to structured training volume.', duration: '3 weeks', session: '30 min', volume: 'Low', tags: ['Conditioning', 'Metabolic'], why: "Beginners don't need high volume to grow. This protocol builds the work capacity you'll need for future hypertrophy programs.", workoutId: 'conditioning-foundation' },
                '4': { name: 'Beginner Hypertrophy', desc: 'Upper/lower split targeting all muscle groups twice per week.', duration: '8 weeks', session: '50 min', volume: 'Moderate', tags: ['Hypertrophy', 'Upper/Lower'], why: 'Upper/lower splits hit each muscle group twice weekly — optimal frequency for beginner hypertrophy.', workoutId: 'upper-lower-hypertrophy' },
                '5+': { name: 'High Frequency Beginner', desc: 'Five days hitting all muscle groups with rotating focus.', duration: '6 weeks', session: '45 min', volume: 'Moderate', tags: ['Hypertrophy', 'Full Body'], why: 'More sessions means more frequent mechanical tension — a powerful driver of early-stage hypertrophy.', workoutId: 'upper-lower-hypertrophy' },
            },
            conditioning: {
                '3': { name: 'Conditioning Foundation', desc: 'Build aerobic and anaerobic work capacity with 3 focused sessions weekly.', duration: '3 weeks', session: '30 min', volume: 'Low', tags: ['Conditioning', 'Aerobic'], why: 'Three days is the minimum effective dose for conditioning without risking overuse injuries.', workoutId: 'conditioning-foundation' },
                '4': { name: 'Metabolic Builder', desc: 'Four days of conditioning work to rapidly improve your fitness baseline.', duration: '4 weeks', session: '35 min', volume: 'Moderate', tags: ['Conditioning', 'Metabolic'], why: 'Four conditioning sessions weekly hits the VO2 max adaptation threshold faster.', workoutId: 'conditioning-foundation' },
                '5+': { name: 'Conditioning Intensive', desc: 'High-frequency conditioning with varied intensities.', duration: '4 weeks', session: '30 min', volume: 'High', tags: ['Conditioning', 'HIIT'], why: 'Daily conditioning with short sessions keeps quality high and fatigue manageable.', workoutId: 'conditioning-foundation' },
            },
        },
        intermediate: {
            strength: {
                '3': { name: 'Powerlifting Foundation', desc: 'Three intense days focused on the main strength lifts with smart periodization.', duration: '8 weeks', session: '60 min', volume: 'Moderate', tags: ['Strength', 'Compound'], why: 'Three days allows full CNS recovery between heavy sessions — critical at intermediate level.', workoutId: 'elite-strength' },
                '4': { name: 'Upper/Lower Strength', desc: 'Four-day upper/lower split maximizing strength across all major patterns.', duration: '10 weeks', session: '65 min', volume: 'High', tags: ['Strength', 'Upper/Lower'], why: 'Upper/lower allows higher weekly volume while keeping individual session fatigue manageable.', workoutId: 'elite-strength' },
                '5+': { name: 'Conjugate Method', desc: 'Max effort and dynamic effort days for elite strength development.', duration: '12 weeks', session: '75 min', volume: 'High', tags: ['Strength', 'Periodized'], why: 'Multiple weekly strength stimuli force consistent adaptation across all strength qualities.', workoutId: 'elite-strength' },
            },
            hypertrophy: {
                '3': { name: 'Upper/Lower Hypertrophy', desc: 'Classic upper/lower split for systematic muscle growth across all major groups.', duration: '8 weeks', session: '60 min', volume: 'High', tags: ['Hypertrophy', 'Volume'], why: 'Each muscle group hit twice weekly with sufficient volume is the research sweet spot for intermediate growth.', workoutId: 'upper-lower-hypertrophy' },
                '4': { name: 'Push/Pull/Legs Split', desc: 'Premium PPL periodized for serious hypertrophy.', duration: '12 weeks', session: '75 min', volume: 'High', tags: ['Hypertrophy', 'PPL'], why: 'PPL with 4 days allows two complete rotations weekly — enough frequency to drive continuous adaptation.', workoutId: 'ppl-split' },
                '5+': { name: 'High Volume Hypertrophy', desc: 'Five-to-six day volume maximization. Serious mass building.', duration: '12 weeks', session: '75 min', volume: 'Very High', tags: ['Hypertrophy', 'Volume'], why: 'High volume across 5-6 days accumulates maximum mechanical tension and metabolic stress.', workoutId: 'ppl-split' },
            },
            conditioning: {
                '3': { name: 'Strength-Conditioning Hybrid', desc: 'Combine strength maintenance with serious conditioning work.', duration: '6 weeks', session: '55 min', volume: 'Moderate', tags: ['Hybrid', 'Conditioning'], why: 'Three well-designed sessions can maintain strength while dramatically improving conditioning.', workoutId: 'conditioning-foundation' },
                '4': { name: 'Athletic Performance', desc: 'Four-day athletic conditioning building power, speed, and endurance.', duration: '8 weeks', session: '60 min', volume: 'High', tags: ['Athletic', 'Conditioning'], why: 'Multiple training qualities can be developed concurrently at intermediate level with smart sequencing.', workoutId: 'conditioning-foundation' },
                '5+': { name: 'Metabolic Specialist', desc: 'Five-day metabolic conditioning mastery.', duration: '8 weeks', session: '45 min', volume: 'High', tags: ['Conditioning', 'Metabolic'], why: 'High-frequency metabolic work at this stage produces rapid cardiovascular adaptations.', workoutId: 'conditioning-foundation' },
            },
        },
        advanced: {
            strength: {
                '3': { name: 'Max Strength Cycle', desc: 'Three brutal heavy sessions per week. Max effort methodology.', duration: '12 weeks', session: '80 min', volume: 'Moderate', tags: ['Strength', 'Max Effort'], why: 'Advanced lifters need maximum intensity and full recovery. Three heavy days is optimal for CNS-intensive work.', workoutId: 'elite-strength' },
                '4': { name: 'Elite Strength Protocol', desc: 'Science-backed periodization for serious lifters. Four days of intelligent intensity management.', duration: '16 weeks', session: '90 min', volume: 'High', tags: ['Strength', 'Power'], why: 'Multi-week loading blocks with integrated deloads drive continued adaptation in advanced trainees.', workoutId: 'elite-strength' },
                '5+': { name: 'Competition Periodization', desc: 'Advanced multi-phase system for peak performance.', duration: '20 weeks', session: '90 min', volume: 'Very High', tags: ['Periodized', 'Competition'], why: 'Competition peaking requires 16-20 weeks of structured phases: hypertrophy, strength, power, and peak.', workoutId: 'competition-peaking' },
            },
            hypertrophy: {
                '3': { name: 'Advanced Full Body', desc: 'Three high-density sessions maximizing muscle stimulus.', duration: '12 weeks', session: '80 min', volume: 'High', tags: ['Hypertrophy', 'Density'], why: 'Full-body training 3x weekly with advanced techniques can match the volume of 5-day splits.', workoutId: 'ppl-split' },
                '4': { name: 'Advanced PPL', desc: 'Push/pull/legs with double frequency and periodized loading.', duration: '16 weeks', session: '85 min', volume: 'Very High', tags: ['Hypertrophy', 'PPL'], why: 'Double PPL rotation ensures each muscle gets optimal stimulus twice weekly at advanced level.', workoutId: 'ppl-split' },
                '5+': { name: 'Professional Bodybuilding Split', desc: 'Six-day body-part focused split with full periodization.', duration: '20 weeks', session: '90 min', volume: 'Maximum', tags: ['Hypertrophy', 'Bodybuilding'], why: 'Dedicated body-part days allow maximum volume per muscle — required for advanced lifters.', workoutId: 'ppl-split' },
            },
            conditioning: {
                '3': { name: 'Elite Athlete Conditioning', desc: 'Three high-intensity sessions for elite-level conditioning.', duration: '10 weeks', session: '70 min', volume: 'High', tags: ['Athletic', 'Elite'], why: 'Quality over quantity at advanced levels. Three maximal-effort sessions outperform five moderate ones.', workoutId: 'conditioning-foundation' },
                '4': { name: 'Advanced Athletic Performance', desc: 'Four-day athletic performance system for the serious competitor.', duration: '12 weeks', session: '75 min', volume: 'Very High', tags: ['Athletic', 'Performance'], why: 'Advanced athletes respond to multi-modal stimuli. Four days allows periodized development of all athletic qualities.', workoutId: 'conditioning-foundation' },
                '5+': { name: 'Peak Athletic Conditioning', desc: 'Five-plus days of elite conditioning work.', duration: '16 weeks', session: '60 min', volume: 'Maximum', tags: ['Conditioning', 'Elite'], why: 'Only advanced trainees with years of base can productively handle this volume. Peak performance result.', workoutId: 'conditioning-foundation' },
            },
        },
    };

    const HOME_PROTOCOLS = {
        beginner: {
            strength: {
                '3': { name: 'Bodyweight Strength Start', desc: 'Three full-body sessions using push-ups, squats, and hinges to build real strength without any equipment.', duration: '4 weeks', session: '35 min', volume: 'Moderate', tags: ['Bodyweight', 'Full Body'], why: 'Full-body calisthenics 3x/week lets beginners master movement patterns and build foundational strength at home.', workoutId: null },
                '4': { name: 'Calisthenics Foundation+', desc: 'Four days of progressive bodyweight work covering all major movement patterns.', duration: '6 weeks', session: '40 min', volume: 'Moderate', tags: ['Bodyweight', 'Full Body'], why: 'Four sessions weekly lets beginners accumulate enough volume to drive consistent strength gains without equipment.', workoutId: null },
                '5+': { name: 'Daily Movement Habit', desc: 'Short daily bodyweight sessions to ingrain the habit and build strength simultaneously.', duration: '4 weeks', session: '25 min', volume: 'Low', tags: ['Bodyweight', 'Habit'], why: 'Frequent short sessions rapidly develop motor patterns — the key bottleneck for beginner strength gains.', workoutId: null },
            },
            hypertrophy: {
                '3': { name: 'Bodyweight Hypertrophy Intro', desc: 'High-rep calisthenics three days per week to stimulate muscle growth without any gym equipment.', duration: '4 weeks', session: '35 min', volume: 'Low', tags: ['Bodyweight', 'Hypertrophy'], why: 'Beginners can drive meaningful hypertrophy from high-rep bodyweight work — no weights needed at this stage.', workoutId: null },
                '4': { name: 'Home Upper/Lower Split', desc: 'Four-day upper/lower bodyweight split hitting every muscle group twice weekly.', duration: '8 weeks', session: '45 min', volume: 'Moderate', tags: ['Bodyweight', 'Upper/Lower'], why: 'Upper/lower frequency doubles the stimulus for each muscle — proven optimal for beginner hypertrophy.', workoutId: null },
                '5+': { name: 'High-Rep Home Training', desc: 'Five days of varied bodyweight exercises targeting hypertrophy through volume and tension.', duration: '6 weeks', session: '40 min', volume: 'Moderate', tags: ['Bodyweight', 'Volume'], why: 'More frequent sessions accumulate more total mechanical tension — a key hypertrophy driver even without weights.', workoutId: null },
            },
            conditioning: {
                '3': { name: 'Home Conditioning Start', desc: 'Three sessions of AMRAP circuits and bodyweight cardio to build your engine from scratch.', duration: '3 weeks', session: '30 min', volume: 'Low', tags: ['Bodyweight', 'Conditioning'], why: 'Three structured sessions is the minimum effective dose for building work capacity safely as a beginner.', workoutId: null },
                '4': { name: 'Metabolic Bodyweight Builder', desc: 'Four days of circuit training to rapidly elevate your cardiovascular baseline.', duration: '4 weeks', session: '30 min', volume: 'Moderate', tags: ['Bodyweight', 'Metabolic'], why: 'Four conditioning days per week hits the adaptation threshold for VO2 max without needing any equipment.', workoutId: null },
                '5+': { name: 'Daily Conditioning Habit', desc: 'Short daily circuits combining calisthenics and cardio for rapid fitness improvement.', duration: '4 weeks', session: '25 min', volume: 'High', tags: ['Bodyweight', 'HIIT'], why: 'Daily short sessions keep quality high and fatigue manageable while building strong conditioning habits.', workoutId: null },
            },
        },
        intermediate: {
            strength: {
                '3': { name: 'Weighted Calisthenics Core', desc: 'Three sessions combining advanced bodyweight progressions — archer push-ups, pistol squats, and pike presses.', duration: '8 weeks', session: '50 min', volume: 'Moderate', tags: ['Calisthenics', 'Strength'], why: 'Advanced bodyweight progressions produce real strength gains and require zero equipment beyond your own body.', workoutId: null },
                '4': { name: 'Calisthenics Strength Split', desc: 'Four-day push/pull/legs/full-body rotation using advanced calisthenics progressions.', duration: '10 weeks', session: '55 min', volume: 'High', tags: ['Calisthenics', 'Strength'], why: 'Four days provides enough frequency and volume to drive continued strength adaptation through bodyweight progressions.', workoutId: null },
                '5+': { name: 'Advanced Home Strength', desc: 'Five days of structured calisthenics with rings, dips, and plyometric progressions.', duration: '12 weeks', session: '60 min', volume: 'High', tags: ['Calisthenics', 'Periodized'], why: 'Higher frequency forces skill acquisition and strength simultaneously — the hallmark of elite calisthenics training.', workoutId: null },
            },
            hypertrophy: {
                '3': { name: 'Calisthenics Hypertrophy', desc: 'Three high-volume calisthenics sessions using supersets and drop-set progressions.', duration: '8 weeks', session: '55 min', volume: 'High', tags: ['Calisthenics', 'Hypertrophy'], why: 'Time-under-tension from advanced bodyweight progressions is a highly effective hypertrophy stimulus.', workoutId: null },
                '4': { name: 'Home PPL Bodyweight', desc: 'Push/pull/legs bodyweight split for systematic muscle growth without gym access.', duration: '10 weeks', session: '60 min', volume: 'High', tags: ['Bodyweight', 'PPL'], why: 'PPL structure ensures each muscle group gets enough frequency and volume for continued hypertrophy.', workoutId: null },
                '5+': { name: 'High Volume Home Training', desc: 'Five-day maximum-volume bodyweight program for serious muscle building.', duration: '12 weeks', session: '65 min', volume: 'Very High', tags: ['Calisthenics', 'Volume'], why: 'Accumulated volume over five days with short rest maximizes metabolic stress — a key hypertrophy mechanism.', workoutId: null },
            },
            conditioning: {
                '3': { name: 'Hybrid Home Conditioning', desc: 'Three strength-cardio hybrid sessions combining calisthenics with intervals.', duration: '6 weeks', session: '50 min', volume: 'Moderate', tags: ['Hybrid', 'Conditioning'], why: 'Combining strength work and conditioning in three sessions is the most efficient home training strategy.', workoutId: null },
                '4': { name: 'Athletic Home Performance', desc: 'Four-day athletic conditioning using plyometrics, sprints, and bodyweight circuits.', duration: '8 weeks', session: '55 min', volume: 'High', tags: ['Athletic', 'Bodyweight'], why: 'Plyometrics and sprints require no equipment yet drive powerful adaptations in power and conditioning.', workoutId: null },
                '5+': { name: 'Home Metabolic Specialist', desc: 'Five-day metabolic conditioning using EMOM, AMRAP, and Tabata formats.', duration: '8 weeks', session: '40 min', volume: 'High', tags: ['Conditioning', 'Metabolic'], why: 'Structured interval formats are as effective as gym-based conditioning for metabolic adaptation.', workoutId: null },
            },
        },
        advanced: {
            strength: {
                '3': { name: 'Elite Calisthenics Strength', desc: 'Three brutal sessions targeting planche, front lever, and one-arm push-up progressions.', duration: '12 weeks', session: '70 min', volume: 'Moderate', tags: ['Calisthenics', 'Elite'], why: 'Skill-based calisthenics at advanced level demands full recovery between sessions for CNS-intensive work.', workoutId: null },
                '4': { name: 'Advanced Home Strength Protocol', desc: 'Four-day advanced calisthenics program with loaded progressions and explosive work.', duration: '16 weeks', session: '80 min', volume: 'High', tags: ['Calisthenics', 'Strength'], why: 'Multi-week loading with integrated recovery allows continued adaptation even at advanced bodyweight strength levels.', workoutId: null },
                '5+': { name: 'Competition Calisthenics', desc: 'Five-day program targeting max-skill calisthenics for competition or peak performance.', duration: '20 weeks', session: '80 min', volume: 'Very High', tags: ['Calisthenics', 'Competition'], why: 'Skill acquisition at this level requires near-daily practice with precise volume management to peak properly.', workoutId: null },
            },
            hypertrophy: {
                '3': { name: 'Advanced Bodyweight Hypertrophy', desc: 'Three high-density sessions leveraging advanced leverage positions for maximum muscle stimulus.', duration: '12 weeks', session: '75 min', volume: 'High', tags: ['Calisthenics', 'Density'], why: 'Advanced bodyweight positions create tension comparable to heavy barbell work — effective for continued hypertrophy.', workoutId: null },
                '4': { name: 'Advanced Home PPL', desc: 'Push/pull/legs bodyweight split with double rotation and periodized progressions.', duration: '16 weeks', session: '80 min', volume: 'Very High', tags: ['Calisthenics', 'PPL'], why: 'Double PPL rotation ensures each muscle group receives twice-weekly stimulus essential for advanced hypertrophy.', workoutId: null },
                '5+': { name: 'Advanced Calisthenics Volume', desc: 'Six-day bodyweight specialization with maximum volume and skill-based movements.', duration: '20 weeks', session: '80 min', volume: 'Maximum', tags: ['Calisthenics', 'Bodybuilding'], why: 'Daily high-volume bodyweight training at this level matches the stimulus of gym splits for experienced athletes.', workoutId: null },
            },
            conditioning: {
                '3': { name: 'Elite Home Conditioning', desc: 'Three maximal-intensity sessions combining plyometrics, sprints, and complex circuits.', duration: '10 weeks', session: '65 min', volume: 'High', tags: ['Athletic', 'Elite'], why: 'Quality over quantity — three all-out sessions drive greater adaptation than five moderate ones at advanced level.', workoutId: null },
                '4': { name: 'Advanced Athletic Home Performance', desc: 'Four-day elite conditioning with sport-specific movement and energy system training.', duration: '12 weeks', session: '70 min', volume: 'Very High', tags: ['Athletic', 'Performance'], why: 'Advanced athletes benefit from multi-modal stimuli across four days to develop all conditioning qualities simultaneously.', workoutId: null },
                '5+': { name: 'Peak Home Conditioning', desc: 'Five-plus days of elite home conditioning to reach peak athletic performance.', duration: '16 weeks', session: '55 min', volume: 'Maximum', tags: ['Conditioning', 'Elite'], why: 'Only advanced athletes can productively handle this frequency. The result is elite-level home conditioning capacity.', workoutId: null },
            },
        },
    };

    window.selectBuilderOption = function(type, value, next) {
        state[type] = value;
        document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(c => c.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
        updateBuilderProgress();
        if (next === 'results') {
            setTimeout(showBuilderResults, 300);
        } else {
            setTimeout(() => {
                document.querySelectorAll('.builder-step').forEach(s => s.classList.add('hidden'));
                const el = document.getElementById(`step${next}`);
                if (el) { el.classList.remove('hidden'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
            }, 200);
        }
    };

    function updateBuilderProgress() {
        const done = ['level', 'gym', 'goal', 'frequency'].filter(s => state[s] !== null).length;
        const bar = document.getElementById('builderProgressBar');
        const label = document.getElementById('builderProgressLabel');
        if (bar) bar.style.width = `${Math.round((done / 4) * 100)}%`;
        if (label) label.textContent = `${done}/4 complete`;
    }

    // Build a workout with exactly the right number of days for the user's selections
    function generateBuilderWorkout(level, goal, freq, gym) {
        const numDays = freq === '3' ? 3 : freq === '4' ? 4 : 5;
        const capLevel = level.charAt(0).toUpperCase() + level.slice(1);
        const capGoal  = goal === 'hypertrophy' ? 'Muscle Gain' : goal.charAt(0).toUpperCase() + goal.slice(1);

        // ===== HOME / CALISTHENICS BANK =====
        if (gym === 'no') {
            const homeBank = {
                'beginner-strength': [
                    { label: 'Day 1 — Push & Squat', focus: 'Chest · Shoulders · Quads', exercises: [
                        { name: 'Push-ups',              sets:'3', reps:'8–15',      rest:'90 sec', note:'Full range, chest to floor, core braced' },
                        { name: 'Bodyweight Squat',      sets:'3', reps:'15–20',     rest:'60 sec', note:'Knees track toes, full depth, tall chest' },
                        { name: 'Glute Bridge',          sets:'3', reps:'15–20',     rest:'60 sec', note:'Squeeze glutes hard at top, pause 1 sec' },
                        { name: 'Plank',                 sets:'3', reps:'30–45 sec', rest:'60 sec', note:'Brace abs hard, neutral spine, squeeze glutes' },
                        { name: 'Superman',              sets:'3', reps:'12',         rest:'45 sec', note:'Hold 2 secs at top — lower back strengthener' },
                    ]},
                    { label: 'Day 2 — Hinge & Core', focus: 'Hamstrings · Glutes · Core', exercises: [
                        { name: 'Reverse Lunge',         sets:'3', reps:'10/side',   rest:'60 sec', note:'Controlled descent, back knee near floor' },
                        { name: 'Pike Push-up',          sets:'3', reps:'8–12',      rest:'90 sec', note:'Hips high, lower head toward floor — vertical press pattern' },
                        { name: 'Dead Bug',              sets:'3', reps:'8/side',    rest:'45 sec', note:'Lower back flat, slow and deliberate' },
                        { name: 'Mountain Climbers',     sets:'3', reps:'30 sec',    rest:'30 sec', note:'Drive knees to chest, keep hips level' },
                        { name: 'Side Plank',            sets:'3', reps:'20–30 sec/side', rest:'45 sec', note:'Stack feet or stagger for easier version' },
                    ]},
                    { label: 'Day 3 — Pull & Legs', focus: 'Back · Legs · Core', exercises: [
                        { name: 'Bodyweight Row (table)', sets:'3', reps:'8–12',     rest:'90 sec', note:'Lie under sturdy table, pull chest up to it' },
                        { name: 'Jump Squat',             sets:'3', reps:'10',        rest:'60 sec', note:'Land softly, absorb through hips and knees' },
                        { name: 'Hip Thrust (bodyweight)', sets:'3', reps:'15–20',   rest:'60 sec', note:'Shoulders on couch/chair, full hip extension' },
                        { name: 'Tricep Dips (chair)',    sets:'3', reps:'10–15',    rest:'75 sec', note:'Elbows back, controlled descent' },
                        { name: 'Bicycle Crunch',        sets:'3', reps:'12/side',   rest:'45 sec', note:'Slow and deliberate, rotate from the torso' },
                    ]},
                    { label: 'Day 4 — Upper Focus', focus: 'Chest · Shoulders · Triceps', exercises: [
                        { name: 'Diamond Push-up',       sets:'3', reps:'max',       rest:'90 sec', note:'Narrow hands, elbows track back — tricep focus' },
                        { name: 'Wide Push-up',          sets:'3', reps:'max',       rest:'90 sec', note:'Hands wide, stretches chest at bottom' },
                        { name: 'Pike Push-up',          sets:'3', reps:'8–12',      rest:'90 sec', note:'Hips high, elbows flare out slightly' },
                        { name: 'Shoulder Tap Plank',    sets:'3', reps:'10/side',   rest:'60 sec', note:'Minimize hip rotation, slow and controlled' },
                        { name: 'Superman',              sets:'3', reps:'12',         rest:'45 sec', note:'Hold at top, builds posterior chain stability' },
                    ]},
                    { label: 'Day 5 — Lower Focus', focus: 'Quads · Hamstrings · Glutes', exercises: [
                        { name: 'Bulgarian Split Squat (bodyweight)', sets:'3', reps:'8–10/side', rest:'90 sec', note:'Rear foot on chair, drive front heel down' },
                        { name: 'Glute Bridge',           sets:'3', reps:'20',        rest:'60 sec', note:'Full hip extension at top, squeeze 2 sec' },
                        { name: 'Single-Leg Calf Raise',  sets:'3', reps:'15/side',  rest:'45 sec', note:'Full range, hold wall for balance' },
                        { name: 'Lying Hamstring Curl (towel)', sets:'3', reps:'10–12', rest:'60 sec', note:'Smooth floor, towel under feet, curl heels in' },
                        { name: 'Wall Sit',              sets:'3', reps:'30–45 sec', rest:'60 sec', note:'Thighs parallel, back flat against wall' },
                    ]},
                ],
                'beginner-hypertrophy': [
                    { label: 'Day 1 — Push', focus: 'Chest · Shoulders · Triceps', exercises: [
                        { name: 'Push-ups',              sets:'4', reps:'10–20',    rest:'90 sec', note:'Full range — if too easy, elevate feet' },
                        { name: 'Pike Push-up',          sets:'3', reps:'10–15',   rest:'90 sec', note:'Targets deltoids, hips stay high' },
                        { name: 'Diamond Push-up',       sets:'3', reps:'10–15',   rest:'90 sec', note:'Tricep focus, control the eccentric' },
                        { name: 'Tricep Dips (chair)',   sets:'3', reps:'12–15',   rest:'75 sec', note:'Controlled descent, full range' },
                        { name: 'Plank',                 sets:'3', reps:'40–60 sec', rest:'60 sec', note:'Full tension, focused breathing' },
                    ]},
                    { label: 'Day 2 — Pull & Legs', focus: 'Back · Biceps · Legs', exercises: [
                        { name: 'Bodyweight Row (table)', sets:'4', reps:'10–15',   rest:'90 sec', note:'Full retraction at top, lower slow' },
                        { name: 'Bodyweight Squat',       sets:'4', reps:'20–25',  rest:'60 sec', note:'Pause 2 sec at bottom for deeper stimulus' },
                        { name: 'Glute Bridge',           sets:'4', reps:'15–20',  rest:'60 sec', note:'Drive hips fully up, squeeze 2 sec' },
                        { name: 'Reverse Lunge',          sets:'3', reps:'10/side', rest:'60 sec', note:'Controlled and deliberate each rep' },
                        { name: 'Bicycle Crunch',        sets:'3', reps:'15/side', rest:'45 sec', note:'Slow and deliberate, rotate from torso' },
                    ]},
                    { label: 'Day 3 — Full Body', focus: 'Total Volume Day', exercises: [
                        { name: 'Decline Push-up',       sets:'3', reps:'10–15',   rest:'90 sec', note:'Feet elevated — upper chest load' },
                        { name: 'Bulgarian Split Squat (bodyweight)', sets:'3', reps:'10/side', rest:'90 sec', note:'Rear foot elevated on chair' },
                        { name: 'Hip Thrust (bodyweight)', sets:'3', reps:'20',    rest:'75 sec', note:'Shoulders on chair, max glute squeeze at top' },
                        { name: 'Dead Bug',               sets:'3', reps:'10/side', rest:'45 sec', note:'Controlled, lower back pressed flat' },
                        { name: 'Mountain Climbers',      sets:'3', reps:'30 sec', rest:'30 sec', note:'Drive knees, hips level' },
                    ]},
                    { label: 'Day 4 — Push Heavy', focus: 'Chest · Shoulders · Triceps', exercises: [
                        { name: 'Push-up (paused)',      sets:'4', reps:'8–12',    rest:'90 sec', note:'2-second pause at bottom, maximizes tension' },
                        { name: 'Pike Push-up (feet elevated)', sets:'3', reps:'8–12', rest:'90 sec', note:'Harder version — more vertical press angle' },
                        { name: 'Wide Push-up',          sets:'3', reps:'15–20',   rest:'75 sec', note:'Chest stretch at bottom' },
                        { name: 'Diamond Push-up',       sets:'3', reps:'max',     rest:'90 sec', note:'Go to failure with good form' },
                        { name: 'Shoulder Tap Plank',    sets:'3', reps:'12/side', rest:'60 sec', note:'Controlled anti-rotation core work' },
                    ]},
                    { label: 'Day 5 — Legs & Core', focus: 'Quads · Hamstrings · Core', exercises: [
                        { name: 'Bulgarian Split Squat (bodyweight)', sets:'4', reps:'12–15/side', rest:'90 sec', note:'Rear foot elevated, high rep for hypertrophy' },
                        { name: 'Hip Thrust (bodyweight)', sets:'4', reps:'20–25', rest:'75 sec', note:'Shoulders elevated, squeeze hard at top' },
                        { name: 'Lying Hamstring Curl (towel)', sets:'3', reps:'12–15', rest:'75 sec', note:'Smooth floor, full range of motion' },
                        { name: 'Single-Leg Calf Raise', sets:'3', reps:'15–20/side', rest:'45 sec', note:'Full stretch at bottom' },
                        { name: 'Dead Bug',              sets:'3', reps:'10/side', rest:'45 sec', note:'Slow and deliberate, lower back flat' },
                    ]},
                ],
                'beginner-conditioning': [
                    { label: 'Day 1 — HIIT Circuit', focus: 'Full Body · Cardio', exercises: [
                        { name: 'Jumping Jacks',         sets:'3', reps:'45 sec', rest:'15 sec', note:'Warm up cardiovascular system, control breathing' },
                        { name: 'Burpees',               sets:'3', reps:'8–10',  rest:'60 sec', note:'Full extension at top, controlled lower down' },
                        { name: 'Mountain Climbers',     sets:'3', reps:'30 sec', rest:'30 sec', note:'Drive knees fast, keep hips level' },
                        { name: 'Jump Squat',            sets:'3', reps:'10',    rest:'45 sec', note:'Land softly, absorb through whole leg' },
                        { name: 'High Knees',            sets:'3', reps:'30 sec', rest:'30 sec', note:'Drive knees up to waist height, fast pace' },
                    ]},
                    { label: 'Day 2 — Strength Circuit', focus: 'Muscle Endurance', exercises: [
                        { name: 'Push-up Circuit',       sets:'3', reps:'max each variation', rest:'60 sec', note:'Wide → Regular → Diamond with no rest between' },
                        { name: 'Squat to Reverse Lunge', sets:'3', reps:'10/side', rest:'60 sec', note:'Flow from squat into alternating lunge' },
                        { name: 'Bear Crawl',            sets:'3', reps:'15m',  rest:'45 sec', note:'Hips level and low, slow and controlled' },
                        { name: 'Plank to Down-Dog',     sets:'3', reps:'10',   rest:'45 sec', note:'Alternate between plank and downward dog' },
                        { name: 'Box Step-ups',          sets:'3', reps:'12/side', rest:'45 sec', note:'Drive through heel, squeeze glute at top' },
                    ]},
                    { label: 'Day 3 — Cardio & Core', focus: 'Aerobic Capacity · Core', exercises: [
                        { name: 'Jump Rope (or mimic)', sets:'4', reps:'45 sec', rest:'15 sec', note:'Simulate jump rope movement if no rope available' },
                        { name: 'V-Ups',                 sets:'3', reps:'10–15', rest:'45 sec', note:'Reach hands toward feet, controlled movement' },
                        { name: 'Bicycle Crunch',        sets:'3', reps:'15/side', rest:'30 sec', note:'Slow and deliberate, full rotation' },
                        { name: 'Side-to-Side Hop',      sets:'3', reps:'30 sec', rest:'30 sec', note:'Small quick hops, stay light on feet' },
                        { name: 'Dead Bug',              sets:'3', reps:'8/side', rest:'45 sec', note:'Lower back pressed flat, extend opposite limbs' },
                    ]},
                    { label: 'Day 4 — Power Circuit', focus: 'Power · Speed · Endurance', exercises: [
                        { name: 'Explosive Push-up',     sets:'3', reps:'6–8', rest:'60 sec', note:'Push hard enough to clap, land soft' },
                        { name: 'Jump Squat',            sets:'4', reps:'10', rest:'45 sec', note:'Max height, absorb landing through full leg' },
                        { name: 'Burpees',               sets:'3', reps:'10', rest:'60 sec', note:'Move fast but keep form — full extension at top' },
                        { name: 'Lateral Shuffle',       sets:'3', reps:'30 sec', rest:'30 sec', note:'Stay low, quick feet, athletic stance' },
                        { name: 'Hollow Body Hold',      sets:'3', reps:'20–30 sec', rest:'30 sec', note:'Lower back flat, legs and arms extended' },
                    ]},
                    { label: 'Day 5 — Endurance', focus: 'Aerobic Base · Recovery', exercises: [
                        { name: 'Brisk Walk or Light Jog', sets:'1', reps:'20–30 min', rest:'—', note:'Conversational pace — builds aerobic base' },
                        { name: 'Bodyweight Circuit (low intensity)', sets:'2', reps:'10 each', rest:'30 sec', note:'Push-up, squat, lunge, plank — easy effort' },
                        { name: 'Hip Flexor Stretch',    sets:'1', reps:'90 sec/side', rest:'—', note:'Deep lunge, breathe into the stretch' },
                        { name: 'Child\'s Pose',         sets:'1', reps:'2 min', rest:'—', note:'Breathe deeply, relax progressively' },
                        { name: 'Hamstring Stretch',     sets:'1', reps:'90 sec/side', rest:'—', note:'Hold, do not bounce' },
                    ]},
                ],
                'intermediate-strength': [
                    { label: 'Day 1 — Push', focus: 'Chest · Shoulders · Triceps', exercises: [
                        { name: 'Decline Push-up',       sets:'4', reps:'10–15', rest:'2 min', note:'Feet elevated high — upper chest and shoulder emphasis' },
                        { name: 'Pike Push-up (feet elevated)', sets:'4', reps:'8–12', rest:'2 min', note:'Approaches handstand push-up mechanics' },
                        { name: 'Archer Push-up',        sets:'3', reps:'6–10/side', rest:'90 sec', note:'Load one arm at a time — great strength builder' },
                        { name: 'Tricep Dips',           sets:'4', reps:'10–15', rest:'90 sec', note:'Full depth, control eccentric' },
                        { name: 'Planche Lean',          sets:'3', reps:'20–30 sec', rest:'60 sec', note:'Lean forward until shoulders pass over hands' },
                    ]},
                    { label: 'Day 2 — Pull & Hinge', focus: 'Back · Biceps · Hamstrings', exercises: [
                        { name: 'Pull-ups',              sets:'5', reps:'5–8',   rest:'2.5 min', note:'Full dead hang start, chin over bar, control descent' },
                        { name: 'Chin-ups',              sets:'3', reps:'6–10',  rest:'2 min',   note:'Supinated grip, squeeze bicep at top' },
                        { name: 'Bodyweight Row',        sets:'3', reps:'10–15', rest:'90 sec', note:'Body near horizontal, pull chest to bar' },
                        { name: 'Nordic Hamstring Curl', sets:'3', reps:'5–8',   rest:'2 min',   note:'Knees anchored, lower as slow as possible' },
                        { name: 'Superman Hold',         sets:'3', reps:'10',    rest:'60 sec',  note:'Hold 3 sec, builds lower back and glute strength' },
                    ]},
                    { label: 'Day 3 — Legs', focus: 'Quads · Hamstrings · Glutes', exercises: [
                        { name: 'Pistol Squat (assisted)', sets:'4', reps:'5–8/side', rest:'2 min', note:'Hold support if needed — progress to unassisted' },
                        { name: 'Bulgarian Split Squat', sets:'3', reps:'10–12/side', rest:'90 sec', note:'Rear foot elevated, upright torso' },
                        { name: 'Hip Thrust (weighted)', sets:'4', reps:'15–20', rest:'75 sec', note:'Add weight on lap to increase difficulty' },
                        { name: 'Nordic Hamstring Curl', sets:'3', reps:'6–8',   rest:'2 min', note:'Eccentric focus — lower under control' },
                        { name: 'Single-Leg Calf Raise', sets:'4', reps:'15–20/side', rest:'45 sec', note:'Full range, slow eccentric' },
                    ]},
                    { label: 'Day 4 — Upper Strength', focus: 'Full Upper Body', exercises: [
                        { name: 'Archer Push-up',        sets:'4', reps:'8/side', rest:'90 sec', note:'Gradual progression toward one-arm push-up' },
                        { name: 'Pull-ups (weighted)',   sets:'4', reps:'6–10', rest:'2 min',    note:'Add weight via backpack when bodyweight is easy' },
                        { name: 'Handstand Hold (wall)', sets:'3', reps:'20–30 sec', rest:'90 sec', note:'Kick up against wall, build inversion strength' },
                        { name: 'Dips',                  sets:'3', reps:'10–15', rest:'90 sec', note:'Lean forward for chest, upright for triceps' },
                        { name: 'L-Sit (on chairs)',     sets:'3', reps:'10–15 sec', rest:'60 sec', note:'Legs straight out, build compression strength' },
                    ]},
                    { label: 'Day 5 — Full Body Power', focus: 'Compound Strength', exercises: [
                        { name: 'Muscle-up (or Pull-up + Dip)', sets:'5', reps:'3–5', rest:'3 min', note:'Fluid transition from pull to push, or do separately' },
                        { name: 'Pistol Squat',          sets:'3', reps:'5–8/side', rest:'2 min', note:'Full range, control the descent' },
                        { name: 'Push-up (weighted)',    sets:'3', reps:'8–12', rest:'2 min',    note:'Add backpack with books for resistance' },
                        { name: 'Dragon Flag (tuck)',    sets:'3', reps:'5–8',  rest:'2 min',    note:'Lower controlled, tuck knees if needed' },
                        { name: 'Hollow Body Hold',      sets:'3', reps:'30 sec', rest:'60 sec', note:'Full tension hold — advanced core strength' },
                    ]},
                ],
                'intermediate-hypertrophy': [
                    { label: 'Day 1 — Push (Chest/Triceps)', focus: 'Chest · Triceps · Shoulders', exercises: [
                        { name: 'Decline Push-up',       sets:'4', reps:'12–20', rest:'90 sec', note:'Feet elevated, slow eccentric for max tension' },
                        { name: 'Diamond Push-up',       sets:'3', reps:'15–20', rest:'90 sec', note:'High volume tricep focus' },
                        { name: 'Archer Push-up',        sets:'3', reps:'8–12/side', rest:'90 sec', note:'One-arm loading for strength and size' },
                        { name: 'Pike Push-up',          sets:'3', reps:'12–15', rest:'90 sec', note:'Shoulder hypertrophy without weights' },
                        { name: 'Tricep Dips',           sets:'3', reps:'12–20', rest:'75 sec', note:'Full depth, control the descent' },
                    ]},
                    { label: 'Day 2 — Pull (Back/Biceps)', focus: 'Lats · Traps · Biceps', exercises: [
                        { name: 'Pull-ups',              sets:'4', reps:'8–12',  rest:'90 sec', note:'Dead hang, full range — key back builder' },
                        { name: 'Chin-ups',              sets:'3', reps:'10–15', rest:'90 sec', note:'Supinated grip hits biceps more' },
                        { name: 'Bodyweight Row',        sets:'3', reps:'12–15', rest:'90 sec', note:'Horizontal pull — great for mid/lower traps' },
                        { name: 'Negative Pull-up',      sets:'3', reps:'5–8',   rest:'90 sec', note:'Jump to top, lower as slowly as possible' },
                        { name: 'Face Pull (towel)',     sets:'3', reps:'15–20', rest:'60 sec', note:'External rotation, pull to face level' },
                    ]},
                    { label: 'Day 3 — Legs', focus: 'Quads · Hamstrings · Glutes', exercises: [
                        { name: 'Bulgarian Split Squat', sets:'4', reps:'12–15/side', rest:'90 sec', note:'Rear foot elevated, high rep for hypertrophy' },
                        { name: 'Hip Thrust (bodyweight)', sets:'4', reps:'20–25', rest:'75 sec', note:'Shoulders elevated, drive hips fully up' },
                        { name: 'Nordic Hamstring Curl', sets:'3', reps:'6–10',  rest:'2 min',   note:'Eccentric overload — best hamstring builder at home' },
                        { name: 'Pistol Squat (assisted)', sets:'3', reps:'8–12/side', rest:'90 sec', note:'Use a support to lower resistance' },
                        { name: 'Single-Leg Calf Raise', sets:'4', reps:'15–20/side', rest:'45 sec', note:'Full stretch at bottom, slow eccentric' },
                    ]},
                    { label: 'Day 4 — Upper (Shoulders/Arms)', focus: 'Delts · Biceps · Triceps', exercises: [
                        { name: 'Handstand Push-up (wall)', sets:'4', reps:'5–10', rest:'2 min', note:'Wall-supported, head to floor, full range' },
                        { name: 'Chin-ups (paused)',    sets:'3', reps:'8–12', rest:'90 sec', note:'Pause 2 sec at top, squeeze bicep hard' },
                        { name: 'Pike Push-up (feet elevated)', sets:'3', reps:'10–15', rest:'90 sec', note:'Higher feet = more vertical = more shoulder' },
                        { name: 'Dips',                  sets:'3', reps:'12–20', rest:'75 sec', note:'Lean forward for more chest activation' },
                        { name: 'Negative Chin-up',     sets:'3', reps:'5–8',   rest:'90 sec', note:'10-second eccentric — extreme bicep tension' },
                    ]},
                    { label: 'Day 5 — Legs & Core', focus: 'Full Lower Body · Core', exercises: [
                        { name: 'Pistol Squat',          sets:'4', reps:'8–12/side', rest:'2 min', note:'Unassisted, full depth — best leg builder at home' },
                        { name: 'Glute Bridge (single leg)', sets:'3', reps:'15–20/side', rest:'75 sec', note:'Single leg increases glute recruitment' },
                        { name: 'Lying Hamstring Curl (towel)', sets:'3', reps:'12–15', rest:'75 sec', note:'Slide feet in, progress to single-leg' },
                        { name: 'Dragon Flag (tuck)',    sets:'3', reps:'8–10',  rest:'90 sec', note:'Lower controlled, tuck for easier version' },
                        { name: 'Hollow Body Rock',      sets:'3', reps:'20–30 sec', rest:'60 sec', note:'Rock gently, maintain tension throughout' },
                    ]},
                ],
                'intermediate-conditioning': [
                    { label: 'Day 1 — HIIT Power', focus: 'Power Endurance · Full Body', exercises: [
                        { name: 'Burpee Broad Jump',     sets:'4', reps:'6–8',  rest:'60 sec', note:'Explosive jump forward at top — max power' },
                        { name: 'Jump Squat',            sets:'4', reps:'12',   rest:'45 sec', note:'Max height each rep, absorb the landing' },
                        { name: 'Explosive Push-up',     sets:'4', reps:'8–10', rest:'60 sec', note:'Hands leave floor at top — upper body power' },
                        { name: 'Sprint in Place (Tabata)', sets:'8', reps:'20 sec on / 10 sec off', rest:'—', note:'Max intensity — complete all 8 rounds' },
                        { name: 'Mountain Climbers',     sets:'3', reps:'40 sec', rest:'20 sec', note:'Fast pace, maintain level hips' },
                    ]},
                    { label: 'Day 2 — Strength Circuits', focus: 'Muscle Endurance', exercises: [
                        { name: 'Pull-up',               sets:'4', reps:'max',   rest:'60 sec', note:'Max reps each set, short rest for conditioning' },
                        { name: 'Push-up',               sets:'4', reps:'max',   rest:'60 sec', note:'Max reps, controlled pace' },
                        { name: 'Pistol Squat (assisted)', sets:'4', reps:'8–10/side', rest:'60 sec', note:'Short rest — conditioning focus' },
                        { name: 'Dips',                  sets:'3', reps:'15–20', rest:'60 sec', note:'High reps, bodyweight dips' },
                        { name: 'Hollow Body Hold',      sets:'3', reps:'40 sec', rest:'30 sec', note:'Maintain tension throughout' },
                    ]},
                    { label: 'Day 3 — Cardio & Agility', focus: 'Aerobic · Speed', exercises: [
                        { name: 'Tempo Run or Jump Rope', sets:'1', reps:'20 min', rest:'—', note:'Moderate-high intensity, slightly uncomfortable pace' },
                        { name: 'Agility Pattern',       sets:'4', reps:'30 sec', rest:'30 sec', note:'Side shuffle, backpedal, sprint — change direction fast' },
                        { name: 'Jump Rope (or simulate)', sets:'4', reps:'60 sec', rest:'30 sec', note:'Double unders or fast singles' },
                        { name: 'Bear Crawl Sprints',    sets:'3', reps:'20m',   rest:'30 sec', note:'Maximum speed bear crawl — brutal finisher' },
                        { name: 'Side Shuffle',          sets:'4', reps:'30 sec', rest:'20 sec', note:'Stay athletic, quick direction changes' },
                    ]},
                    { label: 'Day 4 — Endurance Circuit', focus: 'Lactate Threshold', exercises: [
                        { name: 'Push-up + Jump Squat Circuit', sets:'5', reps:'10+10', rest:'45 sec', note:'No rest between push-up and jump squat sets' },
                        { name: 'Burpees',               sets:'4', reps:'12–15', rest:'45 sec', note:'Consistent pace, maintain form' },
                        { name: 'Alternating Lunge Jump', sets:'4', reps:'10/side', rest:'45 sec', note:'Explosive, alternate legs in air' },
                        { name: 'Pull-up',               sets:'3', reps:'max',   rest:'60 sec', note:'Max rep sets — to failure' },
                        { name: 'Plank Hold',            sets:'3', reps:'60 sec', rest:'30 sec', note:'Focus on breathing throughout' },
                    ]},
                    { label: 'Day 5 — Active Recovery', focus: 'Recovery · Mobility', exercises: [
                        { name: 'Light Walk or Easy Jog', sets:'1', reps:'20–25 min', rest:'—', note:'Conversational pace — promotes recovery' },
                        { name: 'Hip Flexor Stretch',    sets:'1', reps:'2 min/side', rest:'—', note:'Deep lunge position, breathe into it' },
                        { name: 'Thoracic Rotation',     sets:'1', reps:'10/side', rest:'—', note:'Seated, rotate upper back as far as comfortable' },
                        { name: 'Hamstring Stretch',     sets:'1', reps:'90 sec/side', rest:'—', note:'Hold, do not bounce' },
                        { name: 'Child\'s Pose',         sets:'1', reps:'3 min', rest:'—', note:'Breathe deeply, relax progressively' },
                    ]},
                ],
                'advanced-strength': [
                    { label: 'Day 1 — Max Push', focus: 'Chest · Shoulders · Triceps', exercises: [
                        { name: 'One-Arm Push-up',       sets:'5', reps:'3–5/side', rest:'3 min',   note:'Full range, keep hips square, feet wide for balance' },
                        { name: 'Handstand Push-up',     sets:'4', reps:'5–8',      rest:'2.5 min', note:'Wall-supported or freestanding — full lockout' },
                        { name: 'Archer Push-up',        sets:'3', reps:'8–10/side', rest:'2 min',  note:'Near one-arm loading, slow eccentric' },
                        { name: 'Weighted Dips',         sets:'4', reps:'6–10',     rest:'2 min',   note:'Add backpack weight — treat like a strength lift' },
                        { name: 'Pseudo Planche Push-up', sets:'3', reps:'8–12',    rest:'2 min',   note:'Lean forward so shoulders are over or past hands' },
                    ]},
                    { label: 'Day 2 — Max Pull', focus: 'Back · Biceps · Rear Delts', exercises: [
                        { name: 'Weighted Pull-up',      sets:'5', reps:'3–6',      rest:'3 min',   note:'Add significant weight — treat like a strength lift' },
                        { name: 'One-Arm Negative',      sets:'3', reps:'3–5/side', rest:'2.5 min', note:'Jump to top, lower one-arm as slow as possible' },
                        { name: 'Muscle-up',             sets:'4', reps:'3–5',      rest:'2.5 min', note:'Strict if possible — transition from pull to push' },
                        { name: 'Front Lever Tuck',      sets:'3', reps:'10–15 sec', rest:'2 min',  note:'Hold horizontal, progress tuck to full' },
                        { name: 'Weighted Bodyweight Row', sets:'3', reps:'8–12',   rest:'90 sec',  note:'Add backpack weight, horizontal pull' },
                    ]},
                    { label: 'Day 3 — Legs', focus: 'Quads · Hamstrings · Glutes', exercises: [
                        { name: 'Pistol Squat',          sets:'5', reps:'5–8/side', rest:'2 min',   note:'Full depth — add weight in backpack if easy' },
                        { name: 'Nordic Hamstring Curl', sets:'4', reps:'5–8',      rest:'2 min',   note:'Full eccentric, use arms to assist concentric' },
                        { name: 'Shrimp Squat',          sets:'3', reps:'5–8/side', rest:'2 min',   note:'Advanced single-leg squat — knee to floor' },
                        { name: 'Weighted Hip Thrust',   sets:'4', reps:'12–15',    rest:'90 sec',  note:'Heavy backpack on hips — max glute contraction' },
                        { name: 'Dragon Flag',           sets:'3', reps:'5–8',      rest:'2 min',   note:'Full body extended, lower controlled' },
                    ]},
                    { label: 'Day 4 — Skills & Upper', focus: 'Shoulder · Core · Skills', exercises: [
                        { name: 'Freestanding Handstand', sets:'5', reps:'10–20 sec', rest:'2 min', note:'Kick up and hold — build balance gradually' },
                        { name: 'L-Sit',                 sets:'4', reps:'15–30 sec', rest:'90 sec', note:'Legs straight, shoulders depressed, full compression' },
                        { name: 'Planche Lean (advanced)', sets:'3', reps:'30 sec',  rest:'90 sec', note:'Straddle planche progression — maximum lean' },
                        { name: 'Ring Dips (or Bar Dips)', sets:'3', reps:'8–12',    rest:'90 sec', note:'Rings add instability — significantly harder' },
                        { name: 'One-Arm Row',           sets:'3', reps:'8–12/side', rest:'90 sec', note:'Full range, maximize back contraction' },
                    ]},
                    { label: 'Day 5 — Full Body Power', focus: 'Power · Athleticism', exercises: [
                        { name: 'Plyometric Push-up',    sets:'4', reps:'6–8',      rest:'2 min',   note:'Maximum explosion — reach maximum height' },
                        { name: 'Pistol Squat Jump',     sets:'4', reps:'5/side',   rest:'2 min',   note:'Single-leg jump — maximum leg power' },
                        { name: 'Muscle-up (explosive)', sets:'3', reps:'5',        rest:'2.5 min', note:'Explosive transition — velocity is the stimulus' },
                        { name: 'Depth Drop to Jump',    sets:'3', reps:'5',        rest:'2 min',   note:'Step off, absorb landing, immediately jump max height' },
                        { name: 'Sprint Intervals',      sets:'6', reps:'10 sec all-out / 50 sec walk', rest:'—', note:'Maximum effort each sprint, full recovery' },
                    ]},
                ],
                'advanced-hypertrophy': [
                    { label: 'Day 1 — Push A (Chest)', focus: 'Chest · Triceps', exercises: [
                        { name: 'Archer Push-up',        sets:'4', reps:'10–15/side', rest:'2 min', note:'High volume one-arm loading for chest and triceps' },
                        { name: 'Decline Push-up (high feet)', sets:'4', reps:'15–20', rest:'90 sec', note:'Feet very high — upper chest emphasis' },
                        { name: 'Diamond Push-up',       sets:'3', reps:'20–25',  rest:'90 sec', note:'High rep tricep burnout' },
                        { name: 'Pseudo Planche Push-up', sets:'3', reps:'12–15', rest:'90 sec', note:'Advanced tension through chest' },
                        { name: 'Weighted Dips',         sets:'3', reps:'10–15',  rest:'90 sec', note:'Add backpack weight, lean for chest' },
                    ]},
                    { label: 'Day 2 — Pull A (Back/Biceps)', focus: 'Lats · Traps · Biceps', exercises: [
                        { name: 'Weighted Pull-up',      sets:'4', reps:'8–12',  rest:'90 sec', note:'Add weight, control the eccentric' },
                        { name: 'Neutral-Grip Pull-up',  sets:'3', reps:'10–15', rest:'90 sec', note:'Brachialis emphasis — great arm builder' },
                        { name: 'Bodyweight Row (feet elevated)', sets:'3', reps:'12–15', rest:'90 sec', note:'Near horizontal body — heavy mid-back work' },
                        { name: 'Negative Chin-up (10 sec)', sets:'3', reps:'5–8', rest:'2 min', note:'Slow eccentric — extreme bicep tension' },
                        { name: 'Towel Curl',            sets:'3', reps:'15–20', rest:'60 sec', note:'Use towel through a door handle for resistance' },
                    ]},
                    { label: 'Day 3 — Legs A (Quad Focus)', focus: 'Quads · Calves', exercises: [
                        { name: 'Pistol Squat (weighted)', sets:'4', reps:'8–12/side', rest:'2 min', note:'Hold weight in front for more quad emphasis' },
                        { name: 'Bulgarian Split Squat', sets:'3', reps:'15–20/side', rest:'90 sec', note:'High rep — maximum quad and glute burn' },
                        { name: 'Jump Squat (paused)',   sets:'3', reps:'10',     rest:'90 sec', note:'3-second pause at bottom, explosive up' },
                        { name: 'Single-Leg Calf Raise', sets:'5', reps:'20/side', rest:'45 sec', note:'Full range, slow eccentric every rep' },
                        { name: 'Wall Sit (weighted)',   sets:'3', reps:'45–60 sec', rest:'60 sec', note:'Add weight on lap for more resistance' },
                    ]},
                    { label: 'Day 4 — Push B (Shoulders)', focus: 'Shoulders · Triceps', exercises: [
                        { name: 'Handstand Push-up',     sets:'4', reps:'6–10',  rest:'2 min', note:'Full ROM — head to floor, press to lockout' },
                        { name: 'One-Arm Push-up (eccentric)', sets:'3', reps:'5/side', rest:'2 min', note:'Lower one-arm, push up with two — overload eccentric' },
                        { name: 'Weighted Dips',         sets:'3', reps:'12–20', rest:'90 sec', note:'Lean upright for more tricep involvement' },
                        { name: 'Pike Push-up (max angle)', sets:'3', reps:'12–15', rest:'90 sec', note:'As vertical as possible — shoulder press simulation' },
                        { name: 'Planche Lean',          sets:'3', reps:'30 sec', rest:'60 sec', note:'Maximum compression strength, progressive lean' },
                    ]},
                    { label: 'Day 5 — Legs B (Posterior)', focus: 'Hamstrings · Glutes · Core', exercises: [
                        { name: 'Nordic Hamstring Curl', sets:'4', reps:'6–10',  rest:'2 min', note:'Full eccentric — single best home hamstring builder' },
                        { name: 'Shrimp Squat',          sets:'3', reps:'8–12/side', rest:'90 sec', note:'Advanced quad and glute builder' },
                        { name: 'Weighted Hip Thrust',   sets:'4', reps:'15–20', rest:'75 sec', note:'Maximize glute contraction at top' },
                        { name: 'Dragon Flag',           sets:'3', reps:'8–12',  rest:'2 min', note:'Core strength benchmark — slow and controlled' },
                        { name: 'L-Sit',                 sets:'3', reps:'20–30 sec', rest:'90 sec', note:'Full compression, legs straight' },
                    ]},
                ],
                'advanced-conditioning': [
                    { label: 'Day 1 — Max Effort HIIT', focus: 'Power Endurance', exercises: [
                        { name: 'Burpee Pull-up',        sets:'5', reps:'8–10',   rest:'60 sec', note:'Burpee followed immediately by a pull-up — brutal combo' },
                        { name: 'Explosive Push-up',     sets:'4', reps:'8–10',   rest:'45 sec', note:'Maximum explosion, minimize contact time' },
                        { name: 'Sprint Intervals',      sets:'8', reps:'15 sec all-out / 45 sec rest', rest:'—', note:'Complete maximum effort — no holding back' },
                        { name: 'Jump Squat',            sets:'4', reps:'15',     rest:'30 sec', note:'Fast pace, land soft, reload immediately' },
                        { name: 'Mountain Climbers',     sets:'3', reps:'60 sec', rest:'20 sec', note:'Max speed, minimal hip sway' },
                    ]},
                    { label: 'Day 2 — Strength Endurance', focus: 'Calisthenics Circuits', exercises: [
                        { name: 'Pull-up (max reps)',    sets:'5', reps:'max',    rest:'60 sec', note:'Each set to failure — track total volume' },
                        { name: 'Dips (max reps)',       sets:'5', reps:'max',    rest:'60 sec', note:'Full depth, to failure' },
                        { name: 'Pistol Squat',          sets:'4', reps:'10/side', rest:'60 sec', note:'Controlled but minimal rest — conditioning focus' },
                        { name: 'Push-up',               sets:'4', reps:'max',    rest:'45 sec', note:'Max reps, full range, no partial reps' },
                        { name: 'Hollow Body Rock',      sets:'3', reps:'60 sec', rest:'30 sec', note:'Constant tension, controlled rocking' },
                    ]},
                    { label: 'Day 3 — Aerobic Power', focus: 'VO2 Max · Tempo', exercises: [
                        { name: 'Tempo Run or Cycling',  sets:'1', reps:'20–30 min', rest:'—', note:'High aerobic intensity — just below max effort' },
                        { name: 'Fartlek Intervals',     sets:'8', reps:'1 min hard / 1 min easy', rest:'—', note:'Alternate pace throughout the session' },
                        { name: 'Agility Pattern',       sets:'3', reps:'5 min', rest:'90 sec', note:'Ladder drills, direction changes, cone work' },
                        { name: 'Bear Crawl Sprints',    sets:'4', reps:'20m',   rest:'30 sec', note:'Maximum speed bear crawl — brutal finisher' },
                        { name: 'Breathing Reset',       sets:'1', reps:'5 min', rest:'—', note:'Box breathing to bring HR down' },
                    ]},
                    { label: 'Day 4 — Lactate Threshold', focus: 'Lactic Conditioning', exercises: [
                        { name: 'Death by Burpees',      sets:'1', reps:'1 burpee min 1, +1 each min until failure', rest:'—', note:'Classic EMOM ladder — go until you can\'t finish in time' },
                        { name: 'Pull-up Ladder',        sets:'1', reps:'1-2-3-4-5-4-3-2-1', rest:'30 sec between rungs', note:'Classic volume ladder, minimal rest' },
                        { name: 'Jump Squat Tabata',     sets:'8', reps:'20 sec on / 10 sec off', rest:'—', note:'4 full minutes — hold pace throughout' },
                        { name: 'Push-up Tabata',        sets:'8', reps:'20 sec on / 10 sec off', rest:'—', note:'Back to back with squat Tabata' },
                        { name: 'Plank to Failure',      sets:'1', reps:'max time', rest:'—', note:'Hold perfect form until you break — record time' },
                    ]},
                    { label: 'Day 5 — Recovery & Mobility', focus: 'Active Recovery', exercises: [
                        { name: 'Easy Jog or Walk',      sets:'1', reps:'30 min', rest:'—', note:'Conversational pace — promotes active recovery' },
                        { name: 'Dynamic Warm-Up Flow',  sets:'2', reps:'5 min each', rest:'—', note:'Leg swings, arm circles, world\'s greatest stretch' },
                        { name: 'Full Body Stretch',     sets:'1', reps:'15 min', rest:'—', note:'Hold each stretch 60–90 sec, breathe deeply' },
                        { name: 'Self-Massage / Foam Roll', sets:'1', reps:'10 min', rest:'—', note:'Glutes, quads, lats, calves — target tight spots' },
                        { name: 'Breathwork',            sets:'1', reps:'5–10 min', rest:'—', note:'4-7-8 breathing for nervous system recovery' },
                    ]},
                ],
            };

            const key = `${level}-${goal}`;
            const days = (homeBank[key] || homeBank['beginner-strength']).slice(0, numDays);
            const id = `builder-home-${level}-${goal}-${Date.now()}`;
            const progressionNotes = {
                strength: 'Progress by making exercises harder each week: add a backpack with weight, increase reps until you hit the top of the range, then find the next harder variation.',
                hypertrophy: 'Progress by increasing reps within the range each week. When you consistently hit the top of the range, move to a harder variation or add bodyweight resistance.',
                conditioning: 'Progress by reducing rest periods, increasing work intervals, or adding rounds. Track total reps/rounds each session.',
            };
            WORKOUTS[id] = {
                name: `${capLevel} Home ${capGoal}`,
                level: capLevel,
                goal: gym === 'no' ? 'Calisthenics / Bodyweight' : capGoal,
                frequency: `${numDays}x/week`,
                progressionNote: progressionNotes[goal] || progressionNotes.strength,
                days,
            };
            return id;
        }

        // Day bank: each combo has 5 days; we slice to numDays
        const dayBank = {
            'beginner-strength': [
                { label: 'Day 1 — Full Body A', focus: 'Squat & Push Focus', exercises: [
                    { name: 'Barbell Back Squat',  sets:'3', reps:'5',     rest:'3 min',  note:'Drive knees out, brace abs, full depth' },
                    { name: 'Barbell Bench Press', sets:'3', reps:'5',     rest:'3 min',  note:'Retract scapula, bar to lower chest' },
                    { name: 'Barbell Row',         sets:'3', reps:'5',     rest:'2 min',  note:'Pull to belly, keep back flat' },
                    { name: 'Dumbbell Curl',       sets:'2', reps:'10–12', rest:'60 sec', note:'Controlled eccentric, no swinging' },
                    { name: 'Plank',               sets:'3', reps:'30 sec',rest:'60 sec', note:'Squeeze glutes, neutral spine' },
                ]},
                { label: 'Day 2 — Full Body B', focus: 'Hinge & Pull Focus', exercises: [
                    { name: 'Conventional Deadlift', sets:'1', reps:'5',     rest:'4 min',  note:'Full reset each rep — this is your heaviest work' },
                    { name: 'Overhead Press',        sets:'3', reps:'5',     rest:'2 min',  note:'Brace hard, push head through at lockout' },
                    { name: 'Lat Pulldown',          sets:'3', reps:'8–10',  rest:'90 sec', note:'Pull elbows to hips, squeeze lats' },
                    { name: 'Romanian Deadlift',     sets:'3', reps:'10',    rest:'90 sec', note:'Feel stretch in hamstrings, flat back' },
                    { name: 'Face Pulls',            sets:'3', reps:'15',    rest:'60 sec', note:'Pull to forehead, external rotation' },
                ]},
                { label: 'Day 3 — Full Body A', focus: 'Squat & Push (repeat)', exercises: [
                    { name: 'Barbell Back Squat',  sets:'3', reps:'5',     rest:'3 min',  note:'Aim for same or +5 lbs from Day 1' },
                    { name: 'Barbell Bench Press', sets:'3', reps:'5',     rest:'3 min',  note:'Consistent bar path every rep' },
                    { name: 'Barbell Row',         sets:'3', reps:'5',     rest:'2 min',  note:'Control the eccentric' },
                    { name: 'Tricep Pushdown',     sets:'2', reps:'12',    rest:'60 sec', note:'Full extension, elbows pinned' },
                    { name: 'Ab Wheel Rollout',    sets:'3', reps:'8–10',  rest:'60 sec', note:'Hips level, full extension' },
                ]},
                { label: 'Day 4 — Full Body B', focus: 'Hinge & Pull (repeat)', exercises: [
                    { name: 'Conventional Deadlift', sets:'1', reps:'5',     rest:'4 min',  note:'Top set — every rep counts' },
                    { name: 'Overhead Press',        sets:'3', reps:'5',     rest:'2 min',  note:'Lock out fully overhead' },
                    { name: 'Lat Pulldown',          sets:'3', reps:'8–10',  rest:'90 sec', note:'Full stretch at top, squeeze at bottom' },
                    { name: 'Good Morning',          sets:'3', reps:'8',     rest:'90 sec', note:'Hip hinge, slight knee bend, flat back' },
                    { name: 'Rear Delt Fly',         sets:'3', reps:'15',    rest:'60 sec', note:'Light weight, feel the squeeze' },
                ]},
                { label: 'Day 5 — Technique Day', focus: 'Light Load · Movement Quality', exercises: [
                    { name: 'Goblet Squat',       sets:'3', reps:'10', rest:'90 sec', note:'60% feel — perfect form only' },
                    { name: 'Push-ups',           sets:'3', reps:'15', rest:'60 sec', note:'Slow 3-sec down, explosive up' },
                    { name: 'Dumbbell Row',       sets:'3', reps:'12', rest:'60 sec', note:'Full range each side' },
                    { name: 'Romanian Deadlift',  sets:'3', reps:'10', rest:'90 sec', note:'Light — feel the hamstring stretch' },
                    { name: 'Farmer Carry',       sets:'3', reps:'30m',rest:'60 sec', note:'Tight core, tall posture' },
                ]},
            ],

            'beginner-hypertrophy': [
                { label: 'Day 1 — Upper A', focus: 'Chest, Back & Arms', exercises: [
                    { name: 'Dumbbell Bench Press', sets:'3', reps:'10–12', rest:'90 sec', note:'Full stretch at bottom' },
                    { name: 'Dumbbell Row',         sets:'3', reps:'10–12', rest:'90 sec', note:'Drive elbow to hip' },
                    { name: 'Incline DB Press',     sets:'3', reps:'12–15', rest:'75 sec', note:'30° angle, slow eccentric' },
                    { name: 'Face Pulls',           sets:'3', reps:'15',    rest:'60 sec', note:'External rotation, rear delts' },
                    { name: 'Dumbbell Curl',        sets:'3', reps:'12',    rest:'60 sec', note:'Full supination at top' },
                    { name: 'Tricep Pushdown',      sets:'3', reps:'12–15', rest:'60 sec', note:'Pin elbows, full extension' },
                ]},
                { label: 'Day 2 — Lower A', focus: 'Quads, Glutes & Core', exercises: [
                    { name: 'Barbell Back Squat', sets:'3', reps:'8–10',  rest:'2 min',  note:'Full depth, knees track toes' },
                    { name: 'Leg Press',          sets:'3', reps:'12–15', rest:'90 sec', note:'Full range, no knee lock' },
                    { name: 'Walking Lunge',      sets:'3', reps:'10/side',rest:'75 sec', note:'Long stride for glute emphasis' },
                    { name: 'Leg Curl',           sets:'3', reps:'12–15', rest:'60 sec', note:'Slow negative each rep' },
                    { name: 'Calf Raise',         sets:'4', reps:'20',    rest:'45 sec', note:'Full range, pause at bottom' },
                ]},
                { label: 'Day 3 — Upper B', focus: 'Shoulders, Back & Arms', exercises: [
                    { name: 'Overhead Press',   sets:'3', reps:'8–10',  rest:'2 min',  note:'Brace core, full lockout' },
                    { name: 'Lat Pulldown',     sets:'3', reps:'10–12', rest:'90 sec', note:'Pull elbows to ribs' },
                    { name: 'Lateral Raise',    sets:'3', reps:'15–20', rest:'60 sec', note:'Lead with pinkies, slight lean' },
                    { name: 'Cable Row',        sets:'3', reps:'12',    rest:'75 sec', note:'Chest proud, retract scapula' },
                    { name: 'Hammer Curl',      sets:'2', reps:'12',    rest:'60 sec', note:'Neutral grip, full range' },
                    { name: 'Skull Crushers',   sets:'2', reps:'12',    rest:'60 sec', note:'Lower to forehead, slow and controlled' },
                ]},
                { label: 'Day 4 — Lower B', focus: 'Hamstrings, Glutes & Core', exercises: [
                    { name: 'Conventional Deadlift', sets:'3', reps:'6–8',   rest:'2.5 min', note:'Heaviest lower body day' },
                    { name: 'Romanian Deadlift',     sets:'4', reps:'10–12', rest:'90 sec',  note:'Max hamstring stretch each rep' },
                    { name: 'Hip Thrust',            sets:'3', reps:'12–15', rest:'90 sec',  note:'Drive through heel, squeeze glute' },
                    { name: 'Leg Curl',              sets:'3', reps:'12–15', rest:'60 sec',  note:'Slow 3-sec negative' },
                    { name: 'Ab Wheel Rollout',      sets:'3', reps:'8–10',  rest:'60 sec',  note:'Level hips throughout' },
                ]},
                { label: 'Day 5 — Full Body', focus: 'Volume Finisher', exercises: [
                    { name: 'Goblet Squat',      sets:'3', reps:'12',    rest:'75 sec', note:'Moderate weight, clean reps' },
                    { name: 'DB Bench Press',    sets:'3', reps:'12',    rest:'75 sec', note:'Squeeze chest at top' },
                    { name: 'Lat Pulldown',      sets:'3', reps:'12',    rest:'75 sec', note:'Full range of motion' },
                    { name: 'Lateral Raise',     sets:'3', reps:'15',    rest:'60 sec', note:'Shoulder health and width' },
                    { name: 'Plank',             sets:'3', reps:'45 sec',rest:'60 sec', note:'Full body tension' },
                ]},
            ],

            'beginner-conditioning': [
                { label: 'Day 1 — Strength Circuit', focus: 'Full Body · Strength Endurance', exercises: [
                    { name: 'Goblet Squat',  sets:'3', reps:'12–15',           rest:'60 sec', note:'Tall chest, elbows in' },
                    { name: 'Push-ups',      sets:'3', reps:'Max (good form)',  rest:'60 sec', note:'Full range, core tight' },
                    { name: 'Dumbbell Row',  sets:'3', reps:'12/side',          rest:'60 sec', note:'Pull elbow to hip' },
                    { name: 'Reverse Lunge', sets:'3', reps:'10/side',          rest:'60 sec', note:'Controlled descent' },
                    { name: 'Dead Bug',      sets:'3', reps:'8/side',           rest:'45 sec', note:'Back flat to floor' },
                ]},
                { label: 'Day 2 — Metabolic Cardio', focus: 'Aerobic Capacity', exercises: [
                    { name: 'Jump Rope / Jumping Jacks', sets:'4', reps:'45 sec on / 15 off', rest:'—',     note:'Keep rhythm steady' },
                    { name: 'Mountain Climbers',         sets:'4', reps:'30 sec',             rest:'30 sec', note:'Drive knees to chest' },
                    { name: 'Burpees',                   sets:'3', reps:'8–10',              rest:'60 sec', note:'Full extension at top' },
                    { name: 'Box Step-ups',              sets:'3', reps:'12/side',           rest:'45 sec', note:'Drive through heel' },
                    { name: 'Bear Crawl',                sets:'3', reps:'20m',               rest:'45 sec', note:'Hips level, slow control' },
                ]},
                { label: 'Day 3 — Strength Circuit B', focus: 'Push & Core Focus', exercises: [
                    { name: 'Dumbbell Squat',    sets:'3', reps:'15',   rest:'60 sec', note:'Heels planted, sit tall' },
                    { name: 'DB Shoulder Press', sets:'3', reps:'12',   rest:'60 sec', note:'Full overhead extension' },
                    { name: 'Lat Pulldown',      sets:'3', reps:'12',   rest:'60 sec', note:'Squeeze lats at bottom' },
                    { name: 'Hip Thrust',        sets:'3', reps:'15',   rest:'60 sec', note:'Full glute squeeze at top' },
                    { name: 'Plank',             sets:'3', reps:'30 sec',rest:'45 sec', note:'Rigid from head to heel' },
                ]},
                { label: 'Day 4 — HIIT Intervals', focus: 'High Intensity Work Capacity', exercises: [
                    { name: 'Sprint Intervals',   sets:'6', reps:'20 sec sprint / 40 sec walk', rest:'—', note:'90% effort on sprints' },
                    { name: 'Squat Jumps',        sets:'4', reps:'10',                          rest:'45 sec', note:'Soft landing, full depth' },
                    { name: 'Push-up to Row',     sets:'3', reps:'8',                           rest:'60 sec', note:'Push-up then DB row each side' },
                    { name: 'Lateral Shuffles',   sets:'4', reps:'20 sec',                      rest:'30 sec', note:'Stay low, quick feet' },
                    { name: 'Cool-down Walk',     sets:'1', reps:'5 min',                       rest:'—',      note:'Gradual HR reduction' },
                ]},
                { label: 'Day 5 — Active Recovery', focus: 'Mobility & Light Cardio', exercises: [
                    { name: 'Steady-state Walk/Jog', sets:'1', reps:'20 min', rest:'—',     note:'Conversational pace' },
                    { name: 'World\'s Greatest Stretch', sets:'3', reps:'5/side', rest:'—', note:'Thoracic rotation' },
                    { name: 'Glute Bridge',          sets:'3', reps:'15',       rest:'30 sec', note:'Activate glutes, no low back arch' },
                    { name: 'Cat-Cow',               sets:'3', reps:'10',       rest:'—',      note:'Controlled breathing' },
                    { name: 'Couch Stretch',         sets:'2', reps:'60 sec/side', rest:'—',  note:'Hip flexor release' },
                ]},
            ],

            'intermediate-strength': [
                { label: 'Day 1 — Squat', focus: 'Primary: Squat · Volume: Posterior Chain', exercises: [
                    { name: 'Barbell Back Squat',  sets:'5', reps:'3–5 @RPE8', rest:'3–4 min', note:'Competition stance and depth every rep' },
                    { name: 'Pause Squat',         sets:'3', reps:'3',         rest:'3 min',   note:'2-sec pause at bottom, builds bottom-end strength' },
                    { name: 'Romanian Deadlift',   sets:'4', reps:'6–8',       rest:'2.5 min', note:'Posterior chain volume for squat carryover' },
                    { name: 'Leg Press',           sets:'3', reps:'10–12',     rest:'90 sec',  note:'Quad volume finisher' },
                    { name: 'Leg Curl',            sets:'3', reps:'10–12',     rest:'90 sec',  note:'Hamstring balance work' },
                ]},
                { label: 'Day 2 — Bench', focus: 'Primary: Bench Press · Volume: Triceps', exercises: [
                    { name: 'Barbell Bench Press',  sets:'5', reps:'3–5 @RPE8', rest:'3 min',   note:'Leg drive, tight setup, controlled descent' },
                    { name: 'Close-Grip Bench',     sets:'3', reps:'5–6',       rest:'2.5 min', note:'Tricep intensive — elbows in tight' },
                    { name: 'Overhead Press',       sets:'4', reps:'6–8',       rest:'2 min',   note:'Upper chest and shoulder accessory' },
                    { name: 'Dumbbell Row',         sets:'4', reps:'8–10',      rest:'2 min',   note:'Lat strength supports bench' },
                    { name: 'Tricep Pushdown',      sets:'3', reps:'12–15',     rest:'60 sec',  note:'Volume finisher for lockout strength' },
                ]},
                { label: 'Day 3 — Deadlift', focus: 'Primary: Deadlift · Volume: Back', exercises: [
                    { name: 'Conventional Deadlift', sets:'3', reps:'3–5 @RPE8', rest:'4 min',   note:'Max effort — take every set seriously' },
                    { name: 'Deficit Deadlift',      sets:'3', reps:'4',         rest:'3 min',   note:'2-inch deficit, builds off-floor strength' },
                    { name: 'Barbell Row',           sets:'4', reps:'6–8',       rest:'2 min',   note:'Heavy row, pull to lower chest' },
                    { name: 'Lat Pulldown',          sets:'3', reps:'10–12',     rest:'90 sec',  note:'Lat width and pulling strength' },
                    { name: 'Face Pulls',            sets:'4', reps:'15–20',     rest:'60 sec',  note:'Shoulder health and rear delt volume' },
                ]},
                { label: 'Day 4 — Upper Accessories', focus: 'Press & Pull Volume', exercises: [
                    { name: 'Incline Bench Press',  sets:'4', reps:'6–8',   rest:'2 min',   note:'Upper chest development' },
                    { name: 'Cable Row',            sets:'4', reps:'10–12', rest:'90 sec',  note:'Mid-back volume' },
                    { name: 'Lateral Raise',        sets:'4', reps:'15–20', rest:'60 sec',  note:'Shoulder width and health' },
                    { name: 'Dumbbell Curl',        sets:'3', reps:'10–12', rest:'60 sec',  note:'Bicep accessory' },
                    { name: 'Skull Crushers',       sets:'3', reps:'10–12', rest:'60 sec',  note:'Tricep mass and lockout' },
                ]},
                { label: 'Day 5 — Lower Accessories', focus: 'Leg Volume & Core', exercises: [
                    { name: 'Front Squat',      sets:'4', reps:'4–6',   rest:'3 min',   note:'Quad and upper back demand — harder than it looks' },
                    { name: 'Good Morning',     sets:'3', reps:'6–8',   rest:'2.5 min', note:'Hip hinge mastery, back strength' },
                    { name: 'Leg Press',        sets:'4', reps:'10–12', rest:'90 sec',  note:'High-foot placement for posterior chain' },
                    { name: 'Nordic Curl',      sets:'3', reps:'5–6',   rest:'2 min',   note:'Eccentric hamstring strength' },
                    { name: 'Ab Wheel Rollout', sets:'4', reps:'8–10',  rest:'60 sec',  note:'Anti-extension core strength' },
                ]},
            ],

            'intermediate-hypertrophy': [
                { label: 'Day 1 — Push A', focus: 'Chest, Shoulders & Triceps', exercises: [
                    { name: 'Barbell Bench Press', sets:'4', reps:'6–8',   rest:'2.5 min', note:'Focus on chest stretch at bottom' },
                    { name: 'Incline DB Press',    sets:'3', reps:'10–12', rest:'90 sec',  note:'30–45° incline, full stretch' },
                    { name: 'Overhead Press',      sets:'3', reps:'8–10',  rest:'2 min',   note:'Brace abs, full lockout' },
                    { name: 'Lateral Raise',       sets:'4', reps:'15–20', rest:'60 sec',  note:'Slight forward lean, lead with pinkies' },
                    { name: 'Tricep Pushdown',     sets:'3', reps:'12–15', rest:'60 sec',  note:'Full elbow extension' },
                ]},
                { label: 'Day 2 — Pull A', focus: 'Back & Biceps', exercises: [
                    { name: 'Barbell Row',    sets:'4', reps:'6–8',   rest:'2.5 min', note:'Pull to belly button, lead elbows' },
                    { name: 'Lat Pulldown',  sets:'3', reps:'10–12', rest:'90 sec',  note:'Full stretch at top' },
                    { name: 'Cable Row',     sets:'3', reps:'10–12', rest:'90 sec',  note:'Retract scapula at peak' },
                    { name: 'Face Pulls',    sets:'3', reps:'15–20', rest:'60 sec',  note:'External rotation and rear delts' },
                    { name: 'Barbell Curl',  sets:'3', reps:'8–10',  rest:'75 sec',  note:'Strict form, full supination' },
                ]},
                { label: 'Day 3 — Legs A', focus: 'Quads, Hamstrings & Glutes', exercises: [
                    { name: 'Barbell Back Squat', sets:'4', reps:'6–10',  rest:'2.5 min', note:'Depth and control — primary leg builder' },
                    { name: 'Romanian Deadlift',  sets:'4', reps:'10–12', rest:'2 min',   note:'Maximal hamstring tension' },
                    { name: 'Leg Press',          sets:'3', reps:'12–15', rest:'90 sec',  note:'High volume quad work' },
                    { name: 'Walking Lunge',      sets:'3', reps:'10/side',rest:'75 sec', note:'Long stride for glute emphasis' },
                    { name: 'Leg Curl',           sets:'3', reps:'12–15', rest:'60 sec',  note:'Slow 3-second negative' },
                ]},
                { label: 'Day 4 — Push B', focus: 'Upper Chest & Shoulder Volume', exercises: [
                    { name: 'Incline Barbell Press', sets:'4', reps:'6–8',   rest:'2.5 min', note:'Steep incline for upper chest' },
                    { name: 'Dumbbell Fly',          sets:'3', reps:'12–15', rest:'75 sec',  note:'Controlled stretch, slight bend in elbow' },
                    { name: 'DB Shoulder Press',     sets:'4', reps:'10–12', rest:'90 sec',  note:'Full overhead range' },
                    { name: 'Rear Delt Fly',         sets:'3', reps:'15–20', rest:'60 sec',  note:'Shoulder health work' },
                    { name: 'Overhead Tricep Ext',   sets:'3', reps:'12–15', rest:'60 sec',  note:'Long head emphasis' },
                ]},
                { label: 'Day 5 — Pull B & Legs', focus: 'Back Volume & Posterior Chain', exercises: [
                    { name: 'Pull-ups',        sets:'4', reps:'6–10',  rest:'2 min',   note:'Full hang at bottom, chin clears bar' },
                    { name: 'Deadlift',        sets:'3', reps:'4–6',   rest:'3 min',   note:'Heavy — posterior chain stimulus' },
                    { name: 'Hip Thrust',      sets:'4', reps:'10–12', rest:'90 sec',  note:'Full glute squeeze, drive through heel' },
                    { name: 'Hammer Curl',     sets:'3', reps:'10–12', rest:'60 sec',  note:'Brachialis emphasis' },
                    { name: 'Calf Raise',      sets:'4', reps:'15–20', rest:'45 sec',  note:'Full range, pause at bottom' },
                ]},
            ],

            'intermediate-conditioning': [
                { label: 'Day 1 — HIIT', focus: 'Anaerobic Capacity', exercises: [
                    { name: 'Assault Bike / Rower', sets:'8', reps:'20 sec all-out / 40 sec easy', rest:'—', note:'True max effort on work intervals' },
                    { name: 'Box Jump',             sets:'4', reps:'5',                             rest:'90 sec', note:'Soft landing, step down' },
                    { name: 'Barbell Thruster',     sets:'4', reps:'8',                             rest:'90 sec', note:'Squat to press, explosive' },
                    { name: 'Burpee Pull-up',       sets:'3', reps:'6',                             rest:'90 sec', note:'Full extension, explosive pull' },
                    { name: 'Sprint',               sets:'4', reps:'100m',                          rest:'2 min',  note:'Near max effort' },
                ]},
                { label: 'Day 2 — Strength Circuit', focus: 'Work Capacity & Strength', exercises: [
                    { name: 'Deadlift',          sets:'4', reps:'5 @75%', rest:'2 min',   note:'Strength maintenance' },
                    { name: 'Push-up Ladder',    sets:'1', reps:'10-8-6-4-2', rest:'30 sec between',  note:'Descending reps' },
                    { name: 'Kettlebell Swing',  sets:'5', reps:'15',    rest:'60 sec', note:'Hip drive, not a squat' },
                    { name: 'TRX Row',           sets:'4', reps:'12',    rest:'60 sec', note:'Body at 45°, retract scapula' },
                    { name: 'Farmer Carry',      sets:'4', reps:'40m',   rest:'75 sec', note:'Heavy, tight core, tall posture' },
                ]},
                { label: 'Day 3 — Tempo Run / Row', focus: 'Aerobic Threshold', exercises: [
                    { name: 'Warm-up Jog',        sets:'1', reps:'5 min',  rest:'—', note:'Build to tempo pace' },
                    { name: 'Tempo Run / Row',    sets:'1', reps:'20 min at 75% max HR', rest:'—', note:'Uncomfortable but sustainable' },
                    { name: 'Stair Climbs',       sets:'4', reps:'2 min',  rest:'60 sec', note:'Steady aggressive pace' },
                    { name: 'Walking Lunge',      sets:'3', reps:'20m',    rest:'45 sec', note:'Keep moving' },
                    { name: 'Cool-down Stretch',  sets:'1', reps:'5 min',  rest:'—',      note:'Focus on hip flexors and calves' },
                ]},
                { label: 'Day 4 — Power & Plyometrics', focus: 'Explosive Athleticism', exercises: [
                    { name: 'Broad Jump',         sets:'5', reps:'3',  rest:'2 min',  note:'Max distance, stick the landing' },
                    { name: 'Medicine Ball Slam', sets:'4', reps:'8',  rest:'90 sec', note:'Full overhead extension, max power' },
                    { name: 'Lateral Bound',      sets:'4', reps:'5/side', rest:'90 sec', note:'Stick each landing for 1 second' },
                    { name: 'Barbell Clean',      sets:'4', reps:'3',  rest:'2 min',  note:'Power from hips, fast elbows' },
                    { name: 'Sprint Shuttle',     sets:'5', reps:'5-10-5m', rest:'90 sec', note:'Touch the line each turn' },
                ]},
                { label: 'Day 5 — Active Recovery', focus: 'Aerobic Base & Mobility', exercises: [
                    { name: 'Zone 2 Cardio',         sets:'1', reps:'30 min', rest:'—',       note:'Easy pace — can hold full conversation' },
                    { name: 'Hip Flexor Stretch',     sets:'3', reps:'60 sec/side', rest:'—',  note:'Couch stretch variation' },
                    { name: 'Thoracic Rotation',      sets:'3', reps:'10/side',    rest:'—',   note:'Open up the upper back' },
                    { name: 'Single-leg Balance',     sets:'3', reps:'30 sec/side', rest:'—',  note:'Eyes closed for challenge' },
                    { name: 'Foam Roll (full body)',  sets:'1', reps:'10 min',      rest:'—',  note:'Focus on calves, quads, lats' },
                ]},
            ],

            'advanced-strength': [
                { label: 'Day 1 — Max Effort Lower', focus: 'Squat Variation · Max Effort', exercises: [
                    { name: 'Competition Squat',     sets:'1', reps:'1–3 @RPE9–10', rest:'5 min',   note:'Working up to a true max or near-max' },
                    { name: 'Safety Bar Squat',      sets:'3', reps:'3',            rest:'3 min',   note:'Variation to reduce CNS demand' },
                    { name: 'Romanian Deadlift',     sets:'4', reps:'5',            rest:'2.5 min', note:'Heavy, hamstring-dominant' },
                    { name: 'Leg Press',             sets:'3', reps:'8–10',         rest:'2 min',   note:'Quad volume' },
                    { name: 'Reverse Hyper',         sets:'4', reps:'15',           rest:'60 sec',  note:'Posterior chain recovery and strength' },
                ]},
                { label: 'Day 2 — Max Effort Upper', focus: 'Bench Variation · Max Effort', exercises: [
                    { name: 'Board Press / Floor Press', sets:'1', reps:'1–3 @RPE9–10', rest:'5 min',   note:'Variation — builds specific weakness' },
                    { name: 'Close-Grip Bench Press',    sets:'3', reps:'3–5',          rest:'3 min',   note:'Tricep intensive' },
                    { name: 'Barbell Row',               sets:'4', reps:'5–6',          rest:'2.5 min', note:'Heavy row, upper back strength' },
                    { name: 'Overhead Press',            sets:'3', reps:'5',            rest:'2.5 min', note:'Shoulder strength accessory' },
                    { name: 'Dumbbell Row',              sets:'3', reps:'8',            rest:'2 min',   note:'Lat and scapular retraction' },
                ]},
                { label: 'Day 3 — Dynamic Effort Lower', focus: 'Deadlift Speed Work', exercises: [
                    { name: 'Speed Deadlift',     sets:'8', reps:'2 @60%', rest:'90 sec', note:'Bar speed is the goal — move it fast' },
                    { name: 'Good Morning',       sets:'4', reps:'5',      rest:'2.5 min', note:'Heavy, spinal erector strength' },
                    { name: 'Front Squat',        sets:'3', reps:'3–4',    rest:'3 min',   note:'Quad and upper back demand' },
                    { name: 'Nordic Curl',        sets:'3', reps:'5',      rest:'2 min',   note:'Eccentric hamstring strength' },
                    { name: 'Ab Wheel Rollout',   sets:'4', reps:'8–10',   rest:'60 sec',  note:'Anti-extension core' },
                ]},
                { label: 'Day 4 — Dynamic Effort Upper', focus: 'Bench Speed Work', exercises: [
                    { name: 'Speed Bench Press',   sets:'9', reps:'3 @50%', rest:'60 sec', note:'Submaximal speed — maintain bar path' },
                    { name: 'JM Press',            sets:'4', reps:'5',      rest:'2 min',  note:'Tricep power specific to bench' },
                    { name: 'Lat Pulldown',        sets:'4', reps:'8–10',   rest:'90 sec', note:'Lat volume and strength' },
                    { name: 'Lateral Raise',       sets:'4', reps:'15',     rest:'60 sec', note:'Shoulder health, rotator cuff' },
                    { name: 'Face Pulls',          sets:'4', reps:'20',     rest:'60 sec', note:'Rear delt and external rotation' },
                ]},
                { label: 'Day 5 — Accessory & Weak Points', focus: 'Targeted Accessory Work', exercises: [
                    { name: 'Pause Squat',       sets:'4', reps:'3 @70%', rest:'3 min',   note:'2-sec pause, confidence out of the hole' },
                    { name: 'Incline DB Press',  sets:'4', reps:'10',     rest:'90 sec',  note:'Upper chest for competition bench' },
                    { name: 'Pull-ups',          sets:'4', reps:'8–10',   rest:'2 min',   note:'Bodyweight strength' },
                    { name: 'GHD Raise',         sets:'3', reps:'10',     rest:'2 min',   note:'Lumbar and hamstring strength' },
                    { name: 'Dumbbell Curl',     sets:'3', reps:'12',     rest:'60 sec',  note:'Elbow health and bicep volume' },
                ]},
            ],

            'advanced-hypertrophy': [
                { label: 'Day 1 — Chest & Triceps', focus: 'Maximum Chest Volume', exercises: [
                    { name: 'Barbell Bench Press',   sets:'4', reps:'4–6',   rest:'3 min',   note:'Heavy — progressive overload focus' },
                    { name: 'Incline Bench Press',   sets:'4', reps:'6–8',   rest:'2.5 min', note:'Upper chest priority' },
                    { name: 'Dumbbell Fly',          sets:'3', reps:'12–15', rest:'75 sec',  note:'Deep stretch at bottom' },
                    { name: 'Cable Crossover',       sets:'3', reps:'15–20', rest:'60 sec',  note:'Peak contraction focus' },
                    { name: 'Tricep Pushdown',       sets:'4', reps:'12–15', rest:'60 sec',  note:'Full extension' },
                    { name: 'Overhead Tricep Ext',   sets:'3', reps:'12–15', rest:'60 sec',  note:'Long head emphasis' },
                ]},
                { label: 'Day 2 — Back & Biceps', focus: 'Maximum Back Volume', exercises: [
                    { name: 'Deadlift',       sets:'3', reps:'4–6',   rest:'3 min',   note:'Heavy — strength base for hypertrophy' },
                    { name: 'Pull-ups',       sets:'4', reps:'8–12',  rest:'2 min',   note:'Full hang, chin clears bar' },
                    { name: 'Barbell Row',    sets:'4', reps:'6–8',   rest:'2.5 min', note:'Heavy row, lat focus' },
                    { name: 'Cable Row',      sets:'3', reps:'12–15', rest:'75 sec',  note:'Mid-back and rhomboids' },
                    { name: 'Barbell Curl',   sets:'4', reps:'8–10',  rest:'75 sec',  note:'Strict form, full supination' },
                    { name: 'Incline Curl',   sets:'3', reps:'10–12', rest:'60 sec',  note:'Long head bicep stretch' },
                ]},
                { label: 'Day 3 — Shoulders & Traps', focus: 'Delt Specialization', exercises: [
                    { name: 'Overhead Press',    sets:'4', reps:'5–8',   rest:'2.5 min', note:'Build foundation of shoulder mass' },
                    { name: 'Dumbbell Press',    sets:'4', reps:'10–12', rest:'90 sec',  note:'Full range of motion' },
                    { name: 'Lateral Raise',     sets:'5', reps:'15–20', rest:'60 sec',  note:'Side delt — the width builder' },
                    { name: 'Rear Delt Fly',     sets:'4', reps:'15–20', rest:'60 sec',  note:'Posterior chain and health' },
                    { name: 'Barbell Shrug',     sets:'4', reps:'12–15', rest:'75 sec',  note:'Full trap contraction, slight pause' },
                ]},
                { label: 'Day 4 — Legs', focus: 'Maximum Leg Volume', exercises: [
                    { name: 'Barbell Squat',      sets:'5', reps:'5–8',   rest:'3 min',   note:'Primary quad and glute stimulus' },
                    { name: 'Leg Press',          sets:'4', reps:'12–15', rest:'2 min',   note:'Volume without spinal load' },
                    { name: 'Romanian Deadlift',  sets:'4', reps:'8–12',  rest:'2 min',   note:'Full hamstring stretch' },
                    { name: 'Leg Extension',      sets:'4', reps:'15–20', rest:'60 sec',  note:'Quad isolation at peak contraction' },
                    { name: 'Leg Curl',           sets:'4', reps:'12–15', rest:'60 sec',  note:'Slow eccentric' },
                    { name: 'Calf Raise',         sets:'5', reps:'15–20', rest:'45 sec',  note:'Full range — calves are stubborn' },
                ]},
                { label: 'Day 5 — Arms & Weak Points', focus: 'Arm Specialization', exercises: [
                    { name: 'Barbell Curl',         sets:'4', reps:'8–10',  rest:'75 sec', note:'Peak bicep development' },
                    { name: 'Incline DB Curl',      sets:'3', reps:'10–12', rest:'60 sec', note:'Long head stretch' },
                    { name: 'Skull Crushers',       sets:'4', reps:'8–12',  rest:'75 sec', note:'Tricep mass' },
                    { name: 'Dips',                 sets:'3', reps:'10–15', rest:'90 sec', note:'Bodyweight tricep and chest' },
                    { name: 'Hammer Curl',          sets:'3', reps:'12',    rest:'60 sec', note:'Brachialis and forearms' },
                    { name: 'Tricep Kickback',      sets:'3', reps:'15',    rest:'45 sec', note:'Full extension, peak contraction' },
                ]},
            ],

            'advanced-conditioning': [
                { label: 'Day 1 — VO2 Max Intervals', focus: 'Maximum Aerobic Power', exercises: [
                    { name: 'Rower / Bike VO2 Intervals', sets:'5', reps:'3 min @95% / 3 min easy', rest:'—', note:'True VO2 max effort on work sets' },
                    { name: 'Box Jump',                   sets:'4', reps:'5',  rest:'2 min',  note:'Max height, absorb landing' },
                    { name: 'Power Clean',                sets:'4', reps:'3',  rest:'2 min',  note:'Explosive full extension' },
                    { name: 'Sprint',                     sets:'3', reps:'200m',rest:'3 min', note:'Near-max speed' },
                    { name: 'Medicine Ball Throw',        sets:'4', reps:'6',  rest:'90 sec', note:'Against wall, rotational power' },
                ]},
                { label: 'Day 2 — Strength Endurance', focus: 'High-Rep Compound Work', exercises: [
                    { name: 'Barbell Complex',  sets:'5', reps:'6 each: Row/Clean/Front Squat/Press', rest:'3 min', note:'One barbell, no rest between moves' },
                    { name: 'Weighted Pull-up', sets:'5', reps:'5',   rest:'2 min',  note:'Add load progressively' },
                    { name: 'KB Swing',         sets:'6', reps:'15',  rest:'60 sec', note:'Hip-driven, explosive' },
                    { name: 'Push-up',          sets:'4', reps:'25',  rest:'60 sec', note:'Maintain rigid plank' },
                    { name: 'Farmer Carry',     sets:'4', reps:'50m', rest:'90 sec', note:'Heavy, compete against yourself' },
                ]},
                { label: 'Day 3 — Tempo Threshold', focus: 'Lactate Threshold Training', exercises: [
                    { name: 'Threshold Run / Row', sets:'1', reps:'30 min @85% max HR', rest:'—',      note:'Comfortably uncomfortable — hold it' },
                    { name: 'Stair Climbs',        sets:'5', reps:'3 min aggressive', rest:'90 sec',   note:'No stopping on the climb' },
                    { name: 'Sled Push',           sets:'6', reps:'20m @heavy',       rest:'90 sec',   note:'Drive through and stay forward-lean' },
                    { name: 'Cool-down',           sets:'1', reps:'10 min walk',       rest:'—',        note:'Gradual heart rate recovery' },
                ]},
                { label: 'Day 4 — Power & Speed', focus: 'Explosive Athletic Development', exercises: [
                    { name: 'Depth Jump',         sets:'5', reps:'3',    rest:'2 min',  note:'Step off box, immediate reactive jump' },
                    { name: 'Hang Power Clean',   sets:'5', reps:'3',    rest:'2.5 min',note:'Explosive hip extension' },
                    { name: 'Broad Jump',         sets:'5', reps:'3',    rest:'2 min',  note:'Max distance, stick landing 1 sec' },
                    { name: '40m Sprint',         sets:'6', reps:'1',    rest:'3 min',  note:'Absolute max velocity' },
                    { name: 'Lateral Bound',      sets:'4', reps:'4/side',rest:'90 sec',note:'Stick each landing' },
                ]},
                { label: 'Day 5 — Zone 2 & Mobility', focus: 'Recovery & Base Building', exercises: [
                    { name: 'Zone 2 Cardio',         sets:'1', reps:'40–50 min', rest:'—',          note:'Nose-breathing only pace' },
                    { name: 'Hip Flexor / Pigeon',   sets:'3', reps:'90 sec/side', rest:'—',         note:'Essential for athletic longevity' },
                    { name: 'Thoracic Extension',    sets:'3', reps:'10',          rest:'—',          note:'Foam roller thoracic work' },
                    { name: 'Glute Activation',      sets:'3', reps:'15/side',     rest:'30 sec',     note:'Clamshells and hip abduction' },
                    { name: 'Breathing Drill',       sets:'5', reps:'5 breaths',   rest:'—',          note:'360° belly breathing, parasympathetic' },
                ]},
            ],
        };

        const key = `${level}-${goal}`;
        const allDays = dayBank[key] || dayBank['beginner-strength'];
        const days = allDays.slice(0, numDays);

        const freqLabel = freq === '5+' ? '5–6x/week' : `${freq}x/week`;
        const progressionNotes = {
            'beginner-strength':      'Add 5 lbs upper body / 10 lbs lower body each week you complete all reps. Deload (–10%) every 4th week.',
            'beginner-hypertrophy':   'Add 5 lbs when you hit the top of every rep range for all sets. Deload every 4th week.',
            'beginner-conditioning':  'Increase work intervals by 5 sec or reduce rest by 5 sec each week. Add a round when sets feel easy.',
            'intermediate-strength':  'Progress by ~2.5% per week on main lifts. Autoregulate using RPE — aim for RPE 8 on work sets.',
            'intermediate-hypertrophy':'Add 5–10 lbs when you exceed the top rep range. Prioritize mechanical tension over weight.',
            'intermediate-conditioning':'Increase power output or reduce rest 5–10% weekly. Track intervals by time and distance.',
            'advanced-strength':       'Wave load: 3 weeks building intensity, 1 week deload. Competition prep peaks at 90–95% in final week.',
            'advanced-hypertrophy':    'Periodize: 4 weeks volume, 2 weeks strength, 1 week deload. Track sets per muscle group weekly.',
            'advanced-conditioning':   'Block periodize: 3-week intensification, 1-week deload. Test benchmark workouts every 6 weeks.',
        };

        const id = `_builder_${level}_${goal}_${freq}`;
        WORKOUTS[id] = {
            name: PROTOCOLS[level][goal][freq].name,
            level: capLevel,
            goal: capGoal,
            frequency: freqLabel,
            progressionNote: progressionNotes[key] || 'Progress consistently. Track every session.',
            days,
        };
        return id;
    }

    function showBuilderResults() {
        document.querySelectorAll('.builder-step').forEach(s => s.classList.add('hidden'));
        const results = document.getElementById('results');
        if (!results) return;
        results.classList.remove('hidden');

        const { level, gym, goal, frequency } = state;
        const protoTable = gym === 'no' ? HOME_PROTOCOLS : PROTOCOLS;
        const p = protoTable[level]?.[goal]?.[frequency];
        if (!p) return;

        const capGoal = goal === 'hypertrophy' ? 'Muscle Gain' : goal.charAt(0).toUpperCase() + goal.slice(1);
        const setSafe = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };

        setSafe('resultsSummary', `${level.charAt(0).toUpperCase() + level.slice(1)} · ${capGoal} · ${frequency} days/week`);
        setSafe('protocolName', p.name);
        setSafe('protocolDesc', p.desc);
        setSafe('detailDuration', p.duration);
        setSafe('detailSession', p.session);
        setSafe('detailVolume', p.volume);
        setSafe('whyMatch', p.why);

        const tag1 = document.getElementById('tag1');
        const tag2 = document.getElementById('tag2');
        if (tag1) tag1.textContent = p.tags[0];
        if (tag2) tag2.textContent = p.tags[1] || '';

        const score = Math.min(99, ({ beginner: 90, intermediate: 88, advanced: 85 }[level] || 85) + ({ '3': 5, '4': 3, '5+': 0 }[frequency] || 0));
        const confBar = document.getElementById('matchConfidenceBar');
        const confLabel = document.getElementById('matchConfidenceLabel');
        if (confBar) setTimeout(() => confBar.style.width = `${score}%`, 200);
        if (confLabel) confLabel.textContent = `${score}% Match Confidence`;

        // Generate a workout with the exact number of days the user selected
        const generatedId = generateBuilderWorkout(level, goal, frequency, gym);

        // Wire up "View Full Workout" button
        const viewBtn = document.getElementById('builderViewWorkout');
        if (viewBtn) {
            viewBtn.style.display = 'block';
            viewBtn.onclick = () => openWorkoutModal(generatedId);
        }

        // Open the full workout immediately — this IS the result
        openWorkoutModal(generatedId);
    }

    window.resetBuilder = function() {
        state.level = null; state.gym = null; state.goal = null; state.frequency = null;
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        document.querySelectorAll('.builder-step').forEach(s => s.classList.add('hidden'));
        document.getElementById('step1')?.classList.remove('hidden');
        document.getElementById('results')?.classList.add('hidden');
        updateBuilderProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

// ===== CALCULATORS =====
function initCalculators() {
    if (!document.querySelector('.tools-grid')) return;

    const fields = ['ormWeight', 'ormReps', 'intensityORM'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        const saved = localStorage.getItem(`fp_${id}`);
        if (el && saved) el.value = saved;
        if (el) el.addEventListener('input', () => localStorage.setItem(`fp_${id}`, el.value));
    });

    document.querySelectorAll('.quick-weight').forEach(btn => {
        btn.addEventListener('click', () => {
            const w = document.getElementById('ormWeight');
            if (w) { w.value = btn.dataset.weight; localStorage.setItem('fp_ormWeight', btn.dataset.weight); }
            document.querySelectorAll('.quick-weight').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    window.calculateORM = function() {
        const weight = parseFloat(document.getElementById('ormWeight')?.value);
        const reps = parseFloat(document.getElementById('ormReps')?.value);
        if (!weight || !reps || reps < 1 || reps > 30 || weight <= 0) { showCalcError('ormError', 'Enter valid weight (>0) and reps (1–30).'); return; }
        hideCalcError('ormError');
        const orm = weight * (1 + reps / 30);
        const result = document.getElementById('ormResult');
        if (result) {
            result.style.display = 'block';
            animateNumber('ormValue', Math.round(orm), ' lbs');
            const bd = document.getElementById('ormBreakdown');
            if (bd) bd.textContent = [90, 85, 80, 75, 70].map(p => `${p}%: ${Math.round((orm * p / 100) / 5) * 5} lbs`).join(' · ');
        }
        // Wire "generate workout" button
        const genBtn = document.getElementById('ormGenerateWorkout');
        if (genBtn) {
            genBtn.style.display = 'block';
            genBtn.dataset.orm = Math.round(orm);
            genBtn.onclick = () => {
                const exercise = document.getElementById('ormExercise')?.value || 'squat';
                openGeneratedWorkout(Math.round(orm), exercise);
            };
        }
    };

    window.calculateVolume = function() {
        const level = document.getElementById('volumeLevel')?.value;
        const exercise = document.getElementById('volumeExercise')?.value;
        if (!level || !exercise) { showCalcError('volumeError', 'Please select both fields.'); return; }
        hideCalcError('volumeError');
        const table = {
            beginner:     { compound: ['6–9', 'Lower volume optimizes form and recovery'], secondary: ['6–12', 'Moderate isolation work builds motor patterns'], accessory: ['6–12', 'Minimal accessory keeps total volume manageable'] },
            intermediate: { compound: ['9–12', 'Progressive volume drives continued strength gains'], secondary: ['12–15', 'Increased isolation volume accelerates development'], accessory: ['12–15', 'Accessory volume fills in weak points'] },
            advanced:     { compound: ['12–16', 'High compound volume required for continued adaptation'], secondary: ['15–20', 'High secondary volume for specialized development'], accessory: ['15–20', 'Significant accessory work targets stubborn weaknesses'] },
        };
        const [sets, detail] = table[level][exercise];
        const result = document.getElementById('volumeResult');
        if (result) {
            result.style.display = 'block';
            const v = document.getElementById('volumeValue');
            const d = document.getElementById('volumeDetails');
            if (v) v.textContent = sets + ' sets/week';
            if (d) d.textContent = detail;
        }
    };

    window.calculateIntensity = function() {
        const orm = parseFloat(document.getElementById('intensityORM')?.value);
        const pct = parseFloat(document.getElementById('intensityPercent')?.value);
        if (!orm || !pct || orm <= 0) { showCalcError('intensityError', 'Enter a valid 1RM and select a training zone.'); return; }
        hideCalcError('intensityError');
        const rounded = Math.round((orm * pct / 100) / 2.5) * 2.5;
        const result = document.getElementById('intensityResult');
        if (result) {
            result.style.display = 'block';
            animateNumber('intensityValue', rounded, ' lbs');
            const zone = pct >= 90 ? 'Power/1RM Training' : pct >= 85 ? 'Max Strength' : pct >= 80 ? 'Strength' : pct >= 70 ? 'Hypertrophy' : 'Volume / Technique';
            const zoneEl = document.getElementById('intensityZone');
            if (zoneEl) zoneEl.textContent = `Zone: ${zone}`;
        }
        // Wire generate workout button
        const genBtn = document.getElementById('intensityGenerateWorkout');
        if (genBtn) {
            genBtn.style.display = 'block';
            genBtn.onclick = () => {
                const exercise = document.getElementById('intensityExercise')?.value || 'squat';
                openGeneratedWorkout(orm, exercise, pct);
            };
        }
    };

    function animateNumber(id, target, suffix) {
        const el = document.getElementById(id);
        if (!el) return;
        const from = parseFloat(el.textContent) || 0, start = performance.now();
        (function tick(now) {
            const p = Math.min((now - start) / 600, 1), e = 1 - Math.pow(1 - p, 3);
            el.textContent = (from + (target - from) * e).toFixed(target % 1 !== 0 ? 1 : 0) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        })(start);
    }

    function showCalcError(id, msg) { const el = document.getElementById(id); if (el) { el.textContent = msg; el.style.display = 'block'; } }
    function hideCalcError(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
}

// ===== TDEE CALCULATORS (available on all pages) =====
function runTDEECalc(ids, errorId) {
    const age = parseInt(document.getElementById(ids.age)?.value);
    const gender = document.getElementById(ids.gender)?.value;
    const feet = parseInt(document.getElementById(ids.feet)?.value) || 0;
    const inches = parseInt(document.getElementById(ids.inches)?.value) || 0;
    const weight = parseFloat(document.getElementById(ids.weight)?.value);
    const activity = parseFloat(document.getElementById(ids.activity)?.value);
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = '';
    if (!age || !gender || !weight || !activity || (feet === 0 && inches === 0)) {
        if (errEl) { errEl.textContent = 'Please fill in all fields.'; errEl.style.display = 'block'; }
        return null;
    }
    if (errEl) errEl.style.display = 'none';
    const weight_kg = weight * 0.453592;
    const height_cm = (feet * 12 + inches) * 2.54;
    let bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age);
    bmr += gender === 'male' ? 5 : -161;
    const tdee = Math.round(bmr * activity);
    return { tdee, cut: tdee - 500, leanBulk: tdee + 300, protein: Math.round(weight * 0.82) };
}

window.calculateHomeTDEE = function() {
    const r = runTDEECalc(
        { age: 'htAge', gender: 'htGender', feet: 'htFeet', inches: 'htInches', weight: 'htWeight', activity: 'htActivity' },
        'htError'
    );
    if (!r) return;
    const setSafe = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setSafe('htMaintain', r.tdee.toLocaleString() + ' kcal');
    setSafe('htCut', r.cut.toLocaleString() + ' kcal');
    setSafe('htBulk', r.leanBulk.toLocaleString() + ' kcal');
    setSafe('htProtein', r.protein + 'g');
    const result = document.getElementById('htResult');
    if (result) { result.style.display = 'block'; result.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
};

window.calculateTDEE = function() {
    const r = runTDEECalc(
        { age: 'tdeAge', gender: 'tdeGender', feet: 'tdeFeet', inches: 'tdeInches', weight: 'tdeWeight', activity: 'tdeActivity' },
        'tdeError'
    );
    if (!r) return;
    const setSafe = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setSafe('tdeMaintenance', r.tdee.toLocaleString() + ' kcal');
    setSafe('tdeCut', r.cut.toLocaleString() + ' kcal');
    setSafe('tdeBulk', r.leanBulk.toLocaleString() + ' kcal');
    setSafe('tdeProtein', r.protein + 'g');
    const result = document.getElementById('tdeResult');
    if (result) { result.style.display = 'block'; result.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
};

// ===== WORKOUT DATABASE =====
const WORKOUTS = {
    'foundational-strength': {
        name: 'Foundational Strength',
        level: 'Beginner', goal: 'Strength', frequency: '3x/week',
        progressionNote: 'Add 5 lbs to upper body lifts and 10 lbs to squat/deadlift each week you complete all sets and reps.',
        days: [
            {
                label: 'Day A — Mon/Fri',
                focus: 'Full Body · Squat & Push Focus',
                exercises: [
                    { name: 'Barbell Back Squat', sets: '3', reps: '5', rest: '3 min', note: 'Drive knees out, brace abs, full depth' },
                    { name: 'Barbell Bench Press', sets: '3', reps: '5', rest: '3 min', note: 'Retract scapula, slight arch, bar to lower chest' },
                    { name: 'Barbell Row', sets: '3', reps: '5', rest: '2 min', note: 'Pull to lower chest, keep back flat and hinge from hips' },
                    { name: 'Dumbbell Curl', sets: '2', reps: '10–12', rest: '60 sec', note: 'Controlled eccentric, no swinging' },
                    { name: 'Plank', sets: '3', reps: '30–45 sec', rest: '60 sec', note: 'Brace hard, squeeze glutes, neutral spine' },
                ],
            },
            {
                label: 'Day B — Wed',
                focus: 'Full Body · Hip & Pull Focus',
                exercises: [
                    { name: 'Conventional Deadlift', sets: '1', reps: '5', rest: '4 min', note: 'Heaviest set of the week — full reset each rep' },
                    { name: 'Overhead Press', sets: '3', reps: '5', rest: '2 min', note: 'Brace abs hard, push head through at lockout' },
                    { name: 'Lat Pulldown', sets: '3', reps: '8–10', rest: '90 sec', note: 'Pull elbows to hips, squeeze lats at bottom' },
                    { name: 'Romanian Deadlift', sets: '3', reps: '10', rest: '90 sec', note: 'Feel stretch in hamstrings, keep back flat throughout' },
                    { name: 'Face Pulls', sets: '3', reps: '15', rest: '60 sec', note: 'External rotation, pull to forehead, squeeze rear delts' },
                ],
            },
        ],
    },
    'conditioning-foundation': {
        name: 'Conditioning Foundation',
        level: 'Beginner', goal: 'Conditioning', frequency: '4x/week',
        progressionNote: 'Increase interval durations or reduce rest by 5-10 seconds each week. Add a round when prescribed rounds feel easy.',
        days: [
            {
                label: 'Day A — Mon/Thu',
                focus: 'Strength Circuits',
                exercises: [
                    { name: 'Goblet Squat', sets: '3', reps: '12–15', rest: '60 sec', note: 'Elbows inside knees, tall chest throughout' },
                    { name: 'Push-ups', sets: '3', reps: 'Max (good form)', rest: '60 sec', note: 'Full range, core braced, chest to floor' },
                    { name: 'Dumbbell Row', sets: '3', reps: '12/side', rest: '60 sec', note: 'Brace on bench, pull elbow to hip' },
                    { name: 'Reverse Lunge', sets: '3', reps: '10/side', rest: '60 sec', note: 'Controlled descent, back knee near floor' },
                    { name: 'Dead Bug', sets: '3', reps: '8/side', rest: '45 sec', note: 'Lower back pressed to floor, slow and deliberate' },
                ],
            },
            {
                label: 'Day B — Tue/Fri',
                focus: 'Metabolic Conditioning',
                exercises: [
                    { name: 'Jump Rope / Jumping Jacks', sets: '4', reps: '45 sec on / 15 sec off', rest: '—', note: 'Warm up cardiovascular system' },
                    { name: 'Mountain Climbers', sets: '4', reps: '30 sec', rest: '30 sec', note: 'Drive knees to chest, keep hips level' },
                    { name: 'Burpees', sets: '3', reps: '8–10', rest: '60 sec', note: 'Full extension at top, controlled lower down' },
                    { name: 'Box Step-ups', sets: '3', reps: '12/side', rest: '45 sec', note: 'Drive through heel, squeeze glute at top' },
                    { name: 'Bear Crawl', sets: '3', reps: '20m', rest: '45 sec', note: 'Keep hips level and low, slow and controlled' },
                ],
            },
        ],
    },
    'upper-lower-hypertrophy': {
        name: 'Upper/Lower Hypertrophy',
        level: 'Intermediate', goal: 'Muscle Gain', frequency: '4x/week',
        progressionNote: 'Add 5 lbs when you hit the top of the rep range for all sets. Deload (reduce weight 10%) every 4th week.',
        days: [
            {
                label: 'Upper A — Mon',
                focus: 'Chest & Back · Horizontal Push/Pull',
                exercises: [
                    { name: 'Barbell Bench Press', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Focus on bar path and chest stretch at bottom' },
                    { name: 'Barbell Row', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Pull to belly button, lead with elbows' },
                    { name: 'Incline DB Press', sets: '3', reps: '10–12', rest: '90 sec', note: '30–45° incline, full stretch at bottom' },
                    { name: 'Cable Row', sets: '3', reps: '10–12', rest: '90 sec', note: 'Chest proud, retract scapula at peak contraction' },
                    { name: 'Lateral Raises', sets: '3', reps: '15–20', rest: '60 sec', note: 'Slight forward lean, lead with pinkies' },
                    { name: 'Tricep Pushdown', sets: '3', reps: '12–15', rest: '60 sec', note: 'Full elbow extension, elbows pinned to sides' },
                ],
            },
            {
                label: 'Lower A — Tue',
                focus: 'Quad Dominant',
                exercises: [
                    { name: 'Barbell Back Squat', sets: '4', reps: '6–8', rest: '3 min', note: 'Competition depth, brace hard throughout' },
                    { name: 'Leg Press', sets: '3', reps: '10–12', rest: '2 min', note: 'High foot placement, full range of motion' },
                    { name: 'Romanian Deadlift', sets: '3', reps: '10–12', rest: '90 sec', note: 'Push hips back, feel deep hamstring stretch' },
                    { name: 'Leg Curl', sets: '3', reps: '12–15', rest: '60 sec', note: 'Full extension, curl to full contraction' },
                    { name: 'Leg Extension', sets: '2', reps: '15–20', rest: '60 sec', note: 'Squeeze quad at lockout, controlled descent' },
                    { name: 'Calf Raises', sets: '4', reps: '15–20', rest: '45 sec', note: 'Full stretch at bottom, slow eccentric' },
                ],
            },
            {
                label: 'Upper B — Thu',
                focus: 'Shoulder & Arm · Vertical Push/Pull',
                exercises: [
                    { name: 'Overhead Press', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Push head through at lockout, bar close to face' },
                    { name: 'Weighted Pull-ups', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Dead hang start, chin over bar, control descent' },
                    { name: 'DB Shoulder Press', sets: '3', reps: '10–12', rest: '90 sec', note: 'Neutral grip, elbows slightly forward' },
                    { name: 'Cable Pullover', sets: '3', reps: '12–15', rest: '75 sec', note: 'Full lat stretch at top, squeeze at bottom' },
                    { name: 'EZ Bar Curl', sets: '3', reps: '10–12', rest: '75 sec', note: 'Full range, squeeze bicep at top' },
                    { name: 'Overhead Tricep Extension', sets: '3', reps: '12–15', rest: '60 sec', note: 'Long head stretch, elbows stay in' },
                ],
            },
            {
                label: 'Lower B — Fri',
                focus: 'Posterior Chain · Hip Dominant',
                exercises: [
                    { name: 'Romanian Deadlift', sets: '4', reps: '6–8', rest: '3 min', note: 'Heaviest of the week, feel every rep in hamstrings' },
                    { name: 'Bulgarian Split Squat', sets: '3', reps: '8–10/side', rest: '2 min', note: 'Rear foot elevated, drive front heel into floor' },
                    { name: 'Leg Press (narrow stance)', sets: '3', reps: '12–15', rest: '90 sec', note: 'Low foot placement targets quads' },
                    { name: 'Leg Curl', sets: '4', reps: '10–12', rest: '75 sec', note: 'Slow 3-second eccentric for max tension' },
                    { name: 'Hip Thrust', sets: '3', reps: '12–15', rest: '75 sec', note: 'Squeeze glutes hard at lockout, chin tucked' },
                    { name: 'Calf Raises', sets: '4', reps: '15–20', rest: '45 sec', note: 'Pause at bottom stretch for 1 second' },
                ],
            },
        ],
    },
    'ppl-split': {
        name: 'Push/Pull/Legs Split',
        level: 'Intermediate', goal: 'Muscle Gain', frequency: '6x/week',
        progressionNote: 'Double progression: increase reps until you hit the top range, then add weight next session. Deload every 6 weeks.',
        days: [
            {
                label: 'Push — Mon/Thu',
                focus: 'Chest · Shoulders · Triceps',
                exercises: [
                    { name: 'Flat Barbell Bench Press', sets: '4', reps: '5–8', rest: '3 min', note: 'Compound strength movement — go heavy' },
                    { name: 'Overhead Press', sets: '3', reps: '8–10', rest: '2 min', note: 'Seated or standing, full lockout each rep' },
                    { name: 'Incline DB Press', sets: '3', reps: '10–12', rest: '90 sec', note: 'Upper chest emphasis, controlled negative' },
                    { name: 'Cable Lateral Raise', sets: '4', reps: '15–20', rest: '45 sec', note: 'Single arm, cross-body, consistent tension' },
                    { name: 'Skull Crushers', sets: '3', reps: '10–12', rest: '75 sec', note: 'EZ bar, lower to forehead, elbows stay fixed' },
                    { name: 'Cable Pushdown', sets: '3', reps: '12–15', rest: '60 sec', note: 'Rope attachment, flare at bottom' },
                ],
            },
            {
                label: 'Pull — Tue/Fri',
                focus: 'Back · Biceps · Rear Delts',
                exercises: [
                    { name: 'Weighted Pull-ups', sets: '4', reps: '5–8', rest: '3 min', note: 'Compound pull — add weight when 8 reps are easy' },
                    { name: 'Barbell Row', sets: '4', reps: '8–10', rest: '2 min', note: 'Overhand, pull to lower chest, stay rigid' },
                    { name: 'Chest-Supported Row', sets: '3', reps: '10–12', rest: '90 sec', note: 'Eliminate momentum, pure lat/rhomboid work' },
                    { name: 'Face Pulls', sets: '4', reps: '15–20', rest: '45 sec', note: 'External rotation, separate hands at face level' },
                    { name: 'Barbell Curl', sets: '3', reps: '8–12', rest: '75 sec', note: 'Full supination at top, no swinging' },
                    { name: 'Hammer Curl', sets: '3', reps: '10–12', rest: '60 sec', note: 'Brachialis emphasis, thumbs up throughout' },
                ],
            },
            {
                label: 'Legs — Wed/Sat',
                focus: 'Quads · Hamstrings · Glutes · Calves',
                exercises: [
                    { name: 'Barbell Back Squat', sets: '4', reps: '5–8', rest: '3 min', note: 'Primary leg builder — competition depth every rep' },
                    { name: 'Romanian Deadlift', sets: '4', reps: '8–10', rest: '2.5 min', note: 'Maximal hamstring tension, push hips back' },
                    { name: 'Leg Press', sets: '3', reps: '12–15', rest: '90 sec', note: "Full range, don't lock knees at top" },
                    { name: 'Walking Lunges', sets: '3', reps: '10/side', rest: '75 sec', note: 'Long stride for glute emphasis' },
                    { name: 'Leg Curl', sets: '3', reps: '12–15', rest: '60 sec', note: 'Slow 3-second negative each rep' },
                    { name: 'Standing Calf Raises', sets: '5', reps: '15–20', rest: '45 sec', note: 'Full stretch at bottom, pause 1 second' },
                ],
            },
        ],
    },
    'elite-strength': {
        name: 'Elite Strength Protocol',
        level: 'Advanced', goal: 'Strength', frequency: '5x/week',
        progressionNote: 'Use RPE-based loading. Aim for RPE 8 on main lifts. Add 5 lbs when top sets feel like RPE 7 or below. Deload every 4th week.',
        days: [
            {
                label: 'Day 1 — Squat',
                focus: 'Primary: Squat · Volume: Posterior Chain',
                exercises: [
                    { name: 'Barbell Back Squat', sets: '5', reps: '3–5 @RPE8', rest: '4 min', note: 'Competition stance and depth — this is your max effort work' },
                    { name: 'Pause Squat', sets: '3', reps: '3', rest: '3 min', note: '2-second pause at bottom, builds bottom-end strength' },
                    { name: 'Romanian Deadlift', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Posterior chain volume for squat carryover' },
                    { name: 'Leg Press', sets: '3', reps: '10–12', rest: '90 sec', note: 'Quad volume finisher, no lockout' },
                    { name: 'Leg Curl', sets: '3', reps: '12–15', rest: '60 sec', note: 'Hamstring balance work' },
                    { name: 'Ab Wheel Rollout', sets: '3', reps: '8–12', rest: '60 sec', note: 'Full extension if able, strict control' },
                ],
            },
            {
                label: 'Day 2 — Bench',
                focus: 'Primary: Bench Press · Volume: Triceps/Shoulders',
                exercises: [
                    { name: 'Barbell Bench Press', sets: '5', reps: '3–5 @RPE8', rest: '4 min', note: 'Competition grip, leg drive, arch and brace' },
                    { name: 'Close-Grip Bench Press', sets: '3', reps: '5–6', rest: '3 min', note: 'Tricep developer — same setup, narrow grip' },
                    { name: 'DB Bench Press', sets: '4', reps: '8–10', rest: '90 sec', note: 'Chest hypertrophy volume, full range' },
                    { name: 'Overhead Press', sets: '3', reps: '8–10', rest: '2 min', note: 'Shoulder strength — strict press only' },
                    { name: 'Skull Crushers', sets: '4', reps: '8–12', rest: '75 sec', note: 'Tricep hypertrophy for bench lockout' },
                    { name: 'Face Pulls', sets: '3', reps: '20', rest: '45 sec', note: 'Shoulder health — never skip these' },
                ],
            },
            {
                label: 'Day 3 — Deadlift',
                focus: 'Primary: Deadlift · Volume: Back',
                exercises: [
                    { name: 'Conventional Deadlift', sets: '4', reps: '2–3 @RPE9', rest: '5 min', note: 'Heaviest day of the program — take your time between sets' },
                    { name: 'Deficit Deadlift', sets: '3', reps: '3', rest: '4 min', note: '2" deficit to improve off-the-floor strength' },
                    { name: 'Barbell Row', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Upper back strength directly supports deadlift' },
                    { name: 'Lat Pulldown', sets: '3', reps: '10–12', rest: '90 sec', note: 'Lat width and pull strength' },
                    { name: 'Good Morning', sets: '3', reps: '8–10', rest: '2 min', note: 'Accessory for lower back and hamstring strength' },
                    { name: 'Plank', sets: '3', reps: '60 sec', rest: '45 sec', note: 'Maintain core bracing for heavy pulling' },
                ],
            },
            {
                label: 'Day 4 — Upper',
                focus: 'Hypertrophy Upper Body',
                exercises: [
                    { name: 'Incline DB Press', sets: '4', reps: '8–10', rest: '90 sec', note: 'Upper chest emphasis, controlled negative' },
                    { name: 'Weighted Pull-ups', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Add enough weight to hit failure at target reps' },
                    { name: 'Cable Fly', sets: '3', reps: '12–15', rest: '75 sec', note: 'Full chest stretch, maintain slight elbow bend' },
                    { name: 'DB Lateral Raise', sets: '4', reps: '15–20', rest: '45 sec', note: 'Side delt volume, lighter is fine' },
                    { name: 'EZ Bar Curl', sets: '3', reps: '10–12', rest: '75 sec', note: 'Arm balance work — full range' },
                    { name: 'Tricep Pushdown', sets: '3', reps: '12–15', rest: '60 sec', note: 'Elbow lockout, elbows pinned' },
                ],
            },
            {
                label: 'Day 5 — Lower',
                focus: 'Hypertrophy Lower Body',
                exercises: [
                    { name: 'Front Squat', sets: '4', reps: '6–8', rest: '3 min', note: 'Quad focus, upright torso — great squat accessory' },
                    { name: 'Bulgarian Split Squat', sets: '3', reps: '8–10/side', rest: '2 min', note: 'Rear foot elevated, most challenging single-leg movement' },
                    { name: 'Leg Curl', sets: '4', reps: '10–12', rest: '75 sec', note: 'Slow 4-second eccentric for max tension' },
                    { name: 'Leg Extension', sets: '3', reps: '15–20', rest: '60 sec', note: 'Quad finisher, squeeze at lockout' },
                    { name: 'Hip Thrust', sets: '4', reps: '10–12', rest: '90 sec', note: 'Max glute tension at lockout, pause 1 sec' },
                    { name: 'Seated Calf Raises', sets: '5', reps: '15–20', rest: '45 sec', note: 'Soleus emphasis, full range of motion' },
                ],
            },
        ],
    },
    'competition-peaking': {
        name: 'Competition Periodization',
        level: 'Advanced', goal: 'Peak Performance', frequency: '5–6x/week',
        progressionNote: 'Follow the phase structure: Weeks 1-6 Hypertrophy (RPE 7-8), Weeks 7-12 Strength (RPE 8-9), Weeks 13-16 Power (RPE 9-10), Week 17-18 Deload, Week 19-20 Peak.',
        days: [
            {
                label: 'Mon — Max Effort Lower',
                focus: 'Maximal Strength · Squat/Deadlift Variant',
                exercises: [
                    { name: 'Competition Squat (heavy single)', sets: '1', reps: '1–3 @RPE9-10', rest: '6+ min', note: 'Work up to max effort — 3-4 warm-up sets first' },
                    { name: 'Box Squat', sets: '3', reps: '3', rest: '4 min', note: 'Box at or below parallel, controlled descent' },
                    { name: 'Romanian Deadlift', sets: '4', reps: '6', rest: '2.5 min', note: 'Posterior chain accessory at 60-65% deadlift 1RM' },
                    { name: 'Reverse Hyper', sets: '3', reps: '15', rest: '90 sec', note: 'Posterior chain and lower back recovery' },
                    { name: 'Leg Curl', sets: '3', reps: '10–12', rest: '75 sec', note: 'Hamstring balance and health' },
                ],
            },
            {
                label: 'Tue — Max Effort Upper',
                focus: 'Maximal Strength · Bench Variant',
                exercises: [
                    { name: 'Competition Bench Press (heavy single)', sets: '1', reps: '1–3 @RPE9-10', rest: '6+ min', note: 'Competition setup — pause on chest, full leg drive' },
                    { name: 'Board Press (2-board)', sets: '3', reps: '3', rest: '3 min', note: 'Overloads lockout portion — builds top-end strength' },
                    { name: 'DB Bench Press', sets: '4', reps: '8–10', rest: '90 sec', note: 'Hypertrophy volume — full range' },
                    { name: 'Barbell Row', sets: '4', reps: '6–8', rest: '2 min', note: 'Upper back strength — bench carryover' },
                    { name: 'Face Pulls', sets: '4', reps: '20', rest: '45 sec', note: 'Shoulder health — non-negotiable' },
                ],
            },
            {
                label: 'Thu — Dynamic Effort Lower',
                focus: 'Speed-Strength · Technique',
                exercises: [
                    { name: 'Speed Squat', sets: '8', reps: '2 @60% 1RM', rest: '60 sec', note: 'Move bar as FAST as possible — velocity is the stimulus' },
                    { name: 'Speed Deadlift', sets: '6', reps: '1 @65% 1RM', rest: '60 sec', note: 'Full reset, explosive pull, belted' },
                    { name: 'Good Morning', sets: '3', reps: '8', rest: '2 min', note: 'Posterior chain strength and hip hinge pattern' },
                    { name: 'Leg Press', sets: '3', reps: '12', rest: '90 sec', note: 'Quad volume at low intensity to aid recovery' },
                    { name: 'GHD Sit-up / Ab Rollout', sets: '3', reps: '10', rest: '60 sec', note: 'Core stability for competition lifts' },
                ],
            },
            {
                label: 'Fri — Dynamic Effort Upper',
                focus: 'Speed-Strength · Accessory Volume',
                exercises: [
                    { name: 'Speed Bench Press', sets: '8', reps: '3 @55% 1RM', rest: '60 sec', note: 'Max bar speed — compensatory acceleration' },
                    { name: 'Overhead Press', sets: '4', reps: '6–8', rest: '2 min', note: 'Strict press — shoulder and lockout strength' },
                    { name: 'Weighted Dips', sets: '3', reps: '6–8', rest: '2 min', note: 'Chest and tricep accessory strength' },
                    { name: 'Weighted Pull-ups', sets: '4', reps: '6–8', rest: '2 min', note: 'Back strength — competition posture support' },
                    { name: 'JM Press', sets: '3', reps: '8–10', rest: '75 sec', note: 'Tricep strength builder for bench lockout' },
                ],
            },
        ],
    },
};

// ===== WORKOUT MODAL INJECTION =====
function injectWorkoutModal() {
    if (document.getElementById('workoutModal')) return;
    const modal = document.createElement('div');
    modal.className = 'workout-modal';
    modal.id = 'workoutModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Full Workout');
    const svgs = buildBodySVGs();
    modal.innerHTML = `
        <div class="muscle-side" id="wmMuscleFront">
            <div class="muscle-panel-label">Front</div>
            ${svgs.front}
        </div>
        <div class="workout-modal-content" id="workoutModalContent">
            <div class="workout-modal-img-wrap" id="wm-img-wrap">
                <img id="wm-img" class="workout-modal-img" src="" alt="Workout" loading="lazy">
            </div>
            <div class="workout-modal-header">
                <button class="workout-modal-close" aria-label="Close workout" onclick="closeWorkoutModal()">×</button>
                <div class="workout-modal-title" id="wm-title">—</div>
                <div class="workout-modal-meta" id="wm-meta"></div>
            </div>
            <div class="workout-day-tabs" id="wm-tabs" role="tablist"></div>
            <div id="wm-days"></div>
            <div class="muscle-label-bar">
                <div class="muscle-panel-info" id="wmMuscleInfo">
                    <div class="muscle-panel-hint">Hover an exercise to see muscles worked</div>
                </div>
            </div>
            <div class="workout-modal-footer">
                <button class="btn btn-primary" onclick="closeWorkoutModal()">Close & Start Training &rarr;</button>
            </div>
        </div>
        <div class="muscle-side" id="wmMuscleBack">
            <div class="muscle-panel-label">Back</div>
            ${svgs.back}
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeWorkoutModal(); });
}

const WORKOUT_IMAGES = {
    'foundational-strength':    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=70&fit=crop&auto=format',
    'conditioning-foundation':  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=70&fit=crop&auto=format',
    'upper-lower-hypertrophy':  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=70&fit=crop&auto=format',
    'ppl-split':                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=70&fit=crop&auto=format',
    'elite-strength':           'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=70&fit=crop&auto=format',
    'competition-peaking':      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=70&fit=crop&auto=format',
};

// ===== MUSCLE HIGHLIGHT SYSTEM =====
const MUSCLE_DATA = {
    'Barbell Back Squat':                    { p: ['quads','glutes'],              s: ['hamstrings','lower-back','abs'] },
    'Pause Squat':                           { p: ['quads','glutes'],              s: ['hamstrings','lower-back'] },
    'Front Squat':                           { p: ['quads'],                       s: ['glutes','abs'] },
    'Box Squat':                             { p: ['quads','glutes'],              s: ['hamstrings','lower-back'] },
    'Speed Squat':                           { p: ['quads','glutes'],              s: ['hamstrings'] },
    'Competition Squat (heavy single)':      { p: ['quads','glutes'],              s: ['hamstrings','lower-back'] },
    'Goblet Squat':                          { p: ['quads','glutes'],              s: ['abs','lower-back'] },
    'Bulgarian Split Squat':                 { p: ['quads','glutes'],              s: ['hamstrings'] },
    'Reverse Lunge':                         { p: ['quads','glutes'],              s: ['hamstrings'] },
    'Walking Lunges':                        { p: ['quads','glutes'],              s: ['hamstrings','calves'] },
    'Box Step-ups':                          { p: ['quads','glutes'],              s: ['calves'] },
    'Conventional Deadlift':                 { p: ['lower-back','glutes','hamstrings'], s: ['quads','traps','lats'] },
    'Deficit Deadlift':                      { p: ['lower-back','glutes','hamstrings'], s: ['quads','lats'] },
    'Speed Deadlift':                        { p: ['lower-back','glutes','hamstrings'], s: ['quads','lats'] },
    'Romanian Deadlift':                     { p: ['hamstrings','glutes'],         s: ['lower-back'] },
    'Good Morning':                          { p: ['hamstrings','lower-back'],     s: ['glutes'] },
    'Hip Thrust':                            { p: ['glutes'],                      s: ['hamstrings'] },
    'Reverse Hyper':                         { p: ['glutes','lower-back'],         s: ['hamstrings'] },
    'Leg Press':                             { p: ['quads'],                       s: ['glutes','hamstrings'] },
    'Leg Press (narrow stance)':             { p: ['quads'],                       s: ['glutes'] },
    'Leg Extension':                         { p: ['quads'],                       s: [] },
    'Leg Curl':                              { p: ['hamstrings'],                  s: [] },
    'Calf Raises':                           { p: ['calves'],                      s: [] },
    'Standing Calf Raises':                  { p: ['calves'],                      s: [] },
    'Seated Calf Raises':                    { p: ['calves'],                      s: [] },
    'Barbell Bench Press':                   { p: ['chest'],                       s: ['shoulders','triceps'] },
    'Flat Barbell Bench Press':              { p: ['chest'],                       s: ['shoulders','triceps'] },
    'DB Bench Press':                        { p: ['chest'],                       s: ['shoulders','triceps'] },
    'Competition Bench Press (heavy single)':{ p: ['chest'],                       s: ['shoulders','triceps'] },
    'Speed Bench Press':                     { p: ['chest'],                       s: ['shoulders','triceps'] },
    'Incline DB Press':                      { p: ['chest','shoulders'],           s: ['triceps'] },
    'Close-Grip Bench Press':                { p: ['triceps','chest'],             s: ['shoulders'] },
    'Board Press (2-board)':                 { p: ['triceps','chest'],             s: ['shoulders'] },
    'Cable Fly':                             { p: ['chest'],                       s: ['shoulders'] },
    'Weighted Dips':                         { p: ['chest','triceps'],             s: ['shoulders'] },
    'Push-ups':                              { p: ['chest'],                       s: ['shoulders','triceps'] },
    'Overhead Press':                        { p: ['shoulders'],                   s: ['triceps','traps'] },
    'DB Shoulder Press':                     { p: ['shoulders'],                   s: ['triceps'] },
    'Lateral Raises':                        { p: ['shoulders'],                   s: ['traps'] },
    'Cable Lateral Raise':                   { p: ['shoulders'],                   s: ['traps'] },
    'DB Lateral Raise':                      { p: ['shoulders'],                   s: [] },
    'Face Pulls':                            { p: ['rear-delts'],                  s: ['traps'] },
    'Tricep Pushdown':                       { p: ['triceps'],                     s: [] },
    'Cable Pushdown':                        { p: ['triceps'],                     s: [] },
    'Skull Crushers':                        { p: ['triceps'],                     s: [] },
    'Overhead Tricep Extension':             { p: ['triceps'],                     s: [] },
    'JM Press':                              { p: ['triceps'],                     s: ['chest'] },
    'Weighted Pull-ups':                     { p: ['lats'],                        s: ['biceps','rear-delts'] },
    'Lat Pulldown':                          { p: ['lats'],                        s: ['biceps','rear-delts'] },
    'Cable Pullover':                        { p: ['lats'],                        s: ['chest'] },
    'Barbell Row':                           { p: ['lats','traps'],                s: ['biceps','rear-delts'] },
    'Dumbbell Row':                          { p: ['lats'],                        s: ['biceps','rear-delts'] },
    'Cable Row':                             { p: ['lats','traps'],                s: ['biceps','rear-delts'] },
    'Chest-Supported Row':                   { p: ['lats','traps'],                s: ['biceps','rear-delts'] },
    'EZ Bar Curl':                           { p: ['biceps'],                      s: ['forearms'] },
    'Barbell Curl':                          { p: ['biceps'],                      s: ['forearms'] },
    'Dumbbell Curl':                         { p: ['biceps'],                      s: ['forearms'] },
    'Hammer Curl':                           { p: ['biceps','forearms'],           s: [] },
    'Ab Wheel Rollout':                      { p: ['abs'],                         s: ['lats','lower-back'] },
    'GHD Sit-up / Ab Rollout':              { p: ['abs'],                         s: ['lower-back'] },
    'Plank':                                 { p: ['abs'],                         s: ['lower-back','shoulders'] },
    'Dead Bug':                              { p: ['abs'],                         s: ['lower-back'] },
    'Mountain Climbers':                     { p: ['abs'],                         s: ['shoulders','quads'] },
    'Jump Rope / Jumping Jacks':             { p: ['calves'],                      s: ['quads','shoulders'] },
    'Burpees':                               { p: ['chest','quads'],               s: ['shoulders','abs'] },
    'Bear Crawl':                            { p: ['abs','shoulders'],             s: ['quads'] },
};

const MUSCLE_SVG_IDS = {
    chest:        ['fm-chest'],
    shoulders:    ['fm-shoulders'],
    'front-delts':['fm-shoulders'],
    'rear-delts': ['bm-reardelts'],
    biceps:       ['fm-biceps'],
    forearms:     ['fm-forearms'],
    abs:          ['fm-abs'],
    quads:        ['fm-quads'],
    calves:       ['fm-calves', 'bm-calves'],
    traps:        ['bm-traps'],
    lats:         ['bm-lats'],
    triceps:      ['bm-triceps'],
    'lower-back': ['bm-lowerback'],
    glutes:       ['bm-glutes'],
    hamstrings:   ['bm-hamstrings'],
};

function getMuscleData(exerciseName) {
    if (MUSCLE_DATA[exerciseName]) return MUSCLE_DATA[exerciseName];
    const lower = exerciseName.toLowerCase();
    for (const key of Object.keys(MUSCLE_DATA)) {
        if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower.split(' ')[0])) {
            return MUSCLE_DATA[key];
        }
    }
    return null;
}

function highlightMuscles(primaryKeys, secondaryKeys) {
    document.querySelectorAll('.body-svg g[id]').forEach(g => {
        g.classList.remove('muscle-primary', 'muscle-secondary');
    });
    const primIds = primaryKeys.flatMap(k => MUSCLE_SVG_IDS[k] || []);
    primIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('muscle-primary');
    });
    const secIds = secondaryKeys.flatMap(k => MUSCLE_SVG_IDS[k] || []);
    secIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.classList.contains('muscle-primary')) el.classList.add('muscle-secondary');
    });
}

function buildBodySVGs() {
    const struct = 'class="body-struct"';
    const front = `<svg class="body-svg" viewBox="0 0 100 210" xmlns="http://www.w3.org/2000/svg">
        <circle ${struct} cx="50" cy="12" r="9"/>
        <rect ${struct} x="45" y="21" width="10" height="6" rx="3"/>
        <rect ${struct} x="8" y="38" width="9" height="28" rx="4"/>
        <rect ${struct} x="83" y="38" width="9" height="28" rx="4"/>
        <rect ${struct} x="33" y="96" width="15" height="98" rx="6"/>
        <rect ${struct} x="52" y="96" width="15" height="98" rx="6"/>
        <g id="fm-shoulders"><ellipse cx="28" cy="35" rx="13" ry="8"/><ellipse cx="72" cy="35" rx="13" ry="8"/></g>
        <g id="fm-chest"><ellipse cx="41" cy="43" rx="12" ry="10"/><ellipse cx="59" cy="43" rx="12" ry="10"/></g>
        <g id="fm-biceps"><ellipse cx="14" cy="52" rx="7" ry="13"/><ellipse cx="86" cy="52" rx="7" ry="13"/></g>
        <g id="fm-forearms"><ellipse cx="11" cy="74" rx="6" ry="11"/><ellipse cx="89" cy="74" rx="6" ry="11"/></g>
        <g id="fm-abs"><rect x="38" y="53" width="24" height="40" rx="7"/></g>
        <g id="fm-quads"><rect x="33" y="97" width="15" height="44" rx="7"/><rect x="52" y="97" width="15" height="44" rx="7"/></g>
        <g id="fm-calves"><ellipse cx="40" cy="163" rx="8" ry="18"/><ellipse cx="60" cy="163" rx="8" ry="18"/></g>
    </svg>`;

    const back = `<svg class="body-svg" viewBox="0 0 100 210" xmlns="http://www.w3.org/2000/svg">
        <circle ${struct} cx="50" cy="12" r="9"/>
        <rect ${struct} x="45" y="21" width="10" height="6" rx="3"/>
        <rect ${struct} x="8" y="38" width="9" height="28" rx="4"/>
        <rect ${struct} x="83" y="38" width="9" height="28" rx="4"/>
        <rect ${struct} x="33" y="96" width="15" height="98" rx="6"/>
        <rect ${struct} x="52" y="96" width="15" height="98" rx="6"/>
        <g id="bm-traps"><path d="M28,25 Q50,22 72,25 L76,48 Q50,50 24,48 Z"/></g>
        <g id="bm-reardelts"><ellipse cx="22" cy="35" rx="12" ry="8"/><ellipse cx="78" cy="35" rx="12" ry="8"/></g>
        <g id="bm-lats"><path d="M25,48 Q16,65 18,92 L36,92 L36,52 Q30,50 25,48 Z"/><path d="M75,48 Q84,65 82,92 L64,92 L64,52 Q70,50 75,48 Z"/></g>
        <g id="bm-triceps"><ellipse cx="13" cy="54" rx="7" ry="15"/><ellipse cx="87" cy="54" rx="7" ry="15"/></g>
        <g id="bm-lowerback"><rect x="37" y="82" width="26" height="18" rx="6"/></g>
        <g id="bm-glutes"><ellipse cx="43" cy="110" rx="15" ry="13"/><ellipse cx="57" cy="110" rx="15" ry="13"/></g>
        <g id="bm-hamstrings"><rect x="33" y="120" width="15" height="46" rx="7"/><rect x="52" y="120" width="15" height="46" rx="7"/></g>
        <g id="bm-calves"><ellipse cx="40" cy="181" rx="8" ry="16"/><ellipse cx="60" cy="181" rx="8" ry="16"/></g>
    </svg>`;

    return { front, back };
}

window.openWorkoutModal = function(workoutId) {
    const w = WORKOUTS[workoutId];
    if (!w) return;

    const content = document.getElementById('workoutModalContent');
    if (content) {
        const src = WORKOUT_IMAGES[workoutId] || WORKOUT_IMAGES['foundational-strength'];
        content.style.setProperty('--wm-bg', `url("${src}")`);
    }

    document.getElementById('wm-title').textContent = w.name;
    document.getElementById('wm-meta').innerHTML = [
        w.level, w.goal, w.frequency
    ].map(t => `<span class="workout-modal-pill">${t}</span>`).join('');

    const tabsEl = document.getElementById('wm-tabs');
    const daysEl = document.getElementById('wm-days');
    tabsEl.innerHTML = '';
    daysEl.innerHTML = '';

    w.days.forEach((day, i) => {
        // Tab button
        const tab = document.createElement('button');
        tab.className = `workout-day-tab${i === 0 ? ' active' : ''}`;
        tab.textContent = day.label;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        tab.addEventListener('click', () => switchWorkoutDay(i, w.days.length));
        tabsEl.appendChild(tab);

        // Day content
        const content = document.createElement('div');
        content.className = `workout-day-content${i === 0 ? ' active' : ''}`;
        content.id = `wm-day-${i}`;
        content.innerHTML = `
            <div class="workout-day-focus">${day.focus}</div>
            <table class="exercise-table">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Rest</th>
                    </tr>
                </thead>
                <tbody>
                    ${day.exercises.map(ex => `
                        <tr data-exercise="${ex.name.replace(/"/g, '&quot;')}">
                            <td>
                                <div class="exercise-name">${ex.name}</div>
                                <div class="exercise-note">${ex.note}</div>
                            </td>
                            <td class="exercise-sets">${ex.sets}</td>
                            <td class="exercise-sets" style="color:var(--text-primary);font-weight:600;">${ex.reps}</td>
                            <td class="exercise-rest">${ex.rest}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${i === w.days.length - 1 ? `<div class="progression-note"><strong>Progression:</strong> ${w.progressionNote}</div>` : ''}
        `;
        daysEl.appendChild(content);
    });

    // Wire muscle-highlight hover events on all exercise rows
    const muscleInfo = document.getElementById('wmMuscleInfo');
    const resetHint = () => {
        if (muscleInfo) muscleInfo.innerHTML = '<div class="muscle-panel-hint">Hover an exercise to see muscles worked</div>';
        highlightMuscles([], []);
    };
    const fmt = arr => arr.map(s => s.replace(/-/g, ' ')).map(s => s[0].toUpperCase() + s.slice(1)).join(', ');
    daysEl.querySelectorAll('tr[data-exercise]').forEach(tr => {
        tr.addEventListener('mouseenter', () => {
            const data = getMuscleData(tr.dataset.exercise);
            if (!data || !muscleInfo) return;
            muscleInfo.innerHTML = `
                <div class="muscle-panel-primary">Primary: ${fmt(data.p)}</div>
                ${data.s.length ? `<div class="muscle-panel-secondary">Secondary: ${fmt(data.s)}</div>` : ''}
            `;
            highlightMuscles(data.p, data.s);
        });
    });
    daysEl.querySelectorAll('.exercise-table tbody').forEach(tbody => {
        tbody.addEventListener('mouseleave', resetHint);
    });

    const modal = document.getElementById('workoutModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function switchWorkoutDay(idx, total) {
    for (let i = 0; i < total; i++) {
        const tab = document.querySelectorAll('.workout-day-tab')[i];
        const content = document.getElementById(`wm-day-${i}`);
        if (tab) { tab.classList.toggle('active', i === idx); tab.setAttribute('aria-selected', i === idx ? 'true' : 'false'); }
        if (content) content.classList.toggle('active', i === idx);
    }
}

window.closeWorkoutModal = function() {
    const modal = document.getElementById('workoutModal');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
};

// Generate workout from 1RM calculation
window.openGeneratedWorkout = function(orm, exercise, pct) {
    const exerciseData = {
        squat: {
            name: 'Squat-Focus Strength Session',
            days: [{
                label: 'Full Session',
                focus: `Squat Focus · Based on ${orm} lbs 1RM`,
                exercises: [
                    { name: 'Barbell Back Squat', sets: '5', reps: `3–5 @ ${Math.round(orm * 0.80 / 5) * 5} lbs (80%)`, rest: '3–4 min', note: 'Primary strength movement — competition depth' },
                    { name: 'Pause Squat', sets: '3', reps: `3 @ ${Math.round(orm * 0.70 / 5) * 5} lbs (70%)`, rest: '3 min', note: '2-second pause at bottom to build bottom-end power' },
                    { name: 'Romanian Deadlift', sets: '3', reps: `8 @ ${Math.round(orm * 0.50 / 5) * 5} lbs (est.)`, rest: '2 min', note: 'Posterior chain and hamstring development' },
                    { name: 'Leg Press', sets: '3', reps: '10–12', rest: '90 sec', note: 'Quad volume — full range of motion' },
                    { name: 'Leg Curl', sets: '3', reps: '12–15', rest: '60 sec', note: 'Hamstring balance' },
                    { name: 'Ab Wheel Rollout', sets: '3', reps: '8–12', rest: '60 sec', note: 'Core stability for heavy squats' },
                ],
            }],
            progressionNote: `Your working weights are based on your ${orm} lbs 1RM. Add 5 lbs to your top set next session if all reps were completed with 1–2 reps in reserve.`,
        },
        bench: {
            name: 'Bench-Focus Strength Session',
            days: [{
                label: 'Full Session',
                focus: `Bench Focus · Based on ${orm} lbs 1RM`,
                exercises: [
                    { name: 'Barbell Bench Press', sets: '5', reps: `3–5 @ ${Math.round(orm * 0.80 / 5) * 5} lbs (80%)`, rest: '3–4 min', note: 'Primary press — competition setup, pause on chest' },
                    { name: 'Close-Grip Bench Press', sets: '3', reps: `5 @ ${Math.round(orm * 0.70 / 5) * 5} lbs (70%)`, rest: '3 min', note: 'Tricep strength for bench lockout' },
                    { name: 'Incline DB Press', sets: '3', reps: '8–10', rest: '90 sec', note: 'Upper chest volume — sets of 3-4 @ moderate weight' },
                    { name: 'Barbell Row', sets: '4', reps: '6–8', rest: '2 min', note: 'Back strength supports bench press arch and stability' },
                    { name: 'Face Pulls', sets: '3', reps: '20', rest: '45 sec', note: 'Shoulder health — always include on bench days' },
                    { name: 'Tricep Pushdown', sets: '3', reps: '12–15', rest: '60 sec', note: 'Tricep volume for lockout strength' },
                ],
            }],
            progressionNote: `Based on your ${orm} lbs 1RM. Add 2.5 lbs when all sets are completed at RPE 8 or below.`,
        },
        deadlift: {
            name: 'Deadlift-Focus Strength Session',
            days: [{
                label: 'Full Session',
                focus: `Deadlift Focus · Based on ${orm} lbs 1RM`,
                exercises: [
                    { name: 'Conventional Deadlift', sets: '4', reps: `2–3 @ ${Math.round(orm * 0.85 / 5) * 5} lbs (85%)`, rest: '5 min', note: 'Primary pull — full reset between reps, brace hard' },
                    { name: 'Deficit Deadlift', sets: '3', reps: `3 @ ${Math.round(orm * 0.70 / 5) * 5} lbs (70%)`, rest: '4 min', note: '2" deficit, builds strength off the floor' },
                    { name: 'Barbell Row', sets: '4', reps: '6–8', rest: '2.5 min', note: 'Upper back — directly supports deadlift lockout' },
                    { name: 'Good Morning', sets: '3', reps: '8', rest: '2 min', note: 'Posterior chain strength — go light and feel it' },
                    { name: 'Leg Curl', sets: '3', reps: '12–15', rest: '60 sec', note: 'Hamstring isolation and injury prevention' },
                    { name: 'Plank', sets: '3', reps: '45–60 sec', rest: '45 sec', note: 'Core stability for heavy pulling patterns' },
                ],
            }],
            progressionNote: `Based on your ${orm} lbs 1RM. Add 5–10 lbs when top sets feel like RPE 8 or below.`,
        },
        ohp: {
            name: 'Overhead Press Session',
            days: [{
                label: 'Full Session',
                focus: `OHP Focus · Based on ${orm} lbs 1RM`,
                exercises: [
                    { name: 'Overhead Press', sets: '5', reps: `3–5 @ ${Math.round(orm * 0.80 / 2.5) * 2.5} lbs (80%)`, rest: '3 min', note: 'Strict press, no leg drive — core braced throughout' },
                    { name: 'Push Press', sets: '3', reps: `3 @ ${Math.round(orm * 0.90 / 2.5) * 2.5} lbs (90%)`, rest: '3 min', note: 'Overload with leg drive for heavier stimulus' },
                    { name: 'DB Lateral Raise', sets: '4', reps: '15–20', rest: '45 sec', note: 'Side delt volume — light weight, full range' },
                    { name: 'Weighted Pull-ups', sets: '4', reps: '5–8', rest: '2.5 min', note: 'Pull strength balances vertical pressing' },
                    { name: 'Skull Crushers', sets: '3', reps: '10–12', rest: '75 sec', note: 'Tricep strength assists overhead lockout' },
                    { name: 'Face Pulls', sets: '3', reps: '20', rest: '45 sec', note: 'Rear delt and rotator cuff health' },
                ],
            }],
            progressionNote: `Based on your ${orm} lbs 1RM. Add 2.5 lbs when all pressing sets are clean with good form.`,
        },
    };

    const data = exerciseData[exercise] || exerciseData['squat'];
    const workoutId = `_generated_${exercise}`;
    WORKOUTS[workoutId] = data;
    openWorkoutModal(workoutId);
};

console.log('%cFitPlan', 'color:#FF6B35;font-size:24px;font-weight:800;letter-spacing:-1px;');
console.log('%cBuilt by Adam Parks, Mikiyas Wolde & Tarun Sreekanth', 'color:#F59E0B;font-size:13px;');
