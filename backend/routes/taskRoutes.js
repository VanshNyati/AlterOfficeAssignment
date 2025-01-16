// backend/routes/taskRoutes.js
const express = require('express');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/tasks/:userId', verifyToken, getTasks);
router.post('/tasks', verifyToken, createTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

module.exports = router;
