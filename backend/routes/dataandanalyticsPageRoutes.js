const express = require('express');
const router = express.Router();
const DataAndAnalyticspage = require('../models/DataAndAnalyticsPage');

/**
 * @route   GET /api/dataandanalyticspage
 * @desc    Retrieve dataandanalyticspage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the dataandanalyticspage data from the database
    const dataandanalyticspageData = await DataAndAnalyticspage.findOne();
    
    // If no data is found, return a 404 error
    if (!dataandanalyticspageData) {
      return res.status(404).json({ message: 'dataandanalyticspage data not found' });
    }
    
    // Return the dataandanalyticspage data as JSON
    res.json(dataandanalyticspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;