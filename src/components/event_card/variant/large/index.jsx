import { RiArrowRightLine } from "react-icons/ri";


const EventCard = ({ event }) => {
  function formatDate(date) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = weekdays[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    
    return `${dayOfWeek}, ${day}/${month}/${year}`;
  }

  const date = event.start_date ? new Date(event.start_date) : new Date();
  const formattedDate = formatDate(date);

  // :::::::::::::::::::::: IMAGE 
  const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloud_name}/${event.source_image}`;
  console.log(cloud_name);

  // ::::::::::::::::::::::: GO TO EVENT
  const handleEventClick = (id) => {
    window.location.href = `/events/event/${id}`;
  }

  return (
    <div className='group relative flex flex-col w-full h-[35rem] lg:h-[40rem] rounded-[24px] overflow-hidden font-poppins cursor-pointer '>
        
      {/* ::::::::::::::::::::: IMAGE OVERLAY */}
      <img
        src={imageUrl || '/assets/images/lady-dancing.jpg'}
        alt='Event'
        className='absolute top-0 left-0 w-full h-full object-cover rounded-[16px] '
      />

      <div className='absolute top-0 left-0 w-full h-full object-cover rounded-[16px] group-hover:bg-black/60 ease-250 ' />
      
      {/* ::::::::::::::::::::: TEXT CONTENT */}
      <div className='relative z-[1] flex flex-col items-start gap-[0.5rem] justify-end h-full px-[1rem] xlg:px-[2rem] py-[2rem] '>
        <h2 className='text-primary text-[1.875rem] font-[600] '>{event.name}</h2>
        
        <div className='bg-primary/50 h-[1px] w-full' />

        <div className='flex gap-[0.25rem] items-center w-full'>
          <p className='text-gray-200 text-[0.875rem] font-[800] font-secondary '>@:</p>
          <p className='text-gray-100 text-[0.875rem]'>{event.address}, {event.city}, {event.state}</p>
        </div>
        <div className='flex gap-[0.25rem] items-center w-full'>
          <p className='text-gray-200 text-[0.875rem] font-[600] font-secondary '>Date:</p>
          <p className='text-gray-100 text-[0.875rem]'>{formattedDate}</p>
        </div>
        
        <button 
          onClick={()=>handleEventClick(event.id)}
          className='flex items-center justify-center gap-[0.5rem] h-[2.5rem] w-max px-[1.5rem] bg-secondary-hover text-[0.75rem] md:text-[0.875rem] text-primary hover:bg-gray-100 hover:text-secondary-hover ease-250 rounded-[5rem]'
        >
          See Details <RiArrowRightLine className='text-[1rem] ' />
        </button>
      </div>
    </div>
  )
}

export default EventCard;