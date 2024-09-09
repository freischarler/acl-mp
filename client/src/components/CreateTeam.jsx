import { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { postCreateTeam } from '../services/api';

export const CreateTeam = () => {
    const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);
    const [teamData, setTeamData] = useState({
        team_id: '',
        name: '',
        country: '',
        city: '',
        address: '',
        phone: '',
        colors: '',
        image_url: '',
        webpage: '',
        description: '',
    });

    const handleChange = (e) => {
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };

        
    const toggleCreateTeamForm = () => {
        setShowCreateTeamForm(!showCreateTeamForm);
    }

    const handleCreateTeam = (e) => {
        e.preventDefault();
        const updatedTeamData = { ...teamData, team_id: uuidv4() };
        setTeamData(updatedTeamData);
        
        postCreateTeam(updatedTeamData).then(response => {
             if (response.status === 201) {
                 console.log('Team created successfully');
             }
        })
        console.log(updatedTeamData);
        toggleCreateTeamForm();
    };

  return (
    <Container component="main" maxWidth="xs">
            <Button onClick={toggleCreateTeamForm} variant="contained" color="primary">
                CREATE Team
            </Button>
            {showCreateTeamForm && (
                <form onSubmit={handleCreateTeam}>
                    <TextField name="name" label="Name" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="country" label="Country" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="city" label="City" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="address" label="Address" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="phone" label="Phone" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="colors" label="Colors" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="image_url" label="Image URL" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="webpage" label="Webpage" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <TextField name="description" label="Description" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
                    <Button type="submit" fullWidth variant="contained" color="primary">Create Team</Button>
                </form>
            )}
    </Container>
  )
}

