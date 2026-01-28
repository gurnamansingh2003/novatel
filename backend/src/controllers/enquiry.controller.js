const Enquiry = require('../models/enquiry.model');
const setupSendGrid = require('../config/email.config');

exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, city, message } = req.body;
    
    // 1. DB Save (Pehle data safe karo)
    const enquiry = await Enquiry.create({ name, email, phone, city, message });
    
    // 2. Response to Frontend
    res.status(201).json({ success: true, message: 'Enquiry submitted!' });

    // 3. SendGrid Email (Non-blocking)
    const sgMail = setupSendGrid();
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.EMAIL_FROM, // Yeh wahi email honi chahiye jo abhi verify ki
      subject: `Novatel: New Enquiry from ${name}`,
      html: `<h3>New Enquiry Details:</h3>
             <p><b>Name:</b> ${name}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Message:</b> ${message}</p>`,
    };

    sgMail.send(msg)
      .then(() => console.log('LOG: Email sent via SendGrid successfully'))
      .catch((error) => console.error('LOG: SendGrid Error:', error.response ? error.response.body : error.message));

  } catch (error) {
    console.error('Controller Error:', error.message);
    if (!res.headersSent) res.status(500).json({ success: false });
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