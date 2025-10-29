# Primetrade Frontend

Simple React frontend for testing the Primetrade API.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📄 Pages

### Register
- Create a new user account
- Validate email and password

### Login
- Authenticate existing users
- Store JWT token in localStorage

### Dashboard
- View all tasks (user: own tasks, admin: all tasks)
- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Logout

## 🔧 Configuration

Update API URL in `src/api.js` if needed:
```js
const API_URL = 'http://localhost:5000/api/v1';
```

## 🏗️ Build for Production

```bash
npm run build
```

Production build will be in the `dist` folder.

