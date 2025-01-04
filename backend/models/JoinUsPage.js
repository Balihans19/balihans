const mongoose = require('mongoose');


//  schema for the joinuspage
const joinuspageSchema = new mongoose.Schema({
  backgroundImageUrl: { type: String, required: true },
  heading: { type: String, required: true },
  description: { type: String, required: true },
  values: [{
    title: { type: String, required: true },
    href: { type: String, required: true },
  }],
 

 JobGrid:{
    JobOpenings: [{
        category: { type: String, required: true },
        subCategory: { type: String, required: true },
        title: { type: String, required: true },
        experience: { type: String, required: true },
        location: { type: String, required: true },
        type: { type: String, required: true },
      }],
 },


 
}, { collection: 'JoinUsPage' });

// Export the model
module.exports = mongoose.model('JoinUsPage', joinuspageSchema);