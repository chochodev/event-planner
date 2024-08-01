/* eslint-disable react/style-prop-object */
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  FormControl, 
  TextField
} from '@mui/material';
import Logo from 'components/logo';
import { useLayoutState, useTokenState } from '../../zustand/store';
import axiosInstance from 'utils/axios';
import { cl } from 'context/authStatusContext';


const SignIn = () => {
  // :::::::::::::::::::::::: STATES
  const { setTokenValues, resetTokenState } = useTokenState();
  const { 
    layoutValues, 
    setLayoutValues,
    loginLoading,
  } = useLayoutState();
  
  // ::::::::::::::::::::: functions
  const showFlashMessage = (message, severity='success') => {
    setLayoutValues({
      ...layoutValues,
      flashMessage: message,
      flashSeverity: severity,
      openFlashMessage: true
    })
  }

  const closeFlashMessage = () => {
    setLayoutValues({
      ...layoutValues,
      openFlashMessage: false,
    })
  }

  // ::::::::::::::::::::::::: submit form function
  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLayoutValues({
      ...layoutValues,
      loginLoading: true,
    })
  
    const logInForm = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    cl('hit the submit function!!');
  
    try {
      const response = await axiosInstance.post('/auth/signin/', logInForm);
      showFlashMessage(response.data?.message || 'User logged in successfully', 'success');
      setTokenValues(response.data?.token)
      cl('login response: ', response.data?.token);
      
      // :::::::: closes the flash message and redirect
      setTimeout(() => {
        closeFlashMessage();
        // window.location.href = '/';
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      console.error('Error:', error.response ? error.response.data : error.message);
      showFlashMessage(errorMessage, 'error');

      // ::::::::: removes credentials incase there is any
      resetTokenState();
      
      // closes the flash message
      setTimeout(() => {
        closeFlashMessage();
        window.location.reload();
      }, 3000);
    } finally {  
      // ::::::::::::::::::::: set loading to false
      setLayoutValues({
        ...layoutValues,
        loginLoading: false,
      })
    }
  };

  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full min-h-screen'>
      <div className='flex flex-col gap-[1.875rem] px-[2rem] lg:px-[4rem] py-[2rem]'>
        <h2 className='text-black font-[600] text-[1.5rem] md:text-[1.25rem]'>Welcome</h2>
        <form onSubmit={handleLogin} className='grid grid-cols-1 gap-[1rem] gap-y-0 w-full'>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Email"
              name="email"
              type="email"
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Password"
              name="password"
              type="password"
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
              required
            />
          </FormControl>
          {/* <button type='submit' hidden ></button> */}
          <Button 
            type='submit' 
            variant="contained" 
            color="primary" 
            sx={{height: '3rem', marginTop: '1rem'}} 
            fullWidth
          >
            {loginLoading? <div className="loader"></div> : "Sign In"}
          </Button>
        </form>
        <div className='flex gap-[0.5rem] items-center'>
          <p className='text-[0.875rem]'>Don't have an account?</p>
          <Link to="/signup" className='text-[0.875rem] text-secondary hover:underline ease-250'>Sign Up</Link>
        </div>
        <div className='flex gap-[0.5rem] mt-[-1.5rem] items-center'>
          <p className='text-[0.875rem]'>Unauthenticated?</p>
          <Link to="/verify-email" className='text-[0.875rem] text-secondary hover:underline ease-250'>Verify your email</Link>
        </div>
      </div>

      <div className='flex flex-col justify-center gap-[1rem] h-full bg-secondary px-[2rem] py-[2rem] '>
        <Logo theme='white' className='w-[5.5rem]' />
        <div className='flex flex-col gap-[1rem] '>
          <h2 className='text-[2rem] xmd:text-[3rem] font-[600] text-white leading-[1.05] '>Plan Unforgettable Events with Ease</h2>
          <p className='text-[0.875rem] text-white '>Join us today and start creating memorable moments, hassle-free! By signing up, you'll gain access to a world of exciting features tailored just for you.</p>
          <p className='text-white/80 text-[0.75rem] '>Join Hive today and take the first step towards a more organized and exciting life!</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignIn;
