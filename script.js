const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
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
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

// Ensure the container has scrollable width
window.addEventListener('load', () => {
    const items = document.querySelectorAll('.item');
    let totalWidth = 0;
    items.forEach(item => {
        totalWidth += item.offsetWidth + 20;
    });
    if (slider.scrollWidth <= slider.clientWidth) {
        slider.style.minWidth = totalWidth + 'px';
    }
});