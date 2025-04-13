// src/services/shoe.service.js
import api from './api';

const ShoeService = {
  getAllShoes: async () => {
    const response = await api.get('/shoes');
    return response.data;
  },
  
  getShoeById: async (id) => {
    const response = await api.get(`/shoes/${id}`);
    return response.data;
  },
  
  getShoesByBrand: async (brand) => {
    const response = await api.get(`/shoes/brand/${brand}`);
    return response.data;
  },
  
  getShoesByCategory: async (category) => {
    const response = await api.get(`/shoes/category/${category}`);
    return response.data;
  },
  
  createShoe: async (shoeData, imageFile) => {
    const formData = new FormData();
    formData.append('shoe', new Blob([JSON.stringify(shoeData)], { type: 'application/json' }));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    const response = await api.post('/shoes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  updateShoe: async (id, shoeData, imageFile) => {
    const formData = new FormData();
    formData.append('shoe', new Blob([JSON.stringify(shoeData)], { type: 'application/json' }));
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    const response = await api.put(`/shoes/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  deleteShoe: async (id) => {
    return api.delete(`/shoes/${id}`);
  }
};

export default ShoeService;