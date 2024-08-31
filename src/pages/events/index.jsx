import { useEffect, useState } from 'react';
import BaseInput from 'components/input';
import HomeLayout from 'components/layout';
import { RiSearch2Line } from 'react-icons/ri';
import axiosInstance from 'utils/axios';
import { Skeleton, Pagination } from '@mui/material';
import { MdEventBusy } from 'react-icons/md';
import EventCard from 'components/event_card';
import { cl } from 'context/authStatusContext';

const EventList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/events/list/');
      setEvents(response.data);
      setFilteredEvents(response.data);
      cl('event data - events: ', response.data);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = () => {
    if (searchValue.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredEvents(filtered);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <HomeLayout>
      <div className='w-full py-[3rem] px-[1rem] sm:px-[2rem]'>
        <div className='flex flex-col gap-[3rem] items-center justify-center text-center max-w-[75rem] mx-auto w-full'>
          <form
            className='flex max-md:flex-col md:items-center justify-between gap-[1rem] w-full'
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          >
            <h2 className='text-gray-500 text-[1.25rem] font-[600] max-md:text-start'>
              Type your keywords
            </h2>
            <div className='flex items-center gap-[0.5rem] w-[20rem]'>
              <BaseInput
                name='search'
                type='text'
                value={searchValue}
                placeholder='Search ...'
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className='flex items-center justify-center h-[2.5rem] min-w-[2.5rem] w-[2.5rem] rounded-[5rem] bg-secondary text-primary hover:bg-secondary-hover active:bg-secondary-dark ease-250'
                onClick={handleSearch}
                type='button'
              >
                <RiSearch2Line className='text-[1rem]' />
              </button>
            </div>
          </form>

          {/* Horizontal line */}
          <hr className='w-full h-[1px] bg-gray-200' />

          <div className='w-full'>
            <div className='w-full overflow-hidden'>
              {loading ? (
                <div className='w-full overflow-hidden'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-[2rem] lg:gap-[3rem] gap-y-[3rem] w-full'>
                    {[1, 2, 3, 4].map((_, index) => (
                      <div className='flex flex-col gap-[1rem]' key={index}>
                        <Skeleton variant='rectangle' width='100%' height='20rem' sx={{ borderRadius: '16px' }} />
                        <Skeleton variant='rectangle' width='70%' height='3rem' sx={{ borderRadius: '8px' }} />
                        <Skeleton variant='rectangle' width='50%' height='1.25rem' sx={{ borderRadius: '8px' }} />
                        <Skeleton variant='rectangle' width='90%' height='1.25rem' sx={{ borderRadius: '8px' }} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {(!filteredEvents || filteredEvents.length === 0) ? (
                    <div className='relative flex items-center justify-center w-full'>
                      <Skeleton variant='rectangle' width='100%' height='15rem' sx={{ borderRadius: '4px' }}>
                      </Skeleton>
                      <div className='absolute flex items-center gap-[0.25rem] w-max text-[0.875rem] sm:text-[1.25rem] text-gray-400 font-[600] mx-auto'>
                        <MdEventBusy className='text-[1.5rem]' />No events to show at the moment!
                      </div>
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-[2rem] lg:gap-[3rem] gap-y-[3rem] w-full'>
                      {currentEvents.map((event, index) => (
                        <EventCard key={index} event={event} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredEvents.length > eventsPerPage && (
              <div className='flex justify-center mt-4'>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default EventList;
