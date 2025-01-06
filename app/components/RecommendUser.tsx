import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UserModel } from "../models/UserModel";
import meApi from "../api/meApi";
import FollowButton from "./FollowButton";
import { useNavigation } from "expo-router";

const RecommendUser = () => {
  const [user, setUser] = useState<UserModel[]>([]); 
  // const navigation = useNavigation<any>(); // Sử dụng navigation hook

  const loadUser = () => {
    meApi.getRecommendUsers(5, 1).then((data) => {
      console.log(data);
      return setUser(data);
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  // const navigateToUserProfile = () => {
  //   navigation.navigate("UserProfile", { userId : user.id });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gợi ý cho bạn</Text>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* <TouchableOpacity onPress={() => navigateToUserProfile(item.id)}> */}
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.info}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            {/* </TouchableOpacity> */}
            <View style={styles.followButton}>
              <FollowButton
                userId={item.id}
                isPrivate={!!item.isPrivate}
                relationship={item.relationship}
                onRelationshipChange={(newRelationship) => {
                  let newUsers = [...user];
                  newUsers.find((u) => u.id === item.id)!.relationship =
                    newRelationship;
                  setUser(newUsers);
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    alignItems: "center",
    width: 150,
    height: 200,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 15,
  },
  info: {
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  username: {
    fontSize: 12,
    color: "#888",
  },
  followButton: {
    width: 130,
    height: 35,
    borderRadius: 4,
    position: "absolute",
    bottom: 10,
  },
  followText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RecommendUser;
