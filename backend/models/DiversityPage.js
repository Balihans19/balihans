const mongoose = require('mongoose');


//  schema for the diversitypage
const diversitypageSchema = new mongoose.Schema({


  headerText: { type: String, required: true },
  values: [{
    title: { type: String, required: true },
    href:{ type: String, required: true }
  }],
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  missionTitle:{type: String, required: true},
  missionText:{type: String, required: true},

  diversity:{
    diversitySlides:[{
        id: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }
    }],
  },
  
  DeiInitiatives: {
    title: { type: String, required: true },
    DeiInitiativesData: [{
        id: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      imgSrc: { type: String, required: true }
    }],
   
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

}, { collection: 'DiversityPage' });

// Export the model
module.exports = mongoose.model('Diversitypage', diversitypageSchema);
