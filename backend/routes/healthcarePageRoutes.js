const express = require('express');
const router = express.Router();
const HealthCarepage = require('../models/HealthCarePage');

/**
 * @route   GET /api/healthcarepage
 * @desc    Retrieve healthcarepage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the healthcarepage data from the database
    const healthcarepageData = await HealthCarepage.findOne();
    
    // If no data is found, return a 404 error
    if (!healthcarepageData) {
      return res.status(404).json({ message: 'healtharepage data not found' });
    }
    
    // Return the healthcarepage data as JSON
    res.json(healthcarepageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;