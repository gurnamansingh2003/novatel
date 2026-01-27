const Enquiry = require('../models/enquiry.model');
const createTransporter = require('../config/email.config');

exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, city, message } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // 1. SAVE TO DATABASE FIRST (This is the most important part)
    const enquiry = await Enquiry.create({
      name,
      email,
      ...(phone && { phone }),
      ...(city && { city }),
      ...(message && { message }),
    });

    // 2. RESPOND TO USER IMMEDIATELY
    // We send the success response now so the user isn't waiting for the email server
    res.status(201).json({
      success: true,
      message: 'Enquiry received! Our team will contact you soon.',
      data: enquiry,
    });

    // 3. ATTEMPT EMAIL IN BACKGROUND
    // We don't use 'await' here for the response, so a timeout won't break the user's experience
    const transporter = createTransporter();

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry from ${name}`,
      text: `New enquiry from ${name} (${phone}). Check your admin panel for details.`,
      // ... your existing HTML template
    };

    // Use a non-blocking approach for emails
    transporter.sendMail(adminMailOptions).catch(err => 
      console.error('Background Email Error (Admin):', err.message)
    );

    if (email) {
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'We received your enquiry - Novatel Services',
        // ... your existing HTML template
      };
      transporter.sendMail(customerMailOptions).catch(err => 
        console.error('Background Email Error (Customer):', err.message)
      );
    }

  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    });
  }
};