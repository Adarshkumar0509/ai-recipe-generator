# AI Recipe Generator Backend API

A production-ready Node.js/Express backend for an AI-powered recipe generator application with meal planning, pantry management, and shopping list features.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (Neon.tech recommended)
- Gemini API Key

### Installation

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Configure environment variables**
Create or update `.env` file with:
```
PORT=8000
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

3. **Start the server**
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:8000`

---

## 📚 API Endpoints

### Base URL
```
http://localhost:8000/api
```

### 🔐 Authentication Routes (`/auth`)

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "message": "Login successful",
  "user": {...},
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "dietary_preferences": "vegetarian",
  "allergies": "nuts",
  "cuisines_preference": "italian"
}
```

---

### 👤 User Routes (`/users`)

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer {token}
```

#### Update User Preferences
```http
PUT /users/preferences
Authorization: Bearer {token}
Content-Type: application/json

{
  "dietary_preferences": "vegetarian",
  "allergies": "nuts, dairy",
  "cuisines_preference": "italian, mediterranean"
}
```

#### Update Password
```http
PUT /users/password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass456",
  "confirmPassword": "NewPass456"
}
```

#### Delete Account
```http
DELETE /users/account
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "SecurePass123"
}
```

---

### 🍳 Recipe Routes (`/recipes`)

#### Get All Recipes
```http
GET /recipes
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Recipes retrieved successfully",
  "count": 5,
  "recipes": [...]
}
```

#### Search Recipes
```http
GET /recipes/search?q=pasta
Authorization: Bearer {token}
```

#### Get Recipe by ID
```http
GET /recipes/{id}
Authorization: Bearer {token}
```

#### Create Recipe Manually
```http
POST /recipes
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Spaghetti Carbonara",
  "description": "Classic Italian pasta",
  "ingredients": ["spaghetti", "eggs", "bacon", "parmesan"],
  "instructions": ["Cook pasta", "Fry bacon", "Mix eggs", "Combine all"],
  "prep_time": 10,
  "cook_time": 20,
  "servings": 4,
  "difficulty": "easy",
  "cuisine": "italian",
  "tags": "pasta, dinner",
  "image_url": "https://..."
}
```

#### Generate Recipe with AI
```http
POST /recipes/generate-ai
Authorization: Bearer {token}
Content-Type: application/json

{
  "ingredients": ["tomato", "basil", "mozzarella"]
}

Response: 201 Created
{
  "message": "Recipe generated successfully",
  "recipe": {
    "id": 1,
    "title": "Caprese Salad",
    "description": "Fresh Italian salad",
    "ingredients": "[\"tomato\", \"basil\", \"mozzarella\"]",
    "instructions": "[\"Slice tomato\", \"Layer with mozzarella\", \"Add basil\"]",
    "prep_time": 5,
    "cook_time": 0,
    "servings": 2,
    "difficulty": "easy",
    "cuisine": "italian",
    "ai_generated": true
  }
}
```

#### Update Recipe
```http
PUT /recipes/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "prep_time": 15
}
```

#### Delete Recipe
```http
DELETE /recipes/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Recipe deleted successfully"
}
```

---

### 🥬 Pantry Routes (`/pantry`)

#### Get Pantry Items
```http
GET /pantry
Authorization: Bearer {token}
```

#### Add Pantry Item
```http
POST /pantry
Authorization: Bearer {token}
Content-Type: application/json

{
  "item_name": "Tomato",
  "quantity": 5,
  "unit": "pieces",
  "category": "vegetables",
  "expiry_date": "2025-12-31"
}
```

#### Update Pantry Item
```http
PUT /pantry/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3,
  "expiry_date": "2025-12-25"
}
```

#### Delete Pantry Item
```http
DELETE /pantry/{id}
Authorization: Bearer {token}
```

#### Clear Expired Items
```http
POST /pantry/clear/expired
Authorization: Bearer {token}
```

---

### 🛒 Shopping List Routes (`/shopping-list`)

#### Get Shopping List
```http
GET /shopping-list
Authorization: Bearer {token}
```

#### Add Item to Shopping List
```http
POST /shopping-list
Authorization: Bearer {token}
Content-Type: application/json

{
  "item_name": "Milk",
  "quantity": 2,
  "unit": "liters",
  "category": "dairy"
}
```

#### Update Shopping List Item
```http
PUT /shopping-list/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 1,
  "is_completed": false
}
```

#### Toggle Item Completion
```http
PATCH /shopping-list/{id}/toggle
Authorization: Bearer {token}
```

#### Delete Shopping List Item
```http
DELETE /shopping-list/{id}
Authorization: Bearer {token}
```

#### Clear Completed Items
```http
POST /shopping-list/clear/completed
Authorization: Bearer {token}
```

#### Clear All Items
```http
POST /shopping-list/clear/all
Authorization: Bearer {token}
```

---

### 📅 Meal Plan Routes (`/meal-plans`)

#### Get All Meal Plans
```http
GET /meal-plans
Authorization: Bearer {token}
```

#### Get Meal Plan by ID
```http
GET /meal-plans/{id}
Authorization: Bearer {token}
```

