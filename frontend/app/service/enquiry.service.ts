// frontend/app/service/enquiry.service.ts
// Create this NEW FILE in your existing service folder

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const submitEnquiry = async (formData: EnquiryFormData): Promise<EnquiryResponse> => {
  try {
    const response = await fetch(`${API_URL}/enquiry/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit enquiry');
    }

    return data;
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    throw error;
  }
};

// Optional: Get all enquiries (for admin panel)
export const getAllEnquiries = async (): Promise<EnquiryResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/enquiry/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch enquiries');
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
};

// Optional: Update enquiry status (for admin panel)
export const updateEnquiryStatus = async (
  enquiryId: string,
  status: 'new' | 'contacted' | 'closed'
): Promise<EnquiryResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/enquiry/${enquiryId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update enquiry status');
    }

    return data;
  } catch (error: any) {
    console.error('Error updating enquiry status:', error);
    throw error;
  }
};