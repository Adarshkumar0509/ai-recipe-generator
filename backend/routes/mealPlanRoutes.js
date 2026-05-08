import express from 'express';
import * as mealPlanController from '../controllers/mealPlanController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get meal plans
router.get('/', mealPlanController.getMealPlans);
router.get('/:id', mealPlanController.getMealPlanById);

// Create meal plan
router.post('/', mealPlanController.createMealPlan);
router.post('/generate-ai', mealPlanController.generateMealPlanWithAI_Controller);

// Update meal plan
router.put('/:id', mealPlanController.updateMealPlan);

// Delete meal plan
router.delete('/:id', mealPlanController.deleteMealPlan);

// Meal plan items
router.post('/:id/items', mealPlanController.addMealPlanItem);
router.put('/items/:itemId', mealPlanController.updateMealPlanItem);
router.delete('/items/:itemId', mealPlanController.deleteMealPlanItem);

export default router;
