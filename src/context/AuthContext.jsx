import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nvs_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('nvs_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('nvs_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = (emailOrPhone, password) => {
    // Basic verification simulation
    if (!emailOrPhone || !password) {
      addToast('Please enter both email/phone and password', 'error');
      return false;
    }
    const nameMatch = emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Customer';
    const capitalized = nameMatch.charAt(0).toUpperCase() + nameMatch.slice(1);

    const loggedUser = {
      name: capitalized || 'Ananya Iyer',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'customer@nammaveetusuvai.com',
      phone: emailOrPhone.includes('@') ? '+91 98401 23456' : emailOrPhone,
      address: {
        house: 'Flat 4B, Kaveri Apartments',
        street: '12th Cross, Gandhi Road',
        area: 'T. Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600017'
      }
    };

    setUser(loggedUser);
    addToast(`Welcome back, ${loggedUser.name}!`, 'success');
    return true;
  };

  const register = (name, email, phone, password) => {
    if (!name || !email || !password) {
      addToast('Please fill all required fields', 'error');
      return false;
    }

    const newUser = {
      name,
      email,
      phone: phone || '+91 98400 00000',
      address: {
        house: '',
        street: '',
        area: '',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001'
      }
    };

    setUser(newUser);
    addToast(`Account created successfully! Welcome, ${name}!`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
