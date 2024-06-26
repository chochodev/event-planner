import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const response = await axiosInstance.get('/auth/status/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      
      setIsAuthenticated(response.data?.authenticated);
      setUsername(response.data?.username);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, loading }}>
      {children}
    </AuthContext.Provider>
  );
};