#### Create Meal Plan
```http
POST /meal-plans
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Weekly Meal Plan",
  "start_date": "2025-01-01",
  "end_date": "2025-01-07",
  "description": "A balanced weekly meal plan"
}
```

#### Generate Meal Plan with AI
```http
POST /meal-plans/generate-ai
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "AI Generated Plan",
  "start_date": "2025-01-01",
  "end_date": "2025-01-07",
  "days": 7
}
```

#### Update Meal Plan
```http
PUT /meal-plans/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Plan",
  "description": "Updated description"
}
```

#### Delete Meal Plan
```http
DELETE /meal-plans/{id}
Authorization: Bearer {token}
```

#### Add Item to Meal Plan
```http
POST /meal-plans/{id}/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipe_id": 1,
  "meal_type": "breakfast",
  "day_of_week": "Monday",
  "date": "2025-01-01",
  "notes": "Serve with coffee"
}
```

#### Update Meal Plan Item
```http
PUT /meal-plans/items/{itemId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipe_id": 2,
  "meal_type": "lunch"
}
```

#### Delete Meal Plan Item
```http
DELETE /meal-plans/items/{itemId}
Authorization: Bearer {token}
```

---

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js          # PostgreSQL connection
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── userController.js    # User management
│   ├── recipeController.js  # Recipe operations
│   ├── pantryController.js  # Pantry management
│   ├── shoppingListController.js
│   └── mealPlanController.js
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User model
│   ├── Recipe.js            # Recipe model
│   ├── Pantry.js            # Pantry model
│   ├── ShoppingList.js      # Shopping list model
│   └── MealPlan.js          # Meal plan model
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── recipeRoutes.js
│   ├── pantryRoutes.js
│   ├── shoppingListRoutes.js
│   └── mealPlanRoutes.js
├── utils/
│   ├── aiHelper.js          # Gemini AI integration
│   ├── validators.js        # Input validation
│   └── dbInitializer.js     # Database setup
├── .env                     # Environment variables
├── package.json
├── server.js                # Express app setup
└── README.md
```

---

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)
- `dietary_preferences`
- `allergies`
- `cuisines_preference`
- `created_at`
- `updated_at`

### Recipes Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `title`
- `description`
- `ingredients` (JSON)
- `instructions` (JSON)
- `prep_time`
- `cook_time`
- `servings`
- `difficulty`
- `cuisine`
- `tags`
- `ai_generated`
- `image_url`
- `created_at`
- `updated_at`

### Pantry Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `item_name`
- `quantity`
- `unit`
- `category`
- `expiry_date`
- `added_at`
- `updated_at`

### Shopping List Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `item_name`
- `quantity`
- `unit`
- `category`
- `is_completed`
- `added_at`
- `updated_at`

### Meal Plans Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `title`
- `start_date`
- `end_date`
- `description`
- `created_at`
- `updated_at`

### Meal Plan Items Table
- `id` (Primary Key)
- `meal_plan_id` (Foreign Key)
- `recipe_id` (Foreign Key)
- `meal_type`
- `day_of_week`
- `date`
- `notes`
- `created_at`

---

## 🤖 AI Features

### Gemini Integration
The backend uses Google's Generative AI (Gemini) to:

1. **Generate Recipes from Ingredients**
   - Takes a list of available ingredients
   - Considers user preferences
   - Returns complete recipe with instructions

2. **Generate Meal Plans**
   - Creates multi-day meal plans
   - Respects dietary restrictions
   - Accommodates allergies and cuisine preferences

3. **Suggest Recipes from Pantry**
   - Analyzes pantry items
   - Suggests recipes user can make
   - Minimizes food waste

---

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How to Use:
1. Register a user or login to get a token
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```
3. Tokens expire in 7 days
4. Use refresh token for renewal

---

## ⚠️ Database Connection Troubleshooting

### SSL Connection Error
If you see: `Error: The server does not support SSL connections`

**Solutions:**

1. **For Local PostgreSQL (No SSL)**
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   ```

2. **For Neon (Cloud PostgreSQL)**
   - Ensure your connection string includes `sslmode=require`
   - From a different network? Try:
     ```
     DATABASE_URL=postgresql://username:password@host/dbname?sslmode=require
     ```

3. **Disable SSL Temporarily (Development Only)**
   Update `config/database.js`:
   ```javascript
   ssl: false
   ```

4. **Check Firewall/VPN**
   - Neon may require allowlisting your IP
   - Check Neon dashboard for IP whitelist

---

## 🚀 Deployment

### Heroku
```bash
heroku config:set DATABASE_URL=your_database_url
heroku config:set JWT_SECRET=your_secret
heroku config:set GEMINI_API_KEY=your_api_key
git push heroku main
```

### Vercel/AWS/GCP
Set environment variables in your deployment platform and push your code.

---

## 📝 Error Handling

All errors return JSON with appropriate status codes:

```json
{
  "error": "Error message here"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `500` - Server Error

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:8000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Dependencies

- **express** - Web framework
- **pg** - PostgreSQL driver
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **@google/generative-ai** - Gemini AI API

---

## 📄 License

ISC

---

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and add tests for new features.

---

## ❓ Support

For issues or questions, please check:
1. The error message in the console
2. Environment variables in `.env`
3. Database connection status
4. API endpoint documentation above

---

**Happy Coding! 🚀**
