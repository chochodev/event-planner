import React, { 
  // useEffect 
} from 'react';
import { Button, Collapse } from '@mui/material';
import { Alert } from '@mui/material';
import { RiCheckLine, RiCloseLine, RiErrorWarningLine } from "react-icons/ri";
import { useLayoutState } from '../../zustand/store';

const FlashMessage = () => {
  // :::::::::::::::::::::::: LAYOUT STATES
  const { 
    layoutValues,
    resetLayoutState,
  } = useLayoutState();
    
  const { 
    // openFlashMessage,
    flashMessage,
    flashSeverity,
  } = layoutValues;

  const handleCloseFlashMessage = () => {
    resetLayoutState();
  }
  
  return (
    <div className='sticky top-0 z-[900] left-0 w-full bg-primary '>
      <Collapse in={true}>
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
              onClick={handleCloseFlashMessage}
              sx={{
                paddingX: '0',
                borderRadius: '50rem'
              }}
            >
              <RiCloseLine className={`${flashSeverity === 'success'? 'text-green-500' : 'text-red-700'} text-[1rem] `} />
            </Button>
          }
        >
          <span className={`${flashSeverity === 'success'? 'text-green-500' : 'text-red-700'} `}>{flashMessage || 'null'}</span>
        </Alert>
      </Collapse>
    </div>
  );
};

export default FlashMessage;
