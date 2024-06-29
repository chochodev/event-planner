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
        <div classNmae='flex flex-col gap-[1rem] '>
          <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Event Details</p>
          <ul className='flex flex-col gap-[0.5rem] '>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event name:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.name || 'No Event name'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event Description:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.description || 'No Event name'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event name:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.name || 'No Event name'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event name:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.name || 'No Event name'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event name:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.name || 'No Event name'}</span>
            </li>
            <li className='flex items-center gap-[0.5rem] '>
              <p className='text-[1rem] text-black-light '>Event name:</p>
              <span className='text-[1rem] text-slate-700 font-[600]'>{formValues.name || 'No Event name'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Step4Form