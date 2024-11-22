const mongoose = require('mongoose');


//  schema for the homepage
const leadershippageSchema = new mongoose.Schema({


  headerText: { type: String, required: true },
  values: [{
    title: { type: String, required: true },
    href:{ type: String, required: true }
  }],
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  missionTitle:{type: String, required: true},
  missionText:{type: String, required: true},
  

  leadership: {
   
    LeaderShipData: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      description2: { type: String, required: true },
    }],
    
  },
  InvestorSection: {
    backgroundImageUrl : { type: String, required: true }
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

}, { collection: 'LeaderShipPage' });

// Export the model
module.exports = mongoose.model('Leadershippage', leadershippageSchema);
