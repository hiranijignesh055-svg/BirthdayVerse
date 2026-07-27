window.startFireworks = function() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    
    let width, height;
    function setSize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    setSize();
    window.addEventListener('resize', setSize);

    const particles = [];
    const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#8A2BE2', '#FFFFFF'];

    function createFirework(x, y) {
        const numParticles = 50 + Math.random() * 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 2 + 1,
                color: color,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.015
            });
        }
    }

    // Auto fireworks
    const autoLaunch = setInterval(() => {
        createFirework(Math.random() * width, Math.random() * height * 0.5);
    }, 800);

    // Stop after 15 seconds
    setTimeout(() => {
        clearInterval(autoLaunch);
        setTimeout(() => {
            canvas.style.display = 'none';
        }, 3000);
    }, 15000);

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
        ctx.fillRect(0, 0, width, height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // Gravity
            p.alpha -= p.decay;
            
            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        }
        ctx.globalAlpha = 1; // Reset
        
        if (canvas.style.display !== 'none') {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
};
