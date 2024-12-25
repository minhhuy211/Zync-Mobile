import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Profile } from "../models/ProfileModel";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import postApi from "../api/postApi";
import { Colors } from "react-native/Libraries/NewAppScreen";
import UserProfile from "./UserProfile";
import meApi from "../api/meApi";
import Post from "./Post";
import { PostModel } from "../models/PostModel";
import Tabs from "../components/Tabs";

type ProfileProps = {
  userId?: string;
  // showBackButton?: boolean;
};

export const ProfileView = ({
  userId,
  // showBackButton = false,
}: ProfileProps) => {
  const { top } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Threads");
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const [posts, setPosts] = useState<PostModel[]>([]);

  const isSelf = userId == null;


  // UseEffect to fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if(isSelf) {
        try {
          const data = await meApi.getProfile();
          setProfile(data);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postApi.getPosts();
        setPosts(data); // gán dữ liệu mock vào state
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []); // mảng rỗng để chỉ chạy một lần khi component được mount

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  // Hàm để lấy các posts theo từng loại tab
  const getPostsByTab = () => {
    switch (activeTab) {
      case "Threads":
        return posts.filter((post) => post.type === "thread"); // Giả sử posts có thuộc tính 'type'
      case "Replies":
        return posts.filter((post) => post.type === "reply");
      case "Reposts":
        return posts.filter((post) => post.type === "repost");
      default:
        return posts.filter((post) => post.type === activeTab.toLowerCase());    }
  };
  const threads = getPostsByTab().filter(post => post.type === "thread");
console.log(threads);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <FlatList
        data={getPostsByTab()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/feed/${item.id}`} asChild>
            <TouchableOpacity>
            {/* <Post post={item} /> */}
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.tabContentText}>
            You haven't posted anything yet.
          </Text>
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.border,
            }}
          />
        )}
        ListHeaderComponent={
          <>
          <View>
            <View style={styles.header}>
              {isSelf ? (
                <>
                <MaterialCommunityIcons name="web" size={24} color="black" />
                <View style={styles.headerIcons}>
                  <Ionicons name="logo-instagram" size={24} color="black" />
                  {/* <TouchableOpacity onPress={() > signOut()=}> */}
                  <Ionicons name="log-out-outline" size={24} color="black" />
                  {/* </TouchableOpacity> */}
                </View>
              </>
              
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                  >
                    <Ionicons name="chevron-back" size={24} color="#000" />
                    <Text style={styles.backText}>Back</Text>
                  </TouchableOpacity>
                  <View style={styles.headerIcons}>
                    <Ionicons name="logo-instagram" size={24} color="black" />
                    <Ionicons name="notifications-outline" size={24} color="black"/>
                    <Ionicons name="ellipsis-horizontal-circle" size={24} color="black"/>
                  </View>
                </>
              )}
            </View>
            {isSelf ? (
              <UserProfile userId={userId} />
            ) : (
              <UserProfile userId={profile?.id} />
            )}
          </View>

            <Tabs onTabChange={handleTabChange} />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  tabContentText: {
    fontSize: 16,
    marginVertical: 16,
    color: Colors.border,
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    fontSize: 16,
  },
});
export default ProfileView;
