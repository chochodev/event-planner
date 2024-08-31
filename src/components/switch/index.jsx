import React from 'react';
import { Switch } from '@mui/material';

const SwitchWithLabel = ({ checked = false, onChange=prop=>{}, label='default label' }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <button
      className={`flex items-center justify-between cursor-pointer px-[1rem] p-[0.375rem] rounded-[12px] ${checked ? 'bg-secondary-hover/10 ' : 'bg-gray-500/10 hover:bg-gray-500/20'} ease-250`}
      onClick={handleToggle}
    >
      <p className={`${checked? 'text-secondary-hover' : 'text-gray-700'} text-[0.875rem] font-[600] `}>{label}</p>
      <Switch
        checked={checked}
        onChange={(e) => e.stopPropagation()}
        inputProps={{ 'aria-label': label }}
        color="primary"
      />
    </button>
  );
};

export default SwitchWithLabel;
