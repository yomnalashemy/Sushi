// Cart page functionality without ES6 modules

// Initialize AOS animation if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        offset: 100,
    });
}

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    loadCart() {
        const savedCart = localStorage.getItem('sushiman-cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        return cart;
    }

    saveCart() {
        localStorage.setItem('sushiman-cart', JSON.stringify(this.cart));
    }

    addToCart(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...item,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
    }

    removeFromCart(itemId) {
        const item = this.cart.find(cartItem => cartItem.id === itemId);
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
        if (item) {
            this.showNotification(`${item.name} removed from cart`, 'success');
        }
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                const oldQuantity = item.quantity;
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
                
                if (newQuantity > oldQuantity) {
                    this.showNotification(`${item.name} quantity increased`, 'success');
                } else if (newQuantity < oldQuantity) {
                    this.showNotification(`${item.name} quantity decreased`, 'info');
                }
            }
        }
    }

    calculateSubtotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    }

    calculateTax() {
        return this.calculateSubtotal() * 0.085; // 8.5% tax
    }

    calculateTotal() {
        const subtotal = this.calculateSubtotal();
        const tax = this.calculateTax();
        const delivery = subtotal > 0 ? 3.99 : 0;
        return subtotal + tax + delivery;
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const emptyCartMessage = document.getElementById('emptyCartMessage');

        if (!cartItemsContainer) {
            console.error('Cart page - cartItems container not found');
            return;
        }

        // Update cart count in header
        this.updateCartCount();

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '';
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
            const clearCartBtn = document.getElementById('clearCartBtn');
            if (clearCartBtn) clearCartBtn.style.display = 'none';
            if (subtotalElement) subtotalElement.textContent = '$0.00';
            if (taxElement) taxElement.textContent = '$0.00';
            if (totalElement) totalElement.textContent = '$0.00';
            return;
        }

        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (checkoutBtn) checkoutBtn.style.display = 'block';
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) clearCartBtn.style.display = 'block';

        // Render cart items
        const cartItemsHTML = this.cart.map(item => {
            const price = parseFloat(item.price.replace('$', ''));
            const totalPerItem = price * item.quantity;
            
            // Fix image path for cart page (add ../ if needed)
            let imagePath = item.image;
            if (imagePath && !imagePath.startsWith('../') && !imagePath.startsWith('http')) {
                imagePath = '../' + imagePath;
            }
            
            return `
                <div class="cart-item" data-item-id="${item.id}">
                    <div class="cart-item-image-container">
                        <img src="${imagePath}" alt="${item.name}" class="cart-item-image" onerror="this.src='../assets/sushi-1.png'">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-price">${item.price} per item</p>
                        <p class="cart-item-total">Total: $${totalPerItem.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-btn" onclick="cartManager.removeFromCart('${item.id}')">Remove</button>
                    </div>
                </div>
            `;
        }).join('');

        cartItemsContainer.innerHTML = cartItemsHTML;

        // Update summary
        const subtotal = this.calculateSubtotal();
        const tax = this.calculateTax();
        const total = this.calculateTotal();

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    checkout() {
        // Redirect to checkout page
        window.location.href = '/checkout.html';
    }

    init() {
        this.updateCartDisplay();
        
        // Add checkout button event listener
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Add clear cart button event listener
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }
    }

    clearCart() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is already empty!', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            this.saveCart();
            this.updateCartDisplay();
            this.showNotification('Cart cleared successfully!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Function to initialize cart page
function initializeCartPage() {
    // Initialize cart manager
    window.cartManager = new CartManager();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCartPage);
} else {
    // DOM is already loaded
    initializeCartPage();
} 