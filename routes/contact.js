const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Can be replaced with another SMTP service like SendGrid or Mailgun
  auth: {
    user: process.env.YOUR_EMAIL,
    pass: process.env.YOUR_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Simple input validation
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const contactAdminTemplate = path.join(__dirname, '../views/emails/contactAdmin.ejs');
  const contactClientTemplate = path.join(__dirname, '../views/emails/contactClient.ejs');

  try {
    // Admin email options
    const adminMailOptions = {
      from: email,
      to: 'nelsonmohlala617@gmail.com',  // Admin email to receive the submission
      subject: 'New Contact Form Submission',
      html: await ejs.renderFile(contactAdminTemplate, { name, email, message }),
    };

    // Client email options
    const clientMailOptions = {
      from: process.env.YOUR_EMAIL,
      to: email,  // Send confirmation to the client
      subject: 'Thank You for Contacting Us',
      html: await ejs.renderFile(contactClientTemplate, { name, message }),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    // Respond with success (JSON response, no redirect to avoid UX issues)
    res.json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending message");
  }
});

module.exports = router;
