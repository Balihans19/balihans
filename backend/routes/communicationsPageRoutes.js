const express = require('express');
const router = express.Router();
const Communicationspage = require('../models/CommunicationsPage');

/**
 * @route   GET /api/communicationspage
 * @desc    Retrieve communicationspage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the communicationspage data from the database
    const communicationspageData = await Communicationspage.findOne();
    
    // If no data is found, return a 404 error
    if (!communicationspageData) {
      return res.status(404).json({ message: 'communicationspage data not found' });
    }
    
    // Return the communicationspage data as JSON
    res.json(communicationspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;