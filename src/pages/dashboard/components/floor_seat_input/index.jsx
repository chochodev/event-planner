import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import useCreateFormStore from '../../../../zustand/store';
import BaseInput from 'components/input';

const TextForm = () => {
  const { formValues, setFormValues } = useCreateFormStore();
  const { floorplanLayout } = formValues;

  const [itemUpdate, setItemUpdate] = useState({ 
    name: "", 
    alias: "", 
    price: "", 
    people: "", 
    serveware: "",
    desc: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setItemUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormValid = () => {
    const { name, alias, price, people, serveware, desc } = itemUpdate;
    return name && alias && price && people && serveware && desc;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill out all required fields.");
      return;
    }
    setFormValues({ floorplanLayout: [...floorplanLayout, itemUpdate] });
    setItemUpdate({ name: "MEDIUM", alias: "M1", price: "20", people: "2", serveware: "2", desc: "This is for the average people" });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[1rem] max-lg:px-[1rem] h-max w-full lg:max-w-[18rem] ">
      <div className='flex flex-col gap-[0.5rem] '>
        <label 
          htmlFor='name' 
          className='text-black-fade text-[0.75rem] uppercase font-[600] '
        >Name</label>
        <BaseInput 
          id='name'
          name='name'
          type='text'
          value={itemUpdate.name}
          onChange={onChange}
          placeholder='e.g VIP 1'
          required={true}        
        />
      </div>
          
      <div className='flex flex-col gap-[1rem] w-full '>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='alias' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Alias</label>
          <BaseInput 
            id='alias'
            name='alias'
            type='text'
            value={itemUpdate.alias}
            onChange={onChange}
            placeholder='e.g V1'
            required={true}
          />
        </div>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='price' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Price - $</label>
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
            htmlFor='people' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >People</label>
          <BaseInput 
            id='people'
            name='people'
            type='number'
            value={itemUpdate.people}
            onChange={onChange}
            placeholder='e.g 5'
            required={true}
          />
        </div>
        <div className='flex flex-col gap-[0.5rem] '>
          <label 
            htmlFor='serveware' 
            className='text-black-fade text-[0.75rem] uppercase font-[600] '
          >Serve Wares</label>
          <BaseInput 
            id='serveware'
            name='serveware'
            type='number'
            value={itemUpdate.serveware}
            onChange={onChange}
            placeholder='e.g 5'
            required={true}
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
            placeholder='e.g This is exclusive for VIPs only'
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
        Create Seat
        <RiAddLine />
      </button>
    </form>
  );
};

export default TextForm;
