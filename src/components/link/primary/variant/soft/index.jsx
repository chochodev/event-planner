import { Button } from '@mui/material';
import React from 'react';

const PrimaryLink = ({ to, width='100%', onClick=()=>{}, props, children }) => {
  // const theme = useTheme();

  return (
    <Button
      href={to}
      onClick={onClick}
      sx={{
        width: width,
        backgroundColor: '#0059ff15',
        color: '#3F51B5',
        borderRadius: '5rem',
        padding: '0.5rem 1.5rem',
        '&:hover': {
          backgroundColor: '#5d7dd4',
        },
        '&:active': {
          backgroundColor: '#323d76',
        },
        // [theme.breakpoints.up('md')]: {
        //   padding: '0.5rem 1.5rem',
        // },
      }}
      className='group'
      {...props}
    >
      <div className='text-[0.875rem] font-[600] text-secondary group-hover:text-primary capitalize'>{children}</div>
    </Button>
  );
}

export default PrimaryLink;
