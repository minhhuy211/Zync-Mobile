import { Relationship } from "../constants/FollowStatus";
import {  ProfileModel } from "../models/ProfileModel";
import { UserModel } from "../models/UserModel";
import { UserRequest } from "../models/UserRequest";
import api from "./api";

export default {
    unffollowUser: (targetId: string) => api.post(`api/v1/user/${targetId}/unfollow`),

    removeRequest: (targetId: string) => api.post(`api/v1/user/${targetId}/remove-request`),

    rejectRequset: (targetId: string) => api.post(`api/v1/user/${targetId}/reject-request`),

    followUser: (targetId: string) => api.post(`api/v1/user/${targetId}/follow`),

    acceptFollow: (targetId: string) => api.post(`api/v1/user/${targetId}/accept-follow`),

    registerNewUser: (data: UserRequest) => api.post<string>(`api/v1/user/register`, data),

    getUser: (id: string) => api.get<ProfileModel>(`api/v1/user/${id}`),

    getSearchUsers: (keyword: string, relationship: Relationship, limit: number, offset: number) => api.get<UserModel[]>(`api/v1/user/search`, { params: { keyword, relationship, limit, offset } }),

}