require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// connecting to database
connectDB();

// middlewares
app.use(cors());
app.use(express.json()); // parsing json bodies
app.use(express.urlencoded({ extended: true }));

// api routes - version 1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// error handling middleware
app.use(errorHandler);

// starting server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

