import { Box, Button, Container, Grid, Card, CardContent,ListItem, List, Typography, ListItemText } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getParametersByEvent } from '../services/api';

export const Event = () => {
    const location = useLocation();
    const event = location.state;
    const navigate = useNavigate();
    
    //get weights and categories from event
    useEffect(() => {
        getParametersByEvent(event.event_id)
        .then(response => {
            if (Array.isArray(response.data)) {
                const parameters = response.data.reduce((acc, item) => {
                    // Check if the age group already exists
                    if (!acc[item.age]) {
                        acc[item.age] = []; // Initialize the age group array if it doesn't exist
                    }
                    // Push the category and weight information into the age group array
                    acc[item.age].push({
                        category: item.category,
                        weight: item.weight,
                        gender: item.gender,
                    });
                    return acc;
                }, {});
    
                // Assign the aggregated unique values to the event object
                event.parameters = [parameters]; // Wrap the result object in an array
            } else {
                // Handle the case where response.data is not an array
                console.error('Expected an array but got:', typeof response.data);
            }
        });
    }, [event]);

    const handleBuyTicket = () => {
      if (localStorage.getItem("user") === null) {
        navigate("/login");
      } else {
        //convert event to object

        navigate(`/buy-ticket`,  { state: event })
      }
    };

    const handleParticipate = () => {
      if (localStorage.getItem("user") === null) {
        navigate("/login");
      } else {
        navigate("/participate", { state: event });
      }
    }

    const handleRegisteredAthletes = () => {
        navigate("/registered-athletes", { state: event });
    }
      
    const handleBack = () => {
        navigate(-1);
    }

    const handleMatches = () => {
        navigate(`/events/${event.event_id}/matches`, { state: event });
    }

    return (
      <Box sx={{ mt: 4 }}>
      <Container>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Card>
                      <CardContent>
                        <List>
                          <ListItem>
                            <Typography variant="h2" align="center">{event.name}</Typography>
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="" secondary={`${event.type}, ${event.age} - ${event.style}`} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Location" secondary={`${event.address}, ${event.city} - ${event.country}`} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Weighing Date" secondary={new Date(event.weighing_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })+'hs'} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Start Date" secondary={new Date(event.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })+'hs'} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="End Date" secondary={new Date(event.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })+'hs'} />
                          </ListItem>
                          <ListItem>
                              <ListItemText primary="Description" secondary={event.description} />
                          </ListItem>
                      </List>
                      </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleBuyTicket} 
                  >
                      Entrada Pública
                  </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleParticipate} 
                  >
                      Competir
                  </Button>
              </Grid>

              <Grid item xs={12} sm={4}>
                  <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleRegisteredAthletes} 
                  >
                      Lista de competidores
                  </Button>
              </Grid>


              <Grid item xs={12} sm={4}>
                  <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth 
                      sx={{ m: 1 }}
                      onClick={handleMatches} 
                  >
                      Luchas
                  </Button>
              </Grid>

              <Grid item xs={12} sm={4}>
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
          </Grid>
      </Container>
  </Box>
    )
}
