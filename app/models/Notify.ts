import User from "./User";
import {NotifyDescription} from "../constants/notify/NotifyDescription";
import {PostModel} from "./PostModel";
import {TimeModel} from "./TimeModel";
import {ActivityType} from "./ActivityType";

interface Notify {
    user: User;
    type: NotifyDescription;
    content: string;
    createdAt: Date;
    likedNum?: number;
    commentedNum?: number;
    repostedNum?: number;
    sentNum?: number;
    //new model

    id: string
    actor: User
    post?: PostModel
    time: TimeModel
    type: ActivityType

}

export default Notify;