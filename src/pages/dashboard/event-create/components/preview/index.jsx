import React from 'react';
import useCreateFormStore from '../../../../../zustand/store';
import dayjs from 'dayjs';
import { Skeleton } from '@mui/material';

const Preview = () => {
  const { formValues } = useCreateFormStore();

  // :::::::::::::::::: format date
  const formatDate = (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : 'No date value';
  };
  return (
    <div
      className='max-xlg:hidden sticky top-[8.5rem] flex flex-col gap-[1rem] w-[22rem] h-max p-[2rem] rounded-[12px] overflow-hidden shadow-[0_2px_40px_8px_rgba(0,0,0,0.1)] '
    >
      <p className='text-[1.25rem] text-black font-[600] '>Preview</p>
      {formValues.source_image? 
      <img 
        src={formValues.source_image? URL.createObjectURL(formValues.source_image) : "/assets/images/dp.png"} 
        alt="Event"
        className='w-full h-[20rem] object-cover rounded-[12px] '
      /> : 
      <Skeleton variant='rectangular' width={'100%'} sx={{ height: '20rem', borderRadius: '12px' }} />
      }
      <div className='flex gap-[0.5rem] items-center justify-between'>
        <p className='text-[0.875rem] text-black-dim '>{formValues.name || 'No name value'}</p>
        <p
          className='text-secondary text-[0.75rem] font-[600] w-max px-[0.25rem] py-[0.1rem] border-solid border-[2px] border-secondary/50 rounded-[4px]'
        >${parseFloat(formValues.ticket_price).toFixed(2) || '0.00'}</p>
      </div>
      <div className='w-full h-[1px] bg-black-fade/50' />

      <div className='flex justify-between items-center w-full'>
        <p className='text-black-light text-[0.625rem] tracking-[0.05px] font-[600] uppercase '>Location:</p>
        <p className='text-black-dim font-[600] text-[0.75rem]'>{formValues.address || 'No address'}, {formValues.city || 'No city'}</p>
      </div>
      <div className='flex justify-between w-full'>
        <p className='text-black-light text-[0.625rem] tracking-[0.05px] font-[600] uppercase'>Start date:</p>
        <p className='text-secondary font-[600] text-[0.75rem] underline'>{formatDate(formValues.start_date)}</p>
      </div>
      <div className='flex justify-between w-full'>
        <p className='text-black-light text-[0.625rem] tracking-[0.05px] font-[600] uppercase'>End date:</p>
        <p className='text-secondary font-[600] text-[0.75rem] underline'>{formatDate(formValues.end_date)}</p>
      </div>
    </div>
  )
}

export default Preview