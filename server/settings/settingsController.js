// server/settings/settingsController.js

const User = require('./User');
const Routine = require('../models/Routine');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

exports.getUserInfo = async (req, res) => {
  try {
    console.log('Fetching user info for user ID:', req.user.id); // Debug log
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.error('User not found'); // Debug log
      return res.status(404).json({ msg: 'User not found' });
    }
    console.log('User info retrieved:', user); // Debug log
    res.json(user);
  } catch (err) {
    console.error('Error fetching user info:', err.message); // Debug log
    res.status(500).send('Server Error');
  }
};

exports.updateUserInfo = async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log('Updating user info for user ID:', req.user.id); // Debug log

  const userFields = {};
  if (fullName) userFields.fullName = fullName;
  if (email) userFields.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userFields.password = await bcrypt.hash(password, salt);
  }

  try {
    let user = await User.findById(req.user.id);

    if (user) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: userFields },
        { new: true }
      );
      console.log('User info updated:', user); // Debug log
      return res.json(user);
    }

    console.error('User not found for update'); // Debug log
    res.status(404).json({ msg: 'User not found' });
  } catch (err) {
    console.error('Error updating user info:', err.message); // Debug log
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log('Deleting routines for user ID:', req.user.id); // Debug log
    await Routine.deleteMany({ user_id: req.user.id });
    console.log('Routines deleted'); // Debug log
    console.log('Deleting events for user ID:', req.user.id); // Debug log
    await Event.deleteMany({ user_id: req.user.id });
    console.log('Events deleted'); // Debug log
    console.log('Deleting user ID:', req.user.id); // Debug log
    await User.findByIdAndDelete(req.user.id); // Updated function
    console.log('User and related data deleted'); // Debug log
    res.json({ msg: 'User and related data deleted' });
  } catch (err) {
    console.error('Error deleting user and related data:', err.message); // Debug log
    res.status(500).send('Server Error');
  }
};
