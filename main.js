// Main JavaScript file for the portfolio website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeThemeToggle();
    initializeNavigation();
    initializeBackToTop();
    initializeContactForm();
    initializePortfolioFilter();
    
    // Show hero section animations after a slight delay
    setTimeout(() => {
        animateHeroSection();
    }, 500);
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';
    
    // Check for saved theme preference or respect OS preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        darkModeToggle.innerHTML = sunIcon;
    } else {
        darkModeToggle.innerHTML = moonIcon;
    }
    
    // Toggle theme when button is clicked
    darkModeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        // Update button icon
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = sunIcon;
            // Update colors for P5.js and Three.js
            if (typeof updateColorScheme === 'function') updateColorScheme();
            if (typeof updateThreeColors === 'function') updateThreeColors();
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = moonIcon;
            // Update colors for P5.js and Three.js
            if (typeof updateColorScheme === 'function') updateColorScheme();
            if (typeof updateThreeColors === 'function') updateThreeColors();
        }
    });
}

// Navigation Functionality
function initializeNavigation() {
    const nav = document.getElementById('main-nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        }
    });
    
    // Handle navigation link clicks and active states
    function handleNavLinkClick(links) {
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                }
                
                // Smooth scroll to section
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#') && targetId !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    handleNavLinkClick(navLinks);
    handleNavLinkClick(mobileNavLinks);
    
    // Change navbar appearance on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-2');
            nav.classList.remove('py-4');
            nav.classList.add('shadow-md');
        } else {
            nav.classList.add('py-4');
            nav.classList.remove('py-2');
            nav.classList.remove('shadow-md');
        }
        
        // Update active menu item based on scroll position
        updateActiveNavLink();
    });
    
    // Set active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        // Get all sections and their positions
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding links
                document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(link => {
                    link.classList.add('active');
                });
                
                document.querySelectorAll(`.mobile-nav-link[href="#${id}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }
    
    // Set initial active link
    updateActiveNavLink();
}

// Back to Top Button Functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission with a timeout
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            setTimeout(() => {
                // Show success message
                alert('Thanks for your message! I\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }, 1500);
        });
    }
}

// Portfolio Filter Functionality
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Skill Progress Bar Animation
function initializeSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Create intersection observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animate progress bar
                progressBar.style.width = width;
                
                // Stop observing after animation
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all progress bars
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Hero Section Animation
function animateHeroSection() {
    const heroElements = document.querySelectorAll('.hero-text, .hero-buttons, .hero-image, .hero-scroll');
    
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 300 * index);
    });
    
    // Initialize skill bars after hero animation
    setTimeout(() => {
        initializeSkillBars();
    }, 1500);
}