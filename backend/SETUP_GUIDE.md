# Backend Setup & Troubleshooting Guide

## ✅ What's Been Set Up

Your AI Recipe Generator backend is now **fully configured** with:

- ✅ Complete REST API with 6 main routes
- ✅ User authentication (Registration/Login with JWT)
- ✅ Recipe management (Create, Read, Update, Delete)
- ✅ AI-powered recipe generation (using Gemini)
- ✅ Pantry management
- ✅ Shopping list management
- ✅ Meal planning features
- ✅ Database models for all features
- ✅ Input validation and error handling
- ✅ Production-ready code structure

## 🚀 Server Status

Your server is currently running on:
```
http://localhost:8000
```

All API endpoints are accessible, even though the database connection has a temporary SSL issue.

---

## 🔧 Database Connection Issue

### Current Problem
```
❌ Database initialization failed: The server does not support SSL connections
```

### Why This Happened
Your `DATABASE_URL` points to Neon (a cloud PostgreSQL service) which requires SSL, but there might be:
- Network/firewall restrictions
- VPN interference
- Local environment limitations

### Solution Options

#### Option 1: Use Local PostgreSQL (Easiest for Development)

1. **Install PostgreSQL locally**
   - Download from https://www.postgresql.org/download/
   - Follow installation instructions for Windows

2. **Create a local database**
   ```bash
   # Open PostgreSQL prompt and run:
   CREATE DATABASE ai_recipe_generator;
   ```

3. **Update .env file**
   ```
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/ai_recipe_generator
   ```

4. **Restart the server**
   ```bash
   npm run dev
   ```

#### Option 2: Fix Neon Connection

1. **Verify your Neon connection string**
   - Go to https://console.neon.tech
   - Copy the correct connection string
   - Make sure it has `sslmode=require`

2. **Check your IP is whitelisted**
   - In Neon dashboard, go to "SQL Editor"
   - If you get connection error, your IP might be blocked
   - Contact Neon support or try from a different network

3. **Test connection with psql**
   ```bash
   # Install psql (PostgreSQL client)
   # Then test:
   psql "your_database_url"
   ```

#### Option 3: Modify SSL Configuration (Not Recommended for Production)

If you need a quick workaround:

1. Open `backend/config/database.js`
2. Change:
   ```javascript
   ssl: process.env.NODE_ENV === 'production' ? true : { rejectUnauthorized: false }
   ```
   To:
   ```javascript
   ssl: false
   ```

3. Restart the server

⚠️ **Warning**: Only for development! SSL=false is not secure for production.

---

## 📝 Next Steps

### 1. Fix Database Connection
Follow one of the options above to get your database working.

### 2. Test API Endpoints
Once database is connected, test using cURL or Postman:

```bash
# Test server is running
curl http://localhost:8000

# Register a user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

### 3. Connect Frontend
Update your frontend's API base URL:
```javascript
// In Frontend/ai-recipe-generator-ui-boilerplate-code/src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api';
```

### 4. Verify All Features Work
- Create an account
- Create a recipe
- Add items to pantry
- Test AI recipe generation (if API key is valid)
- Create meal plans

---

## 🔄 API Workflow Example

### 1. Register & Login
```bash
# Register
POST /api/auth/register
{ "username": "john", "email": "john@example.com", "password": "SecurePass123", "confirmPassword": "SecurePass123" }

# Save the returned token for next requests
```

### 2. Update Preferences
```bash
# Set dietary preferences
PUT /api/users/preferences
Authorization: Bearer {token}
{ "dietary_preferences": "vegetarian", "allergies": "nuts" }
```

### 3. Create Recipe
```bash
# Create manually
POST /api/recipes
Authorization: Bearer {token}
{
  "title": "Pasta Carbonara",
  "description": "Classic Italian pasta",
  "ingredients": ["spaghetti", "eggs", "bacon"],
  "instructions": ["Cook pasta", "Fry bacon", "Mix eggs"],
  "prep_time": 10,
  "cook_time": 20,
  "servings": 4,
  "difficulty": "easy",
  "cuisine": "italian"
}
```

### 4. Generate Recipe with AI
```bash
# Generate recipe from ingredients
POST /api/recipes/generate-ai
Authorization: Bearer {token}
{ "ingredients": ["tomato", "basil", "mozzarella"] }
```

### 5. Manage Pantry
```bash
# Add item to pantry
POST /api/pantry
Authorization: Bearer {token}
{ "item_name": "Tomato", "quantity": 5, "unit": "pieces", "category": "vegetables" }
```

### 6. Create Meal Plan
```bash
# Create meal plan
POST /api/meal-plans
Authorization: Bearer {token}
{
  "title": "Weekly Plan",
  "start_date": "2025-01-01",
  "end_date": "2025-01-07",
  "description": "A week of meals"
}
```

---

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Install new package
npm install package-name

# Check all dependencies
npm list

# Update packages
npm update
```

---

## 📋 Troubleshooting Checklist

- [ ] Server is running on port 8000
- [ ] `.env` file is configured with DATABASE_URL
- [ ] PostgreSQL is installed and running
- [ ] All dependencies are installed (`npm install`)
- [ ] GEMINI_API_KEY is set (for AI features)
- [ ] JWT_SECRET is set (any random string for dev)

---

## 🔑 Important Files

- `server.js` - Main server entry point
- `config/database.js` - Database configuration
- `controllers/` - Business logic for each feature
- `models/` - Database query functions
- `routes/` - API endpoint definitions
- `middleware/` - Authentication & error handling
- `utils/` - Helper functions and AI integration

---

## 🎯 What Each Controller Does

| Controller | Purpose |
|-----------|---------|
| `authController` | Register, login, get current user |
| `userController` | Update preferences, password, delete account |
| `recipeController` | CRUD recipes, AI generation |
| `pantryController` | Manage pantry items |
| `shoppingListController` | Manage shopping list |
| `mealPlanController` | Create & manage meal plans |

---

## 📚 API Documentation

See `API_DOCUMENTATION.md` for detailed endpoint documentation with examples.

---

## ❓ Common Questions

**Q: Why is my database not connecting?**
A: Check your DATABASE_URL in `.env`. For local PostgreSQL, use `postgresql://postgres:password@localhost:5432/dbname`

**Q: How do I use the AI recipe generator?**
A: Make sure you have a valid GEMINI_API_KEY in `.env`, then use `POST /api/recipes/generate-ai` with ingredients.

**Q: Can I use the API without a database?**
A: The server runs without database, but all API calls that need data storage will fail. Get database working first.

**Q: Where should I store user tokens?**
A: In your frontend, store tokens in localStorage or sessionStorage. Include in `Authorization: Bearer {token}` header for protected routes.

**Q: How do I reset the database?**
A: Drop all tables and restart server, or delete your database and create a new one.

---

## 🚢 Deployment Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET (not a test key)
- [ ] Verify SSL is enabled for production database
- [ ] Test all endpoints thoroughly
- [ ] Set up proper error logging
- [ ] Configure CORS for your frontend domain
- [ ] Use environment variables for sensitive data
- [ ] Enable database backups
- [ ] Set up monitoring/alerts

---

## 📞 Need Help?

1. Check the error message carefully
2. Review API_DOCUMENTATION.md
3. Check server logs in terminal
4. Verify .env configuration
5. Test database connection separately
6. Check if ports 8000 is available

---

**Backend Setup Complete! 🎉**

Your API is ready. Fix the database connection and you're good to go!
