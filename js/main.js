let cart = document.getElementById('cart');
let payButton = document.getElementById('pay-button');
let products = document.querySelectorAll('.card__item > div[data-product]');

products.forEach((product) => {
    product.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.querySelector('img').src);
    });

    // Touch events for mobile
    product.addEventListener('touchstart', (e) => {
        let touch = e.touches[0];
        let imgSrc = touch.target.querySelector('img').src;
        e.dataTransfer = e.dataTransfer || {}; // Fallback for mobile
        e.dataTransfer.setData('text', imgSrc);
    });

    product.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling
    });
});

cart.addEventListener('dragover', (e) => {
    e.preventDefault();
});

cart.addEventListener('drop', (e) => {
    e.preventDefault();
    let productSrc = e.dataTransfer.getData('text');
    addProductToCart(productSrc);
});

cart.addEventListener('touchend', (e) => {
    let productSrc = e.dataTransfer.getData('text');
    addProductToCart(productSrc);
});

function addProductToCart(productSrc) {
    if (cart.childElementCount < 5) { // Allow 3 products + cart icon
        let productImg = document.createElement('img');
        productImg.src = productSrc;
        productImg.alt = 'products';
        cart.appendChild(productImg);

        if (cart.childElementCount === 5) { // 3 products + cart icon
            payButton.style.display = 'block';
        }
    }
}

payButton.addEventListener('click', () => {
    while (cart.childElementCount > 1) { // Keep the cart icon
        cart.removeChild(cart.lastChild);
    }
    payButton.style.display = 'none';
});

cart.addEventListener('dragenter', (e) => {
    e.preventDefault();
    if (cart.childElementCount > 4) {
        e.dataTransfer.dropEffect = 'none';
    }
});