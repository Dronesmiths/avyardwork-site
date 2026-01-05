// Basic interactions scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log('Avyard Work site loaded');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const icon = mobileBtn ? mobileBtn.querySelector('i') : null;

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            navMenu.classList.toggle('active');

            // Toggle icon
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }


    // Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Comparison Slider Logic
    const sliderContainer = document.getElementById('comparisonSlider');
    const sliderForeground = document.getElementById('sliderForeground');
    const sliderHandle = document.getElementById('sliderHandle');

    if (sliderContainer && sliderForeground && sliderHandle) {
        let isDragging = false;

        const moveSlider = (e) => {
            if (!isDragging) return;

            // Get clientX for touch or mouse
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const rect = sliderContainer.getBoundingClientRect();
            let x = clientX - rect.left;

            // Constrain within container
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            const percentage = (x / rect.width) * 100;

            sliderForeground.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        };

        // Mouse Events
        sliderContainer.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', moveSlider);

        // Touch Events
        sliderContainer.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', moveSlider);

        // Click to jump
        sliderContainer.addEventListener('click', (e) => {
            isDragging = true;
            moveSlider(e);
            isDragging = false;
        });
    }
});
