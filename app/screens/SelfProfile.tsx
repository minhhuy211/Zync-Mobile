import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import meApi from "../api/meApi";
// import { Colors } from '@/constants/Colors';
import { Link } from "expo-router";

import React, { useEffect, useState } from "react";
import Modal from "react-native-modal"; // Import thư viện modal
import PostTab from "../components/Profile/PostTab";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from "../store";
import { useAuthAction } from "../features/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Key } from "../constants/Key";
import Icon from "react-native-vector-icons/Ionicons";
import { UserModel } from "../models/UserModel";
import AvatarGroup from "../components/AvatarGroup";
import { TextInput } from "react-native-paper";
import ProfileEditor from "../components/Profile/ProfileEditor";
import { ProfileModel } from "../models/ProfileModel";

export const SelfProfile = () => {
  const [profile, setprofile] = useState({} as ProfileModel);
  const [followers, setFollowers] = useState<UserModel[]>([]);
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  useEffect(() => {
   loadProfile();
  }, []);

  function loadProfile(): void {
    meApi
    .getProfile()
    .then((data) => {
      setprofile(data);
      console.log(data);
    })
    .then(() => meApi.getFollowers(5, 1))
    .then((data) => {
      setFollowers(data);
      console.log(data);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.username}>{profile?.username}</Text>
        </View>
        <Image source={{ uri: profile.avatar }} style={styles.image} />
      </View>

      <Text style={styles.bio}>
        {profile?.bio ? profile?.bio : "No bio yet"}
      </Text>
      <View style={styles.avatarFollowers}>
        <AvatarGroup users={followers} />
        <Text style={{ color: "gray" }}>
          {profile?.numberOfFollowers} người theo dõi · {profile?.links} 
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <>
          <TouchableOpacity style={styles.button} onPress={() => setEditProfileVisible(true)}>
            <Text style={styles.buttonText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share profile</Text>
          </TouchableOpacity>
        </>
      </View>

      <ProfileEditor profile={profile} visible ={editProfileVisible} onclose={() => setEditProfileVisible(false)} onUpdated={loadProfile}/>
      <PostTab
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  headerIconsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginLeft: 14,
  },
  headerIconsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginRight: 14,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileTextContainer: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "gray",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bio: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
  },
  avatarFollowers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 6,
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  fullButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  iconButton: {
    marginTop: 12,
    // marginRight: 10,
  },
  modal: {
    justifyContent: "flex-start", // Chỉnh sửa cho modal bắt đầu từ trên cùng
    margin: 0, // Không có margin
    flex: 1, // Chiếm toàn bộ không gian màn hình
  },
  modalContent: {
    flex: 1, // Đảm bảo modalContent chiếm toàn bộ không gian trong modal
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "flex-start", // Chỉnh sửa cho nội dung bắt đầu từ trên cùng
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  saveButtonText: {
    color: "white",
  },
});

SelfProfile.HeaderLeft = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuthAction();
  async function handleLogout() {
    await AsyncStorage.getItem(Key.REFRESH_TOKEN);
    dispatch(logout());
  }

  return (
    <View style={styles.headerIconsLeft}>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="web" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

SelfProfile.HeaderRight = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuthAction();
  async function handleLogout() {
    await AsyncStorage.getItem(Key.REFRESH_TOKEN);
    dispatch(logout());
  }

  return (
    <View style={styles.headerIconsRight}>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <Ionicons name="logo-instagram" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        {/* <Ionicons name="log-out-outline" size={28} color="black" /> */}
        <Ionicons name="options-outline" size={28} color="black"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default SelfProfile;
