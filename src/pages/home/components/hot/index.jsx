import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrimaryButton from 'components/button/primary';
import EventCard from 'components/event_card';
import SubHeader from 'components/typography/sub_header';
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";

const Hot = () => {
  return (
    <div className='flex flex-col items-start gap-[1rem] w-full'>
      <SubHeader>Hot</SubHeader>

      <div className='w-full overflow-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[1rem] w-full '>
          {[...Array(4).keys()].map((_, index) => (
            <EventCard key={index} />
          ))}
        </div>
      </div>
      
      <div className='flex justify-center w-full'>
        <PrimaryButton onClick={() => { window.location.href = '/events'; }}>Load more</PrimaryButton>
      </div>
    </div>
  );
};

export default Hot;