const express = require('express');
const router = express.Router();
const HomeCaseStudyOnepage = require('../models/HomeCaseStudyOnePage');

/**
 * @route   GET /api/homecasestudyonepage
 * @desc    Retrieve homecasestudyonepage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the homecasestudyonepage data from the database
    const homecasestudyonepageData = await HomeCaseStudyOnepage.findOne();
    
    // If no data is found, return a 404 error
    if (!homecasestudyonepageData) {
      return res.status(404).json({ message: 'homecasestudyonepage data not found' });
    }
    
    // Return the homecasestudyonepage data as JSON
    res.json(homecasestudyonepageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;