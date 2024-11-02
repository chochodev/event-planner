import { useEffect, useState, createContext, ReactNode } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '@/utils/axios';
import { useTokenState } from '@/zustand/store';
import useFlashMessage from '@/utils/flashMessage';
import axios from 'axios';

// ::::::::::::::::::::::::: cl as console.log
const is_dev_server = import.meta.env.VITE_APP_DEVELOPMENT_SERVER === 'true';
export const cl = is_dev_server ? console.log.bind(console) : () => {};
cl('is dev: ', is_dev_server);

// ::::::::::::::::::::::::: Define AuthContextType
interface AuthContextType {
  isAuthenticated: boolean;
  refreshUserData: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

// ::::::::::::::::::::::::: auth context provider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps ) => {
  // ::::::::::::::::::::::: AUTH TOKEN STATES
  const { tokenValues, setTokenValues, resetTokenState } = useTokenState();
  const authToken = tokenValues.authToken;

  const isAuthenticated = authToken.refresh?.length > 0 && authToken.access?.length > 0;

  // :::::::::::::::::::::::: LAYOUT STATES
  const flashMessage = useFlashMessage();

  // ::::::::::::::::::: get session status function
  const refreshUserData = async () => {  
    try {
      const response = await axiosInstance.get('/auth/status/');
      setTokenValues({
        ...tokenValues,
        ...response.data.user,
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response ? error.response.data : error.message);
      } else if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error occurred');
      }
    }
  };

  // ::::::::::::::::::::::::::::: Logout function
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout/', JSON.stringify({
        refresh_token: authToken.refresh 
      }));
      flashMessage('Logout Success', 'User logged out successfully', 'success');
    } catch (error) {
      flashMessage('Logout Error', 'User is not logged in', 'danger');
      console.error('Logout Error:', error);
    } finally {
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
          refresh: authToken.refresh
        });
        cl('refresh response:', response.data);
        // setAuthToken(newAuthToken);
        setTokenValues({ 
          ...tokenValues, 
          authToken: {
            access: response.data.access, 
            refresh: response.data.refresh
          }
        });
      } catch (error) {
        let errorMessage = 'An unexpected error occurred. Please try again later.';

        if (axios.isAxiosError(error)) {
          // Handle Axios-specific errors
          if (error.response) {
            // Server responded with a status other than 2xx
            if (error.response.status === 401) {
              errorMessage = 'Session expired. Please log in again.';
            } else if (error.response.status === 400) {
              errorMessage = 'Invalid refresh token. Please log in again.';
            } else {
              errorMessage = `Error ${error.response.status}: ${error.response.data.message || 'Unable to refresh token.'}`;
            }
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'Network error. Please check your connection and try again.';
          }
        } else if (error instanceof Error) {
          // Handle generic JavaScript errors
          errorMessage = error.message;
        }

        console.error('Refresh-token failed:', error);
        flashMessage('User Error', errorMessage, 'danger');

        setTimeout(() => {
          handleLogout();
        }, 2000);
      } finally {
        setRefreshLoading(false);
      }
    };

    const time = 8; // :::::::::::: no of minutes
    const interval = setInterval(() => {
      if (isAuthenticated) {
        setRefreshLoading(true);
        handleRefreshToken();
        cl('successfully refreshed the token');
      }
    }, time * 60 * 1000);

    return () => clearInterval(interval);

  }, [authToken, refreshLoading, tokenValues]);

  // :::::::::::::::::: context data
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
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
