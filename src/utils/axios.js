// utils/csrftoken.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout/', {action: 'logout'});
    console.log('Logout success:', response.data);
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error('Logout failed');
  }
};

export default axiosInstance;
