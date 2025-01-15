const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  seo: {
    title: { type: String, required: true },
  },
  mainSection: {
    backgroundImageUrl: { type: String, required: true },
    categories: [String],
    heading: { type: String, required: true },
    description: { type: String, required: true }
  },
  solutions: {
    title: { type: String, required: true },
    items: [{
      id: Number,
      number: String,
      title: String,
      contents: [{
        primaryHeading: String,
        primaryDescription: String,
        description: String,
        image: String
      }], 
      points: [String]
    }]
  },
  spotlight: {
    items: [{
      title: String,
      description: String,
      imageUrl: String
    }]
  },
  aiServices: {
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

module.exports = mongoose.model('CaseStudy', caseStudySchema);