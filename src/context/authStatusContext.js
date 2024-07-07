import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';
import { jwtDecode } from 'jwt-decode';

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

  const getSessionStatus = async () => {
    const token = localStorage.getItem('accessToken');
  
    if (!token) {
      return false;
    }
  
    try {
      const response = jwtDecode(token);
      console.log('status', response.authenticated);
      
      setFirstname(response.firstname);
      setImage(response.profile_image);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error checking session status:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSessionStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, firstname, image, loading }}>
      {children}
    </AuthContext.Provider>
  );
};