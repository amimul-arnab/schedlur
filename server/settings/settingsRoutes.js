// server/settings/settingsRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserInfo, updateUserInfo, deleteUser } = require('../settings/settingsController');

// Get user info
router.get('/user', auth, getUserInfo);

// Update user info
router.put('/user', auth, updateUserInfo);

// Delete user and related data
router.delete('/user', auth, deleteUser);

module.exports = router;
