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
router.post('/tasks', verifyToken, createTask); // No need for upload middleware
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

module.exports = router;