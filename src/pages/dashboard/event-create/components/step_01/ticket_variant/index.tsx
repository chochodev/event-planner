import React from 'react';
import BaseInput from 'components/input';
import { RiAddLine, RiCloseLine } from "react-icons/ri";

const TicketVariants = ({ ticketVariants, setTicketVariants }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...ticketVariants];
    updatedVariants[index] = { ...updatedVariants[index], [name]: value };
    setTicketVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setTicketVariants([...ticketVariants, { ticket_name: '', ticket_price: '', ticket_description: '' }]);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = ticketVariants.filter((_, i) => i !== index);
    setTicketVariants(updatedVariants);
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      <label className="text-black-fade text-[0.75rem] uppercase font-[600]">
        Ticket Variants
      </label>
      {ticketVariants.map((variant, index) => (
        <div key={index} className="flex flex-col gap-[0.5rem] border-b pb-[1rem]">
          <BaseInput
            name="ticket_name"
            value={variant.ticket_name}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. VIP"
          />
          <BaseInput
            name="ticket_price"
            type="number"
            value={variant.ticket_price}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. 100"
          />
          <BaseInput
            name="ticket_description"
            value={variant.ticket_description}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. Access to VIP area"
          />
          <button onClick={() => handleRemoveVariant(index)}
            className='group flex items-center justify-center gap-[0.5rem] h-[2.875rem] px-[1.5rem] bg-black/10 hover:bg-red-900/10 ease-250 rounded-[8px] '
          >
            <RiCloseLine className='text-black-light group-hover:text-red-900/80 ' />
            <span className='text-black-light text-[0.75rem] font-[600] uppercase group-hover:text-red-900/80 ease-250'>Remove</span>
          </button>
        </div>
      ))}
      <button onClick={handleAddVariant}
        className='group flex items-center justify-center gap-[0.5rem] h-[2.875rem] px-[1.5rem] bg-secondary-light hover:bg-secondary-hover ease-250 rounded-[8px] '
      >
        <RiAddLine className='text-primary ' />
        <span className='text-primary text-[0.75rem] font-[600] uppercase ease-250'>Add</span>
      </button>
    </div>
  );
};

export default TicketVariants;
