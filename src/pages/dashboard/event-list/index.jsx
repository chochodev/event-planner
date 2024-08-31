import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DashboardLayout from '../components/layout';
import axiosInstance from 'utils/axios';
import { AuthContext } from 'context/authStatusContext';
import { Skeleton } from '@mui/material';
import { Router } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00000005',
    color: '#000000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function MyEventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axiosInstance.post('/events/list/', {'request': 'post'})
      .then(response => {
        setEvents(response.data?.events);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // :::::::::::::::::::::: USER 
  const { firstname }= useContext(AuthContext);
  
  // :::::::::::::::::::::: IMAGE 
  const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

  // :::::::::::::::::::::: HANDLE ONCLICK
  const router = Router();
  const handleEventClick = (id) => {
    router(`/events/event/edit/${id}`)
  }

  return (
    <DashboardLayout>
      <div className='flex flex-col gap-[2rem] px-[1rem] md:px-[2rem] py-[2rem]'>
        <div className=''>
          <h2 className='text-[1.5rem] text-gray-600 font-[600]'>My Events</h2>
          <p className='text-[0.875rem] text-gray-500 '>This is all the events created by you, {firstname}!</p>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="my events table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <span className='text-black-light text-[1rem] '>Image</span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='text-black-light text-[1rem] '>Name</span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='text-black-light text-[1rem] '>Price ($)</span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='text-black-light text-[1rem] '>Address</span>
                </StyledTableCell>
                <StyledTableCell>
                  <span className='text-black-light text-[1rem] '>Date</span>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {loading? 
              <TableBody>
              {[...Array(4).keys()].map((_, index) => (
                <StyledTableRow 
                  key={index} 
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  <StyledTableCell>
                    <Skeleton variant='rectangle' height='3rem' width='3rem' sx={{borderRadius: '8px'}} />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Skeleton variant='Typography' size='1rem' width='5rem' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='Typography' size='1rem' width='2rem' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='Typography' size='1rem' width='4rem' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='Typography' size='1rem' width='3rem' />
                  </StyledTableCell>
                </StyledTableRow>
                ))}
              </TableBody> : 
              <>        
              {(events || events.length !== 0) &&
              <TableBody>
                {events?.map((event, index) => (
                  <StyledTableRow 
                    key={index} 
                    sx={{
                      cursor: 'pointer'
                    }}
                    onClick={()=>handleEventClick(event.id)}
                  >
                    <StyledTableCell>
                      <img 
                        src={`https://res.cloudinary.com/${cloud_name}/${event.source_image}`} 
                        alt={event.name} 
                        className='w-[3rem] min-w-[3rem] h-[3rem] object-cover rounded-[8px] '
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">{event.name}</StyledTableCell>
                    <StyledTableCell>{event.ticket_price}</StyledTableCell>
                    <StyledTableCell>{event.address}</StyledTableCell>
                    <StyledTableCell>{new Date(event.start_date).toLocaleDateString()}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>}
              </>
            }
          </Table>
        </TableContainer>
        
        {(!loading && !(events || events.length !== 0)) &&
        <div className='w-full'>
          <div className='relative flex justify-center items-center w-full'>
            <Skeleton 
              variant='rectangle' 
              height='6rem'
              width='100%'
              sx={{borderRadius: '16px'}} 
            />
            <p className='absolute z-[2] text-gray-500 text-[1rem] '>You don't have any active event</p>
          </div>
        </div>}
      </div>
    </DashboardLayout>
  );
}
