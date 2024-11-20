import { Password } from "../models/Account";
import api from "./api";

export const accountApi = {
    password: (data: Password) => 
    api.put('/api/v1/account/password', data),
}