const express = require('express');
const router = express.Router();
const RetailAndConsumerGoodspage = require('../models/RetailAndConsumerGoodsPage');

/**
 * @route   GET /api/retailandconsumergoodscarepage
 * @desc    Retrieve retailandconsumergoodspage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the retailandconsumergoodspage data from the database
    const retailandconsumergoodspageData = await RetailAndConsumerGoodspage.findOne();
    
    // If no data is found, return a 404 error
    if (!retailandconsumergoodspageData) {
      return res.status(404).json({ message: 'retailandconsumergoodspage data not found' });
    }
    
    // Return the retailandconsumergoodspage data as JSON
    res.json(retailandconsumergoodspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;