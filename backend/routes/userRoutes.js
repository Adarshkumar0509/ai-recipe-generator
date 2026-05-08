import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// User profile routes
router.get('/profile', userController.getUserProfile);
router.put('/preferences', userController.updateUserPreferences);
router.put('/password', userController.updatePassword);
router.delete('/account', userController.deleteAccount);

export default router;
