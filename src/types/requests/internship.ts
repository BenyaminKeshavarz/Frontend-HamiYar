// Internship letter API types
import type { Signer, University } from "./common";

export interface InternshipStudent {
  student_number: string;
  certificate_number: string;
  first_name: string;
  last_name: string;
  university: University;
  entry_term: string;
  entry_year: string;
  education_level: string;
  education_system: string;
}

export interface InternshipCompany {
  address: string;
  phone: string;
  hr_email: string;
  postal_code: string;
  name: string; // TODO: Get from API if available
  department: string; // TODO: Get from API if available
}

export interface InternshipResponse {
  student: InternshipStudent;
  company: InternshipCompany;
  time: string;
  teacher: string;
  disciplinarian: boolean;
  signer: Signer;
  qr_code_image: string;
  qr_url?: string;
  date: string; // ISO date
  tracking_number?: string;
}

// Internship letter POST request body
export interface InternshipRequestModel {
  student_number: string;
  company_name: string;
  company_postal_code: string;
  company_address: string;
  time: string;
  course: string; 
  teacher: string;
  disciplinarian: boolean;
  department: string;
  description?: string; // TODO: Should remove
  signer?: number; // TODO: Should remove
}

// Form data structure matching InternshipFormView for UI
export interface InternshipFormData {
  header: {
    university: string;
    city: string;
    date: string;
    number: string;
    attachment: string;
  };
  student: {
    code: string;
    fullName: string;
  };
  education: {
    field: string;
    entryAcademicYear: string;
    degreeType: string;
    system: string;
  };
  internship: {
    course: string;
    duration: string;
    instructor: string;
    companyName: string;
    address: string;
    postalCode: string;
    department: string;
    disciplinarian: boolean;
  };
  signature: {
    title: string;
    name: string;
    imageUrl: string;
  };
}
