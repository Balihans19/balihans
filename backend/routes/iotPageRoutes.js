const express = require('express');
const router = express.Router();
const IOTpage = require('../models/IOTPage');

/**
 * @route   GET /api/iotpage
 * @desc    Retrieve iotpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the iotpage data from the database
    const iotpageData = await IOTpage.findOne();
    
    // If no data is found, return a 404 error
    if (!iotpageData) {
      return res.status(404).json({ message: 'iotpage data not found' });
    }
    
    // Return the iotpage data as JSON
    res.json(iotpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;