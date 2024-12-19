const express = require('express');
const router = express.Router();
const ContactUspage = require('../models/ContactUsPage');

/**
 * @route   GET /api/contactuspage
 * @desc    Retrieve contactuspage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the contactuspage data from the database
    const contactuspageData = await ContactUspage.findOne();
    
    // If no data is found, return a 404 error
    if (!contactuspageData) {
      return res.status(404).json({ message: 'contactuspage data not found' });
    }
    
    // Return the contactuspage data as JSON
    res.json(contactuspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;