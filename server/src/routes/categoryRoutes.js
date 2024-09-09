import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', (req, res, next) => categoryController.createCategory(req, res, next));
router.get('/:id', (req, res, next) => categoryController.getCategoryById(req, res, next));
router.get('/', (req, res, next) => categoryController.getAllCategorys(req, res, next));
router.put('/:id', (req, res, next) => categoryController.updateCategory(req, res, next));
router.delete('/:id', (req, res, next) => categoryController.deleteCategory(req, res, next));

export default router;