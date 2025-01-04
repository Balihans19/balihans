const express = require('express');
const router = express.Router();
const JoinUspage = require('../models/JoinUsPage');

/**
 * @route   GET /api/joinuspage
 * @desc    Retrieve joinuspage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the joinuspage data from the database
    const joinuspageData = await JoinUspage.findOne();
    
    // If no data is found, return a 404 error
    if (!joinuspageData) {
      return res.status(404).json({ message: 'joinuspage data not found' });
    }
    
    // Return the joinuspage data as JSON
    res.json(joinuspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;