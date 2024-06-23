import HomeLayout from 'components/layout'
import React from 'react'

const HomePage = () => {
  return (
    <HomeLayout>
      <div className='flex flex-col items-center justify-center text-center max-w-[75rem] mx-auto w-full py-[3rem] px-[1rem] sm:px-[2rem] '>
        <div className='flex flex-col gap-[0.5rem] items-center text-center w-full mx-auto'>
          <p className='text-[0.75rem] font-[600] text-black/50'>CREATE, EXPLORE, & BOOK EVENTS.</p>
          <h1 
            className='text-[2rem] text-black font-[600]'
          >Transform Your Ideas into Unforgettable Events</h1>
        </div>

      </div>
    </HomeLayout>
  )
}

export default HomePage