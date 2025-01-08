const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");

// Configure multer for temporary storage
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(new Error('Only PDF, DOC, and DOCX files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('uploadResume');

router.post("/email", async (req, res) => {
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
    const { name, email, keySkills } = req.body;

    if (!name || !email || !keySkills || !req.file) {
      return res.status(400).json({
        message: "All required fields must be provided.",
        missingFields: {
          name: !name,
          email: !email,
          keySkills: !keySkills,
          resume: !req.file
        }
      });
    }

    // Format the current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Professional HTML email template
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #f8f9fa;
              padding: 20px;
              border-bottom: 3px solid #007bff;
              margin-bottom: 20px;
            }
            .company-name {
              color: #007bff;
              font-size: 24px;
              font-weight: bold;
              margin: 0;
            }
            .submission-date {
              color: #6c757d;
              font-size: 14px;
              margin-top: 5px;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              color: #007bff;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
              padding-bottom: 5px;
              border-bottom: 1px solid #dee2e6;
            }
            .candidate-info {
              background-color: #ffffff;
              padding: 15px;
              border: 1px solid #dee2e6;
              border-radius: 4px;
            }
            .info-item {
              margin-bottom: 10px;
            }
            .label {
              font-weight: bold;
              color: #495057;
              width: 100px;
              display: inline-block;
            }
            .value {
              color: #212529;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              font-size: 12px;
              color: #6c757d;
            }
            .attachment-info {
              background-color: #f8f9fa;
              padding: 10px;
              border-radius: 4px;
              margin-top: 20px;
              font-size: 14px;
              color: #6c757d;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="company-name">Balihans</h1>
              <div class="submission-date">Resume Submission - ${currentDate}</div>
            </div>

            <div class="section">
              <h2 class="section-title">Candidate Details</h2>
              <div class="candidate-info">
                <div class="info-item">
                  <span class="label">Name:</span>
                  <span class="value">${name}</span>
                </div>
                <div class="info-item">
                  <span class="label">Email:</span>
                  <span class="value">${email}</span>
                </div>
                <div class="info-item">
                  <span class="label">Key Skills:</span>
                  <span class="value">${keySkills}</span>
                </div>
              </div>
            </div>

            <div class="attachment-info">
              📎 Resume attached: ${req.file.originalname}
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: {
        name: 'Balihans Careers',
        address: process.env.EMAIL_USER
      },
      to: `${process.env.EMAIL_RECEIVER_1}, ${process.env.EMAIL_RECEIVER_2}`,
      subject: `New Resume Submission - ${name}`,
      html: emailTemplate,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Resume submitted successfully!"
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

