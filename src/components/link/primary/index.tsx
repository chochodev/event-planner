import { Button } from '@mui/material';
import React from 'react';

const PrimaryLink = ({ to, width='100%', onClick=()=>{}, variant='success', children }) => {
  // const theme = useTheme();

  return (
    <Button
      href={to}
      onClick={onClick}
      sx={{
        width: width,
        backgroundColor: variant === 'success'? '#3F51B5' : variant==='danger'? '#ef4444' : '#eab308',
        borderRadius: '5rem',
        padding: '0.5rem 1.5rem',
        '&:hover': {
          backgroundColor: variant === 'success'? '#4963c7' : variant === 'danger'? '#db3a3a':'#d4a107',
        },
        '&:active': {
          backgroundColor: variant === 'success'? '#323d76' : variant === 'danger'? '#db3a3a':'#ffc20b',
        },
        // [theme.breakpoints.up('md')]: {
        //   padding: '0.5rem 1.5rem',
        // },
      }}
    >
      <div className='text-[0.875rem] font-[600] text-primary capitalize'>{children}</div>
    </Button>
  );
}

export default PrimaryLink;
