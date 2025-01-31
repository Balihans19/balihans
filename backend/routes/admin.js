/**
 * Admin Routes Configuration
 * Handles all administrative routes including authentication, case study management,
 * and common component operations.
 * 
 * @module routes/admin
 */

const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const CaseStudy = require('../models/CaseStudy');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;
const CommonComponents = require('../models/CommonComponents');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * @route POST /api/admin/login
 * @description Authenticates admin users and provides JWT token
 * @access Public
 */

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      message: 'Login successful', 
      token 
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});




/**
 * @route GET /api/admin/case-studies
 * @description Retrieves paginated list of case studies
 * @access Private
 */


router.get('/case-studies', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const caseStudies = await CaseStudy.find({})
      .select('slug seo.title mainSection.categories createdAt')
      .sort('-createdAt')
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await CaseStudy.countDocuments();

    res.json({
      caseStudies,
      total,
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * @route POST /api/admin/case-studies
 * @description Creates a new case study
 * @access Private
 */
router.post('/case-studies', authMiddleware, async (req, res) => {
  try {
    const { slug, seo, mainSection, solutions } = req.body;

    if (!slug || !seo?.title || !mainSection?.heading) {
      return res.status(400).json({
        message: 'Missing required fields',
        details: {
          slug: !slug,
          'seo.title': !seo?.title,
          'mainSection.heading': !mainSection?.heading
        }
      });
    }

    const defaultBackgroundImage = 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/default-background.jpg';

    const caseStudyData = {
      ...req.body,
      mainSection: {
        ...mainSection,
        backgroundImageUrl: mainSection.backgroundImageUrl || defaultBackgroundImage,
        categories: Array.isArray(mainSection.categories) 
          ? mainSection.categories 
          : (typeof mainSection.categories === 'string' 
              ? mainSection.categories.split(',').map(cat => cat.trim())
              : [])
      }
    };

    const newCaseStudy = new CaseStudy(caseStudyData);
    const savedCaseStudy = await newCaseStudy.save();
    res.status(201).json(savedCaseStudy);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create case study',
      error: error.message,
      details: error.errors
    });
  }
});

/**
 * @route PUT /api/admin/case-studies/:slug
 * @description Updates an existing case study
 * @access Private
 */
router.put('/case-studies/:slug', authMiddleware, async (req, res) => {
  try {
    const { mainSection, solutions, aiServices, ...rest } = req.body;

    let backgroundImageUrl = mainSection.backgroundImageUrl;
    if (mainSection.backgroundImage && typeof mainSection.backgroundImage === 'string' 
        && mainSection.backgroundImage.startsWith('data:')) {
      const uploadResponse = await cloudinary.uploader.upload(mainSection.backgroundImage, {
        folder: 'case-studies'
      });
      backgroundImageUrl = uploadResponse.secure_url;
    }

    const updatedCaseStudy = await CaseStudy.findOneAndUpdate(
      { slug: req.params.slug },
      {
        ...rest,
        mainSection: {
          ...mainSection,
          backgroundImageUrl
        },
        solutions,
        aiServices
      },
      { new: true }
    );

    if (!updatedCaseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    res.json(updatedCaseStudy);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * @route DELETE /api/admin/case-studies/:slug
 * @description Deletes a case study and its associated images
 * @access Private
 */
router.delete('/case-studies/:slug', authMiddleware, async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOneAndDelete({ slug: req.params.slug });
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    if (caseStudy.mainSection.backgroundImageUrl) {
      const publicId = caseStudy.mainSection.backgroundImageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`case-studies/${publicId}`);
    }

    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * @route GET /api/admin/verify-token
 * @description Verifies if the current JWT token is valid
 * @access Private
 */
router.get('/verify-token', authMiddleware, (req, res) => {
  res.json({ valid: true });
});

/**
 * @route POST /api/admin/logout
 * @description Logs out the admin user by clearing the token cookie
 * @access Public
 */
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'Logged out successfully' });
});



router.post('/upload', authMiddleware, async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.file, {
      folder: 'case-studies'
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;


/**
 * @route GET /api/admin/common-components
 * @description Retrieves common components configuration
 * @access Private
 */
router.get('/common-components', authMiddleware, async (req, res) => {
  try {
    const components = await CommonComponents.findOne();
    if (!components) {
      const defaultComponents = new CommonComponents({
        aiServices: {
          title: 'Default AI Services Title',
          backgroundVideo: 'default-video-url'
        }
      });
      await defaultComponents.save();
      return res.json(defaultComponents);
    }
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * @route PUT /api/admin/common-components
 * @description Updates common components configuration
 * @access Private
 */
router.put('/common-components', authMiddleware, async (req, res) => {
  try {
    const components = await CommonComponents.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

// /**
//  * Admin Routes Configuration
//  * Handles all administrative routes including authentication, case study management,
//  * and common component operations.
//  * 
//  * @module routes/admin
//  */

// const express = require('express');
// const router = express.Router();
// const Admin = require('../models/Admin');
// const CaseStudy = require('../models/CaseStudy');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const authMiddleware = require('../middleware/auth');
// const cloudinary = require('cloudinary').v2;
// const CommonComponents = require('../models/CommonComponents');

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// /**
//  * @route POST /api/admin/login
//  * @description Authenticates admin users and provides JWT token
//  * @access Public
//  */



// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { adminId: admin._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     res.cookie('adminToken', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     });

//     res.json({ message: 'Login successful' });

//   } catch (error) {
//     res.status(500).json({ 
//       message: 'Server error', 
//       error: error.message,
//       details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// /**
//  * @route GET /api/admin/case-studies
//  * @description Retrieves paginated list of case studies
//  * @access Private
//  */
// router.get('/case-studies', authMiddleware, async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const pageNumber = parseInt(page, 10);
//     const limitNumber = parseInt(limit, 10);

//     const caseStudies = await CaseStudy.find({})
//       .select('slug seo.title mainSection.categories createdAt')
//       .sort('-createdAt')
//       .skip((pageNumber - 1) * limitNumber)
//       .limit(limitNumber);

//     const total = await CaseStudy.countDocuments();

//     res.json({
//       caseStudies,
//       total,
//       totalPages: Math.ceil(total / limitNumber),
//       currentPage: pageNumber
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// /**
//  * @route POST /api/admin/case-studies
//  * @description Creates a new case study
//  * @access Private
//  */
// router.post('/case-studies', authMiddleware, async (req, res) => {
//   try {
//     const { slug, seo, mainSection, solutions } = req.body;

//     if (!slug || !seo?.title || !mainSection?.heading) {
//       return res.status(400).json({
//         message: 'Missing required fields',
//         details: {
//           slug: !slug,
//           'seo.title': !seo?.title,
//           'mainSection.heading': !mainSection?.heading
//         }
//       });
//     }

//     const defaultBackgroundImage = 'https://res.cloudinary.com/your-cloud-name/image/upload/v1/default-background.jpg';
    
//     const caseStudyData = {
//       ...req.body,
//       mainSection: {
//         ...mainSection,
//         backgroundImageUrl: mainSection.backgroundImageUrl || defaultBackgroundImage,
//         categories: Array.isArray(mainSection.categories) 
//           ? mainSection.categories 
//           : (typeof mainSection.categories === 'string' 
//               ? mainSection.categories.split(',').map(cat => cat.trim())
//               : [])
//       }
//     };

//     const newCaseStudy = new CaseStudy(caseStudyData);
//     const savedCaseStudy = await newCaseStudy.save();
//     res.status(201).json(savedCaseStudy);
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to create case study',
//       error: error.message,
//       details: error.errors
//     });
//   }
// });

// /**
//  * @route PUT /api/admin/case-studies/:slug
//  * @description Updates an existing case study
//  * @access Private
//  */
// router.put('/case-studies/:slug', authMiddleware, async (req, res) => {
//   try {
//     const { mainSection, solutions, aiServices, ...rest } = req.body;
    
//     let backgroundImageUrl = mainSection.backgroundImageUrl;
//     if (mainSection.backgroundImage && typeof mainSection.backgroundImage === 'string' 
//         && mainSection.backgroundImage.startsWith('data:')) {
//       const uploadResponse = await cloudinary.uploader.upload(mainSection.backgroundImage, {
//         folder: 'case-studies'
//       });
//       backgroundImageUrl = uploadResponse.secure_url;
//     }

//     const updatedCaseStudy = await CaseStudy.findOneAndUpdate(
//       { slug: req.params.slug },
//       {
//         ...rest,
//         mainSection: {
//           ...mainSection,
//           backgroundImageUrl
//         },
//         solutions,
//         aiServices
//       },
//       { new: true }
//     );

//     if (!updatedCaseStudy) {
//       return res.status(404).json({ message: 'Case study not found' });
//     }

//     res.json(updatedCaseStudy);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// /**
//  * @route DELETE /api/admin/case-studies/:slug
//  * @description Deletes a case study and its associated images
//  * @access Private
//  */
// router.delete('/case-studies/:slug', authMiddleware, async (req, res) => {
//   try {
//     const caseStudy = await CaseStudy.findOneAndDelete({ slug: req.params.slug });
//     if (!caseStudy) {
//       return res.status(404).json({ message: 'Case study not found' });
//     }
    
//     if (caseStudy.mainSection.backgroundImageUrl) {
//       const publicId = caseStudy.mainSection.backgroundImageUrl.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(`case-studies/${publicId}`);
//     }

//     res.json({ message: 'Case study deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// /**
//  * @route GET /api/admin/verify-token
//  * @description Verifies if the current JWT token is valid
//  * @access Private
//  */
// router.get('/verify-token', authMiddleware, (req, res) => {
//   res.json({ valid: true });
// });

// /**
//  * @route POST /api/admin/logout
//  * @description Logs out the admin user by clearing the token cookie
//  * @access Public
//  */
// router.post('/logout', (req, res) => {
//   res.clearCookie('adminToken');
//   res.json({ message: 'Logged out successfully' });
// });

// /**
//  * @route GET /api/admin/common-components
//  * @description Retrieves common components configuration
//  * @access Private
//  */
// router.get('/common-components', authMiddleware, async (req, res) => {
//   try {
//     const components = await CommonComponents.findOne();
//     if (!components) {
//       const defaultComponents = new CommonComponents({
//         aiServices: {
//           title: 'Default AI Services Title',
//           backgroundVideo: 'default-video-url'
//         }
//       });
//       await defaultComponents.save();
//       return res.json(defaultComponents);
//     }
//     res.json(components);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// /**
//  * @route PUT /api/admin/common-components
//  * @description Updates common components configuration
//  * @access Private
//  */
// router.put('/common-components', authMiddleware, async (req, res) => {
//   try {
//     const components = await CommonComponents.findOneAndUpdate(
//       {},
//       { $set: req.body },
//       { new: true, upsert: true }
//     );
//     res.json(components);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;

