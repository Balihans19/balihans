const express = require('express');
const router = express.Router();
const Disclaimerpage = require('../models/DisclaimerPage');

/**
 * @route   GET /api/disclaimerpage
 * @desc    Retrieve disclaimerpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the disclaimerpage data from the database
    const disclaimerpageData = await Disclaimerpage.findOne();
    
    // If no data is found, return a 404 error
    if (!disclaimerpageData) {
      return res.status(404).json({ message: 'disclaimerpageData data not found' });
    }
    
    // Return the disclaimerpage data as JSON
    res.json(disclaimerpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
