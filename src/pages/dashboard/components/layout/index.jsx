import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
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
  RiHistoryLine
} from "react-icons/ri";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Input, useMediaQuery } from '@mui/material';
import Logo from 'components/logo';

const DashboardLayout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:600px)');

  const navLinks = [
    {name: 'Dashboard', link: '/dashboard', icon: <RiDashboardHorizontalLine className='' />},
    {name: 'Profile', link: '/dashboard', icon: <RiUser3Line className='' />},
    {name: 'My Events', link: '/dashboard/events', icon: <RiCalendarEventLine className='' />},
    {name: 'Cart', link: '/dashboard', icon: <RiShoppingCartLine className='' />},
    {name: 'History', link: '/dashboard', icon: <RiHistoryLine className='' />},
    {name: 'Exit', link: '/dashboard', icon: <RiHome3Line className='' />},
  ]

  return (
    <div className='flex w-full'>
      <div className="flex flex-col max-w-[75rem] mx-auto">
        {/* ::::::::::::::::: HEAD */}
        <div className='flex items-center w-full'>
          <div>
            <Logo />

            {!useMediaQuery &&
            <IconButton
              onClick={()=>setOpenMenu(!openMenu)}
              sx={{
                borderRadius: '10rem',
                // padding: '0.5rem'

              }}
            >
              {!openMenu? 
                <RiMenu5Line className='text-gray-500' /> : 
                <RiCloseLine className='text-gray-500' />
              }
            </IconButton>}

            <Input 
              
            />
          </div>
          

          <div>
            <h2>Admin Dashboard</h2>
          </div>
        </div>
        <div className='flex w-full'>
          {/* ::::::::::::::::: NAV MENU */}
          <nav>
            
          </nav>
          
          {children}

        </div>
      </div>
      
    </div>
  )
}

export default DashboardLayout;