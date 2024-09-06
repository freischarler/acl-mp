import express from 'express';
import styleController from '../controllers/styleController.js';

const router = express.Router();

router.post('/', (req, res, next) => styleController.createStyle(req, res, next));
router.get('/:id', (req, res, next) => styleController.getStyleById(req, res, next));
router.get('/', (req, res, next) => styleController.getAllStyles(req, res, next));
router.put('/:id', (req, res, next) => styleController.updateStyle(req, res, next));
router.delete('/:id', (req, res, next) => styleController.deleteStyle(req, res, next));

export default router;