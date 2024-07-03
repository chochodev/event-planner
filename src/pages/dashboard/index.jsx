import React from 'react';
import DashboardLayout from './components/layout';
import PrimaryLink from 'components/link/primary/variant/soft';
import { Button } from '@mui/material';

const Dashboard = () => {
  const items = [
    {name: 'Events', number: 90, link: '/', icon: ''}
  ]
  return (
    <DashboardLayout>
      <div className='w-full px-[1rem] xmd:px-[2rem] py-[2rem] '>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-gray-600 text-[0.875rem] font-[600] '>Good Day, Emmanuel!</h2>
            <p className='text-gray-500 text-[0.75rem]'>Here's what happened with your store recently.</p>
          </div>

          <Button
            href={'/'}
            sx={{
              width: 'width',
              backgroundColor: '#0059ff15',
              color: '#3F51B5',
              borderRadius: '5rem',
              padding: '0.25rem 1rem',
              '&:hover': {
                backgroundColor: '#5d7dd4',
              },
              '&:active': {
                backgroundColor: '#323d76',
              },
            }}
            className='group'
          >
            <div className='text-[0.75rem] font-[600] text-secondary group-hover:text-primary capitalize'>Create Event</div>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard