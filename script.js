// Basic interactive features using Vanilla JS

document.addEventListener('DOMContentLoaded', () => {
    // Resume download logic
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Just a placeholder alert since there's no actual resume file in the repo
            alert('Resume file is not available in the provided repository.');
        });
    }

    // Interactive hover effects for Bento Boxes to get a pseudo-3D look
    const bentoBoxes = document.querySelectorAll('.bento-box');

    bentoBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            // Calculate a subtle tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -2; // Max 2 degrees
            const rotateY = ((x - centerX) / centerX) * 2;

            // Apply transform
            box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;

            // Subtle glare effect using a pseudo element (we'd need CSS for this, simplified here to just border highlight)
            box.style.borderImage = `radial-gradient(20% 75% at ${x}px ${y}px, rgba(255,255,255,0.4), rgba(255,255,255,0.1)) 1`;

        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            box.style.borderImage = 'none';
            box.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        });
    });

    // Make project items clickable placeholders
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const url = item.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // Load GitHub Profile Image
    const loadGitHubProfile = async (username) => {
        const avatarContainer = document.querySelector('.avatar');
        const avatarImg = document.querySelector('.avatar img');
        if (!avatarImg || !avatarContainer) return;

        try {
            // Using the .png redirect is faster and more reliable than the API for just the avatar
            const avatarUrl = `https://github.com/${username}.png`;

            // Preload image to ensure smooth transition
            const img = new Image();
            img.src = avatarUrl;
            img.onload = () => {
                // Set the source and add 'loaded' class to container to crossfade loader to image
                avatarImg.src = avatarUrl;
                avatarContainer.classList.add('loaded');
            };
        } catch (error) {
            console.error('Error loading GitHub profile image:', error);
        }
    };

    loadGitHubProfile('adithyancs7');
});
