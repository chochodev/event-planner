import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const AccentLink = ({ to, children }) => {
  return (
    <Button 
      href={to} 
      variant='outlined'
      sx={{
        color: 'inherit',
        padding: '0.25rem 2rem',
        borderColor: '#ffffff40',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '#FFFFFF20',
          borderColor: '#ffffff90'
        },
        '&:active': {
          backgroundColor: '#FFC10720',
        },
      }}
    >
      <span className='text-primary text-[0.625rem] md:text-[0.875rem]'>{children}</span>
    </Button>
  )
}

AccentLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccentLink;