import React from 'react'
import {
  TextField,
  FormControl,
} from '@mui/material';
import useCreateFormStore from '../../../../../zustand/store';

const Step2Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  return (
    <div>
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
    </div>
  )
}

export default Step2Form