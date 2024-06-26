import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuthCheck from 'hooks/useAuthCheck';

const SignIn = lazy(() => import('pages/signin'));
const SignUp = lazy(() => import('pages/signup'));
const HomePage = lazy(() => import('pages/home'));


const MyRoute = () => {
  useAuthCheck();

  return (
    <Suspense fallback={
      <div className='fixed z-[100] inset-0 w-screen h-screen flex justify-center bg-secondary items-center'>
        <div id="spinner-loader">
            <div id="spinnerin-loader"></div>
        </div>
      </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path='/events/create' element={<>Create</>} />
      </Routes>
    </Suspense>
  );
}

export default MyRoute;
