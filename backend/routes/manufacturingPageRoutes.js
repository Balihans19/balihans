const express = require('express');
const router = express.Router();
const Manufacturingpage = require('../models/ManufacturingPage');

/**
 * @route   GET /api/manufacturingcarepage
 * @desc    Retrieve manufacturingpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the manufacturingpage data from the database
    const manufacturingpageData = await Manufacturingpage.findOne();
    
    // If no data is found, return a 404 error
    if (!manufacturingpageData) {
      return res.status(404).json({ message: 'manufacturingpage data not found' });
    }
    
    // Return the manufacturingpage data as JSON
    res.json(manufacturingpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;