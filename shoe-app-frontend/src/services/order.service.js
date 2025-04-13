// src/services/order.service.js
import api from './api';

const OrderService = {
  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  createOrder: async (orderRequest) => {
    const response = await api.post('/orders', orderRequest);
    return response.data;
  },
  
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status?status=${status}`);
    return response.data;
  },

  updateTrackingNumber: async (id, trackingNumber) => {
    const response = await api.put(`/orders/${id}/tracking?trackingNumber=${trackingNumber}`);
    return response.data;
  },

  markAsShipped: async (id) => {
    const response = await api.put(`/orders/${id}/shipped`);
    return response.data;
  },

  markAsDelivered: async (id) => {
    const response = await api.put(`/orders/${id}/delivered`);
    return response.data;
  },

  getOrderStatistics: async (timeframe) => {
    const response = await api.get(`/orders/statistics${timeframe ? `?timeframe=${timeframe}` : ''}`);
    return response.data;
  }
};

export default OrderService;