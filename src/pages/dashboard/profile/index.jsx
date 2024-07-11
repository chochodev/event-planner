import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';

// first_name: '',
// last_name: '',
// email: '',
// gender: '',
// password: '',
// address: '',
// zip_code: '',

const ProfileSetting = () => {
  const initialFormState = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    password: '',
    address: '',
    zip_code: ''
  };

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashSeverity, setFlashSeverity] = useState('success');
  const [openFlashMessage, setOpenFlashMessage] = useState(false);

  useEffect(() => {
    // Fetch initial data and populate the form state if needed
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/auth/profile'); // Adjust the endpoint as needed
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.put('/auth/profile', form);
      setFlashMessage('Profile updated successfully');
      setFlashSeverity('success');
      setOpenFlashMessage(true);
      setLoading(false);

      setTimeout(() => {
        setOpenFlashMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      setFlashMessage(errorMessage);
      setFlashSeverity('error');
      setLoading(false);
      setOpenFlashMessage(true);

      setTimeout(() => {
        setOpenFlashMessage(false);
      }, 7000);
    }
  };
  return (
    <DashboardLayout>
      <FlashMessage 
        openFlashMessage={openFlashMessage}
        setOpenFlashMessage={setOpenFlashMessage}
        flashMessage={flashMessage}
        flashSeverity={flashSeverity}
      />
      <div>
        <h2>Profle Information</h2>
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
            <TextField 
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              sx={{
                height: '3rem',
                '& .MuiSelect-select': {
                  height: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField 
              label="Zip Code"
              name="zip_code"
              value={form.zip_code}
              onChange={handleChange}
              InputProps={{
                sx: {
                  height: '3rem',
                  '& input': {
                    height: '1.5rem',
                  },
                },
              }}
            />
          </FormControl>
          <button type='submit' hidden ></button>
        </form>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{height: '3rem'}} fullWidth>
          {loading? <div className="loader"></div> : "Sign Up"}
        </Button>
      </div>
    </DashboardLayout>
  )
}

export default ProfileSetting;