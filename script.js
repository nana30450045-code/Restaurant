document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Feather Icons
    feather.replace();

    // 2. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const links = document.querySelectorAll('a');
    
    // Check if device is touch screen
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Direct follow for dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Smooth follow for outline (using animation frame for performance)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover state to body when hovering over links
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            link.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // 3. Staggered Entrance Animation for Cards
    const cards = document.querySelectorAll('.link-card, .section-title');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 100)); // Delay sequence
    });

    // 4. Automatic Slideshow (6 seconds per image)
    const slides = document.querySelectorAll('.bg-layer');
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds

    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    // 4.1. Food Carousel (6 seconds per image)
    const foodSlides = document.querySelectorAll('.food-slide');
    let currentFoodSlide = 0;
    if (foodSlides.length > 1) {
        setInterval(() => {
            foodSlides[currentFoodSlide].classList.remove('active');
            currentFoodSlide = (currentFoodSlide + 1) % foodSlides.length;
            foodSlides[currentFoodSlide].classList.add('active');
        }, 6000);
    }

    // 5. Magnetic Button Effect (Cards subtly pull towards mouse)
    const magneticElements = document.querySelectorAll('.magnetic');
    
    if (!isTouchDevice) {
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const position = element.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                // Subtle movement
                element.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) scale(1.02)`;
            });

            element.addEventListener('mouseleave', () => {
                // Reset transform
                element.style.transform = 'translate(0px, 0px) scale(1)';
                element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });
            
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'none'; // Remove transition for smooth tracking
            });
        });
    }
});
