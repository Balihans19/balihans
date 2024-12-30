const express = require('express');
const router = express.Router();
const ProfessionalServicespage = require('../models/ProfessionalServicesPage');

/**
 * @route   GET /api/professionalservicescarepage
 * @desc    Retrieve professionalservicespage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the professionalservicespage data from the database
    const professionalservicespageData = await ProfessionalServicespage.findOne();
    
    // If no data is found, return a 404 error
    if (!professionalservicespageData) {
      return res.status(404).json({ message: 'professionalservicespage data not found' });
    }
    
    // Return the professionalservicespage data as JSON
    res.json(professionalservicespageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;