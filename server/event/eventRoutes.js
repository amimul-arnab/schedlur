const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('./eventController');
const auth = require('../middleware/auth');
const router = express.Router();

// Create event route
router.post('/create', auth, createEvent);

// Get events route
router.get('/', auth, getEvents);

// Update event route
router.put('/:id', auth, updateEvent);

// Delete event route
router.delete('/:id', auth, deleteEvent);

module.exports = router;
