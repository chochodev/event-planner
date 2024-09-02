import { useState } from 'react';
import { Stepper, Step, Button, StepLabel } from '@mui/material';
import HomeLayout from 'components/layout';
import useCreateFormStore from '../../../zustand/store';
import Step1Form from './components/step_01';
import Step2Form from './components/step_02';
import Step3Form from './components/step_03';
import PrimaryLink from 'components/link/primary';
import { RiArrowRightLine } from 'react-icons/ri';
import Preview from './components/preview';
import Step4Form from './components/step_04';
import FlashMessage from 'components/alert';
import axiosInstance from 'utils/axios';

const cl = console.log.bind(console);

const CreateEventPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { formValues, resetFormValues } = useCreateFormStore();

  const steps = [
    {name: '', icon: <RiArrowRightLine />},
    {name: '', icon: <RiArrowRightLine />},
    {name: '', icon: <RiArrowRightLine />},
    {name: '', icon: <RiArrowRightLine />},
  ]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // ::::::::::::::::::: SUBMIT FUNCTION
  const [openFlashMessage, setOpenFlashMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashSeverity, setFlashSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    cl('form values:', formValues);

    const formData = new FormData();
  
    // Append all form values to formData
    Object.keys(formValues).forEach(key => {
      formData.append(key, formValues[key]);
    });
  
    // Handle file inputs separately
    formData.append('source_image', formValues.source_image);
    formData.append('floorplanImage', formValues.floorplanImage);
  
    // Handle plan layouts separately
    formData.append('floorplanLayout', JSON.stringify(formValues.floorplanLayout));
    formData.append('categoryplanLayout', JSON.stringify(formValues.categoryplanLayout));

    try {
      const response = await axiosInstance.post('/events/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFlashMessage(response.data?.message || 'Event created successfully');
      setFlashSeverity('success');
      setOpenFlashMessage(true);
  
      // :::::::: closes the flash message and redirect
      setTimeout(() => {
        setOpenFlashMessage(false);
        resetFormValues()
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      setFlashMessage(errorMessage);
      setFlashSeverity('error');
      setOpenFlashMessage(true);
      
      // closes the flash message
      setTimeout(() => {
        setOpenFlashMessage(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1Form />;
      case 1:
        return <Step2Form />;
      case 2:
        return <Step3Form />;
      case 3:
        return <Step4Form />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
    <FlashMessage
      openFlashMessage={openFlashMessage}
      setOpenFlashMessage={setOpenFlashMessage}
      flashMessage={flashMessage}
      flashSeverity={flashSeverity}
    />
    <HomeLayout>
      <div className='flex flex-col w-full h-max px-[1rem] md:px-[2rem]'>
        <div className='flex flex-col gap-[2rem] max-w-[75rem] w-full mx-auto h-max py-[2.875rem] md:py-[3rem]'>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index} >
                <StepLabel>{''}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className='relative flex justify-between gap-[1rem] w-full h-full'>
            <div className={`flex flex-1 flex-col gap-[3rem] w-full ${activeStep !== 3 && 'xlg:max-w-[40rem]'}`}>
              <div>{renderStepContent(activeStep)}</div>
              <div className='flex gap-[1rem] w-full pt-[3rem] border-solid border-0 border-[#000000]/20 border-t-[1px]'>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    borderRadius: '5rem',
                    paddingX: '1.25rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  <p className='capitalize text-black-light'>Back</p>
                </Button>
                {activeStep === steps.length - 1 ? (
                  <PrimaryLink width='max-content' onClick={handleSubmit}>
                    <div className='flex items-center justify-center gap-[0.5rem] w-[4.5rem] '>
                      {loading? <div className="loader"></div> : "Submit"}
                    </div>
                  </PrimaryLink>
                ) : (
                  <div className='flex-1 flex justify-between'>
                    <PrimaryLink width='max-content' onClick={handleNext}>
                      <div className='flex items-center gap-[0.5rem]'>
                        <p>Next</p>
                        <RiArrowRightLine className='text-white text-[0.875rem]' />
                      </div>
                    </PrimaryLink>
                    <div className='flex items-center gap-[0.5rem]'>
                      <p className='uppercase text-black-light font-[600] text-[0.75rem]'>Auto Saving</p>
                      <div className="loader-saving mx-[1rem]"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* :::::::::::::::::::::::: PREVIEW */}
            {activeStep !== 3 && <Preview />}
          </div>
        </div>
      </div>
    </HomeLayout>
    </>
  );
};

export default CreateEventPage;
