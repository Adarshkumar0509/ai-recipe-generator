import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './utils/dbInitializer.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import pantryRoutes from './routes/pantryRoutes.js';
import shoppingListRoutes from './routes/shoppingListRoutes.js';
import mealPlanRoutes from './routes/mealPlanRoutes.js';

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
  res.json({
    message: 'AI Recipe Generator API',
    version: '1.0.0',
    status: 'running',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/meal-plans', mealPlanRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// Start server and initialize database
const startServer = async () => {
  try {
    // Try to initialize database, but don't crash if it fails
    try {
      await initializeDatabase();
    } catch (dbError) {
      console.warn('\n⚠️  Database initialization failed. Server will run without database.');
      console.warn('Error:', dbError.message);
      console.warn('Please check your DATABASE_URL in .env file.\n');
    }

    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📍 Base URL: http://localhost:${PORT}`);
      console.log(`📚 API Endpoints:`);
      console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
      console.log(`   - Users: http://localhost:${PORT}/api/users`);
      console.log(`   - Recipes: http://localhost:${PORT}/api/recipes`);
      console.log(`   - Pantry: http://localhost:${PORT}/api/pantry`);
      console.log(`   - Shopping List: http://localhost:${PORT}/api/shopping-list`);
      console.log(`   - Meal Plans: http://localhost:${PORT}/api/meal-plans\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
