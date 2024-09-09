import { useState } from 'react';
import { Button, Container, TextField, FormControl } from '@mui/material';
import { postCreateAge } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export const CreateAge = () => {
    const [ageParametersData, setAgeParametersData] = useState({
        age_id: uuidv4(),
        type: '',
        min_age: '',
        max_age: ''
    });

    const [showCreateAgeForm, setShowCreateAgeForm] = useState(false);

    const handleChange = (e) => {
        setAgeParametersData({ ...ageParametersData, [e.target.name]: e.target.value });
    };

    const handleCreateAge = (e) => {
        e.preventDefault();
        postCreateAge(ageParametersData)
            .then(response => {
                if (response.status === 201) {
                    console.log('Age parameters created successfully');
                }
            })
            .catch(error => {
                console.error('Error creating age parameters:', error);
            });
        toggleCreateAgeForm();
    };

    const toggleCreateAgeForm = () => {
        setShowCreateAgeForm(!showCreateAgeForm);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Button onClick={toggleCreateAgeForm} variant="contained" color="primary">
                CREATE Age Parameters
            </Button>
            {showCreateAgeForm && (
                <form onSubmit={handleCreateAge}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            name="type"
                            label="Type"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            name="min_age"
                            label="Min Age"
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            name="max_age"
                            label="Max Age"
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            )}
        </Container>
    );
};