// Simple cart functionality without ES6 modules
console.log('Script loading...');

// Global error handler to catch external errors
window.addEventListener('error', function(e) {
    if (e.message.includes('solveSimpleChallenge')) {
        console.log('External error caught and ignored:', e.message);
        e.preventDefault();
        return false;
    }
});

// Initialize AOS animation if available
try {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            offset: 100,
        });
    } else {
        console.log('AOS library not loaded yet');
    }
} catch (error) {
    console.log('AOS initialization error:', error);
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
                <button onclick="window.location.href='public/cart.html'">View Cart</button>
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

// Initialize AOS after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                offset: 100,
            });
        }
    });
} else {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            offset: 100,
        });
    }
}

// Email subscription functionality
function handleSubscribe() {
    const emailInput = document.getElementById('emailInput');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const messageDiv = document.getElementById('subscribeMessage');
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable button and show loading
    subscribeBtn.disabled = true;
    subscribeBtn.textContent = 'Subscribing...';
    
    // Simulate email subscription (in a real app, you'd send this to your backend)
    setTimeout(() => {
        // Store email in localStorage (for demo purposes)
        const subscribers = JSON.parse(localStorage.getItem('sushiman-subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('sushiman-subscribers', JSON.stringify(subscribers));
        }
        
        showMessage('Thank you for subscribing! You\'ll receive our latest offers soon.', 'success');
        emailInput.value = '';
        
        // Reset button
        subscribeBtn.disabled = false;
        subscribeBtn.textContent = 'Get Started';
    }, 1500);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('subscribeMessage');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        messageDiv.style.color = '#4CAF50';
        messageDiv.style.border = '1px solid #4CAF50';
    } else {
        messageDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        messageDiv.style.color = '#F44336';
        messageDiv.style.border = '1px solid #F44336';
    }
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Add enter key support for email input
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSubscribe();
            }
        });
    }
});

console.log('Script loaded successfully');