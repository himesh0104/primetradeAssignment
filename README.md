# Primetrade - Task Management API

A scalable REST API with authentication and role-based access control for managing tasks, built with Node.js, Express, MongoDB, and React.

## 📋 Project Overview

This is a full-stack application that demonstrates:
- User authentication with JWT
- Role-based access control (user/admin)
- CRUD operations for tasks
- Minimal React frontend for testing

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcrypt** - Password hashing
- **JWT** - Authentication
- **dotenv** - Environment configuration

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Vite** - Build tool

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://himesh0109:Revati070205@primetradeassignment.guzq3hu.mongodb.net/?appName=primetradeAssignment
JWT_SECRET=WX52K+xkzfAQWwip+8SDvexhPNXEt6OaXFtAdjfEvmkj2/wvZNZOilMpTaiv7qtM
nqumadQBlI2f4X/6i8G2Qw==
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The API will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## 📚 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile (Protected)

### Tasks
- `GET /tasks` - Get all tasks (user: own tasks, admin: all tasks) (Protected)
- `GET /tasks/:id` - Get single task (Protected)
- `POST /tasks` - Create new task (Protected)
- `PUT /tasks/:id` - Update task (Protected)
- `DELETE /tasks/:id` - Delete task (Protected)

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 🏗️ Architecture & Scalability

### Current Structure
```
backend/
├── models/          # Database models
├── controllers/     # Business logic
├── routes/          # API routes
├── middlewares/     # Authentication & error handling
├── config/          # Database configuration
└── server.js        # Entry point
```

### Scalability Considerations

#### 1. **Microservices Readiness**
The current modular structure makes it easy to split into microservices:
- **Auth Service**: Handle authentication and user management
- **Task Service**: Manage task CRUD operations
- **API Gateway**: Route requests to appropriate services

#### 2. **Caching with Redis**
Implement Redis caching for:
- User sessions
- Frequently accessed tasks
- Database query results

Example implementation:
```js
// Cache user data
await redis.setEx(`user:${userId}`, 3600, JSON.stringify(userData));

// Cache task lists
await redis.setEx(`tasks:${userId}`, 300, JSON.stringify(tasks));
```

#### 3. **Docker Containerization**
Create `Dockerfile` for easy deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Use `docker-compose.yml` for multi-container setup:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/primetrade
    depends_on:
      - mongo
      - redis
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
  
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

#### 4. **Load Balancing with Nginx**
For production, use Nginx as a reverse proxy:

```nginx
upstream backend_servers {
    server localhost:5000;
    server localhost:5001;
    server localhost:5002;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Performance Optimizations
- Add database indexes on frequently queried fields
- Implement pagination for large result sets
- Use connection pooling for MongoDB
- Add request rate limiting to prevent abuse

## 📝 API Testing

Import the Postman collection (`Primetrade_API.postman_collection.json`) to test all endpoints.

## 📄 License

MIT

