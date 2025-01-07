const mongoose = require('mongoose');


//  schema for the casestudyslidespage
const casestudyslidespageSchema = new mongoose.Schema({
 
    image: { type: String, required: true },
    title: { type: String, required: true },
    alt: { type: String, required: true },
    link: { type: String },
    
}, { collection: 'CaseStudySlidesPage' });

// Export the model
module.exports = mongoose.model('CaseStudySlidesPage', casestudyslidespageSchema);
