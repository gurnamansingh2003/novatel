const Enquiry = require('../models/enquiry.model');
const setupSendGrid = require('../config/email.config');

exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, city, message } = req.body;
    
    // Save to DB
    const enquiry = await Enquiry.create({ name, email, phone, city, message });
    
    res.status(201).json({ success: true, message: 'Enquiry received!' });

    const sgMail = setupSendGrid();
    
    const msg = {
      to: process.env.ADMIN_EMAIL,
      // YAHAN DHAYAN DEIN: Render ke variable ka naam aur email check karein
      from: process.env.EMAIL_FROM|| 'gnaman1531@gmail.com', 
      subject: `New Enquiry from ${name}`,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Message:</b> ${message}</p>`,
    };

    console.log("LOG: Attempting SendGrid send with FROM:", msg.from);

    sgMail.send(msg)
      .then(() => console.log('LOG: Success! Email sent via SendGrid'))
      .catch((error) => {
        console.error('LOG: SendGrid Detailed Error:', JSON.stringify(error.response ? error.response.body : error.message));
      });

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