import { useState } from 'react';
import { useCreateFormStore } from '@/zustand/store';
import UploadImage, { UploadImageSmall } from 'components/image_input';
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

  const handleEventImageChange = (file) => {
    setFormValues({ ...formValues, source_image: file });
  };
  
  const handleFloorImageChange = (file) => {
    setFormValues({ ...formValues, floorplanImage: file });
  };

  // ::::::::::::::::::: SEATING ARRANGEMENT
  const handleSwitchChange = (newValue) => {
    setFormValues({ ...formValues, is_floor: newValue });
    if (formValues.is_floor) {
      setEditFloorPlan(false);
    } else {
      setEditFloorPlan(true);
    }
  };

  const localFloorMode = formValues.floorplanMode;
  const [editFloorPlan, setEditFloorPlan] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleFloorMode = (mode) => {
    setFormValues({ ...formValues, floorplanMode: mode });
    setCurrentStep(1);
    console.log('local floor mode:', localFloorMode);
  }


  return (
    <div className='flex flex-col gap-[2rem] '>
      {/* ::::::::::::::::::::::::: MANAGER DETAILS */}
      <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Contact Details</p>
      <UploadImage
        name="source_image"
        onChange={handleEventImageChange}
        errorMessage={formValues.source_image ? '' : 'Image is required'}
      />
      {formValues.source_image instanceof File &&
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
            {formValues.floorplanMode !== 1 && 
            <button
              onClick={()=>handleFloorMode(1)}
              className={`flex items-center justify-center text-[0.875rem] font-[600] text-black-dim px-[1.5rem] h-[2.5rem] border-solid border-[2px] border-black-light/20 hover:bg-secondary-hover hover:text-primary ease-250 rounded-[3rem] `}
            >Switch to Multiple</button>
            }
            {formValues.floorplanMode !== 0 &&
            <button
              onClick={()=>handleFloorMode(0)}
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
                className={`flex max-lg:flex-col gap-x-[1rem] gap-y-[2rem] w-full h-max`}
              >
                {/* ::::::::::::::::::::::::::::: IMAGE */}
                <div className='flex flex-col gap-[1rem] w-full lg:w-[50%] h-full '>
                  {formValues.floorplanImage?
                  <UploadImageSmall 
                    name="floor_image"
                    onChange={handleFloorImageChange}
                    errorMessage={formValues.floorplanImage ? '' : 'Image is required'}
                  /> :
                  <UploadImage 
                    name="floor_image"
                    onChange={handleFloorImageChange}
                    errorMessage={formValues.floorplanImage ? '' : 'Image is required'}
                  />}

                  {formValues.floorplanImage instanceof File && 
                    <div className='relative flex flex-col gap-[1rem] w-full overflow-hidden rounded-[8px] '>

                      <img
                        src={URL.createObjectURL(formValues.floorplanImage)}
                        alt='Floor plan'
                        className='relative z-[2] w-full h-[30rem] object-contain'
                      />

                      {/* :::::::::::::::::: Background blur */}
                      <img
                        src={URL.createObjectURL(formValues.floorplanImage)}
                        alt='Floor plan'
                        className='absolute top-0 left-0 w-full h-[30rem] object-cover blur-[10px]'
                      />
                    </div>
                  }
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
