import { MediaModel } from "./MediaModel";
import { TimeModel } from "./TimeModel";
import { UserModel } from "./UserModel";

export interface PostModel{
    id: string,
    author: UserModel,
    type: PostType,
    content: string,
    createdAt: string,
    likes: number,
    replies: number,
    reposts: number,
    media: MediaModel[],
    time: TimeModel[],
    liked: boolean,
    parent: PostModel | null,
    reposted: boolean;

}

export enum PostType{
    POST = "POST",
    REPOST = "REPOST",
    REPLY = "REPLY"
}






