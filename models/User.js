const mongoose = require('mongoose');

// user schema - storing user info
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // can't be empty
    trim: true // removing extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // email should be unique
    lowercase: true // converting to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // minimum 6 chars
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // only these two roles
    default: 'user'
  }
}, {
  timestamps: true // adding createdAt and updatedAt automatically
});

// exporting the model
module.exports = mongoose.model('User', userSchema);

