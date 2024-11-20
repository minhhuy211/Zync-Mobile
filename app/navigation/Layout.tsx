import React, {useEffect, useMemo, useState} from 'react';
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuthAction, useAuthSelector} from "../features/auth";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import {Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Key} from "../constants/Key";
import {authenticationApi} from "../api/authenticationApi";
import {useAppDispatch} from "../store";
import {ApiError, ErrorCode} from "../models/Error";
import Verify from "../screens/Verify";
import AnonymousNavigator from "./AnonymousNavigator";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import Loader from "../screens/Loader";
import Splash from "../screens/Splash";

const Layout = () => {
    const [loading, setLoading] = useState(false)
    const {isAuthenticated, accessToken} = useAuthSelector()
    const {authenticate} = useAuthAction();
    const dispatch = useAppDispatch();

    async function handleError(e: ApiError) {
        await AsyncStorage.getItem(Key.REFRESH_TOKEN)
    }

    useEffect(() => {

        if (isAuthenticated) {
            console.log(isAuthenticated)
        } else {
            setLoading(true)
            AsyncStorage.getItem(Key.REFRESH_TOKEN)
                .then((token) => {
                    if (token) return authenticationApi.reauthenticate({refreshToken: token})
                })
                .then((res) => {
                    if (!!res) dispatch(authenticate(res.accessToken))
                })
                .catch((e : ApiError) => handleError(e))
                .finally(() => setLoading(false))
        }
    }, []);


    if (loading) return (<Splash/>)
    if (isAuthenticated) return <AuthenticatedNavigator/>
    return <AnonymousNavigator/>

};

export default Layout;
