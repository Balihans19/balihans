
const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },

  seo: {
    title: { type: String, required: true },
  },

  mainSection: {
    backgroundImageUrl: { type: String, required: true },
    sectionTitle: { type: String, default: 'CASE STUDY' }, // Default title for WordPress case studies
    categories: { type: [String], default: undefined },
    heading: { type: String, required: true },
    description: { type: String, required: true }
  },

  solutions: {
    title: { type: String, required: true },
    items: [{ // Retain original field name but make it optional
      id: { type: Number, default: undefined },
      number: { type: String, default: undefined },
      title: { type: String, default: undefined },
      contents: [{
        primaryHeading: { type: String, default: undefined },
        primaryDescription: { type: String, default: undefined },
        description: { type: String, default: undefined },
        image: { type: String, default: undefined },
        points: { type: [String], default: undefined } // Allow points within contents
      }]
    }],
    solutionData: [{ // Alternative naming for WordPress structure
      id: { type: Number, default: undefined },
      number: { type: String, default: undefined },
      title: { type: String, default: undefined },
      contents: [{
        primaryHeading: { type: String, default: undefined },
        primaryDescription: { type: String, default: undefined },
        description: { type: String, default: undefined },
        image: { type: String, default: undefined },
        points: { type: [String], default: undefined } // Move points inside contents for WordPress schema
      }]
    }]
  },

  spotlight: { // Optional for WordPress case studies
    items: [{
      title: { type: String, default: undefined },
      description: { type: String, default: undefined },
      imageUrl: { type: String, default: undefined }
    }]
  },

  aiServices: {
    title: { type: String, default: undefined },
    backgroundVideo: { type: String, default: undefined }
  },

  transformingEnterprises: { // Optional section
    title: { type: String, default: undefined },
    carouselSlides: [{
      id: { type: Number, default: undefined },
      title: { type: String, default: undefined },
      image: { type: String, default: undefined },
      alt: { type: String, default: undefined }
    }]
  }
}, { timestamps: true }); // Enables createdAt & updatedAt fields

module.exports = mongoose.model('CaseStudy', caseStudySchema);


