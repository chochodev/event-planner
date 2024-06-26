import axiosInstance from './axios';

export const getSessionStatus = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const response = await axiosInstance.get('/auth/status/', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    console.log('status', response.data?.authenticated);
    return response.data?.authenticated;
  } catch (error) {
    console.error('Error checking session status:', error);
    return false;
  }
};