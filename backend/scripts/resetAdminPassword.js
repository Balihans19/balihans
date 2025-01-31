require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await Admin.findOne({});
    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }

    const newHashedPassword = await bcrypt.hash(process.env.NEW_ADMIN_PASSWORD, 12);
    admin.password = newHashedPassword;
    await admin.save();

    console.log('Admin password reset successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

resetAdminPassword();