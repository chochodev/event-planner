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
          <div className='relative flex justify-between gap-[1rem] w-full h-max '>
            <div className='flex flex-1 flex-col gap-[1rem] max-w-[40rem] '>
              <div>
                {renderStepContent(activeStep)}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                )}
              </div>
            </div>
            <div className='h-full min-h-screen'>
              <div
                className='sticky top-[8.5rem] flex flex-col gap-[1rem] w-[22rem] h-max p-[2rem] rounded-[12px] overflow-hidden shadow-[0_2px_40px_8px_rgba(0,0,0,0.1)] '
              >
                <p className='text-[1.25rem] text-black font-[600] '>Preview</p>
                <img src="/assets/images/dp.png" alt="Event"
                  className='w-full h-[20rem] object-cover rounded-[12px] '
                />
                <div className='flex gap-[0.5rem] items-center justify-between'>
                  <p className='text-[0.875rem] text-black-dim '>{formValues.name || 'No name value'}</p>
                  <p
                    className='text-secondary text-[0.75rem] font-[600] w-max px-[0.25rem] py-[0.1rem] border-solid border-[2px] border-secondary/50 rounded-[4px]'
                  >${formValues.ticket_price || '0.00'}</p>
                </div>
                <div className='w-full h-[1px] bg-black-fade/50' />
                <div className='flex justify-between w-full'>
                  <p className='text-black-light text-[0.625rem] tracking-[1.5px] font-[600] uppercase'>seats available:</p>
                  <p className='text-black-light text-[0.875rem]'>35</p>
                </div>

                <div className='flex justify-between items-center w-full'>
                  <p className='text-black-light text-[0.625rem] tracking-[1.5px] font-[600] uppercase '>Location:</p>
                  <p className='text-black-light text-[0.875rem]'>Swan hotel, Akure city</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CreateEventPage;
