import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

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
import FollowButton from "../components/FollowButton";
import { UserModel } from "../models/UserModel";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { AuthenticatedStackParams } from "../navigation/AuthenticatedNavigator";
import AvatarGroup from "../components/AvatarGroup";
import Followers from "../components/Followers";

type UserProfileProps = {
  route: RouteProp<AuthenticatedStackParams, "UserProfile">;
  navigation: NavigationProp<any>;
};

export const UserProfile = ({ route, navigation }: UserProfileProps) => {
  const [profile, setprofile] = useState({} as ProfileModel);
  let userId = route.params.id;
  const [loading, setloading] = useState(false);
  const [followers, setFollowers] = useState<UserModel[]>([]);
  const [followVisible, setFollowVisible] = useState(false);

  useEffect(() => {
    setloading(true);
    userApi
      .getUser(userId)
      .then((data) => {
        setprofile(data);
        console.log(data);
      })
      .finally(() => setloading(false));
  }, [userId]);

  useEffect(() => {
    meApi.getFollowers(4, 0).then((data) => {
      setFollowers(data);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      ),
      headerRight: () => <UserProfile.HeaderRight />,
      animation: "slide_from_bottom",
    });
  }, [navigation]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleOpenFollow = () => setFollowVisible(true);
  const handleCloseFollow = () => setFollowVisible(false);

  const renderHeader = () => (
    <View style={styles.profile}>
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
      <TouchableOpacity onPress={() => handleOpenFollow()}>
        <View style={styles.avatarFollowers}>
          <AvatarGroup users={followers} />
          <Text style={{ color: "gray" }}>
            {profile?.numberOfFollowers} người theo dõi · {profile?.links}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <FollowButton
          userId={userId}
          isPrivate={!!profile.isPrivate}
          relationship={profile.relationship}
          onRelationshipChange={(newRelationship) =>
            setprofile({ ...profile, relationship: newRelationship })
          }
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mention</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <FlatList
        style={styles.container}
        ListHeaderComponent={renderHeader}
        data={[]} // Danh sách bài viết có thể được lấy từ PostTab nếu cần
        renderItem={null} // PostTab xử lý render bài viết riêng
        ListFooterComponent={
          <>
            <View style={styles.recommendUser}>
              <RecommendUser />
              <PostTab
                onChangeType={() => {}}
                onLoadMore={() => {}}
                onPostPress={() => {}}
                onRefresh={() => {}}
                posts={[]} // Truyền danh sách bài viết nếu cần
              />
            </View>
          </>
        }
      />
      <Followers
        visible={followVisible}
        onClose={handleCloseFollow}
        onChangeType={() => {}}
        onLoadMore={() => {}}
        onUserPress={(id) => {
          navigation.navigate("UserProfile", { id });
        }}
        onRefresh={() => {}}
        users={followers}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
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
  profile: {
    padding: 16,
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
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  fullButton: {
    flex: 1,
    padding: 8,
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
  avatarFollowers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  recommendUser: {
    padding: 16,
    // marginTop: 25,
    flex: 1,
  },
  postTab: {
    marginTop: 16,
    flex: 1,
  },
});

// UserProfile.HeaderLeft = () => {
//   const dispatch = useAppDispatch();
//   const { logout } = useAuthAction();
//   async function handleLogout() {
//     await AsyncStorage.getItem(Key.REFRESH_TOKEN);
//     dispatch(logout());
//   }

//   return (
//     <View style={styles.headerIconsLeft}>
//       <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
//         <Ionicons name="chevron-back" size={28} color="#000" />
//       </TouchableOpacity>
//     </View>
//   );
// };

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
        <Ionicons name="notifications-outline" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <Ionicons name="ellipsis-horizontal-circle" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default UserProfile;
