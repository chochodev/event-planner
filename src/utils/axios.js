// utils/csrftoken.js
import axios from 'axios';

// :::::::::::::::: axiosInstance config
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

// :::::::::::::::: axiosInstance default header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// :::::::::::::::: logout function
export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axiosInstance.post('/auth/logout/', { refresh: refreshToken });
    console.log('Logout success:', response.data);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error('Logout failed');
  }
};

// :::::::::::::::::: get session status function
export const getSessionStatus = async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return false;
  }

  try {
    const response = await axiosInstance.get('/auth/status/');
    console.log('status', response.data?.authenticated);
    return response.data?.authenticated;
  } catch (error) {
    console.error('Error checking session status:', error);
    return false;
  }
};