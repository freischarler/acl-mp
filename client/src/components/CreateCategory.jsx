import { useState } from 'react';
import { Button, Container, TextField, FormControl } from '@mui/material';
import { postCreateCategory } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export const CreateCategory = () => {
    const [categoryParametersData, setCategoryParametersData] = useState({
        category_id: uuidv4(),
        name: ''
    });

    const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);

    const handleChange = (e) => {
        setCategoryParametersData({ ...categoryParametersData, [e.target.name]: e.target.value });
    };

    const handleCreateCategory = (e) => {
        e.preventDefault();
        postCreateCategory(categoryParametersData)
            .then(response => {
                if (response.status === 201) {
                    console.log('Category parameters created successfully');
                }
            })
            .catch(error => {
                console.error('Error creating category parameters:', error);
            });
        toggleCreateCategoryForm();
    };

    const toggleCreateCategoryForm = () => {
        setShowCreateCategoryForm(!showCreateCategoryForm);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Button onClick={toggleCreateCategoryForm} variant="contained" color="primary">
                CREATE Category Parameters
            </Button>
            {showCreateCategoryForm && (
                <form onSubmit={handleCreateCategory}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            name="name"
                            label="Name"
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