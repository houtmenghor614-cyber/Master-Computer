import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    setCartItems(savedCart);
    updateTotals(savedCart);
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(cartItems);
    updateTotals(cartItems);
  }, [cartItems]);

  const updateTotals = (items) => {
    const total = items.reduce((sum, item) => sum + ((item.discount_price || 0) * (item.quantity || 0)), 0);
    const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalAmount(total);
    setTotalItems(count);
  };

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.title_product} quantity`);
        return updatedItems;
      }

      toast.success(`Added ${product.title_product} to cart`);
      return [...prevItems, {
        id: product.id,
        title_product: product.title_product,
        original_price: product.original_price,
        discount_price: product.discount_price,
        main_image: product.main_image,
        color: product.color,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
        quantity: quantity
      }];
    });
  };

  const removeFromCart = (id, size, color) => {
    const itemToRemove = cartItems.find(item => item.id === id && item.selectedSize === size && item.selectedColor === color);
    setCartItems(prev => prev.filter(
      item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
    ));
    if (itemToRemove) {
      toast.success(`Removed ${itemToRemove.title_product} from cart`);
    }
  };

  const updateQuantity = (id, size, color, quantity) => {
    if (quantity < 1) {
      removeFromCart(id, size, color);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared successfully');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalAmount,
      totalItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};