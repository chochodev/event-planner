import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';
import { useTokenState } from '../zustand/store';

export const cl = console.log.bind(console);
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { tokenValues, setTokenValues, resetTokenState } = useTokenState();
  const { firstname, profile_image, is_active } = tokenValues;
  const authToken = tokenValues.authToken;
  const isAuthenticated = 
    authToken.refresh?.length > 0 && authToken.access?.length > 0? 
    true : false

  // ::::::::::::::::::: get session status function
  const refreshUserData = async () => {  
    try {
      const response = await axiosInstance.get('/auth/status/');
      console.log('user data gotten: ', response.data.user);
      setTokenValues({
        ...tokenValues,
        ...response.data.user,
      })
    } catch (error) {
      // const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

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
      // setAuthToken(response.data?.token);
      setTokenValues(response.data?.token)
      // cl('login response: ', response.data?.token);
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
        window.location.reload();
      }, 3000);
    } finally {
      setLoginLoading(false);
    }
  };

  // ::::::::::::::::::::::::::::: Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout/', JSON.stringify({
        refresh_token: authToken.refresh 
      }));
      setFlashMessage('User logged out successfully');
      setFlashSeverity('success');
    } catch (error) {
      setFlashMessage('User is not logged in');
      setFlashSeverity('danger');
      console.error('Logout failed:', error);
    } finally {
      // ::::::::::::::::: resets the tokens
      setOpenFlashMessage(true);
      resetTokenState();
      setTimeout(() => {
        setOpenFlashMessage(false);
        window.location.href = '/';
      }, 1000);
    }
  };

  // ::::::::::::::::::::::::::::::::::::: Refresh function
  const [refreshLoading, setRefreshLoading] = useState(true);

  useEffect(() => {
    const handleRefreshToken = async () => {
      try {
        const response = await axiosInstance.post('/auth/token/refresh/', {
          'refresh': authToken.refresh 
        });
        cl('refresh response:', response.data);
        // setAuthToken(newAuthToken);
        setTokenValues({ 
          ...tokenValues, 
          access: response.data.access, 
          refresh: response.data.refresh
        })
      } catch (error) {
        console.error('Refresh-token failed:', error);
        handleLogout();
      } finally {
        setRefreshLoading(false);
      }
    }

    const interval = setInterval(() => {
      if (authToken) {
        setRefreshLoading(true);
        handleRefreshToken();
      }
    }, (8 * 60 * 1000))

    // :::::::::::::::::: clear function
    return () => clearInterval(interval);

  }, [authToken, refreshLoading, tokenValues]);

  // :::::::::::::::::: data
  let contextData = {
    isAuthenticated: isAuthenticated, 
    // firstname: firstname, 
    // image: image, 
    // loading: loading,
    refreshUserData: refreshUserData,
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