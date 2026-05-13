'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for saved user in localStorage on mount
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Set default Authorization header for all future API calls
      API.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
    }
    setLoading(false);
  }, []);

  const loginUser = (userData, redirectPath = '/') => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    API.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    delete API.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
