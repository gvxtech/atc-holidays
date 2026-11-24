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

// ============================================
// ATC HOLIDAYS - HORIZONTAL HERO SLIDER
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    const hero = document.querySelector('#destinationHero');

    if (!hero) return;

    const slides = [...hero.querySelectorAll('.destination-bg')];

    if (!slides.length) return;


    // Elements
    const title = hero.querySelector('#destinationTitle');
    const desc = hero.querySelector('#destinationDescription');
    const number = hero.querySelector('#currentNumber');
    const totalNumber = hero.querySelector('#totalNumber');
    const explore = hero.querySelector('#destinationExplore');
    const progress = hero.querySelector('.progress-fill');

    const prevButton = hero.querySelector('#prevDestination');
    const nextButton = hero.querySelector('#nextDestination');


    let current = 0;
    let isAnimating = false;

    const slideDuration = 5200;
    const transitionDuration = 800;


    // ============================================
    // TITLE
    // ============================================

    function updateTitle(name) {

        if (!title) return;

        const words = (name || '').trim().split(/\s+/);

        const firstWord = document.createElement('span');

        firstWord.className = 'tour-font';
        firstWord.textContent = words[0] || '';

        const remainingWords = document.createElement('span');

        remainingWords.className = 'package-font';
        remainingWords.textContent = words.slice(1).join(' ');

        title.replaceChildren(firstWord, remainingWords);
    }


    // ============================================
    // UPDATE CONTENT
    // ============================================

    function updateContent(index) {

        const slide = slides[index];

        if (!slide) return;

        const name = slide.dataset.name;
        const description = slide.dataset.description;
        const url = slide.dataset.url;

        updateTitle(name);

        if (desc) {
            desc.textContent = description || '';
        }

        if (explore && url) {
            explore.href = url;
        }

        if (number) {
            number.textContent = String(index + 1).padStart(2, '0');
        }

    }


    // ============================================
    // HORIZONTAL SLIDE TRANSITION
    // ============================================

   function showSlide(index, direction = 1) {

    if (isAnimating || index === current) return;

    isAnimating = true;

    const previous = slides[current];
    const next = slides[index];

    const copy = hero.querySelector('.destination-copy');

    // ==============================
    // TEXT EXIT ANIMATION
    // ==============================

    if (copy) {

        copy.classList.remove('text-enter', 'text-exit');

        copy.classList.add('text-exit');

    }

    // ==============================
    // PREPARE BACKGROUND
    // ==============================

    next.style.transition = 'none';

    next.style.transform =
        direction > 0 ? 'translateX(100%)' : 'translateX(-100%)';

    next.style.opacity = '1';

    next.classList.add('active');

    next.offsetHeight;

    // ==============================
    // BACKGROUND TRANSITION
    // ==============================

    next.style.transition =
        `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    previous.style.transition =
        `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    next.style.transform = 'translateX(0)';

    previous.style.transform =
        direction > 0 ? 'translateX(-100%)' : 'translateX(100%)';


    // ==============================
    // TEXT CONTENT UPDATE
    // ==============================

    setTimeout(() => {

        updateContent(index);

        if (copy) {

            copy.classList.remove('text-exit');

            copy.classList.add('text-enter');

        }

    }, 350);


    // ==============================
    // TEXT ENTER ANIMATION
    // ==============================

    setTimeout(() => {

        if (copy) {

            copy.classList.remove('text-enter');

        }

    }, 450);


    // ==============================
    // UPDATE CURRENT SLIDE
    // ==============================

    current = index;


    // ==============================
    // PROGRESS BAR
    // ==============================

    if (progress) {

        progress.style.width =
            ((current + 1) / slides.length * 100) + '%';

    }


    // ==============================
    // FINISH TRANSITION
    // ==============================

    setTimeout(() => {

        slides.forEach((slide, i) => {

            if (i !== current) {

                slide.classList.remove('active');

                slide.style.transition = 'none';

                slide.style.transform = 'translateX(100%)';

                slide.style.opacity = '0';

            }

        });

        previous.style.transition = 'none';

        isAnimating = false;

    }, transitionDuration);

}


    // ============================================
    // NEXT
    // ============================================

    function nextSlide() {

        const next = (current + 1) % slides.length;

        showSlide(next, 1);

    }


    // ============================================
    // PREVIOUS
    // ============================================

    function prevSlide() {

        const previous = (current - 1 + slides.length) % slides.length;

        showSlide(previous, -1);

    }


    // ============================================
    // BUTTON EVENTS
    // ============================================

    if (nextButton) {

        nextButton.addEventListener('click', nextSlide);

    }

    if (prevButton) {

        prevButton.addEventListener('click', prevSlide);

    }


    // ============================================
    // MOBILE SWIPE
    // ============================================

    let touchStartX = 0;
    let touchStartY = 0;

    hero.addEventListener('touchstart', event => {

        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;

    }, { passive: true });


    hero.addEventListener('touchend', event => {

        const touchEndX = event.changedTouches[0].screenX;
        const touchEndY = event.changedTouches[0].screenY;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (
            Math.abs(diffX) > 50 &&
            Math.abs(diffX) > Math.abs(diffY)
        ) {

            if (diffX < 0) {

                nextSlide();

            } else {

                prevSlide();

            }

        }

    }, { passive: true });


    // ============================================
    // INITIALIZATION
    // ============================================

    slides.forEach((slide, index) => {

        slide.style.transform =
            index === 0 ? 'translateX(0)' : 'translateX(100%)';

        slide.style.opacity = index === 0 ? '1' : '0';

    });


    updateContent(0);

    if (totalNumber) {
        totalNumber.textContent =
            String(slides.length).padStart(2, '0');
    }


    if (progress) {
        progress.style.width = (100 / slides.length) + '%';
    }


    // ============================================
    // AUTOMATIC SLIDING
    // ============================================

    setInterval(() => {

        if (!isAnimating) {
            nextSlide();
        }

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