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

const steps = ['Personal Information', 'Address Details', 'Review & Submit'];

const CreateEventPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form Submitted:', formValues);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
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
          </Box>
        );
      case 1:
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="City"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Box>
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
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2, mb: 2 }}>
        {renderStepContent(activeStep)}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
      </Box>
    </Box>
  );
};

export default CreateEventPage;
