import { UserModel } from "../../../../models/UserModel";

export enum HistoryType {
    PEOPLE,
    SEARCHING,
  }
  export interface History {
    id: number;
    type: HistoryType;
    data: UserModel | string;
  }