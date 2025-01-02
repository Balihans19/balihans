const express = require('express');
const router = express.Router();
const TravelAndLogisticspage = require('../models/TravelAndLogisticsPage');

/**
 * @route   GET /api/travelandlogisticscarepage
 * @desc    Retrieve travelandlogisticspage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the travelandlogisticspage data from the database
    const travelandlogisticspageData = await TravelAndLogisticspage.findOne();
    
    // If no data is found, return a 404 error
    if (!travelandlogisticspageData) {
      return res.status(404).json({ message: 'travelandlogisticspage data not found' });
    }
    
    // Return the travelandlogisticspage data as JSON
    res.json(travelandlogisticspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;