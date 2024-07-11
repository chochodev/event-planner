import React, { useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useCreateFormStore from '../../../../../zustand/store';
import BaseInput from 'components/input';
import dayjs from 'dayjs';
import LocationSelector from 'components/map';
import SwitchWithLabel from 'components/switch';


const Step2Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  const [startDate, setStartDate] = useState(dayjs(formValues.start_date));
  const [endDate, setEndDate] = useState(dayjs(formValues.end_date));

  const handleDateChange = (name, newValue) => {
    setFormValues({ [name]: newValue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };
  
  const handleSwitchChange = (newValue) => {
    setFormValues({ ...formValues, use_map: newValue });
    console.log(formValues.use_map)
  };

  return (
    <div className='flex flex-col gap-[2rem] '>
      {/* ::::::::::::::::::::::::: MANAGER DETAILS */}
      <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Contact Details</p>
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Company name</label>
        <BaseInput 
          id='organizer_company_name'
          name='organizer_company_name'
          type='text'
          value={formValues.organizer_company_name}
          onChange={handleChange}
          placeholder='e.g No 24. Street 134'
        />
      </div>
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Phone</label>
        <BaseInput 
          id='for_contact_phone'
          name='for_contact_phone'
          type='number'
          value={formValues.for_contact_phone}
          onChange={handleChange}
          placeholder='e.g +00345346345'
        />
      </div>
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Email</label>
        <BaseInput 
          id='for_contact_email'
          name='for_contact_email'
          type='text'
          value={formValues.for_contact_email}
          onChange={handleChange}
          placeholder='e.g Pacifista Kuma'
        />
      </div>

      {/* ::::::::::::::::::::::::: TIME */}
      <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Time</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='start_date' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Start Date & Time</label>
          <DateTimePicker
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              handleDateChange('start_date', newValue);
            }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '12px',
                border: '0px solid',
                borderColor: 'rgba(119,126,144,0)',
                '&:hover': {
                  borderColor: 'rgba(119,126,144,0)'
                },
                '&:focus': {
                  borderColor: 'rgba(119,126,144,0)'
                },
              },
              "& .Mui-focused": {
                borderColor: 'rgba(0,0,0,0)' 
              },
              "& .MuiOutlinedInput-root": {
                height: '3rem',
                borderRadius: '12px',
                border: '2px solid',
                borderColor: 'rgba(119,126,144,0)',
                '&:hover': {
                  borderColor: 'rgba(119,126,144,0)'
                },
                '&:focus': {
                  borderColor: 'rgba(119,126,144,0)'
                },
              },
            }}
            renderInput={(params) => <BaseInput {...params} />}
          />
        </div>

        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='end_date' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >End Date & Time</label>
          <DateTimePicker
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              handleDateChange('end_date', newValue);
            }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '12px',
                border: '0px solid',
                borderColor: 'rgba(119,126,144,0)',
                '&:hover': {
                  borderColor: 'rgba(119,126,144,0)'
                },
                '&:focus': {
                  borderColor: 'rgba(119,126,144,0)'
                },
              },
              "& .Mui-focused": {
                borderColor: 'rgba(0,0,0,0)' 
              },
              "& .MuiOutlinedInput-root": {
                height: '3rem',
                borderRadius: '12px',
                border: '2px solid',
                borderColor: 'rgba(119,126,144,0)',
                '&:hover': {
                  borderColor: 'rgba(119,126,144,0)'
                },
                '&:focus': {
                  borderColor: 'rgba(119,126,144,0)'
                },
              },
            }}
            renderInput={(params) => <BaseInput {...params} />}
          />
        </div>
      </LocalizationProvider>

      {/* ::::::::::::::::::::::::: LOCATION */}
      <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Location Details</p>

      <SwitchWithLabel
        checked={formValues.use_map}
        onChange={handleSwitchChange}
        label="Add seating arrangement"
      />  
      <div className={`${!formValues.use_map && 'hidden'} w-full`}>
        <span className='text-[0.875rem] text-black-light my-[-1rem]'>Pinpoint on your event venue</span>
        <LocationSelector 
          lat={formValues.lat}
          lng={formValues.lng}
          setLat={(lat) => setFormValues({ lat })}
          setLng={(lng) => setFormValues({ lng })}
        />
      </div>
      
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Address</label>
        <BaseInput 
          id='address'
          name='address'
          type='text'
          value={formValues.address}
          onChange={handleChange}
          placeholder='e.g No 24. Street 134'
        />
      </div>
      
      <div className='flex gap-[1rem] items-center w-full'>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='name' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >City</label>
          <BaseInput 
            id='city'
            name='city'
            type='text'
            value={formValues.city}
            onChange={handleChange}
            placeholder='e.g Akure'
          />
        </div>
        
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='name' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >State</label>
          <BaseInput 
            id='state'
            name='state'
            type='text'
            value={formValues.state}
            onChange={handleChange}
            placeholder='e.g Ondo'
          />
        </div>
        
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='name' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Zip code</label>
          <BaseInput 
            id='zipcode'
            name='zipcode'
            type='number'
            value={formValues.zipcode}
            onChange={handleChange}
            placeholder='e.g 086345'
          />
        </div>
      </div>
    </div>
  )
}

export default Step2Form