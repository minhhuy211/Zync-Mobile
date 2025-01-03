import {Relationship} from "../constants/Relationship";

interface UserModel {
    id: string; // Assuming ZID is equivalent to a string
    username: string;
    avatar: string;
    name: string;
    relationship: Relationship;
    isPrivate: boolean;
    isVerified: boolean;      // Có tích xanh hay không
}

export default UserModel;