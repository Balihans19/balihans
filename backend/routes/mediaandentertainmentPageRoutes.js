const express = require('express');
const router = express.Router();
const MediaAndEntertainmentpage = require('../models/MediaAndEntertainmentPage');

/**
 * @route   GET /api/mediaandentertainmentcarepage
 * @desc    Retrieve mediaandentertainmentpage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the mediaandentertainmentpage data from the database
    const mediaandentertainmentpageData = await MediaAndEntertainmentpage.findOne();
    
    // If no data is found, return a 404 error
    if (!mediaandentertainmentpageData) {
      return res.status(404).json({ message: 'mediaandentertainmentpage data not found' });
    }
    
    // Return the mediaandentertainmentpage data as JSON
    res.json(mediaandentertainmentpageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;