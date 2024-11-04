import './style.css';

const Loader = () => {
  return (
    <div className='fixed z-[100] inset-0 w-screen h-screen flex flex-col justify-center bg-primary items-center'>
      <p className='font-dance text-[1.5rem] text-secondary font-[800] mb-[1.5rem] ml-[1rem] '>Loading...</p>
      <div className="undulate-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className='text-[0.75rem] text-secondary-light mt-[1rem] uppercase'>Page will be ready soon.</p>
    </div>

  )
}

export default Loader;