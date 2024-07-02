import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomeLayout from 'components/layout';
import About from './components/about';
import Discover from './components/discover';
import Recent from './components/recent';
import Newsletter from './components/newsletter';
import Hot from './components/hot';

const HomePage = () => {

  return (
    <HomeLayout>
      <div className='w-full py-[3rem] px-[1rem] sm:px-[2rem]'>
        <div className='flex flex-col gap-[5rem] items-center justify-center text-center max-w-[75rem] mx-auto w-full'>

          {/* :::::::::::::::::: HEAD SECTION */}
          <About />
          
          {/* ::::::::::::::::: RECENT SECTION */}
          <Hot />

          {/* ::::::::::::::::: DISCOVER SECTION */}
          <Discover />
          
          {/* ::::::::::::::::: RECENT SECTION */}
          <Recent />

          {/* ::::::::::::::::: NEWSLETTER */}
          <Newsletter />

        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
