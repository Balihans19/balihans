const express = require('express');
const router = express.Router();
const SecurityPolicypage = require('../models/SecurityPolicyPage');

/**
 * @route   GET /api/securitypolicypage
 * @desc    Retrieve securitypolicypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the securitypolicypage data from the database
    const securitypolicypageData = await SecurityPolicypage.findOne();
    
    // If no data is found, return a 404 error
    if (!securitypolicypageData) {
      return res.status(404).json({ message: 'securitypolicypageData data not found' });
    }
    
    // Return the securitypolicypage data as JSON
    res.json(securitypolicypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
