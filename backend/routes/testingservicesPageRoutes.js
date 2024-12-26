const express = require('express');
const router = express.Router();
const TestingServicespage = require('../models/TestingServicesPage');

/**
 * @route   GET /api/testingservicespage
 * @desc    Retrieve testingservicespage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the testingservicespage data from the database
    const testingservicespageData = await TestingServicespage.findOne();
    
    // If no data is found, return a 404 error
    if (!testingservicespageData) {
      return res.status(404).json({ message: 'testingservicespage data not found' });
    }
    
    // Return the testingservicespage data as JSON
    res.json(testingservicespageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;