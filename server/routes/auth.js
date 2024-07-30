// server/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// @route    POST api/auth/signup
// @desc     Register user
// @access   Public
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
      console.log('Validation errors during signup:', errors.array()); // Debug log
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        fullName,
        email,
        password,
      });

      // Save the user, which will automatically hash the password due to the pre-save hook
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Server error during signup:', err.message); // Debug log
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth/signin
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/signin',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors during signin:', errors.array()); // Debug log
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    console.log('Sign in attempt with email:', email); // Debug log

    try {
      let user = await User.findOne({ email });

      if (!user) {
        console.error('User not found for email:', email); // Debug log
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      console.log('User found:', user); // Debug log

      // Call the comparePassword method on the user instance
      const isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch); // Debug log

      if (!isMatch) {
        console.error('Password does not match for user:', email); // Debug log
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Server error during signin:', err.message); // Debug log
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
