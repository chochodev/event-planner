import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomeLayout from 'components/layout';
import About from './components/about';
import Discover from './components/discover';
import Recent from './components/recent';
import Newsletter from './components/newsletter';
import Hot from './components/hot';
import axiosInstance from 'utils/axios';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const FetchEvents = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return false;
      }

      try {
        setLoading(true);
        const response = axiosInstance.get('/events/list/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        setEvents(response.data?.events);
        console.log(response.data?.events);
      } catch (error) {
        console.log('error: ', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false)
      }
    }

    FetchEvents();
  }, [])

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
