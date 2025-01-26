const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Define your email transporter (use your own SMTP configuration here)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or any other email provider
  auth: {
    user: process.env.YOUR_EMAIL,  // Your email
    pass: process.env.YOUR_PASS,   // Your email password
  },
});

// Handle contact form route
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Path to email templates
  const contactAdminTemplate = path.join(__dirname, '..', 'views', 'emails', 'contactAdmin.ejs');
  const contactClientTemplate = path.join(__dirname, '..', 'views', 'emails', 'contactClient.ejs');

  try {
    // Admin email options
    const adminMailOptions = {
      from: email,
      to: 'nelsonmohlala617@gmail.com',  // Admin email
      subject: 'New Contact Form Submission',
      html: await ejs.renderFile(contactAdminTemplate, { name, email, message }),  // Await the template rendering
    };

    // Client email options
    const clientMailOptions = {
      from: process.env.YOUR_EMAIL,  // Your email
      to: email,
      subject: 'Thank You for Contacting Us',
      html: await ejs.renderFile(contactClientTemplate, { name, message }),  // Await the template rendering
    };

    // Send emails to both the client and admin
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    // Send a success response
    res.send('Message sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending message');
  }
});

module.exports = router;
