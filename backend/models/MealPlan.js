import pool from '../config/database.js';

// Initialize Meal Plans table
export const initMealPlansTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS meal_plans (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Meal Plans table initialized');
};

// Initialize Meal Plan Items table
export const initMealPlanItemsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS meal_plan_items (
      id SERIAL PRIMARY KEY,
      meal_plan_id INTEGER NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
      recipe_id INTEGER REFERENCES recipes(id) ON DELETE SET NULL,
      meal_type VARCHAR(50) NOT NULL,
      day_of_week VARCHAR(20),
      date DATE,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Meal Plan Items table initialized');
};

export const getMealPlansByUserId = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM meal_plans WHERE user_id = $1 ORDER BY start_date DESC',
    [userId]
  );
  return result.rows;
};

export const getMealPlanById = async (mealPlanId, userId) => {
  const result = await pool.query(
    'SELECT * FROM meal_plans WHERE id = $1 AND user_id = $2',
    [mealPlanId, userId]
  );
  return result.rows[0];
};

export const createMealPlan = async (userId, mealPlan) => {
  const { title, start_date, end_date, description } = mealPlan;
  const result = await pool.query(
    `INSERT INTO meal_plans (user_id, title, start_date, end_date, description)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, title, start_date, end_date, description]
  );
  return result.rows[0];
};

export const updateMealPlan = async (mealPlanId, userId, mealPlan) => {
  const { title, start_date, end_date, description } = mealPlan;
  const result = await pool.query(
    `UPDATE meal_plans SET title = $1, start_date = $2, end_date = $3, description = $4, updated_at = CURRENT_TIMESTAMP
     WHERE id = $5 AND user_id = $6 RETURNING *`,
    [title, start_date, end_date, description, mealPlanId, userId]
  );
  return result.rows[0];
};

export const deleteMealPlan = async (mealPlanId, userId) => {
  await pool.query('DELETE FROM meal_plans WHERE id = $1 AND user_id = $2', [mealPlanId, userId]);
};

export const getMealPlanItems = async (mealPlanId) => {
  const result = await pool.query(
    `SELECT mpi.*, r.title as recipe_title, r.prep_time, r.cook_time, r.servings
     FROM meal_plan_items mpi
     LEFT JOIN recipes r ON mpi.recipe_id = r.id
     WHERE mpi.meal_plan_id = $1
     ORDER BY mpi.date, mpi.meal_type`,
    [mealPlanId]
  );
  return result.rows;
};

export const addMealPlanItem = async (mealPlanId, item) => {
  const { recipe_id, meal_type, day_of_week, date, notes } = item;
  const result = await pool.query(
    `INSERT INTO meal_plan_items (meal_plan_id, recipe_id, meal_type, day_of_week, date, notes)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [mealPlanId, recipe_id, meal_type, day_of_week, date, notes]
  );
  return result.rows[0];
};

export const updateMealPlanItem = async (itemId, item) => {
  const { recipe_id, meal_type, day_of_week, date, notes } = item;
  const result = await pool.query(
    `UPDATE meal_plan_items SET recipe_id = $1, meal_type = $2, day_of_week = $3, date = $4, notes = $5
     WHERE id = $6 RETURNING *`,
    [recipe_id, meal_type, day_of_week, date, notes, itemId]
  );
  return result.rows[0];
};

export const deleteMealPlanItem = async (itemId) => {
  await pool.query('DELETE FROM meal_plan_items WHERE id = $1', [itemId]);
};
