import api from "./api";
import {UserModel} from "../models/UserModel";
import {ProfileRequest} from "../models/ProfileRequest";
import {ProfileModel} from "../models/ProfileModel";
import {PostModel, PostType} from "../models/PostModel";
import {ImagePickerAsset} from "expo-image-picker";
import {Platform} from "react-native";


export default {
  //profile public 
  putProfilePublic: () => api.put('/api/v1/me/privacy/public'),

  //profile private
  putProfilePrivate: () => api.put('/api/v1/me/privacy/private'),

   //edit avatar
   changeAvatar: (id: String) => {
    api.put('/api/v1/me/avatar',null, {params: {id: id}})
  },

  uploadAvatar: async (f : ImagePickerAsset) => {
    let formData = new FormData();
    console.log("upload");
    
    let uri = Platform.OS === 'ios' ? f.uri.replace('file://', '') : f.uri;
    const fileName = f.fileName || "avatar.jpg";
    const fileType = f.type || "image/jpeg";

    //@ts-expect-error
    formData.append('file', { uri, name: fileName, type: fileType });
    try {
      return await api.post('/api/v1/me/avatars', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); // Trả về dữ liệu từ server nếu cần
    } catch (error) {
      console.error('Lỗi khi tải lên avatar:', error);
      throw error; // Ném lỗi nếu gặp vấn đề
    }
  },

  getProfile: () => api.get<ProfileModel>('/api/v1/me/profiles'),

  //update profile 
  postProfile: (data: ProfileRequest) => api.post('/api/v1/me/profiles', data),


  getRecommendUsers: (limit: number, offset: number) => api.get<UserModel[]>('/api/v1/me/users/recommended', { params: { limit, offset } }),

  getFollowings: (limit: number, offset: number) => api.get<UserModel[]>('/api/v1/me/users/followings', { params: { limit, offset } }),

  getFollowers: (limit: number, offset: number) => api.get<UserModel[]>('/api/v1/me/users/followers', { params: { limit, offset } }),

  getRequested: (limit: number, offset: number) => api.get<UserModel[]>('/api/v1/me/users/requested', { params: { limit, offset } }),

  getPosts: (limit: number, offset: number, types: PostType) => api.get<PostModel[]>('/api/v1/me/posts', { params: { limit, offset , types} }),

  getPostsFollowing: (limit: number, offset: number, types: PostType) => api.get<PostModel[]>('/api/v1/me/posts/followings', { params: { limit, offset , types} }),

  

  // getActivities: (limit: number, offset: number, types: ) => api.get<PostModel[]>('/api/v1/me/activities', { params: { limit, offset } }),
  getMe() {
    return api.get<UserModel>("/me");
  }
};
