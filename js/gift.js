document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('gift-box');
    const giftMessage = document.getElementById('gift-message');
    let isOpened = false;

    if (giftBox) {
        giftBox.addEventListener('click', () => {
            if (!isOpened) {
                isOpened = true;
                
                // Open box animation
                giftBox.classList.add('open');
                
                // Show message
                setTimeout(() => {
                    giftMessage.classList.remove('hidden');
                    // slight delay to allow display block to apply before opacity transition
                    setTimeout(() => giftMessage.classList.add('show'), 50);
                }, 1000);

                // Trigger effects
                if (window.fireConfetti) window.fireConfetti();
                if (window.startFireworks) window.startFireworks();
                
                // Change instruction text
                const instruction = giftBox.parentElement.querySelector('.instruction');
                if (instruction) {
                    instruction.textContent = "Enjoy the celebration! 🎆";
                }
            }
        });
    }
});
