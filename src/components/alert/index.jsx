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
    <div className='fixed top-0 z-[900] left-0 w-full bg-primary '>
      <Collapse in={openFlashMessage}>
        <Alert
          severity={flashSeverity}
          icon={flashSeverity === 'success' ? 
            <RiCheckLine className='text-green-500 text-[1rem]' /> : 
            <RiErrorWarningLine className='text-red-500 text-[1.25rem]' />
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
          <span className={`${flashSeverity === 'success'? 'text-green-500' : 'text-red-700'} `}>{flashMessage}</span>
        </Alert>
      </Collapse>
    </div>
  );
};

export default FlashMessage;
