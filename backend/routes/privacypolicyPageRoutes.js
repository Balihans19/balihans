const express = require('express');
const router = express.Router();
const PrivacyPolicypage = require('../models/PrivacyPolicyPage');

/**
 * @route   GET /api/privacypolicypage
 * @desc    Retrieve privacypolicypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the privacypolicypage data from the database
    const privacypolicypageData = await PrivacyPolicypage.findOne();
    
    // If no data is found, return a 404 error
    if (!privacypolicypageData) {
      return res.status(404).json({ message: 'privacypolicypageData data not found' });
    }
    
    // Return the privacypolicypage data as JSON
    res.json(privacypolicypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
