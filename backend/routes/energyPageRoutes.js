const express = require('express');
const router = express.Router();
const Energypage = require('../models/EnergyPage');

/**
 * @route   GET /api/energypage
 * @desc    Retrieve energypage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the energypage data from the database
    const energypageData = await Energypage.findOne();
    
    // If no data is found, return a 404 error
    if (!energypageData) {
      return res.status(404).json({ message: 'Energypage data not found' });
    }
    
    // Return the energypage data as JSON
    res.json(energypageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;