import { useEffect, useState } from 'react';
import { Table, TableBody, Box,  TableCell, TableContainer, Select, Typography, TableHead, MenuItem, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import { events } from '../data/data.js';
import { getEventsTicketsRegistrationsByUserId } from '../services/api.js';

export const MyEvents = () => {
    const [dataEvents, setDataEvents] = useState([]);
    const [dataTickets, setDataTickets] = useState([]); 
    const [dataRegistrations, setDataRegistrations] = useState([]);
    const [filter, setFilter] = useState('Vigent');
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem('user')
      if (!user) {
        navigate('/login');
      }
    }, [navigate]);
    

    const handleChange = (event) => {
      const newFilter = event.target.value;
      setFilter(newFilter);
      const filteredEvents = dataEvents.filter(event => {
        const StartEventDate = new Date(event.start_date);
        if (newFilter === 'Vigent') {
          return StartEventDate >= new Date();
        } else if (newFilter === 'Expired') {
          return StartEventDate < new Date();
        } else {
          return true;
        }
      });
      setDataEvents(filteredEvents);
    }


    useEffect(() => {
        getEventsTicketsRegistrationsByUserId(localStorage.getItem('user'))
        .then(response => {
            // Actualizar el estado con los datos obtenidos
            setDataEvents(response.data.events);
            setDataTickets(response.data.tickets);
            setDataRegistrations(response.data.registrations);
            //console.log(response.data);
            
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const handleEventTickets = (event) => (e) => {
      e.preventDefault();
        
      const eventTickets = dataTickets.filter(ticket => ticket.event_id === event.event_id);
      const registrations = dataRegistrations.filter(registration => registration.event_id === event.event_id);
      
      const metadata = {
        event: event,
        tickets: eventTickets,
        registrations: registrations,
      }
      navigate(`/my-tickets/${event.event_id}`, { state: metadata });
  };
  

  return (
    <>    
      <Typography
        variant="h4"
        align="center"
        mt={2}
      >
        My Events!</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Select value={filter} onChange={handleChange}  sx={{ 
            width: { xs: '50%', sm: '20%' }, 
            mt: 2,
            mb: 2,
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Vigent">Vigent</MenuItem>
          <MenuItem value="Expired">Expired</MenuItem>
        </Select>
        </Box>

    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Style</TableCell>    
        </TableRow>
      </TableHead>
      <TableBody>
          {dataEvents.map((event, index) => (
              <TableRow 
                key={index} 
                onClick={handleEventTickets(event)}
                style={{cursor: 'pointer'}}
              >
              <TableCell>{new Date(event.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.address} + {event.city} - {event.country}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.age}</TableCell>
              <TableCell>{event.style}</TableCell>
              </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}
