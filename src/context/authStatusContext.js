import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState('Anonymous');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return false;
    }

    try {
      const response = await axiosInstance.get('/auth/status/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      setIsAuthenticated(response.data?.authenticated);
      const user = response.data?.user
      setFirstname(user?.firstname);
      setImage(user?.image);
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, firstname, image, loading }}>
      {children}
    </AuthContext.Provider>
  );
};