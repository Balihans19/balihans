const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  keySkills: {
    type: String,
    required: false,  // Make it optional
  },
  resumeFile: {
    public_id: String,
    secure_url: String,
    format: String,
    resource_type: String
  },
  formType: {         // Add this to distinguish between form types
    type: String,
    enum: ['with-skills', 'without-skills'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);