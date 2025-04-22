// Portfolio filtering and modal functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioFilter();
    initializePortfolioModal();
});

// Portfolio filter functionality
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Set first button as active by default
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('active');
    }
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Filter items with animation
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    // Show with animation
                    gsap.to(item, {
                        duration: 0.5,
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        display: 'block',
                        ease: 'power3.out'
                    });
                } else {
                    // Hide with animation
                    gsap.to(item, {
                        duration: 0.5,
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                        display: 'none',
                        ease: 'power3.out'
                    });
                }
            });
        });
    });
}

// Initialize portfolio modal
function initializePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const closeButton = document.getElementById('close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!modal) return;
    
    // Add click event to portfolio items
    portfolioItems.forEach(item => {
        const viewButton = item.querySelector('a');
        
        if (viewButton) {
            viewButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get portfolio item details
                const title = item.querySelector('.portfolio-content h3').textContent;
                const category = item.querySelector('.portfolio-content p').textContent;
                const imageSrc = item.querySelector('img').src;
                
                // Open modal with data
                openPortfolioModal(title, category, imageSrc);
            });
        }
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', closePortfolioModal);
    
    // Close modal when clicking outside the content
    modalOverlay.addEventListener('click', closePortfolioModal);
    
    // Prevent closing when clicking on modal content
    modal.querySelector('#modal-content').addEventListener('click', e => {
        e.stopPropagation();
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closePortfolioModal();
        }
    });
}

// Open portfolio modal
function openPortfolioModal(title, category, imageSrc) {
    const modal = document.getElementById('portfolio-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Clear previous content
    while (modalContent.firstChild) {
        if (modalContent.firstChild.id === 'close-modal') {
            break;
        }
        modalContent.removeChild(modalContent.firstChild);
    }
    
    // Create content
    const contentDiv = document.createElement('div');
    
    // Header
    const header = document.createElement('div');
    header.className = 'mb-6';
    
    const titleElement = document.createElement('h3');
    titleElement.className = 'text-2xl font-bold text-gray-800 mb-2';
    titleElement.textContent = title;
    
    const categoryElement = document.createElement('p');
    categoryElement.className = 'text-accent';
    categoryElement.textContent = category;
    
    header.appendChild(titleElement);
    header.appendChild(categoryElement);
    
    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'w-full h-64 bg-gray-100 rounded-lg mb-6 overflow-hidden';
    
    const image = document.createElement('img');
    image.src = imageSrc;
    image.className = 'w-full h-full object-cover';
    
    imageContainer.appendChild(image);
    
    // Description
    const description = document.createElement('div');
    description.className = 'mb-6 text-gray-600';
    description.innerHTML = `
        <p class="mb-4">
            This is a detailed description of the project. It would include information about the 
            client requirements, the design process, challenges faced, and the solutions implemented.
        </p>
        <p>
            For a real portfolio, this section would be customized for each project with authentic 
            information about the specific work done, technologies used, and results achieved.
        </p>
    `;
    
    // Details
    const details = document.createElement('div');
    details.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-6';
    
    // Client
    const clientSection = document.createElement('div');
    const clientTitle = document.createElement('h4');
    clientTitle.className = 'text-sm text-gray-500';
    clientTitle.textContent = 'Client';
    
    const clientValue = document.createElement('p');
    clientValue.className = 'text-gray-800 font-medium';
    clientValue.textContent = 'Example Client';
    
    clientSection.appendChild(clientTitle);
    clientSection.appendChild(clientValue);
    
    // Date
    const dateSection = document.createElement('div');
    const dateTitle = document.createElement('h4');
    dateTitle.className = 'text-sm text-gray-500';
    dateTitle.textContent = 'Completed';
    
    const dateValue = document.createElement('p');
    dateValue.className = 'text-gray-800 font-medium';
    dateValue.textContent = 'April 2025';
    
    dateSection.appendChild(dateTitle);
    dateSection.appendChild(dateValue);
    
    // Skills
    const skillsSection = document.createElement('div');
    const skillsTitle = document.createElement('h4');
    skillsTitle.className = 'text-sm text-gray-500';
    skillsTitle.textContent = 'Skills';
    
    const skillsValue = document.createElement('p');
    skillsValue.className = 'text-gray-800 font-medium';
    skillsValue.textContent = 'Design, Illustration, Layout';
    
    skillsSection.appendChild(skillsTitle);
    skillsSection.appendChild(skillsValue);
    
    // Project URL
    const urlSection = document.createElement('div');
    const urlTitle = document.createElement('h4');
    urlTitle.className = 'text-sm text-gray-500';
    urlTitle.textContent = 'Project URL';
    
    const urlValue = document.createElement('a');
    urlValue.href = '#';
    urlValue.target = '_blank';
    urlValue.className = 'text-accent font-medium hover:underline';
    urlValue.textContent = 'View Live Project';
    
    urlSection.appendChild(urlTitle);
    urlSection.appendChild(urlValue);
    
    // Append all to details
    details.appendChild(clientSection);
    details.appendChild(dateSection);
    details.appendChild(skillsSection);
    details.appendChild(urlSection);
    
    // Append all elements to contentDiv
    contentDiv.appendChild(header);
    contentDiv.appendChild(imageContainer);
    contentDiv.appendChild(description);
    contentDiv.appendChild(details);
    
    // Insert content before close button
    modalContent.insertBefore(contentDiv, document.getElementById('close-modal'));
    
    // Show modal with animation
    modal.classList.remove('hidden');
    gsap.fromTo(
        modalContent,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 }
    );
}

// Close portfolio modal
function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Hide modal with animation
    gsap.to(modalContent, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
            modal.classList.add('hidden');
        }
    });
}