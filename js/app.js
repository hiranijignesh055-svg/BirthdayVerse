document.addEventListener('DOMContentLoaded', () => {
    console.log("Dixita's Magical Dashboard Initialized");

    // Elements
    const navLinks = document.querySelectorAll('.nav-item');
    const bgMusic = document.getElementById('bg-music');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const giftBox = document.getElementById('gift-box');
    const largeGiftBox = document.getElementById('large-gift-box');
    const giftMessage = document.getElementById('gift-message');
    const largeGiftMessage = document.getElementById('large-gift-message');
    const galleryWidget = document.getElementById('widget-gallery');
    const galleryModal = document.getElementById('gallery-modal');
    const closeModal = document.querySelector('.close-modal');

    // Page Overlays
    const pages = {
        'wishes': document.getElementById('page-wishes'),
        'letter': document.getElementById('page-letter'),
        'blessings': document.getElementById('page-blessings'),
        'surprise': document.getElementById('page-surprise')
    };

    // Helper to hide all pages
    const hideAllPages = () => {
        Object.values(pages).forEach(page => {
            if (page) page.classList.add('hidden');
        });
    };

    // --- Direct Widget Clicks (On Dashboard) ---
    // (Widgets removed, only cake remains)
    
    // Close gallery modal explicitly
    if (closeModal) closeModal.addEventListener('click', hideAllPages);
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) hideAllPages();
        });
    }

    // --- Top Navigation Links ---
    const openPage = (targetId) => {
        hideAllPages();
        
        // If it's home, just hide overlays to show dashboard
        if (targetId === 'home') return;
        
        // Otherwise show the targeted page
        if (pages[targetId]) {
            pages[targetId].classList.remove('hidden');
        }

        // Special interaction: If large gift is opened
        if (targetId === 'surprise' && largeGiftBox) {
            largeGiftBox.addEventListener('click', () => {
                if (!largeGiftBox.classList.contains('open')) {
                    largeGiftBox.classList.add('open');
                    setTimeout(() => {
                        if(largeGiftMessage) {
                            largeGiftMessage.classList.remove('hidden');
                            largeGiftMessage.classList.add('show');
                        }
                        if(typeof createConfetti === 'function') createConfetti();
                    }, 500);
                }
            }, { once: true });
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link styling
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('href').substring(1); // e.g., 'wishes'
            openPage(targetId);
        });
    });

    // Play music once user interacts with anything on dashboard
    document.body.addEventListener('click', () => {
        if (bgMusic && bgMusic.paused) {
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log("Audio play blocked", e));
        }
    }, { once: true });
});
