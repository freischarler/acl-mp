import { Ticket } from '../components/Ticket';
import { Box, Grid, Button, Typography } from '@mui/material';
//import { myTickets } from '../ticketData/ticketData.js';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

export const MyTickets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const metadata = location.state;

  //console.log(metadata)
  const registrationsData =  metadata.registrations;
  const ticketData = metadata.tickets;
  const eventData = metadata.event;
  console.log(registrationsData)
  console.log(ticketData)
  console.log(eventData)
  useEffect(() => {
    /*getRanking()
    .then(response => {
        // Actualizar el estado con los datos obtenidos
        console.log(response.ticketData)
        //setTicketData(response.ticketData);
    })
    .catch(error => {
      console.error('Error fetching ticketData:', error);
    });*/
   
    
    //console.log(registrationData)
  }, [metadata]);


  return (
    <>
     {registrationsData && registrationsData.map((registration, index) => (
      <Fragment key={`registration-${index}`}>
        <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5}}>
          Registraciones para {metadata.event.name}
        </Typography>
        <Ticket 
          id={index}
          ticketId={registration.registracion_id}
          status={registration.status}
          type='Atleta'
          price={Number(registration.price)}
        />
      </Fragment>
    ))}
    <Grid container spacing={3}>
      <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5}}>
            Tickets públicos para {metadata.event.name}
      </Typography>
      {ticketData.map((ticket, index) => (
        <Fragment key={`ticket-${index}`}>
  
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
            <Ticket 
              id={index}
              orderId={ticket.order_id}
              ticketId={ticket.ticket_id}
              status={ticket.status}
              price={Number(ticket.price)}
              type={ticket.type}
            />
          </Grid>
        </Fragment>
      ))}
     <Button 
        sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5, marginBottom: 10}} 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/my-events')}
      >
        Go to My Events
      </Button>

      <Box>

          
        
      </Box>
    </Grid>
    </>
  )
}
