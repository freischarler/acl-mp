import { useState } from 'react';
import { Button, Container, TextField, FormControl } from '@mui/material';
import { postCreateWeight } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export const CreateWeight = () => {
    const [weightParametersData, setWeightParametersData] = useState({
        weight_id: uuidv4(),
        value: ''
    });

    const [showCreateWeightForm, setShowCreateWeightForm] = useState(false);

    const handleChange = (e) => {
        setWeightParametersData({ ...weightParametersData, [e.target.name]: e.target.value });
    };

    const handleCreateWeight = (e) => {
        e.preventDefault();
        postCreateWeight(weightParametersData)
            .then(response => {
                if (response.status === 201) {
                    console.log('Weight parameters created successfully');
                }
            })
            .catch(error => {
                console.error('Error creating weight parameters:', error);
            });
        toggleCreateWeightForm();
    };

    const toggleCreateWeightForm = () => {
        setShowCreateWeightForm(!showCreateWeightForm);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Button onClick={toggleCreateWeightForm} variant="contained" color="primary">
                CREATE Weight Parameters
            </Button>
            {showCreateWeightForm && (
                <form onSubmit={handleCreateWeight}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            name="value"
                            label="Value"
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