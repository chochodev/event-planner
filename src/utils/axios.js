import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL || 'http://127.0.0.1:8000',
});

let csrfToken = null;
let isFetchingToken = false;

const fetchCsrfToken = async () => {
  try {
    if (!csrfToken && !isFetchingToken) {
      isFetchingToken = true;
      const response = await axiosInstance.get('/request-token'); 
      csrfToken = response.data.csrfToken;
      Cookies.set('csrftoken', csrfToken); // Store the token in cookies if needed
      isFetchingToken = false;
    }
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    isFetchingToken = false;
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
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
