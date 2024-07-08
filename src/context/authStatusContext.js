import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState('Anonymous');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);


  const getSessionStatus = async () => {
    const token = localStorage.getItem('refreshToken');
    const access = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
  
    if (!token || !access) {
      setLoading(false);
      return false;
    } else {
      const user_data = JSON.parse(user);
      
      setFirstname(user_data.firstname);
      setImage(user_data.profile_image);
      setIsAuthenticated(true);
    // }  {
    //   console.error('Error checking session status:', error);
    //   setIsAuthenticated(false);
    //   localStorage.removeItem('refreshToken');
    //   localStorage.removeItem('accessToken');

      setLoading(false);
    }
  };

  useEffect(() => {
    getSessionStatus();
  }, []);

  // ::::::::::::::::::::::: LOG IN FUNCTION
  const [openFlashMessage, setOpenFlashMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashSeverity, setFlashSeverity] = useState('success');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const logInForm = {
      email: e.target.email.value,
      password: e.target.password.value
    }
  
    try {
      const response = await axiosInstance.post('/auth/signin/', logInForm);
      setFlashMessage(response.data?.message || 'User logged in successfully');
      setFlashSeverity('success');
      setOpenFlashMessage(true);
  
      // :::::::: store tokens to local storage
      localStorage.setItem('accessToken', response.data?.access);
      localStorage.setItem('refreshToken', response.data?.refresh);
      localStorage.setItem('user', JSON.stringify(response.data?.user));
      console.log('response', response.data?.user)
  
      // :::::::: closes the flash message and redirect
      setTimeout(() => {
        setOpenFlashMessage(false);
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      setFlashMessage(errorMessage);
      setFlashSeverity('error');
      setOpenFlashMessage(true);
      
      // closes the flash message
      setTimeout(() => {
        setOpenFlashMessage(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // :::::::::::::::::: data
  let contextData = {
    isAuthenticated: isAuthenticated, 
    firstname: firstname, 
    image: image, 
    loading: loading,
    handleLogin: handleLogin
  }

  return (
    <AuthContext.Provider value={contextData}>
      <FlashMessage
        openFlashMessage={openFlashMessage}
        setOpenFlashMessage={setOpenFlashMessage}
        flashMessage={flashMessage}
        flashSeverity={flashSeverity}
      />
      {children}
    </AuthContext.Provider>
  );
};