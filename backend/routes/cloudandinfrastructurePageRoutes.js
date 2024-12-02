const express = require('express');
const router = express.Router();
const CloudAndInfrastructurepage = require('../models/CloudAndInfrastructurePage');

/**
 * @route   GET /api/cloudandinfrasturepage
 * @desc    Retrieve cloudandinfrasturepage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the cloudandinfrasturepage data from the database
    const cloudandinfrasturepageData = await CloudAndInfrastructurepage.findOne();
    
    // If no data is found, return a 404 error
    if (!cloudandinfrasturepageData) {
      return res.status(404).json({ message: 'cloudandinfrasturepage data not found' });
    }
    
    // Return the cloudandinfrasturepage data as JSON
    res.json(cloudandinfrasturepageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;