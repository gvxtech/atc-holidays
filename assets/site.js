// ============================================
// NAVBAR, FOOTER YEAR & ENQUIRY FORM
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', () => {

            const isOpen = links.classList.toggle('open');

            toggle.setAttribute('aria-expanded', String(isOpen));

        });
    }

    // Dynamic copyright year
    document.querySelectorAll('[data-year]').forEach(x => {
        x.textContent = new Date().getFullYear();
    });

    // Enquiry form
    const form = document.querySelector('#enquiry-form');

    if (form) {
        form.addEventListener('submit', e => {

            e.preventDefault();

            const d = new FormData(form);

            const body = [...d.entries()]
                .map(([k, v]) => `${k}: ${v}`)
                .join('\n');

            location.href =
                `mailto:hello@example.com?subject=Website Enquiry&body=${encodeURIComponent(body)}`;

        });
    }

});


// ============================================
// DESTINATION HERO SLIDER
// HTML DATA ATTRIBUTES - NO JS ARRAY
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    const hero = document.querySelector('#destinationHero');

    if (!hero) return;

    // Get all destination backgrounds from HTML
    const bgs = [...hero.querySelectorAll('.destination-bg')];

    if (!bgs.length) return;

    // Destination content elements
    const title = hero.querySelector('#destinationTitle');
    const desc = hero.querySelector('#destinationDescription');
    const number = hero.querySelector('#currentNumber');
    const explore = hero.querySelector('#destinationExplore');

    // Progress bar
    const progress = hero.querySelector('.progress-fill');

    // Total destination counter
    const totalNumber = hero.querySelector('.destination-counter span:last-child');

    // Navigation buttons (if added to HTML)
    const prevButton = hero.querySelector('#prevDestination');
    const nextButton = hero.querySelector('#nextDestination');

    let active = 0;

    // Automatic slide duration
    const slideDuration = 3200;


    // ========================================
    // SHOW DESTINATION
    // ========================================

    function show(i) {

        // Loop destinations
        active = (i + bgs.length) % bgs.length;

        // Read content directly from HTML
        const current = bgs[active];

        const name = current.dataset.name;
        const description = current.dataset.description;
        const url = current.dataset.url;

        // Content animation
        if (title) title.classList.add('changing');
        if (desc) desc.classList.add('changing');

        setTimeout(() => {

            if (title) {
                title.textContent = name || '';
            }

            if (desc) {
                desc.textContent = description || '';
            }

            if (explore && url) {
                explore.href = url;
            }

            if (number) {
                number.textContent =
                    String(active + 1).padStart(2, '0');
            }

            if (title) title.classList.remove('changing');
            if (desc) desc.classList.remove('changing');

        }, 220);


        // Update background images
        bgs.forEach((bg, n) => {

            bg.classList.toggle('active', n === active);

        });


        // Update total destination count
        if (totalNumber) {
            totalNumber.textContent =
                String(bgs.length).padStart(2, '0');
        }


        // Update progress bar
        if (progress) {

            progress.style.width =
                ((active + 1) / bgs.length * 100) + '%';

        }

    }


    // ========================================
    // DESKTOP PREVIOUS BUTTON
    // ========================================

    if (prevButton) {

        prevButton.addEventListener('click', () => {

            show(active - 1);

        });

    }


    // ========================================
    // DESKTOP NEXT BUTTON
    // ========================================

    if (nextButton) {

        nextButton.addEventListener('click', () => {

            show(active + 1);

        });

    }


    // ========================================
    // MOBILE SWIPE NAVIGATION
    // ========================================

    let touchStartX = 0;
    let touchStartY = 0;

    hero.addEventListener('touchstart', e => {

        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;

    }, { passive: true });


    hero.addEventListener('touchend', e => {

        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Detect horizontal swipe only
        if (
            Math.abs(diffX) > 50 &&
            Math.abs(diffX) > Math.abs(diffY)
        ) {

            if (diffX < 0) {

                // Swipe left = Next
                show(active + 1);

            } else {

                // Swipe right = Previous
                show(active - 1);

            }

        }

    }, { passive: true });


    // ========================================
    // INITIAL DESTINATION
    // ========================================

    show(0);


    // ========================================
    // AUTOMATIC SLIDING
    // NEVER STOPS AFTER MANUAL NAVIGATION
    // ========================================

    setInterval(() => {

        show(active + 1);

    }, slideDuration);

});


// ============================================
// PREMIUM PAGE INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.site-header');
    const progress = document.querySelector('.page-progress');

    const updateScroll = () => {

        const y = window.scrollY;

        if (header) {
            header.classList.toggle('scrolled', y > 35);
        }

        if (progress) {

            const max =
                document.documentElement.scrollHeight - window.innerHeight;

            progress.style.width =
                (max > 0 ? y / max * 100 : 0) + '%';

        }

    };

    updateScroll();

    window.addEventListener('scroll', updateScroll, {
        passive: true
    });


    // Scroll reveal animations
    const targets = document.querySelectorAll(
        'main section, .page-hero, footer .footer-grid, .card, .split > *'
    );

    targets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('visible');

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -35px 0px'
        });

        targets.forEach(el => observer.observe(el));

    } else {

        targets.forEach(el => el.classList.add('visible'));

    }


    // Active navigation link
    const current =
        location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(a => {

        if (a.getAttribute('href') === current) {

            a.classList.add('current-page');

        }

    });

});