// routes/slideRoutes.js
const express = require('express');
const WhitePaperSlidesPage = require('../models/WhitePaperSlidesPage');
const router = express.Router();

// Fetch 4 random slides
router.get('/random', async (req, res) => {
  try {
    const slides = await WhitePaperSlidesPage.aggregate([{ $sample: { size: 4 } }]);
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;