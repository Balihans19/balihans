const express = require('express');
const router = express.Router();
const Blogspage = require('../models/BlogsPage');

/**
 * @route   GET /api/blogspage
 * @desc    Retrieve blogspage data from the database
 * @access  Public
 */


  
router.get('/', async (req, res) => {
  try {
    // Fetch the blogspage data from the database
    const blogspageData = await Blogspage.findOne();
    
    // If no data is found, return a 404 error
    if (!blogspageData) {
      return res.status(404).json({ message: 'blogspage data not found' });
    }
    
    // Return the blogspage data as JSON
    res.json(blogspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;