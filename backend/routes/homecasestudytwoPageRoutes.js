const express = require('express');
const router = express.Router();
const HomeCaseStudyTwopage = require('../models/HomeCaseStudyTwoPage');

/**
 * @route   GET /api/homecasestudytwopage
 * @desc    Retrieve homecasestudytwopage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the homecasestudytwopage data from the database
    const homecasestudytwopageData = await HomeCaseStudyTwopage.findOne();
    
    // If no data is found, return a 404 error
    if (!homecasestudytwopageData) {
      return res.status(404).json({ message: 'homecasestudytwopage data not found' });
    }
    
    // Return the homecasestudytwopage data as JSON
    res.json(homecasestudytwopageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;