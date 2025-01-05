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
// @ts-ignore
import ProfileView from "./ProfileView";
import HomeTab from "../components/Home/HomeTab";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerLogo}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
      {/* Danh sách bài viết */}
      <HomeTab
        onChangeType={() => {}}
        onLoadMore={() => {}}
        onPostPress={() => {}}
        onRefresh={() => {}}
        posts={[]}
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
