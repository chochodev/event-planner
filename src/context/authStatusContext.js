import React, { useEffect, useState, createContext } from 'react';
// import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState('Anonymous');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);


  const getSessionStatus = async () => {
    const token = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('user');
  
    if (!token) {
      setLoading(false);
      return false;
    }
  
    try {
      // const response = jwtDecode(token);
      const user_data = JSON.parse(user);
      
      setFirstname(user_data.firstname);
      setImage(user_data.profile_image);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error checking session status:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('refreshToken');
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