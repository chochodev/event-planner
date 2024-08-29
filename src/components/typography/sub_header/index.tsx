import React from 'react'

const SubHeader = ({ children }) => {
  return (
    <h2
      className='text-[2.5rem] font-[700] font-secondary '
    >
      {children}
    </h2>
  )
}

export default SubHeader