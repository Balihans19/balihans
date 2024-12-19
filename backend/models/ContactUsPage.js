const mongoose = require('mongoose');

// Schema for the contact us page
const contactuspageSchema = new mongoose.Schema({
  bgVideo: { 
    type: String, 
    required: true 
  },
  mainTitle: { 
    type: String, 
    required: true 
  },
  subTitle: { 
    type: String, 
    required: true 
  },
  officeData: [{
    title: { 
      type: String, 
      required: true 
    },
    description: {
      type: [String],  // Array of strings to handle both single and multiple addresses
      required: true
    }
  }]
}, { collection: 'ContactUsPage' });

// Export the model
module.exports = mongoose.model('ContactUsPage', contactuspageSchema);