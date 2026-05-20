// Your code here.
const container = document.querySelector('.items');
let activeItem = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

function getContainerBounds() {
    const containerRect = container.getBoundingClientRect();
    return {
        left: containerRect.left,
        right: containerRect.right,
        top: containerRect.top,
        bottom: containerRect.bottom
    };
}

function constrainPosition(item, x, y) {
    const itemRect = item.getBoundingClientRect();
    const containerBounds = getContainerBounds();
    const itemWidth = itemRect.width;
    const itemHeight = itemRect.height;
    
    let newX = x;
    let newY = y;
    
    if (newX < containerBounds.left) {
        newX = containerBounds.left;
    }
    if (newX + itemWidth > containerBounds.right) {
        newX = containerBounds.right - itemWidth;
    }
    if (newY < containerBounds.top) {
        newY = containerBounds.top;
    }
    if (newY + itemHeight > containerBounds.bottom) {
        newY = containerBounds.bottom - itemHeight;
    }
    
    return { x: newX, y: newY };
}

function onMouseDown(e) {
    if (e.target.classList.contains('item')) {
        activeItem = e.target;
        isDragging = true;
        
        const computedStyle = window.getComputedStyle(activeItem);
        if (computedStyle.position !== 'absolute') {
            const rect = activeItem.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            activeItem.style.position = 'absolute';
            activeItem.style.left = rect.left - containerRect.left + 'px';
            activeItem.style.top = rect.top - containerRect.top + 'px';
            activeItem.style.margin = '0';
            activeItem.style.zIndex = '1000';
        }
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const rect = activeItem.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        offsetX = mouseX - rect.left;
        offsetY = mouseY - rect.top;
        
        e.preventDefault();
        activeItem.style.cursor = 'grabbing';
    }
}

function onMouseMove(e) {
    if (isDragging && activeItem) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const containerRect = container.getBoundingClientRect();
        
        let newLeft = mouseX - offsetX - containerRect.left;
        let newTop = mouseY - offsetY - containerRect.top;
        
        const itemWidth = activeItem.offsetWidth;
        const itemHeight = activeItem.offsetHeight;
        
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - itemWidth));
        newTop = Math.max(0, Math.min(newTop, containerRect.height - itemHeight));
        
        activeItem.style.left = newLeft + 'px';
        activeItem.style.top = newTop + 'px';
    }
}

function onMouseUp(e) {
    if (isDragging && activeItem) {
        isDragging = false;
        activeItem.style.cursor = 'grab';
        activeItem = null;
    }
}

container.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

const allItems = document.querySelectorAll('.item');
allItems.forEach(item => {
    item.style.cursor = 'grab';
});