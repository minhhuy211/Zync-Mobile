import { View, Text } from "react-native";
import postApi from "../../api/postApi";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { AuthenticatedScreenParams } from "../../navigation/AuthenticatedNavigator";
import PostHome from "./PostHome";
import { useEffect, useState } from "react";
import { PostModel } from "../../models/PostModel";

const PostDetail = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<AuthenticatedScreenParams, "PostDetails">;
}) => {
  const { postId } = route.params;
  console.log(postId);
  const [post, setPost] = useState<PostModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postApi.getPostById(postId);
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (post) {
    return (
      <View>
        <Text>Title: {post.author.name}</Text>
        <Text>Content: {post.content}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* <PostHome item={data}></PostHome> */}
      {/* <Text>Post Detail: {data.title}</Text> */}
    </View>
  );
};

export default PostDetail;
