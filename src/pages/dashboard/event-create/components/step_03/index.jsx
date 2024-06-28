import React from 'react';
import useCreateFormStore from '../../../../../zustand/store';
import UploadImage from 'components/image_input';
import BaseInput from 'components/input';
import SwitchWithLabel from 'components/switch';

const Step1Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const handleImageChange = (file) => {
    setFormValues({ ...formValues, source_image: file });
  };

  const handleSwitchChange = (newValue) => {
    setFormValues({ ...formValues, is_floor: newValue });
    console.log(formValues.is_floor)
  };

  return (
    <div className='flex flex-col gap-[2rem] '>
      {/* ::::::::::::::::::::::::: MANAGER DETAILS */}
      <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Contact Details</p>
      <UploadImage
        name="source_image"
        onChange={handleImageChange}
        errorMessage={formValues.source_image ? '' : 'Image is required'}
      />
      {formValues.source_image &&
      <>
      <p className='text-[0.75rem] text-black-light mb-[-1.5rem] uppercase '>Image preview:</p>
      <img 
        src={URL.createObjectURL(formValues.source_image)} 
        alt="Event"
        className='w-[7rem] h-[7rem] object-cover rounded-[12px] '
      />
      </>
      }

      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Custom URL - rana-event/events/{formValues.domain_url || 'my-event'}</label>
        <BaseInput 
          id='domain_url'
          name='domain_url'
          type='text'
          value={formValues.domain_url}
          onChange={handleChange}
          placeholder='e.g my-event'
        />
      </div>

      <SwitchWithLabel
        checked={formValues.is_floor}
        onChange={handleSwitchChange}
        label="Add seating arrangement"
      />      
    </div>
  )
}

export default Step1Form