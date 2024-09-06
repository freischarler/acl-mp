import { useState } from 'react';
import { Grid, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { postCreatePreference } from '../services/api';

export const Ticket = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [price, setPrice] = useState('');

  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  const handleBuy = async () => {
    const objectPreference = {
      title: 'Ticket',
      quantity: 1,
      unit_price: price,
    }
    postCreatePreference(objectPreference)
    .then(response => {
      console.log('Preference created:', response.data);
      setPreferenceId(response.data.id);
    })
    .catch(error => {
      console.error('Error creating preference:', error);
    });
  };

  initMercadoPago("TEST-d8cd0489-b809-47dd-a970-64bd64068db8", {
      locale: "es-AR",
  });

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', textAlign: 'center' }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="ticket-price-label">Ticket Price</InputLabel>
          <Select
            labelId="ticket-price-label"
            value={price}
            onChange={handleChange}
            label="Ticket Price"
          >
            <MenuItem value={10}>$10</MenuItem>
            <MenuItem value={50}>$50</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Button variant="contained" color="primary" fullWidth onClick={handleBuy} disabled={!price}>
          Buy
        </Button>
        { preferenceId && <Wallet initialization={{ preferenceId }} />}
      </Grid>
    </Grid>
  );
};