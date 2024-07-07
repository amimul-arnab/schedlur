const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
  try {
    console.log('Request received:', req.body); // Add this line for debugging
    console.log('Authenticated User:', req.user); // Add this line for debugging

    const { title, date, startTime, endTime, reminder, notes } = req.body;

    const newEvent = new Event({
      user_id: req.user.id,
      title,
      date,
      startTime,
      endTime,
      reminder,
      notes
    });

    console.log('Event to be saved:', newEvent); // Debug log to inspect the event

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error); // Add this line for debugging
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Fetch Events
exports.getEvents = async (req, res) => {
  try {
    console.log('Fetching events for user:', req.user.id); // Debug log
    const events = await Event.find({ user_id: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error); // Add this line for debugging
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error); // Add this line for debugging
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findOneAndDelete({ _id: id, user_id: req.user.id });
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error); // Add this line for debugging
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
