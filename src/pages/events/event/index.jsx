import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from 'utils/axios';
import SeatPicker from './components/seat_picker';
import seat from './components/data';
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";


const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({
    name: "Rana Nightout",
    ticket_price: "25.00",
    ticket_qty: "45",
    ticket_sold: "34",
    for_contact_phone: "1234567890",
    for_contact_email: "ranaeventmailer@gmail.com",
    start_date: "Monday, 12th May",
    end_date: "Tuesday, 13th May",
    description: "This is an open to all employees inclusive night out. It emcompases fun filled activities before the dance.",
    address: "St 12, Grandline road",
    city: "Laugh tale",
    state: "Luisi",
    zip_code: "129845",
    is_floor: "yes",

    // :::::::::::::::::::::::: FLOOR PLAN
    floorplanMode: 0,
    floorplanImage: "/assets/images/lady-with-glass.webp",
    floorplanLayout: [...seat?.seats] || [], //
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.post(`/events/event/`, {
          id: id
        });
        setEvent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const [openSeats, setOpenSeats] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenSeats(newOpen);
  };
  
  // ::::::::::::::::::::::::::: IMAGE STATE
  const [openImage, setOpenImage] = useState(false);

  // :::::::::::::::::::::: IMAGE 
  const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloud_name}/${event.source_image}`;
  console.log(cloud_name);

  return (
    <div className='w-full min-h-screen text-gray-800 py-[4rem] font-poppins '>
      
      {/* :::::::::::::::::::::: SEAT ARRANGEMENT */}
      {/* {event.floorplanLayout? 
        <SeatPicker 
          open={openSeats} 
          toggleDrawer={toggleDrawer} 
          seats={event.floorplanLayout} 
        /> :
        (event.categoryplanLayout?
        <SeatPicker 
          open={openSeats} 
          toggleDrawer={toggleDrawer} 
          seats={event.floorplanLayout} 
        /> : 
        null)
      } */}

      <div className='relative flex max-lg:flex-col gap-y-[3rem] max-w-[75rem] mx-auto p-[2rem] md:max-lg:px-[4rem]'>
        {/* :::::::::::::::::::::::: IMAGE INFO */}
        <div className='lg:sticky top-[2rem] left-0 flex flex-col w-full lg:w-[50%] lg:h-[40rem] rounded-[16px] overflow-hidden shadow-[0_0_4px_2px_rgba(150,150,255,0.2)] '>
          <img
            src={imageUrl || '/assets/images/lady-with-glass.webp'}
            alt='Event'
            className='relative z-1 w-full h-full object-contain '
          />

          <div className='relative w-full h-0 '>
            <img
              src={imageUrl || '/assets/images/lady-with-glass.webp'}
              alt='Event'
              className='absolute z-[-1] bottom-0 left-0 blur-[5px] w-full h-full object-cover '
            />

            <button
              onClick={()=>setOpenImage(!openImage)}
              className='absolute z-[100] bottom-[1rem] right-[1rem] flex items-center justify-center w-[3rem] h-[3rem] rounded-[8px] bg-white text-secondary hover:bg-secondary hover:text-gray-800 ease-250 border-solid border-secondary border-[1px] '
            >
              {openImage? 
              <RiZoomOutLine className='text-[1.5rem]' /> : 
              <RiZoomInLine className='text-[1.5rem]' />}
            </button>
          </div>
        </div>

        {/* :::::::::::::::::::::::: TEXT INFORMATION */}
        <div className='flex justify-center w-full lg:w-[50%] lg:px-[2rem] '>
          <div className='flex flex-col gap-[1rem] w-full lg:max-w-[30rem] '>
            {/* :::::::::::::::: EVENT TITLE */}
            <h2 className='text-gray-800 font-[700] text-[2.5rem] md:text-[3rem] '>{event?.name}</h2>
            
            {/* :::::::::::::::: EVENT PRICE */}
            <div className='flex items-center gap-[1rem] '>
              <p className='text-[1rem] font-[700] border-solid border-secondary border-[2px] rounded-[4px] text-secondary px-[0.5rem] py-[0.125rem] hover:scale-[1.03] hover:shadow-[0_0_5px_2px_rgba(255,255,255,0.2)] ease-250 cursor-pointer '>${event?.ticket_price}</p>
              <p className='text-gray text-[1.05rem] font-[700] '>{Number(event?.ticket_qty) - Number(event?.ticket_sold)} seats available </p>
            </div>

            {/* :::::::::::::::: EVENT DESCRIPTION */}
            <p className='text-[1rem] text-gray font-[400] '>{event?.description}</p>
            <a 
              href={`${window.location.origin}/event/${event?.domain_url}`}
              className='underline text-secondary font-[400] text-[1rem] '
            
            >{window.location.origin}/events/{event?.domaim_url}</a>

            {/* :::::::::::::::: EVENT OWNER INFO */}
            <div className='flex flex-col gap-[0.25rem]'>
              <div className='flex gap-[1rem] items-center'>
                <img
                  src={event?.owner_image || '/assets/images/lady-with-glass.webp'}
                  alt=''
                  className='w-[3rem] h-[3rem] min-w-[3rem] object-cover rounded-[50rem] '
                />
                <div className='flex flex-col '>
                  <p className='text-gray text-[0.875rem] md:text-[1rem]'>Owner (Host)</p>
                  <p className='text-gray-light text-[0.875rem] md:text-[1rem]'>{event?.name || 'Luthor'}</p>
                </div>
              </div>
              <p className='text-gray text-[0.875rem] md:text-[1rem]'>Contact: <span className='text-gray-light'>{event?.for_contact_phone}</span></p>
              <p className='text-gray text-[0.875rem] md:text-[1rem]'>Email: <span className='text-gray-light'> {event?.for_contact_email}</span></p>
            </div>

            {/* :::::::::::::::::: TIME & LOCATION */}
            <div className='flex flex-col '>
              <p className='text-gray-light text-[0.875rem] md:text-[1rem] uppercase font-[600] mt-[1rem] '>Location</p>

              <div className='flex flex-col '>
                {/* :::::::::::::::::::::: LOCATION */}
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>Address: <span className='text-gray-light'>{event?.address}</span></p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>Zip code: {event?.zipCode}</p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>City: <span className='text-gray-light'>{event?.state}</span></p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>State: <span className='text-gray-light'>{event?.city}</span></p>
              </div>
              
              <p className='text-gray-light text-[0.875rem] md:text-[1rem] uppercase font-[600] mt-[1rem] '>Date</p>       

              <div className='flex flex-col '>
                {/* :::::::::::::::::::::: DATE  */}
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>From: <span className='text-gray-light'>{event?.start_date}</span></p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>To: <span className='text-gray-light'>{event?.end_date}</span></p>
              </div>
            </div>

            {/* :::::::::::::::::::::::::: CTA */}
            <div className='flex flex-col gap-[1rem] items-center w-full p-[2rem] rounded-[8px] border-solid border-gray/20 border-[1px] shadow-[0_0_2px_4px_rgba(150,150,255,0.1)] '>
              <p className='text-gray text-[0.875rem] md:text-[1rem] font-[600] '>Don&apos;t have a ticket? Get your tickets with ease now.</p>
              <button
                onClick={()=>setOpenSeats(!openSeats)}
                className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.875rem] md:text-[1rem] font-[600] rounded-[32px] bg-secondary text-gray-800 hover:text-black hover:bg-gray-light border-solid border-[1px] border-white/20 active:bg-opacity-[70%] ease-200'
              >Buy Seat Ticket</button>
              <button
                className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.875rem] md:text-[1rem] font-[600] rounded-[32px] bg-secondary text-gray-800 hover:bg-secondary-hover border-solid border-[1px] border-white/20 active:bg-opacity-[70%] ease-200'
              >Quick Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage