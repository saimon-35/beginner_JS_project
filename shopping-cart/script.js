// Select the cart-items container and all add-to-cart buttons
document.addEventListener('DOMContentLoaded', () => {
const cartItemsContainer = document.querySelector('.cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
const cart = {};
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {

        const productElement = event.currentTarget.closest('.product');

        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = productElement.querySelector('.product-price').textContent;

        // If product already exists, increase count
        if (cart[productName]) {
            cart[productName].quantity += 1;
            cart[productName].element.querySelector('.cart-item-qty').textContent =
                `x${cart[productName].quantity} = $${(cart[productName].quantity * cart[productName].price).toFixed(2)}`;
        } 
        // First time click
        else {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <span class="cart-item-name">${productName}</span>
                <span class="cart-item-price">${productPrice}</span>
                <span class="cart-item-qty">x1 = $${parseFloat(productPrice.replace('$', '')).toFixed(2)}</span>
            `;

            cartItemsContainer.appendChild(cartItem);

            cart[productName] = {
                quantity: 1,
                price: parseFloat(productPrice.replace('$', '')),
                element: cartItem
            };
        }
    });
});
checoutButton = document.querySelector('.checkout');
totalPriceElement = document.querySelector('.total-price');
checoutButton.addEventListener('click', () => {
    let total = 0;
    for (const item in cart) {
        total += cart[item].quantity * cart[item].price;
    }
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
});

// Add event listeners to all remove-from-cart buttons
removeFromCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productElement = event.currentTarget.closest('.product');
        const productName = productElement.querySelector('.product-name').textContent;
        // If product exists in cart, remove it
        if (cart[productName]) {
            cart[productName].quantity -= 1;
            if (cart[productName].quantity === 0) {
                cartItemsContainer.removeChild(cart[productName].element);
                delete cart[productName];
            } else {
                cart[productName].element.querySelector('.cart-item-qty').textContent =
                    `x${cart[productName].quantity} = $${(cart[productName].quantity * cart[productName].price).toFixed(2)}`;
            }
        }
    });
}
);
});