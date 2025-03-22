const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  seo: {
    title: { type: String, required: true },
  },
  mainSection: {
    backgroundImageUrl: { type: String, required: true },
    heading: { type: String, required: true },
    descriptionParagraphs: [{ type: String }], // Changed from description to descriptionParagraphs
  },
  // Moved contentSection to root level and renamed to match your JSON
  contentSection: [
    {
      items: [
        {
          title: { type: String },
          descriptions: [{ type: String }],
          bulletPoints: [{ type: String }]
        }
      ]
    }
  ],
  Services: {
    title: String,
    backgroundVideo: String
  },
  transformingEnterprises: {
    title: String,
    carouselSlides: [{
      id: Number,
      title: String,
      image: String,
      alt: String
    }]
  }
});

module.exports = mongoose.model('Blog', blogSchema);

// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
//   slug: { type: String, required: true, unique: true },
//   seo: {
//     title: { type: String, required: true },
//   },
//   mainSection: {
//     backgroundImageUrl: { type: String, required: true },
//     heading: { type: String, required: true },
//     description: [{ type: String }],
//     contentSections: [
//       {
//         descriptions: [{ type: String }],
//         items: [
//           {
//             title: { type: String },
//             descriptions: [{ type: String }],
//             bulletPoints: [{ type: String }]
//           }
//         ]
//       }
//     ]
//   },
  
 
//   Services: {
//     title: String,
//     backgroundVideo: String
//   },
//   transformingEnterprises: {
//     title: String,
//     carouselSlides: [{
//       id: Number,
//       title: String,
//       image: String,
//       alt: String
//     }]
//   }
// });

// module.exports = mongoose.model('Blog', blogSchema);