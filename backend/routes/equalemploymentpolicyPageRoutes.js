const express = require('express');
const router = express.Router();
const EqualEmploymentPolicypage = require('../models/EqualEmploymentPolicyPage');

/**
 * @route   GET /api/equalemploymentpolicypage
 * @desc    Retrieve equalemploymentpolicypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the equalemploymentpolicypage data from the database
    const equalemploymentpolicypageData = await EqualEmploymentPolicypage.findOne();
    
    // If no data is found, return a 404 error
    if (!equalemploymentpolicypageData) {
      return res.status(404).json({ message: 'equalemploymentpolicypage data not found' });
    }
    
    // Return the equalemploymentpolicypage data as JSON
    res.json(equalemploymentpolicypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;