import { Button } from '@mui/material';
import React from 'react';

const PrimaryLink = ({ to, children }) => {
  return (
    <Button
      href={to}
      sx={{
        width: '100%',
        backgroundColor: '#3F51B5',
        borderRadius: '5rem',
        padding: '0.5rem 1.5rem',
        '&:hover': {
          backgroundColor: '#4963c7',
        },
        '&:active': {
          backgroundColor: '#323d76',
        }
      }}
    >
      <p className='text-[0.875rem] font-[600] text-primary capitalize'>{children}</p>
    </Button>
  );
}

export default PrimaryLink;
