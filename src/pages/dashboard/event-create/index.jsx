import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
} from '@mui/material';
import HomeLayout from 'components/layout';
import useCreateFormStore from '../../../zustand/store';
import Step1Form from './components/step_01';
import Step2Form from './components/step_02';

const steps = ['Personal Information', 'Address Details', 'Review & Submit'];

const CreateEventPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { formValues, setFormValues } = useCreateFormStore();

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
          <div className='relative flex gap-[1rem] w-full h-max '>
            <div className='flex flex-1 flex-col gap-[1rem] '>
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
                className='sticky top-[8.5rem] flex flex-col rounded-[12px] overflow-hidden '
              >
                <img src="/assets/images/dp.png" alt="Event"
                  className='w-[25rem] min-w-[22rem] h-[20rem] object-cover '
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CreateEventPage;
