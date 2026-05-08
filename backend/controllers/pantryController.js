import * as PantryModel from '../models/Pantry.js';

// Get all pantry items
export const getPantry = async (req, res, next) => {
  try {
    const pantryItems = await PantryModel.getPantryByUserId(req.user.id);
    res.json({
      message: 'Pantry items retrieved successfully',
      count: pantryItems.length,
      items: pantryItems,
    });
  } catch (error) {
    next(error);
  }
};

// Add pantry item
export const addPantryItem = async (req, res, next) => {
  try {
    const { item_name, quantity, unit, category, expiry_date } = req.body;

    if (!item_name) {
      return res.status(400).json({ error: 'Item name is required' });
    }

    const item = await PantryModel.addPantryItem(req.user.id, {
      item_name,
      quantity,
      unit,
      category,
      expiry_date,
    });

    res.status(201).json({
      message: 'Pantry item added successfully',
      item,
    });
  } catch (error) {
    next(error);
  }
};

// Update pantry item
export const updatePantryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity, unit, category, expiry_date } = req.body;

    const existingItem = await PantryModel.getPantryItem(req.user.id, id);
    if (!existingItem) {
      return res.status(404).json({ error: 'Pantry item not found' });
    }

    const updatedItem = await PantryModel.updatePantryItem(req.user.id, id, {
      quantity: quantity !== undefined ? quantity : existingItem.quantity,
      unit: unit || existingItem.unit,
      category: category || existingItem.category,
      expiry_date: expiry_date || existingItem.expiry_date,
    });

    res.json({
      message: 'Pantry item updated successfully',
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete pantry item
export const deletePantryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await PantryModel.getPantryItem(req.user.id, id);
    if (!item) {
      return res.status(404).json({ error: 'Pantry item not found' });
    }

    await PantryModel.deletePantryItem(req.user.id, id);

    res.json({ message: 'Pantry item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Clear expired items
export const clearExpiredItems = async (req, res, next) => {
  try {
    const deletedItems = await PantryModel.clearExpiredItems(req.user.id);

    res.json({
      message: 'Expired items cleared successfully',
      count: deletedItems.length,
      items: deletedItems,
    });
  } catch (error) {
    next(error);
  }
};
