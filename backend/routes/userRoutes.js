// backend/routes/userRoutes.js
const express = require('express');
const { createOrUpdateUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/user', verifyToken, createOrUpdateUser);

module.exports = router;
