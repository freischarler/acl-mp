import { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';

export const ManageTeam = () => {
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
    description: ''
  });

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post the data
    console.log(teamData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField name="team_id" label="Team ID" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="name" label="Name" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="country" label="Country" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="city" label="City" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="address" label="Address" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="phone" label="Phone" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="colors" label="Colors" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="image_url" label="Image URL" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="webpage" label="Webpage" variant="outlined" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="description" label="Description" variant="outlined" fullWidth margin="normal" multiline rows={4} onChange={handleChange} />
        <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  )
}