import { Relationship } from "../constants/FollowStatus";

export interface UserModel{
    id: string,
    username: string,
    avatar: string,
    name: string,
    relationship: Relationship,
    isPrivate: boolean,
    verified: boolean,
}