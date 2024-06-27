import React from 'react'
import {
  TextField,
  FormControl,
} from '@mui/material';
import useCreateFormStore from '../../../../../zustand/store';

const Step1Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  return (
    <div>
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
    </div>
  )
}

export default Step1Form