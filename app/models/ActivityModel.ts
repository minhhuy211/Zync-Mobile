import {PostModel} from "./PostModel";
import {TimeModel} from "./TimeModel";
import {ActivityType} from "../constants/notify/ActivityType";
import UserModel from "./UserModel";

export default interface ActivityModel {
    //new model
    id: string
    actor: UserModel
    post?: PostModel
    time: TimeModel
    type: ActivityType
}