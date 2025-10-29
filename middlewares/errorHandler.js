// global error handler - catching all errors
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: errors[0] || 'Validation error' });
  }

  // duplicate key error (e.g., email already exists)
  if (err.code === 11000) {
    return res.status(400).json({ message: 'This email already exists' });
  }

  // default error
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;

