// backend/controllers/userController.js
const User = require('../models/User');

// Create or Update User
exports.createOrUpdateUser = async (req, res) => {
    try {
        const { name, email, authProvider } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            // Update existing user
            user.name = name;
            user.authProvider = authProvider || 'Google';
            await user.save();
            return res.status(200).json(user);
        }

        // Create new user
        user = new User({ name, email, authProvider });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating or updating user.' });
    }
};
