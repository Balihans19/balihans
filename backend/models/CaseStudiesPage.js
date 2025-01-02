const mongoose = require('mongoose');


//  schema for the aipage
const casestudiespageSchema = new mongoose.Schema({
 
  backgroundVideo: { type: String, required: true },
  categories: [{type: String,required: true}],
  title: { type: String, required: true },
  description: { type: String, required: true },
 
  CustomerStories:{
    Stories: [{
        category: { type: String, required: true },
        subCategory: { type: String, required: true }, 
        description: { type: String, required: true }, 
        image: { type: String, required: false }, 
      }]
  },

 AiServices:{
  imageUrl: { type: String, required: true },
  quoteImageUrl: { type: String, required: true },
 },
}, { collection: 'CaseStudiesPage' });

// Export the model
module.exports = mongoose.model('CaseStudiesPage', casestudiespageSchema);
