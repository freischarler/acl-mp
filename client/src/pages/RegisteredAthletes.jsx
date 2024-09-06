import  { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, Grid, Typography, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import { getRegisteredAthletesByEvent } from '../services/api';

export const RegisteredAthletes = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const event = location.state;
    console.log(event)
    const [registeredAthletes, setRegisteredAthletes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedAge, setSelectedAge] = useState('All');
    const [selectedWeight, setSelectedWeight] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');

    useEffect(() => {
      getRegisteredAthletesByEvent(event.event_id)
        .then(response => {
          setRegisteredAthletes(response.data);
          console.log(response.data)
        });
    }, [event.event_id]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleWeightChange = (event) => {
        setSelectedWeight(event.target.value);
    };

    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
    }

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    }

    let filteredAthletes = [];

    if (registeredAthletes && registeredAthletes.length > 0) {
        console.log(registeredAthletes  )
        filteredAthletes = registeredAthletes.filter((registration) => {
          return (selectedCategory && selectedCategory !== 'All' ? registration.category === selectedCategory : true) &&
                 (selectedWeight && selectedWeight !== 'All' ? registration.weight === selectedWeight : true) &&
                 (selectedAge && selectedAge !== 'All' ? registration.age === selectedAge : true) &&
                 (selectedGender && selectedGender !== 'All' ? registration.gender === selectedGender : true);
        });
    }

    //filter event parameters by unique categories
    console.log(event.parameters[0])
    const eventParameters = event.parameters[0];
    
    const uniqueWeights = new Set();
    const uniqueCategories = new Set();
    const uniqueGenders = new Set();

    // Iterate over each age group in the data
    for (const ageGroup in eventParameters) {
      // Iterate over each participant in the age group
      eventParameters[ageGroup].forEach(participant => {
        // Add the weight to the Set to ensure uniqueness
        uniqueWeights.add(participant.weight);
      });
    }

    for (const categoryGroup in eventParameters) {
      // Iterate over each participant in the age group
      eventParameters[categoryGroup].forEach(participant => {
        // Add the weight to the Set to ensure uniqueness
        uniqueCategories.add(participant.category);
      });
    }

    for (const genderGroup in eventParameters) {
      // Iterate over each participant in the age group
      eventParameters[genderGroup].forEach(participant => {
        // Add the weight to the Set to ensure uniqueness
        uniqueGenders.add(participant.gender.value);
      });
    }

    // Split the weights and categories strings into arrays
    const categoriesArray = ['All', ...Array.from(uniqueCategories)];
    const ageArray = ['All', ...Object.keys(eventParameters)];
    const weightsArray = ['All', ...Array.from(uniqueWeights)];
    const gendersArray = ['All', ...Array.from(uniqueGenders)];

    const handleBack = () => {
        navigate(-1);
    }

    return (
      <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="h6">Filter Athletes</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
                <InputLabel id="category-select-label">Gender</InputLabel>
                <Select
                id="category-select"
                value={selectedGender}
                onChange={handleGenderChange}
                >
                {gendersArray.map((gender) => (
                    <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                >
                {categoriesArray.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
                <InputLabel id="weight-select-label">Weight</InputLabel>
                <Select
                id="weight-select"
                value={selectedWeight}
                onChange={handleWeightChange}
                >
                {weightsArray.map((weight) => (
                    <MenuItem key={weight} value={weight}>{weight}</MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
                <InputLabel id="age-select-label">Age</InputLabel>
                <Select
                id="age-select"
                value={selectedAge}
                onChange={handleAgeChange}
                >
                {ageArray.map((age) => (
                    <MenuItem key={age} value={age}>{age}</MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>
        </Grid>
    
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Age</TableCell>
                {/* Add more headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAthletes.map((athlete) => (
                <TableRow key={athlete.registration_id}>
                  <TableCell component="th" scope="row">
                    {athlete.user}
                  </TableCell>
                  <TableCell align="right">{athlete.category}</TableCell>
                  <TableCell align="right">{athlete.weight}</TableCell>
                  <TableCell align="right">{athlete.age}</TableCell>
                  {/* Add more cells as needed */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <Grid item xs={12} sm={6}>
                  <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleBack} 
                  >
                      Volver
                  </Button>
        </Grid>
      </Container>
    );
};
