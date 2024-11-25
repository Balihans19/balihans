const express = require('express');
const router = express.Router();
const Diversitypage = require('../models/DiversityPage');

/**
 * @route   GET /api/diversitypage
 * @desc    Retrieve diversitypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the diversitypage data from the database
    const diversitypageData = await Diversitypage.findOne();
    
    // If no data is found, return a 404 error
    if (!diversitypageData) {
      return res.status(404).json({ message: 'diversitypageData data not found' });
    }
    
    // Return the diversitypage data as JSON
    res.json(diversitypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
