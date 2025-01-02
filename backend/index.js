

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

//HomePages 
const homePageRoutes = require('./routes/homePageRoutes');
const homecasestudyonePageRoutes = require('./routes/homecasestudyonePageRoutes.js');
const homecasestudytwoPageRoutes = require('./routes/homecasestudytwoPageRoutes.js');
const homecasestudythreePageRoutes = require('./routes/homecasestudythreePageRoutes.js');
const homecasestudyfourPageRoutes = require('./routes/homecasestudyfourPageRoutes.js');

//AboutUsPages
const aboutusPageRoutes = require('./routes/aboutusPageRoutes');
const leadershipPageRoutes = require('./routes/leadershipPageRoutes');
const diversityPageRoutes = require('./routes/diversityPageRoutes');
const sustainabilityPageRoutes = require('./routes/sustainabilityPageRoutes');
const customerspeakPageRoutes = require('./routes/customerspeakPageRoutes');

//WhatWeDoPages
const whatwedoPageRoutes = require('./routes/whatwedoPageRoutes');
const aiPageRoutes=require('./routes/aiPageRoutes.js');
const strategyandconsultingPageRoutes=require('./routes/strategyandconsultingPageRoutes.js');
const cloudandinfrastructurePageRoutes=require('./routes/cloudandinfrastructurePageRoutes.js');
const cybersecurityPageRoutes=require('./routes/cybersecurityPageRoutes.js');
const dataandanalyticsPageRoutes=require('./routes/dataandanalyticsPageRoutes.js');
const digitalenterprisePageRoutes=require('./routes/digitalenterprisePageRoutes.js');
const web3solutionsPageRoutes=require('./routes/web3solutionsPageRoutes.js');
const iotPageRoutes=require('./routes/iotPageRoutes.js');
const testingservicesPageRoutes=require('./routes/testingservicesPageRoutes.js');
const professionalservicesPageRoutes=require('./routes/professionalservicesPageRoutes.js');
const retailandconsumergoodsPageRoutes=require('./routes/retailandconsumergoodsPageRoutes.js');
const travelandlogisticsPageRoutes=require('./routes/travelandlogisticsPageRoutes.js');


//IndustriesPages
const hightechPageRoutes=require('./routes/hightechPageRoutes.js');
const bsfiPageRoutes=require('./routes/bsfiPageRoutes.js');
const energyPageRoutes=require('./routes/energyPageRoutes.js');
const healthcarePageRoutes=require('./routes/healthcarePageRoutes.js');
const communicationsPageRoutes=require('./routes/communicationsPageRoutes.js');
const hospitalityPageRoutes=require('./routes/hospitalityPageRoutes.js');
const insurancePageRoutes=require('./routes/insurancePageRoutes.js');
const manufacturingPageRoutes=require('./routes/manufacturingPageRoutes.js');
const mediaandentertainmentPageRoutes=require('./routes/mediaandentertainmentPageRoutes.js');

//InsightsPages
const casestudiesPageRoutes=require('./routes/casestudiesPageRoutes.js');


//PoliciesPages
const privacypolicyPageRoutes=require('./routes/privacypolicyPageRoutes.js');
const cookiepolicyPageRoutes=require('./routes/cookiepolicyPageRoutes.js');
const securitypolicyPageRoutes=require('./routes/securitypolicyPageRoutes.js');
const disclaimerPageRoutes=require('./routes/disclaimerPageRoutes.js');

//ContactUsPages
const contactusPageRoutes=require('./routes/contactusPageRoutes.js');
const contactRoutes = require("./routes/contactRoutes");



require('dotenv').config();

// Initializing the Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '', // Fallback to allow all origins if FRONTEND_URL is not set
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
app.use('/api/homecasestudyonepage', homecasestudyonePageRoutes);
app.use('/api/homecasestudytwopage', homecasestudytwoPageRoutes);
app.use('/api/homecasestudythreepage', homecasestudythreePageRoutes);
app.use('/api/homecasestudyfourpage', homecasestudyfourPageRoutes);


app.use('/api/aboutuspage', aboutusPageRoutes);
app.use('/api/leadershippage', leadershipPageRoutes);
app.use('/api/diversitypage', diversityPageRoutes);
app.use('/api/sustainabilitypage', sustainabilityPageRoutes);
app.use('/api/customerspeakpage', customerspeakPageRoutes);


app.use('/api/whatwedopage', whatwedoPageRoutes);
app.use('/api/aipage', aiPageRoutes);
app.use('/api/strategyandconsultingpage', strategyandconsultingPageRoutes);
app.use('/api/cloudandinfrastructurepage', cloudandinfrastructurePageRoutes);
app.use('/api/cybersecuritypage', cybersecurityPageRoutes);
app.use('/api/dataandanalyticspage', dataandanalyticsPageRoutes);
app.use('/api/digitalenterprisepage', digitalenterprisePageRoutes);
app.use('/api/web3solutionspage', web3solutionsPageRoutes);
app.use('/api/iotpage', iotPageRoutes);
app.use('/api/testingservicespage', testingservicesPageRoutes);



app.use('/api/bsfipage', bsfiPageRoutes);
app.use('/api/energypage', energyPageRoutes);
app.use('/api/healthcarepage', healthcarePageRoutes);
app.use('/api/communicationspage', communicationsPageRoutes);
app.use('/api/hightechpage', hightechPageRoutes);
app.use('/api/hospitalitypage', hospitalityPageRoutes);
app.use('/api/insurancepage', insurancePageRoutes);
app.use('/api/manufacturingpage', manufacturingPageRoutes);
app.use('/api/mediaandentertainmentpage', mediaandentertainmentPageRoutes);
app.use('/api/professionalservicespage', professionalservicesPageRoutes);
app.use('/api/retailandconsumergoodspage', retailandconsumergoodsPageRoutes);
app.use('/api/travelandlogisticspage', travelandlogisticsPageRoutes);

app.use('/api/casestudiespage', casestudiesPageRoutes);

app.use('/api/privacypolicypage', privacypolicyPageRoutes);
app.use('/api/cookiepolicypage', cookiepolicyPageRoutes);
app.use('/api/securitypolicypage', securitypolicyPageRoutes);
app.use('/api/disclaimerpage', disclaimerPageRoutes);

app.use("/api/contactuspage", contactusPageRoutes);
app.use("/api/contact", contactRoutes);

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