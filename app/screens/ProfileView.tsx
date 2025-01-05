import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileModel } from "../models/ProfileModel";
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
import PostHome from "../components/Home/PostHome";


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
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const router = useRouter();
  const [posts, setPosts] = useState<PostModel[]>([]);

  const isSelf = userId == null;


  return <View></View>
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
