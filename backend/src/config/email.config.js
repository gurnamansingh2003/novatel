const sgMail = require('@sendgrid/mail');

const setupSendGrid = () => {
  // Yeh API Key Render ke Environment variables se uthayega
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail;
};

module.exports = setupSendGrid;