import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from 'utils/axios';
import SeatPicker from './components/seat_picker';
import seat from './components/data';
import { RiPriceTagFill, RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import { Skeleton } from '@mui/material';
import HomeLayout from 'components/layout';
import dayjs from 'dayjs';
import PageNotFound from 'components/error_page/404';


const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({
    name: "Nill",
    ticket_price: "Nill",
    ticket_qty: "Nill",
    ticket_sold: "Nill",
    for_contact_phone: "Nill",
    for_contact_email: "Nill",
    start_date: "Nill",
    end_date: "Nill",
    description: "Nill",
    address: "Nill",
    city: "Nill",
    state: "Nill",
    zipcode: "Nill",
    
    // :::::::::::::::::::::::: FLOOR PLAN
    is_floor: "Nill",
    floorplanMode: 0,
    floorplanImage: "/assets/images/dp.jpg",
    floorplanLayout: [], //
    categoryplanLayout: [], //
  });
  const [loading, setLoading] = useState(true);
  const [is404, set404] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.post(`/events/event/`, {
          id: id
        });
        setEvent(response?.data);
        console.log(response?.data?.floorplanLayout);
      } catch (error) {
        console.error('Error fetching event details:', error);
        set404(true);
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
  
  // :::::::::::::::::: format date
  const formatDate = (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : 'No date value';
  };

  // :::::::::::::::::::::: PAGE NOT FOUND
  if (is404) {
    return <PageNotFound />
  }

  return (
    <HomeLayout>
      <div className='w-full min-h-screen text-gray-800 py-[2rem] lg:py-[4rem] font-poppins '>
        
        {/* :::::::::::::::::::::: SEAT ARRANGEMENT */}
        {event.floorplanMode === 0? 
          <SeatPicker 
            open={openSeats} 
            toggleDrawer={toggleDrawer} 
            seats={event.floorplanLayout}
            loading={loading}
          /> :
          (event.categoryplanLayout?
          <SeatPicker 
            open={openSeats} 
            toggleDrawer={toggleDrawer} 
            seats={event.categoryplanLayout}
            loading={loading}
          /> : 
          null)
        }

        <div className='relative flex justify-between max-lg:flex-col gap-y-[3rem] max-w-[75rem] mx-auto p-[2rem] lg:px-[4rem]'>
          {/* :::::::::::::::::::::::: IMAGE INFO */}
          <div className='lg:sticky top-[2rem] left-0 flex flex-col w-full lg:w-[55%] lg:h-[40rem] rounded-[16px] overflow-hidden shadow-[0_0_4px_2px_rgba(150,150,255,0.2)] '>
            {!loading &&
            <img
              src={imageUrl || '/assets/images/lady-with-glass.webp'}
              alt='Event'
              className='relative z-[2] w-full h-full object-contain  rounded-[12px] '
            />}

            <div className='relative w-full h-0 '>
              {!loading? 
              <img
                src={imageUrl || '/assets/images/lady-with-glass.webp'}
                alt='Event'
                className='absolute z-[1] bottom-0 left-0 blur-[4px] w-full h-[40rem] brightness-[0.5] object-cover '
              /> :
              <Skeleton width='100%' height='40rem' sx={{borderRadius: '16px'}} />
              }

              <button
                onClick={()=>setOpenImage(!openImage)}
                className='absolute z-[100] bottom-[1rem] right-[1rem] flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[10rem] bg-white text-secondary hover:scale-[1.1] ease-250 border-solid border-secondary border-[1px] '
              >
                {openImage? 
                <RiZoomOutLine className='text-[1.25rem]' /> : 
                <RiZoomInLine className='text-[1.25rem]' />}
              </button>
            </div>
          </div>

          {/* :::::::::::::::::::::::: TEXT INFORMATION */}
          <div className='flex justify-center w-full lg:w-[40%] lg:px-[2rem] '>
            <div className='flex flex-col gap-[1rem] w-full lg:max-w-[30rem] '>
              {/* :::::::::::::::: EVENT TITLE */}
              <h2 className='text-gray-800 font-[600] text-[2rem] md:text-[2.5rem] '>{event?.name}</h2>
              
              {/* :::::::::::::::: EVENT PRICE */}
              <div className='flex items-center justify-between gap-[1rem] '>
                <p className='text-gray text-[1.05rem] font-[600] '>{Number(event?.ticket_qty) - Number(event?.ticket_sold)} seats available </p>
                <p className='flex items-center gap-[0.25rem] text-[0.875rem] font-[600] text-orange-600 font-secondary ease-250 cursor-pointer '>
                  ${event?.ticket_price}
                  <RiPriceTagFill className='text-orange-600 text-[1.25rem] ' />
                </p>
              </div>

              {/* :::::::::::::::: EVENT DESCRIPTION */}
              <p className='text-[0.875rem] text-gray font-[400] '>{event?.description}</p>
              <a 
                href={`${window.location.origin}/event/${event?.domain_url}`}
                className='underline text-secondary-light font-[400] text-[0.875rem] '
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
                    <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>Owner (Host)</p>
                    <p className='text-gray-light text-[0.75rem] md:text-[0.875rem]'>{event?.name || 'Luthor'}</p>
                  </div>
                </div>
                <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>Contact: <span className='text-gray-light'>{event?.for_contact_phone}</span></p>
                <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>Email: <span className='text-gray-light'> {event?.for_contact_email}</span></p>
              </div>

              {/* :::::::::::::::::: TIME & LOCATION */}
              <div className='flex flex-col '>
                <p className='text-gray-light text-[0.75rem] md:text-[0.875rem] uppercase font-[600] mt-[1rem] '>Location</p>

                <div className='flex flex-col '>
                  {/* :::::::::::::::::::::: LOCATION */}
                  <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>Address: <span className='text-gray-light'>{event?.address}</span></p>
                  <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>Zip code: {event?.zipcode}</p>
                  <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>City: <span className='text-gray-light'>{event?.state}</span></p>
                  <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>State: <span className='text-gray-light'>{event?.city}</span></p>
                </div>
                
                <p className='text-gray-light text-[0.75rem] md:text-[0.875rem] uppercase font-[600] mt-[1rem] '>Date</p>       

                <div className='flex flex-col '>
                  {/* :::::::::::::::::::::: DATE  */}
                  <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>From: <span className='text-gray-light'>{formatDate(event?.start_date)}</span></p>
                  <p className='text-gray text-[0.75rem] md:text-[0.875rem]'>To: <span className='text-gray-light'>{formatDate(event?.end_date)}</span></p>
                </div>
              </div>

              {/* :::::::::::::::::::::::::: CTA */}
              <div className='flex flex-col gap-[1rem] items-center w-full p-[2rem] rounded-[16px] border-solid border-gray-200 border-[1px] shadow-[0_0_20px_3px_rgba(150,150,255,0.15)] '>
                <p className='text-secondary text-[0.75rem] md:text-[0.875rem] font-[600] '>Don&apos;t have a ticket? Get your tickets with ease now.</p>
                <div className='flex lg:flex-col justify-center gap-[1rem] w-full'>
                  <button
                    onClick={()=>setOpenSeats(!openSeats)}
                    className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.75rem] md:text-[0.875rem] font-[600] rounded-[32px] bg-black/5 text-secondary-dark hover:text-black-dim hover:bg-primary active:bg-black/5 hover:shadow-[0_0_10px_3px_rgba(150,150,255,0.2)] ease-250'
                  >Buy Seat Ticket</button>
                  <button
                    className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.75rem] md:text-[0.875rem] font-[600] rounded-[32px] bg-secondary-hover text-primary hover:bg-secondary active:bg-opacity-[70%] hover:shadow-[0_0_10px_5px_rgba(150,150,255,0.2)] ease-250'
                  >Quick Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default EventPage