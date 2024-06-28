import React from 'react';
import { RiImageAddLine } from 'react-icons/ri';

const UploadImage = ({
  name,
  onChange,
  accept = 'image/*', 
  maxSize = 1024 * 1024 * 50, 
  errorMessage
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= maxSize) {
      onChange(file);
    } else {
      // Handle file size error
      console.error('File size exceeds the maximum limit');
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <label
        htmlFor={name}
        className="flex flex-col justify-center items-center gap-[1rem] bg-gray-100/50 h-60 w-full rounded-lg border-dashed border border-gray-300 cursor-pointer"
      >
        <div className='flex flex-col justify-center items-center gap-[1rem]'>
          <RiImageAddLine className='text-3xl text-gray-500' />
          <p className='text-sm text-gray-500 uppercase font-mono'>JPG, PNG, or WEBP</p>
        </div>
        <input
          className="block invisible w-full text-md text-slate-500 file:mr-4 file:py-3 file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          aria-describedby={`${name}_help`}
          id={name}
          name={name}
          type="file"
          accept={accept}
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
