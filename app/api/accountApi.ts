import { Password } from "../models/Account";
import api from "./api";

export const acountApi = {
    password: (data: Password) => 
    api.put('/api/v1/account/password', data),
}