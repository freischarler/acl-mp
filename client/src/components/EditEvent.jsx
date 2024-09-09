import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Container } from '@mui/material';
import { getEvents, updateEvent } from '../services/api';

export const EditEvents = () => {
    const [events, setEvents] = useState([]);
    const [editIdx, setEditIdx] = useState(-1);
    const [showEditEventForm, setShowEditEventForm] = useState(false);

    const toggleEditEventForm = () => {
        setShowEditEventForm(!showEditEventForm);
    };

    useEffect(() => {
        getEvents()
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEvents = [...events];
        updatedEvents[index] = { ...updatedEvents[index], [name]: value };
        setEvents(updatedEvents);
    };

    const handleSave = (index) => {
        const event = events[index];
        updateEvent(event.event_id, event)
            .then(response => {
                if (response.status === 200) {
                    console.log('Event updated successfully');
                    setEditIdx(-1);
                }
            })
            .catch(error => {
                console.error('Error updating event:', error);
            });
    };

    const handleEdit = (index) => {
        setEditIdx(index);
    };

    const handleCancel = () => {
        setEditIdx(-1);
    };

    return (
        <Container component="main" maxWidth="xs">
        <Button onClick={toggleEditEventForm} variant="contained" color="primary">
            EDIT EVENT
        </Button>
        {showEditEventForm && (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Style</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event, index) => (
                            <TableRow key={event.event_id}>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="name"
                                            value={event.name}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="country"
                                            value={event.country}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.country
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="city"
                                            value={event.city}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.city
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="address"
                                            value={event.address}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.address
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="phone"
                                            value={event.phone}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.phone
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="start_date"
                                            type="datetime-local"
                                            value={event.start_date}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        new Date(event.start_date).toLocaleString()
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="end_date"
                                            type="datetime-local"
                                            value={event.end_date}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        new Date(event.end_date).toLocaleString()
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="type"
                                            value={event.type}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.type
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="style_id"
                                            value={event.style_id}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.style_id
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="status"
                                            value={event.status}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    ) : (
                                        event.status
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <>
                                            <Button onClick={() => handleSave(index)}>Save</Button>
                                            <Button onClick={handleCancel}>Cancel</Button>
                                        </>
                                    ) : (
                                        <Button onClick={() => handleEdit(index)}>Edit</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </Container>
    );
};