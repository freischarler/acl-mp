import express from 'express';
import weightController from '../controllers/weightController.js';

const router = express.Router();

router.post('/', (req, res, next) => weightController.createWeight(req, res, next));
router.get('/:id', (req, res, next) => weightController.getWeightById(req, res, next));
router.get('/', (req, res, next) => weightController.getAllWeights(req, res, next));
router.put('/:id', (req, res, next) => weightController.updateWeight(req, res, next));
router.delete('/:id', (req, res, next) => weightController.deleteWeight(req, res, next));

export default router;