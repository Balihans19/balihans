const express = require('express');
const router = express.Router();
const HighTechpage = require('../models/HighTechPage');

/**
 * @route   GET /api/hightechcarepage
 * @desc    Retrieve hightechpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the hightechpage data from the database
    const hightechpageData = await HighTechpage.findOne();
    
    // If no data is found, return a 404 error
    if (!hightechpageData) {
      return res.status(404).json({ message: 'hightechpage data not found' });
    }
    
    // Return the hightechpage data as JSON
    res.json(hightechpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;