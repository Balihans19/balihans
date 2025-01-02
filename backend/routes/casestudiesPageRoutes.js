const express = require('express');
const router = express.Router();
const CaseStudiespage = require('../models/CaseStudiesPage');

/**
 * @route   GET /api/casestudiespage
 * @desc    Retrieve casestudiespage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the casestudiespage data from the database
    const casestudiespageData = await CaseStudiespage.findOne();
    
    // If no data is found, return a 404 error
    if (!casestudiespageData) {
      return res.status(404).json({ message: 'casestudiespage data not found' });
    }
    
    // Return the casestudiespage data as JSON
    res.json(casestudiespageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
