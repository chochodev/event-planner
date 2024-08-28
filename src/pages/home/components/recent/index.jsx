import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrimaryButton from 'components/button/primary';
import EventCard from 'components/event_card';
import SubHeader from 'components/typography/sub_header';
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import { Skeleton } from '@mui/material';
import { MdEventBusy } from 'react-icons/md';

const Recent = ({ loading, events }) => {
  const settings = {
    dots: true,
    infinite: events.length > 4,
    speed: 500,
    slidesToShow: Math.min(events.length, 4),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: Math.min(events.length, 3),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(events.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className='flex flex-col items-start gap-[1rem] w-full'>
      <SubHeader>Recent</SubHeader>

      <div className='w-full overflow-hidden'>
        {loading ? 
          <div className='w-full overflow-hidden'>
            <div 
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-[2rem] lg:gap-[3rem] gap-y-[3rem] w-full '
            >
              {[1, 2].map((_, index) => (
                <div className='flex flex-col gap-[1rem]' key={index}>
                  <Skeleton variant='rectangle' width='100%' height='20rem' sx={{borderRadius: '16px'}}/>
                  <Skeleton variant='rectangle' width='70%' height='3rem' sx={{borderRadius: '8px'}}/>
                  <Skeleton variant='rectangle' width='50%' height='1.25rem' sx={{borderRadius: '8px'}}/>
                  <Skeleton variant='rectangle' width='90%' height='1.25rem' sx={{borderRadius: '8px'}}/>
                </div>
              ))}
            </div>
          </div> :
          <>
          {(!events || events.length === 0) ? 
          <div className='relative flex items-center justify-center w-full'>
            <Skeleton variant='rectangle' width='100%' height='15rem' sx={{borderRadius: '4px'}} />
            <div className='absolute flex items-center gap-[0.25rem] w-max text-[0.875rem] sm:text-[1.25rem] text-gray-400 font-[600] mx-auto'>
              <MdEventBusy className='text-[1.5rem]' />No events to show at the moment!</div>
          </div> :
          <div className='relative flex items-center w-full'>
            <button 
              onClick={prevSlide}
              className='absolute left-0 z-[5] group flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-primary border-[2px] border-secondary-light/40 border-solid hover:border-secondary hover:scale-[1.15] ease-250 '
            >
              <RiArrowLeftLine className='text-[1.25rem] text-secondary ease-250' />
            </button>
            <Slider {...settings} className='flex gap-[1rem] w-full ' ref={sliderRef}>
              {events?.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </Slider>
            <button 
              onClick={nextSlide}
              className='absolute right-0 z-[5] group flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-primary border-[2px] border-secondary-light/40 border-solid hover:border-secondary hover:scale-[1.15] ease-250 '
            >
              <RiArrowRightLine className='text-[1.25rem] text-secondary ease-250' />
            </button>
          </div>
          }
          </>
        }
      </div>
      
      <div className='flex justify-center w-full'>
        <PrimaryButton onClick={() => { window.location.href = '/events'; }}>show more</PrimaryButton>
      </div>
    </div>
  );
};

export default Recent