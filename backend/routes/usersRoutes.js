import express from 'express';
import { createUser, getMe } from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/me', getMe);

export default router;
