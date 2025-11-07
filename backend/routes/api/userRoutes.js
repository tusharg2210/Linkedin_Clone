import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../../controllers/userController.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();

// Post registration
router.post('/register', registerUser);

// Post login
router.post('/login', loginUser);

// Get user profile
router.get('/profile', protect, getUserProfile);

export default router;