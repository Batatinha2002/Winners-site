document.addEventListener('DOMContentLoaded', () => {

    /* --- Hero Title Scroll Animation --- */
    gsap.registerPlugin(ScrollTrigger);
    const heroTitle = document.getElementById('hero-title');

    if (heroTitle) {
        gsap.to(heroTitle, {
            scale: 0.7,
            opacity: 0,
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });
    }

    /* --- Scroll Progress Bar --- */
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    /* --- Sticky Navbar Blur --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    /* --- Intersection Observer for Scroll Animations --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // If it's the stats section, trigger counters
                if (entry.target.id === 'stats') {
                    startCounters();
                }

                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.animate-fade, .animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-scale');
    animElements.forEach(el => observer.observe(el));

    // Special observer for the stats wrapper to trigger counters together
    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);

    /* --- Parallax Video Background & Audio Toggle --- */
    const bgVideo = document.getElementById('bg-video');
    const audioToggleBtn = document.getElementById('audio-toggle');
    const iconMuted = document.getElementById('icon-muted');
    const iconUnmuted = document.getElementById('icon-unmuted');

    // Audio Toggle Logic
    if (bgVideo && audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            if (bgVideo.muted) {
                bgVideo.muted = false;
                iconMuted.style.display = 'none';
                iconUnmuted.style.display = 'block';
            } else {
                bgVideo.muted = true;
                iconMuted.style.display = 'block';
                iconUnmuted.style.display = 'none';
            }
        });
    }

    /* --- Animated Counters --- */
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    /* --- Accordion FAQ --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* --- Testimonial Carousel --- */
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cards = track.querySelectorAll('.testimonial-card');
        const totalCards = cards.length;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });
    }

    /* --- Form Submission (Construct WhatsApp URL) --- */
    const form = document.getElementById('application-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const perfil = document.getElementById('perfil').value;
            const desafio = document.getElementById('desafio').value;

            // Format message for WhatsApp
            const message = `Olá, vim pelo formulário de aplicação. \n\n*Nome:* ${nome}\n*Perfil:* ${perfil}\n*Desafio Atual:* ${desafio}`;
            const encodedMessage = encodeURIComponent(message);

            // Your WhatsApp Number here
            const waNumber = '5511999999999';
            const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

            // Open window
            window.open(waLink, '_blank');
        });
    }

});
