export interface Principal{
    name: string,
    avatar: string
}
export interface AuthenticateResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface AuthenticateRequest {
    email: string;
    password: string;
    twoFactorCode: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface ReAuthenticateRequest {
    refreshToken: string;
  }
  
  export interface RegisterRequest {
    email: string;
    password: string;
  }
  
  export interface ResetPasswordRequest {
    email: string;
    password: string;
    newPassword: string;
  }
  
  export interface VerificationRequest {
      email: string;
      code: string;
      }