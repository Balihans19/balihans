require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

async function createInitialAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminExists = await Admin.findOne({});
    if (adminExists) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.INITIAL_ADMIN_PASSWORD, 12);
    const admin = new Admin({
      email: process.env.INITIAL_ADMIN_EMAIL,
      password: hashedPassword,
      name: 'Admin User'
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createInitialAdmin();