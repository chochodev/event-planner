import React, { useState, useEffect } from 'react';
import useCreateFormStore from '../../../../../zustand/store';
import UploadImage from 'components/image_input';
import BaseInput from 'components/input';
import SwitchWithLabel from 'components/switch';
import { Modal } from '@mui/material';
import TextForm from 'pages/dashboard/components/floor_seat_input';
import ItemAppendForm from 'pages/dashboard/components/item_append_form';
import TextForm2 from 'pages/dashboard/components/floor_seat_input2';
import ItemAppendForm2 from 'pages/dashboard/components/item_append_form2';

const Step3Form = () => {
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
    if (formValues.is_floor) {
      setEditFloorPlan(true);
    }
  }, [formValues.is_floor]);

  const localFloorMode = formValues.floorplanMode;
  const [editFloorPlan, setEditFloorPlan] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Stepper state

  const handleFloorMode = (mode) => {
    setFormValues({ ...formValues, floorplanMode: mode });
    setCurrentStep(1); // Move to next step
  }

  // const handleBack = () => {
  //   setCurrentStep(0);
  // }

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
          <div className='sticky z-[100] top-0 left-0 flex items-center gap-[1.875rem] bg-primary p-[1rem] md:p-[2rem] border-0 border-b-[1px] border-solid border-gray-300 '>
            <h3 
              className='py-[0.5rem] text-[0.75rem] sm:text-[0.875rem] font-[600] px-[0.5rem] sm:px-[1rem] rounded uppercase w-max text-black-light outline outline-[2px] outline-gray-300 '
            >Create Floor-Plan</h3>
            
            {/* ::::::::::::::::::: SWITCH BUTTONS */}
            {currentStep === 1 &&
            <>
            {localFloorMode !== 1 && 
            <button
              onClick={()=>handleFloorMode(0)}
              className={`flex items-center justify-center text-[0.875rem] font-[600] text-black-dim px-[1.5rem] h-[2.5rem] border-solid border-[2px] border-black-light/20 hover:bg-secondary-hover hover:text-primary ease-250 rounded-[3rem] `}
            >Switch to Multiple</button>
            }
            {localFloorMode !== 0 &&
            <button
              onClick={()=>handleFloorMode(1)}
              className={`flex items-center justify-center text-[0.875rem] font-[600] text-black-dim px-[1.5rem] h-[2.5rem] border-solid border-[2px] border-black-light/20 hover:bg-secondary-hover hover:text-primary ease-250 rounded-[3rem] `}
            >Switch to Single</button>
            }
            </>}

            {/* ::::::: CLOSE BUTTON */}
            <div className="flex flex-1 justify-end">
              <button 
                onClick={() => setEditFloorPlan(false)} 
                className='flex items-center justify-center text-[0.875rem] font-[600] px-[1.5rem] h-[2.5rem] border-solid border-[2px] border-black-light/20 hover: bg-secondary-hover hover:bg-secondary-light text-primary ease-250 rounded-[3rem]'
              >
                Done
              </button>
            </div>
            
          </div>

          {/* :::::::: FLOOR PLAN FORM */}
          <div className='px-[1rem] md:px-[2rem] py-[1rem] flex-1 overflow-y-auto'>
            {currentStep === 0 ? (
              <div className='flex justify-center items-center gap-[1rem] w-full h-full '>
                <div
                  className='flex flex-col gap-[1rem] items-center justify-center text-[0.875rem] p-[1rem] w-[15rem] text-white bg-gray-200/10 ease-250 rounded-[16px] shadow-[0_5px_15px_1px_rgba(0,0,0,0.06)] hover:shadow-[0_5px_15px_1px_rgba(0,0,0,0.1)]'
                >
                  <img
                    src='/assets/images/upload-pic-1.jpg'
                    alt='mode 1'
                    className='w-full h-[10rem] rounded-[8px] object-cover'
                  />
                  <button 
                    onClick={() => handleFloorMode(0)}
                    className='flex items-center justify-center text-[0.875rem] font-[600] text-black-dim px-[1.5rem] h-[2.5rem] border-solid border-[2px] border-black-light/20 hover:bg-secondary-hover hover:text-primary ease-250 rounded-[3rem] '
                  >Single Mode</button>
                </div>
                <div
                  className='flex flex-col gap-[1rem] items-center justify-center text-[0.875rem] p-[1rem] w-[15rem] text-white bg-gray-200/10 ease-250 rounded-[16px] shadow-[0_5px_15px_1px_rgba(0,0,0,0.06)] hover:shadow-[0_5px_15px_1px_rgba(0,0,0,0.1)]'
                >
                  <img
                    src='/assets/images/upload-pic-2.jpg'
                    alt='mode 1'
                    className='w-full h-[10rem] rounded-[8px] object-cover'
                  />
                  <button 
                    onClick={() => handleFloorMode(1)}
                    className='flex items-center justify-center text-[0.875rem] font-[600] text-black-dim px-[1.5rem] h-[2.5rem] border-solid border-[2px] border-black-light/20 hover:bg-secondary-hover hover:text-primary ease-250 rounded-[3rem] '
                  >Multiple Mode</button>
                </div>
              </div>
            ) : (
              <>
              <div 
                className={`flex flex-col lg:flex-row gap-x-[1rem] gap-y-[2rem] w-full h-max`}
              >
                {/* ::::::::::::::::::::::::::::: IMAGE */}
                <div className='flex flex-col gap-[1rem] w-full lg:w-[50%] h-full pt-[1rem]'>
                  <h2>Upload Floor-plan Image</h2>
                  <UploadImage 
                    name="floor_image"
                    onChange={handleImageChange}
                    errorMessage={formValues.floorplanImage ? '' : 'Image is required'}
                  />
                </div>
                
                {localFloorMode === 0?
                  <>
                  {/* ::::::::::::::::::::::::::::: FORM */}
                  <div className='flex-1'>
                    <TextForm />
                  </div>

                  {/* ::::::::::::::::::::::::::::: TABLE */}
                  <ItemAppendForm />
                  </> : 
                  <>
                  {/* ::::::::::::::::::::::::::::: FORM */}
                  <div className='flex-1'>
                    <TextForm2 />
                  </div>

                  {/* ::::::::::::::::::::::::::::: TABLE */}
                  <ItemAppendForm2 />
                  </>
                }
              </div>
              </>
            )}
          </div>
        </div>
      </Modal>    
    </div>
  )
}

export default Step3Form;
