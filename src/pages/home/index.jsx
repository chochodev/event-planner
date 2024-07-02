import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrimaryButton from 'components/button/primary';
import HomeLayout from 'components/layout';
import Discover from './components/discover';
import Hot from './components/hot';

const HomePage = () => {

  return (
    <HomeLayout>
      <div className='w-full py-[3rem] px-[1rem] sm:px-[2rem]'>
        <div className='flex flex-col gap-[5rem] items-center justify-center text-center max-w-[75rem] mx-auto w-full'>
          {/* :::::::::::::::::: HEAD SECTION */}
          <div className='flex flex-col gap-[1rem] items-center text-center w-full mx-auto'>
            <p className='text-[0.75rem] font-[600] text-black/50'>CREATE, EXPLORE, & BOOK EVENTS.</p>
            <h1 className='text-[2rem] text-black font-[600]'>Transform Your Ideas into Unforgettable Events</h1>
            <PrimaryButton onClick={() => { window.location.href = '/search'; }}>Start your Search</PrimaryButton>
          </div>

          {/* ::::::::::::::::: DISCOVER SECTION */}
          <Discover />
          
          {/* ::::::::::::::::: HOT SECTION */}
          <Hot />

        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
