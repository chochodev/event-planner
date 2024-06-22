import AccentLink from 'components/link/accent';
import PrimaryLink from 'components/link/primary';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiAddLine } from 'react-icons/ri';


const Header = () => {
  const [smallNav, setSmallNav] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
      <header 
        className={`sticky top-0 left-0 z-[10] w-full bg-primary border-solid border-black/20 border-x-0 border-t-0 border-b-[1px] `}
      >
        <div className=' flex flex-col items-center justify-center w-full bg-secondary px-[1rem] sm:px-[2rem] '>
          <div className='flex justify-between items-center h-[3rem] max-w-[75rem] w-full mx-auto'>
            <p className='text-[0.875rem] text-primary '>Sign in to Create Memorable Moments, Hassle-Free!!</p>
            <AccentLink to='/signin'>Sign in</AccentLink>
          </div>
        </div>

        <div className='flex justify-between items-center w-full h-max px-[1rem] sm:px-[2rem] '>
          <div className='flex justify-between items-center max-w-[75rem] w-full mx-auto h-max py-[1rem] '>
            <div className='flex items-center gap-[3rem]'>
              <Link to='/' className='flex items-center gap-[0.5]'>
                {/* :::::::::::::::::::::: LOGO */}
                <img 
                  src={'/assets/svgs/logo.svg'} 
                  alt='Logo' 
                  className='w-[3rem] md:w-[3.5rem] object-contain' 
                />
              </Link>

              <div className='h-[3rem] w-[1px] bg-black/20 ' />
              
              <div className='flex items-center gap-[2rem] h-full '>
                <Link 
                  to='/events'
                  className='text-black/50 text-[0.75rem] font-[600] hover:text-secondary-hover ease-250'
                >Discover</Link>
                <Link 
                  to='/dashboard'
                  className='text-black/50 text-[0.75rem] font-[600] hover:text-secondary-hover ease-250'
                >Dashboard</Link>
              </div>
            </div>
            
            <div className='flex gap-[0.5rem] items-center'>
              <PrimaryLink to='/events/create'>
                <p className='flex items-center gap-[0.25rem]'><RiAddLine className='text-[1.25rem] text-white' />Create</p>
              </PrimaryLink>
              <button className='flex items-center gap-[0.5rem] p-[0.25rem] rounded-[5rem] border-solid border-[2px] border-black/20 hover:border-black/40 ease-250 '>
                <img
                  src='/assets/images/dp.png'
                  alt='Profile'
                  className='h-[2rem] w-[2rem] min-w-[2rem] rounded-[50rem] object-cover '
                />
                <p className='text-[0.875rem] text-black/90 font-[600] pr-[0.5rem] '>Michelle</p>
              </button>
            </div>

          </div>
        </div>
      </header>
  )
}

export default Header