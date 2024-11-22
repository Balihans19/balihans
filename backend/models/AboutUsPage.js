const mongoose = require('mongoose');


//  schema for the homepage
const aboutuspageSchema = new mongoose.Schema({


  headerText: { type: String, required: true },
  values: [{
    title: { type: String, required: true },
    href:{ type: String, required: true }
  }],
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  missionTitle:{type: String, required: true},
  missionText:{type: String, required: true},
  

  CoreValues: {
   
    CoreValuesData: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      imgSrc: { type: String, required: true }
    }],
    title: { type: String, required: true }
  },
  
  AboutSection: {
    backgroundImageUrl : { type: String, required: true }
  },

  Impact: {
    title: { type: String, required: true },
    TriCarouselSlides: [{
      id: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true },
      alt: { type: String, required: true }
    }]
  },

}, { collection: 'AboutUsPage' });

// Export the model
module.exports = mongoose.model('Aboutuspage', aboutuspageSchema);
