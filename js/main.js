// Hailong Tengda Website - JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Loader
    const loader = document.querySelector(".loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 1500);
    }

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Smooth scroll
    document.querySelectorAll("a[href^="#"]").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Scroll animations
    const animateElements = document.querySelectorAll(".animate-on-scroll");
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // Counter animation
    const counters = document.querySelectorAll(".stat-number");
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Particle generation
    const particleContainer = document.querySelector(".hero-particles");
    if (particleContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 15 + "s";
            particle.style.animationDuration = 10 + Math.random() * 10 + "s";
            particleContainer.appendChild(particle);
        }
    }

    // Modal functionality
    const modalTriggers = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");
    const modalCloses = document.querySelectorAll(".modal-close");

    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const modalId = trigger.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add("active");
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener("click", () => {
            modals.forEach(m => m.classList.remove("active"));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    });

    // Form handling
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Thank you for your message! We will get back to you soon.");
            this.reset();
        });
    }

    // Page transition
    document.querySelectorAll("a").forEach(link => {
        if (link.hostname === window.location.hostname && !link.getAttribute("href").startsWith("#")) {
            link.addEventListener("click", (e) => {
                const transition = document.querySelector(".page-transition");
                if (transition) {
                    e.preventDefault();
                    transition.classList.add("active");
                    setTimeout(() => {
                        window.location.href = link.getAttribute("href");
                    }, 800);
                }
            });
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modals.forEach(m => m.classList.remove("active"));
        }
    });

    // Performance optimization - lazy load images
    if ("IntersectionObserver" in window) {
        const lazyImages = document.querySelectorAll("img[data-src]");
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    console.log("Hailong Tengda Website - JavaScript initialized");
});
