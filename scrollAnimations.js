// Scroll-triggered animations using GSAP and ScrollTrigger
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger is not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all scroll animations
    initAboutSectionAnimations();
    initSkillsAnimations();
    initPortfolioAnimations();
    initTestimonialsAnimations();
    initContactAnimations();
    initParallaxEffects();
});

// About section animations
function initAboutSectionAnimations() {
    const aboutImage = document.querySelector('.about-image');
    const aboutText1 = document.querySelector('.about-text-1');
    const aboutText2 = document.querySelector('.about-text-2');
    const aboutText3 = document.querySelector('.about-text-3');
    const aboutCta = document.querySelector('.about-cta');
    
    if (!aboutImage || !aboutText1) return;
    
    // Create timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    tl.from(aboutImage, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from(aboutText1, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4')
    .from(aboutText2, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3')
    .from(aboutText3, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3')
    .from(aboutCta, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3');
}

// Skills animations
function initSkillsAnimations() {
    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillCards.length === 0) return;
    
    gsap.from(skillCards, {
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Animate tool items
    const toolItems = document.querySelectorAll('.tool-item');
    
    if (toolItems.length > 0) {
        gsap.from(toolItems, {
            scrollTrigger: {
                trigger: toolItems[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
}

// Portfolio animations
function initPortfolioAnimations() {
    // Animate section title
    const portfolioTitle = document.querySelector('#portfolio .section-title');
    
    if (portfolioTitle) {
        gsap.from(portfolioTitle, {
            scrollTrigger: {
                trigger: portfolioTitle,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
    
    // Animate filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        gsap.from(filterButtons, {
            scrollTrigger: {
                trigger: filterButtons[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
    
    // Animate portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length > 0) {
        gsap.from(portfolioItems, {
            scrollTrigger: {
                trigger: portfolioItems[0].parentElement,
                start: 'top 60%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }
}

// Testimonials animations
function initTestimonialsAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length === 0) return;
    
    gsap.from(testimonialCards, {
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

// Contact animations
function initContactAnimations() {
    const contactForm = document.querySelector('#contact form').parentElement;
    const contactInfo = document.querySelector('#contact h3').parentElement;
    
    if (!contactForm || !contactInfo) return;
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
    
    tl.from(contactForm, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from(contactInfo, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');
}

// Parallax effects
function initParallaxEffects() {
    // Section background parallax for about section
    gsap.to('#about', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        backgroundPosition: '50% 70%',
        ease: 'none'
    });
    
    // Section background parallax for skills section
    gsap.to('#skills', {
        scrollTrigger: {
            trigger: '#skills',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        backgroundPosition: '50% 70%',
        ease: 'none'
    });
    
    // Parallax for about image
    gsap.to('.about-image', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 50,
        ease: 'none'
    });
}