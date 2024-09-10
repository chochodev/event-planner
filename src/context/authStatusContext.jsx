import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from 'utils/axios';
import { useTokenState } from '../zustand/store';
import useFlashMessage from '@/utils/flashMessage';

// ::::::::::::::::::::::::: cl as console.log
const is_dev_server = import.meta.env.VITE_APP_DEVELOPMENT_SERVER === 'true';
// eslint-disable-next-line react-refresh/only-export-components
export const cl = is_dev_server ? console.log.bind(console) : () => {};
cl('is dev: ', is_dev_server);

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
  const flashMessage = useFlashMessage();

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

      // ::::::::::::::::: show flash message
      flashMessage('Logout Success', 'User logged out successfully', 'success');

    } catch (error) {
      // ::::::::::::::::: show flash message
      flashMessage('Logout Error', 'User is not logged in', 'danger');
      console.error('Logout Error:', error);
    } finally {
      // ::::::::::::::::: resets the tokens
      resetTokenState();
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
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

    const time = 2; // :::::::::::: no of minutes

    const interval = setInterval(() => {
      if (isAuthenticated) {
        setRefreshLoading(true);
        handleRefreshToken();
        cl('successfully refreshed the token');
      }
    }, (time * 60 * 1000))

    // :::::::::::::::::: clear function
    return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, refreshLoading, tokenValues]);

  // :::::::::::::::::: data
  let contextData = {
    isAuthenticated: isAuthenticated,
    refreshUserData: refreshUserData,
    handleLogout: handleLogout,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};