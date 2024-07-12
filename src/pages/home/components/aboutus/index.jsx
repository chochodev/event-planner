import React from 'react';
import PrimaryButton from 'components/button/primary';
import PrimaryLink from 'components/link/primary';

const About = () => {
  return (
    <div className='flex flex-col items-start gap-[3rem] w-full py-[2rem] '>
      <div className='flex flex-col xlg:flex-row justify-between gap-[1rem] w-full h-max '>
        <div className='relative z-[2] flex flex-col gap-[1rem] w-full py-[2rem] px-[1rem] rounded-[12px] '>
          <h2 className='relative z-[1] text-[2.5rem] text-black-dim font-[600] '>About Us</h2>
          <p className='relative z-[1] text-[1rem] text-gray-500 '>A professional event hosting platform for all events</p>
          {/* ::::::::::::::::::: overlay */}
          <img 
            src='/assets/images/glitters.jpg'
            alt='Dance floor'
            className='absolute top-0 left-0 opacity-[0.1] w-full h-full rounded-[16px] object-cover'
          />
        </div>
      </div>

      <div className='flex flex-col xlg:flex-row justify-between gap-[1rem] w-full h-max '>
        {/* ::::::::::::::::::: image */}
        <img 
          src='/assets/images/dance-beat-floor.jpg'
          alt='Lady Dancing with a Glass wine'
          className='w-full xlg:w-[45%] h-[30rem] rounded-[16px] object-cover'
        />

        <div className='flex flex-col gap-[2rem] items-start text-start xmd:max-xlg:text-center w-full xlg:w-[48%] py-[1rem] md:py-[4rem] '>
          <div className='flex flex-col gap-[1.5rem] w-full '>
            <p className='text-[0.875rem] font-[600] text-black/50'>CREATE, EXPLORE, & BOOK EVENTS.</p>
            <h1 className='text-[2.5rem] sm:text-[3rem] text-black font-[700] leading-[1.15] '>Transform Your Ideas into Unforgettable Events</h1>
            <p className='text-[0.875rem] text-secondary-dark'>Welcome to Hive, where we aim to transform your visions into unforgettable events. We specialize in automating bespoke event planning, ensuring that reflect your unique style and personality.</p>

            <div className='flex max-sm:justify-between gap-[1rem] xmd:max-xlg:mx-auto w-max'>
              <div className='w-max'>
                <PrimaryButton onClick={()=>{ window.location.href = '/search'}} w='w-max'>About Us</PrimaryButton>
              </div>
              <PrimaryLink onClick={()=>{window.location.href='/search'}}>Our Team</PrimaryLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About