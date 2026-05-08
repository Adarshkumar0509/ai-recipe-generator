import * as ShoppingListModel from '../models/ShoppingList.js';

// Get shopping list
export const getShoppingList = async (req, res, next) => {
  try {
    const items = await ShoppingListModel.getShoppingListByUserId(req.user.id);
    res.json({
      message: 'Shopping list retrieved successfully',
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// Add item to shopping list
export const addShoppingListItem = async (req, res, next) => {
  try {
    const { item_name, quantity, unit, category } = req.body;

    if (!item_name) {
      return res.status(400).json({ error: 'Item name is required' });
    }

    const item = await ShoppingListModel.addShoppingListItem(req.user.id, {
      item_name,
      quantity,
      unit,
      category,
    });

    res.status(201).json({
      message: 'Item added to shopping list',
      item,
    });
  } catch (error) {
    next(error);
  }
};

// Update shopping list item
export const updateShoppingListItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity, unit, category, is_completed } = req.body;

    const existingItem = await ShoppingListModel.getShoppingListItem(req.user.id, id);
    if (!existingItem) {
      return res.status(404).json({ error: 'Shopping list item not found' });
    }

    const updatedItem = await ShoppingListModel.updateShoppingListItem(req.user.id, id, {
      quantity: quantity !== undefined ? quantity : existingItem.quantity,
      unit: unit || existingItem.unit,
      category: category || existingItem.category,
      is_completed: is_completed !== undefined ? is_completed : existingItem.is_completed,
    });

    res.json({
      message: 'Shopping list item updated',
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// Toggle item completion
export const toggleShoppingListItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await ShoppingListModel.getShoppingListItem(req.user.id, id);
    if (!item) {
      return res.status(404).json({ error: 'Shopping list item not found' });
    }

    const updatedItem = await ShoppingListModel.toggleShoppingListItem(req.user.id, id);

    res.json({
      message: 'Item toggled successfully',
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete shopping list item
export const deleteShoppingListItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await ShoppingListModel.getShoppingListItem(req.user.id, id);
    if (!item) {
      return res.status(404).json({ error: 'Shopping list item not found' });
    }

    await ShoppingListModel.deleteShoppingListItem(req.user.id, id);

    res.json({ message: 'Shopping list item deleted' });
  } catch (error) {
    next(error);
  }
};

// Clear completed items
export const clearCompletedItems = async (req, res, next) => {
  try {
    const deletedItems = await ShoppingListModel.clearCompletedItems(req.user.id);

    res.json({
      message: 'Completed items cleared',
      count: deletedItems.length,
      items: deletedItems,
    });
  } catch (error) {
    next(error);
  }
};

// Clear all items
export const clearAllShoppingList = async (req, res, next) => {
  try {
    await ShoppingListModel.clearAllShoppingList(req.user.id);

    res.json({ message: 'Shopping list cleared' });
  } catch (error) {
    next(error);
  }
};
