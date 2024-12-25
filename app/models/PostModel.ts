import { User } from "./User";

export interface PostModel{
    id: string,
    type: string,
    title: string,
    content: string,
    createdAt: String,
    createdBy: User,
    likes: number,
    numberOfComments: number,
    media: PostMedia[],
    liked: boolean,
    comments: Comment[];
    mentions: User[];

}

export interface PostMedia{
    id: string,
    url: string,
    type: MediaType
}

export enum MediaType{
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO"
}

export interface Comment{
    id: string,
    content: string,
    createdAt: string,
    createdBy: User,
    likes: number,
    liked: boolean,
    mentions: User[]
}