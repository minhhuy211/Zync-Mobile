import { Relationship as Relationship } from "../constants/FollowStatus";

export interface ProfileModel {
    id?: string;
    name: string;
    bio: string;
    dateOfBirth: Date | null; // Sửa 'dateOfBirths' thành 'dateOfBirth' để đúng ngữ pháp
    avatar: string;
    username: string;
    links: string[]; 
    gender: string;
    numberOfFollowers?: number; // Sửa chính tả từ 'numbeOfFollowings'
    numberOfFollowings?: number; 
    isPrivate: boolean; 
    relationship: Relationship;
}