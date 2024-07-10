import React from 'react';
import { Modal } from '@mui/material';
import { GiCheckMark } from "react-icons/gi";
import PrimaryLink from 'components/link/primary/variant/outlined';
import PrimaryLink2 from 'components/link/primary';
import { RiCloseLine } from 'react-icons/ri';

const Message = ({ 
  severity = 'success', 
  title = 'Success!!', 
  message = 'Operation completed successfully.', 
  icon: Icon = GiCheckMark,
  open,
  onClose,
  children 
}) => {
  const severityStyles = {
    success: {
      iconColor: 'text-secondary',
      bgColor: 'bg-primary',
      borderColor: 'border-secondary-light',
      backgroundShadow: 'shadow-[0_0_5px_10px_rgba(63,81,181,0.25)]'
    },
    error: {
      iconColor: 'text-red-500',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-500',
      backgroundShadow: 'shadow-[0_0_5px_10px_rgba(239,68,68,0.5)]'
    },
    warning: {
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      backgroundShadow: 'shadow-[0_0_5px_10px_rgba(255,255,0,0.5)]'
    },
    info: {
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-500',
      backgroundShadow: 'shadow-[0_0_5px_10px_rgba(0,0,255,0.5)]'
    },
  };

  const styles = severityStyles[severity] || severityStyles.success;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'rgba(63,81,181,0.5)'
      }}
    >
      <div className={`relative flex flex-col gap-[1rem] items-center max-w-[30rem] w-[95%] ${styles.bgColor} p-[2rem] pt-[6rem] rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.25)]`}>
        <div className={`absolute top-[-6rem] flex items-center justify-center rounded-[20rem] h-[10rem] w-[10rem] ${styles.bgColor} border-solid border-[2px] ${styles.backgroundShadow} ${styles.borderColor}`}>
          {severity === 'success'? 
            <Icon className={`${styles.iconColor} text-[3.5rem]`} /> :
            <RiCloseLine className={`${styles.iconColor} text-[4.5rem]`} />}
        </div>

        <div className={`flex flex-col gap-[1rem] w-full`}>
          <div dangerouslySetInnerHTML={{ __html: title }} />
          <div dangerouslySetInnerHTML={{ __html: message }} />
          

          <div className='flex gap-[1rem] items-center '>
            <PrimaryLink>
              Home
            </PrimaryLink>
            <PrimaryLink2
              onClick={onClose}
            >
              Close
            </PrimaryLink2>
          </div>
          
          {children}
        </div>
      </div>
    </Modal>
  );
}

export default Message;
