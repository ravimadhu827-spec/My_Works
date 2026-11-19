import React, { createContext, useContext, useState, useEffect } from 'react';
import { coupons } from '../data/offersData';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nvs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('nvs_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nvs_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('nvs_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('nvs_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, selectedWeight = null, quantity = 1) => {
    const weightLabel = selectedWeight || product.weight;
    
    // Find price for this weight
    let unitPrice = product.price;
    if (product.weights && product.weights.length > 0) {
      const foundWeight = product.weights.find(w => w.label === weightLabel);
      if (foundWeight) {
        unitPrice = foundWeight.price;
      }
    }

    const cartItemId = `${product.id}_${weightLabel}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            product,
            selectedWeight: weightLabel,
            unitPrice,
            quantity
          }
        ];
      }
    });

    addToast(`Added "${product.name}" (${weightLabel}) to cart!`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => prev.filter(item => item.cartItemId !== cartItemId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const coupon = coupons.find(c => c.code === cleanCode);
    if (!coupon) {
      addToast('Invalid coupon code. Try NAMMA10 or SNACK15!', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }

    const currentSubtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    if (currentSubtotal < coupon.minOrder) {
      addToast(`Minimum order of ₹${coupon.minOrder} required for ${coupon.code}`, 'error');
      return { success: false, message: `Min order ₹${coupon.minOrder}` };
    }

    setAppliedCoupon(coupon);
    addToast(`Coupon "${coupon.code}" applied! You saved ${coupon.discountPercent}%`, 'success');
    return { success: true, coupon };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 499 || items.length === 0 ? 0 : 40;
  
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        deliveryFee,
        discountAmount,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
