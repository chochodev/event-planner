import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrimaryButton from 'components/button/primary';
import EventCard from 'components/event_card';
import SubHeader from 'components/typography/sub_header';
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";

const Recent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
        <div className='relative flex items-center w-full'>
          <button 
            onClick={prevSlide}
            className='absolute left-0 z-[5] group flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-primary border-[2px] border-secondary-light/40 border-solid hover:border-secondary hover:scale-[1.15] ease-250 '
          >
            <RiArrowLeftLine className='text-[1.25rem] text-secondary ease-250' />
          </button>

          <div className='w-full '>
            <Slider {...settings} className='flex gap-[1rem] ' ref={sliderRef}>
              {[...Array(8).keys()].map((_, index) => (
                <EventCard key={index} />
              ))}
            </Slider>
          </div>

          <button 
            onClick={nextSlide}
            className='absolute right-0 z-[5] group flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-primary border-[2px] border-secondary-light/40 border-solid hover:border-secondary hover:scale-[1.15] ease-250 '
          >
            <RiArrowRightLine className='text-[1.25rem] text-secondary ease-250' />
          </button>
        </div>
      </div>
      
      <div className='flex justify-center w-full'>
        <PrimaryButton onClick={() => { window.location.href = '/events'; }}>Load more</PrimaryButton>
      </div>
    </div>
  );
};

export default Recent