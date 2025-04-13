// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import CartService from '../services/cart.service';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  
  const fetchCart = async () => {
    if (!currentUser) {
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
      return;
    }
    
    try {
      setLoading(true);
      const data = await CartService.getCart();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Error loading your cart');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCart();
  }, [currentUser]);
  
  const addToCart = async (shoeId, quantity) => {
    try {
      setLoading(true);
      await CartService.addToCart(shoeId, quantity);
      toast.success('Item added to cart');
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding item to cart');
    } finally {
      setLoading(false);
    }
  };
  
  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      await CartService.updateCartItem(itemId, quantity);
      toast.success('Cart updated');
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Error updating cart');
    } finally {
      setLoading(false);
    }
  };
  
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      await CartService.removeFromCart(itemId);
      toast.success('Item removed from cart');
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Error removing item from cart');
    } finally {
      setLoading(false);
    }
  };
  
  const clearCart = async () => {
    try {
      setLoading(true);
      await CartService.clearCart();
      toast.success('Cart cleared');
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error clearing cart');
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};