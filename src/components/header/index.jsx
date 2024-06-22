import React, { useState } from 'react'

const Header = () => {
  const [smallNav, setSmallNav] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
      <header 
        className={`sticky top-0 left-0 z-[10] flex flex-col items-center justify-center w-full h-[4.5rem] sm:h-[5.5rem] md:h-[6rem] lg:h-[7rem] px-[4%] md:px-[3.75rem] bg-gradient-to-b from-white via-white to-white/40 `}
      >
        <div>
          is logged in
        </div>
        <div class='flex justify-between items-center w-full h-full '>
          <div class='flex-[0.5]'>
            {/* :::::::::::::::::::::: LOGO */}
            <img src={'/assets/svgs/logo.svg'} alt='Logo' className='w-[5rem] sm:w-[6rem] md:w-[6.5rem] lg:w-[7rem] xl:w-[8rem] object-contain' />
          </div>
        </div>
      </header>
  )
}

export default Header