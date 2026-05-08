import express from 'express';
import * as pantryController from '../controllers/pantryController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get pantry
router.get('/', pantryController.getPantry);

// Add item
router.post('/', pantryController.addPantryItem);

// Update item
router.put('/:id', pantryController.updatePantryItem);

// Delete item
router.delete('/:id', pantryController.deletePantryItem);

// Clear expired items
router.post('/clear/expired', pantryController.clearExpiredItems);

export default router;
