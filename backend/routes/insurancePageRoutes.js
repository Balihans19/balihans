const express = require('express');
const router = express.Router();
const Insurancepage = require('../models/InsurancePage');

/**
 * @route   GET /api/insurancecarepage
 * @desc    Retrieve insurancepage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the insurancepage data from the database
    const insurancepageData = await Insurancepage.findOne();
    
    // If no data is found, return a 404 error
    if (!insurancepageData) {
      return res.status(404).json({ message: 'insurancepage data not found' });
    }
    
    // Return the insurancepage data as JSON
    res.json(insurancepageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;