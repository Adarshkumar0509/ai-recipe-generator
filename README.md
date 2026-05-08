# AI Recipe Generator

A full-stack web application that uses AI to generate recipes and meal plans based on user preferences and available ingredients.

## 🚀 Features

- **AI Recipe Generation** - Generate recipes using Google Gemini AI
- **Meal Planning** - Create 7+ day meal plans with AI suggestions
- **User Authentication** - Secure JWT-based authentication with bcrypt
- **Pantry Management** - Track ingredients and expiry dates
- **Shopping List** - Smart shopping list management
- **Recipe Search** - Find recipes by ingredients or name
- **User Preferences** - Customize dietary preferences and allergies

## 📋 Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL 17** Database
- **JWT** Authentication
- **Google Generative AI** (Gemini API)
- **bcryptjs** for password hashing

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API requests
- **React Hot Toast** for notifications

## 📦 Project Structure

```
ai-recipe-generator/
├── backend/                 # Express.js API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication & error handling
│   ├── utils/             # Helpers & utilities
│   └── server.js          # Entry point
│
└── Frontend/
    └── ai-recipe-generator-ui-boilerplate-code/
        ├── src/
        │   ├── components/  # React components
        │   ├── pages/      # Page components
        │   ├── services/   # API services
        │   ├── context/    # React context
        │   └── App.jsx     # Main component
        └── vite.config.js  # Vite config
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v20+)
- PostgreSQL 17
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

**Create .env file:**
```
PORT=8000
DATABASE_URL=postgresql://postgres:password@localhost:5433/ai_recipe_generator
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

**Run backend:**
```bash
npm run dev
```

Server will start on http://localhost:8000

### Frontend Setup

```bash
cd Frontend/ai-recipe-generator-ui-boilerplate-code
npm install
npm run dev
```

Frontend will start on http://localhost:5173

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Recipes
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create recipe
- `POST /api/recipes/generate-ai` - Generate recipe with AI
- `GET /api/recipes/:id` - Get recipe by ID
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Meal Plans
- `GET /api/meal-plans` - Get all meal plans
- `POST /api/meal-plans` - Create meal plan
- `POST /api/meal-plans/generate-ai` - Generate meal plan with AI
- `GET /api/meal-plans/:id` - Get meal plan with items

### Pantry
- `GET /api/pantry` - Get pantry items
- `POST /api/pantry` - Add pantry item
- `PUT /api/pantry/:id` - Update pantry item
- `DELETE /api/pantry/:id` - Delete pantry item

### Shopping List
- `GET /api/shopping-list` - Get shopping list
- `POST /api/shopping-list` - Add item
- `PUT /api/shopping-list/:id` - Update item
- `PATCH /api/shopping-list/:id/toggle` - Toggle completion

## 🚢 Deployment

### Deploy Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Deploy Frontend (Vercel/Netlify)
1. Connect Frontend folder to Vercel/Netlify
2. Set build command: `npm run build`
3. Deploy

## 📝 Environment Variables

### Backend (.env)
```
PORT=8000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url/api
```

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- Input validation and sanitization
- CORS enabled for frontend

## 📚 Documentation

See [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) for detailed API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ for AI-powered recipe generation

## 🆘 Support

For issues and questions, please open an issue on GitHub.

---

**Status:** ✅ Fully Functional | Backend + Frontend Running | Database Connected
