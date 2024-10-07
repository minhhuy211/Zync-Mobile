import { ProfileResquest } from "../models/Me";
import api from "./api";
import {Principal} from "../models/Authentication";

export const meApi = {
    createProfile: (data: ProfileResquest) =>api.post<string>('/api/v1/me/profile', data),
    getPrincipal: (data: Principal) =>api.post<string>('/api/v1/me/principal', data),

}
