import User from "./User";
import {TimeModel} from "./TimeModel";
import MediaModel from "./MediaModel";

export interface PostModel {
    id: string; // Assuming ZID maps to string
    author: User;
    type: string;
    content: string;
    createdAt: string; // Use `Date` type if the input will be deserialized into a JS Date object
    likes: number;
    replies: number;
    reposts: number;
    media: MediaModel[];
    time: TimeModel;
    liked: boolean;
    parent?: PostModel;
}