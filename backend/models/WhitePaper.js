const mongoose = require('mongoose');

const whitePaperSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  seo: {
    title: { type: String, required: true },
  },
  mainSection: {
    backgroundImageUrl: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    contentSection:[{
        title: { type: String},
        content:[{
         items: [{ type: String}],
        }],
        description: { type: String},
        disclaimer: { type: String},
  }]
  },
  
 
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

module.exports = mongoose.model('WhitePaper', whitePaperSchema);