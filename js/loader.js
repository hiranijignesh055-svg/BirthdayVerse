document.addEventListener('DOMContentLoaded', () => {
    const progress = document.getElementById('loader-progress');
    const text = document.getElementById('loader-text');
    const btn = document.getElementById('enter-btn');
    const countdown = document.getElementById('loader-countdown');
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('app-wrapper');
    const bgMusic = document.getElementById('bg-music');

    let percent = 0;
    
    // Simulate loading
    const interval = setInterval(() => {
        percent += Math.random() * 5 + 2; // Random increment
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            
            // Show Enter button
            setTimeout(() => {
                btn.classList.remove('hidden');
                countdown.classList.add('hidden');
            }, 500);
        }
        
        progress.style.width = `${percent}%`;
        text.innerText = `${Math.floor(percent)}%`;
    }, 100);

    // Enter Button click
    btn.addEventListener('click', () => {
        loader.classList.add('fade-out');
        
        // Show main content after fade out starts
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Play music (requires user interaction, which we just got)
            if (bgMusic) {
                bgMusic.volume = 0.5;
                bgMusic.play().catch(e => console.log("Audio play blocked", e));
            }
            
            // Trigger entry animations for main content if needed
        }, 1000);
    });

    // Particle effect on loader background
    initLoaderParticles();
});

function initLoaderParticles() {
    const canvas = document.getElementById('loader-particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(255, 215, 0, ${Math.random()})`
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
