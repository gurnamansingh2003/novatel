const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiry.controller');

// Public route - Submit enquiry
router.post('/submit', submitEnquiry);

// Admin routes - Get and manage enquiries
router.get('/all', getAllEnquiries);
router.patch('/:id/status', updateEnquiryStatus);

module.exports = router;
