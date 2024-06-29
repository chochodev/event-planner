import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import useCreateFormStore from '../../../../zustand/store';
import BaseInput from 'components/input';

const TextForm2 = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  const { categoryplanLayout } = formValues;

  const [itemUpdate, setItemUpdate] = useState({ 
    name: "VIP 2", price: "50", number: "5", desc: "This is for vip only."
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setItemUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormValues({ categoryplanLayout: [...categoryplanLayout, itemUpdate] });
    setItemUpdate({ name: "VIP 2", price: "50", number: "5", desc: "This is for vip only." });
  };


  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[1rem] max-lg:px-[1rem] h-max w-full lg:max-w-[18rem] ">
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Category Name</label>
        <BaseInput 
          id='name'
          name='name'
          type='text'
          value={itemUpdate.name}
          onChange={onChange}
          placeholder='e.g VIPs'
        />
      </div>
          
      <div className='flex flex-col gap-[1rem] w-full '>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='price' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Price per seat - $</label>
          <BaseInput 
            id='price'
            name='price'
            type='number'
            value={itemUpdate.price}
            onChange={onChange}
            placeholder='e.g 50'
          />
        </div>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='number' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Number of seats</label>
          <BaseInput 
            id='number'
            name='number'
            type='number'
            value={itemUpdate.number}
            onChange={onChange}
            placeholder='e.g 5'
          />
        </div>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='desc' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Description</label>
          <textarea
            id='desc'
            name='desc'
            value={itemUpdate.desc}
            onChange={onChange}
            placeholder='e.g This section is exclusive for VIPs only'
            className='w-full h-[5.875rem] p-[1rem] text-[0.875rem] font-[600] rounded-[12px] border-solid border-black-light/30 border-[2px] focus:border-black-light/80 ease-250 resize-none overflow-hidden '
          ></textarea>
        </div>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="flex items-center justify-center sm:justify-self-end text-[0.875rem] h-[3rem] w-full rounded-[12px] bg-secondary hover:bg-secondary-hover ease-250 text-white"
        onClick={onSubmit}
      >
        Create Category
        <RiAddLine />
      </button>
    </form>
  );
};

export default TextForm2;
