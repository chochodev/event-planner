import React from 'react';
import { RiHomeLine, RiCalendarLine, RiMapPinLine, RiCheckLine } from 'react-icons/ri';

const StepIcon = ({ active, completed, icon }) => {
  const icons = {
    1: <RiHomeLine />,
    2: <RiCalendarLine />,
    3: <RiMapPinLine />,
    4: <RiCheckLine />,
  };

  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-full
        ${active ? 'bg-blue-500 text-white' : 'bg-gray-300 text-white'}
        ${completed ? 'bg-green-500 text-white' : ''}`}
    >
      {icons[String(icon)]}
    </div>
  );
};

export default StepIcon;
