import React from 'react';
import './style.css';

const Loader = () => {
  return (
    <div className='fixed z-[100] inset-0 w-screen h-screen flex justify-center bg-secondary items-center'>
      <div className="undulate-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>

  )
}

export default Loader