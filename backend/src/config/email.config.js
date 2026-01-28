const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL/TLS use karega
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Bina space wala 16-digit code
    },
    // Yeh settings timeouts ko bypass karne ke liye hai
    debug: true, 
    logger: true,
    connectionTimeout: 20000, // 20 seconds wait karega
    greetingTimeout: 20000,
    socketTimeout: 20000,
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    }
  });
};

module.exports = createTransporter;