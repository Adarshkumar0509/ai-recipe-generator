import * as RecipeModel from '../models/Recipe.js';
import * as UserModel from '../models/User.js';
import { generateRecipeWithAI } from '../utils/aiHelper.js';

// Get all user recipes
export const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await RecipeModel.getRecipesByUserId(req.user.id);
    res.json({
      message: 'Recipes retrieved successfully',
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

// Get single recipe
export const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await RecipeModel.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized access to this recipe' });
    }

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

// Search recipes
export const searchRecipes = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const recipes = await RecipeModel.searchRecipes(req.user.id, q);
    res.json({
      query: q,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

// Create recipe manually
export const createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      servings,
      difficulty,
      cuisine,
      tags,
      image_url,
    } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Title, ingredients, and instructions are required' });
    }

    const recipe = await RecipeModel.createRecipe(req.user.id, {
      title,
      description,
      ingredients: JSON.stringify(ingredients),
      instructions: JSON.stringify(instructions),
      prep_time,
      cook_time,
      servings,
      difficulty,
      cuisine,
      tags,
      ai_generated: false,
      image_url,
    });

    res.status(201).json({
      message: 'Recipe created successfully',
      recipe,
    });
  } catch (error) {
    next(error);
  }
};

// Generate recipe with AI
export const generateRecipeWithAI_Controller = async (req, res, next) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients array is required' });
    }

    // Get user preferences
    const user = await UserModel.getUserById(req.user.id);

    // Generate recipe using AI
    const aiRecipe = await generateRecipeWithAI(ingredients, {
      dietary_preferences: user.dietary_preferences,
      allergies: user.allergies,
      cuisines_preference: user.cuisines_preference,
    });

    // Save generated recipe to database
    const recipe = await RecipeModel.createRecipe(req.user.id, {
      title: aiRecipe.title,
      description: aiRecipe.description,
      ingredients: JSON.stringify(aiRecipe.ingredients),
      instructions: JSON.stringify(aiRecipe.instructions),
      prep_time: aiRecipe.prep_time,
      cook_time: aiRecipe.cook_time,
      servings: aiRecipe.servings,
      difficulty: aiRecipe.difficulty,
      cuisine: aiRecipe.cuisine,
      ai_generated: true,
      image_url: '',
    });

    res.status(201).json({
      message: 'Recipe generated successfully',
      recipe,
    });
  } catch (error) {
    next(error);
  }
};

// Update recipe
export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      servings,
      difficulty,
      cuisine,
      tags,
      image_url,
    } = req.body;

    const existingRecipe = await RecipeModel.getRecipeById(id);
    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (existingRecipe.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to update this recipe' });
    }

    const updatedRecipe = await RecipeModel.updateRecipe(id, req.user.id, {
      title: title || existingRecipe.title,
      description: description || existingRecipe.description,
      ingredients: ingredients ? JSON.stringify(ingredients) : existingRecipe.ingredients,
      instructions: instructions ? JSON.stringify(instructions) : existingRecipe.instructions,
      prep_time: prep_time || existingRecipe.prep_time,
      cook_time: cook_time || existingRecipe.cook_time,
      servings: servings || existingRecipe.servings,
      difficulty: difficulty || existingRecipe.difficulty,
      cuisine: cuisine || existingRecipe.cuisine,
      tags: tags || existingRecipe.tags,
      image_url: image_url || existingRecipe.image_url,
    });

    res.json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

// Delete recipe
export const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await RecipeModel.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this recipe' });
    }

    await RecipeModel.deleteRecipe(id, req.user.id);

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};
