import React from 'react';
import PrimaryButton from 'components/button/primary';
import EventCard from 'components/event_card/variant/large';
import SubHeader from 'components/typography/sub_header';
import { Skeleton } from '@mui/material';

const Hot = ({ loading, events }) => {
  return (
    <div className='flex flex-col items-start gap-[2rem] w-full'>
      <SubHeader>Hot-Events</SubHeader>
      <p className='text-[1.15rem] text-gray-500 font-[600]'> Don't Miss Out on These Must-See Experiences!</p>
      {loading? <div className='w-full overflow-hidden'>
        <div className='grid grid-cols-1 xlg:grid-cols-2 gap-[2rem] lg:gap-[3rem] gap-y-[3rem] w-full '>
          {[1,2].map((_, index) => (
            <div>
              <Skeleton variant='rectangle' width='100%' height='15rem' sx={{borderRadius: '4px'}}/>
            </div>
          ))}
        </div>
      </div> :
      <>
      <div className='w-full overflow-hidden'>
        <div className='grid grid-cols-1 xlg:grid-cols-2 gap-[2rem] lg:gap-[3rem] gap-y-[3rem] w-full '>
          {events?.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>

      {(!events || events?.length===0) && 
      <div className='relative flex items-center justify-center w-full'>
        <Skeleton variant='rectangle' width='100%' height='15rem' sx={{borderRadius: '4px'}} >
        </Skeleton>
        <div className='absolute w-max text-[1.25rem] text-gray-400 font-[600] mx-auto'>No events to show at the moment!</div>
      </div>
      }
      </>}
      
      <div className='flex justify-center w-full'>
        <PrimaryButton onClick={() => { window.location.href = '/events'; }}>Load more</PrimaryButton>
      </div>
    </div>
  );
};

export default Hot;