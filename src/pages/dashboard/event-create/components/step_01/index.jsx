import React from 'react'
import {
  TextField,
  FormControl,
} from '@mui/material';
import useCreateFormStore from '../../../../../zustand/store';

const Step1Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  return (
    <div>
      <div className='flex flex-col gap-[0.5rem] '>
        <label htmlFor='name' className='text-black-fade text-[0.75rem] uppercase font-[600] '>Event name</label>
        <input 
          type="text" 
          // value="" 
          placeholder='e.g Movies Show with Timmy'
          className='w-full h-[2.875rem] pl-[1rem] text-[0.875rem] font-[600] rounded-[12px] border-solid border-black-light/30 border-[2px] focus:border-black-light/80 ease-250 '
        />
      </div>
    <FormControl fullWidth margin="normal">
      <TextField
        label="Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        required
      />
    </FormControl>
    <FormControl fullWidth margin="normal">
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        required
      />
    </FormControl>
    </div>
  )
}

export default Step1Form