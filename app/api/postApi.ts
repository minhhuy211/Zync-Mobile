
import { PostRequest, VisibilityEnum } from "../models/PostRequest";
import { PostModel }  from "../models/PostModel";
import api from "./api";


export default {
    editPost: (id: string, data: PostRequest) => api.put(`/api/v1/posts/${id}`, data),

    editVivisibility: (id: string, visibility: VisibilityEnum) => api.put(`/api/v1/posts/${id}/visibility`, { param: { visibility } }),

    newPost: (data: PostRequest) => api.post('/api/v1/posts', data.id),

    repost: (postId: string, data: PostRequest) => api.post(`/api/v1/posts/${postId}/repost`, data.id),

    relyPost: (postId: string, data: PostRequest) => api.post(`/api/v1/posts/${postId}/relies`, data.id),

    unlikePost: (id: string) => api.post(`/api/v1/posts/${id}/unlike`),

    likePost: (id: string) => api.post(`/api/v1/posts/${id}/likes`),
    
    // getPosts: () => api.get<PostModel[]>('/api/v1/posts'),   

}