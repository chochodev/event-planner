import React, { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../components/layout';
import axiosInstance from 'utils/axios';
import FlashMessage from 'components/alert';
import { MenuItem, Select } from '@mui/material';
import { RiCamera3Line } from 'react-icons/ri';
import BaseInput from 'components/input';
import PrimaryLink from 'components/link/primary';
import PrimaryLink2 from 'components/link/primary/variant/soft';
import Loader from 'components/loader';
import { useTokenState } from '../../../zustand/store';
import { AuthContext } from 'context/authStatusContext';

const ProfileSetting = () => {
  const { tokenValues, setTokenValues } = useTokenState();
  const { refreshUserData } = useContext(AuthContext)
  const [initialFormState, setInitialFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    address: '',
    zip_code: '',
    profile_image: null
  });

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashSeverity, setFlashSeverity] = useState('success');
  const [openFlashMessage, setOpenFlashMessage] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  // ::::::::::::::::::::::::::: GET USER DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/auth/profile/');
        setInitialFormState(response.data.user);
        // console.log(response.data);
        const authToken = tokenValues;
        setTokenValues({ ...authToken, ...response.data.token })
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ::::::::::::::::::::::: update initial state on render
  useEffect(() => {
    setForm(initialFormState);
    if (initialFormState.profile_image) {
      setImagePreviewUrl(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/${initialFormState.profile_image}`);
    }
  }, [initialFormState]);

  // ::::::::::::::::::::::: handle form change state
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name !== 'profile_image') {
      setForm({
        ...form,
        [name]: value,
      });
    } else {
      const file = files[0];
      setForm({
        ...form,
        [name]: file,
      });
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // ::::::::::::::::::::: HANDLE SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // :::::::::::::::::: form data
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    // ::::::::::::::::::: for image update
    formData.append('profile_image', form.profile_image);

    try {
      const response = await axiosInstance.post('/auth/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFlashMessage(response.data.success);
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
    } finally {
      refreshUserData();
    }
  };

  // ::::::::::::::::::::: RESET FUNCTION
  const handleReset = () => {
    setForm(initialFormState);
    if (initialFormState.profile_image) {
      setImagePreviewUrl(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/${initialFormState.profile_image}`);
    } else {
      setImagePreviewUrl('');
    }
  };

  // :::::::::::::::::::::: LOADING STATE
  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardLayout>
      <FlashMessage
        openFlashMessage={openFlashMessage}
        setOpenFlashMessage={setOpenFlashMessage}
        flashMessage={flashMessage}
        flashSeverity={flashSeverity}
      />
      <div className='w-full h-full px-[2rem] lg:px-[4rem] py-[2rem]'>
        <div className='flex flex-col gap-[1.875rem] w-full max-w-[75rem] mx-auto'>
          <h2 className='text-black font-[600] text-[1.5rem] md:text-[1.25rem]'>Profile Information</h2>
          <div className='relative w-max rounded-[20rem] overflow-hidden'>
            <img
              src={imagePreviewUrl || "/assets/images/dp.png"}
              alt="Profile"
              className='h-[8rem] w-[8rem] min-w-[8rem] object-cover'
            />
            <div className='absolute bottom-0 left-0 z-[2] flex justify-center w-full py-[0.5rem] bg-black/60'>
              <label htmlFor='profile_image' className='relative w-full h-full'>
                <RiCamera3Line className='text-white text-[1.5rem] mx-auto ' />
                <input
                  id='profile_image'
                  type='file'
                  name='profile_image'
                  onChange={handleChange}
                  className='absolute top-0 left-0 z-[5] invisible h-full w-full'
                />
              </label>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 xmd:grid-cols-2 md:max-lg:grid-cols-1 md:grid-cols-2 gap-[1rem] gap-y-[2rem] w-full'>
            <div className='flex flex-col gap-[0.5rem] '>
              <label
                htmlFor='first_name'
                className='text-black-fade text-[0.75rem] uppercase font-[600] '
              >First Name</label>
              <BaseInput
                id='first_name'
                name='first_name'
                type='text'
                value={form.first_name}
                onChange={handleChange}
                placeholder='e.g John'
              />
            </div>
            <div className='flex flex-col gap-[0.5rem] '>
              <label
                htmlFor='last_name'
                className='text-black-fade text-[0.75rem] uppercase font-[600] '
              >Last Name</label>
              <BaseInput
                id='last_name'
                name='last_name'
                type='text'
                value={form.last_name}
                onChange={handleChange}
                placeholder='e.g Doe'
              />
            </div>
            <div className='flex flex-col gap-[0.5rem] '>
              <label
                htmlFor='email'
                className='text-black-fade text-[0.75rem] uppercase font-[600] '
              >Email</label>
              <BaseInput
                id='email'
                name='email'
                type='email'
                value={form.email}
                onChange={handleChange}
                placeholder='e.g example@yahoo.com'
              />
            </div>
            <div className='flex flex-col gap-[0.5rem] '>
              <label
                htmlFor='gender'
                className='text-black-fade text-[0.75rem] uppercase font-[600] '
              >Gender</label>
              <Select
                id='gender'
                name="gender"
                value={form.gender}
                onChange={handleChange}
                sx={{
                  height: '2.875rem',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  borderColor: 'rgba(119,126,144,0.3)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(119,126,144,0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(119,126,144,0.8)',
                  },
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
            </div>
            <div className='flex flex-col gap-[0.5rem] '>
              <label
                htmlFor='address'
                className='text-black-fade text-[0.75rem] uppercase font-[600] '
              >Address</label>
              <BaseInput
                id='address'
                name='address'
                type='text'
                value={form.address}
                onChange={handleChange}
                placeholder='e.g St. 13 Angola - Nivea'
              />
            </div>
            <div className='flex flex-col gap-[0.5rem] '>
              <label 
                htmlFor='zip_code' 
                className='text-black-fade text-[0.75rem] uppercase font-[600] '
              >Zip code</label>
              <BaseInput 
                id='zip_code'
                name='zip_code'
                type='number'
                value={form.zip_code}
                onChange={handleChange}
                placeholder='e.g 345743'
              />
            </div>
            <button type='submit' hidden ></button>
          </form>
          <div className='flex justify-end items-center gap-[1rem]'>
            <PrimaryLink2 width='max-content' onClick={handleReset}>
              Reset
            </PrimaryLink2>
            <PrimaryLink width='max-content' onClick={handleSubmit}>
              <div className='flex items-center gap-[0.5rem]'>
                {loading ? <div className="loader"></div> : "Update"}
              </div>
            </PrimaryLink>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProfileSetting;
