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

  useEffect(() => {
    axiosInstance.post('/events/list/', {'request': 'post'})
      .then(response => {
        setEvents(response.data?.events);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);

  // :::::::::::::::::::::: USER 
  const { firstname }= useContext(AuthContext);
  
  // :::::::::::::::::::::: IMAGE 
  const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

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
                <StyledTableCell align="right">
                  <span className='text-black-light text-[1rem] '>Price ($)</span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span className='text-black-light text-[1rem] '>Address</span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span className='text-black-light text-[1rem] '>Date</span>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <StyledTableRow key={event.id}>
                  <StyledTableCell>
                    <img 
                      src={`https://res.cloudinary.com/${cloud_name}/${event.source_image}`} 
                      alt={event.name} 
                      className='w-[3rem] min-w-[3rem] h-[3rem] object-cover rounded-[8px] '
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">{event.name}</StyledTableCell>
                  <StyledTableCell align="right">{event.ticket_price}</StyledTableCell>
                  <StyledTableCell align="right">{event.address}</StyledTableCell>
                  <StyledTableCell align="right">{new Date(event.start_date).toLocaleDateString()}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DashboardLayout>
  );
}
