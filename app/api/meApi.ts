import api from "./api";
import { UserModel } from "../models/UserModel";
import {ProfileRequest}  from "../models/ProfileRequest";
import { ProfileModel } from "../models/ProfileModel";
import { PostModel, PostType } from "../models/PostModel";


export default {
  //profile public 
  putProfilePublic: () => api.put('/api/v1/me/privacy/public'),

  //profile private
  putProfilePrivate: () => api.put('/api/v1/me/privacy/private'),

   //edit avatar
   changeAvatar: (id: String) => {
    api.put('/api/v1/me/avatar',null, {params: {id: id}})
  },

  //load avatar
  uploadAvatar: (file: File) => {
    let f = new FormData();
    f.append('file', file);
    api.post('/api/v1/me/avatar', f)
  },

  getProfile: () => api.get<ProfileModel>('/api/v1/me/profiles'),

  //update profile 
  postProfile: (data: ProfileRequest) => api.post('/api/v1/me/profiles', data),


  getRecommendUsers: (limit: number, offset: number) => api.get<UserModel[]>('/api/v1/me/users/recommend', { params: { limit, offset } }),

  getFollowing: (limit: number, offset: number) => api.get<UserModel[]>('/api/v1/me/users/following', { params: { limit, offset } }),

  getFollowers: (limit: number, offset: number) => api.get<UserModel[]>('/api/v1/me/users/followers', { params: { limit, offset } }),

  getPosts: (limit: number, offset: number, types: PostType) => api.get<PostModel[]>('/api/v1/me/posts', { params: { limit, offset , types} }),

  getPostsFollowing: (limit: number, offset: number, types: PostType) => api.get<PostModel[]>('/api/v1/me/posts/following', { params: { limit, offset , types} }),

  // getActivities: (limit: number, offset: number, types: ) => api.get<PostModel[]>('/api/v1/me/activities', { params: { limit, offset } }),
};
