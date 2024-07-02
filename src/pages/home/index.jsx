import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomeLayout from 'components/layout';
import About from './components/about';
import Discover from './components/discover';
import Hot from './components/hot';
import Newsletter from './components/newsletter';

const HomePage = () => {

  return (
    <HomeLayout>
      <div className='w-full py-[3rem] px-[1rem] sm:px-[2rem]'>
        <div className='flex flex-col gap-[5rem] items-center justify-center text-center max-w-[75rem] mx-auto w-full'>

          {/* :::::::::::::::::: HEAD SECTION */}
          <About />

          {/* ::::::::::::::::: DISCOVER SECTION */}
          <Discover />
          
          {/* ::::::::::::::::: HOT SECTION */}
          <Hot />

          {/* ::::::::::::::::: NEWSLETTER */}
          <Newsletter />

        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
