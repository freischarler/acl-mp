import { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import { postCreateEvent } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export const CreateEvent = () => {

    const [EventData, setEventData] = useState({
        event_id: '',
        name: '',
        country: '',
        city: '',
        address: '',
        phone: '',
        start_date: '',
        weighing_date: '',
        end_date: '',
        type: '',
        age: '',
        style: '',
        description: '',
      });
    


        
    const handleChange = (e) => {
        setEventData({ ...EventData, [e.target.name]: e.target.value });
    };
    
    const handleCreateEvent = (e) => {
        e.preventDefault();
        const updatedEventData = { ...EventData, event_id: uuidv4() };
        setEventData(updatedEventData);
        // Post the data
        postCreateEvent(updatedEventData).then(response => {
            if (response.status === 201) {
                console.log('Event created successfully');
            }
        })
        console.log(updatedEventData);
        toggleCreateEventForm();
    };

    const [showCreateEventForm, setShowCreateEventForm] = useState(false);

    const toggleCreateEventForm = () => {
    setShowCreateEventForm(!showCreateEventForm);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Button onClick={toggleCreateEventForm} variant="contained" color="primary">
                CREATE Event
            </Button>
            {showCreateEventForm && (
                <form onSubmit={handleCreateEvent}>
                    <TextField name="name" label="Name" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="country" label="Country" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="city" label="City" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="address" label="Address" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="phone" label="Phone" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="start_date" label="Start Date" type="datetime-local" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                    <TextField name="weighing_date" label="Weighing Date" type="datetime-local" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                    <TextField name="end_date" label="End Date" type="datetime-local" variant="outlined" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                    <TextField name="type" label="Type" placeholder='Type: tournament, clinic, etc.' variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="description" label="Description" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
                </form>
            )}
        </Container>
  )
}
