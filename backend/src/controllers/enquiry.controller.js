const Enquiry = require('../models/enquiry.model');
const createTransporter = require('../config/email.config');

exports.submitEnquiry = async (req, res) => {
  console.log("DEBUG [1]: Function started. Request body received:", JSON.stringify(req.body));

  try {
    const { name, email, phone, city, message } = req.body;

    console.log("DEBUG [2]: Checking validation for name...");
    if (!name) {
      console.warn("DEBUG [2.1]: Validation failed. Name is missing.");
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // 1. Database mein save karo
    console.log("DEBUG [3]: Attempting to save to MongoDB...");
    const enquiry = await Enquiry.create({
      name,
      email,
      ...(phone && { phone }),
      ...(city && { city }),
      ...(message && { message }),
    });
    console.log("DEBUG [4]: Successfully saved to DB. Document ID:", enquiry._id);

    // 2. User ko turant success response bhejo
    console.log("DEBUG [5]: Sending immediate 201 response to client.");
    res.status(201).json({
      success: true,
      message: 'Enquiry received! Our team will contact you soon.',
      data: enquiry,
    });

    // 3. Email background mein bhejo
    console.log("DEBUG [6]: Initializing email transporter...");
    const transporter = createTransporter();

    console.log("DEBUG [7]: Preparing admin mail options. Target:", process.env.ADMIN_EMAIL);
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

    console.log("DEBUG [8]: Calling transporter.sendMail for Admin...");
    transporter.sendMail(adminMailOptions)
      .then(info => console.log("DEBUG [8.1]: Admin Email SENT. Response:", info.response))
      .catch(err => console.error("DEBUG [8.2 ERROR]: Admin Email Failed. Reason:", err.message));

    if (email) {
      console.log("DEBUG [9]: Client email provided. Preparing customer mail for:", email);
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'We received your enquiry - Novatel Services',
        html: `<p>Dear ${name}, thank you for contacting us. We will get back to you soon!</p>`
      };

      console.log("DEBUG [10]: Calling transporter.sendMail for Customer...");
      transporter.sendMail(customerMailOptions)
        .then(info => console.log("DEBUG [10.1]: Customer Email SENT. Response:", info.response))
        .catch(err => console.error("DEBUG [10.2 ERROR]: Customer Email Failed. Reason:", err.message));
    } else {
      console.log("DEBUG [9.1]: No client email provided. Skipping customer mail.");
    }

  } catch (error) {
    console.error("DEBUG [CRITICAL ERROR]: Controller crashed. Message:", error.message);
    console.error("DEBUG [STACK TRACE]:", error.stack);
    
    if (!res.headersSent) {
      console.log("DEBUG [ERROR RESPONSE]: Sending 500 status to client.");
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again later.',
        error: error.message,
      });
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