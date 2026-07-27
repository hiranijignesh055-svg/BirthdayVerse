window.fireConfetti = function() {
    const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#8A2BE2', '#FFFFFF'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100 + 'vw';
        const animationDelay = Math.random() * 3 + 's';
        const animationDuration = Math.random() * 2 + 3 + 's';
        
        confetti.style.backgroundColor = color;
        confetti.style.left = left;
        confetti.style.animationDelay = animationDelay;
        confetti.style.animationDuration = animationDuration;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, (parseFloat(animationDuration) + parseFloat(animationDelay)) * 1000);
    }
};
