import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Key} from "../../constants/Key";
import {UserModel} from "../../models/UserModel";
import {Relationship} from "../../constants/Relationship";

export interface AuthSate {
    accessToken: string | null,
    isAuthenticated: boolean,
    user: UserModel | null

}

const initialState: AuthSate = {
    user: {
        id: "",
        username: "",
        avatar: "",
        name: "",
        relationship: Relationship.PENDING,
        isPrivate: false,
        verified: false
    },
    accessToken: null,
    isAuthenticated: false
};

export interface AuthenticatePayloadAction{
    token: string,
    user: UserModel
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticate(state, action : PayloadAction<string>){
            state.accessToken = action.payload
            state.isAuthenticated = true;
        },
        logout(state){
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null
        },
        setPrincipal(state,action : PayloadAction<UserModel> ){
            state.user = action.payload
        }
    }
});

export default authSlice;
