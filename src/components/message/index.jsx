import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { GiCheckMark } from "react-icons/gi";
import PrimaryLink from 'components/link/primary/variant/outlined';
import PrimaryLink2 from 'components/link/primary';


const Message = ({ severity, message, children }) => {
  const [openModal, setOpenModal] = useState(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      sx={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'rgba(63,81,181,0.5)'
      }}
    >
      <div className='relative flex flex-col gap-[1rem] items-center max-w-[30rem] w-[95%] bg-primary p-[2rem] pt-[6rem] rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.25)]'>
        <div className='absolute top-[-6rem] flex items-center justify-center rounded-[20rem] h-[10rem] w-[10rem] bg-primary border-secondary-light border-solid border-[2px] shadow-[0_0_5px_10px_rgba(63,81,181,0.25)] '>
          <GiCheckMark className='text-secondary text-[3.5rem]' />
        </div>

        <h2 className='text-[2.25rem] font-[600] text-secondary'>Success!!</h2>
        <p className='text-[0.875rem] font-[400] text-secondary '>{message || 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos provident maxime veniam architecto illum recusandae, facilis laborum repudiandae.'}</p>

        <div className='flex gap-[1rem] items-center '>
          <PrimaryLink>
            Home
          </PrimaryLink>
          <PrimaryLink2
            onClick={handleCloseModal}
          >
            Close
          </PrimaryLink2>
        </div>
        
        {children && children}
      </div>
    </Modal>
  )
}

export default Message