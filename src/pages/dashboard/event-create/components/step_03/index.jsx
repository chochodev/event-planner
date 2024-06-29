import React, { useState, useEffect } from 'react';
import useCreateFormStore from '../../../../../zustand/store';
import UploadImage from 'components/image_input';
import BaseInput from 'components/input';
import SwitchWithLabel from 'components/switch';
import { Modal } from '@mui/material';
import { RiCloseLine } from 'react-icons/ri';
import TextForm from 'pages/dashboard/components/floor_seat_input';

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

  // ::::::::::::::::::: SEATING ARRANGEMENT
  useEffect(() => {
    // if is_floor is true; open seating arrangement modal
  }, [formValues.is_floor]);

  const localFloorMode = formValues.floorplanMode;
  const [editFloorPlan, setEditFloorPlan] = useState(false);

  const handleFloorMode = (mode) => {
    setFormValues({ ...formValues, floorplanMode: mode });
  }

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

      <Modal 
        open={editFloorPlan}
        // open={true}
        onClose={() => setEditFloorPlan(false)}
      >
        <div 
          className='relative flex flex-col gap-[2rem] w-screen h-screen bg-primary overflow-hidden '
        >
          {/* ::::::: TITLE */}
          <div className='sticky z-[100] top-0 left-0 flex items-center gap-[1.875rem] bg-primary p-[1rem] md:p-[2rem] border-b-[1px] border-solid border-base/50 '>
            <h3 className='outline outline-[1px] py-[0.5rem] outline-[#2C3BFA] text-[0.75rem] sm:text-[1.15rem] shadow-[0_1px_10px_4px_rgba(44,59,250,0.2)] rounded px-[0.5rem] sm:px-[1rem] uppercase w-max text-secondary '>Create Floor-Plan</h3>
            <div className='flex flex-col sm:flex-row items-center rounded-[8px] overflow-hidden border-solid border-base/50 border-[1px] '>
              <button
                onClick={handleFloorMode(0)}
                className={`px-[0.5rem] sm:px-[1rem] py-[0.5rem] uppercase w-max text-[0.625rem] sm:text-[0.875rem] ${localFloorMode !== 0? 'text-secondary bg-white/10 hover:bg-white/15' : 'text-white bg-base/85 hover:bg-base'} ease-250`}
              >Mode 1</button>
              <button
                onClick={handleFloorMode(1)}
                className={`px-[0.5rem] sm:px-[1rem] py-[0.5rem] uppercase w-max text-[0.625rem] sm:text-[0.875rem] ${localFloorMode !== 1? 'text-secondary bg-white/10 hover:bg-white/15' : 'text-white bg-base/85 hover:bg-base'} ease-250`}
              >Mode 2</button>
            </div>
            {/* ::::::: CLOSE BUTTON */}
            <div className="flex flex-1 justify-end">
              <button 
                onClick={() => setEditFloorPlan(false)} 
                className='p-[0.5rem] rounded-[4px] text-secondary text-[1rem] bg-white/10 hover:bg-white/15 ease-250'
              >
                <RiCloseLine className='' />
              </button>
            </div>
            
          </div>

          {/* :::::::: FLOOR PLAN FORM */}
          <div className='p-[1rem] md:p-[2rem] flex-1 overflow-y-auto'>
            {/* :::::::::::::::::::::::::: MODE 1 */}
            {localFloorMode===0 && 
            <div 
              className={`flex flex-col lg:flex-row gap-x-[1rem] gap-y-[2rem] w-full h-max`}
            >
              {/* ::::::::::::::::::::::::::::: IMAGE */}
              <div className='w-full lg:w-[50%] h-full'>
                <UploadImage />
              </div>

              {/* ::::::::::::::::::::::::::::: FORM */}
              <div className='flex-1 pt-[1rem]'>
                <TextForm />
              </div>

              {/* ::::::::::::::::::::::::::::: TABLE */}
              {/* <ItemAppendForm /> */}
            </div>}

            {/* :::::::::::::::::::::::::: MODE 2 */}
            {localFloorMode===1 && 
            <div 
              className={`flex flex-col lg:flex-row gap-x-[1rem] gap-y-[2rem] w-full h-max`}
            >
              {/* ::::::::::::::::::::::::::::: IMAGE */}
              <div className='w-full lg:w-[50%] h-full'>
                <UploadImage />
              </div>

              {/* ::::::::::::::::::::::::::::: FORM */}
              <div className='flex-1 pt-[1rem]'>
                <TextForm2 />
              </div>

              {/* ::::::::::::::::::::::::::::: TABLE */}
              <ItemAppendForm2 />
            </div>}

          </div>
        </div>
      </Modal>    
    </div>
  )
}

export default Step1Form