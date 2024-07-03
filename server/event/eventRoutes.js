const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('./eventController');
const router = express.Router();

// Create event route
router.post('/create', createEvent);

// Get events route
router.get('/', getEvents);

// Update event route
router.put('/:id', updateEvent);

// Delete event route
router.delete('/:id', deleteEvent);

module.exports = router;
