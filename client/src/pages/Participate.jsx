import { useEffect, useState } from 'react';
import { Grid, Button, FormControl, InputLabel, Container, Alert, Snackbar, Typography, Box } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { getUserById, postRegistration, postCreateRegistrationPreference } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { v4 as uuidv4 } from 'uuid';

export const Participate = () => {
    const location = useLocation();
    const event = location.state;
    console.log(event);
    const [user, setUser] = useState({});
    const [weightOptions, setWeightOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const navigate = useNavigate();
    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');

    // Add a new state variable for the alert
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    initMercadoPago("TEST-d8cd0489-b809-47dd-a970-64bd64068db8", {
        locale: "es-AR",
    });

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleWeightChange = (event) => {
        setSelectedWeight(event.target.value);
    };

    useEffect(() => {
        const userLS = localStorage.getItem('user');
        if (!userLS) {
            navigate('/login');
        }
        getUserById(userLS)
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => console.log(error));
    }, [navigate]);

    useEffect(() => {
        if (!user.gender_id) return;

        // Assuming event.parameters is already available in the `event` object
        const parameters = event.parameters[0]; // Assuming there's only one parameters object

        const genderGroup = parameters[user.gender_id];
        if (!genderGroup) return;

        // Determine the user's age group
        const birthDate = new Date(user.born);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const ageGroup = age >= 18 ? 'Senior' : 'Kids';

        const ageGroupParams = genderGroup[ageGroup];
        if (!ageGroupParams) return;

        const weights = [];
        const categories = [];

        ageGroupParams.forEach(param => {
            if (!weights.includes(param.weight)) {
                weights.push(param.weight);
            }
            if (!categories.includes(param.category)) {
                categories.push(param.category);
            }
        });

        setWeightOptions(weights.map((weight) => <option key={weight} value={weight}>{weight}</option>));
        setCategoryOptions(categories.map((category) => <option key={category} value={category}>{category}</option>));

        // Set price directly from event.price
        setPrice(event.price);
    }, [event.parameters, user.gender_id, user.born, event.price]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleBuy = async () => {
        setLoading(true);
        if (!selectedWeight || !selectedCategory) {
            setAlertMessage('Please select an age, weight and category.');
            setOpen(true);
            return;
        }

        const birthDate = new Date(user.born);
        const ageV = (new Date().getFullYear() - birthDate.getFullYear()) >= 18 ? 'Senior' : 'Kids';

        const order_id = uuidv4();

        const item = {
            user_id: user.user_id,
            event_id: event.event_id,
            category: selectedCategory, //amateur or profesional
            style_id: event.style_id,
            team_id: user.team_id,
            weight: selectedWeight,
            age: ageV,
            price: price,
            order_id
        }
        console.log(item)
        postRegistration(item)
            .then(response => {
                console.log(response.data);
                const objectPreference = {
                    title: 'Registration',
                    quantity: 1,
                    unit_price: event.price,
                    order_id
                }
                return postCreateRegistrationPreference(objectPreference);
            })
            .then(response => {
                console.log('Preference created:', response.data);
                setPreferenceId(response.data.id);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.error || 'An error occurred';
                setAlertMessage(errorMessage);
                setOpen(true);
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2rem',
            }}>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Weight</InputLabel>
                        <select value={selectedWeight} onChange={handleWeightChange}>
                            <option value="">Select Weight</option>
                            {weightOptions}
                        </select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <select value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Select Category</option>
                            {categoryOptions}
                        </select>
                    </FormControl>
                </Grid>
            </Grid>

            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', marginTop: 5 }}>
                {
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6">Price: {price}</Typography>
                    </Grid>
                }
            </Box>
            <Grid item xs={12}>
                {preferenceId == null ? (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleBuy}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size="1rem" /> : null}
                    >
                        {loading ? 'Processing...' : 'Generar Pago'}
                    </Button>
                ) : (
                    <Wallet initialization={{ preferenceId: preferenceId }} />
                )}
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}