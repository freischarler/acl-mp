import express from 'express';
import  eventParametersController from '../controllers/eventParametersController.js';

const router = express.Router();

router.post('/', (req, res, next) => eventParametersController.createEventParameters(req, res, next));
router.get('/:id', (req, res, next) => eventParametersController.getEventParametersById(req, res, next));
router.get('/event/:id', (req, res, next) => eventParametersController.getEventParametersByEvents(req, res, next));
router.get('/', (req, res, next) => eventParametersController.getAllEventParameterss(req, res, next));
router.put('/:id', (req, res, next) => eventParametersController.updateEventParameters(req, res, next));
router.delete('/:id', (req, res, next) => eventParametersController.deleteEventParameters(req, res, next));


export default router;
