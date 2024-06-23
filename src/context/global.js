// utils/axiosInstance.js
import axios from 'axios';
import { getCsrfToken } from './csrftoken'; // Assuming you have a utility to get the CSRF token

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const csrfToken = await getCsrfToken();
    config.headers['X-CSRF-Token'] = csrfToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
