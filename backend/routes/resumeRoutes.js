const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes', // This will create a folder in Cloudinary
    resource_type: 'raw', // This allows for document upload
    allowed_formats: ['pdf', 'doc', 'docx'], // Allowed file formats
    public_id: (req, file) => `resume_${Date.now()}`, // Custom filename
  },
});

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(new Error('Only PDF, DOC, and DOCX files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('uploadResume');

// POST Route to handle resume submission
router.post("/", async (req, res) => {
  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  try {
    await handleUpload();

    const { name, email, keySkills, formType } = req.body;

    // Validate required fields
    if (!name || !email || !keySkills || !req.file || !formType) {
      return res.status(400).json({ 
        message: "All required fields must be provided.",
        missingFields: {
          name: !name,
          email: !email,
          keySkills: formType === 'with-skills' && !keySkills,
          resume: !req.file,
          formType: !formType
        }
      });
    }

    // Create new resume document with formType
    const newResume = new Resume({
      name,
      email,
      keySkills,
      formType, // Make sure to include formType
      resumeFile: {
        public_id: req.file.public_id,
        secure_url: req.file.secure_url,
        format: req.file.format,
        resource_type: req.file.resource_type
      }
    });


    // Save to MongoDB
    await newResume.save();

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${process.env.EMAIL_RECEIVER_1}, ${process.env.EMAIL_RECEIVER_2}`,
      subject: "New Resume Submission",
      html: `
        <h2>New Resume Submission</h2>
        
        <h3>Candidate Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Key Skills:</strong> ${keySkills}</li>
        </ul>
        
        <p>The resume can be downloaded from: <a href="${req.file.secure_url}">Click here</a></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "Resume submitted successfully!",
      fileUrl: req.file.secure_url
    });

  } catch (error) {
    console.error("Error processing resume submission:", error);
    res.status(500).json({ 
      message: "Failed to submit resume.", 
      error: error.message 
    });
  }
});

module.exports = router;


