// Common types shared between education and internship requests

export interface University {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string;
}

// Common POST response
export interface SubmitFormResponse {
  tracking_number: string;
}

export interface Signer {
  full_name: string;
  title: string;
  university: number;
  signature_image: string;
  is_active: boolean;
}
