const express = require('express');
const router = express.Router();
const AboutUspage = require('../models/AboutUsPage');

/**
 * @route   GET /api/aboutuspage
 * @desc    Retrieve aboutus data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the aboutus data from the database
    const aboutuspageData = await AboutUspage.findOne();
    
    // If no data is found, return a 404 error
    if (!aboutuspageData) {
      return res.status(404).json({ message: 'Aboutuspage data not found' });
    }
    
    // Return the aboutus data as JSON
    res.json(aboutuspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


