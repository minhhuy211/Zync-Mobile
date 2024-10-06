import { ProfileResquest } from "../models/Me";
import api from "./api";

export const meApi = {
    createProfile: (data: ProfileResquest) =>
        api.post<string>('/api/v1/me/profile', data),
    
}
