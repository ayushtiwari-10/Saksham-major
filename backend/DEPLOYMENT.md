# Backend Deployment on Render

## Prerequisites
- MongoDB Atlas cluster with IP whitelist 0.0.0.0/0
- Cloudinary account
- Gmail app password for SMTP

## Render Setup
1. Fork or push to GitHub repo
2. New Web Service on Render > Connect repo
3. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Environment Variables (from .env.example):
   - MONGO_URI=your_atlas_uri
   - JWT_SECRET=supersecretkey32charsmin
   - CLOUDINARY_* vars
   - GOOGLE_GENERATIVE_AI_API_KEY
   - SMTP_* vars

## Test
- Health: https://your-app.onrender.com/health
- Logs in Render dashboard

## Frontend Update
Set REACT_APP_API_BASE=https://your-app.onrender.com/api in frontend .env

Enjoy production deployment!
