const express = require('express');
const router = express.Router();
const Sustainabilitypage = require('../models/SustainabilityPage');

/**
 * @route   GET /api/sustainabilitypage
 * @desc    Retrieve sustainabilitypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the diversitypage data from the database
    const sustainabilitypageData = await Sustainabilitypage.findOne();
    
    // If no data is found, return a 404 error
    if (!sustainabilitypageData) {
      return res.status(404).json({ message: 'sustainabilitypageData data not found' });
    }
    
    // Return the sustainabilitypage data as JSON
    res.json(sustainabilitypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;