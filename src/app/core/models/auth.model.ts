export interface authinterface {}
export type UserRole = 'vendor' | 'department' | 'manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  token: AuthToken;
}

// API Response Interfaces
export interface ApiLoginRequest {
  username: string;
  password: string;
}

export interface ApiLoginResponse {
  data: {
    access_token: string;
    email: string;
    refresh_token: string;
    role: string;
    user_id: number | null; // Can be null
    username: string;
  };
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface ApiErrorResponse {
  isSuccess: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface VendorOtpRequest {
  vendor_id: string;
}

export interface VendorOtpResponse {
  isSuccess: boolean;
  message: string;
  status: string;
  statusCode: number;
}

export interface VerifyVendorOtpRequest extends VendorOtpRequest {
  otp: string;
}

export interface VerifyVendorOtpResponse extends VendorOtpResponse {
  vendor_id: string;
  current_step?: string;
}

//for Business & tax registration

export interface LegalProof {
  id: number;
  name: string;
}

export interface LegalProofResponse {
  data: LegalProof[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}
