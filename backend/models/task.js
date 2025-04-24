const mongoose = require('mongoose');

// Define task schema
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

// Create Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
