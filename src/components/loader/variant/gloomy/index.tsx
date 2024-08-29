import React from 'react'

const Loader = () => {
  return (
    <div className='fixed z-[100] inset-0 w-screen h-screen flex justify-center bg-secondary items-center'>
      <div id="spinner-loader">
          <div id="spinnerin-loader"></div>
      </div>
    </div>
  )
}

export default Loader