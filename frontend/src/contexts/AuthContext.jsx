import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
  const res = await API.get('/api/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user', err);
      localStorage.removeItem('token');
      delete API.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
  const res = await API.post('/api/auth/login', credentials);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user); // Set user directly from login response
      return { success: true, user };
    } catch (err) {
      console.error('Login failed', err);
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
  const res = await API.post('/api/auth/signup', userData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user); // Set user directly from signup response
      return { success: true, user };
    } catch (err) {
      console.error('Signup failed', err);
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
