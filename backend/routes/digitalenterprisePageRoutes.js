const express = require('express');
const router = express.Router();
const DigitalEnterprisepage = require('../models/DigitalEnterprisePage');

/**
 * @route   GET /api/digitalenterprisepage
 * @desc    Retrieve digitalenterprisepage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the digitalenterprisepage data from the database
    const digitalenterprisepageData = await DigitalEnterprisepage.findOne();
    
    // If no data is found, return a 404 error
    if (!digitalenterprisepageData) {
      return res.status(404).json({ message: 'digitalenterprisepage data not found' });
    }
    
    // Return the digitalenterprisepage data as JSON
    res.json(digitalenterprisepageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;