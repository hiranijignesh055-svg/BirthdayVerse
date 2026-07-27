document.addEventListener('DOMContentLoaded', () => {
    initHeroParticles();
});

function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let width, height;
    function setSize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    setSize();
    window.addEventListener('resize', setSize);

    const stars = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            opacity: Math.random()
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
            star.x += star.vx;
            star.y += star.vy;
            
            if (star.x < 0) star.x = width;
            if (star.x > width) star.x = 0;
            if (star.y < 0) star.y = height;
            if (star.y > height) star.y = 0;
            
            // Twinkle effect
            star.opacity += Math.random() * 0.1 - 0.05;
            if (star.opacity < 0.2) star.opacity = 0.2;
            if (star.opacity > 1) star.opacity = 1;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}
