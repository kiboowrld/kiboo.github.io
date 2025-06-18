// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Model search functionality
function searchCars() {
    const input = document.getElementById('carSearch');
    const filter = input.value.toUpperCase();
    const cars = document.querySelectorAll('.car');
    
    cars.forEach(car => {
        const carName = car.getAttribute('data-name').toUpperCase();
        if (carName.includes(filter)) {
            car.style.display = "block";
            setTimeout(() => {
                car.style.opacity = "1";
                car.style.transform = "translateY(0)";
            }, 50);
        } else {
            car.style.opacity = "0";
            car.style.transform = "translateY(20px)";
            setTimeout(() => {
                car.style.display = "none";
            }, 300);
        }
    });
}

// Initialize lightbox for images
function initLightbox() {
    const images = document.querySelectorAll('.car img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    images.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            
            lightbox.appendChild(img);
            
            // Add model information
            const car = image.closest('.car');
            if (car) {
                const info = document.createElement('div');
                info.className = 'lightbox-info';
                info.innerHTML = `
                    <h3>${car.querySelector('h3').textContent}</h3>
                    <p>${car.querySelector('p')?.textContent || ''}</p>
                    <div class="specs">${car.querySelector('.specs')?.innerHTML || ''}</div>
                `;
                lightbox.appendChild(info);
            }
        });
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });
}

// Dynamic model details on hover
function initModelHoverEffects() {
    const cars = document.querySelectorAll('.car');
    
    cars.forEach(car => {
        car.addEventListener('mouseenter', () => {
            const specs = car.querySelector('.specs');
            if (specs) {
                specs.style.maxHeight = specs.scrollHeight + 'px';
                specs.style.opacity = '1';
            }
        });
        
        car.addEventListener('mouseleave', () => {
            const specs = car.querySelector('.specs');
            if (specs) {
                specs.style.maxHeight = '0';
                specs.style.opacity = '0';
            }
        });
    });
}

// Contact form validation
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate name
        const name = form.querySelector('input[name="name"]');
        if (!name.value.trim()) {
            isValid = false;
            name.classList.add('error');
        } else {
            name.classList.remove('error');
        }
        
        // Validate email
        const email = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            isValid = false;
            email.classList.add('error');
        } else {
            email.classList.remove('error');
        }
        
        // Validate message
        const message = form.querySelector('textarea[name="message"]');
        if (!message.value.trim()) {
            isValid = false;
            message.classList.add('error');
        } else {
            message.classList.remove('error');
        }
        
        if (isValid) {
            // Simulate form submission
            form.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for your inquiry</h3>
                    <p>Our Porsche concierge will contact you shortly.</p>
                </div>
            `;
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Set up initial state
    document.querySelectorAll('section, .car').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

// Video enhancement
function enhanceVideo() {
    const video = document.querySelector('video');
    if (!video) return;
    
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    video.parentNode.insertBefore(videoContainer, video);
    videoContainer.appendChild(video);
    
    // Add custom controls
    const controls = document.createElement('div');
    controls.className = 'custom-video-controls';
    controls.innerHTML = `
        <button class="play-pause">
            <i class="fas fa-play"></i>
        </button>
        <div class="timeline">
            <div class="progress"></div>
        </div>
        <button class="fullscreen">
            <i class="fas fa-expand"></i>
        </button>
    `;
    videoContainer.appendChild(controls);
    
    // Play/pause functionality
    const playPauseBtn = controls.querySelector('.play-pause');
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Update progress bar
    video.addEventListener('timeupdate', () => {
        const progress = controls.querySelector('.progress');
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percent}%`;
    });
    
    // Click on timeline to seek
    const timeline = controls.querySelector('.timeline');
    timeline.addEventListener('click', (e) => {
        const rect = timeline.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });
    
    // Fullscreen functionality
    const fullscreenBtn = controls.querySelector('.fullscreen');
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });
    
    // Update play/pause button when video ends
    video.addEventListener('ended', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the gallery page
    if (document.querySelector('.cars-container')) {
        initLightbox();
        initModelHoverEffects();
        
        // Initialize search if search input exists
        const searchInput = document.getElementById('carSearch');
        if (searchInput) {
            searchInput.addEventListener('keyup', searchCars);
        }
    }
    
    // Initialize contact form if exists
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Enhance video if exists
    enhanceVideo();
    
    // Add current year to footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});