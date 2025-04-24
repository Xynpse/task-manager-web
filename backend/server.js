const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/task'); // Import your Task model

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost/taskManager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a task
app.post('/tasks', async (req, res) => {
  const task = new Task({
    text: req.body.text,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
    console.log(`Delete request for task with id: ${req.params.id}`);
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Delete Error:', err);
      res.status(500).json({ message: err.message });
    }
  });
  

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
