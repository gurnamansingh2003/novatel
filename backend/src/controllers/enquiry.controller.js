const Enquiry = require('../models/enquiry.model');
const createTransporter = require('../config/email.config');

// SUBMIT ENQUIRY
exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, city, message } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // 1. Database mein save karo (Priority)
    const enquiry = await Enquiry.create({
      name,
      email,
      ...(phone && { phone }),
      ...(city && { city }),
      ...(message && { message }),
    });

    // 2. User ko turant success response bhejo (No waiting for email)
    res.status(201).json({
      success: true,
      message: 'Enquiry received! Our team will contact you soon.',
      data: enquiry,
    });

    // 3. Email background mein bhejo (Agar timeout aaya toh bhi user ko pata nahi chalega)
    const transporter = createTransporter();

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry from ${name} - Novatel`,
      html: `<h3>New Enquiry Details:</h3>
             <p><b>Name:</b> ${name}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Email:</b> ${email || 'N/A'}</p>
             <p><b>Message:</b> ${message || 'N/A'}</p>`
    };

    // Background call - no 'await' here to prevent timeout blocking
    transporter.sendMail(adminMailOptions).catch(err => 
      console.error('Email Error (Admin):', err.message)
    );

    if (email) {
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'We received your enquiry - Novatel Services',
        html: `<p>Dear ${name}, thank you for contacting us. We will get back to you soon!</p>`
      };
      transporter.sendMail(customerMailOptions).catch(err => 
        console.error('Email Error (Customer):', err.message)
      );
    }

  } catch (error) {
    console.error('Submit Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  }
};

// GET ALL ENQUIRIES (For Admin)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE STATUS
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};