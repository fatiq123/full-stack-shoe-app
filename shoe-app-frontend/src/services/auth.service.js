// src/services/auth.service.js
import api from './api';

const AuthService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role
      }));
    }
    return response.data;
  },
  
  signup: async (username, email, password) => {
    // Make sure we're sending exactly what the backend expects
    return api.post('/auth/signup', { 
      username: username, 
      email: email, 
      password: password 
    });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  isAdmin: () => {
    const user = AuthService.getCurrentUser();
    return user && user.role === 'ROLE_ADMIN';
  }
};

export default AuthService;
