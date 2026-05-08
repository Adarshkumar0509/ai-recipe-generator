import pool from '../config/database.js';
import { initUsersTable } from '../models/User.js';
import { initRecipesTable } from '../models/Recipe.js';
import { initPantryTable } from '../models/Pantry.js';
import { initShoppingListTable } from '../models/ShoppingList.js';
import { initMealPlansTable, initMealPlanItemsTable } from '../models/MealPlan.js';

export const initializeDatabase = async () => {
  try {
    console.log('\n🔧 Initializing Database Tables...\n');

    // Test database connection first
    const testConnection = await pool.query('SELECT NOW()');
    console.log('✓ Database connection successful');

    // Initialize all tables
    await initUsersTable();
    await initRecipesTable();
    await initPantryTable();
    await initShoppingListTable();
    await initMealPlansTable();
    await initMealPlanItemsTable();

    console.log('\n✅ Database initialized successfully!\n');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('\n⚠️  The server will continue running, but database features will be unavailable.');
    console.error('Please verify your DATABASE_URL in the .env file.\n');
    return false;
  }
};

export const closeDatabase = async () => {
  try {
    await pool.end();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('Error closing database:', error);
  }
};
