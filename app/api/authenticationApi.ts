import { AuthenticateRequest, AuthenticateResponse, LoginRequest, RegisterRequest } from "../models/Authentication";
import api from "./api";

export const authenticationApi = {
  login: (data: LoginRequest) => {
    return api.post("/api/v1/auth/authenticate", data);
  },
  register: (data: RegisterRequest) => {
    return api.post("/api/v1/auth/register", data);
  },
  checkEmail: (data: String) => {
    return api.get<boolean>("/api/v1/auth/check-email", { params:{ "email" : data}});
  },
  authenticate: (data: AuthenticateRequest) => {
    return api.post<AuthenticateResponse>("/api/v1/auth/authenticate", data);
  }

};
