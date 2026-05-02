const BASE_CART_KEY = 'maxims_hardware_cart_v1';

const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.phone || 'guest';
};

const getCartKey = () => `${BASE_CART_KEY}_${getUserId()}`;

export const addToCart = (product) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return false;

    // Ensure product has an ID if it's a dashboard item without one
    const productWithId = {
        ...product,
        id: product.id || `dash-${product.title.replace(/\s+/g, '-').toLowerCase()}`
    };

    const cartKey = getCartKey();
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const existingItem = cart.find(item => item.id === productWithId.id && item.title === productWithId.title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...productWithId, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    return true;
};

export const getCart = () => {
    return JSON.parse(localStorage.getItem(getCartKey()) || '[]');
};

export const updateCartQuantity = (id, delta) => {
    let cart = getCart();
    cart = cart.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
    });
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    return cart;
};

export const removeFromCart = (id) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    return cart;
};

export const clearCart = () => {
    localStorage.removeItem(getCartKey());
    window.dispatchEvent(new Event('cartUpdated'));
};
