import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios';

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async () => {
  const response = await axiosInstance.get('/auth/status');
  console.log('status', response.data?.authenticated);
  return response.data?.authenticated;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    status: 'idle',
  },
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;