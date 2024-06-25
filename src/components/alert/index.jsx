import React, { useEffect } from 'react';
import { Alert, Button, Collapse } from '@mui/material';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

const FlashMessage = ({ open, message = 'Alert', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  return (
    <Collapse in={open}>
      <Alert
        icon={<RiCheckLine className='text-green-500 text-[1rem]' />} 
        action={
          <Button
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <RiCloseLine className='text-[1rem]' />
          </Button>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default FlashMessage;
