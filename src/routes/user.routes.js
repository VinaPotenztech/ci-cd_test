import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.login);
export default router;
