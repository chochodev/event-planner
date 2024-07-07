import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeLayout from 'components/layout';
import PrimaryLink from 'components/link/primary/variant/outlined';

const AccessDenied = () => {
  const [seconds, setSeconds] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // navigate('/signin');
    }
  }, [seconds, navigate]);

  return (
    <HomeLayout>
      <section className="flex items-center justify-center w-full h-full min-h-[30rem] bg-primary py-[6rem]">
        <div className="w-full h-full">
          <h1 className="text-center font-secondary text-gray-500 text-[1.5rem] font-[600] mt-[-4rem]">Access Denied!</h1>
          <div className="flex flex-col items-center text-center gap-[1rem] w-max mx-auto">
            <h3 className="text-secondary-hover text-[2rem] font-[600]">Sign in to access this page</h3>
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

export default AccessDenied;
