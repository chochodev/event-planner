// utils/csrftoken.js
import axios from 'axios';
import { useTokenState } from '../zustand/store';


// :::::::::::::::: axiosInstance config
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

// :::::::::::::::: axiosInstance default header
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = useTokenState.getState().tokenValues.authToken;
    // console.log('auth token value:', authToken);
    // console.log('header token: ', token);
    if (authToken.refresh?.length > 0 && authToken.access?.length > 0) {
      config.headers.Authorization = `Bearer ${authToken.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// :::::::::::::::::: get session status function
// export const getSessionStatus = async () => {
//   const token = localStorage.getItem('authToken');

//   if (!token) {
//     return false;
//   }

//   try {
//     const response = await axiosInstance.get('/auth/status/');
//     console.log('status', response.data?.authenticated);
//     return response.data?.authenticated;
//   } catch (error) {
//     console.error('Error checking session status:', error);
//     return false;
//   }
// };