const Enquiry = require('../models/enquiry.model');
const createTransporter = require('../config/email.config');

// Submit enquiry
exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, city, message } = req.body;

    // Validate required fields
    if (!name ) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    // Create enquiry in database
   const enquiry = await Enquiry.create({
  name,
  email,
  ...(phone && { phone }),
  ...(city && { city }),
  ...(message && { message }),
});

    // Send email to admin
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Owner's email
      subject: `New Enquiry from ${name} - Novatel Services`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #037df6;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .info-row {
              margin: 15px 0;
              padding: 10px;
              background-color: #f5f5f5;
              border-left: 4px solid #037df6;
            }
            .label {
              font-weight: bold;
              color: #037df6;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Customer Enquiry</h1>
            </div>
            <div class="content">
              <p>You have received a new enquiry from your website:</p>
              
              <div class="info-row">
                <span class="label">Name:</span> ${name}
              </div>
              
              <div class="info-row">
                <span class="label">Email:</span> ${email || 'Not provided'}
              </div>
              
              <div class="info-row">
                <span class="label">Phone:</span> ${phone}
              </div>
              
              <div class="info-row">
                <span class="label">City:</span> ${city || 'Not provided'}
              </div>
              
              ${message ? `
              <div class="info-row">
                <span class="label">Message:</span><br/>
                ${message}
              </div>
              ` : ''}
              
              <div class="info-row">
                <span class="label">Submitted At:</span> ${new Date().toLocaleString()}
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from Novatel Services website enquiry form</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer (optional)
    if (email) {
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for your enquiry - Novatel Services',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #037df6;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border: 1px solid #ddd;
                border-radius: 0 0 5px 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You!</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for your enquiry. We have received your information and our team will get back to you shortly.</p>
                <p>If you have any urgent questions, please feel free to call us directly.</p>
                <br/>
                <p>Best regards,<br/>
                Novatel Services Team</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };
      
      await transporter.sendMail(customerMailOptions);
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you soon!',
      data: enquiry,
    });

  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again later.',
      error: error.message,
    });
  }
};

// Get all enquiries (for admin panel)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: error.message,
    });
  }
};

// Update enquiry status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry',
      error: error.message,
    });
  }
};