import { AuthenticateRequest } from "../models/AuthenticateRequest";
import { AuthenticateResponse } from "../models/AuthenticateResponse";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
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
  }
  authenticate: (data: AuthenticateRequest) => {
    return api.post<AuthenticateResponse>("/api/v1/auth/authenticate", data);
  }

};
