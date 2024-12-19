const mongoose = require('mongoose');


//  schema for the customerspeakpage
const customerspeakpageSchema = new mongoose.Schema({
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

  AiConsulting: {
    title: { type: String, required: true },
    bgImage: { type: String, required: true },
    cardpostion: { type: String, required: true },
    aiconsultingSlides: [{
      id: { type: Number, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      designation: { type: String, required: true }
    }]
  },
  DigitalTransformation: {
    title: { type: String, required: true },
    bgImage: { type: String, required: true },
    cardpostion: { type: String, required: true },
    digitaltransformationSlides: [{
      id: { type: Number, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      designation: { type: String, required: true }
    }]
  },
  CloudInfrastructure: {
    title: { type: String, required: true },
    bgImage: { type: String, required: true },
    cardpostion: { type: String, required: true },
    cloudinfrastructureSlides: [{
      id: { type: Number, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      designation: { type: String, required: true }
    }]
  },
  Cybersecurity: {
    title: { type: String, required: true },
    bgImage: { type: String, required: true },
    cardpostion: { type: String, required: true },
    cybersecuritySlides: [{
      id: { type: Number, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      designation: { type: String, required: true }
    }]
  },
 AiServices:{
  title: { type: String, required: true },
  backgroundVideo: { type: String, required: true },
 },
}, { collection: 'CustomerSpeakPage' });

// Export the model
module.exports = mongoose.model('CustomerSpeakPage', customerspeakpageSchema);