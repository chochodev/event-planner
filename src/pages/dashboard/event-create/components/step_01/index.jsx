import React, { useState } from 'react';
import useCreateFormStore from '@/zustand/store';
import BaseInput from 'components/input';
import TicketVariants from './ticket_variant';

const Step1Form = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  const [ticketVariants, setTicketVariants] = useState(formValues.ticket_variants || []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const handleTicketVariantsChange = (variants) => {
    setTicketVariants(variants);
    setFormValues({ ticket_variants: variants });
  };

  return (
    <div className='flex flex-col gap-[2rem] '>
      <div className='flex flex-col '>
        <h2 className='text-[3rem] text-black-dim font-[600] '>Create an Event</h2>
        <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Event Details</p>
      </div>

      {/* ::::::::::::::::::::::::::::: EVENT */}
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Event name</label>
        <BaseInput 
          id='name'
          name='name'
          type='text'
          value={formValues.name}
          onChange={handleChange}
          placeholder='e.g Movies Show with Timmy'
        />
      </div>
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='description' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Description</label>
        <textarea
          id='description'
          name='description'
          value={formValues.description}
          onChange={handleChange}
          placeholder='e.g Movies Show with Timmy'
          className='w-full h-[5.875rem] p-[1rem] text-[0.875rem] font-[600] rounded-[12px] border-solid border-black-light/30 border-[2px] focus:border-black-light/80 ease-250 resize-none overflow-hidden '
        ></textarea>
      </div>

      {/* ::::::::::::::::::::: TICKET */}
      <p className='text-[1rem] text-black-light font-[600] underline underline-offset-[2px] '>Ticket Details</p>

      <div className='flex gap-[1rem] items-center w-full'>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='name' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >No of Ticket(s)</label>
          <BaseInput 
            id='ticket_qty'
            name='ticket_qty'
            type='number'
            value={formValues.ticket_qty}
            onChange={handleChange}
            placeholder='e.g 34'
          />
        </div>
        
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='name' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Ticket Price - $</label>
          <BaseInput 
            id='ticket_price'
            name='ticket_price'
            type='number'
            value={formValues.ticket_price}
            onChange={handleChange}
            placeholder='e.g 45'
          />
        </div>
      </div>

      <TicketVariants 
        ticketVariants={ticketVariants}
        setTicketVariants={handleTicketVariantsChange}
      />
    </div>
  )
}

export default Step1Form