import { Box, Typography, Button, Grid } from '@mui/material';
import { QRCodeSVG }  from 'qrcode.react'; 
import PropTypes from 'prop-types';
import { useState } from 'react';
import { postCreatePreference } from '../services/api';
import { initMercadoPago, Wallet  } from '@mercadopago/sdk-react';
import { CircularProgress } from '@mui/material';


export const Ticket =({ id, orderId, ticketId, price, type, status }) => {
    
  initMercadoPago("TEST-d8cd0489-b809-47dd-a970-64bd64068db8", {
      locale: "es-AR",
  });

  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const qrValue = `https://www.aclweb.org`+`?i=${ticketId}&s=${status}`;



  const handlePay = async () => {
    setLoading(true);
    //const order_id = uuidv4();
    //!!TODO updateTicket becouse if you pay the ticket, it will change the status of all order_id tickets
  
    const objectPreference = {
      title: 'Pago entradas',
      quantity: 1,
      unit_price: price,
      order_id: orderId,
    }

    postCreatePreference(objectPreference)
    .then(response => {
      console.log('Preference created:', response.data);
      setPreferenceId(response.data.id);
    })
    .catch(error => {
      console.error('Error creating preference:', error);
    });
  };

  if (status === 'expired') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
        <Typography variant="h6">ID: #{id}</Typography>
        <Typography variant="h6">Entrada: {type.toUpperCase()}</Typography>
        {/*<Typography variant="h6">Estado: {status.toUpperCase()}</Typography>*/}
        <Typography variant='body2' style={{ color:'red' }} mt={2}>This ticket has expired</Typography>
      </Box>
    );
  }

  if (status === 'pending') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
        <Typography variant="h6">ID: #{id}</Typography>
        <Typography variant="h6">Entrada: {type.toUpperCase()}</Typography>
        <Typography variant="h6" style={{ color: status === 'pending' ? 'orange' : 'inherit' }}>Estado: {status.toUpperCase()}</Typography>
        <Typography variant='body2' mt={2}>You need to pay for this ticket</Typography>

          <Typography variant="body2" color="error" mt={2}>
            Warning: You have 2 hours to pay for this ticket. After that, it will expire.
          </Typography>

        <Typography variant='h6'>$ {price}</Typography>
        <Grid item xs={12}>
        { preferenceId == null ? (
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={handlePay} 
            disabled={loading}
            startIcon={loading ? <CircularProgress size="1rem" /> : null}
          >
            {loading ? 'Processing...' : 'Generar Pago'}
          </Button>
        ) : (
          <Wallet initialization={{ preferenceId: preferenceId }} />
        )}
        </Grid>
      </Box>
    );
  }
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
        <Typography variant="h6">ID: #{id}</Typography>
        <Typography variant="h6">Entrada: {type.toUpperCase()}</Typography>
        <Typography variant="h6">{status}</Typography>
        <br />

        <Box 
            display="flex" 
            justifyContent="center" 
            mt={2}
            sx={{
                width: 'fit-content',
                padding: 2,
                backgroundColor: '#fff',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            }}
            >
            <QRCodeSVG  value={qrValue} />
        </Box>
        <Typography variant="body2" color="error" mt={2}>Do not scan this QR code.</Typography>
    </Box>
  )
}

Ticket.propTypes = {
    id : PropTypes.number.isRequired,
    orderId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ticketId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };
