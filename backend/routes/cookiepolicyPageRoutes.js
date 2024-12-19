const express = require('express');
const router = express.Router();
const CookiePolicypage = require('../models/CookiePolicyPage');

/**
 * @route   GET /api/cookiepolicypage
 * @desc    Retrieve cookiepolicypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the cookiepolicypage data from the database
    const cookiepolicypageData = await CookiePolicypage.findOne();
    
    // If no data is found, return a 404 error
    if (!cookiepolicypageData) {
      return res.status(404).json({ message: 'cookiepolicypage data not found' });
    }
    
    // Return the cookiepolicypage data as JSON
    res.json(cookiepolicypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;