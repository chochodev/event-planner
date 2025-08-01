import AccentLink from 'components/link/accent';
import PrimaryLink from 'components/link/primary';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiAddLine, 
  RiCloseLine, 
  RiMenu4Line, 
  RiHome3Line, 
  RiDashboardLine, 
  RiUser3Line,
  RiLogoutBoxLine,
  RiUser6Line,
  RiSettings6Line,
  RiArtboard2Line
} from 'react-icons/ri';
import { Modal, Skeleton, Popover } from '@mui/material';
import { AuthContext } from 'context/authStatusContext';
import { useTokenState } from 'store/store';
import Alert from 'ui/alert';


const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const { isAuthenticated, loading, handleLogout } = useContext(AuthContext);
  const { tokenValues } = useTokenState();
  const { firstname, profile_image: image } = tokenValues;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpenNav(false);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  const links = [
    {name: 'Home', link: '/', icon: <RiHome3Line className='text-black/50 group-hover:text-black ease-250 text-[1.15rem] ' />},
    {name: 'My Events', link: '/dashboard/events', icon: <RiDashboardLine className='text-black/50 group-hover:text-black ease-250 text-[1.15rem] ' />},
    {name: 'Dashboard', link: '/dashboard', icon: <RiArtboard2Line className='text-black/50 group-hover:text-black ease-250 text-[1.15rem] ' />},
    {name: 'Profile', link: '/dashboard/profile', icon: <RiUser3Line className='text-black/50 group-hover:text-black ease-250 text-[1.15rem] ' />},
    {name: 'Sign Out', link: '/', icon: <RiLogoutBoxLine className='text-black/50 group-hover:text-black ease-250 text-[1.15rem] ' />},
  ]

  // for popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

  if (loading) {
    return (
      <header 
        className={`sticky top-0 left-0 z-[10] w-full bg-primary border-solid border-black/20 border-x-0 border-t-0 border-b-[1px] px-[2rem] `}
      >
        <div className='flex justify-between items-center max-w-[75rem] w-full mx-auto h-max py-[0.75rem] md:py-[1rem]'>
          <div className='flex items-center gap-[0.875rem] sm:gap-[1.875rem] lg:gap-[3rem]'>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={40} />
            <Skeleton variant="rectangular" width={1} height={48} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={40} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={40} />
          </div>
          <div className='flex items-center gap-[0.875rem]'>
            <Skeleton variant="rounded" width={100} height={35} />
            <Skeleton variant="rounded" width={110} height={35} />
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
    <header 
      className={`sticky top-0 left-0 z-[10] w-full bg-primary border-solid border-black/20 border-x-0 border-t-0 border-b-[1px] `}
    >
      <Alert />
      {!isAuthenticated &&
      <div className='flex flex-col items-center justify-center w-full bg-secondary px-[1rem] sm:px-[2rem] '>
        <div className='flex max-sm:flex-col gap-y-[0.875rem] justify-between items-start sm:items-center py-[0.5rem] max-w-[75rem] w-full mx-auto'>
          <p className='text-[0.75rem] md:text-[0.875rem] text-primary '>Sign in to Create Memorable Moments, Hassle-Free!!</p>
          <AccentLink to='/signin'>Sign in</AccentLink>
        </div>
      </div>
      }

      <div className='flex justify-between items-center w-full h-max px-[1rem] sm:px-[2rem] '>
        <div className='flex justify-between items-center max-w-[75rem] w-full mx-auto h-max py-[0.75rem] md:py-[1rem] '>
          <div className='flex items-center gap-[0.875rem] sm:gap-[1.875rem] lg:gap-[3rem]'>
            <Link to='/' className='flex items-center gap-[0.5]'>
              {/* :::::::::::::::::::::: LOGO */}
              <img 
                src={'/assets/svgs/logo.svg'} 
                alt='Logo' 
                className='w-[3rem] md:w-[3.5rem] object-contain' 
              />
            </Link>

            <div className='h-[3rem] w-[1px] bg-black/20 ' />
            
            <div className='flex items-center gap-[1rem] md:gap-[2rem] h-full '>
              <Link 
                to='/events'
                className='text-black/50 text-[0.75rem] sm:text-[0.875rem] font-[600] hover:text-secondary-hover ease-250'
              >Discover</Link>
              <Link 
                to='/dashboard'
                className='text-black/50 text-[0.75rem] sm:text-[0.875rem] font-[600] hover:text-secondary-hover ease-250'
              >Dashboard</Link>
            </div>
          </div>
            
            <div className='hidden md:flex gap-[0.5rem] items-center'>
              <PrimaryLink to='/dashboard/events/create'>
                <p className='flex items-center gap-[0.25rem]'><RiAddLine className='text-[1.25rem] text-white' />Create</p>
              </PrimaryLink>
              <button
                onClick={handlePopoverOpen}
                className='flex items-center gap-[0.5rem] p-[0.25rem] rounded-[5rem] border-solid border-[2px] border-black/20 hover:border-secondary-light ease-250 '
              >
                <img
                  src={image || '/assets/images/dp.png'}
                  alt='Profile'
                  className='h-[2rem] w-[2rem] min-w-[2rem] rounded-[50rem] object-cover '
                />
                <p className='text-[0.875rem] text-black/90 font-[600] pr-[0.5rem] '>{firstname}</p>
              </button>

              {/* :::::::::::::::::::::::: POP OVER */}
              
              <Popover 
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                sx={{
                  marginTop: '1rem',
                  '& .MuiPopover-paper': {
                    overflow: 'visible',
                    borderRadius: '12px',
                    boxShadow: '0 2px 15px 5px rgba(0,0,0,0.2)'
                  },
                }}
              >
                <div className='relative flex flex-col items-center p-[1rem] w-[15rem] '>
                  <div className='absolute top-[-0.5rem] bg-white h-[1rem] w-[1rem] rotate-45 ' />
                  <div className='flex flex-col gap-[0.875rem] w-full'>
                    <p className='text-[1.5rem] text-black-dim font-[600] '>Hello, {firstname}!</p>
                    <Link 
                      to='/dashboard/profile'
                      onClick={handlePopoverClose}
                      className='flex gap-[0.5rem] items-center text-black-light hover:text-secondary w-full mt-[1rem] pb-[0.5rem] ease-250 border-solid border-0 border-b-[1px] border-black-light/50 '
                    >
                      <RiUser6Line className='text-[1.25rem] ' />
                      <span className='text-[0.875rem] '>My Profile</span>
                    </Link>
                    <Link 
                      to='/events'
                      onClick={handlePopoverClose}
                      className='flex gap-[0.5rem] items-center text-black-light hover:text-secondary w-full pb-[0.5rem] ease-250 border-solid border-0 border-b-[1px] border-black-light/50 '
                    >
                      <RiDashboardLine className='text-[1.25rem] ' />
                      <span className='text-[0.875rem] '>My Events</span>
                    </Link>
                    <Link 
                      to='/settings'
                      onClick={handlePopoverClose}
                      className='flex gap-[0.5rem] items-center text-black-light hover:text-secondary w-full pb-[0.5rem] ease-250 border-solid border-0 border-b-[1px] border-black-light/50 '
                    >
                      <RiSettings6Line className='text-[1.25rem] ' />
                      <span className='text-[0.875rem] '>Settings</span>
                    </Link>
                    <button
                      onClick={()=>{ handlePopoverClose(); handleLogout();}}
                      className='flex gap-[0.5rem] items-center text-black-light hover:text-secondary w-full pb-[0.5rem] ease-250  '
                    >
                      <RiLogoutBoxLine className='text-[1.25rem] ' />
                      <span className='text-[0.875rem] '>Sign out</span>
                    </button>
                  </div>

                  {/* ::::::::::::::::::::::: TOP ARROW */}
                </div>
              </Popover>
            </div>
            <div className='md:hidden'>
              <button 
                onClick={()=>setOpenNav(true)}
                className='flex items-center justify-center h-[2.5rem] w-[2.5rem] rounded-[4px] hover:bg-secondary/10 active:bg-secondary/30 ease-250'
              >
                <RiMenu4Line className='text-secondary text-[1.375rem]' />
              </button>
            </div>


          {/* ::::::::::::::::::::::: SMALL SCREEN NAV MENU MODAL */}
          <Modal
            open={openNav}
            onClose={()=>setOpenNav(false)}
          >
            <div className='relative flex items-end flex-col w-screen h-screen bg-primary p-[2rem]  '>
              {/* ::::::::::::::::::: CLOSE BUTTON */}
              <button 
                onClick={()=>setOpenNav(false)}
                className='flex justify-self-end items-center justify-center h-[2.5rem] w-[2.5rem] bg-black/5 rounded-[8px] hover:bg-black/10 ease-250 '
              >
                <RiCloseLine className='text-[1.25rem] text-gray-500 ' />
              </button>
              <button className='flex gap-[1rem] items-center w-full px-[1rem]'>
                <img
                  src={image || '/assets/images/dp.jpg'}
                  alt='Profile'
                  className='h-[3.5rem] w-[3.5rem] min-w-[3.5rem] rounded-[8px] object-cover shadow-[0_0_12px_4px_rgba(0,0,0,0.1)] '
                />
                <div className='flex flex-col items-start'>
                  <h2 className='text-gray-400 font-[600] text-[0.75rem] uppercase'>Name:</h2>
                  <p className='text-[1rem] font-[600] text-gray-600'>{firstname}</p>
                </div>
              </button>

              {/* ::::::::::::::::::::::: HORIZONTAL LINE */}
              <hr className='w-full h-[1px] bg-gray-200 mt-[2rem] ' />
              <div className='flex flex-col gap-[1.5rem] mt-[2rem] w-full '>
                {links.slice(0,-1).map((link, index) => (
                  <Link 
                    to={link.link}
                    onClick={()=>setOpenNav(false)}
                    key={index}
                    className={`group flex gap-[0.5rem] items-center text-gray-800 text-[0.75rem] font-[600] w-full uppercase bg-gray-100 hover:bg-gray-200 px-[1rem] py-[0.875rem] rounded-[4px] transition-all duration-[200ms] ease-in-out hover:scale-[1.02] `}
                  >
                    {link.icon} {link.name}
                  </Link>
                ))}
                <button 
                    onClick={()=>{setOpenNav(false); handleLogout();}}
                    className={`group flex gap-[0.5rem] items-center text-gray-800 text-[0.75rem] font-[600] w-full uppercase bg-gray-100 hover:bg-gray-200 px-[1rem] py-[0.875rem] rounded-[4px] transition-all duration-[200ms] ease-in-out hover:scale-[1.02] `}
                  >
                    <RiLogoutBoxLine className='text-black/50 group-hover:text-black ease-250 text-[1.15rem] ' /> 
                    Sign Out
                  </button>
              </div>
            </div>  
          </Modal>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header