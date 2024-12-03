const express = require('express');
const router = express.Router();
const Cybersecuritypage = require('../models/CybersecurityPage');

/**
 * @route   GET /api/cybersecuritypage
 * @desc    Retrieve cybersecuritypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the cybersecuritypage data from the database
    const cybersecuritypageData = await Cybersecuritypage.findOne();
    
    // If no data is found, return a 404 error
    if (!cybersecuritypageData) {
      return res.status(404).json({ message: 'cybersecuritypage data not found' });
    }
    
    // Return the cybersecuritypage data as JSON
    res.json(cybersecuritypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;