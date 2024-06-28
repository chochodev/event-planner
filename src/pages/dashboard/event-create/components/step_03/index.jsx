import React from 'react';
import useCreateFormStore from '../../../../../zustand/store';
import UploadImage from 'components/image_input';

const Step1Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  return (
    <div className='flex flex-col gap-[2rem] '>
      {/* ::::::::::::::::::::::::: MANAGER DETAILS */}
      <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Contact Details</p>
      <UploadImage
        onChange={handleChange}
      />
    </div>
  )
}

export default Step1Form