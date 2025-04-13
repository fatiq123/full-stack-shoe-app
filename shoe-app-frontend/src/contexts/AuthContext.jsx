// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);
  
  const login = async (username, password) => {
    try {
      const response = await AuthService.login(username, password);
      setCurrentUser({
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  const signup = async (username, email, password) => {
    try {
      const response = await AuthService.signup(username, email, password);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };
  
  const isAdmin = () => {
    return currentUser && currentUser.role === 'ROLE_ADMIN';
  };
  
  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    isAdmin
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
