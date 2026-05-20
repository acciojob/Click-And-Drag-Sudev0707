const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
    e.preventDefault();
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});

// Ensure the container has horizontal scroll
window.addEventListener('load', () => {
    // Force scroll to be enabled by making sure content width exceeds container width
    const items = document.querySelectorAll('.item');
    let totalWidth = 0;
    items.forEach(item => {
        totalWidth += item.offsetWidth + 20;
    });
    
    if (slider.scrollWidth <= slider.clientWidth) {
        slider.style.width = '100%';
        slider.style.overflowX = 'scroll';
    }
    
    // Initialize scroll position
    slider.scrollLeft = 0;
});