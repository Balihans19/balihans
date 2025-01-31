const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const adminController = {
  // Create initial admin user
  async createInitialAdmin(req, res) {
    try {
      const adminExists = await Admin.findOne({});
      if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
      }

      const hashedPassword = await bcrypt.hash(process.env.INITIAL_ADMIN_PASSWORD, 12);
      const admin = new Admin({
        email: process.env.INITIAL_ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Admin User'
      });

      await admin.save();
      res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Upload file to Cloudinary
  async uploadToCloudinary(buffer, resourceType) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const bufferStream = new Readable();
      bufferStream.push(buffer);
      bufferStream.push(null);
      bufferStream.pipe(uploadStream);
    });
  },

  // Handle file upload
  async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
      const result = await adminController.uploadToCloudinary(req.file.buffer, resourceType);
      
      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  }
};

module.exports = adminController;