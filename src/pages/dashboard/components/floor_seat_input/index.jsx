import React, { useState } from "react";
import { RiAddLine, RiProfileLine, RiMoneyDollarCircleLine, RiListView } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TextField, InputAdornment } from "@mui/material";
import useCreateFormStore from '../../../../zustand/store';

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

  const onSubmit = (e) => {
    e.preventDefault();
    setFormValues({ floorplanLayout: [...floorplanLayout, itemUpdate] });
    setItemUpdate({ name: "", alias: "", price: "", people: "", serveware: "", desc: "" });
  };

  const styles = {
    input: {
      width: '100%'
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-lg:px-[1rem] h-max w-full lg:max-w-[18rem] ">
      <TextField
        label="Name"
        variant='outlined'
        name="name"
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdOutlineDriveFileRenameOutline className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
          ),
        }}
        value={itemUpdate.name}
        style={styles.input}
        placeholder="e.g. Parlour 1"
        onChange={onChange}
      />
          
      <div className='flex flex-col gap-[2rem] w-full '>
        <TextField
          label="Alias"
          variant='outlined'
          name="alias"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiProfileLine className='text-[1.25rem] text-slate-400 ' />
              </InputAdornment>
            ),
          }}
          value={itemUpdate.alias}
          placeholder="e.g. P 1"
          onChange={onChange}
          style={styles.input}
        />
        <TextField
          label="Price"
          variant='outlined'
          name="price"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiMoneyDollarCircleLine className='text-[1.25rem] text-slate-400 ' />
              </InputAdornment>
            ),
          }}
          value={itemUpdate.price}
          placeholder="e.g. 100"
          onChange={onChange}
          style={styles.input}
        />
        <TextField
          label="People"
          variant='outlined'
          name="people"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiMoneyDollarCircleLine className='text-[1.25rem] text-slate-400 ' />
              </InputAdornment>
            ),
          }}
          value={itemUpdate.people}
          placeholder="e.g. 3"
          onChange={onChange}
          style={styles.input}
        />
        <TextField
          label="Serve Wares"
          variant='outlined'
          name="serveware"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiMoneyDollarCircleLine className='text-[1.25rem] text-slate-400 ' />
              </InputAdornment>
            ),
          }}
          value={itemUpdate.serveware}
          placeholder="e.g. 5"
          onChange={onChange}
          style={styles.input}
        />
        <TextField
          label="Description"
          variant='outlined'
          name="desc"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiListView className='text-[1.25rem] text-slate-400 ' />
              </InputAdornment>
            ),
          }}
          value={itemUpdate.desc}
          placeholder="Children below 12 years are not allowed here"
          onChange={onChange}
          style={{ width: '100%', height: '5.5rem'}}
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="flex items-center justify-center sm:justify-self-end h-[3.5rem] w-full rounded-[8px] bg-[#2C3BFA] text-white"
        onClick={onSubmit}
      >
        Create Seat
        <RiAddLine />
      </button>
    </form>
  );
};

export default TextForm;
