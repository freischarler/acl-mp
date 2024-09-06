import express from 'express';
import  ticketController from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', (req, res, next) => ticketController.createTicket(req, res, next));
router.get('/:id', (req, res, next) => ticketController.getTicketById(req, res, next));
router.get('/', (req, res, next) => ticketController.getAllTickets(req, res, next));
router.get('/user/:userId', (req, res, next) => ticketController.getTicketsByUserId(req, res, next));
router.put('/:id', (req, res, next) => ticketController.updateTicket(req, res, next));
router.delete('/:id', (req, res, next) => ticketController.deleteTicket(req, res, next));

export default router;
