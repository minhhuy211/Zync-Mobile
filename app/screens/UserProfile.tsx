import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import meApi from "../api/meApi";
// import { Colors } from '@/constants/Colors';
import { Link } from "expo-router";
import { ProfileModel } from "../models/ProfileModel";
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
import userApi from "../api/userApi";
import { Relationship } from "../constants/FollowStatus";
import RecommendUser from "../components/RecommendUser";

type UserProfileProps = {
  userId: string;
};

export const UserProfile = ({ userId }: UserProfileProps) => {
  const [profile, setprofile] = useState({} as ProfileModel);
  userId = "01JFY426B3DDKY4S1NVJ8JZ9Y2";
  const [loading, setloading] = useState(false)
  const [actioning, setActioning] = useState(false)
  useState(() => {
    setloading(true);
    userApi.getUser(userId).then((data) => {
      setprofile(data);
      console.log(data);
    })
    .finally(() => setloading(false));
  });

  const handleUnFollowToggle = () => {
    setActioning(true);
     userApi.unfollowUser(userId)
    .then((relationship) => {
      setprofile({ ...profile, relationship });
    })
    .finally(() => setActioning(false));
   
  };

  const handleFollowToggle = async () => {
     userApi.followUser(userId)
     setprofile({ ...profile, relationship: profile.isPrivate ? Relationship.REQUESTED : Relationship.FOLLOWING });

  };

  const handleAcceptFollowToggle = async () => {
    userApi.acceptFollow(userId)
    setprofile({ ...profile, relationship: Relationship.FOLLOWING });
  };

  const handleFollowedToggle = async () => {
    userApi.followUser(userId)
    setprofile({ ...profile, relationship: profile.isPrivate ? Relationship.REQUESTED : Relationship.FOLLOWING });

  };

  const handleRequestedFollowToggle = async () => {
    userApi.removeRequest(userId)
    setprofile({ ...profile, relationship: Relationship.NONE });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
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
      <Text>
        {profile?.numberOfFollowers} followers · {profile?.links} links
      </Text>

      <View style={styles.buttonRow}>
        <>
          {profile.relationship == Relationship.FOLLOWING && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleUnFollowToggle}
            >
              <Text style={styles.buttonText}>
                {actioning ? "Unfollowing..." : "Unfollow"}
              </Text>
            </TouchableOpacity>
          )}
          {profile.relationship == Relationship.NONE && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleFollowToggle}
            >
              <Text style={styles.fullButtonText}>
                Follow
              </Text>
            </TouchableOpacity>
          )}
          {profile.relationship == Relationship.PENDING && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleAcceptFollowToggle}
            >
              <Text style={styles.fullButtonText}>
                Accept Follow
              </Text>
            </TouchableOpacity>
          )}
          {profile.relationship == Relationship.FOLLOWED && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleFollowedToggle}
            >
              <Text style={styles.fullButtonText}>
                Follow Back
              </Text>
            </TouchableOpacity>
          )}
          {profile.relationship == Relationship.REQUESTED && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleRequestedFollowToggle}
            >
              <Text style={styles.fullButtonText}>
                Requested
              </Text>
            </TouchableOpacity>
          )}

          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mention</Text>
          </TouchableOpacity>
        </>
      </View>
      <RecommendUser />
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
