import React from 'react';
import { RiUploadLine } from 'react-icons/ri';

const UploadImage = ({
  name,
  onChange,
  accept = 'image/*', 
  maxSize = 1024 * 1024 * 50, 
  errorMessage
}) => {
  const handleFileChange = () => {

  }

  return (
    <div className="flex flex-col justify-center items-center w-full space-x-6 ">
      <label
        htmlFor={name}
        className="flex flex-col justify-center items-center gap-[1rem] bg-base-light/20 h-[35rem] w-full max-w-[45rem] rounded-[8px] border-dashed border-[1px] border-base-light/50 cursor-pointer "
      >
        <div className='flex flex-col justify-center items-center gap-[1rem] '>
          <RiUploadLine className='text-[1.875rem] text-base-light ' />
          <p className='text-[0.875rem] text-base-light'>Add a Floor Plan</p>
          <p className='text-[0.75rem] text-base-light uppercase font-mono'>Upload Image</p>
        </div>
        <span className='sr-only'>{name}</span>

        <input
          className="block invisible w-full text-md text-slate-500 file:mr-[1rem] file:py-[0.875rem] file:px-[1.25rem] file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          aria-describedby={`${name}_help`}
          id={name}
          name={name}
          type="file"
          onChange={handleFileChange}
        />
      </label>
      {errorMessage && 
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      }
    </div>
  )
}

export default UploadImage;
