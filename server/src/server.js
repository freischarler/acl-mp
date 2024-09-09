import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mpRoutes from './routes/mpRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import eventPriceRoutes from './routes/eventPriceRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import userRoutes from './routes/userRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import qrsRoutes from './routes/qrsRoutes.js';
import styleRoutes from './routes/styleRoutes.js';
import ageRoutes from './routes/ageRoutes.js';
import weightRoutes from './routes/weightRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

import eventParametersRoutes from './routes/eventParametersRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());

/*/ Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};*/

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
    console.log('CORS-enabled for all origins');
  } else {
    app.use(cors({ origin: 'https://your-production-url.com' }));
    console.log('CORS-enabled for a single domain');
  }

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Set up DB connection and sync models
connectDB();

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/ages', ageRoutes);
app.use('/api/weights', weightRoutes)
app.use('/api/categories', categoryRoutes);

app.use('/api/login', loginRoutes);
app.use('/api/qrs', qrsRoutes);
app.use('/api/mp', mpRoutes);
app.use('/api/style', styleRoutes);

app.use('/api/events', eventRoutes);
app.use('/api/eventPrice', eventPriceRoutes);
app.use('/api/eventParameters', eventParametersRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/registration', registrationRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});