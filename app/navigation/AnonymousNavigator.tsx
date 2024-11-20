import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Verify from "../screens/Verify";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const AnonymousNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LOGIN" component={Login}/>
                <Stack.Screen name="REGISTER" component={SignUp}/>
                <Stack.Screen name="Verify" component={Verify}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AnonymousNavigator;
