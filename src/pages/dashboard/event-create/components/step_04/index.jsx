import React from 'react';
import useCreateFormStore from '../../../../../zustand/store';


const Step4Form = () => {
  const { formValues } = useCreateFormStore();

  return (
    <div className='w-full'>
      <div className='flex flex-col w-full'>
        {/* ::::::::::::::::::: IMAGE */}
       {formValues.floorplanImage instanceof File?
        <div className='relative flex flex-col gap-[1rem] w-full overflow-hidden rounded-[8px] '>
          <img
            src={URL.createObjectURL(formValues.source_image)}
            alt='Floor plan'
            className='relative z-[2] w-full h-[30rem] object-contain'
          />

          {/* :::::::::::::::::: Background blur */}
          <img
            src={URL.createObjectURL(formValues.source_image)}
            alt='Floor plan'
            className='absolute top-0 left-0 w-full h-[30rem] object-cover blur-[10px]'
          />
        </div>: 
        <div className='relative flex flex-col gap-[1rem] w-full overflow-hidden rounded-[8px] '>
          <img
            src={'/assets/images/dp.png'}
            alt='Floor plan'
            className='relative z-[2] w-full h-[30rem] object-contain'
          />

          {/* :::::::::::::::::: Background blur */}
          <img
            src={'/assets/images/dp.png'}
            alt='Floor plan'
            className='absolute top-0 left-0 w-full h-[30rem] object-cover blur-[10px]'
          />
        </div>
        }

        {/* :::::::::::::::::::::::: EVENT DETAILS */}
        <div classNmae='flex flex-col '>
          <p className='text-[1rem] text-black-light font-[600] mt-[2rem] underline underline-offset-[2px] '>Event Details</p>
          <ul className='flex flex-col gap-[0.5rem] py-[1rem] '>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event name:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.name || 'No Event name'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event Description:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.description || 'No Description name'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Ticket Quantity:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.ticket_qty || 'No Ticket Quantity'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Ticket price:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.ticket_price || 'No Ticket price'}</span>
            </li>

          </ul>
        
          <div classNmae='flex flex-col'>
            <p className='text-[1rem] text-black-light font-[600] mt-[2rem] underline underline-offset-[2px] '>Ticket Variants</p>
            {formValues.ticket_variants.map((ticket, index) => (
            <div key={index} className='flex flex-col gap-[0.5rem] py-[1rem] '>
              <div className='flex items-center gap-[0.5rem] '>
                <p className='text-[1rem] text-black-light '>Ticket name:</p>
                <span className='text-[1rem] text-slate-700 font-[600]'>{ticket.ticket_name || 'No Ticket name'}</span>
              </div>
              <div className='flex items-center gap-[0.5rem] '>
                <p className='text-[1rem] text-black-light '>Ticket price:</p>
                <span className='text-[1rem] text-slate-700 font-[600]'>{ticket.ticket_price || 'No Ticket price'}</span>
              </div>
              <div className='flex items-center gap-[0.5rem] '>
                <p className='text-[1rem] text-black-light '>Ticket Description:</p>
                <span className='text-[1rem] text-slate-700 font-[600]'>{ticket.ticket_description || 'No Ticket Description'}</span>
              </div>               
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step4Form