import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon set
import Search from "../screens/Search";
import Post from "../screens/Post";
import Follow from "../screens/Follow";
import User, { UserProfile } from "../screens/UserProfile";
import ProfileView from "../screens/ProfileView";
import SelfProfile from "../screens/SelfProfile";

const AuthenticatedNavigator = () => {
  const Tab = createBottomTabNavigator();
  const TabIcon = ({
    name = "",
    color = "#000",
    focused = false,
    size = 24,
  }) => {
    return <Icon name={name} size={28} color={color} />;
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 58, // Custom height for the bottom tab
            backgroundColor: "#fff", // Change background color if necessary
          },
          tabBarIconStyle: {
            fontSize: 28,
          },
          tabBarActiveTintColor: "#000",
          tabBarShowLabel: false,
          // headerRight: Home.Header,
          headerBackgroundContainerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }}
      >
        <Tab.Screen
          name="HOME"
          component={Home}
          options={{
            tabBarIcon: (props) => <TabIcon name="home" {...props} />,
            title: "",
          }}
        />
        <Tab.Screen
          name="SEARCH"
          component={Search}
          options={{
            tabBarIcon: (props) => <TabIcon name="search" {...props} />,
          }}
        />
        <Tab.Screen
          name="POST"
          component={Post}
          options={{
            tabBarIcon: (props) => <TabIcon name="create" {...props} />,
          }}
        />
        <Tab.Screen
          name="FOLLOWER"
          component={Follow}
          options={{
            tabBarIcon: (props) => <TabIcon name="heart" {...props} />,
            headerShown: false,
          }}
        />
        {/* <Tab.Screen
          name="USER"
          component={UserProfile}
          options={{
            tabBarIcon: (props) => (
              <TabIcon name="person-circle-outline" {...props} />
            ),
            headerShown: true,
            headerTitle: "",
            headerLeft: UserProfile.HeaderLeft,
            headerRight: UserProfile.HeaderRight,
          }}
        /> */}
        <Tab.Screen
          name="SELF"
          component={SelfProfile}
          options={{
            tabBarIcon: (props) => (
              <TabIcon name="person-circle-outline" {...props} />
            ),
            headerShown: true,
            headerTitle: "",
            headerLeft: SelfProfile.HeaderLeft,
            headerRight: SelfProfile.HeaderRight,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
// Define the type for the params

// Define types for screen props
export default AuthenticatedNavigator;
