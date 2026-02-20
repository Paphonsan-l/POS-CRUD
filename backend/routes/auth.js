const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (require authentication)
router.get('/profile', verifyToken, authController.getProfile);
router.put('/profile', verifyToken, authController.updateProfile);
router.put('/change-password', verifyToken, authController.changePassword);

// Admin only routes
router.get('/users', verifyToken, isAdmin, authController.getAllUsers);
router.post('/users', verifyToken, isAdmin, authController.createUser);
router.put('/users/:id', verifyToken, isAdmin, authController.updateUser);
router.delete('/users/:id', verifyToken, isAdmin, authController.deleteUser);

module.exports = router;
