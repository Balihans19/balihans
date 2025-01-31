const mongoose = require('mongoose');

const commonComponentsSchema = new mongoose.Schema({
  aiServices: {
    title: String,
    backgroundVideo: String
  }
});

module.exports = mongoose.model('CommonComponents', commonComponentsSchema);