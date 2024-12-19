const express = require('express');
const router = express.Router();
const CustomerSpeakpage = require('../models/CustomerSpeakPage');

/**
 * @route   GET /api/customerspeakpage
 * @desc    Retrieve customerspeakpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the customerspeakpage data from the database
    const customerspeakpageData = await CustomerSpeakpage.findOne();
    
    // If no data is found, return a 404 error
    if (!customerspeakpageData) {
      return res.status(404).json({ message: 'customerspeakpage data not found' });
    }
    
    // Return the customerspeakpage data as JSON
    res.json(customerspeakpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;