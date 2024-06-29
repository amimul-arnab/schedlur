const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend
}));

// Define Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
