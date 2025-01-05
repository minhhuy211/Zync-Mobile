import { useEffect, useState } from "react";
import { PostModel, PostType } from "../../models/PostModel";
import meApi from "../../api/meApi";
import { FlatList, TouchableOpacity, View } from "react-native";
import Tabs from "../Tabs";
import PostHome from "./PostHome";

interface PostsTabProps {
  posts: PostModel[];
  onLoadMore: () => void;
  onRefresh: () => void;
  onPostPress: (post: PostModel) => void;
  onChangeType: (type: PostType) => void;
}

const items = [
  { value: PostType.POST, label: "Xu hướng" },
  { value: PostType.REPLY, label: "Dành cho bạn" },
];

const HomeTab = ({ onChangeType, onPostPress }: PostsTabProps) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [tabValue, setTabValue] = useState(PostType.POST);
  const [filterPosts, setFilterPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const fectchPosts = async () => {
      try {
        const data = await meApi.getPostsFollowing(10, 0, tabValue);
        console.log("Data fetched: ", data);
        setPosts(data);
        setFilterPosts(data.filter((post) => post.type === tabValue));
      } catch (error) {
        console.error(error);
      }
    };
    fectchPosts();
  }, []);

  useEffect(() => {
    const fillters = posts.filter((post) => post.type === tabValue);
    setFilterPosts(fillters);
  }, [tabValue, posts]);

  function handleTabChange(value: any): void {
    setTabValue(value.value);
    onChangeType(value);
    console.log(value);
  }

  return (
    <View>
      <Tabs value={tabValue} onTabChange={handleTabChange} items={items} />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPostPress(item)}>
            <PostHome post={item} maxWidth={0} maxHeight={0} item={undefined} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        // onEndReached={() => {
        //   setPosts((prevPosts) => [...prevPosts,...filterPosts]);
        // }}
        // onRefresh={onRefresh}
        // refreshing={false}
      />
    </View>
  );
};

export default HomeTab;
