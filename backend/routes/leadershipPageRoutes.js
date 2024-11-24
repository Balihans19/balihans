const express = require('express');
const router = express.Router();
const LeaderShippage = require('../models/leadershipPage');

/**
 * @route   GET /api/leadershippage
 * @desc    Retrieve leadershippage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the leadershippage data from the database
    const leadershippageData = await LeaderShippage.findOne();
    
    // If no data is found, return a 404 error
    if (!leadershippageData) {
      return res.status(404).json({ message: 'leadershippageData data not found' });
    }
    
    // Return the leadershippage data as JSON
    res.json(leadershippageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

