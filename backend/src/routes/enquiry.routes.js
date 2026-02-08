const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiry.controller');

// Public route (Form submission ke liye)
router.post('/submit', submitEnquiry);

// Admin routes (Dashboard ke liye)
// Isi route se dashboard mein data aata hai
router.get('/all', getAllEnquiries); 

router.patch('/:id/status', updateEnquiryStatus);

module.exports = router;