import express from 'express';
import * as shoppingListController from '../controllers/shoppingListController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get shopping list
router.get('/', shoppingListController.getShoppingList);

// Add item
router.post('/', shoppingListController.addShoppingListItem);

// Update item
router.put('/:id', shoppingListController.updateShoppingListItem);

// Toggle item
router.patch('/:id/toggle', shoppingListController.toggleShoppingListItem);

// Delete item
router.delete('/:id', shoppingListController.deleteShoppingListItem);

// Clear completed items
router.post('/clear/completed', shoppingListController.clearCompletedItems);

// Clear all items
router.post('/clear/all', shoppingListController.clearAllShoppingList);

export default router;
