// How to Order page functionality

// Initialize AOS animation if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        offset: 100,
    });
}

class HowToOrderManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    loadCart() {
        const savedCart = localStorage.getItem('sushiman-cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        return cart;
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    init() {
        // Update cart count on page load
        this.updateCartCount();
        
        // Add smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Add copy functionality for promo codes
        this.setupPromoCodeCopy();
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupPromoCodeCopy() {
        const promoCode = document.querySelector('.offer-card p strong');
        if (promoCode) {
            promoCode.style.cursor = 'pointer';
            promoCode.title = 'Click to copy';
            
            promoCode.addEventListener('click', () => {
                const code = promoCode.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    this.showNotification(`Promo code "${code}" copied to clipboard!`, 'success');
                }).catch(() => {
                    this.showNotification(`Promo code "${code}" copied to clipboard!`, 'success');
                });
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `how-to-order-notification ${type}`;
        notification.textContent = message;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-family: var(--plus-jakarta-sans);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Function to initialize how to order page
function initializeHowToOrderPage() {
    // Initialize how to order manager
    window.howToOrderManager = new HowToOrderManager();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHowToOrderPage);
} else {
    // DOM is already loaded
    initializeHowToOrderPage();
}

console.log('How to Order page script loaded successfully');
