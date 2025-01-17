const express = require('express');
const router = express.Router();
const Infocuspage = require('../models/InfocusPage');

/**
 * @route   GET /api/infocuspage
 * @desc    Retrieve infocuspage data from the database
 * @access  Public
 */


  
router.get('/', async (req, res) => {
  try {
    // Fetch the infocuspage data from the database
    const infocuspageData = await Infocuspage.findOne();
    
    // If no data is found, return a 404 error
    if (!infocuspageData) {
      return res.status(404).json({ message: 'infocuspage data not found' });
    }
    
    // Return the infocuspage data as JSON
    res.json(infocuspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;