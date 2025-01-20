const express = require('express');
const router = express.Router();
const AntiHarassmentPolicypage = require('../models/AntiHarassmentPolicyPage');

/**
 * @route   GET /api/antiharassmentpolicypage
 * @desc    Retrieve antiharassmentpolicypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the antiharassmentpolicypage data from the database
    const antiharassmentpolicypageData = await AntiHarassmentPolicypage.findOne();
    
    // If no data is found, return a 404 error
    if (!antiharassmentpolicypageData) {
      return res.status(404).json({ message: 'antiharassmentpolicypage data not found' });
    }
    
    // Return the antiharassmentpolicypage data as JSON
    res.json(antiharassmentpolicypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;