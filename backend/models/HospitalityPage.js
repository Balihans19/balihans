const mongoose = require('mongoose');


//  schema for the hospitalitypage
const hospitalitypageSchema = new mongoose.Schema({
  videoData: [{
    heading: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String, required: true }
  }],
  headerTitle: { type: String, required: true },
  headerDescription: { type: String, required: true },
  backgroundImageUrl: { type: String, required: true },
  knowMoreText: { type: String, required: true },
  footerText: { type: String, required: true },
  footerItalicWords:  {type: [String],  required: true,},

 BankingSolutions:{
   title: { type: String, required: true },
   solutionData : [{
    id: { type: String, required: true },
    number: { type: String, required: true },
    title: { type: String, required: true },
    contents:[{
      heading: { type: String, required: true },
      description: { type: String, required: true },
    }]
   }]
 },

 Spotlight:{
   spotlightItems:[{
    title: { type: String, required: true },
    description: { type: String, required: true },
    ImageUrl: { type: String, required: true },
   }]
 },

 Services:{
  title: { type: String, required: true },
  backgroundVideo: { type: String, required: true },
  services:[{
    title: { type: String, required: true },
    href: { type: String, required: true }
  }]
 },
 transformingEnterprises: {
    title: { type: String, required: true },
    carouselSlides: [{
      id: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true },
      alt: { type: String, required: true }
    }]
  }
}, { collection: 'HospitalityPage' });

// Export the model
module.exports = mongoose.model('HospitalityPage', hospitalitypageSchema);
