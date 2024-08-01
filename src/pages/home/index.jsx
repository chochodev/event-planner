import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomeLayout from 'components/layout';
import Hero from './components/about';
import Discover from './components/discover';
import Recent from './components/recent';
import Newsletter from './components/newsletter';
import Hot from './components/hot';
import axiosInstance from 'utils/axios';
import About from './components/aboutus';
import OurTeam from './components/team';


const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const FetchEvents = async () => {
      // const token = localStorage.getItem('authToken');
      // console.log('is token: ', token);

      // if (!token) {
      //   setLoading(false);
      //   return false;
      // }

      try {
        setLoading(true);
        const response = await axiosInstance.get('/events/list/');
        setEvents(response.data);
        console.log('event data: ', response.data);
      } catch (error) {
        console.log('error: ', error);
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
          <Hero />
          
          {/* ::::::::::::::::: RECENT SECTION */}
          <Hot events={events} loading={loading} />

          {/* ::::::::::::::::: ABOUT SECTION */}
          <About />

          {/* ::::::::::::::::: OUR TEAM SECTION */}
          <OurTeam />

          {/* ::::::::::::::::: DISCOVER SECTION */}
          <Discover events={events} loading={loading} />
          
          {/* ::::::::::::::::: RECENT SECTION */}
          <Recent events={events} loading={loading} />

          {/* ::::::::::::::::: NEWSLETTER */}
          <Newsletter />

        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
