// backend/middlewares/authMiddleware.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebaseServiceAccountKey.json'); // Add Firebase service account key here

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach user info to the request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
