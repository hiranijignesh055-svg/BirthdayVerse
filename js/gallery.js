document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    if (track) {
        // Clone items for infinite scroll
        const items = track.innerHTML;
        track.innerHTML += items; // Duplicate
    }
});
