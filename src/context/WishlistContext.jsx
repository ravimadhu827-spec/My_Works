import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nvs_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nvs_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      addToast(`Removed "${product.name}" from your wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      addToast(`Added "${product.name}" to your wishlist ❤️`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    addToast('Item removed from wishlist', 'info');
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
