const mongoose = require('mongoose');


//  schema for the whitepaperslidespage
const whitepaperslidespageSchema = new mongoose.Schema({
 
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    
}, { collection: 'WhitePaperSlidesPage' });

// Export the model
module.exports = mongoose.model('WhitePaperSlidesPage', whitepaperslidespageSchema);
