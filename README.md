# Saksham

A full-stack MERN project for course booking and management.

## Project Structure

- **backend/**: Express.js server with MongoDB and Redis
- **frontend/**: React web application
- **mobile/**: React Native mobile application

## Features

- User authentication with JWT
- Course and class management
- Booking system
- AI integration (placeholder)
- Payment processing (placeholder)
- Email services (placeholder)

## Setup

### Backend

1. Navigate to `backend/` directory
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   - MONGO_URI=your_mongodb_atlas_uri
   - REDIS_URL=your_redis_url
   - JWT_SECRET=your_jwt_secret
   - PORT=5000
4. Start the server: `npm start`

### Frontend

1. Navigate to `frontend/` directory
2. Install dependencies: `npm install`
3. Start the app: `npm start`

### Mobile

1. Navigate to `mobile/` directory
2. Install dependencies: `npm install`
3. Start the metro server: `npm start`
4. Run on Android: `npm run android`
5. Run on iOS: `npm run ios`

## API Endpoints

- `/api/users`: User management
- `/api/courses`: Course operations
- `/api/bookings`: Booking management
