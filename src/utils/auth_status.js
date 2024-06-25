import axiosInstance from './axios';

export const getSessionStatus = async () => {
  try {
    const response = await axiosInstance.get('/auth/status');
    console.log('status', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error checking session status');
  }
};
