import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem('authToken')? 
      JSON.parse(localStorage.getItem('authToken')) : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState('Anonymous');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);


  const getSessionStatus = async () => {  
    if (!authToken) {
      setLoading(false);
      return false;
    } else {
      setFirstname(authToken.firstname);
      setImage(authToken.profile_image);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSessionStatus();
  });

  // ::::::::::::::::::::::: LOGIN FUNCTION
  const [openFlashMessage, setOpenFlashMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashSeverity, setFlashSeverity] = useState('success');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
  
    const logInForm = {
      email: e.target.email.value,
      password: e.target.password.value
    }
  
    try {
      const response = await axiosInstance.post('/auth/signin/', logInForm);
      setFlashMessage(response.data?.message || 'User logged in successfully');
      setFlashSeverity('success');
      setOpenFlashMessage(true);
      
      // ::::::::::::::::: stores the response data
      setAuthToken(response.data?.token);
      localStorage.setItem('authToken', JSON.stringify(response.data?.token));
  
      // :::::::: closes the flash message and redirect
      setTimeout(() => {
        setOpenFlashMessage(false);
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      console.error('Error:', error.response ? error.response.data : error.message);
      setFlashMessage(errorMessage);
      setFlashSeverity('error');
      setOpenFlashMessage(true);

      // ::::::::: removes credentials incase there is any
      localStorage.removeItem('authToken');
      
      // closes the flash message
      setTimeout(() => {
        setOpenFlashMessage(false);
      }, 3000);
    } finally {
      setLoginLoading(false);
    }
  };

  // :::::::::::::::::: data
  let contextData = {
    isAuthenticated: isAuthenticated, 
    firstname: firstname, 
    image: image, 
    loading: loading,
    handleLogin: handleLogin,
    loginLoading: loginLoading
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