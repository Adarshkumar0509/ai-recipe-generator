import pool from '../config/database.js';

// Initialize Recipes table
export const initRecipesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      prep_time INTEGER,
      cook_time INTEGER,
      servings INTEGER,
      difficulty VARCHAR(50),
      cuisine VARCHAR(100),
      tags TEXT,
      ai_generated BOOLEAN DEFAULT false,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Recipes table initialized');
};

export const getRecipeById = async (id) => {
  const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
  return result.rows[0];
};

export const getRecipesByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM recipes WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

export const getRecipesByTag = async (tag) => {
  const result = await pool.query(
    'SELECT * FROM recipes WHERE tags LIKE $1 ORDER BY created_at DESC',
    [`%${tag}%`]
  );
  return result.rows;
};

export const searchRecipes = async (userId, searchTerm) => {
  const result = await pool.query(
    'SELECT * FROM recipes WHERE user_id = $1 AND (title ILIKE $2 OR description ILIKE $2 OR ingredients ILIKE $2) ORDER BY created_at DESC',
    [userId, `%${searchTerm}%`]
  );
  return result.rows;
};

export const createRecipe = async (userId, recipe) => {
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
    ai_generated,
    image_url,
  } = recipe;

  const result = await pool.query(
    `INSERT INTO recipes (user_id, title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, cuisine, tags, ai_generated, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
    [userId, title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, cuisine, tags, ai_generated, image_url]
  );
  return result.rows[0];
};

export const updateRecipe = async (id, userId, recipe) => {
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
  } = recipe;

  const result = await pool.query(
    `UPDATE recipes SET title = $1, description = $2, ingredients = $3, instructions = $4, prep_time = $5, cook_time = $6, servings = $7, difficulty = $8, cuisine = $9, tags = $10, image_url = $11, updated_at = CURRENT_TIMESTAMP
     WHERE id = $12 AND user_id = $13 RETURNING *`,
    [title, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, cuisine, tags, image_url, id, userId]
  );
  return result.rows[0];
};

export const deleteRecipe = async (id, userId) => {
  await pool.query('DELETE FROM recipes WHERE id = $1 AND user_id = $2', [id, userId]);
};
