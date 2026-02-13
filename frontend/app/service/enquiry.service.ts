// frontend/app/service/enquiry.service.ts

interface EnquiryFormData {
  name: string;
  email?: string;
  phone: string;
  city?: string;
  message?: string;
}

interface EnquiryResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Sahi port 3001 hai aapke pichle context ke hisaab se
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const submitEnquiry = async (formData: EnquiryFormData): Promise<EnquiryResponse> => {
  try {
    // Correct Path: /api/enquiries/submit
    const response = await fetch(`${API_URL}/enquiries/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to submit enquiry');
    return data;
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    throw error;
  }
};

export const getAllEnquiries = async (): Promise<EnquiryResponse> => {
  try {
    const token = localStorage.getItem("adminToken"); // Token zaroori hai
    const response = await fetch(`${API_URL}/enquiries/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch enquiries');
    return data;
  } catch (error: any) {
    throw error;
  }
};