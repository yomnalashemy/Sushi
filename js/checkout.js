// Checkout page functionality without ES6 modules

// Initialize AOS animation if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        offset: 100,
    });
}

class CheckoutManager {
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

    updateOrderSummary() {
        const orderItemsContainer = document.getElementById('orderItems');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');

        if (!orderItemsContainer) {
            console.error('Checkout page - orderItems container not found');
            return;
        }

        if (this.cart.length === 0) {
            orderItemsContainer.innerHTML = '<p style="text-align: center; color: var(--gray-100);">No items in cart</p>';
            if (subtotalElement) subtotalElement.textContent = '$0.00';
            if (taxElement) taxElement.textContent = '$0.00';
            if (totalElement) totalElement.textContent = '$0.00';
            return;
        }

        // Render order items
        const orderItemsHTML = this.cart.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-price">${item.price}</div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
            </div>
        `).join('');

        orderItemsContainer.innerHTML = orderItemsHTML;

        // Update totals
        const subtotal = this.calculateSubtotal();
        const tax = this.calculateTax();
        const total = this.calculateTotal();

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    setupPaymentOptions() {
        const codRadio = document.getElementById('cod');
        const cardRadio = document.getElementById('card');
        const cardDetails = document.getElementById('cardDetails');

        if (!codRadio || !cardRadio || !cardDetails) {
            console.error('Checkout page - Payment option elements not found');
            return;
        }

        // Show/hide card details based on payment method selection
        codRadio.addEventListener('change', () => {
            cardDetails.style.display = 'none';
            this.updateCardValidation();
        });

        cardRadio.addEventListener('change', () => {
            cardDetails.style.display = 'block';
            this.updateCardValidation();
        });
    }

    updateCardValidation() {
        const cardRadio = document.getElementById('card');
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');
        const cardName = document.getElementById('cardName');

        if (!cardRadio || !cardNumber || !expiryDate || !cvv || !cardName) {
            console.error('Checkout page - Card validation elements not found');
            return;
        }

        if (cardRadio.checked) {
            cardNumber.required = true;
            expiryDate.required = true;
            cvv.required = true;
            cardName.required = true;
        } else {
            cardNumber.required = false;
            expiryDate.required = false;
            cvv.required = false;
            cardName.required = false;
        }
    }

    setupFormValidation() {
        const form = document.getElementById('checkoutForm');

        if (!form) {
            console.error('Checkout page - Checkout form not found');
            return;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleOrderSubmission();
        });

        // Card number formatting
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                e.target.value = value.substring(0, 19);
            });
        }

        // Expiry date formatting
        const expiryDate = document.getElementById('expiryDate');
        if (expiryDate) {
            expiryDate.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.substring(0, 5);
            });
        }

        // CVV formatting
        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
            });
        }
    }

    validateForm() {
        const form = document.getElementById('checkoutForm');
        const cardRadio = document.getElementById('card');
        
        if (!form) {
            console.error('Checkout page - Form not found for validation');
            return false;
        }
        
        // Basic form validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        // Additional validation for card payment
        if (cardRadio && cardRadio.checked) {
            const cardNumber = document.getElementById('cardNumber');
            const expiryDate = document.getElementById('expiryDate');
            const cvv = document.getElementById('cvv');
            const cardName = document.getElementById('cardName');

            if (!cardNumber || !expiryDate || !cvv || !cardName) {
                console.error('Checkout page - Card fields not found');
                return false;
            }

            if (cardNumber.value.replace(/\s/g, '').length !== 16) {
                alert('Please enter a valid 16-digit card number');
                return false;
            }

            if (!expiryDate.value.match(/^\d{2}\/\d{2}$/)) {
                alert('Please enter a valid expiry date (MM/YY)');
                return false;
            }

            if (cvv.value.length !== 3) {
                alert('Please enter a valid 3-digit CVV');
                return false;
            }

            if (!cardName.value.trim()) {
                alert('Please enter the name on the card');
                return false;
            }
        }

        return true;
    }

    handleOrderSubmission() {
        if (!this.validateForm()) {
            return;
        }

        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Get form data
        const formData = new FormData(document.getElementById('checkoutForm'));
        const orderData = {
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            delivery: {
                address: formData.get('address'),
                city: formData.get('city'),
                zipCode: formData.get('zipCode'),
                instructions: formData.get('deliveryInstructions')
            },
            payment: {
                method: formData.get('paymentMethod'),
                cardNumber: formData.get('cardNumber'),
                expiryDate: formData.get('expiryDate'),
                cvv: formData.get('cvv'),
                cardName: formData.get('cardName')
            },
            order: {
                items: this.cart,
                subtotal: this.calculateSubtotal(),
                tax: this.calculateTax(),
                delivery: 3.99,
                total: this.calculateTotal()
            }
        };

        // Show order confirmation
        this.showOrderConfirmation(orderData);
    }

    showOrderConfirmation(orderData) {
        // Clear cart and redirect to success page
        localStorage.removeItem('sushiman-cart');
        
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 1000);
    }

    init() {
        // Update cart count and order summary
        this.updateCartCount();
        this.updateOrderSummary();

        // Setup payment options
        this.setupPaymentOptions();

        // Setup form validation
        this.setupFormValidation();

        // Check if cart is empty and redirect if necessary
        if (this.cart.length === 0) {
            alert('Your cart is empty! Redirecting to menu...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }
}

// Function to initialize checkout page
function initializeCheckoutPage() {
    // Initialize checkout manager
    window.checkoutManager = new CheckoutManager();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCheckoutPage);
} else {
    // DOM is already loaded
    initializeCheckoutPage();
} 