const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiry.controller');

// Public route
router.post('/submit', submitEnquiry);

// Admin routes
router.get('/all', getAllEnquiries);
router.patch('/:id/status', updateEnquiryStatus);

module.exports = router;