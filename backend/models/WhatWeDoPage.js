const mongoose = require('mongoose');

//  schema for the whatwedopage
const whatwedopageSchema = new mongoose.Schema({
  videoData: [{
    videoUrl: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true }
  }],
  headerTitle: { type: String, required: true },
  headerDescription: { type: String, required: true },
  backgroundImageUrl: { type: String, required: true },
  knowMoreText: { type: String, required: true },
  footerText: { type: String, required: true },
  footerItalicWords:  {type: [String],  required: true,},
 
  BusinessServices:{
    title: { type: String, required: true },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    servicesData:[{
        title: { type: String, required: true },
        href: { type: String, required: true }
    }],
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

}, { collection: 'WhatWeDoPage' });

// Export the model
module.exports = mongoose.model('WhatWeDoPage', whatwedopageSchema);