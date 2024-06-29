import React, { useState } from "react";
import { RiAddLine, RiArmchairLine } from "react-icons/ri";
import useCreateFormStore from '../../../../zustand/store';
import BaseInput from 'components/input';
import { TableIcon, TableIconHover } from 'components/icons/table_icon';

const TextForm2 = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  const { categoryplanLayout } = formValues;

  const [itemUpdate, setItemUpdate] = useState({ 
    name: "VIP 2", price: "50", number: "5", type: 'seat', desc: "This is for vip only."
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setItemUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const onRadioChange = (e) => {
    setItemUpdate((prevState) => ({ ...prevState, type: e.target.value }));
  };

  const isFormValid = () => {
    const { name, price, number, type, desc } = itemUpdate;
    return name && price && number && type && desc;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill out all required fields.");
      return;
    }
    setFormValues({ categoryplanLayout: [...categoryplanLayout, itemUpdate] });
    setItemUpdate({ name: "VIP 2", price: "50", number: "5", type: 'seat', desc: "This is for vip only." });
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
          required={true}
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
            required={true}
          />
        </div>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='number' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Number of {itemUpdate.type}s</label>
          <BaseInput 
            id='number'
            name='number'
            type='number'
            value={itemUpdate.number}
            onChange={onChange}
            placeholder='e.g 5'
            required={true}
          />
        </div>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='type' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Type</label>
          <div className="flex gap-[0.5rem] w-full">
            <label className='relative w-[48%] '>
              <input 
                type="radio"
                name="type" 
                value='seat'
                checked={itemUpdate.type === 'seat'} 
                onChange={onRadioChange}
                className="peer absolute z-[2] top-0 left-0 h-full w-full opacity-0 cursor-pointer" 
                required 
              />
              <div 
                className="flex items-center justify-center gap-[0.5rem] w-full p-[0.5rem] text-gray-500 bg-white border-solid border-[2px] border-black-light/20 rounded-[8px] peer-checked:border-secondary/50 peer-checked:text-secondary hover:text-gray-600 hover:bg-gray-100"
              >            
                  <p className="w-full">Seat</p>
                  <RiArmchairLine className='text-[1.25rem]' />
              </div>
            </label>
            <label className='relative w-[48%] '>
              <input 
                type="radio"
                name='type'
                value="table" 
                checked={itemUpdate.type === 'table'} 
                onChange={onRadioChange}
                className="peer absolute z-[2] top-0 left-0 h-full w-full opacity-0 cursor-pointer" 
                required 
              />
              <div 
                className="flex items-center justify-center gap-[0.5rem] w-full p-[0.5rem] text-gray-500 bg-white border-solid border-[2px] border-black-light/20 rounded-[8px] peer-checked:border-secondary/50 peer-checked:text-secondary hover:text-gray-600 hover:bg-gray-100"
              >            
                  <p className="w-full">Table</p>
                  {itemUpdate.type==='seat' ? <TableIcon /> : <TableIconHover />}
              </div>
            </label>
          </div>
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
            required={true}
            className='w-full h-[5.875rem] p-[1rem] text-[0.875rem] font-[600] rounded-[12px] border-solid border-black-light/30 border-[2px] focus:border-black-light/80 ease-250 resize-none overflow-hidden '
          ></textarea>
        </div>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="flex items-center justify-center sm:justify-self-end text-[0.875rem] h-[3rem] w-full rounded-[12px] bg-secondary hover:bg-secondary-hover ease-250 text-white"
      >
        Create Category
        <RiAddLine />
      </button>
    </form>
  );
};

export default TextForm2;