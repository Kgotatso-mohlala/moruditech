const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Define your email transporter (use your own SMTP configuration here)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or any other email provider
  auth: {
    user: 'your-email@gmail.com',  // Your email
    pass: 'your-email-password',   // Your email password
  },
});

// Handle contact form route
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  // Render email templates for admin and client
  const contactAdminTemplate = path.join(__dirname, '..', 'views', 'emails', 'contactAdmin.ejs');
  const contactClientTemplate = path.join(__dirname, '..', 'views', 'emails', 'contactClient.ejs');

  // Admin email options
  const adminMailOptions = {
    from: email,
    to: 'admin-email@example.com',  // Admin email
    subject: 'New Contact Form Submission',
    html: ejs.renderFile(contactAdminTemplate, { name, email, message }),
  };

  // Client email options
  const clientMailOptions = {
    from: 'your-email@example.com',  // Your email
    to: email,
    subject: 'Thank You for Contacting Us',
    html: ejs.renderFile(contactClientTemplate, { name, message }),
  };

  // Send emails to both the client and admin
  Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions),
  ])
    .then(() => {
      // Redirect or send a success message
      res.send('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending emails:', error);
      res.status(500).send('Error sending message');
    });
});

module.exports = router;
