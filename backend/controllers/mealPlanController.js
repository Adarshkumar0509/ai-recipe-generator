import * as MealPlanModel from '../models/MealPlan.js';
import { generateMealPlanWithAI } from '../utils/aiHelper.js';
import * as UserModel from '../models/User.js';

// Get all meal plan
export const getMealPlans = async (req, res, next) => {
  try {
    const mealPlans = await MealPlanModel.getMealPlansByUserId(req.user.id);
    res.json({
      message: 'Meal plans retrieved successfully',
      count: mealPlans.length,
      mealPlans,
    });
  } catch (error) {
    next(error);
  }
};

// Get single meal plan with items
export const getMealPlanById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mealPlan = await MealPlanModel.getMealPlanById(id, req.user.id);
    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    const items = await MealPlanModel.getMealPlanItems(id);

    res.json({
      ...mealPlan,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// Create meal plan
export const createMealPlan = async (req, res, next) => {
  try {
    const { title, start_date, end_date, description } = req.body;

    if (!title || !start_date || !end_date) {
      return res.status(400).json({ error: 'Title, start date, and end date are required' });
    }

    const mealPlan = await MealPlanModel.createMealPlan(req.user.id, {
      title,
      start_date,
      end_date,
      description,
    });

    res.status(201).json({
      message: 'Meal plan created successfully',
      mealPlan,
    });
  } catch (error) {
    next(error);
  }
};

// Generate meal plan with AI
export const generateMealPlanWithAI_Controller = async (req, res, next) => {
  try {
    const { title, start_date, end_date, days } = req.body;

    if (!title || !start_date || !end_date) {
      return res.status(400).json({ error: 'Title, start date, and end date are required' });
    }

    // Get user preferences
    const user = await UserModel.getUserById(req.user.id);

    // Generate meal plan using AI
    const aiMealPlan = await generateMealPlanWithAI(
      user.dietary_preferences,
      user.allergies,
      user.cuisines_preference,
      days || 7
    );

    // Create meal plan
    const mealPlan = await MealPlanModel.createMealPlan(req.user.id, {
      title,
      start_date,
      end_date,
      description: 'AI-generated meal plan',
    });

    res.status(201).json({
      message: 'Meal plan generated successfully',
      mealPlan,
      suggestions: aiMealPlan,
    });
  } catch (error) {
    next(error);
  }
};

// Update meal plan
export const updateMealPlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, start_date, end_date, description } = req.body;

    const existingMealPlan = await MealPlanModel.getMealPlanById(id, req.user.id);
    if (!existingMealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    const updatedMealPlan = await MealPlanModel.updateMealPlan(id, req.user.id, {
      title: title || existingMealPlan.title,
      start_date: start_date || existingMealPlan.start_date,
      end_date: end_date || existingMealPlan.end_date,
      description: description || existingMealPlan.description,
    });

    res.json({
      message: 'Meal plan updated successfully',
      mealPlan: updatedMealPlan,
    });
  } catch (error) {
    next(error);
  }
};

// Delete meal plan
export const deleteMealPlan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mealPlan = await MealPlanModel.getMealPlanById(id, req.user.id);
    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    await MealPlanModel.deleteMealPlan(id, req.user.id);

    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add item to meal plan
export const addMealPlanItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recipe_id, meal_type, day_of_week, date, notes } = req.body;

    if (!meal_type) {
      return res.status(400).json({ error: 'Meal type is required' });
    }

    const mealPlan = await MealPlanModel.getMealPlanById(id, req.user.id);
    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    const item = await MealPlanModel.addMealPlanItem(id, {
      recipe_id,
      meal_type,
      day_of_week,
      date,
      notes,
    });

    res.status(201).json({
      message: 'Item added to meal plan',
      item,
    });
  } catch (error) {
    next(error);
  }
};

// Update meal plan item
export const updateMealPlanItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { recipe_id, meal_type, day_of_week, date, notes } = req.body;

    const updatedItem = await MealPlanModel.updateMealPlanItem(itemId, {
      recipe_id,
      meal_type,
      day_of_week,
      date,
      notes,
    });

    res.json({
      message: 'Meal plan item updated',
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete meal plan item
export const deleteMealPlanItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    await MealPlanModel.deleteMealPlanItem(itemId);

    res.json({ message: 'Meal plan item deleted' });
  } catch (error) {
    next(error);
  }
};
