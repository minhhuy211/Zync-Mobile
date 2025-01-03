import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import meApi from "../api/meApi";
// import { Colors } from '@/constants/Colors';
import { Link } from "expo-router";
import { Profile } from "../models/ProfileModel";
import { useEffect, useState } from "react";
import Modal from "react-native-modal"; // Import thư viện modal
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from "../store";
import { useAuthAction } from "../features/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Key } from "../constants/Key";
import Icon from "react-native-vector-icons/Ionicons";
import PostTab from "../components/Profile/PostTab";


type UserProfileProps = {
  userId?: string;
};

export const UserProfile = ({ userId }: UserProfileProps) => {
  const [profile, setprofile] = useState({} as Profile);
  const [isFollowed, setFollowed] = useState(false);
  

  const isSelf = userId == null;

  useState(() => {
    if (isSelf) {
      meApi.getProfile().then((data) => {
        setprofile(data);
        console.log(data);
      });
    } else {
    }
  });

  const handleFollowToggle = async () => {
    try {
      if (isFollowed) {
        await meApi.unfollow(userId!);
        setFollowed(false);
      } else {
        await meApi.follow(userId!);
        setFollowed(true);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };


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
      <Text>
        {profile?.numberOfFollowers} followers · {profile?.links} links
      </Text>

      <View style={styles.buttonRow}>
        <>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={handleFollowToggle}
          >
            <Text style={styles.fullButtonText}>
              {isFollowed ? "Followed" : "Follow"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mention</Text>
          </TouchableOpacity>
        </>
      </View>
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
    justifyContent: "flex-end", // Modal sẽ xuất hiện từ dưới lên
    margin: 0, // Không có margin để modal chiếm toàn bộ chiều rộng
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

UserProfile.HeaderLeft = () => {
  const dispatch = useAppDispatch();
  const { logout } = useAuthAction();
  async function handleLogout() {
    await AsyncStorage.getItem(Key.REFRESH_TOKEN);
    dispatch(logout());
  }

  return (
    <View style={styles.headerIconsLeft}>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

UserProfile.HeaderRight = () => {
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
        <Ionicons name="notifications-outline" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <Ionicons name="ellipsis-horizontal-circle" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default UserProfile;
