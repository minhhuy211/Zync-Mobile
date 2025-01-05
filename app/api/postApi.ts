
import { PostRequest, Visibility } from "../models/PostRequest";
import { PostModel }  from "../models/PostModel";
import api from "./api";


export default {
    editPost: (id: string, data: PostRequest) => api.put(`/api/v1/posts/${id}`, data),

    editVivisibility: (id: string, visibility: Visibility) => api.put(`/api/v1/posts/${id}/visibility`, { param: { visibility } }),

    newPost: (data: PostRequest) => api.post('/api/v1/posts', data),

    repost: (postId: string, data: PostRequest) => api.post(`/api/v1/posts/${postId}/repost`, data),

    relyPost: (postId: string, data: PostRequest) => api.post(`/api/v1/posts/${postId}/relies`, data),
    getReplies: (postId: string, limit: number, offset: number) => {
        console.log("getReplies", {postId, limit, offset});
        return api.get<PostModel[]>(`/api/v1/posts/${postId}/replies`)
    },
    unlikePost: (id: string) => api.post(`/api/v1/posts/${id}/unlike`),

    likePost: (id: string) => api.post(`/api/v1/posts/${id}/likes`),
    
    getPosts: () => api.get<PostModel[]>('/api/v1/posts'),   
    getPostById: (id: string) => api.get<PostModel>(`/api/v1/posts/${id}`),

    getPostsRecommended: (limit: number, offset: number, types: PostType) => api.get<PostModel[]>('/api/v1/me/posts/recommended', { params: { limit, offset , types} }),

}