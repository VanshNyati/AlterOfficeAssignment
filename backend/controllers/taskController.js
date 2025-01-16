// backend/controllers/taskController.js
const Task = require('../models/Task');

// Get Tasks by User
exports.getTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ userId }).sort({ dueDate: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks.' });
    }
};

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, category, dueDate, userId } = req.body;
        const task = new Task({ title, description, category, dueDate, userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task.' });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task.' });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task.' });
    }
};
