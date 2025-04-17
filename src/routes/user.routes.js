import express from 'express';
import { register, login } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/employer-signup', register);

router.post('/employer-login', login);

export default router;
