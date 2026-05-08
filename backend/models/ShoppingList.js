import pool from '../config/database.js';

// Initialize Shopping List table
export const initShoppingListTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS shopping_list (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      item_name VARCHAR(255) NOT NULL,
      quantity DECIMAL(10, 2),
      unit VARCHAR(50),
      category VARCHAR(100),
      is_completed BOOLEAN DEFAULT false,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Shopping List table initialized');
};

export const getShoppingListByUserId = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM shopping_list WHERE user_id = $1 ORDER BY is_completed ASC, category, item_name',
    [userId]
  );
  return result.rows;
};

export const getShoppingListItem = async (userId, itemId) => {
  const result = await pool.query(
    'SELECT * FROM shopping_list WHERE id = $1 AND user_id = $2',
    [itemId, userId]
  );
  return result.rows[0];
};

export const addShoppingListItem = async (userId, item) => {
  const { item_name, quantity, unit, category } = item;
  const result = await pool.query(
    `INSERT INTO shopping_list (user_id, item_name, quantity, unit, category)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, item_name, quantity, unit, category]
  );
  return result.rows[0];
};

export const updateShoppingListItem = async (userId, itemId, item) => {
  const { quantity, unit, category, is_completed } = item;
  const result = await pool.query(
    `UPDATE shopping_list SET quantity = $1, unit = $2, category = $3, is_completed = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $5 AND user_id = $6 RETURNING *`,
    [quantity, unit, category, is_completed, itemId, userId]
  );
  return result.rows[0];
};

export const toggleShoppingListItem = async (userId, itemId) => {
  const result = await pool.query(
    `UPDATE shopping_list SET is_completed = NOT is_completed, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND user_id = $2 RETURNING *`,
    [itemId, userId]
  );
  return result.rows[0];
};

export const deleteShoppingListItem = async (userId, itemId) => {
  await pool.query('DELETE FROM shopping_list WHERE id = $1 AND user_id = $2', [itemId, userId]);
};

export const clearCompletedItems = async (userId) => {
  const result = await pool.query(
    'DELETE FROM shopping_list WHERE user_id = $1 AND is_completed = true RETURNING *',
    [userId]
  );
  return result.rows;
};

export const clearAllShoppingList = async (userId) => {
  await pool.query('DELETE FROM shopping_list WHERE user_id = $1', [userId]);
};
