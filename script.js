/**
 * ============================================
 * GAMES ONN - Premium Gaming Café
 * Main JavaScript File
 * ============================================
 */

/* ============================================
   BACKEND ROADMAP (For Future Implementation)
   ============================================
   
   WHY DATABASE IS NEEDED:
   1. Online slot booking - Store and manage reservations
   2. Payment gateway integration - Process payments securely
   3. User login/signup - User accounts for loyalty programs
   4. Admin panel - Manage offers, events, bookings
   5. Email notifications - Confirm bookings, send promotions
   
   RECOMMENDED TECH STACK:
   
   Option A: Node.js Stack (Recommended for scalability)
   - Backend: Node.js + Express.js
   - Database: MongoDB (flexible schema for gaming data)
   - Auth: JWT tokens + bcrypt for password hashing
   - Payment: Razorpay (India-friendly, supports UPI/Cards/NetBanking)
   - Email: Nodemailer + SendGrid or AWS SES
   - Hosting: AWS/DigitalOcean/Vercel
   
   Option B: Firebase Stack (Faster development)
   - Backend: Firebase Cloud Functions
   - Database: Firestore (real-time sync)
   - Auth: Firebase Authentication
   - Payment: Razorpay integration
   - Email: Firebase Extensions or Cloud Functions
   - Hosting: Firebase Hosting
   
   RAZORPAY INTEGRATION (India):
   - Supports UPI, Credit/Debit Cards, NetBanking, Wallets
   - Easy integration with both Node.js and frontend
   - Subscription support for VIP passes
   - Automatic invoicing
   
   DATABASE SCHEMA (MongoDB Example):
   
   Users Collection:
   {
     _id, name, email, phone, password (hashed),
     bookings: [], loyaltyPoints, createdAt
   }
   
   Bookings Collection:
   {
     _id, userId, date, timeSlot, device, duration,
     status, paymentId, amount, createdAt
   }
   
   Events/Tournaments Collection:
   {
     _id, title, game, date, prizePool, format,
     maxTeams, registrations: [], status
   }
   
   ============================================ */

// ============ DOM ELEMENTS ============
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const themeToggle = document.getElementById('themeToggle');
const heroVideo = document.getElementById('heroVideo');
const bookingForm = document.getElementById('bookingForm');
const newsletterForm = document.getElementById('newsletterForm');
const toastContainer = document.getElementById('toastContainer');
const particlesContainer = document.getElementById('particles');

// ============ GAMES DATA ============
const gamesData = [
    { slug: 'gta5', name: 'GTA V', genre: 'Action/Adventure' },
    { slug: 'cyberpunk2077', name: 'Cyberpunk 2077', genre: 'RPG' },
    { slug: 'csgo', name: 'CS:GO', genre: 'FPS' },
    { slug: 'cs2', name: 'Counter-Strike 2', genre: 'FPS' },
    { slug: 'rdr2', name: 'Red Dead Redemption 2', genre: 'Action/Adventure' },
    { slug: 'valorant', name: 'Valorant', genre: 'Tactical FPS' },
    { slug: 'eafc24', name: 'EA SPORTS FC 24', genre: 'Sports' },
    { slug: 'fifa23', name: 'FIFA 23', genre: 'Sports' },
    { slug: 'wwe2k25', name: 'WWE 2K25', genre: 'Wrestling' },
    { slug: 'forzahorizon5', name: 'Forza Horizon 5', genre: 'Racing' },
    { slug: 'godofwar', name: 'God of War', genre: 'Action/Adventure' },
    { slug: 'hitman3', name: 'Hitman 3', genre: 'Stealth' },
    { slug: 'minecraft', name: 'Minecraft', genre: 'Sandbox' },
    { slug: 'warzone', name: 'Call of Duty: Warzone', genre: 'Battle Royale' },
    { slug: 'apexlegends', name: 'Apex Legends', genre: 'Battle Royale' },
    { slug: 'pubg', name: 'PUBG: Battlegrounds', genre: 'Battle Royale' },
    { slug: 'rocketleague', name: 'Rocket League', genre: 'Sports' },
    { slug: 'nfsheat', name: 'Need for Speed Heat', genre: 'Racing' },
    { slug: 'witcher3', name: 'The Witcher 3', genre: 'RPG' },
    { slug: 'acvalhalla', name: "Assassin's Creed Valhalla", genre: 'Action RPG' }
];

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with Public Key
    // Replace 'YOUR_PUBLIC_KEY' with your actual public key from EmailJS dashboard
    if (typeof emailjs !== 'undefined') {
        emailjs.init("nQcNvC1JKh-NN1ZSv");
    }

    initTheme();
    initNavbar();
    initMobileMenu();
    initParticles();
    initGamesCarousel();
    initScrollReveal();
    initCounterAnimation();
    initFormHandlers();
    initHeroVideoFallback();
    setMinDate();
    initLightbox();
    initTestimonials();
});

