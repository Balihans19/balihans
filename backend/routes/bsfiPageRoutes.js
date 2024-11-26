const express = require('express');
const router = express.Router();
const BSFIpage = require('../models/BSFI');

/**
 * @route   GET /api/bsfipage
 * @desc    Retrieve bsfipage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the bsfipage data from the database
    const bsfipageData = await BSFIpage.findOne();
    
    // If no data is found, return a 404 error
    if (!bsfipageData) {
      return res.status(404).json({ message: 'BSFIpage data not found' });
    }
    
    // Return the BSFIpage data as JSON
    res.json(bsfipageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
