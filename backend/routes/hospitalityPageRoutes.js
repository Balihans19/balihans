const express = require('express');
const router = express.Router();
const Hospitalitypage = require('../models/HospitalityPage');

/**
 * @route   GET /api/hospitalitycarepage
 * @desc    Retrieve hospitalitypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the hospitalitypage data from the database
    const hospitalitypageData = await Hospitalitypage.findOne();
    
    // If no data is found, return a 404 error
    if (!hospitalitypageData) {
      return res.status(404).json({ message: 'hospitalitypage data not found' });
    }
    
    // Return the hospitalitypage data as JSON
    res.json(hospitalitypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;