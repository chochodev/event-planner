import React, { useEffect, useState, createContext, ReactNode } from 'react';
import axiosInstance from 'utils/axios';
import { useTokenState, useLayoutState } from '../zustand/store';
import axios, { AxiosError } from 'axios';

// ::::::::::::::::::::::::: cl as console.log
const is_dev_server = import.meta.env.VITE_APP_DEVELOPMENT_SERVER === 'true';
export const cl = is_dev_server ? console.log.bind(console) : () => {};
cl('is dev: ', is_dev_server);

// ::::::::::::::::::::::::: auth context provider
interface AuthContextType {
  isAuthenticated: boolean;
  refreshUserData: () => void;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // ::::::::::::::::::::::: AUTH TOKEN STATES
  const { 
    tokenValues, 
    setTokenValues, 
    resetTokenState 
  } = useTokenState();

  const authToken = tokenValues.authToken;
  const isAuthenticated = 
    authToken.refresh?.length > 0 && authToken.access?.length > 0;

  // :::::::::::::::::::::::: LAYOUT STATES
  const { 
    layoutValues, 
    setLayoutValues,
    resetLayoutState
  } = useLayoutState();

  const showFlashMessage = (message: string, severity: 'success' | 'danger' = 'success') => {
    setLayoutValues({
      ...layoutValues,
      flashMessage: message,
      flashSeverity: severity,
      openFlashMessage: true
    });
  }

  const closeFlashMessage = () => {
    resetLayoutState();
  }

  // ::::::::::::::::::: get session status function
  const refreshUserData = async () => {
    try {
      const response = await axiosInstance.get('/auth/status/');
      setTokenValues({
        ...tokenValues,
        ...response.data.user,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This type assertion tells TypeScript that error is AxiosError
        const axiosError = error as AxiosError;
        console.error('Error:', axiosError.response?.data || axiosError.message);
      } else {
        // This is an unknown error
        console.error('An unexpected error occurred:', error);
      }
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
        setTokenValues({ 
          ...tokenValues, 
          authToken: {
            access: response.data.access, 
            refresh: response.data.refresh
          }
        });
      } catch (error) {
        console.error('Refresh-token failed:', error);
      } finally {
        setRefreshLoading(false);
      }
    }

    const interval = setInterval(() => {
      if (isAuthenticated) {
        setRefreshLoading(true);
        handleRefreshToken();
      }
    }, (2 * 60 * 1000));

    // :::::::::::::::::: clear function
    return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, refreshLoading, tokenValues]);

  // :::::::::::::::::: data
  const contextData: AuthContextType = {
    isAuthenticated,
    refreshUserData,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}