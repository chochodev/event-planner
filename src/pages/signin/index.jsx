import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  FormControl, 
  TextField
} from '@mui/material';
import Logo from 'components/logo';
import { useLayoutState, useTokenState } from '../../zustand/store';
import axiosInstance from 'utils/axios';
// import FlashMessage from 'components/alert';
import Alert from '@/components/ui/alert';
import { cl } from 'context/authStatusContext';


const SignIn = () => {
  // :::::::::::::::::::::::: STATES
  const { setTokenValues, resetTokenState } = useTokenState();
  const { 
    layoutValues, 
    setLayoutValues
  } = useLayoutState();
  const { loginLoading } = layoutValues;
  
  useEffect(() => {
    cl('updated layout values: ', layoutValues);
    
  }, [layoutValues, setLayoutValues])
  
  cl('loading: ', loginLoading);
  
  // ::::::::::::::::::::: functions
  const showFlashMessage = (title, message, severity='success') => {
    cl('updated layout values: ', layoutValues);
    
    setLayoutValues({
      ...layoutValues,
      flashTitle: title,
      flashMessage: message,
      flashSeverity: severity,
      openFlashMessage: true,
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
    e.target.email.value = null;
    e.target.password.value = null;
  
    try {
      const response = await axiosInstance.post('/auth/signin/', logInForm);
      
      // ::::::::::::::::: show flash message
      // showFlashMessage(
      //   'Login Success',
      //   response.data?.message || 'User logged in successfully', 
      //   'success'
      // );
      setLayoutValues((prevValues) => ({
        ...prevValues,
        flashTitle: 'Login Success',
        flashMessage: response.data?.message || 'User logged in successfully',
        flashSeverity: 'success',
        openFlashMessage: true,
      }));

      // ::::::::::::::::: set login tokens
      setTokenValues(response.data?.token)
      cl('login response: ', response.data?.token);
      
      // :::::::: closes the flash message and redirect
      setTimeout(() => {
        // window.location.href = '/';
      }, 20000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      
      // ::::::::::::::::: show flash message
      showFlashMessage(
        'Login Error', 
        errorMessage, 
        'danger'
      );
      console.error('Error:', error.response ? error.response.data : error.message);

      // ::::::::: removes credentials incase there is any
      resetTokenState();
      
      // closes the flash message
      setTimeout(() => {
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
    <Alert />
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
          <p className='text-[0.875rem]'>Don&apos;t have an account?</p>
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
          <p className='text-[0.875rem] text-white '>Join us today and start creating memorable moments, hassle-free! By signing up, you&apos;ll gain access to a world of exciting features tailored just for you.</p>
          <p className='text-white/80 text-[0.75rem] '>Join Hive today and take the first step towards a more organized and exciting life!</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignIn;
