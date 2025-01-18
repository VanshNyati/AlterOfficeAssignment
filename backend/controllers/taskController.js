// backend/controllers/taskController.js
const Task = require('../models/Task');
const { uploadFile } = require('../utils/fileUploadService');

// Get Tasks by User
exports.getTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const { category, status, dueDate } = req.query;

        // Build the filter object
        const filters = { userId };
        if (category) filters.category = category; // Filter by category (e.g., "Work", "Personal")
        if (status) filters.status = status; // Filter by status (e.g., "TO-DO", "IN-PROGRESS", "COMPLETED")
        if (dueDate) filters.dueDate = { $lte: new Date(dueDate) }; // Filter tasks due on or before a specific date

        // Fetch tasks with filters and sort by due date (ascending)
        const tasks = await Task.find(filters).sort({ dueDate: 1 });

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks.' });
    }
};

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, category, dueDate, userId } = req.body;
        let attachment = null;

        // Check if a file is provided in the request
        if (req.file) {
            attachment = await uploadFile(req.file); // Upload to S3
        }

        const task = new Task({
            title,
            description,
            category,
            dueDate,
            userId,
            attachment,
            activityLog: [
                { action: 'Task Created', details: `Task "${title}" created.` },
            ],
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        // Add activity log for status updates
        if (updates.status && updates.status !== task.status) {
            task.activityLog.push({
                action: 'Status Updated',
                details: `Status changed to "${updates.status}".`,
            });
        }

        // Log updates to other fields
        if (updates.title && updates.title !== task.title) {
            task.activityLog.push({
                action: 'Task Title Updated',
                details: `Title changed to "${updates.title}".`,
            });
        }

        // Upload file if provided
        if (req.file) {
            updates.attachment = await uploadFile(req.file);
            task.activityLog.push({
                action: 'File Uploaded',
                details: `File "${req.file.originalname}" uploaded.`,
            });
        }

        // Merge updates
        Object.assign(task, updates);

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task.' });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task.' });
    }
};
