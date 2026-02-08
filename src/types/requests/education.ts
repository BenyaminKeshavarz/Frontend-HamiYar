// Education certificate API types
import type { Signer, University } from "./common";

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

export interface EducationCertificateResponse {
  student: EducationCertificateStudent;
  signer: Signer;
  academic_term: string;
  academic_year: string;
  expiration_date: string; // ISO date: "2026-02-08"
  certifcate: string; // API typo - recipient/organization name
  description: string;
  qr_code_image: string;
  qr_url?: string;
  date: string; // ISO date
  tracking_number?: string;
}

// Education certificate POST request body
export interface EducationCertificateRequestModel {
  student_number: string;
  academic_term: string;
  academic_year: string;
  certificate: string;
  description: string;
  university?: number; // TODO: Should remove
  faculty?: number; // TODO: Should remove
  signer?: number; // TODO: Should remove
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
