import React, { useState } from 'react';
import SubHeader from 'components/typography/sub_header';
import BaseInput from 'components/input';
import PrimaryLink from 'components/link/primary';

const Newsletter = () => {
  const [value, setValue] = useState('');
  return (
    <div className='flex flex-col items-center gap-[1rem] w-full'>
      <SubHeader>Sign up for our newsletter</SubHeader>

      <div className='w-full '>
        <p>Subscribe to our newsletter and stay updated on the latest events, exclusive offers, and more. Don't miss out on any exciting happenings!</p>

        <form>
          <div className='flex flex-col gap-[0.5rem] w-[20rem] mx-auto '>
            <BaseInput 
              type='email'
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              required
            />
            <PrimaryLink
              onClick={()=>{}}
            >Subscribe</PrimaryLink>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Newsletter