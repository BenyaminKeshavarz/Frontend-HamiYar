// Internship letter API types
import type { University } from "./common";

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
}

export interface InternshipResponse {
  student: InternshipStudent;
  company: InternshipCompany;
  time: string;
  teacher: string;
  disciplinarian: boolean;
  signer: {
    full_name: string;
    title: string;
    university: number;
    signature_image: string;
    is_active: boolean;
  };
  qr_code_image: string;
  qr_url: string;
}

// Internship letter request body
export interface InternshipRequestModel {
  first_name: string;
  last_name: string;
  student_number: string;
  national_id: string;
  academic_term: string;
  academic_year: string;
  education_level: string;
  education_system: string;
  field_of_study: string;
  company_name: string;
  company_postal_code: string;
  company_address: string;
  time: string; // Time format: "01:10:36.800Z"
  description: string;
  teacher: string;
  disciplinarian: boolean;
  signer: number;
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
    workplace: string;
    disciplinarian: boolean;
  };
  signature: {
    title: string;
    name: string;
    imageUrl: string;
  };
}
