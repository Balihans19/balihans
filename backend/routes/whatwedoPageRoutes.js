const express = require('express');
const router = express.Router();
const WhatWeDopage = require('../models/WhatWeDoPage');

/**
 * @route   GET /api/whatwedopage
 * @desc    Retrieve whatwedopage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the homepage data from the database
    const whatwedopageData = await WhatWeDopage.findOne();
    
    // If no data is found, return a 404 error
    if (!whatwedopageData) {
      return res.status(404).json({ message: 'Homepage data not found' });
    }
    
    // Return the whatwedopage data as JSON
    res.json(whatwedopageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;