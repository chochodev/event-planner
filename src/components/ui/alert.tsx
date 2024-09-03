import { 
  useEffect 
} from 'react';
import { Button, Collapse } from '@mui/material';
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
  // :::::::::::::::::::::::: LAYOUT STATES
  const { 
    layoutValues,
    resetLayoutState,
  } = useLayoutState();
    
  const { 
    openFlashMessage,
    flashTitle,
    flashMessage,
    flashSeverity,
  } = layoutValues;

  const handleCloseFlashMessage = () => {
    resetLayoutState();
  }

  useEffect(() => {
    cl('layout values: ', layoutValues);
  }, [layoutValues]);
  
  return (
    <div className='sticky top-0 z-[900] left-0 w-full bg-primary'>
      <Collapse in={true || openFlashMessage}>
        <div
          className={`flex items-center gap-[0.25rem] sm:gap-[0.5rem] p-4 rounded-lg 
          ${flashSeverity === 'success' ? 'bg-success-200' :
            flashSeverity === 'warning' ? 'bg-yellow-500' :
            flashSeverity === 'danger' ? 'bg-red-500' :
            flashSeverity === 'message' ? 'bg-blue-500' : 'bg-slate-500'}`}
        >
          {renderIcon(flashSeverity)}
          <div>
            <h3 className='text-success-600 '>{flashTitle || 'Null title'}</h3>
            <span className={`${
              flashSeverity === 'success' ? 'text-success-500' :
              flashSeverity === 'warning' ? 'text-yellow-500' :
              flashSeverity === 'danger' ? 'text-red-500' :
              flashSeverity === 'message' ? 'text-blue-500' : 'text-slate-500'
            }`}>
              {flashMessage || 'Null message body that is supposed to contain data.'}
            </span>
          </div>
          <button
            className={cn('')}
            onClick={handleCloseFlashMessage}
          >
            <RiCloseLine className={'text-[1rem] sm:text-[1.25rem]'} />
          </button>
        </div>
      </Collapse>
    </div>
  );
};

export default Alert;
