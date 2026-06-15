// Cart service helper functions
export const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const itemTotal = (item.discount_price || 0) * (item.quantity || 0);
    return total + itemTotal;
  }, 0);
};

export const calculateCartCount = (cartItems) => {
  return cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
};