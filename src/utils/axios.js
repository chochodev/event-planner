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

export default axiosInstance;
