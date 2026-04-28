// script.js
(function() {
    'use strict';

    // ===== State =====
    let currentLang = 'en';
    let currentTheme = 'light';
    let translations = {};

    // ===== DOM Elements =====
    const header = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    // ===== Initialize Lucide Icons =====
    function initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // ===== Load Translations =====
    function loadTranslations(lang) {
        // Translations are loaded from JSON files in the HTML
        // We'll fetch them dynamically
        return fetch(`assets/lang/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                translations[lang] = data;
                return data;
            })
            .catch(error => {
                console.error(`Failed to load translations for ${lang}:`, error);
                return null;
            });
    }

    // ===== Update Content with Translations =====
    function updateContent(lang) {
        const t = translations[lang];
        if (!t) return;

        document.documentElement.lang = lang === 'ar' ? 'ar' : lang === 'fr' ? 'fr' : 'en';
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        updateNavLinks(t);
        updateHomeSection(t);
        updateFeaturesSection(t);
        updatePlatformSection(t);
        updateCTASection(t);
        updateAboutSection(t);
        updateStatsSection(t);
        updateTeamSection(t);
        updatePricingSection(t);
        updateResourcesSection(t);
        updateContactSection(t);
        updateFooter(t);
    }

    function updateNavLinks(t) {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        const navMap = {
            'home': t.nav?.home || 'Home',
            'platform': t.nav?.platform || 'Platform',
            'about': t.nav?.about || 'About',
            'pricing': t.nav?.pricing || 'Pricing',
            'resources': t.nav?.resources || 'Resources',
            'contact': t.nav?.contact || 'Contact'
        };

        navLinks.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section && navMap[section]) {
                link.textContent = navMap[section];
            }
        });

        const ctaBtn = document.querySelector('.desktop-only.btn-primary');
        if (ctaBtn) {
            ctaBtn.textContent = t.nav?.cta || 'Get Started';
        }
    }

    function updateHomeSection(t) {
        const home = t.landing?.home;
        if (!home) return;

        // Badge
        const badge = document.querySelector('.hero-section .badge');
        if (badge) badge.textContent = home.hero_badge || 'The Future of Land Intelligence';

        // Title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && home.title && home.subtitle) {
            heroTitle.innerHTML = `${home.title}<br /><span class="gradient-text">${home.subtitle}</span>`;
        }

        // Description
        const heroDesc = document.querySelector('.hero-desc');
        if (heroDesc) heroDesc.textContent = home.hero_desc || '';

        // CTA Buttons
        const heroBtns = document.querySelectorAll('.hero-btns .btn');
        if (heroBtns[0]) heroBtns[0].innerHTML = `${home.cta_trial || 'Get Started Free'} <i data-lucide="arrow-right" class="icon-sm"></i>`;
        if (heroBtns[1]) heroBtns[1].textContent = home.cta_demo || 'Book Demo';

        // Market growth card
        const heroCardLabel = document.querySelector('.hero-card-label');
        if (heroCardLabel) heroCardLabel.textContent = home.market_growth || 'Market Growth';
        const heroCardSub = document.querySelector('.hero-card-sub');
        if (heroCardSub) heroCardSub.textContent = home.vs_last_year || 'vs last year';

        initIcons();
    }

    function updateFeaturesSection(t) {
        const home = t.landing?.home;
        if (!home) return;

        const sectionTitle = document.querySelector('.features-section .section-title');
        if (sectionTitle) sectionTitle.textContent = home.features_title || '';

        const sectionDesc = document.querySelector('.features-section .section-desc');
        if (sectionDesc) sectionDesc.textContent = home.features_desc || '';

        const featureCards = document.querySelectorAll('.features-grid .feature-card');
        const features = [
            { title: home.features?.global_coverage || 'Global Data Coverage', desc: home.features?.global_coverage_desc || '' },
            { title: home.features?.advanced_analytics || 'Advanced Analytics', desc: home.features?.advanced_analytics_desc || '' },
            { title: home.features?.secure_transactions || 'Secure Transactions', desc: home.features?.secure_transactions_desc || '' },
            { title: home.features?.real_time || 'Real-time Updates', desc: home.features?.real_time_desc || '' }
        ];

        featureCards.forEach((card, i) => {
            if (features[i]) {
                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                if (h3) h3.textContent = features[i].title;
                if (p) p.textContent = features[i].desc;
            }
        });
    }

    function updateCTASection(t) {
        const home = t.landing?.home;
        if (!home) return;

        const ctaTitle = document.querySelector('.cta-title');
        if (ctaTitle) ctaTitle.textContent = home.cta_section_title || '';

        const ctaDesc = document.querySelector('.cta-desc');
        if (ctaDesc) ctaDesc.textContent = home.cta_section_desc || '';

        const ctaBtn = document.querySelector('.cta-content .btn');
        if (ctaBtn) ctaBtn.textContent = home.cta_section_btn || 'Get Started Now';
    }

    function updatePlatformSection(t) {
        const platform = t.landing?.platform;
        if (!platform) return;

        const heroTitle = document.querySelector('.platform-section .section-title');
        if (heroTitle) heroTitle.textContent = platform.hero_title || '';

        const heroDesc = document.querySelector('.platform-section .section-desc');
        if (heroDesc) heroDesc.textContent = platform.hero_desc || '';

        const stackTitle = document.querySelector('.tech-section .section-title');
        if (stackTitle) stackTitle.textContent = platform.stack_title || '';

        const stackDesc = document.querySelector('.tech-section .section-desc');
        if (stackDesc) stackDesc.textContent = platform.stack_desc || '';

        const techCards = document.querySelectorAll('.tech-grid .tech-card');
        const techs = [
            { title: platform.tech?.ingestion || 'Data Ingestion', desc: platform.tech?.ingestion_desc || '' },
            { title: platform.tech?.ai || 'AI Analysis Layer', desc: platform.tech?.ai_desc || '' },
            { title: platform.tech?.infra || 'Scalable Infrastructure', desc: platform.tech?.infra_desc || '' },
            { title: platform.tech?.security || 'Enterprise Security', desc: platform.tech?.security_desc || '' }
        ];

        techCards.forEach((card, i) => {
            if (techs[i]) {
                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                if (h3) h3.textContent = techs[i].title;
                if (p) p.textContent = techs[i].desc;
            }
        });
    }

    function updateAboutSection(t) {
        const about = t.landing?.about;
        if (!about) return;

        const heroTitle = document.querySelector('.about-hero .section-title');
        if (heroTitle) heroTitle.textContent = about.hero_title || '';

        const heroDesc = document.querySelector('.about-hero .section-desc');
        if (heroDesc) heroDesc.textContent = about.hero_desc || '';

        const aboutItems = document.querySelectorAll('.about-item');
        if (aboutItems[0]) {
            const h2 = aboutItems[0].querySelector('h2');
            const p = aboutItems[0].querySelector('p');
            if (h2) h2.textContent = about.mission || 'Our Mission';
            if (p) p.textContent = about.mission_desc || '';
        }
        if (aboutItems[1]) {
            const h2 = aboutItems[1].querySelector('h2');
            const p = aboutItems[1].querySelector('p');
            if (h2) h2.textContent = about.vision || 'Our Vision';
            if (p) p.textContent = about.vision_desc || '';
        }

        // Stats
        const statLabels = document.querySelectorAll('.stat-label');
        const statLabelsText = [
            about.stats?.countries || 'Countries Covered',
            about.stats?.points || 'Data Points',
            about.stats?.clients || 'Enterprise Clients',
            about.stats?.history || 'Years of History'
        ];
        statLabels.forEach((label, i) => {
            if (statLabelsText[i]) label.textContent = statLabelsText[i];
        });

        // Team
        const teamTitle = document.querySelector('.team-section .section-title');
        if (teamTitle) teamTitle.textContent = about.team_title || 'Built by Experts';

        const teamDesc = document.querySelector('.team-section .section-desc');
        if (teamDesc) teamDesc.textContent = about.team_desc || '';
    }

    function updateStatsSection(t) {
        // Stats are updated in updateAboutSection
        const about = t.landing?.about;
        if (!about) return;
        const statLabels = document.querySelectorAll('.stat-label');
        const statLabelsText = [
            about.stats?.countries || 'Countries Covered',
            about.stats?.points || 'Data Points',
            about.stats?.clients || 'Enterprise Clients',
            about.stats?.history || 'Years of History'
        ];
        statLabels.forEach((label, i) => {
            if (statLabelsText[i]) label.textContent = statLabelsText[i];
        });
    }

    function updateTeamSection(t) {
        // Team section is updated in updateAboutSection
    }

    function updatePricingSection(t) {
        const pricing = t.landing?.pricing;
        if (!pricing) return;

        const heroTitle = document.querySelector('.pricing-section .section-title');
        if (heroTitle) heroTitle.textContent = pricing.hero_title || '';

        const heroDesc = document.querySelector('.pricing-section .section-desc');
        if (heroDesc) heroDesc.textContent = pricing.hero_desc || '';

        const pricingCards = document.querySelectorAll('.pricing-card');
        const plans = [
            { name: pricing.plans?.starter || 'Starter', desc: pricing.plans?.starter_desc || '', btn: pricing.plans?.get_started || 'Get Started' },
            { name: pricing.plans?.enterprise || 'Enterprise', desc: pricing.plans?.enterprise_desc || '', btn: pricing.plans?.get_started || 'Get Started' },
            { name: pricing.plans?.custom || 'Custom', desc: pricing.plans?.custom_desc || '', btn: pricing.plans?.contact_btn || 'Contact Sales' }
        ];

        pricingCards.forEach((card, i) => {
            if (plans[i]) {
                const name = card.querySelector('.pricing-name');
                const desc = card.querySelector('.pricing-desc');
                const btn = card.querySelector('.btn');
                if (name) name.textContent = plans[i].name;
                if (desc) desc.textContent = plans[i].desc;
                if (btn) btn.textContent = plans[i].btn;
            }
        });

        // Update "Contact Us" price
        const customPrice = document.querySelectorAll('.pricing-card')[2]?.querySelector('.price-value');
        if (customPrice && pricing.plans?.contact) {
            customPrice.textContent = pricing.plans.contact;
        }
    }

    function updateResourcesSection(t) {
        const resources = t.landing?.resources;
        if (!resources) return;

        const heroTitle = document.querySelector('.resources-section .section-title');
        if (heroTitle) heroTitle.textContent = resources.hero_title || '';

        const heroDesc = document.querySelector('.resources-section .section-desc');
        if (heroDesc) heroDesc.textContent = resources.hero_desc || '';

        const resourceLinks = document.querySelectorAll('.resource-link');
        resourceLinks.forEach(link => {
            const textNode = link.firstChild;
            if (textNode && textNode.nodeType === 3) {
                textNode.textContent = resources.read_more || 'Read More';
            }
        });
        initIcons();
    }

    function updateContactSection(t) {
        const contact = t.landing?.contact;
        if (!contact) return;

        const heroTitle = document.querySelector('.contact-section .section-title');
        if (heroTitle) heroTitle.textContent = contact.hero_title || 'Get in Touch';

        const heroDesc = document.querySelector('.contact-section .section-desc');
        if (heroDesc) heroDesc.textContent = contact.hero_desc || '';

        const contactItems = document.querySelectorAll('.contact-item h3');
        if (contactItems[0]) contactItems[0].textContent = contact.hq || 'Headquarters';
        if (contactItems[1]) contactItems[1].textContent = contact.email || 'Email Us';
        if (contactItems[2]) contactItems[2].textContent = contact.call || 'Call Us';

        const formTitle = document.querySelector('.contact-form-title');
        if (formTitle) formTitle.textContent = contact.form?.title || 'Send us a message';

        // Form labels
        const labels = document.querySelectorAll('.contact-form .form-group label');
        if (labels[0]) labels[0].textContent = contact.form?.first_name || 'First Name';
        if (labels[1]) labels[1].textContent = contact.form?.last_name || 'Last Name';
        if (labels[2]) labels[2].textContent = contact.form?.email || 'Email';
        if (labels[3]) labels[3].textContent = contact.form?.message || 'Message';

        const submitBtn = document.querySelector('.contact-form .btn');
        if (submitBtn) submitBtn.textContent = contact.form?.submit || 'Send Message';
    }

    function updateFooter(t) {
        const tagline = document.querySelector('.footer-tagline');
        if (tagline && t.footer?.tagline) {
            tagline.textContent = t.footer.tagline;
        }

        const footerHeadings = document.querySelectorAll('.footer-links h3');
        if (footerHeadings[0] && t.footer?.platform) footerHeadings[0].textContent = t.footer.platform;
        if (footerHeadings[1] && t.footer?.resources) footerHeadings[1].textContent = t.footer.resources;
        if (footerHeadings[2] && t.footer?.company) footerHeadings[2].textContent = t.footer.company;
    }

    // ===== Theme Toggle =====
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('scoplit-theme', currentTheme);
    }

    function applyTheme(theme) {
        currentTheme = theme;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Update icons
        const moonIcon = document.querySelector('.icon-moon');
        const sunIcon = document.querySelector('.icon-sun');
        if (moonIcon && sunIcon) {
            if (theme === 'dark') {
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            } else {
                moonIcon.classList.remove('hidden');
                sunIcon.classList.add('hidden');
            }
        }
    }

    // ===== Language Switching =====
    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('scoplit-lang', lang);

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        if (translations[lang]) {
            updateContent(lang);
        } else {
            loadTranslations(lang).then(() => updateContent(lang));
        }
    }

    // ===== Mobile Menu =====
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
    }

    // ===== Scroll Handler =====
    function handleScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // ===== Form Submission =====
    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;

        // Simple validation
        const firstName = form.querySelector('#firstName').value.trim();
        const lastName = form.querySelector('#lastName').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!firstName || !lastName || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            form.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = translations[currentLang]?.landing?.contact?.form?.submit || 'Send Message';
        }, 1500);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ===== Smooth Scroll =====
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = 80;
            const position = element.offsetTop - offset;
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    }

    // ===== Event Listeners =====
    function initEventListeners() {
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);

        // Language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                switchLanguage(btn.getAttribute('data-lang'));
            });
        });

        // Mobile menu
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-nav-link, .mobile-menu .btn').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
                if (link.getAttribute('href')) {
                    smoothScroll(link.getAttribute('href'));
                }
            });
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    smoothScroll(href);
                }
            });
        });

        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Scroll
        window.addEventListener('scroll', handleScroll);
    }

    // ===== Initialize =====
    async function init() {
        // Load saved preferences
        const savedTheme = localStorage.getItem('scoplit-theme') || 'light';
        const savedLang = localStorage.getItem('scoplit-lang') || 'en';

        // Apply theme
        applyTheme(savedTheme);

        // Load default language
        if (savedLang !== 'en') {
            await loadTranslations('en');
        }
        await loadTranslations(savedLang);

        // Apply language
        switchLanguage(savedLang);

        // Initialize icons
        initIcons();

        // Event listeners
        initEventListeners();

        // Initial scroll check
        handleScroll();

        console.log('SCOPLIT Landing Page initialized');
    }

    // Start the app
    init();
})();