import React from 'react';
// import PrimaryButton from 'components/button/primary';
// import PrimaryLink from 'components/link/primary';

const OurTeam = () => {
  return (
    <div className='flex flex-col items-start gap-[3rem] w-full py-[2rem] '>
      <div className='flex flex-col xlg:flex-row justify-between gap-[1rem] w-full h-max '>
        <div className='relative z-[2] flex flex-col gap-[1rem] w-full py-[2rem] rounded-[12px] '>
          <h2 className='relative z-[1] text-[2.5rem] text-black-dim font-[600] '>Our Team</h2>
          <p className='relative z-[1] text-[1.15rem] text-black-dim '>Our team of dedicated professionals brings a wealth of knowledge, creativity, and passion to every project.</p>
          {/* ::::::::::::::::::: overlay */}
          <img 
            src='/assets/images/glitters.jpg'
            alt='Dance floor'
            className='absolute top-0 left-0 opacity-[0.1] w-full h-full rounded-[16px] object-cover'
          />
        </div>
      </div>

      <div className='grid grid-cols-3 justify-between gap-[1rem] w-full h-max '>
        
      </div>
    </div>
  )
}

export default OurTeam