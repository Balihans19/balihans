const express = require('express');
const router = express.Router();
const Web3Solutionspage = require('../models/Web3SolutionsPage');

/**
 * @route   GET /api/web3solutionspage
 * @desc    Retrieve web3solutionspage data from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch the web3solutionspage data from the database
    const web3solutionspageData = await Web3Solutionspage.findOne();
    
    // If no data is found, return a 404 error
    if (!web3solutionspageData) {
      return res.status(404).json({ message: 'web3solutionspage data not found' });
    }
    
    // Return the web3solutionspage data as JSON
    res.json(web3solutionspageData);
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;