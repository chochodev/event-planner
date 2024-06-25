// utils/csrftoken.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL || 'http://127.0.0.1:8000/api',
});

let csrfToken = Cookies.get('csrfToken');
let isFetchingToken = false;

const fetchCsrfToken = async () => {
  if (!csrfToken && !isFetchingToken) {
    try {
      isFetchingToken = true;
      const response = await axiosInstance.get('/auth/request-token/');
      csrfToken = response.data.csrfToken;
      Cookies.set('csrfToken', csrfToken, { expires: 1 });
      console.log('CSRF Token:', csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    } finally {
      isFetchingToken = false;
    }
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!csrfToken) {
      await fetchCsrfToken();
    }
    config.headers['X-CSRFToken'] = csrfToken;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
