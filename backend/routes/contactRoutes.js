
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const axios = require("axios"); // Add this for reCAPTCHA verification
require("dotenv").config();

// POST Route to handle form submission
router.post("/", async (req, res) => {
  const { name, email, industry, message, captchaValue } = req.body;

  // Validate required fields
  if (!name || !email || !industry || !message || !captchaValue) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Verify reCAPTCHA
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaValue}`
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: "Invalid reCAPTCHA. Please try again." });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, industry, message });
    await newContact.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${process.env.EMAIL_RECEIVER_1}, ${process.env.EMAIL_RECEIVER_2}`,
      subject: "New Contact Us Message",
      text: `
        You have a new message from ${name}.
        Email: ${email}
        Industry: ${industry}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Contact = require("../models/Contact");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // POST Route to handle form submission
// router.post("/", async (req, res) => {
//     const { name, email, industry, message } = req.body;
  
//     if (!name || !email || !industry || !message) {
//       return res.status(400).json({ message: "All fields are required." });
//     }
  
//     try {
//       // Save to MongoDB
//       const newContact = new Contact({ name, email, industry, message });
//       await newContact.save();
  
//       // Send Email
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });
  
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: `${process.env.EMAIL_RECEIVER_1}, ${process.env.EMAIL_RECEIVER_2}`, // Two email addresses separated by a comma
//         subject: "New Contact Us Message",
//         text: `
//           You have a new message from ${name}.
//           Email: ${email}
//           Industry: ${industry}
//           Message: ${message}
//         `,
//       };
  
//       await transporter.sendMail(mailOptions);
  
//       res.status(200).json({ message: "Message sent successfully!" });
//     } catch (error) {
//       console.error("Error processing contact form:", error); // Log error details
//       res.status(500).json({ message: "Failed to send message." });
//     }
//   });
  
// module.exports = router;
