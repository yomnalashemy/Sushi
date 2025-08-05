// Simple cart functionality without ES6 modules
console.log('Script loading...');

// Initialize AOS animation if available
if (typeof AOS !== 'undefined') {
AOS.init({
    duration: 1000,
    offset: 100,
});
}

// Cart functionality
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
        this.updateCartCount();
        this.showAddToCartNotification(item.name);
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    showAddToCartNotification(itemName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>✓ ${itemName} added to cart!</span>
                <button onclick="window.location.href='cart.html'">View Cart</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    init() {
        // Update cart count on page load
        this.updateCartCount();
        
        // Add event listeners to all "Add to Order" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        
        addToCartButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                try {
                    const card = button.closest('.popular-foods__card');
                    if (!card) {
                        console.error('Could not find parent card element');
                        return;
                    }
                    
                    const itemId = card.dataset.itemId;
                    const itemName = card.dataset.itemName;
                    const itemPrice = card.dataset.itemPrice;
                    const itemImage = card.dataset.itemImage;
                    
                    if (!itemId || !itemName || !itemPrice || !itemImage) {
                        console.error('Missing item data:', { itemId, itemName, itemPrice, itemImage });
                        alert('Error: Missing item data. Please check console for details.');
                        return;
                    }
                    
                    const item = {
                        id: itemId,
                        name: itemName,
                        price: `$${itemPrice}`,
                        image: itemImage
                    };
                    
                    this.addToCart(item);
                } catch (error) {
                    console.error('Error in button click handler:', error);
                    alert('Error adding item to cart. Please check console for details.');
                }
            });
        });
    }
}

// Function to initialize cart
function initializeCart() {
    // Initialize cart manager
    window.cartManager = new CartManager();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCart);
} else {
    // DOM is already loaded
    initializeCart();
}

console.log('Script loaded successfully');