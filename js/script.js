/**
 * Nior Cosmetics - Main JavaScript
 */
(function () {
    'use strict';

    // DOM Elements
    const backToTop = document.querySelector('.back-to-top');
    const scrollButtons = document.querySelectorAll('.slider-btn');
    const stickyHeader = document.querySelector('.header-sticky');
    const mainHeader = document.querySelector('.site-header');

    // Configuration
    const stickyScrollAmount = 400;
    const backToTopScrollAmount = 600;

    /**
     * Handle Back to Top Button visibility
     */
    function handleBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > backToTopScrollAmount) {
            backToTop.classList.add('is-visible');
        } else {
            backToTop.classList.remove('is-visible');
        }
    }

    /**
     * Handle Sticky Header visibility
     */
    function handleStickyHeader() {
        if (!stickyHeader) return;

        if (window.scrollY > stickyScrollAmount) {
            stickyHeader.classList.add('is-visible');
        } else {
            stickyHeader.classList.remove('is-visible');
        }
    }

    /**
     * Scroll event handler with throttling
     */
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                handleBackToTop();
                handleStickyHeader();
                ticking = false;
            });
            ticking = true;
        }
    }

    /**
     * Initialize scroll event listeners
     */
    function initScrollEvents() {
        window.addEventListener('scroll', onScroll, { passive: true });

        // Initial check
        handleBackToTop();
        handleStickyHeader();
    }

    /**
     * Initialize Back to Top click handler
     */
    function initBackToTop() {
        if (!backToTop) return;

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Initialize Product Slider scroll buttons
     */
    function initScrollButtons() {
        scrollButtons.forEach(function (button) {
            const targetId = button.getAttribute('data-scroll-target');
            const target = document.getElementById(targetId);

            if (!target) return;

            button.addEventListener('click', function () {
                const direction = button.getAttribute('data-direction') === 'left' ? -1 : 1;
                const scrollAmount = target.clientWidth * 0.8;

                target.scrollBy({
                    left: direction * scrollAmount,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Initialize dropdown hover on desktop
     */
    function initDropdownHover() {
        if (window.innerWidth < 992) return;

        const dropdowns = document.querySelectorAll('.navbar .dropdown');

        dropdowns.forEach(function (dropdown) {
            dropdown.addEventListener('mouseenter', function () {
                const menu = this.querySelector('.dropdown-menu');
                const toggle = this.querySelector('.dropdown-toggle');

                if (menu && toggle) {
                    menu.classList.add('show');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });

            dropdown.addEventListener('mouseleave', function () {
                const menu = this.querySelector('.dropdown-menu');
                const toggle = this.querySelector('.dropdown-toggle');

                if (menu && toggle) {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    /**
     * Simple filter plugin for Today's Deal grid
     */
    function initTddFilterPlugin() {
        const filterGroup = document.querySelector('[data-filter-group="tdd-products"]');
        const target = document.querySelector('[data-filter-target="tdd-products"]');

        if (!filterGroup || !target) return;

        const buttons = filterGroup.querySelectorAll('.tdd-filter-btn');
        const items = target.querySelectorAll('.tdd-item');

        function setActiveButton(activeBtn) {
            buttons.forEach(function (btn) {
                btn.classList.toggle('is-active', btn === activeBtn);
            });
        }

        function applyFilter(filter) {
            items.forEach(function (item) {
                const category = item.getAttribute('data-category');
                const isVisible = filter === 'all' || category === filter;
                item.style.display = isVisible ? '' : 'none';
            });
        }

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                const filter = button.getAttribute('data-filter');
                setActiveButton(button);
                applyFilter(filter);
            });
        });

        const initial = filterGroup.querySelector('.tdd-filter-btn.is-active') || buttons[0];
        if (initial) {
            applyFilter(initial.getAttribute('data-filter'));
        }
    }

    /**
     * Touch-friendly hover swap for Cosmetics cards
     */
    function initCosmeticsHoverPlugin() {
        const cards = document.querySelectorAll('.csm-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            card.addEventListener('touchstart', function () {
                cards.forEach(function (item) {
                    if (item !== card) {
                        item.classList.remove('is-hover');
                    }
                });
                card.classList.toggle('is-hover');
            }, { passive: true });
        });
    }

    /**
     * Touch-friendly hover swap for Skincare cards
     */
    function initSkincareHoverPlugin() {
        const cards = document.querySelectorAll('.skn-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            card.addEventListener('touchstart', function () {
                cards.forEach(function (item) {
                    if (item !== card) {
                        item.classList.remove('is-hover');
                    }
                });
                card.classList.toggle('is-hover');
            }, { passive: true });
        });
    }

    /**
     * Simple parallax plugin for Land of Glam hero
     */
    function initLdgParallaxPlugin() {
        const parallaxEl = document.querySelector('.ldg-parallax');
        if (!parallaxEl) return;

        const speed = parseFloat(parallaxEl.getAttribute('data-parallax-speed')) || 0.2;
        let tickingParallax = false;

        function onParallaxScroll() {
            if (tickingParallax) return;
            tickingParallax = true;
            window.requestAnimationFrame(function () {
                const offset = window.scrollY * speed;
                parallaxEl.style.transform = `translateY(${offset}px) scale(1.05)`;
                tickingParallax = false;
            });
        }

        window.addEventListener('scroll', onParallaxScroll, { passive: true });
        onParallaxScroll();
    }

    /**
     * Preload images for better UX
     */
    function preloadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(function (img) {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Add smooth scrolling to anchor links
     */
    function initSmoothScroll() {
        const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');

        anchors.forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Initialize all functionality
     */
    function init() {
        initScrollEvents();
        initBackToTop();
        initScrollButtons();
        initDropdownHover();
        initLdgParallaxPlugin();
        initTddFilterPlugin();
        initCosmeticsHoverPlugin();
        initSkincareHoverPlugin();
        initSmoothScroll();
        preloadImages();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize dropdown hover on resize
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initDropdownHover, 250);
    });

})();
