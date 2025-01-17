
const express = require('express');
const router = express.Router();
const WhitePaper = require('../models/WhitePaper');

// Get all case studies (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const whitePapers = await WhitePaper.find({})
      .select('slug seo.title mainSection.categories')
      .skip(skip)
      .limit(limit);

    const total = await WhitePaper.countDocuments();

    res.json({
      whitePapers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// New route: Get stories for CustomerStories component
router.get('/stories', async (req, res) => {
  try {
    const { page = 0, limit = 9 } = req.query;
    const totalStories = await WhitePaper.countDocuments();

    const whitepapers = await WhitePaper.find({})
      .select('slug mainSection.heading mainSection.backgroundImageUrl ')
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit))
      .lean();

    const transformedStories = whitepapers.map(paper => ({
      slug: paper.slug,
      heading: paper.mainSection.heading,
      backgroundImageUrl: paper.mainSection.backgroundImageUrl
    }));

    const pagination = {
      totalPages: Math.ceil(totalStories / parseInt(limit)),
      currentPage: parseInt(page),
      totalItems: totalStories,
    };

    res.json({ stories: transformedStories, pagination });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single White Paper by slug
router.get('/:slug', async (req, res) => {
  try {
    const whitePaper = await WhitePaper.findOne({ slug: req.params.slug });
    if (!whitePaper) {
      return res.status(404).json({ message: 'White Paper not found' });
    }
    res.json(whitePaper);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;