const mongoose = require('mongoose');

//  schema for the homepage
const homepageSchema = new mongoose.Schema({
  slidesData: [{
    heading: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String, required: true }
  }],
  headerTitle: { type: String, required: true },
  headerDescription: { type: String, required: true },
  backgroundImageUrl: { type: String, required: true },
  knowMoreText: { type: String, required: true },
  capabilities: {
    primaryHeading: { type: String, required: true },
    paragraph: { type: String, required: true },
    cardsData: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      imgSrc: { type: String, required: true }
    }]
  },
  industries: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    industriesData: [{
      name: { type: String, required: true },
      image: { type: String, required: true }
    }]
  },
  transformingBusinesses: {
    title: { type: String, required: true },
    carouselSlides: [{
      id: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true },
      alt: { type: String, required: true }
    }]
  },
  expandableMenu: {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    sectionsData: [{
      id: { type: String, required: true },
      title: { type: String, required: true },
      content: {
        description: { type: String, required: true },
        bulletPoints: { type: [String], required: true }
      }
    }]
  }
}, { collection: 'HomePage' });

// Export the model
module.exports = mongoose.model('Homepage', homepageSchema);



