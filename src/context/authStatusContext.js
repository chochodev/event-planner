import React, { useEffect, useState, createContext } from 'react';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';
import { useTokenState, useLayoutState } from '../zustand/store';

// ::::::::::::::::::::::::: cl as console.log
const is_dev_server = process.env.REACT_APP_DEVELOPMENT_SERVER === 'true';
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
    resetLayoutState
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
    resetLayoutState();
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
        // window.location.href = '/';
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
    handleLogout: handleLogout,
  }

  return (
    <AuthContext.Provider value={contextData}>
      <FlashMessage />
      {children}
    </AuthContext.Provider>
  );
};