// Student info and check-student API types

import type { University } from "./common";

export interface Faculty {
  id: number;
  university_detail: University;
  name: string;
  phone: string | null;
  address: string;
  university: number;
}

export interface StudentInfo {
  student_number: string;
  certificate_number: string | null;
  national_id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  full_name: string;
  field_of_study: string;
  birth_date: string;
  entry_term: string;
  entry_year: string;
  issued_by: string;
  education_level: string;
  education_system: string;
  university: University;
  faculty: Faculty;
}

export interface CheckStudentResponse {
  exists: boolean;
  student_info: StudentInfo | null;
}

