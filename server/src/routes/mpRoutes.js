import express from 'express';
import { MercadoPagoConfig, Preference } from "mercadopago";
import ticketService from '../services/ticketService.js';
import registrationService from '../services/registrationService.js';

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_DEV_ACCESS_TOKEN, 
    options: { timeout: 5000, idempotencyKey: 'abc' } 
});

const   router = express.Router();
router.post('/create_preference', async (req, res) => {
    console.log(req.body);
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    unit_price: Number(req.body.unit_price),
                    quantity: Number(req.body.quantity),
                    currency_id: 'ARS',
                }
            ],
            back_urls: {
                success: process.env.FRONTEND_URL + 'my-events',
                failure: process.env.FRONTEND_URL + 'my-events',
                pending: process.env.FRONTEND_URL + 'my-events',
            },
            auto_return: 'approved',
            notification_url: 'https://2bd9-152-168-148-145.ngrok-free.app/api/mp/webhook',
            external_reference: req.body.order_id,
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ 
            id: result.id 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
});

router.post('/create_registration_preference', async (req, res) => {
    console.log(req.body);
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    unit_price: Number(req.body.unit_price),
                    quantity: Number(req.body.quantity),
                    currency_id: 'ARS',
                }
            ],
            back_urls: {
                success: process.env.FRONTEND_URL + 'my-events',
                failure: process.env.FRONTEND_URL + 'my-events',
                pending: process.env.FRONTEND_URL + 'my-events',
            },
            auto_return: 'approved',
            notification_url: process.env.NOTIFICATION + '/api/mp/webhook',
            external_reference: req.body.order_id,
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ 
            id: result.id 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
});

router.post('/webhook', async (req, res) => {
    const paymentId = req.query['data.id'];
    console.log(req.body);
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.MP_DEV_ACCESS_TOKEN}`
            }
        }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            
            //check if data title is 'Registration'
            if (data.description === 'Registration' && data.status === 'approved') {
                // Update the registration status in your database
                registrationService.updateRegistracionByOrderId(data.external_reference, { status: 'approved' });
            }
            
            if (data.description === 'Tickets' && data.status === 'approved') {
                // Update the order status in your database
                ticketService.updateTicketsByOrderId(data.external_reference, { status: 'approved' });
            }
        }
    
        res.sendStatus(200);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: error.message})
    }
});

export default router;
