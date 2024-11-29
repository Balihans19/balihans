const express = require('express');
const router = express.Router();
const AIpage = require('../models/AIPage');

/**
 * @route   GET /api/aipage
 * @desc    Retrieve aipage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the aipage data from the database
    const aipageData = await AIpage.findOne();
    
    // If no data is found, return a 404 error
    if (!aipageData) {
      return res.status(404).json({ message: 'aipage data not found' });
    }
    
    // Return the aipage data as JSON
    res.json(aipageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;