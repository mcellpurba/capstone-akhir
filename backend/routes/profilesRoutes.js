import express from 'express';
import { getProfile, updateProfile } from '../controllers/profilesController.js';

const router = express.Router();

router.get('/:username', getProfile);
router.put('/:username', updateProfile);

export default router;
