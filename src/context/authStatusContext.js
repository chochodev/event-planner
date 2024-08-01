import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';
import { useTokenState, useLayoutState } from '../zustand/store';

// ::::::::::::::::::::::::: cl as console.log
const is_dev_server = process.env.REACT_APP_DEVELOPMENT_SERVER === 'true';
console.log('dev server: ', is_dev_server)
export const cl = is_dev_server ? console.log.bind(console) : () => {};

// ::::::::::::::::::::::::: auth context provider
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ::::::::::::::::::::::: AUTH TOKEN STATES
  const { tokenValues, setTokenValues, resetTokenState } = useTokenState();
  const authToken = tokenValues.authToken;
  const isAuthenticated = 
    authToken.refresh?.length > 0 && authToken.access?.length > 0? 
    true : false

  // :::::::::::::::::::::::: LAYOUT STATES
  const { 
    layoutValues, 
    setLayoutValues,
  } = useLayoutState();
  const { loginLoading } = layoutValues;

  const showFlashMessage = (message, severity='success') => {
    setLayoutValues({
      ...layoutValues,
      flashMessage: message,
      flashSeverity: severity,
      openFlashMessage: true
    })
  }

  const closeFlashMessage = () => {
    setLayoutValues({
      ...layoutValues,
      openFlashMessage: false,
    })
  }

  // ::::::::::::::::::: get session status function
  const refreshUserData = async () => {  
    try {
      const response = await axiosInstance.get('/auth/status/');
      // console.log('user data gotten: ', response.data.user);
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
  // const [openFlashMessage, setOpenFlashMessage] = useState(false);
  // const [flashMessage, setFlashMessage] = useState('');
  // const [flashSeverity, setFlashSeverity] = useState('success');
  // const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLayoutValues({
      ...layoutValues,
      loginLoading: true,
    })
  
    const logInForm = {
      email: e.target.email.value,
      password: e.target.password.value
    }
  
    try {
      const response = await axiosInstance.post('/auth/signin/', logInForm);
      showFlashMessage(response.data?.message || 'User logged in successfully', 'success');
      // setOpenFlashMessage(true);
      
      // ::::::::::::::::: stores the response data
      // setAuthToken(response.data?.token);
      setTokenValues(response.data?.token)
      // cl('login response: ', response.data?.token);
      // localStorage.setItem('authToken', JSON.stringify(response.data?.token));
  
      // :::::::: closes the flash message and redirect
      setTimeout(() => {
        closeFlashMessage();
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      console.error('Error:', error.response ? error.response.data : error.message);
      showFlashMessage(errorMessage, 'error');

      // ::::::::: removes credentials incase there is any
      // localStorage.removeItem('authToken');
      resetTokenState();
      
      // closes the flash message
      setTimeout(() => {
        closeFlashMessage();
        window.location.reload();
      }, 3000);
    } finally {  
      setLayoutValues({
        ...layoutValues,
        loginLoading: false,
      })
    }
  };

  // ::::::::::::::::::::::::::::: Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout/', JSON.stringify({
        refresh_token: authToken.refresh 
      }));
      showFlashMessage('User logged out successfully', 'success');
    } catch (error) {
      showFlashMessage('User is not logged in', 'danger');
      console.error('Logout failed:', error);
    } finally {
      // ::::::::::::::::: resets the tokens
      resetTokenState();
      setTimeout(() => {
        closeFlashMessage();
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
        // handleLogout();
      } finally {
        setRefreshLoading(false);
      }
    }

    const interval = setInterval(() => {
      if (isAuthenticated) {
        setRefreshLoading(true);
        handleRefreshToken();
      }
    }, (2 * 60 * 1000))

    // :::::::::::::::::: clear function
    return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <FlashMessage />
      {children}
    </AuthContext.Provider>
  );
};