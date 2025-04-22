// Custom cursor effects for desktop users
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomCursor();
});

function initializeCustomCursor() {
    // Get cursor elements
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    // Check if cursor elements exist and if we're not on a touch device
    if (!cursor || !cursorDot || isTouchDevice()) {
        return;
    }
    
    // Show custom cursor
    cursor.style.display = 'block';
    cursorDot.style.display = 'block';
    
    // Remove default cursor from body
    document.body.style.cursor = 'none';
    
    // Track mouse position
    document.addEventListener('mousemove', e => {
        // Update cursor position with smooth transition (handled by CSS)
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Update dot position without delay
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-item, .filter-btn, .skill-card, .social-icon, .tool-item');
    
    interactiveElements.forEach(element => {
        // Add hover class to cursor
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        // Remove hover class from cursor
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
        
        // Remove default cursor from element
        element.style.cursor = 'none';
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', e => {
        if (e.relatedTarget == null || e.relatedTarget.nodeName === 'HTML') {
            cursor.classList.add('cursor-hidden');
            cursorDot.classList.add('cursor-hidden');
        }
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseover', e => {
        cursor.classList.remove('cursor-hidden');
        cursorDot.classList.remove('cursor-hidden');
    });
    
    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Handle special hover effects for different section types
    addSectionSpecificCursorEffects();
}

// Helper function to detect touch devices
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Add section-specific cursor effects
function addSectionSpecificCursorEffects() {
    // Hero section effect
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            const cursor = document.getElementById('custom-cursor');
            const cursorDot = document.getElementById('cursor-dot');
            
            if (cursor && cursorDot) {
                cursor.style.borderColor = '#ff4b4b';
                cursorDot.style.backgroundColor = '#ff4b4b';
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            const cursor = document.getElementById('custom-cursor');
            const cursorDot = document.getElementById('cursor-dot');
            
            if (cursor && cursorDot) {
                cursor.style.borderColor = '';
                cursorDot.style.backgroundColor = '';
            }
        });
    }
    
    // Portfolio section - change cursor for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.innerHTML = '<span class="text-xs font-medium">View</span>';
                cursor.classList.add('flex', 'items-center', 'justify-center');
                cursor.style.backgroundColor = 'rgba(255, 75, 75, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.innerHTML = '';
                cursor.classList.remove('flex', 'items-center', 'justify-center');
                cursor.style.backgroundColor = '';
            }
        });
    });
    
    // Add button hover effect
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-accent');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.innerHTML = '<span class="text-xs font-medium">Click</span>';
                cursor.classList.add('flex', 'items-center', 'justify-center');
                cursor.style.backgroundColor = 'rgba(255, 75, 75, 0.2)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            const cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.innerHTML = '';
                cursor.classList.remove('flex', 'items-center', 'justify-center');
                cursor.style.backgroundColor = '';
            }
        });
    });
}

// Handle cursor size on window resize
window.addEventListener('resize', () => {
    // Hide custom cursor on small screens
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    if (window.innerWidth < 768) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = '';
        
        // Reset cursor for all elements
        const allElements = document.querySelectorAll('a, button, input, textarea, .portfolio-item, .filter-btn, .skill-card, .social-icon, .tool-item');
        allElements.forEach(el => {
            if (el.style.cursor === 'none') {
                el.style.cursor = '';
            }
        });
    } else {
        if (!isTouchDevice()) {
            cursor.style.display = 'block';
            cursorDot.style.display = 'block';
            document.body.style.cursor = 'none';
            
            // Re-apply custom cursor to interactive elements
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-item, .filter-btn, .skill-card, .social-icon, .tool-item');
            interactiveElements.forEach(element => {
                element.style.cursor = 'none';
            });
        }
    }
});