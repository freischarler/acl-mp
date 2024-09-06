import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', (req, res, next) => userController.createUser(req, res, next));

router.get('/:id', (req, res, next) => userController.getUserById(req, res, next));
router.get('/', (req, res, next) => userController.getAllUsers(req, res, next));
router.get('/user', (req, res, next) => userController.getLogin(req, res, next));

router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));
router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));


export default router;
