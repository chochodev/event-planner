import PrimaryLink from 'components/link/primary';
import { RiPriceTagLine } from "react-icons/ri";

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
    <div className='group flex flex-col min-w-[12rem] w-[90%] mx-auto rounded-[16px] overflow-hidden font-poppins cursor-pointer '>
      <div className='relative w-full flex justify-center overflow-hidden'>
        <img
          src={imageUrl || '/assets/images/lady-dancing.jpg'}
          alt='Event'
          className='w-full min-w-full h-[80vw] sm:h-[54vw] lg:h-[34vw] xxl:h-[20rem] object-cover rounded-[16px] '
        />

        {/* :::::::::::::::::: OVERLAY */}
        <div className='absolute z-[5] left-0 top-0 w-full h-full rounded-[16px] group-hover:bg-gray-900/30 ease-250'/>
        <p className='absolute z-[5] right-0 top-0 flex items-center text-center justify-center h-[2.875rem] w-[2.875rem] bg-secondary-dark text-primary text-[0.875rem] rounded-bl-[16px] px-[0.5rem] py-[0.1rem]'>${event.ticket_price}</p>

        {/* ::::::::::::::::::::: CTAs */}
        <div
          className='absolute z-[5] bottom-[-3rem] group-hover:bottom-[1rem] flex flex-col items-center justify-end h-full w-full transition-all ease-in-out duration-500 '
        >
          <div className='w-max rounded-[5rem] '>
            <PrimaryLink onClick={()=>handleEventClick(event.id)}>
              <div className='flex items-center gap-[0.5rem] text-[0.75rem] md:text-[1rem] '>
                Buy Ticket <RiPriceTagLine className='text-white ' />
              </div>
            </PrimaryLink>
          </div>
        </div>
      </div>

      {/* ::::::::::::::::::::: TEXT CONTENT */}
      <div className='flex flex-col gap-[0.5rem] pb-[2rem] pt-[0.875rem] '>
        <div className='flex justify-between items-center w-full'>
          <h2 className='text-black-dim font-[600] '>{event.name}</h2>
        </div>
        <div className='flex justify-end w-full'>
          <p className='text-secondary text-[0.75rem] font-[600] '>Available</p>
        </div>

        <div className='bg-black/20 h-[1px] w-full' />

        <div className='flex gap-[0.25rem] items-center w-full'>
          <p className='text-gray-600 text-[0.75rem] font-[800] font-secondary '>@:</p>
          <p className='text-gray-800 text-[0.75rem]'>{event.address}, {event.city}, {event.state}</p>
        </div>
        <div className='flex gap-[0.25rem] items-center w-full'>
          <p className='text-gray-600 text-[0.75rem] font-[600] font-secondary '>Date:</p>
          <p className='text-gray-800 text-[0.75rem]'>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard;