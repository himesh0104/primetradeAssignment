const mongoose = require('mongoose');

// task schema - storing task info
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false // tasks start as incomplete
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // referencing user model
    required: true
  }
}, {
  timestamps: true // adding createdAt and updatedAt
});

module.exports = mongoose.model('Task', taskSchema);