// ============ THEME TOGGLE ============
function initTheme() {
    const savedTheme = localStorage.getItem('gamesonn-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('gamesonn-theme', newTheme);
    });
}

// ============ NAVBAR ============
function initNavbar() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============ PARTICLES ============
function initParticles() {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;

        // Random colors from our palette
        const colors = ['#00f5ff', '#8b5cf6', '#ff00ff', '#0066ff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        particlesContainer.appendChild(particle);
    }
}

// ============ GAMES CAROUSEL ============
function initGamesCarousel() {

    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const wrapper = document.querySelector('.games-carousel-wrapper');

    if (!carouselTrack) return;

    // Duplicate games for infinite feel
    const allGames = [...gamesData, ...gamesData];

    allGames.forEach((game, index) => {
        const card = createGameCard(game, index);
        carouselTrack.appendChild(card);
    });

    const cards = carouselTrack.querySelectorAll('.game-card');
    const totalCards = cards.length;

    let currentIndex = Math.floor(totalCards / 2);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let autoScrollTimer = null;

    const AUTO_DELAY = 800;   // ⏱ Change speed here
    const RESUME_DELAY = 800;

    // =============================
    // POSITION & ANIMATION
    // =============================

    // =============================
    // POSITION & ANIMATION
    // =============================

    function updateCarousel() {

        cards.forEach((card, index) => {

            const offset = index - currentIndex;
            const abs = Math.abs(offset);

            // 3D Transform Logic
            const translateX = offset * 260; // Spread distance
            const translateZ = -abs * 120;   // Depth
            const rotateY = offset * 22;     // Rotation
            const scale = Math.max(1 - abs * 0.12, 0.65);
            const opacity = Math.max(1 - abs * 0.18, 0.3);
            const blur = abs * 1.5;

            card.style.transform = `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;

            card.style.opacity = opacity;
            card.style.filter = `blur(${blur}px)`;

            // Fix z-index so center card is highest
            // Using a high base prevents conflicts
            card.style.zIndex = 100 - abs;

            card.classList.toggle('active', abs === 0);

        });
    }

    // =============================
    // INFINITE LOOP FIX
    // =============================

    function setCardTransitions(enable) {
        cards.forEach(card => {
            card.style.transition = enable ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        });
    }

    // Length of the original data (half of total cards)
    const realLength = gamesData.length;

    function normalizeIndex() {
        // If we are too far right
        if (currentIndex >= totalCards - 6) {
            // Disable transition for instant jump
            setCardTransitions(false);

            // Jump back by exactly one full set length
            // This ensures we land on the IDENTICAL card clone
            currentIndex -= realLength;

            updateCarousel();

            // Force reflow
            void carouselTrack.offsetWidth;

            // Re-enable transition
            setCardTransitions(true);
        }

        // If we are too far left
        if (currentIndex <= 6) {
            setCardTransitions(false);

            // Jump forward by one full set length
            currentIndex += realLength;

            updateCarousel();

            void carouselTrack.offsetWidth;

            setCardTransitions(true);
        }
    }

    // =============================
    // NAVIGATION
    // =============================

    function navigate(direction) {
        // First check if we need to reset to a safe position BEFORE moving
        // This effectively creates the infinite loop buffer
        normalizeIndex();

        // Now move freely
        if (direction === 'next') currentIndex++;
        if (direction === 'prev') currentIndex--;

        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        navigate('prev');
        setTimeout(startAutoScroll, RESUME_DELAY);
    });

    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        navigate('next');
        setTimeout(startAutoScroll, RESUME_DELAY);
    });

    // =============================
    // CLICK TO CENTER
    // =============================

    cards.forEach(card => {

        card.addEventListener('click', () => {

            stopAutoScroll();

            currentIndex = parseInt(card.dataset.index);

            normalizeIndex();
            updateCarousel();

            setTimeout(startAutoScroll, RESUME_DELAY);
        });

    });

    // =============================
    // AUTO SCROLL
    // =============================

    function startAutoScroll() {

        stopAutoScroll();

        autoScrollTimer = setInterval(() => {
            navigate('next');
        }, AUTO_DELAY);
    }

    function stopAutoScroll() {

        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
    }

    // =============================
    // HOVER PAUSE / RESUME
    // =============================

    if (wrapper && !isTouchDevice) {

        wrapper.addEventListener('mouseenter', () => {
            stopAutoScroll();
        });

        wrapper.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }

    // =============================
    // VIDEO PREVIEW (DESKTOP)
    // =============================

    if (!isTouchDevice) {

        cards.forEach(card => {

            const video = card.querySelector('.game-video');

            card.addEventListener('mouseenter', () => {
                if (video) {
                    video.play().catch(() => { });
                    card.classList.add('playing');
                }
            });

            card.addEventListener('mouseleave', () => {
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                    card.classList.remove('playing');
                }
            });

        });
    }

    // =============================
    // TAB VISIBILITY FIX
    // =============================

    document.addEventListener('visibilitychange', () => {

        if (document.hidden) stopAutoScroll();
        else startAutoScroll();

    });

    // =============================
    // INIT
    // =============================

    updateCarousel();
    startAutoScroll();   // 🚀 Start immediately
}



function createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.index = index;

    card.innerHTML = `
        <div class="game-card-inner">
            <img 
                class="game-poster" 
                src="assets/posters/${game.slug}.jpg" 
                alt="${game.name}"
                onerror="this.parentElement.parentElement.classList.add('poster-error')"
            >
            <div class="game-poster-fallback">🎮</div>

            <video class="game-video" muted loop playsinline></video>

            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <span class="game-genre">${game.genre}</span>
            </div>
        </div>
    `;

    // 👉 ADD VIDEO SOURCE SAFELY HERE
    const video = card.querySelector('.game-video');
    video.src = `assets/trailers/${game.slug}.mp4`;

    // 👉 If video missing, remove it (no blank screen)
    video.onerror = () => {
        video.remove();
    };

    return card;
}


// ============ SCROLL REVEAL ============
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ============ COUNTER ANIMATION ============
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
}

// ============ FORM HANDLERS ============
function initFormHandlers() {
    // Booking Form
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!validateForm(data)) {
                showToast('Please fill in all required fields', 'error');
                return;
            }

            // Send Email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_jbgkma5', 'template_hw9aplm', bookingForm)
                .then(() => {
                    showToast('🎮 Booking request submitted successfully! We\'ll contact you shortly.', 'success');
                    bookingForm.reset();
                    setMinDate();
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    showToast('❌ Failed to send booking request. Please try again or contact us directly.', 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = newsletterForm.querySelector('input[type="email"]').value;

            if (!email || !isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            console.log('Newsletter subscription:', email);
            showToast('🎉 Thanks for subscribing! Check your inbox for updates.', 'success');
            newsletterForm.reset();
        });
    }
}

function validateForm(data) {
    const required = ['name', 'phone', 'email', 'date', 'timeSlot', 'device', 'duration'];
    return required.every(field => data[field] && data[field].trim() !== '');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// ============ TOAST NOTIFICATIONS ============
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✅' : '❌';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ============ HERO VIDEO FALLBACK ============
function initHeroVideoFallback() {
    if (heroVideo) {
        heroVideo.addEventListener('error', () => {
            heroVideo.style.display = 'none';
            const overlay = document.querySelector('.hero-gradient-overlay');
            if (overlay) {
                overlay.style.background = `
                    linear-gradient(135deg, 
                        rgba(0, 245, 255, 0.2) 0%,
                        rgba(139, 92, 246, 0.3) 50%,
                        rgba(255, 0, 255, 0.2) 100%
                    ),
                    linear-gradient(180deg,
                        rgba(10, 14, 39, 0.8) 0%,
                        rgba(10, 14, 39, 0.9) 100%
                    )
                `;
            }
        });

        // Try to play video (may be blocked by browser)
        heroVideo.play().catch(() => {
            console.log('Video autoplay blocked');
        });
    }
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ LAZY LOAD VIDEOS ============
const lazyLoadVideos = () => {
    const videos = document.querySelectorAll('.game-video[data-src]');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.removeAttribute('data-src');
                videoObserver.unobserve(video);
            }
        });
    }, { rootMargin: '100px' });

    videos.forEach(video => videoObserver.observe(video));
};

// ============ PERFORMANCE OPTIMIZATION ============
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============ ACCESSIBILITY ============
// Handle keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trap on mobile menu
if (mobileOverlay) {
    trapFocus(mobileOverlay);
}

// Initialize focus trap on mobile menu
if (mobileOverlay) {
    trapFocus(mobileOverlay);
}

// ============ GALLERY LIGHTBOX ============
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('galleryLightbox');

    if (!lightbox || galleryItems.length === 0) return;

    const lightboxImg = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    let currentIndex = 0;

    // Open lightbox
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        });
    });

    // Display image logic
    function showImage(index) {
        if (index >= galleryItems.length) currentIndex = 0;
        if (index < 0) currentIndex = galleryItems.length - 1;
        lightboxImg.src = galleryItems[currentIndex].src;
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);

    // Close if clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            closeLightbox();
        }
    });

    // Next/Prev buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex--;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex++;
        showImage(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex--;
            showImage(currentIndex);
        }
        if (e.key === 'ArrowRight') {
            currentIndex++;
            showImage(currentIndex);
        }
    });
}

// ============ TESTIMONIALS SLIDER ============
function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    const container = document.querySelector('.testimonials-slider');
    const prevBtn = document.getElementById('tsPrev');
    const nextBtn = document.getElementById('tsNext');
    let cards = document.querySelectorAll('.testimonial-card');

    if (!track || !container || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentPos = 0;
    let targetPos = 0;
    let itemWidth = 0;
    let originalWidth = 0;
    let isHovered = false;
    const autoSpeed = 0.5; // Controls the slow continuous scroll speed

    function updateDimensions() {
        // Find gap and width
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 32;
        itemWidth = cardWidth + gap;
        // The HTML contains 3 unique cards we duplicated = 6 cards. 
        // We consider the "original" set width to be exactly 3 items.
        originalWidth = itemWidth * 3;
    }

    // Initial setup
    updateDimensions();

    function loop() {
        if (!isHovered) {
            targetPos += autoSpeed;
        }

        // Infinite Wrap Logic
        if (targetPos >= originalWidth) {
            targetPos -= originalWidth;
            currentPos -= originalWidth;
        } else if (targetPos < 0) {
            targetPos += originalWidth;
            currentPos += originalWidth;
        }

        // Smooth Lerp Towards Target
        currentPos += (targetPos - currentPos) * 0.1;

        track.style.transform = `translateX(-${currentPos}px)`;
        requestAnimationFrame(loop);
    }

    // Hover Interaction: Pause loop
    container.addEventListener('mouseenter', () => isHovered = true);
    container.addEventListener('mouseleave', () => isHovered = false);

    // Manual Bump Navigation
    nextBtn.addEventListener('click', () => {
        targetPos += itemWidth;
    });

    prevBtn.addEventListener('click', () => {
        targetPos -= itemWidth;
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        updateDimensions();
    });

    // Start Animation Loop
    loop();
}

// ============ CONSOLE BRANDING ============
console.log(`
%c ██████╗  █████╗ ███╗   ███╗███████╗███████╗     ██████╗ ███╗   ██╗███╗   ██╗
%c██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝    ██╔═══██╗████╗  ██║████╗  ██║
%c██║  ███╗███████║██╔████╔██║█████╗  ███████╗    ██║   ██║██╔██╗ ██║██╔██╗ ██║
%c██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║    ██║   ██║██║╚██╗██║██║╚██╗██║
%c╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║    ╚██████╔╝██║ ╚████║██║ ╚████║
%c ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝     ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝

%c🎮 Premium Gaming Café | India's #1 Gaming Lounge
%c🌐 www.gamesonn.in | 📞 +91 77960 39991

`,
    'color: #00f5ff; font-weight: bold;',
    'color: #0066ff; font-weight: bold;',
    'color: #8b5cf6; font-weight: bold;',
    'color: #a855f7; font-weight: bold;',
    'color: #c026d3; font-weight: bold;',
    'color: #ff00ff; font-weight: bold;',
    'color: #00f5ff; font-size: 14px; font-weight: bold;',
    'color: #8b5cf6; font-size: 12px;'
);