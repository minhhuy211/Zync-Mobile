import { PostModel } from "../models/PostModel";
import { postThread } from "./mock";

export default {
    //getPosts: () => api.get<Post[]>('/api/v1/posts'),
    getPosts: () => Promise.resolve(postThread as PostModel[]),
}