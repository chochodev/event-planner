import React from 'react';
import { TextField } from '@mui/material';

const BaseInput = ({ name, value, onChange, ...props }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      sx={{
        height: '2.875rem',
        '& .MuiInputBase-root': {
          height: '100%',
          fontSize: '0.875rem',
          fontWeight: 600,
          fontFamily: 'Poppins, sans-serif',
          paddingLeft: 'rem',
          borderRadius: '12px',
          border: '2px solid',
          borderColor: 'rgba(119,126,144,0.3)',
          '&.Mui-focused': {
            borderColor: 'rgba(119,126,144,0.8)'
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      {...props}
    />
  );
};

export default BaseInput;

/*
class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-adornedEnd css-gy0sau-MuiInputBase-root-MuiOutlinedInput-root"


*/