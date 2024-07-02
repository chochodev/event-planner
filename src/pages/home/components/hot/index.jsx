import React from 'react';
import PrimaryButton from 'components/button/primary';
import EventCard from 'components/event_card/variant/large';
import SubHeader from 'components/typography/sub_header';

const Hot = () => {
  return (
    <div className='flex flex-col items-start gap-[1rem] w-full'>
      <SubHeader>Hot-Events</SubHeader>
      <p className='text-[1.15rem] text-gray-500 font-[600]'> Don't Miss Out on These Must-See Experiences!</p>
      <div className='w-full overflow-hidden'>
        <div className='grid grid-cols-1 xlg:grid-cols-2 gap-[2rem] lg:gap-[3rem] gap-y-[3rem] w-full '>
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