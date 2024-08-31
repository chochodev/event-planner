import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Message from 'components/message';
import HomeLayout from 'components/layout';
import PrimaryLink from 'components/link/primary/variant/outlined';
import Loader from 'components/loader';
import axiosInstance from 'utils/axios';

const VerifyEmail = () => {
  const { token } = useParams();

  const [flashSeverity, setFlashSeverity] = useState('success');
  const [loading, setLoading] = useState(true);

  // :::::::::::::::::::::::: message
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('Your operation was successful.');
  
  const handleCloseMessage = () => {
    setIsMessageOpen(false);
  };

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get(`/auth/activate/${token}}/`);
        
        if ([200,201].includes(response.status)) {
          setFlashSeverity('success');
          setMessageContent(response.data)
        } else {
          setFlashSeverity('error');
          setMessageContent(response.data);
        }
        
        console.log('Response data: ', response.data);
      } catch (error) {
        setFlashSeverity('error');
        setMessageContent(error.response.data);
        console.log('Error:', error);
      } finally {
        setLoading(false);
        setIsMessageOpen(true);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      console.log('Invalid URL parameters.');
    }
  }, [token]);

  
  // :::::::::::::::: for the count down
  const [seconds, setSeconds] = useState(12);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // window.location.href = '/signin';
    }
  }, [seconds]);

  if (loading) return <Loader />

  return (
    <HomeLayout>
      <Message
        severity={flashSeverity}
        title={messageContent.title}
        message={messageContent.message}
        open={isMessageOpen}
        onClose={handleCloseMessage}
      />
      <section className="flex items-center justify-center w-full h-full min-h-[30rem] bg-primary py-[3rem] sm:py-[6rem] px-[1rem] ">
        <div className="w-full max-w-full h-full">
          <h1 className="text-center font-secondary text-gray-500 text-[1rem] sm:text-[1.5rem] font-[600] mt-[-4rem]">Email Verification!</h1>
          <h3 className="text-wrap text-center text-secondary-hover text-[1.5rem] sm:text-[2rem] font-[600]">Sign in after successful verification.</h3>
          <div className="flex flex-col items-center text-center gap-[1rem] w-full max-w-[20rem] mx-auto">
            <p className="text-gray-600 text-[0.875rem] mb-[2rem] ">
              Redirecting to sign-in page in {seconds} seconds.
            </p>
            <PrimaryLink to="/signin">Sign In</PrimaryLink> 
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default VerifyEmail;
