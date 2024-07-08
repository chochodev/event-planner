/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  FormControl, 
  TextField
} from '@mui/material';
import Logo from 'components/logo';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';

const SignIn = () => {
  const [openFlashMessage, setOpenFlashMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashSeverity, setFlashSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axiosInstance.post('/auth/signin/', form);
      setFlashMessage(response.data?.message || 'User logged in successfully');
      setFlashSeverity('success');
      setOpenFlashMessage(true);
  
      // :::::::: store tokens to local storage
      localStorage.setItem('accessToken', response.data?.access);
      localStorage.setItem('refreshToken', response.data?.refresh);
      localStorage.setItem('user', JSON.stringify(response.data?.user));
      console.log('response', response.data?.user)
  
      // :::::::: closes the flash message and redirect
      setTimeout(() => {
        setOpenFlashMessage(false);
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      setFlashMessage(errorMessage);
      setFlashSeverity('error');
      setOpenFlashMessage(true);
      
      // closes the flash message
      setTimeout(() => {
        setOpenFlashMessage(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await axiosInstance.post('/auth/signin/', form);
  //     setFlashMessage(response.data?.message || 'User logged in successfully');
  //     setFlashSeverity('success');
  //     setOpenFlashMessage(true);

  //     // :::::::: store token to local storage
  //     localStorage.setItem('token', response.data?.token);

  //     // :::::::: closes the flash message and redirect
  //     setTimeout(() => {
  //       setOpenFlashMessage(false);
  //       window.location.href = '/';
  //     }, 3000);
  //   } catch (error) {
  //     console.error('Error:', error.response ? error.response.data : error.message);
  //     const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
  //     setFlashMessage(errorMessage);
  //     setFlashSeverity('error');
  //     setOpenFlashMessage(true);
      
  //     // closes the flash message
  //     setTimeout(() => {
  //       setOpenFlashMessage(false);
  //     }, 3000);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
    <FlashMessage
      openFlashMessage={openFlashMessage}
      setOpenFlashMessage={setOpenFlashMessage}
      flashMessage={flashMessage}
      flashSeverity={flashSeverity}
    />
    <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full min-h-screen'>
      <div className='flex flex-col gap-[1.875rem] px-[2rem] lg:px-[4rem] py-[2rem]'>
        <h2 className='text-black font-[600] text-[1.5rem] md:text-[1.25rem]'>Welcome</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-[1rem] gap-y-0 w-full'>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
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
          <button type='submit' hidden ></button>
        </form>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{height: '3rem'}} fullWidth>
          {loading? <div className="loader"></div> : "Sign In"}
        </Button>
        <div className='flex gap-[0.5rem] items-center'>
          <p className='text-[0.875rem]'>Don't have an account?</p>
          <Link to="/signup" className='text-[0.875rem] text-secondary hover:underline ease-250'>Sign Up</Link>
        </div>
      </div>

      <div className='flex flex-col justify-center gap-[1rem] h-full bg-secondary px-[2rem] py-[2rem] '>
        <Logo theme='white' style='w-[5.5rem]' />
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
