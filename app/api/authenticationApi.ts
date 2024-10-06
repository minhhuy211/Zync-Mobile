
import { AuthenticateRequest } from "../models/Authentication";
import { AuthenticateResponse } from "../models/Authentication";
import { LoginRequest } from "../models/Authentication";
import { ReAuthenticateRequest } from "../models/Authentication";
import { RegisterRequest } from "../models/Authentication";
import { VerificationRequest } from "../models/Authentication";

import api from "./api";

export const authenticationApi = {

  register: (data: RegisterRequest) => {
    return api.post<string>("/api/v1/auth/register", data);

  login: (data: AuthenticateRequest) => {
    return api.post<AuthenticateResponse>("/api/v1/auth/authenticate", data);
  },
  checkEmail: (data: string) => {
    return api.get<boolean>("/api/v1/auth/check-email", { params: { email: data } });
  },
  reauthenticate: (data: ReAuthenticateRequest) => {
    return api.post<AuthenticateResponse>("/api/v1/auth/reauthenticate", data);
  }, 
  requestResetPasswordCode: (data: string) => {
    return api.put("/api/v1/auth/reset-password", {params: { email: data }});
  },
  resetpassword: (data: string) => {
    return api.post("/api/v1/auth/reset-password", data);
  },
  requestVerificationCode: (data: string) => {
    return api.put("/api/v1/auth/verify-email", {params: { email: data }});
  },
  verification: (data: VerificationRequest) => {
    return api.post("/api/v1/auth/verify-email", data);
  }


};
