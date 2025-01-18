// backend/Server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
    .connect(process.env.MONGO_URI) // Remove useNewUrlParser and useUnifiedTopology
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use(errorHandler);

// Default Route
app.get('/', (req, res) => {
    res.send('Task Management Backend is Running!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
