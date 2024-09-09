import { useState, useEffect } from 'react';
import { FormControl, Button, TextField, Container, Select, InputLabel, MenuItem } from '@mui/material';
import { getEvents,postCreateTicket } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export const CreateTicket = () => {
    const [data, setData] = useState([]);

    const [ticketData, setTicketData] = useState({
        price_id: '',
        event_id: '',
        price: '',
        type: '',
        quantity: '',
        status: 'active',
        valid_from: '',
        valid_to: '',
      });
    
          
    useEffect(() => {
        // Get the data
        getEvents()
        .then(response => {
            console.log(response.data)
            setData(response.data);
        })
    }, []);

        
    const handleChange = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    };
    
    const handleCreateTicket = (e) => {
        e.preventDefault();
        const updatedTicketData = { ...ticketData, price_id: uuidv4(), quantity: parseInt(ticketData.quantity) };
        setTicketData(updatedTicketData);
        // Post the data
        postCreateTicket(updatedTicketData).then(response => {
            if (response.status === 201) {
                console.log('Ticket created successfully');
            }
        })
        console.log(updatedTicketData);
        toggleCreateTicketForm();
    };

    const [showCreateTicketForm, setShowCreateTicketForm] = useState(false);

    const toggleCreateTicketForm = () => {
    setShowCreateTicketForm(!showCreateTicketForm);
    };

  return (
    <Container component="main" maxWidth="xs">
        <FormControl fullWidth margin="normal">
        <Button onClick={toggleCreateTicketForm} variant="contained" color="primary">
        CREATE TICKET
        </Button>
        </FormControl>
        {showCreateTicketForm && (
        <form onSubmit={handleCreateTicket}>
            <FormControl fullWidth margin="normal">
            <InputLabel>Event</InputLabel>
            <Select
                labelId="event_id-label"
                id="event_id"
                name="event_id"
                value={ticketData.event_id}
                onChange={handleChange}
                label="Event ID"
            >
                {
                    data.map((item) => (
                    <MenuItem key={item.event_id} value={item.event_id}>
                        {item.name}
                    </MenuItem>
                    ))
                }
            </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField name="type" label="Type" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    />
            </FormControl>
                <TextField name="price" label="Price" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                <TextField name="valid_from" label="Valid From" type="datetime-local" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                <TextField name="valid_to" label="Valid To" type="datetime-local" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
        </form>
        )}
  </Container>
  )
}
