# Backend Deployment on Render (Fixed!)

## Issue Fix
The error shows Render runs from repo root, but server.js is in backend/src/.

**Solution 1 (Recommended): Set Root Directory**
- In Render Dashboard > Settings > Root Directory = `backend`
- Re-deploy

**Solution 2: Root package.json**
- Add to root package.json: "scripts": {"start": "cd backend && npm start"}

## Prerequisites
- MongoDB Atlas (IP whitelist 0.0.0.0/0)
- Cloudinary account
- Gmail app password

## Render Setup
1. GitHub repo (whole project OK)
2. New Web Service > Connect repo
3. **Root Directory: backend**
4. Build: `npm install`
5. Start: `npm start`
6. Add env vars (copy from your backend/.env, never commit .env!)

## Test
https://your-app.onrender.com/health

Frontend: REACT_APP_API_BASE=https://your-app.onrender.com/api

Delete backend/.env.example and gitignore .env
