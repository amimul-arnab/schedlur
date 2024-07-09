const express = require('express');
const { createRoutine, getRoutines, updateRoutine, deleteRoutine } = require('./routineController');
const router = express.Router();
const auth = require('../middleware/auth'); // Adjust the path to the auth middleware

// Create routine route
router.post('/create', auth, createRoutine);

// Get routines route
router.get('/', auth, getRoutines);

// Update routine route
router.put('/:id', auth, updateRoutine);

// Delete routine route
router.delete('/:id', auth, deleteRoutine);

module.exports = router;
