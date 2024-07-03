import React from 'react';
import DashboardLayout from './components/layout';
import { Button } from '@mui/material';
import { RiCalendarEventLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const items = [
    {name: 'Events', number: '9', link: '/dashboard/events', icon: <RiCalendarEventLine className='text-[1.25rem] ' />, button_style: 'text-tertiary bg-tertiary/5'},
    {name: 'Ticket Sold', number: '90', link: '/', icon: <RiCalendarEventLine className='text-[1.25rem] ' />, button_style: 'text-secondary bg-secondary/5'},
    {name: 'Total Earnings', number: '$941', link: '/', icon: <RiCalendarEventLine className='text-[1.25rem] ' />, button_style: 'text-green-500 bg-green-50'},
    {name: 'Balance', number: '$230', link: '/', icon: <RiCalendarEventLine className='text-[1.25rem] ' />, button_style: 'text-black-dim bg-black/5'},
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
            <p className='text-[0.75rem] font-[600] text-secondary group-hover:text-primary capitalize'>Create Event</p>
          </Button>
        </div>

        {/* :::::::::::::::::::::: INFO CONTENTS */}
        <div className="grid grid-cols-2 gap-[1rem] py-[2rem] ">
          {items.map((item, index) => (
            <div
              key={index}
              className='flex flex-col gap-[0.5rem] p-[0.875rem] sm:p-[1.25rem] rounded-[8px] bg-primary shadow-[0_2px_15px_1px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_15px_3px_rgba(0,0,0,0.1)] hover:translate-y-[-0.25rem] ease-250 '
            >
              <h2 className='text-gray-500 text-[1.05rem] font-[600] uppercase'>{item.name}</h2>
              <p className='text-gray-600 text-[1.25rem] font-[600] font-secondary'>{item.number}</p>
              <div className='flex justify-between items-center '>
                <Link 
                  to={item.link}
                  className='text-secondary text-[0.75rem] underline hover:scale-[1.05] hover:font-[600] ease-250'
                >
                  See Details
                </Link>

                <button
                  className={`flex items-center justify-center h-[3rem] w-[3rem] rounded-[4px] ${item.button_style}`}
                >
                  {item.icon}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard