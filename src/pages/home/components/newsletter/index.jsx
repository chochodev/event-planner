import React, { useState } from 'react';
import SubHeader from 'components/typography/sub_header';
import BaseInput from 'components/input';
import PrimaryLink from 'components/link/primary';
import { Button } from '@mui/material';

const Newsletter = () => {
  const [value, setValue] = useState('');
  return (
    <div className='flex flex-col items-center gap-[2rem] w-full'>
      <SubHeader>Sign up for our newsletter</SubHeader>

      <div className='flex flex-col gap-[3rem] w-full '>
        <p className='max-w-[35rem] mx-auto'>Subscribe to our newsletter and stay updated on the latest events, exclusive offers, and more. Don't miss out on any exciting happenings!</p>

        <form>
          <div className='flex flex-col gap-[0.5rem] w-full max-w-[25rem] mx-auto '>
            <label className='text-gray-500 text-[0.875rem] font-[600] w-full text-start'>Email:</label>
            <BaseInput 
              type='email'
              value={value}
              placeholder='johndoe@gmail.com'
              onChange={(e)=>setValue(e.target.value)}
              required
            />
            <Button
              onClick={()=>{}}
              sx={{
                width: '100%',
                backgroundColor: '#3F51B5',
                borderRadius: '0.5rem',
                padding: '0.625rem 1.5rem',
                '&:hover': {
                  backgroundColor: '#4963c7',
                },
                '&:active': {
                  backgroundColor: '#323d76',
                },
              }}
            >
              <p className='text-[0.875rem] font-[600] text-primary capitalize'>Subscribe</p>
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Newsletter