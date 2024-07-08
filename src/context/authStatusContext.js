import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem('authToken')? 
      JSON.parse(localStorage.getItem('authToken')) : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authToken')? true : false
  );
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

  // Logout function
  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axiosInstance.post('/auth/logout/', JSON.stringify({ refresh_token: authToken.refresh }));
      console.log('Logout success:', response.data);
      setFlashMessage('User logged out successfully');
      setFlashSeverity('success');
    } catch (error) {
      setFlashMessage('User is not logged in');
      setFlashSeverity('danger');
      console.error('Logout failed:', error);
    } finally {
      setOpenFlashMessage(true);
      localStorage.removeItem('authToken');
      setTimeout(() => {
        setOpenFlashMessage(false);
        // window.location.href = '/';
      }, 1000);
    }
  };

  // Refresh function
  const [refreshLoading, setRefreshLoading] = useState(true);


  useEffect(() => {
    const handleRefreshToken = async () => {
      console.log('refresh func called!');
      console.log('refresh token: ', authToken.refresh);
      try {
        const userData = {
          'firstname': authToken.firstname,
          'profile_image': authToken.profile_image, 
          'is_active': authToken.is_active
        }
        const response = await axiosInstance.post('/auth/token/refresh/', { 'refresh': authToken.refresh });
        const newAuthToken = {
          ...response.data,
          ...userData,
        };
        console.log('new data token: ', newAuthToken);
        setAuthToken(newAuthToken);
        localStorage.setItem('authToken', JSON.stringify(newAuthToken));
        console.log('Refresh-token success:', response.data);
      } catch (error) {
        console.error('Refresh-token failed:', error);
      } finally {
        setRefreshLoading(false);
      }
    }

    // ::::::::::::::: calling and interval 
    handleRefreshToken();

    const interval = setInterval(() => {
      if (authToken) {
        setRefreshLoading(true);
        handleRefreshToken();
      }
    }, (8 * 60 * 1000))

    // :::::::::::::::::: clear function
    return () => clearInterval(interval);

  }, [authToken, refreshLoading]);

  // :::::::::::::::::: data
  let contextData = {
    isAuthenticated: isAuthenticated, 
    firstname: firstname, 
    image: image, 
    loading: loading,
    loginLoading: loginLoading,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
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