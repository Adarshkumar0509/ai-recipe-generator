import pool from '../config/database.js';

// Initialize Pantry table
export const initPantryTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS pantry (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      item_name VARCHAR(255) NOT NULL,
      quantity DECIMAL(10, 2),
      unit VARCHAR(50),
      category VARCHAR(100),
      expiry_date DATE,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, item_name)
    );
  `;
  await pool.query(query);
  console.log('✓ Pantry table initialized');
};

export const getPantryByUserId = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM pantry WHERE user_id = $1 ORDER BY category, item_name',
    [userId]
  );
  return result.rows;
};

export const getPantryItem = async (userId, itemId) => {
  const result = await pool.query(
    'SELECT * FROM pantry WHERE id = $1 AND user_id = $2',
    [itemId, userId]
  );
  return result.rows[0];
};

export const addPantryItem = async (userId, item) => {
  const { item_name, quantity, unit, category, expiry_date } = item;
  const result = await pool.query(
    `INSERT INTO pantry (user_id, item_name, quantity, unit, category, expiry_date)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (user_id, item_name) DO UPDATE 
     SET quantity = $3, unit = $4, category = $5, expiry_date = $6, updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [userId, item_name, quantity, unit, category, expiry_date]
  );
  return result.rows[0];
};

export const updatePantryItem = async (userId, itemId, item) => {
  const { quantity, unit, category, expiry_date } = item;
  const result = await pool.query(
    `UPDATE pantry SET quantity = $1, unit = $2, category = $3, expiry_date = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $5 AND user_id = $6 RETURNING *`,
    [quantity, unit, category, expiry_date, itemId, userId]
  );
  return result.rows[0];
};

export const deletePantryItem = async (userId, itemId) => {
  await pool.query('DELETE FROM pantry WHERE id = $1 AND user_id = $2', [itemId, userId]);
};

export const deletePantryItemByName = async (userId, itemName) => {
  await pool.query('DELETE FROM pantry WHERE user_id = $1 AND item_name = $2', [userId, itemName]);
};

export const clearExpiredItems = async (userId) => {
  const result = await pool.query(
    'DELETE FROM pantry WHERE user_id = $1 AND expiry_date < CURRENT_DATE RETURNING *',
    [userId]
  );
  return result.rows;
};
