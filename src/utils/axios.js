// utils/csrftoken.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // config.headers['X-CSRFToken'] = csrfToken;
    return config;
  },
  (error) => Promise.reject(error)
);

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout/');
    console.log('Logout success:', response.data);
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw new Error('Logout failed');
  }
};

export default axiosInstance;
