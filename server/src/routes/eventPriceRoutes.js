import  express from 'express';
import  eventPriceController from '../controllers/eventPriceController.js';

const router = express.Router();

router.post('/', (req, res, next) => eventPriceController.createEventPrice(req, res, next));
router.get('/:id', (req, res, next) => eventPriceController.getEventPriceById(req, res, next));
router.get('/', (req, res, next) => eventPriceController.getAllEventPrices(req, res, next));
router.get('/event/:id', (req, res, next) => eventPriceController.getEventPriceByEventId(req, res, next));
router.put('/:id', (req, res, next) => eventPriceController.updateEventPrice(req, res, next));
router.delete('/:id', (req, res, next) => eventPriceController.deleteEventPrice(req, res, next));


export default router;
