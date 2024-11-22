
// Importing required modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const homePageRoutes = require('./routes/homePageRoutes');
const aboutusPageRoutes = require('./routes/aboutusPageRoutes');
const leadershipPageRoutes = require('./routes/leadershipPageRoutes');
require('dotenv').config(); // Load environment variables

// Initializing the Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/homepage', homePageRoutes);
app.use('/api/aboutuspage', aboutusPageRoutes);
app.use('/api/leadershippage', leadershipPageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    environment: process.env.NODE_ENV
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Balihans Platform');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Accepting requests from: ${process.env.FRONTEND_URL}`);
});



