import express from 'express';
import * as recipeController from '../controllers/recipeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get recipes
router.get('/', recipeController.getMyRecipes);
router.get('/search', recipeController.searchRecipes);
router.get('/:id', recipeController.getRecipeById);

// Create recipe
router.post('/', recipeController.createRecipe);
router.post('/generate-ai', recipeController.generateRecipeWithAI_Controller);

// Update recipe
router.put('/:id', recipeController.updateRecipe);

// Delete recipe
router.delete('/:id', recipeController.deleteRecipe);

export default router;
