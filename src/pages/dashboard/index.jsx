import React from 'react';
import DashboardLayout from './components/layout';
import PrimaryLink from 'components/link/primary';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className='w-full px-[1rem] xmd:px-[2rem] py-[2rem] '>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-gray-600 text-[0.875rem] font-[600] '>Good Day, Emmanuel!</h2>
            <p className='text-gray-500 text-[0.75rem]'>Here's what happened with your store recently.</p>
          </div>

          <PrimaryLink>Create Event</PrimaryLink>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard