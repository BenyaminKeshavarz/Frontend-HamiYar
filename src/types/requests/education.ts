// Education certificate API types
import type { University } from "./common";

export interface EducationCertificateStudent {
  student_number: string;
  certificate_number: string;
  first_name: string;
  last_name: string;
  national_id: string;
  issued_by: string;
  birth_date: string; // ISO date format: "2026-02-01"
  father_name: string;
  field_of_study: string;
  entry_term: string;
  entry_year: string;
  education_level: string;
  education_system: string;
  university: University;
}

export interface EducationCertificateSigner {
  full_name: string;
  title: string;
  university: number;
  signature_image: string;
  is_active: boolean;
}

export interface EducationCertificateResponse {
  student: EducationCertificateStudent;
  academic_term: string;
  academic_year: string;
  expiration_date: string; // ISO date format: "2026-02-01"
  signer: EducationCertificateSigner;
  qr_code_image: string;
  qr_url: string;
}

// Education certificate request body
export interface EducationCertificateRequestModel {
  first_name: string;
  last_name: string;
  father_name: string;
  national_id: string;
  birth_date: string; // ISO date format: "2026-02-02"
  field_of_study: string;
  student_number: string;
  academic_term: string;
  academic_year: string;
  education_level: string;
  education_system: string;
  issued_by: string;
  expiration_date: string; // ISO date format: "2026-02-02"
  university: number;
  faculty: number;
  signer: number;
}

// Form data structure matching EducationFormView for UI
export interface EducationFormData {
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
    fatherName: string;
    idNumber: string;
    birthPlace: string;
    birthDate: string; // Jalali date for display
    birthDateIso?: string; // ISO date (YYYY-MM-DD) for API requests
    photoUrl: string;
  };
  education: {
    field: string;
    degreeType: string;
    method: string;
    entrySemester: string;
    entryAcademicYear: string;
    currentSemester: string;
    currentAcademicYear: string;
  };
  certificate: {
    recipient: string;
    validityDate: string; // ISO date (YYYY-MM-DD) from DatePicker
  };
  description: string;
  signature: {
    title: string;
    name: string;
    imageUrl: string;
  };
}
