import express from 'express';
import registrationController from '../controllers/registrationController.js';
import weightController from '../controllers/weightController.js';

const router = express.Router();

router.post('/', (req, res, next) => registrationController.createRegistration(req, res, next));
router.get('/:id', (req, res, next) => registrationController.getRegistrationById(req, res, next));
router.get('/user/:id', (req, res, next) => registrationController.getRegistrationsByUser(req, res, next));
router.get('/', (req, res, next) => registrationController.getAllRegistrations(req, res, next));
router.get('/event/:id', (req, res, next) => registrationController.getAllRegistrationsByEvent(req, res, next));
router.put('/:id', (req, res, next) => registrationController.updateRegistration(req, res, next));
router.delete('/:id', (req, res, next) => registrationController.deleteRegistration(req, res, next));


export default router;
