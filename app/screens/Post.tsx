import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { PostModel } from "../models/PostModel";
import postApi from "../api/postApi";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from 'react-native-paper';

interface PostProps {
  // Props
  post: PostModel;
}

const Post = (post: PostModel) => {
  const [posts, setPosts] = useState<PostModel[]>([]); // Dữ liệu bài đăng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải


  useEffect(() => {
    // Lấy dữ liệu bài đăng khi component được mount
    postApi.getPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  // Render dữ liệu mỗi bài đăng
  const renderPost = ({ item }: { item: PostModel }) => {
    return (
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <Image
            source={{ uri: item.createdBy.avatar }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.username}>{item.createdBy.username}</Text>
            <Text style={styles.timestamp}>{item.createdAt}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        {item.media.map((media) => (
          <Image key={media.id} source={{ uri: media.url }} style={styles.media} />
        ))}
        <Button mode="contained" onPress={() => alert("Liked!")}>
          Like {item.likes}
        </Button>
        <Text>{item.numberOfComments} Comments</Text>
      </View>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  content: {
    fontSize: 14,
    marginVertical: 5,
  },
  media: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
});

export default Post;