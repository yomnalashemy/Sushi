// Success page functionality without ES6 modules

// Initialize AOS animation if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        offset: 100,
    });
}

class SuccessManager {
    constructor() {
        this.init();
    }

    generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `#SUSHI-2024-${timestamp.toString().slice(-6)}-${random.toString().padStart(3, '0')}`;
    }

    updateCartCount() {
        const cart = this.loadCart();
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    loadCart() {
        const savedCart = localStorage.getItem('sushiman-cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        return cart;
    }

    simulateDeliveryProgress() {
        const steps = document.querySelectorAll('.status-step');
        let currentStep = 0;

        const progressSteps = () => {
            if (currentStep < steps.length) {
                // Mark current step as active
                steps[currentStep].classList.add('active');
                
                // Mark previous steps as completed
                for (let i = 0; i < currentStep; i++) {
                    steps[i].classList.remove('active');
                    steps[i].classList.add('completed');
                }
                
                currentStep++;
                
                // Continue to next step after delay
                setTimeout(progressSteps, 3000);
            }
        };

        // Start the progress simulation
        setTimeout(progressSteps, 2000);
    }

    init() {
        // Generate and display order number
        const orderNumberElement = document.getElementById('orderNumber');
        if (orderNumberElement) {
            const orderNumber = this.generateOrderNumber();
            orderNumberElement.textContent = orderNumber;
        }

        // Update cart count
        this.updateCartCount();

        // Start delivery progress simulation
        this.simulateDeliveryProgress();

        // Clear cart after successful order
        localStorage.removeItem('sushiman-cart');
    }
}

// Function to initialize success page
function initializeSuccessPage() {
    // Initialize success manager
    window.successManager = new SuccessManager();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSuccessPage);
} else {
    // DOM is already loaded
    initializeSuccessPage();
} 