import React, { useEffect, useState } from 'react';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ffffff',
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

  
  // :::::::::::::::::::::: IMAGE 
  const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  return (
    <DashboardLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Price ($)</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <StyledTableRow key={event.id}>
                <StyledTableCell component="th" scope="row">
                  <img 
                    src={`https://res.cloudinary.com/${cloud_name}/${event.source_image}`} 
                    alt={event.name} 
                    className='w-[4rem] min-w-[4rem] h-[4rem] object-cover rounded-[8px] '
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{event.name}</StyledTableCell>
                <StyledTableCell align="right">{event.price}</StyledTableCell>
                <StyledTableCell align="right">{event.address}</StyledTableCell>
                <StyledTableCell align="right">{new Date(event.date).toLocaleDateString()}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}
