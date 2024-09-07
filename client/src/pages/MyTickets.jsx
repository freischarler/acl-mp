import { Ticket } from '../components/Ticket';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

export const MyTickets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const metadata = location.state;

  const registrationsData = metadata.registrations;
  const ticketData = metadata.tickets;

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      {registrationsData && registrationsData.length > 0 && (
        <>
          <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5 }}>
            Registraciones para {metadata.event.name}
          </Typography>
          {registrationsData.map((registration, index) => (
            <Fragment key={`registration-${index}`}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Ticket 
                  id={index}
                  ticketId={registration.registracion_id}
                  status={registration.status}
                  type='Atleta'
                  price={Number(registration.price)}
                />
              </Grid>
            </Fragment>
          ))}
        </>
      )}

      {ticketData && ticketData.length > 0 && (
        <>
          <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5 }}>
            Tickets públicos para {metadata.event.name}
          </Typography>
          {ticketData.map((ticket, index) => (
            <Fragment key={`ticket-${index}`}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
        </>
      )}

      {(registrationsData && registrationsData.length > 0) || (ticketData && ticketData.length > 0) ? (
        <Button 
          sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5, marginBottom: 10 }} 
          variant="contained" 
          color="secondary" 
          onClick={handleBack}
        >
          Go to My Events
        </Button>
      ) : null}
    </>
  )
}