const mongoose = require('mongoose');

//  schema for the aipage
const infocuspageSchema = new mongoose.Schema({
 
  backgroundVideo: { type: String, required: true },
  categories: [{type: String,required: true}],
  title: { type: String, required: true },
  description: { type: String, required: true },
 

 AiServices:{
  imageUrl: { type: String, required: true },
  quoteImageUrl: { type: String, required: true },
 },
}, { collection: 'InfocusPage' });

// Export the model
module.exports = mongoose.model('InfocusPage', infocuspageSchema);
