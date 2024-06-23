import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

let csrfToken = null;

axiosInstance.interceptors.request.use(
  (config) => {
    if (!csrfToken) {
      csrfToken = Cookies.get('csrftoken');
    }
    config.headers['X-CSRF-Token'] = csrfToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
