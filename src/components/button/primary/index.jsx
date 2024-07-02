import React from 'react'

const PrimaryButton = ({ onClick=()=>{}, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-[0.875rem] font-[600] text-black-dim px-[1.5rem] h-[2.5rem] border-solid border-[2px] border-black-light/20 hover:bg-secondary-hover hover:text-primary ease-250 rounded-[3rem] `}
    >{children}</button>
  )
}

export default PrimaryButton