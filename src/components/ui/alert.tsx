import { useState, useEffect } from 'react';
import { Collapse } from '@mui/material';
import { 
  RiCheckboxCircleLine, 
  RiCloseLine, 
  RiErrorWarningLine,
  RiInformation2Line,
  RiStopCircleLine
} from "react-icons/ri";
import { useLayoutState } from 'store/store';
import { cl } from 'context/authStatusContext';
import { cn } from '@/lib/utils';

const renderIcon = (severity: string) => {
  switch (severity) {
    case 'success':
      return <RiCheckboxCircleLine className='text-[1.25rem] sm:text-[1.5rem]' />;
    case 'warning':
      return <RiStopCircleLine className='text-[1rem] sm:text-[1.25rem]' />;
    case 'danger':
      return <RiErrorWarningLine className='text-[1rem] sm:text-[1.25rem]' />;
    case 'message':
      return <RiInformation2Line className='text-[1rem] sm:text-[1.25rem]' />;
    default:
      return <RiCheckboxCircleLine className='text-[1.25rem] sm:text-[1.5rem]' />;
  }
};

const Alert = () => {
  // State to track if the collapse is in progress
  const [isClosing, setIsClosing] = useState(false);

  // :::::::::::::::::::::::: LAYOUT STATES
  const { layoutValues, resetLayoutState } = useLayoutState();
  const { openFlashMessage, flashTitle, flashMessage, flashSeverity } = layoutValues;

  const handleCloseFlashMessage = () => {
    setIsClosing(true);
  };

  // :::::::::::::::::: Removes the alert after 10 seconds if not manually closed
  useEffect(() => {
    if (openFlashMessage) {
      const timeout = setTimeout(() => {
        setIsClosing(true);
      }, 10000);

      // Cleanup function to clear the timeout
      return () => clearTimeout(timeout);
    }
  }, [openFlashMessage]);

  // :::::::::::::::::: Reset layout state after collapse animation completes
  useEffect(() => {
    if (isClosing) {
      const collapseDuration = 300;
      const timeout = setTimeout(() => {
        resetLayoutState();
        setIsClosing(false);
      }, collapseDuration);

      return () => clearTimeout(timeout);
    }
  }, [isClosing, resetLayoutState]);

  return (
    <div className='sticky top-0 z-[900] left-0 w-full bg-primary'>
      <Collapse in={openFlashMessage && !isClosing}>
        <div
          className={cn('flex items-center justify-between gap-[0.25rem] sm:gap-[0.5rem] sm:px-4 p-2  border-solid border-[1px]',
            {
              'bg-green-50 text-green-400 [&_h3]:text-green-600 border-green-200': flashSeverity === 'success',
              'bg-yellow-50 text-yellow-400 [&_h3]:text-yellow-600 border-yellow-200': flashSeverity === 'warning',
              'bg-red-50 text-red-400 [&_h3]:text-red-600 border-red-200': flashSeverity === 'danger',
              'bg-blue-50 text-blue-400 [&_h3]:text-blue-600 border-blue-200': flashSeverity === 'message',
            }
          )}
        >
          <div className='flex items-center gap-[0.5rem] sm:gap-[0.875rem]'>
            {renderIcon(flashSeverity)}
            <div className='flex flex-col'>
              <h3 className='text-[0.75rem] sm:text-[0.875rem] font-[500]'>{flashTitle || 'Null title'}</h3>
              <span className='text-[0.75rem] sm:text-[0.875rem]'>
                {flashMessage || 'Null message body that is supposed to contain data.'}
              </span>
            </div>
          </div>
          <button
            className={cn('p-2 rounded-full hover:text-slate-700 ease-250')}
            onClick={handleCloseFlashMessage}
          >
            <RiCloseLine className='text-[1rem] sm:text-[1.25rem]' />
          </button>
        </div>
      </Collapse>
    </div>
  );
};

export default Alert;
