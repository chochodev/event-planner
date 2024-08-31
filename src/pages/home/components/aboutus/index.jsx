import React from 'react';
import PrimaryButton from 'components/button/primary';
import PrimaryLink from 'components/link/primary';
import SubHeader from 'components/typography/sub_header';

const About = () => {
  return (
    <div className='flex flex-col items-start gap-[2rem] w-full py-[2rem] '>
      <SubHeader>About Us</SubHeader>
      
      <div className='flex flex-col-reverse xlg:flex-row justify-between gap-[3rem] xlg:gap-[1rem] w-full h-max mt-[1rem] '>
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