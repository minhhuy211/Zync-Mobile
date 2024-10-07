import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Principal} from "../../models/Authentication";
import {Key} from "../../constants/Key";

export interface AuthSate {
    accessToken: string | null,
    isAuthenticated: boolean
}

const initialState: AuthSate = {
    accessToken: null,
    isAuthenticated: false
};


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
        }
    }
});

export default authSlice;
