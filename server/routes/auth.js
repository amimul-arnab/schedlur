const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post(
  '/signup',
  [
    check('fullName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        fullName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'This account does not exist. Try Signing Up?' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect Login Credentials' });
      }
  
      // Return success message
      res.json({ msg: "Success You're logged in!" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
