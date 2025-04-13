// src/services/cart.service.js
import api from './api';

const CartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  
  addToCart: async (shoeId, quantity) => {
    const response = await api.post('/cart', { shoeId, quantity });
    return response.data;
  },
  
  updateCartItem: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },
  
  removeFromCart: async (itemId) => {
    return api.delete(`/cart/${itemId}`);
  },
  
  clearCart: async () => {
    return api.delete('/cart');
  }
};

export default CartService;