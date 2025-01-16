// backend/models/Task.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    action: { type: String, required: true }, // Example: 'Created', 'Updated status', 'Uploaded file'
    timestamp: { type: Date, default: Date.now }, // When the action happened
    details: { type: String }, // Additional info about the action
});

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Task title
    description: { type: String, maxlength: 300 }, // Task description
    category: { type: String, enum: ['Work', 'Personal'], required: true }, // Task category
    dueDate: { type: Date, required: true }, // Due date for the task
    status: {
        type: String,
        enum: ['TO-DO', 'IN-PROGRESS', 'COMPLETED'],
        default: 'TO-DO',
    }, // Task status
    attachment: { type: String }, // URL or path to the uploaded file
    activityLog: [activitySchema], // Log of actions related to the task
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    createdAt: { type: Date, default: Date.now }, // Task creation time
    updatedAt: { type: Date, default: Date.now }, // Last update time
});

module.exports = mongoose.model('Task', taskSchema);
