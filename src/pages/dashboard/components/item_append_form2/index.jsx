import React, { useState } from "react";
import { RiDeleteBin6Line, RiMenuFoldLine, RiCloseFill } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import useCreateFormStore from '../../../../zustand/store';


// Component for individual item inputs
const ItemAppendForm2 = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const { formValues, setFormValues } = useCreateFormStore();

  const onDelete = (index) => {
    const updatedItems = formValues.categoryplanLayout.filter((_, i) => i !== index);
    setFormValues({...formValues, categoryplanLayout: updatedItems});
  };

  return (
    <div 
      className={`fixed right-0 top-[6.5rem] ${openDrawer? 'translate-x-0 bg-black/40 w-screen ' : 'translate-x-[50rem] lg:translate-x-[32rem] xxl:translate-x-[25rem] w-[45rem]'} transition-all ease-in-out duration-500 z-[10] flex justify-end h-full shadow-[0_2px_3px_5px_rgba(44,59,250,0.1)] `}
    >
      {!openDrawer && 
        <button
          onClick={()=>setOpenDrawer(true)}
          className='flex lg:hidden items-center gap-[0.5rem] px-[1rem] py-[0.5rem] rounded-[8px] text-base hover:text-base-dark bg-white hover:bg-base-light/90 ease-250 translate-y-[0.5rem] translate-x-[-10.5rem] h-max shadow-[0_2px_5px_2px_rgba(54,116,218,0.2)] hover:shadow-[0_2px_15px_4px_rgba(54,116,218,0.2)] '
        >
          <RiMenuFoldLine className='text-[1.375rem]' />
          <p className='text-[0.75rem] font-[600] uppercase'>List</p>
        </button>
      } 
      <TableContainer component={Paper} className='bg-primary overflow-x-hidden w-full max-w-[45rem] px-[1rem] '>
        <div className='flex items-center gap-[2rem] py-[1rem] '>
          <button className='text-base bg-black-light/10 p-[0.5rem] rounded-[4px] hover:bg-black-light/20 ease-250'
            onClick={(e)=>{
              setOpenDrawer(!openDrawer);
            }}
          >
            {!openDrawer? 
            <RiMenuFoldLine /> :
            <RiCloseFill />}
          </button>
          <p className='text-[0.875rem] uppercase text-secondary-dark font-[600] '>List of Categories</p>
        </div>
        <Table sx={{ minWidth: 650 }} style={{borderRadius: '4px'}} aria-label="simple table"
          className='relative border-[1px] border-solid border-secondary-light/20 border-collapse rounded-[4px] '
        >
          <TableHead className='sticky top-0 z-[2] bg-slate-100 border-0 border-b-[1px] border-solid border-secondary-light/40 overflow-x-auto'>
            <TableRow>
              <TableCell>
                <h2 className='text-secondary-dark font-[600] text-[0.75rem] uppercase'>Name</h2>
              </TableCell>
              <TableCell>
                <h2 className='text-secondary-dark font-[600] text-[0.75rem] uppercase'>Alias</h2>
              </TableCell>
              <TableCell align="right">
                <h2 className='text-secondary-dark font-[600] text-[0.75rem] uppercase'>Price ($)</h2>
              </TableCell>
              <TableCell align="right">
                <h2 className='text-secondary-dark font-[600] text-[0.75rem] uppercase'>Number</h2>
              </TableCell>
              <TableCell align="right">
                <h2 className='text-secondary-dark font-[600] text-[0.75rem] uppercase'>Type</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='bg-base/20'>
            {formValues.categoryplanLayout.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={`group relative ${index%2 === 1 && 'bg-black-light/5'}`}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.alias}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.number}</TableCell>
                <TableCell align="right">{item.type}</TableCell>
                <button
                  type="button"
                  className="absolute top-[0.5rem] right-[-1rem] z-[30] flex items-center justify-center sm:justify-self-end h-[2rem] w-[2rem] rounded-[4px] group-hover:bg-slate-500 group-hover:hover:bg-orange-700 text-white group-hover:right-[0.5rem] invisible group-hover:visible ease-250 shadow-[0_0_5px_1px_rgba(255,255,255,0.15)] "
                  onClick={() => onDelete(index)}
                >
                  <RiDeleteBin6Line className='text-[0.875rem]' />
                </button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemAppendForm2;