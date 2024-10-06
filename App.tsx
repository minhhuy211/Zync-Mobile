import React, { useEffect, useState } from "react";

import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import SignUp from "./app/screens/SignUp";
import api from "./app/api/api";
import SplashScreen from "./app/components/SplashScreen";// Nhập khẩu component SplashScreen

// Define an interface to type the response data
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [posts, setPosts] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Make API request
    axios.get<string>("/test").then((response) => {
      setPosts(response.data);
      setLoading(false);
    })
  }, []);

   // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // if (error) {
  //   return <Text>Error: {error}</Text>;
  // }

  // Hàm ẩn splash screen
  const handleHideSplash = () => {
    setAppIsReady(true);
  };

  if (!appIsReady) {
    return <SplashScreen onHide={handleHideSplash} />; // Hiển thị splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;