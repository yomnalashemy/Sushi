// Menu page functionality
console.log('Menu page script loading...');

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

class MenuManager {
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

    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const menuContents = document.querySelectorAll('.menu-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                menuContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    setupAddToCartButtons() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                try {
                    const menuItem = button.closest('.menu-item');
                    if (!menuItem) {
                        console.error('Could not find parent menu item');
                        return;
                    }
                    
                    const itemId = menuItem.dataset.itemId;
                    const itemName = menuItem.dataset.itemName;
                    const itemPrice = menuItem.dataset.itemPrice;
                    const itemImage = menuItem.dataset.itemImage;
                    
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

    setupImageLoading() {
        const images = document.querySelectorAll('.menu-item-image');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.animation = 'none';
            });
            
            img.addEventListener('error', () => {
                // Fallback for failed image loads
                img.src = '../assets/sushi-1.png';
                img.alt = 'Menu Item';
            });
        });
    }

    init() {
        // Update cart count on page load
        this.updateCartCount();
        
        // Setup tab switching
        this.setupTabSwitching();
        
        // Setup add to cart buttons
        this.setupAddToCartButtons();
        
        // Setup image loading
        this.setupImageLoading();
    }
}

// Function to initialize menu page
function initializeMenuPage() {
    // Initialize menu manager
    window.menuManager = new MenuManager();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenuPage);
} else {
    // DOM is already loaded
    initializeMenuPage();
}

console.log('Menu page script loaded successfully'); 