# 🚀 GitHub & Deployment Guide

## Step 1: Push to GitHub

### 1.1 Create Repository on GitHub

1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Repository name: `ai-recipe-generator`
4. Description: `Full-stack AI Recipe Generator with React & Node.js`
5. Choose **Public** (for easy sharing)
6. Click **"Create repository"**

### 1.2 Push Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd "c:\Users\KIIT\Documents\ai recepie generator"

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-recipe-generator.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy Backend

### Option A: Deploy to **Render** (Recommended - Free)

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select **ai-recipe-generator** repo
5. Configuration:
   - **Name:** `ai-recipe-generator-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Root Directory:** `backend`

6. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://...your-neon-db-url...
   JWT_SECRET=your_random_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   NODE_ENV=production
   PORT=8000
   ```

7. Click **"Create Web Service"**
8. Wait for deployment (~5 min)
9. Copy the generated URL (e.g., `https://ai-recipe-generator-api.onrender.com`)

### Option B: Deploy to **Railway**

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your repository
4. Add environment variables
5. Deploy

---

## Step 3: Set Up Database

### Option A: Use **Neon** (Free PostgreSQL)

1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy connection string: `postgresql://...`
4. Update `DATABASE_URL` in your backend deployment

### Option B: Use **Supabase** (Free PostgreSQL)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy PostgreSQL connection string
4. Update `DATABASE_URL`

---

## Step 4: Deploy Frontend

### Deploy to **Vercel** (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"New Project"**
3. Import your GitHub repository
4. Configuration:
   - **Framework:** `React`
   - **Root Directory:** `Frontend/ai-recipe-generator-ui-boilerplate-code`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual backend URL from Step 2)

6. Click **"Deploy"**
7. Your frontend will be live at: `https://ai-recipe-generator.vercel.app`

### Deploy to **Netlify**

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub
4. Select repository
5. Configuration:
   - **Base directory:** `Frontend/ai-recipe-generator-ui-boilerplate-code`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```

7. Deploy

---

## Step 5: Connect Frontend to Backend

After deploying backend, update frontend environment:

1. In [Vercel](https://vercel.com) or [Netlify](https://netlify.com) dashboard
2. Go to **Settings** → **Environment Variables**
3. Update `VITE_API_URL`:
   ```
   VITE_API_URL=https://your-backend-domain/api
   ```
4. Redeploy

---

## Quick Commands Reference

### Local Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd Frontend/ai-recipe-generator-ui-boilerplate-code
npm run dev
```

### Push Updates to GitHub
```bash
cd "c:\Users\KIIT\Documents\ai recepie generator"
git add .
git commit -m "Your commit message"
git push origin main
```

### Build for Production
```bash
# Backend - no build needed
# Frontend
cd Frontend/ai-recipe-generator-ui-boilerplate-code
npm run build
```

---

## Environment Variables Checklist

### Backend (.env)
- [ ] `PORT` - API port (8000)
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `JWT_SECRET` - Random secret key
- [ ] `GEMINI_API_KEY` - Google API key
- [ ] `NODE_ENV` - production/development

### Frontend (.env)
- [ ] `VITE_API_URL` - Backend API URL

---

## Testing Deployment

### Test Backend
```bash
# Replace with your deployed URL
curl https://your-backend-url/api
```

Should return:
```json
{
  "message": "AI Recipe Generator API",
  "version": "1.0.0",
  "status": "running"
}
```

### Test Frontend
Visit: `https://your-frontend-url`

---

## Troubleshooting

### Backend won't start
- Check `DATABASE_URL` is set correctly
- Verify all environment variables
- Check logs in Render/Railway dashboard

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Redeploy frontend after updating URL

### Database connection issues
- Verify connection string format
- Check PostgreSQL is running
- Test connection locally first

---

## 📊 Live URLs (After Deployment)

| Service | URL |
|---------|-----|
| **Frontend** | https://your-frontend-url |
| **Backend API** | https://your-backend-url |
| **GitHub** | https://github.com/YOUR_USERNAME/ai-recipe-generator |

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy backend to Render/Railway
3. ✅ Set up database (Neon/Supabase)
4. ✅ Deploy frontend to Vercel/Netlify
5. ✅ Test all features
6. ✅ Share your live app!

Congratulations! Your full-stack app is live! 🎉
