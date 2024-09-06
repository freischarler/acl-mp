import { useEffect, useState } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, Button, TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEventPrices, postCreatePreference, postTicket } from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import { initMercadoPago, Wallet  } from '@mercadopago/sdk-react';

const TicketRow = ({ ticket, index, handleQuantityChange }) => (
  
  <TableRow key={index}>
    <TableCell>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{ticket.type}</Typography>
        </Grid>
      </Grid>
    </TableCell>
    <TableCell>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
       
        <Select
          value={ticket.selectedQuantity}
          onChange={(event) => handleQuantityChange(index, event.target.value)}
          fullWidth
        >
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>

        </Grid>
      </Grid>
    </TableCell>
    <TableCell>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{ticket.price}</Typography>
        </Grid>
      </Grid>
    </TableCell>
  </TableRow>
);

export const Tickets = () => {
  
  initMercadoPago("TEST-d8cd0489-b809-47dd-a970-64bd64068db8", {
      locale: "es-AR",
  });

  const location = useLocation();
  const event = location.state;
  const navigate = useNavigate();

  console.log(event)

  // Replace these with your actual data
  const [tickets, setTickets] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  //console.log(preferenceId)
  useEffect(() => {
    getEventPrices(event.event_id)
    .then(response => {
      const updatedTickets = response.data.map(ticket => ({
        ...ticket,
        price: parseFloat(ticket.price),
        selectedQuantity: 0
      }));
      console.log(updatedTickets);
      setTickets(updatedTickets);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [event.event_id]);

  const [discountCode, setDiscountCode] = useState('');
  const [totalCost, setTotalCost] = useState(tickets.reduce((total, ticket) => total + (ticket.quantity * ticket.price), 0));

  const handleDiscountCodeChange = (event) => {
    setDiscountCode(event.target.value);
  };

  const applyDiscount = () => {
    const totalCostWithoutDiscount = tickets.reduce((total, ticket) => total + (ticket.selectedQuantity * ticket.price), 0);
    if (discountCode === 'CODE30') {
      setTotalCost(totalCostWithoutDiscount * 0.7);
    } else {
      setTotalCost(totalCostWithoutDiscount);
    }
  };

  
  const handleTypeChange = (index, value) => {
    const newTickets = [...tickets];
    newTickets[index].type = value;
    setTickets(newTickets);
  };

  const handleQuantityChange = (index, value) => {
   
    
    if (value < tickets[index].quantity) {  
      const newTickets = [...tickets];
      newTickets[index].selectedQuantity = value;  // Update selectedQuantity
      setTickets(newTickets);

      newTickets[index].requiredQuantity = value;

      const newTotalCost = newTickets.reduce((total, ticket) => total + (ticket.selectedQuantity * ticket.price), 0);
      if (discountCode === 'CODE30') {
        setTotalCost(newTotalCost * 0.7);
      } else {
        setTotalCost(newTotalCost);
      }
    }
    
  }

  const handlePay = async () => {
    setLoading(true);
    // check if almost one tickt is selected
    if (tickets.every(ticket => ticket.selectedQuantity === 0)) {
      alert('Please select at least one ticket');
      setLoading(false); // Set loading to false if no ticket is selected
      return;
    }

    const order_id = uuidv4();
    console.log('Counts of tickets:', tickets);

    tickets.forEach(ticket => {

      if (ticket.selectedQuantity === 0) {
        return;
      } 
      postTicket({
        //ticket_id: uuidv4(),  
        user_id: (localStorage.getItem('user')),
        type: ticket.type,
        event_id: event.event_id,
        price: totalCost / ticket.selectedQuantity,
        order_id,
        count: ticket.selectedQuantity,
        status: "pending"
      })
      .then(response => {
        console.log('Ticket created:', response.data);
      })
      .catch(error => {
        console.error('Error creating ticket:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    });

  
    const objectPreference = {
      title: 'Tickets',
      quantity: 1,
      unit_price: totalCost,
      order_id
    }
    postCreatePreference(objectPreference)
    .then(response => {
      console.log('Preference created:', response.data);
      setPreferenceId(response.data.id);
    })
    .catch(error => {
      console.error('Error creating preference:', error);
    });


  

    //navigate("/cart",  { state: { event: event, tickets: tickets } });
  };


  return (
<Grid container justifyContent="center">
  <Grid item xs={12} sm={6}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">{event.name}</Typography>
        <Typography variant="h6">{event.date}</Typography>
        <Typography variant="h6">{event.location}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type of Ticket</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TicketRow
                  ticket={ticket}
                  index={index}
                  handleTypeChange={handleTypeChange}
                  handleQuantityChange={handleQuantityChange}
                  key={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
      <TextField label="Discount Code" value={discountCode} onChange={handleDiscountCodeChange} />
      <Button onClick={applyDiscount}>Apply Discount</Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Total: $ {totalCost.toFixed(2)}</Typography>
      </Grid>
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
      <Button 
        variant="contained" 
        color="secondary" 
        fullWidth
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      </Grid>
    </Grid>
  </Grid>
</Grid>
  );
}

export default Tickets;

TicketRow.propTypes = {
  ticket: PropTypes.shape({
    type: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    selectedQuantity: PropTypes.number,
    price: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};