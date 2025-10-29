const Task = require('../models/Task');

// getting all tasks - users see only their tasks, admin sees all
const getAllTasks = async (req, res, next) => {
  try {
    let tasks;
    
    // checking if user is admin or not
    // need to fix later if I mess this up
    if (req.user.role === 'admin') {
      // admin can see all tasks
      tasks = await Task.find().populate('createdBy', 'name email');
    } else {
      // regular users see only their tasks
      tasks = await Task.find({ createdBy: req.user._id });
    }

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// getting single task by id
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // checking if user owns this task or is admin
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// creating new task
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({
      title,
      description: description || '',
      createdBy: req.user._id // setting the creator
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// updating task
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // only owner or admin can update
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, description, completed } = req.body;

    // updating fields if provided
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// deleting task
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // only owner or admin can delete
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

