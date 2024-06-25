import axiosInstance from './axios';

export const getSessionStatus = async () => {
  try {
    const response = await axiosInstance.get('/auth/status');
    console.log('status', response.data?.authenticated);
    return response.data?.authenticated;
  } catch (error) {
    throw new Error('Error checking session status');
  }
};
