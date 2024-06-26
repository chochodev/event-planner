import React from 'react';
import { Button, Collapse } from '@mui/material';
import { Alert } from '@mui/material';
import { RiCheckLine, RiCloseLine, RiErrorWarningLine } from "react-icons/ri";

const FlashMessage = ({ 
  openFlashMessage, 
  setOpenFlashMessage, 
  flashMessage, 
  flashSeverity 
}) => {

  return (
    <Collapse in={openFlashMessage}>
      <Alert
        severity={flashSeverity}
        icon={flashSeverity === 'success' ? 
          <RiCheckLine className='text-green-500 text-[1rem]' /> : 
          <RiErrorWarningLine className='text-red-500 text-[1rem]' />
        }
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              setOpenFlashMessage(false);
            }}
            sx={{
              paddingX: '0',
              borderRadius: '50rem'
            }}
          >
            <RiCloseLine className='text-[1rem] ' />
          </Button>
        }
      >
        {flashMessage}
      </Alert>
    </Collapse>
  );
};

export default FlashMessage;
