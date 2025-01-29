

const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');

// Get all case studies (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const caseStudies = await CaseStudy.find({})
      .select('slug seo.title mainSection.categories')
      .skip(skip)
      .limit(limit);

    const total = await CaseStudy.countDocuments();

    res.json({
      caseStudies,
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
    const { page = 0, limit = 9 } = req.query; // Extract page and limit from query params
    const totalStories = await CaseStudy.countDocuments(); // Count total stories
    const stories = await CaseStudy.find({})
      .select('slug mainSection.categories mainSection.heading mainSection.backgroundImageUrl')
      .skip(page * limit)
      .limit(parseInt(limit))
      .lean();

    const transformedStories = stories.map(story => ({
      slug: story.slug,
      categories: story.mainSection.categories,
      heading: story.mainSection.heading,
      backgroundImageUrl: story.mainSection.backgroundImageUrl
    }));

    const pagination = {
      totalPages: Math.ceil(totalStories / limit),
      currentPage: parseInt(page),
      totalItems: totalStories,
    };

    res.json({ stories: transformedStories, pagination }); // Include pagination in response
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get single case study by slug
router.get('/:slug', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;

// const express = require('express');
// const router = express.Router();
// const CaseStudy = require('../models/CaseStudy');

// // Get all case studies (with pagination)
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const caseStudies = await CaseStudy.find({})
//       .select('slug seo.title mainSection.categories')
//       .skip(skip)
//       .limit(limit);

//     const total = await CaseStudy.countDocuments();

//     res.json({
//       caseStudies,
//       pagination: {
//         total,
//         pages: Math.ceil(total / limit),
//         current: page
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get single case study by slug
// router.get('/:slug', async (req, res) => {
//   try {
//     const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });
//     if (!caseStudy) {
//       return res.status(404).json({ message: 'Case study not found' });
//     }
//     res.json(caseStudy);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });



  
  
//    module.exports = router;