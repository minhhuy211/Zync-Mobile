import { MediaModel } from "./MediaModel";
import { Time } from "./TimeModel";
import { UserModel } from "./UserModel";

export interface PostModel{
    id: string,
    author: UserModel,
    type: PostType,
    content: string,
    createdAt: string,
    likes: number,
    relies: number,
    reposts: number,
    media: MediaModel[],
    time: Time[],
    liked: boolean,
    parent: PostModel | null,

}

export enum PostType{
    POST = "POST",
    REPOST = "REPOST",
    REPLY = "REPLY"
}






