import User from "./User";
import {NotifyDescription} from "../constants/notify/NotifyDescription";

interface Notify {
    id: number;
    user: User;
    type: NotifyDescription;
    content: string;
    createdAt: Date;
    likedNum?: number;
    commentedNum?: number;
    repostedNum?: number;
    sentNum?: number;
}

export default Notify;