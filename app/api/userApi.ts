import { Relationship } from "../constants/FollowStatus";
import {  ProfileModel } from "../models/ProfileModel";
import { UserModel } from "../models/UserModel";
import { UserRequest } from "../models/UserRequest";
import api from "./api";

export default {
    unfollowUser: (targetId: string) => api.post<Relationship>(`api/v1/users/${targetId}/unfollow`),

    removeRequest: (targetId: string) => api.post(`api/v1/users/${targetId}/remove-request`),

    rejectRequest: (targetId: string) => api.post(`api/v1/users/${targetId}/reject-request`),

    followUser: (targetId: string) => api.post(`api/v1/users/${targetId}/follow`),

    acceptFollow: (targetId: string) => api.post(`api/v1/users/${targetId}/accept-follow`),

    registerNewUser: (data: UserRequest) => api.post<string>(`api/v1/users/register`, data),

    getUser: (id: string) => api.get<ProfileModel>(`api/v1/users/${id}`),

    searchUsers: (keyword: string, relationship: Relationship, limit: number, offset: number) => api.get<UserModel[]>(`api/v1/user/search`, { params: { keyword, relationship, limit, offset } }),

    searchFollowingsUsers: (keyword: string, limit: number, offset: number) => api.get<UserModel[]>(`/api/v1/users/search`, { params: { keyword, relationships: [Relationship.FOLLOWING.toString()].join(","), limit, offset } }),

}