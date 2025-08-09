document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        typewriterElement.textContent = 'Backend Developer'; // Set the text explicitly
        typewriterElement.style.opacity = '0'; // Start with hidden text
    }

    if (typewriterElement && window.gsap) {
        gsap.to(typewriterElement, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 1.5
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Download Resume function
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume file path
    link.download = 'Adithyan_CS_Resume.pdf';

    // For demonstration, show an alert
    alert('file has not been added yet!.');

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Mobile menu functions
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuToggle = document.querySelector('.menu-toggle i');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');

    // Toggle hamburger/close icon
    if (sidebar.classList.contains('open')) {
        menuToggle.classList.remove('fa-bars');
        menuToggle.classList.add('fa-times');
    } else {
        menuToggle.classList.remove('fa-times');
        menuToggle.classList.add('fa-bars');
    }
}

function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuToggle = document.querySelector('.menu-toggle i');

    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    menuToggle.classList.remove('fa-times');
    menuToggle.classList.add('fa-bars');
}

// Close menu when clicking on navigation links
document.querySelectorAll('.sidebar a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId !== '#') {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // Delay to allow menu to close first
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // GSAP animation for Home/Intro section
    if (window.gsap) {
        // Animate the entire intro section with a scale and fade-in effect
        gsap.from("#intro", {
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            ease: "power3.out"
        });

        // Fancy text reveal for the name: split into spans, animate color and movement
        const name = document.getElementById('name');
        if (name) {
            const text = name.textContent;
            name.innerHTML = '';
            text.split('').forEach((char, idx) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = 0;
                span.style.transform = 'translateY(60px) scale(1.5)';
                span.style.filter = 'blur(6px)';
                span.style.color = '#00eaff';
                name.appendChild(span);
            });
            gsap.to('#name span', {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                color: '#fff',
                stagger: 0.07,
                duration: 0.7,
                delay: 0.4,
                ease: 'expo.out'
            });
            // Add a little overshoot bounce at the end
            gsap.to('#name span', {
                y: -10,
                repeat: 1,
                yoyo: true,
                stagger: 0.07,
                delay: 1.1,
                duration: 0.25,
                ease: 'power1.inOut'
            });
        }
    }

    const hoverCard = document.getElementById('hoverCard');
    const rows = document.querySelectorAll('.project-row');

    // Check if elements exist
    if (!hoverCard) {
        console.error('Hover card element with ID "hoverCard" not found');
        return;
    }

    if (rows.length === 0) {
        console.error('No elements with class "project-row" found');
        return;
    }

    const EDGE_PADDING = 50;  // Minimum distance from edge

    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const description = row.getAttribute('data-description');
            if (!description) return;

            hoverCard.classList.add('show');

            hoverCard.textContent = description;
            hoverCard.style.position = 'fixed';
            hoverCard.style.zIndex = '9999';

            requestAnimationFrame(() => {
                const lastCell = row.querySelector('td:last-child');
                const rect = lastCell.getBoundingClientRect();
                const cardRect = hoverCard.getBoundingClientRect();

                let top = rect.top;
                let left = rect.right + 8;  // Standard gap from cell

                // Only adjust if it overflows the screen
                const overflowRight = left + cardRect.width > window.innerWidth - EDGE_PADDING;
                if (overflowRight) {
                    left = window.innerWidth - cardRect.width - EDGE_PADDING;
                }

                // Clamp top just in case
                if (top + cardRect.height > window.innerHeight - EDGE_PADDING) {
                    top = window.innerHeight - cardRect.height - EDGE_PADDING;
                }
                if (top < EDGE_PADDING) {
                    top = EDGE_PADDING;
                }

                hoverCard.style.top = top + 'px';
                hoverCard.style.left = left + 'px';
            });
        });

        row.addEventListener('mouseleave', () => {
            hoverCard.classList.remove('show');
        });
    });

    // GSAP effect for skills section
    if (window.gsap) {
        console.log('GSAP is loaded');
        const skills = document.querySelectorAll('.skill-item');
        console.log(`Found ${skills.length} skill items`);
        if (skills.length > 0) {
            // Temporarily disable CSS transitions
            skills.forEach(skill => skill.style.transition = 'none');

            gsap.fromTo(skills, {
                opacity: 0,
                y: 50,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                onComplete: () => {
                    // Re-enable CSS transitions after animation
                    skills.forEach(skill => skill.style.transition = 'all 0.3s ease');
                }
            });
        }
    } else {
        console.error('GSAP is not loaded');
    }

    // Interactive hover effect for skills section
    const skills = document.querySelectorAll('.skill-item');

    if (skills.length > 0) {
        skills.forEach(skill => {
            skill.addEventListener('mousemove', (e) => {
                const rect = skill.getBoundingClientRect();
                const x = e.clientX - rect.left; // Mouse X position within the element
                const y = e.clientY - rect.top;  // Mouse Y position within the element

                const moveX = (x / rect.width - 0.5) * 20; // Intensity of movement on X-axis
                const moveY = (y / rect.height - 0.5) * 20; // Intensity of movement on Y-axis

                gsap.to(skill, {
                    x: moveX,
                    y: moveY,
                    duration: 0.3,
                    ease: 'power3.out'
                });
            });

            skill.addEventListener('mouseleave', () => {
                gsap.to(skill, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power3.out'
                });
            });
        });
    }
});
