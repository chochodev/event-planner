import React from 'react';
import PrimaryButton from 'components/button/primary';
import PrimaryLink from 'components/link/primary';
import { BsDot } from "react-icons/bs";

// At Event Planner, we specialize in creating memorable events tailored to your unique needs. Our experienced team handles every detail, ensuring a seamless and stress-free experience for you. Whether you're planning a wedding, corporate event, or a social gathering, we bring your vision to life.
const About = () => {
  return (
    <div className='flex flex-col items-start gap-[1rem] w-full'>
      {/* <SubHeader>About Us</SubHeader> */}
      <div className='flex justify-between gap-[1rem] w-full h-max '>
        <div className='flex flex-col gap-[2rem] items-start text-start w-[48%] py-[4rem] '>
          <p 
            className='flex items-center font-dance text-[2rem] font-[600] text-secondary'
          >
            <BsDot className='text-tertiary text-[2rem] ' />Time to celebrate
          </p>
          <div className='flex flex-col gap-[1.5rem] w-full '>
            <p className='text-[0.875rem] font-[600] text-black/50'>CREATE, EXPLORE, & BOOK EVENTS.</p>
            <h1 className='text-[3rem] text-black font-[700] leading-[1.15] '>Transform Your Ideas into Unforgettable Events</h1>
            <p className='text-[0.75rem] font-[600] text-secondary-dark'>At Event Planner, we specialize in creating memorable events tailored to your unique needs. Our experienced team handles every detail, ensuring a seamless and stress-free experience for you. Whether you're planning a wedding, corporate event, or a social gathering, we bring your vision to life.</p>

            <div className='flex gap-[1rem] w-max'>
              <div className='w-max'>
                <PrimaryButton onClick={()=>{ window.location.href = '/search'}} w='w-max'>Start your Search</PrimaryButton>
              </div>
              <PrimaryLink onClick={()=>{window.location.href='/search'}}>Discover</PrimaryLink>
            </div>
          </div>
        </div>

        {/* ::::::::::::::::::: image */}
        <img 
          src='/assets/images/lady-with-glass.webp'
          alt='Lady Dancing with a Glass wine'
          className='w-[45%] max-h-[60rem] h-[80vh] min-h-full rounded-[16px] object-cover'
        />
      </div>
    </div>
  )
}

export default About