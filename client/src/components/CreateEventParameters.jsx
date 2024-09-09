import { useState, useEffect } from 'react';
import { Button, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getEventParameters, postCreateEventParameters } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export const CreateEventParameters = () => {
    const [eventsParametersData, setEventsParametersData] = useState({
        events: [],
        categories: [],
        genders: [],
        weights: [],
        ages: []
    });

    const [eventParametersData, setEventParametersData] = useState({
        event_parameters_id: uuidv4(),
        event_id: '',
        category_id: '',
        gender_id: '',
        weight_id: '',
        age_id: ''
    });

    const [showCreateEventParametersForm, setShowCreateEventParametersForm] = useState(false);

    useEffect(() => {
        getEventParameters()
            .then(response => {
                setEventsParametersData(response.data);
            })
            .catch(error => {
                console.error('Error fetching event parameters:', error);
            });
    }, []);

    const handleChange = (e) => {
        setEventParametersData({ ...eventParametersData, [e.target.name]: e.target.value });
    };

    const handleCreateEventParameters = (e) => {
        e.preventDefault();
        postCreateEventParameters(eventParametersData)
            .then(response => {
                if (response.status === 201) {
                    console.log('Event parameters created successfully');
                }
            })
            .catch(error => {
                console.error('Error creating event parameters:', error);
            });
        toggleCreateEventParametersForm();
    };

    const toggleCreateEventParametersForm = () => {
        setShowCreateEventParametersForm(!showCreateEventParametersForm);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Button onClick={toggleCreateEventParametersForm} variant="contained" color="primary">
                CREATE Event Parameters
            </Button>
            {showCreateEventParametersForm && (
                <form onSubmit={handleCreateEventParameters}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Event</InputLabel>
                        <Select
                            name="event_id"
                            value={eventParametersData.event_id}
                            onChange={handleChange}
                        >
                            {eventsParametersData.events.map(event => (
                                <MenuItem key={event.event_id} value={event.event_id}>
                                    {event.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category_id"
                            value={eventParametersData.category_id}
                            onChange={handleChange}
                        >
                            {eventsParametersData.categories.map(category => (
                                <MenuItem key={category.category_id} value={category.category_id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender_id"
                            value={eventParametersData.gender_id}
                            onChange={handleChange}
                        >
                            {eventsParametersData.genders.map(gender => (
                                <MenuItem key={gender.gender_id} value={gender.gender_id}>
                                    {gender.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Weight</InputLabel>
                        <Select
                            name="weight_id"
                            value={eventParametersData.weight_id}
                            onChange={handleChange}
                        >
                            {eventsParametersData.weights.map(weight => (
                                <MenuItem key={weight.weight_id} value={weight.weight_id}>
                                    {weight.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Age</InputLabel>
                        <Select
                            name="age_id"
                            value={eventParametersData.age_id}
                            onChange={handleChange}
                        >
                            {eventsParametersData.ages.map(age => (
                                <MenuItem key={age.age_id} value={age.age_id}>
                                    {age.type} ({age.min_age} - {age.max_age})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            )}
        </Container>
    );
};