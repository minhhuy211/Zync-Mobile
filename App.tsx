import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";

// Define an interface to type the response data
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make API request
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response: any) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
        {posts.map((post) => (
          <Text key={post.id}>{post.title}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default App;
