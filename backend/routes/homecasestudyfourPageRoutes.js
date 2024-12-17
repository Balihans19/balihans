const express = require('express');
const router = express.Router();
const HomeCaseStudyFourpage = require('../models/HomeCaseStudyFourPage');

/**
 * @route   GET /api/homecasestudyfourpage
 * @desc    Retrieve homecasestudyfourpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the homecasestudyfourpage data from the database
    const homecasestudyfourpageData = await HomeCaseStudyFourpage.findOne();
    
    // If no data is found, return a 404 error
    if (!homecasestudyfourpageData) {
      return res.status(404).json({ message: 'homecasestudyfourpage data not found' });
    }
    
    // Return the homecasestudyfourpage data as JSON
    res.json(homecasestudyfourpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;