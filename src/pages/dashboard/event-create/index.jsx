import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box
} from '@mui/material';
import HomeLayout from 'components/layout';
import useCreateFormStore from '../../../zustand/store';
import Step1Form from './components/step_01';
import Step2Form from './components/step_02';
import PrimaryLink from 'components/link/primary';
import { RiArrowRightLine } from 'react-icons/ri';
import dayjs from 'dayjs';

const steps = ['Personal Information', 'Address Details', 'Review & Submit'];

const CreateEventPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { formValues } = useCreateFormStore();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // :::::::::::::::::: format date
  const formatDate = (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : 'No date value';
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form Submitted:', formValues);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1Form />
        );
      case 1:
        return (
          <Step2Form />
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Review your details:</Typography>
            <Typography>Name: {formValues.name}</Typography>
            <Typography>Email: {formValues.email}</Typography>
            <Typography>Address: {formValues.address}</Typography>
            <Typography>City: {formValues.city}</Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <HomeLayout>
      <div className='flex flex-col w-full h-max px-[1rem] md:px-[2rem] '>
        <div className='flex flex-col gap-[2rem] max-w-[75rem] w-full mx-auto h-max py-[2.875rem] md:py-[3rem] '>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className='relative flex justify-between gap-[1rem] w-full h-full '>
            <div className='flex flex-1 flex-col gap-[3rem] w-full xlg:max-w-[40rem] '>
              <div>
                {renderStepContent(activeStep)}
              </div>
              <div className='flex gap-[1rem] w-full pt-[3rem] border-solid border-0 border-[#000000]/20 border-t-[1px]'>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ 
                    borderRadius: '5rem',
                    paddingX: '1.25rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.08)',
                    }
                  }}
                >
                  <p className='capitalize text-black-light'>Back</p>
                </Button>
                {activeStep === steps.length - 1 ? (
                  <PrimaryLink onClick={handleSubmit}>
                    Submit
                  </PrimaryLink>
                ) : (
                  <div className='flex-1 flex justify-between'>
                    <PrimaryLink width='max-content' onClick={handleNext}>
                      <div className='flex items-center gap-[0.5rem] '>  
                        <p className=''>Next</p>
                        <RiArrowRightLine className='text-white text-[0.875rem] ' />
                      </div>
                    </PrimaryLink>
                    <div className='flex items-center gap-[0.5rem] '>
                      <p className='uppercase text-black-light font-[600] text-[0.75rem] '>Auto Saving</p>
                      <div className="loader-saving mx-[1rem] "></div>
                    </div>
                  </div>
                )}


              </div>
            </div>

            {/* :::::::::::::::::::::::: PREVIEW */}
            <div
              className='max-xlg:hidden sticky top-[8.5rem] flex flex-col gap-[1rem] w-[22rem] h-max p-[2rem] rounded-[12px] overflow-hidden shadow-[0_2px_40px_8px_rgba(0,0,0,0.1)] '
            >
              <p className='text-[1.25rem] text-black font-[600] '>Preview</p>
              <img src="/assets/images/dp.png" alt="Event"
                className='w-full h-[20rem] object-cover rounded-[12px] '
              />
              <div className='flex gap-[0.5rem] items-center justify-between'>
                <p className='text-[0.875rem] text-black-dim '>{formValues.name || 'No name value'}</p>
                <p
                  className='text-secondary text-[0.75rem] font-[600] w-max px-[0.25rem] py-[0.1rem] border-solid border-[2px] border-secondary/50 rounded-[4px]'
                >${parseFloat(formValues.ticket_price).toFixed(2) || '0.00'}</p>
              </div>
              <div className='w-full h-[1px] bg-black-fade/50' />

              <div className='flex justify-between items-center w-full'>
                <p className='text-black-light text-[0.625rem] tracking-[0.05px] font-[600] uppercase '>Location:</p>
                <p className='text-black-dim font-[600] text-[0.75rem]'>Swan hotel, Akure city</p>
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
            </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CreateEventPage;
