# Primetrade Backend API

REST API for task management with authentication and role-based access control.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
MONGO_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_secret_key_change_in_production
PORT=5000
```

3. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## 📂 Project Structure

```
backend/
├── config/
│   └── db.js           # Database connection
├── controllers/
│   ├── authController.js   # Auth logic
│   └── taskController.js   # Task CRUD logic
├── middlewares/
│   ├── auth.js         # JWT authentication
│   └── errorHandler.js # Error handling
├── models/
│   ├── User.js         # User model
│   └── Task.js         # Task model
├── routes/
│   ├── authRoutes.js   # Auth endpoints
│   └── taskRoutes.js   # Task endpoints
├── .env                # Environment variables
├── .env.example        # Example env file
├── package.json        # Dependencies
└── server.js           # Entry point
```

## 🔐 Features

- User registration and login
- JWT-based authentication
- Role-based access (user/admin)
- Task CRUD operations
- Input validation
- Centralized error handling

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/profile` - Get profile (Protected)

### Tasks
- `GET /api/v1/tasks` - Get all tasks (Protected)
- `GET /api/v1/tasks/:id` - Get task by ID (Protected)
- `POST /api/v1/tasks` - Create task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)

## 🔒 Protected Routes

Include JWT token in request header:
```
Authorization: Bearer <token>
```

## 🌐 Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

