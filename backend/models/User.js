import pool from '../config/database.js';

// Initialize Users table
export const initUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      dietary_preferences TEXT,
      allergies TEXT,
      cuisines_preference TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Users table initialized');
};

// User model functions
export const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const getUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

export const createUser = async (username, email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

export const updateUserPreferences = async (id, preferences) => {
  const { dietary_preferences, allergies, cuisines_preference } = preferences;
  const result = await pool.query(
    'UPDATE users SET dietary_preferences = $1, allergies = $2, cuisines_preference = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
    [dietary_preferences, allergies, cuisines_preference, id]
  );
  return result.rows[0];
};

export const updateUserPassword = async (id, hashedPassword) => {
  const result = await pool.query(
    'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [hashedPassword, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};
