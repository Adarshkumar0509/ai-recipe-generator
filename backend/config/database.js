import pkg from 'pg';
const { Pool } = pkg;

// Create the pool immediately - it won't connect until first query
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Mysql%401234@localhost:5433/ai_recipe_generator',
  ssl: false, // Disable SSL for local development
});

pool.on('connect', () => {
  console.log('✓ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Pool error:', err.message);
});

export default pool;
