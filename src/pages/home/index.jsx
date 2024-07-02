import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrimaryButton from 'components/button/primary';
import EventCard from 'components/event_card';
import HomeLayout from 'components/layout';
import SubHeader from 'components/typography/sub_header';

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <HomeLayout>
      <div className='w-full py-[3rem] px-[1rem] sm:px-[2rem]'>
        <div className='flex flex-col items-center justify-center text-center max-w-[75rem] mx-auto w-full'>
          <div className='flex flex-col gap-[1rem] items-center text-center w-full mx-auto'>
            <p className='text-[0.75rem] font-[600] text-black/50'>CREATE, EXPLORE, & BOOK EVENTS.</p>
            <h1 className='text-[2rem] text-black font-[600]'>Transform Your Ideas into Unforgettable Events</h1>
            <PrimaryButton onClick={() => { window.location.href = '/search'; }}>Start your Search</PrimaryButton>
          </div>

          <div className='flex flex-col items-start gap-[1rem] w-full'>
            <SubHeader>Discover</SubHeader>

            <div className='w-full'>
              <Slider {...settings}>
                {[...Array(8).keys()].map((_, index) => (
                  <div key={index}>
                    <EventCard />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
