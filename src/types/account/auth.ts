//  Authentication-related type definitions

export interface AuthRequestModal {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshResponse {
  access: string;
  refresh?: string;
}
