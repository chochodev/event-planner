import React, { useState } from 'react';
import { Modal, SwipeableDrawer, Backdrop } from '@mui/material';


const SeatModal = ({ open, onClose, seat, mode }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { 
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(15px)', 
         }, 
      }}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[25rem] bg-primary p-[1rem] md:p-[2rem] rounded-[8px] ">
        <h2 className="font-[700] text-[2rem] text-black mx-auto w-max mb-[1rem] ">{seat.alias}</h2>
        <div className="grid grid-cols-2 gap-[1rem] w-full mb-[1rem]">
          <div>
            <div className='flex gap-[0.5rem] items-center '>
              <p className='text-[11px] font-[600] uppercase text-secondary'>Name:</p> 
              <span className='text-[14px] text-black-dim font-[600] capitalize '>{seat.name}</span>
            </div>
            <div className='flex gap-[0.5rem] items-center '>
              <p className='text-[11px] font-[600] uppercase text-secondary'>Price:</p> 
              <span className='text-[14px] text-black-dim font-[600] capitalize '>${seat.price}</span>
            </div>
          </div>
          
          {mode === 0?
          <div className=''>
            <div className='flex gap-[0.5rem] items-center '>
              <p className='text-[11px] font-[600] uppercase text-secondary'>People:</p> 
              <span className='text-[14px] text-black-dim font-[600] capitalize '>{seat.people}</span>
            </div>
            <div className='flex gap-[0.5rem] items-center '>
              <p className='text-[11px] font-[600] uppercase text-secondary'>Serveware:</p> 
              <span className='text-[14px] text-black-dim font-[600] capitalize '>{seat.serveware}</span>
            </div>
          </div> :
          <div className=''>
            <div className='flex gap-[0.5rem] items-center '>
              <p className='text-[11px] font-[600] uppercase text-secondary'>Type:</p> 
              <span className='text-[14px] text-black-dim font-[600] capitalize '>{seat.type}</span>
            </div>
            <div className='flex gap-[0.5rem] items-center '>
              <p className='text-[11px] font-[600] uppercase text-secondary'>Total:</p> 
              <span className='text-[14px] text-black-dim font-[600] capitalize '>{seat.number}</span>
            </div>
          </div>
          }
        </div>
      
        <div className='flex flex-col gap-[0.5rem] '>
          <p className='text-[11px] font-[600] uppercase text-secondary'>Description:</p> 
          <span className='text-[14px] text-black-dim font-[600] capitalize '>{seat.desc}</span>
        </div>

        <div className='flex flex-col gap-[1rem] items-center w-full mt-[1rem] '>
          <button
            className='flex items-center justify-center text-center w-full max-w-[15rem] h-[2.875rem] text-[0.875rem] rounded-[32px] bg-secondary text-white hover:bg-secondary-hover active:bg-opacity-[70%] ease-200'
          >Buy Ticket</button>
          <button
            onClick={onClose}
            className='flex items-center justify-center text-center w-full max-w-[15rem] h-[2.875rem] text-[0.875rem] rounded-[32px] bg-gray-800 text-primary hover:bg-gray-900 ease-200'
          >Cancel Purchase</button>
        </div>
      </div>
    </Modal>
  );
};

const drawerBleeding = 56;

const SeatPicker = ({ open, toggleDrawer, seats, loading, mode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOnClick = (seat) => {
    setModalData(seat);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className='h-[80vh] md:h-[60vh] overflow-x-auto w-full bg-primary shadow-[0_0_2px_4px_rgba(150,150,255,0.2)]'>
          <div className='flex flex-col gap-[2rem] p-[2rem] mx-auto max-w-[60rem]'>
            <h2 className='text-secondary uppercase font-[600]'>List of available seats</h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-[0.875rem] md:gap-[1rem]'>
              {!loading && 
              (seats?.map((seat, index) => (
                <button
                  key={index}
                  onClick={() => handleOnClick(seat)}
                  className='group flex items-center justify-center text-center h-[3rem] w-[3rem] rounded-[4px] bg-gray-100 hover:bg-gray/20 ease-250 active:bg-black/50 active:text-secondary hover:scale-[1.05] border-solid border-black/20 border-0 hover:border-[1px]'
                >
                  <p className='font-[600] text-gray-600 text-[0.875rem] group-hover:text-secondary ease-250'>{seat.alias}</p>
                </button>
              )))}
            </div>
          </div>
        </div>
      </SwipeableDrawer>
      {modalData && (
        <SeatModal open={openModal} onClose={handleCloseModal} seat={modalData} mode={mode} />
      )}
    </div>
  );
};

export default SeatPicker;
