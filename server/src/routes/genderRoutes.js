import express from 'express';
import genderController from '../controllers/genderController.js';

const router = express.Router();

router.get('/:id', (req, res, next) => genderController.getGenderById(req, res, next));
router.get('/', (req, res, next) => genderController.getAllGenders(req, res, next));

export default router;