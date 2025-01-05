import { View, Text, StyleSheet } from "react-native";
import postApi from "../api/postApi";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import PostHome from "../components/Home/PostItem";
import { useEffect, useState } from "react";
import { PostModel } from "../models/PostModel";
import { AuthenticatedStackParams } from "../navigation/AuthenticatedNavigator";
import PostItem from "../components/Home/PostItem";
import CommentHome from "../components/Home/CommentPost";
const PostDetails = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<AuthenticatedStackParams, "PostDetails">;
}) => {
  const { postId } = route.params;
  console.log(postId);
  const [post, setPost] = useState<PostModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId) {
          const data = await postApi.getPostById(postId);
          setPost(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (post) {
    return (
      <View style={styles.componet}>
        <View style={styles.post}>
          <PostItem post={post} />
        </View>
        <Text style={styles.navbar}>Thread trả lời</Text>
        <View style={styles.crossbar}></View>
        <CommentHome postId={postId} />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  componet: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  post: {
    marginBottom: 10,
  },
  navbar: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -5,
  },
  crossbar: {
    marginTop: 12,
    marginBottom: 10,
    height: 1,
    backgroundColor: "#000",
    opacity: 0.2,
    // width: "100%",
  },
});

export default PostDetails;
