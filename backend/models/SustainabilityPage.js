const mongoose = require('mongoose');


//  schema for the sustainabilitypage
const sustainabilitypageSchema = new mongoose.Schema({


  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  imageSrc: { type: String, required: true },

  SustainabilityGoals: {
    title: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  GoalsData: [{
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  }],
  },

  SustainCarousel:{
  slidesdata:[{
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
  }]
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

}, { collection: 'SustainabilityPage' });

// Export the model
module.exports = mongoose.model('Sustainabilitypage', sustainabilitypageSchema);