import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Key } from "../constants/Key";
import { useAppDispatch } from "../store";
import { useAuthAction } from "../features/auth";
import { accountApi } from "../api/accountApi";
import PostHome from "../components/Home/PostHome";

const initialPosts = [
  {
    id: 1,
    username: "Ruchi_shah",
    avatar: require("../../assets/logo.png"),
    content: "Failures are stepping stones to success...",
    likes: 1,
    time: "49m",
    comments: [
      {
        id: 2,
        username: "Payal_shah",
        avatar: require("../../assets/logo.png"),
        content: "Yes",
        likes: 1,
        time: "44m",
        comments: [
          {
            id: 3,
            username: "User_2",
            avatar: require("../../assets/logo.png"),
            content: "Thanks for sharing!",
            likes: 2,
            time: "42m",
            comments: [],
          },
          {
            id: 4,
            username: "User_2",
            avatar: require("../../assets/logo.png"),
            content: "Thanks for sharing!",
            likes: 2,
            time: "42m",
            comments: [],
          },
        ],
      },
      {
        id: 5,
        username: "User_2",
        avatar: require("../../assets/logo.png"),
        content: "Thanks for sharing!",
        likes: 2,
        time: "42m",
        comments: [],
      },
    ],
  },
  {
    id: 6,
    username: "Krunal Modi",
    avatar: require("../../assets/logo.png"),
    content: "Hey @zuck where is my verified?",
    likes: 0,
    time: "50m",
    comments: [
      {
        id: 7,
        username: "zuck",
        avatar: require("../../assets/logo.png"),
        content: "Just a sec...😂",
        likes: 1,
        time: "50m",
        comments: [],
      },
    ],
  },
  {
    id: 8,
    username: "figma",
    avatar: require("../../assets/logo.png"),
    content: "Hello new (old) friends✌️",
    likes: 4,
    time: "6m",
    comments: [],
  },
];

const Home = () => {
  const [selectTab, setSelectTab] = useState("trending");
  const forYouPost = initialPosts;
  const trendingPost = initialPosts;

  const currentPosts = selectTab === "for you" ? forYouPost : trendingPost;

  return (
    <View style={styles.container}>
      <View style={styles.headerLogo}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, selectTab === "forYou" && styles.activeTab]}
          onPress={() => setSelectTab("forYou")}
        >
          <Text
            style={[
              styles.tabText,
              selectTab === "forYou" && styles.activeTabText,
            ]}
          >
            Dành cho bạn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectTab === "trending" && styles.activeTab,
          ]}
          onPress={() => setSelectTab("trending")}
        >
          <Text
            style={[
              styles.tabText,
              selectTab === "trending" && styles.activeTabText,
            ]}
          >
            Nổi bật
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách bài viết */}
      <FlatList
        data={currentPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostHome item={item} />}
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  headerLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  iconButton: {
    marginTop: 12,
    marginRight: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#000", // Màu tab đang chọn
  },
  tabText: {
    fontSize: 20,
    color: "#888",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
});

Home.Header = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuthAction();
  async function handleLogout() {
    await AsyncStorage.getItem(Key.REFRESH_TOKEN);
    dispatch(logout());
  }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <Icon name="log-out" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
