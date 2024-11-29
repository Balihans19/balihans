const express = require('express');
const router = express.Router();
const StrategyAndConsultingpage = require('../models/StrategyAndConsultingPage');

/**
 * @route   GET /api/strategyandconsultingpage
 * @desc    Retrieve strategyandconsultingpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the strategyandconsultingpage data from the database
    const strategyandconsultingpageData = await StrategyAndConsultingpage.findOne();
    
    // If no data is found, return a 404 error
    if (!strategyandconsultingpageData) {
      return res.status(404).json({ message: 'strategyandconsultingpage data not found' });
    }
    
    // Return the strategyandconsultingpage data as JSON
    res.json(strategyandconsultingpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;