const express = require('express');
const router = express.Router();
const HomeCaseStudyThreepage = require('../models/HomeCaseStudyThreePage');

/**
 * @route   GET /api/homecasestudythreepage
 * @desc    Retrieve homecasestudythreepage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the homecasestudythreepage data from the database
    const homecasestudythreepageData = await HomeCaseStudyThreepage.findOne();
    
    // If no data is found, return a 404 error
    if (!homecasestudythreepageData) {
      return res.status(404).json({ message: 'homecasestudythreepage data not found' });
    }
    
    // Return the homecasestudythreepage data as JSON
    res.json(homecasestudythreepageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;