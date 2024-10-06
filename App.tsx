import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import api from "./app/api/api";


// Define an interface to type the response data
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make API request
    api.get<string>("/test").then((response) => {
      setPosts(response);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView>
      <View>
        <Text>{posts}</Text>
        <Text>End of the list</Text>
      </View>
    </ScrollView>

  );
};

export default App;
