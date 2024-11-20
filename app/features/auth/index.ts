import {useAppSelector} from "../../store";
import authSlice from "./authSlice";

export const useAuthSelector = () => useAppSelector(state => state.auth);
export const useAuthAction = () => authSlice.actions;