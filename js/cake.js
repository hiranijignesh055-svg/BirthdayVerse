document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('.scene');
    const flames = document.querySelectorAll('.flame');
    const cakeSection = document.getElementById('cake-section');
    
    let isBlownOut = false;

    if (scene) {
        scene.addEventListener('click', () => {
            if (!isBlownOut) {
                isBlownOut = true;
                
                // Blow out candles
                flames.forEach(flame => {
                    flame.classList.add('blow-out');
                    
                    // Add smoke
                    const smoke = document.createElement('div');
                    smoke.classList.add('smoke');
                    flame.parentElement.appendChild(smoke);
                });

                // Trigger Confetti
                if (window.fireConfetti) {
                    window.fireConfetti();
                }

                // Make wish text change
                const instruction = cakeSection.querySelector('.instruction');
                if (instruction) {
                    instruction.textContent = "Your wish will come true! ✨";
                    instruction.style.color = "var(--accent-gold)";
                    instruction.style.animation = "none";
                }
            }
        });
    }
});
