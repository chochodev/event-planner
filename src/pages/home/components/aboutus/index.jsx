import React from 'react';
import PrimaryButton from 'components/button/primary';
import PrimaryLink from 'components/link/primary';
import { BsDot } from "react-icons/bs";


const About = () => {
  return (
    <div className='flex flex-col items-start gap-[1rem] w-full'>
      <div className='flex flex-col xlg:flex-row justify-between gap-[1rem] w-full h-max '>
        <div className='relative flex flex-col gap-[1rem] bg-[url("/assets/images/dance-floor.webp")] bg-cover bg-center bg-no-repeat w-full rounded-[12px] '>
          <h2 className='text-[2.5rem] text-primary font-[600] '>About Us</h2>
          <p>A professional event hosting platform for all events</p>
          <p>Welcome to Hive, where we aim to transform your visions into unforgettable events. We specialize in automating bespoke event planning, ensuring that reflect your unique style and personality.</p>
        </div>

        {/* ::::::::::::::::::: image */}
        {/* <img 
          src='/assets/images/lady-with-glass.webp'
          alt='Lady Dancing with a Glass wine'
          className='w-full xlg:w-[45%] max-h-[60rem] h-[80vh] min-h-full rounded-[16px] object-cover'
        /> */}
      </div>
    </div>
  )
}

export default About