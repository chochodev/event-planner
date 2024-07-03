import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { 
  RiMenu5Line, 
  RiArrowRightSLine, 
  RiArrowLeftSLine, 
  RiCloseLine,
  RiDashboardHorizontalLine,
  RiHome3Line,
  RiUser3Line,
  RiCalendarEventLine,
  RiShoppingCartLine,
  RiHistoryLine,
  RiSearch2Line,
  RiNotification2Fill
} from "react-icons/ri";
import { useMediaQuery } from '@mui/material';
import Logo from 'components/logo';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:640px)');

  const navLinks = [
    {name: 'Dashboard', link: '/dashboard', icon: <RiDashboardHorizontalLine className='' />},
    {name: 'Profile', link: '/dashboard', icon: <RiUser3Line className='' />},
    {name: 'Events', link: '/dashboard/events', icon: <RiCalendarEventLine className='' />},
    {name: 'Cart', link: '/dashboard', icon: <RiShoppingCartLine className='' />},
    {name: 'History', link: '/dashboard', icon: <RiHistoryLine className='' />},
    {name: 'Exit', link: '/dashboard', icon: <RiHome3Line className='' />},
  ]

  // :::::::::::::::::::::: SEARCH
  const [searchModal, setSearchModal] = useState(false);


  return (
    <div className='flex w-full'>
      <div className="flex flex-col w-full">
        {/* ::::::::::::::::: HEAD */}
        <div className='flex items-center justify-between w-full max-w-[85rem] mx-auto h-[4rem] xmd:h-[5rem] '>
          <div className='flex gap-[0.375rem] xmd:gap-[1rem] md:gap-[2rem] items-center pl-[1rem] xmd:pl-[2rem] '>
            <Logo style='w-[3rem] xmd:w-[4rem]' />

            {!isLargeScreen &&
            <IconButton
              onClick={()=>setOpenMenu(!openMenu)}
              sx={{
                borderRadius: '10rem',
              }}
            >
              {!openMenu? 
                <RiMenu5Line className='text-gray-500' /> : 
                <RiCloseLine className='text-gray-500' />
              }
            </IconButton>}

            <div className='relative flex items-center '>
              <RiSearch2Line className='absolute right-[0.5rem] text-[1.15rem] text-gray-400 ' />
              <input 
                defaultValue=''
                onClick={()=>setSearchModal(true)}
                placeholder='Search'
                className='h-[2.15rem] xmd:h-[2.5rem] w-[8rem] xmd:w-[12rem] text-[0.875rem] bg-gray-100 rounded-[8px] pl-[0.875rem] py-[0.25rem] '
              />
            </div>
          </div>

          <div className='flex items-center gap-[1rem] pr-[1rem] xmd:pr-[2rem] '>
            <h2 className='max-xmd:hidden text-[1.25rem] font-[600] text-black-dim'>Dashboard</h2>
            <IconButton
              sx={{
                backgroundColor: '#00000010',
                borderRadius: '8px'
              }}
            >
              <RiNotification2Fill className='text-black-dim text-[1.15rem] ' />
            </IconButton>
          </div>
        </div>

        {/* :::::::::::::::: HORIZONTAL LINE */}
        <hr className='w-full h-[1px] bg-gray-200' />
          
        <div className='hidden xmd:flex items-center h-[4rem] w-full overflow-x-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)] '>
          {/* ::::::::::::::::: NAV MENU */}
          <nav className='flex gap-[1rem] md:gap-[1.5rem] max-w-[85rem] mx-auto '>
            {navLinks.map((nav, index) => (
              <Link 
                key={index}
                to={nav.link}
                className='flex items-center gap-[0.25rem] h-[2rem] px-[1rem] text-[0.875rem] text-gray-500 hover:text-secondary-hover ease-250 '
              >
                {nav.icon}
                <p>{nav.name}</p>
              </Link>
            ))}
          </nav>
          

        </div>
          {children}
      </div>
      
    </div>
  )
}

export default DashboardLayout;