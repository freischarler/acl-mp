import express from 'express';
import  qrController from '../controllers/qrController.js';

const router = express.Router();

router.post('/', (req, res, next) => qrController.createQr(req, res, next));
router.get('/:id', (req, res, next) => qrController.getQrById(req, res, next));
router.get('/', (req, res, next) => qrController.getAllQrs(req, res, next));
router.put('/:id', (req, res, next) => qrController.updateQr(req, res, next));
router.delete('/:id', (req, res, next) => qrController.deleteQr(req, res, next));

export default router;
