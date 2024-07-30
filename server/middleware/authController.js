const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            fullName,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log('Hashed password:', user.password); // Debug log

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Token generation error:', err);
                throw err;
            }
            console.log('Generated token:', token); // Debug log
            res.json({ token });
        });
    } catch (err) {
        console.error('Signup error:', err.message); // Debug log
        res.status(500).send('Server error');
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Log the email and password for debugging purposes
        console.log('Sign-in attempt for email:', email);
        console.log('Password provided (plaintext):', password); // Log the plaintext password
        console.log('Hashed password in database:', user.password); // Log the hashed password

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.error('Password mismatch for user:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Token generation error:', err);
                throw err;
            }
            res.json({ token });
        });
    } catch (err) {
        console.error('Signin error:', err.message);
        res.status(500).send('Server error');
    }
};


// Logout function to clear the user's session
exports.logout = async (req, res) => {
    try {
        req.user = null;
        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
