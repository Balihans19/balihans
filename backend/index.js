const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const homePageRoutes = require('./routes/homePageRoutes');
const aboutusPageRoutes = require('./routes/aboutusPageRoutes');
const leadershipPageRoutes = require('./routes/leadershipPageRoutes');
const diversityPageRoutes = require('./routes/diversityPageRoutes');
const sustainabilityPageRoutes = require('./routes/sustainabilityPageRoutes');
const whatwedoPageRoutes = require('./routes/whatwedoPageRoutes');
const bsfiPageRoutes=require('./routes/bsfiPageRoutes.js');
const energyPageRoutes=require('./routes/energyPageRoutes.js');
const healthcarePageRoutes=require('./routes/healthcarePageRoutes.js');
const communicationsPageRoutes=require('./routes/communicationsPageRoutes.js');
const hightechPageRoutes=require('./routes/hightechPageRoutes.js');
const aiPageRoutes=require('./routes/aiPageRoutes.js');
const strategyandconsultingPageRoutes=require('./routes/strategyandconsultingPageRoutes.js');
const cloudandinfrastructurePageRoutes=require('./routes/cloudandinfrastructurePageRoutes.js');
const cybersecurityPageRoutes=require('./routes/cybersecurityPageRoutes.js');
const dataandanalyticsPageRoutes=require('./routes/dataandanalyticsPageRoutes.js');
require('dotenv').config();

// Initializing the Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Fallback to allow all origins if FRONTEND_URL is not set
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Graceful shutdown handling
let server;
const connections = new Set();

// Connect to MongoDB with retry logic
const initializeMongoDB = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // In Cloud Run, we should exit on DB connection failure
    // Cloud Run will automatically restart the container
    process.exit(1);
  }
};

// API routes
app.use('/api/homepage', homePageRoutes);
app.use('/api/aboutuspage', aboutusPageRoutes);
app.use('/api/leadershippage', leadershipPageRoutes);
app.use('/api/diversitypage', diversityPageRoutes);
app.use('/api/sustainabilitypage', sustainabilityPageRoutes);
app.use('/api/whatwedopage', whatwedoPageRoutes);
app.use('/api/bsfipage', bsfiPageRoutes);
app.use('/api/energypage', energyPageRoutes);
app.use('/api/healthcarepage', healthcarePageRoutes);
app.use('/api/communicationspage', communicationsPageRoutes);
app.use('/api/hightechpage', hightechPageRoutes);
app.use('/api/aipage', aiPageRoutes);
app.use('/api/strategyandconsultingpage', strategyandconsultingPageRoutes);
app.use('/api/cloudandinfrastructurepage', cloudandinfrastructurePageRoutes);
app.use('/api/cybersecuritypage', cybersecurityPageRoutes);
app.use('/api/dataandanalyticspage', dataandanalyticsPageRoutes);


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Balihans Platform');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Initialize server
const startServer = async () => {
  try {
    // Ensure MongoDB is connected before starting the server
    await initializeMongoDB();

    const PORT = parseInt(process.env.PORT || '8080', 10);
    server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`Accepting requests from: ${process.env.FRONTEND_URL || '*'}`);
    });

    // Track all connections
    server.on('connection', connection => {
      connections.add(connection);
      connection.on('close', () => connections.delete(connection));
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown handler
const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new connections
  if (server) {
    server.close(() => {
      console.log('Server closed');
    });
  }

  // Close all existing connections
  for (const connection of connections) {
    connection.end();
    connections.delete(connection);
  }

  // Additional cleanup if needed
  try {
    // Add any other cleanup tasks here
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Register shutdown handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the server
startServer().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});