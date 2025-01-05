import React from "react";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostEditor from "../screens/PostEditor";
import MainTabNavigator from "./MainTabNavigator";
import { PostModel } from "../models/PostModel";
import PostDetails from "../screens/PostDetails";
import MediaReview from "../screens/MediaReview";
import { MediaModel } from "../models/MediaModel";

export interface AuthenticatedStackParams extends ParamListBase {
  PostEditor: {
    target?: PostModel;
  };
  PostDetails: {
    postId?: string;
  };
  MediaReview: {
    media?: MediaModel;
  };
}

const AuthenticatedNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostEditor"
          component={PostEditor}
          options={{
            animation: "slide_from_bottom",
            animationDuration: 100,
            headerShadowVisible: false,
            title: "New post",
          }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{
            headerTitle: "Post Details",
            // headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="MediaReview"
          component={MediaReview}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// Define the type for the params

// Define types for screen props
export default AuthenticatedNavigator;
