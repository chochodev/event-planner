import React from 'react'
import {
  TextField,
  FormControl
} from '@mui/material';
import useCreateFormStore from '../../../../../zustand/store';

const Step1Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  return (
    <div className='flex flex-col gap-[2rem] '>
      <div className='flex flex-col '>
        <h2 className='text-[3rem] text-black-dim font-[600] '>Create an Event</h2>
        <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Event Details</p>
      </div>
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Event name</label>
        <input 
          // value="" 
          type="text"
          id='name'
          placeholder='e.g Movies Show with Timmy'
          className='w-full h-[2.875rem] pl-[1rem] text-[0.875rem] font-[600] rounded-[12px] border-solid border-black-light/30 border-[2px] focus:border-black-light/80 ease-250 '
        />
        <TextField 
          name='name'
          placeholder='e.g Movies Show with Timmy'
          type='text'
        />
      </div>
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='description' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Description</label>
        <textarea
          // value=""
          id='description'
          placeholder='e.g Movies Show with Timmy'
          className='w-full h-[5.875rem] p-[1rem] text-[0.875rem] font-[600] rounded-[12px] border-solid border-black-light/30 border-[2px] focus:border-black-light/80 ease-250 resize-none overflow-hidden '
        ></textarea>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Step1Form