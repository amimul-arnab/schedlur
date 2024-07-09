const Routine = require('./Routine');

// Create Routine
exports.createRoutine = async (req, res) => {
  try {
    const { title, date, startTime, endTime, notes, color } = req.body; // Include color
    const user_id = req.user.id; // Extract user ID from req.user
    console.log('User ID:', user_id); // Debug log to ensure user_id is set
    const newRoutine = new Routine({
      title,
      date,
      startTime,
      endTime,
      notes,
      color, // Add color to the new routine
      user_id
    });
    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(500).json({ message: 'Error creating routine', error });
  }
};

// Fetch Routines
exports.getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ user_id: req.user.id });
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching routines', error });
  }
};

// Update Routine
exports.updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoutine = await Routine.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json(updatedRoutine);
  } catch (error) {
    res.status(500).json({ message: 'Error updating routine', error });
  }
};

// Delete Routine
exports.deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoutine = await Routine.findByIdAndDelete(id);
    if (!deletedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json({ message: 'Routine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting routine', error });
  }
};
