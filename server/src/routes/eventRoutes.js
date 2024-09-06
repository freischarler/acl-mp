import  express from 'express';
import  eventController from '../controllers/eventController.js';

const router = express.Router();

router.post('/', (req, res, next) => eventController.createEvent(req, res, next));
router.get('/:id', (req, res, next) => eventController.getEventById(req, res, next));
router.get('/', (req, res, next) => eventController.getAllEvents(req, res, next));
router.get('/user/:userId', (req, res, next) => eventController.getEventsByUserId(req, res, next));
router.get('/user/:userId/my-events', (req, res, next) => eventController.getEventsTicketsRegistrationsByUserId(req, res, next));

router.get('/:eventId/parameters', (req, res, next) => eventController.getParameterByEventId(req, res, next));
router.put('/:id', (req, res, next) => eventController.updateEvent(req, res, next));
router.delete('/:id', (req, res, next) => eventController.deleteEvent(req, res, next));

export default router;
