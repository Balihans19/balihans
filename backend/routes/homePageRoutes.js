const express = require('express');
const router = express.Router();
const Homepage = require('../models/HomePage');

/**
 * @route   GET /api/homepage
 * @desc    Retrieve homepage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the homepage data from the database
    const homepageData = await Homepage.findOne();
    
    // If no data is found, return a 404 error
    if (!homepageData) {
      return res.status(404).json({ message: 'Homepage data not found' });
    }
    
    // Return the homepage data as JSON
    res.json(homepageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;




