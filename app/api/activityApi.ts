import api from "./api";
import ActivityModel from "../models/ActivityModel";
import {ActivityType} from "../constants/notify/ActivityType";

export const activityApi = {
    getActivities: (limit: number, offset: number, types: ActivityType[]) => api.get<ActivityModel[]>(`/api/v1/me/activities`, {
        params: {
            limit,
            offset,
            types: types.map(type => type.toString()).join(",")
        }
    }),
};