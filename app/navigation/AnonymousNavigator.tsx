import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Verify from "../screens/Verify";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { SafeAreaView } from "react-native";
import Search from "../screens/Search";
import Post from "../screens/Post";
import Activity from "../screens/Activity";
import User from "../screens/User";

const AnonymousNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="LOGIN" component={Login} />
         {/*<Stack.Screen name="REGISTER" component={SignUp} /> */}
        {/* <Stack.Screen name="Verify" component={Verify} /> */}
        {/*<Stack.Screen name="HOME" component={Home} />*/}
        {/*<Stack.Screen name="SEARCH" component={Search} />*/}
        {/*<Stack.Screen name="POST" component={Post} />*/}
        <Stack.Screen name="ACTIVITY" component={Activity} />
        {/*<Stack.Screen name="USER" component={User} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AnonymousNavigator;
