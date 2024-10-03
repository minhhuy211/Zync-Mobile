import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import api from "./api";

export const authenticationApi = {
  login: (data: LoginRequest) => {
    return api.post("/auth/authenticate", data);
  },
  register: (data: RegisterRequest) => {
    return api.post("/auth/register", data);
  },
};
