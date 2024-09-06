import express from 'express';
import ageController from '../controllers/ageController.js';

const router = express.Router();

router.post('/', (req, res, next) => ageController.createAge(req, res, next));
router.get('/:id', (req, res, next) => ageController.getAgeById(req, res, next));
router.get('/', (req, res, next) => ageController.getAllAges(req, res, next));
router.put('/:id', (req, res, next) => ageController.updateAge(req, res, next));
router.delete('/:id', (req, res, next) => ageController.deleteAge(req, res, next));

export default router;