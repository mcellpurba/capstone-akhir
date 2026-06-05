import express from 'express';
import { createUser, getMe, forgotPassword } from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/me', getMe);
router.post('/forgot-password', forgotPassword);

export default router;
