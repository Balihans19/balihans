const mongoose = require('mongoose');

// Schema for the contact us page
const cookiepolicypageSchema = new mongoose.Schema({

  backgroundImage:{ type: String, required: true },
  categories: [{type: String,required: true}],
  content: [
    {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  

  sections:{
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: [{
    sectionTitle: { type: String },
    items: [{ type: String }],
    subsections: [{
      subtitle: { type: String },
      items: [{ type: String }]
    }],
    text: [{
      subtitle: { type: String },
      content: { type: String }
    }],
    descriptionTwo: { type: String }
  }]
}
}, { collection: 'CookiePolicyPage' });

// Export the model
module.exports = mongoose.model('CookiePolicypage', cookiepolicypageSchema);