import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.register);
export default router;
