import React from "react";
import {NavigationContainer, ParamListBase} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PostEditor from "../screens/PostEditor";
import MainTabNavigator from "./MainTabNavigator";
import {PostModel} from "../models/PostModel";
import ProfileEditor from "../components/Profile/ProfileEditor";
import UserProfile from "../screens/UserProfile";
import { ProfileModel } from "../models/ProfileModel";


export interface AuthenticatedStackParams extends ParamListBase {
    PostEditor: {
        target?: PostModel
    }
    UserProfile:{
        id: string
    }
    ProfileEditor: {
        profile: ProfileModel
    }
}


const AuthenticatedNavigator = () => {
    const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Tab" component={MainTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="PostEditor" component={PostEditor} options={{
                animation: "slide_from_bottom",
                animationDuration: 100,
                headerShadowVisible: false,
                title: "New post"
            }}/>
            {/*<Stack.Screen name="ProfileEditor" component={ProfileEditor}*/}
            <Stack.Screen name="UserProfile" component={UserProfile} options={{
                headerShown: true,
                headerTitle: "",
                // headerLeft: UserProfile.HeaderLeft,
                // headerRight: UserProfile.HeaderRight,
            }}/>
            <Stack.Screen name="ProfileEditor" component={ProfileEditor} options={{headerTitle: "Chỉnh sửa trang cá nhân"}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};
// Define the type for the params

// Define types for screen props
export default AuthenticatedNavigator;
