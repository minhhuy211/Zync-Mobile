import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useQuery } from "convex/react";
import meApi from "../api/meApi";
// import { Colors } from '@/constants/Colors';
import { Link } from "expo-router";
import { Profile } from "../models/ProfileModel";
import { useEffect, useState } from "react";

type UserProfileProps = {
  userId?: string;
};

export const UserProfile = ({ userId }: UserProfileProps) => {
  // const userId = useQuery( { userId: userId as Id<'users'> });
  // const { userProfile } = useUserProfile();
  // const isSelf = userProfile?._id === userId;

  const [profile, setprofile] = useState({} as Profile);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setFollowed] = useState(false);

  const isSelf = userId == null;

  useState(() => {
    if (isSelf) {
      meApi.getProfile().then((data) => {
        setprofile(data);
      });
    } else {
    }
  });

  useEffect(() => {
    if (userId == null) return;
    if (profile == null) return;
    meApi.isFollowed(userId).then((data) => {
      setFollowed(data);
    });
  }, [profile, userId]);

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
        <Image source={{ uri: profile?.avatar }} style={styles.image} />
      </View>

      <Text style={styles.bio}>
        {profile?.bio ? profile?.bio : "No bio yet"}
      </Text>
      <Text>
        {profile?.following} followers · {profile?.links} links
      </Text>

      <View style={styles.buttonRow}>
        {isSelf && (
          <>
            <Link
              href={`/(modal)/edit-profile?biostring=${
                profile?.bio ? encodeURIComponent(profile?.bio) : ""
              }&linkstring=${profile?.bio ? encodeURIComponent(profile?.bio) : ""}&userId=${
                profile?.id
              }&imageUrl=${profile?.avatar ? encodeURIComponent(profile?.avatar) : ""}`}
              asChild
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit profile</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Share profile</Text>
            </TouchableOpacity>
          </>
        )}

        {!isSelf && (
          <>
            <TouchableOpacity style={styles.fullButton} onPress={handleFollowToggle}>
              <Text style={styles.fullButtonText}>
                {isFollowed ? "Followed" : "Follow"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Mention</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 10,
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
});
export default UserProfile;
