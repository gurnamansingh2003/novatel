"use client";

import { useState } from 'react';
import { submitEnquiry } from '@/app/service/enquiry.service';
import './QuickEnquiryModal.css';

interface EnquiryFormProps {
  onClose: () => void;
}

const QuickEnquiryModal = ({ onClose }: EnquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation (if provided)
    if (formData.phone) {
      const phoneRegex = /^[0-9]{10}$/;
      const cleanPhone = formData.phone.replace(/\s/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const response = await submitEnquiry(formData);
      
      if (response.success) {
        setSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          message: '',
        });

        // Show success message for 3 seconds then close
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="enquiry-backdrop" onClick={onClose}>
        <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
          <div className="success-content">
            <div className="success-animation">
              <div className="success-icon">✓</div>
              <h2>Thank You!</h2>
              <p>Your enquiry has been submitted successfully.</p>
              <p>We will contact you soon.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form screen
  return (
    <div className="enquiry-backdrop" onClick={onClose}>
      <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
        <div className="enquiry-header">
          <h2>Enquiry</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <form className="enquiry-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            disabled={loading}
          />

          <textarea
            name="message"
            placeholder="Message (Optional)"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            disabled={loading}
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickEnquiryModal;