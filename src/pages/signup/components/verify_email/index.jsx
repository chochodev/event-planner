import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Message from 'components/message';
import HomeLayout from 'components/layout';
import PrimaryLink from 'components/link/primary/variant/outlined';
import Loader from 'components/loader';

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const history = useHistory();

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
        const response = await axios.post('http://localhost:8000/api/verify-email/', {
          uid: uid,
          token: token,
        });
        
        setMessageContent(response.data?.user)
        setIsMessageOpen(true);

        if (response.status === 200) {
          setTimeout(() => {
            history.push('/signin');
          }, 3000);
        } else {
          setFlashSeverity('warning');
          setMessageContent('Activation link is invalid!');
          console.log('Activation link is invalid!');
        }
      } catch (error) {
        setFlashSeverity('error');
        setMessageContent('An error occurred while verifying your email.');
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid && token) {
      verifyEmail();
    } else {
      console.log('Invalid URL parameters.');
    }
  }, [uid, token, history]);

  
  const [seconds, setSeconds] = useState(12);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      history.push('/signin');
    }
  }, [seconds, history]);

  if (loading) return <Loader />

  return (
    <HomeLayout>
      <Message
        severity={flashSeverity}
        title={'Verification Status'}
        message={messageContent}
        open={isMessageOpen}
        onClose={handleCloseMessage}
      />
      <section className="flex items-center justify-center w-full h-full min-h-[30rem] bg-primary py-[3rem] sm:py-[6rem] px-[1rem] ">
        <div className="w-full max-w-full h-full">
          <h1 className="text-center font-secondary text-gray-500 text-[1rem] sm:text-[1.5rem] font-[600] mt-[-4rem]">Access Denied!</h1>
          <div className="flex flex-col items-center text-center gap-[1rem] w-full mx-auto">
            <h3 className="text-wrap text-center text-secondary-hover text-[1.5rem] sm:text-[2rem] font-[600]">Sign in to access this page</h3>
            <p className="text-gray-600 text-[0.875rem] mb-[2rem] ">
              Redirecting to sign-in page in {seconds} seconds
            </p>
            <PrimaryLink to="/signin">Sign In</PrimaryLink> 
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default VerifyEmail;
