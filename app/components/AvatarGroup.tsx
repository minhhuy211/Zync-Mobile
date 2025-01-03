import React from 'react';
import { UserModel } from '../models/UserModel';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AvatarGroupProps {
    users: UserModel[];
    max?: number;
}
export const AvatarGroup = ({ users, max }: AvatarGroupProps) => {
    return (

        <View style={styles.avatarGroup}>
        {users.slice(0, 5).map((user, index) => (
          <View
            key={index}
            style={[
              styles.avatarContainer,
              { marginLeft: index === 0 ? 0 : -15 }, // Chồng các avatar
            ]}
          >
            <Image
              source={{ uri: user.avatar || "https://via.placeholder.com/50" }}
              style={styles.avatar}
            />
          </View>
        ))}
        {users.length > 5 && (
          <TouchableOpacity style={styles.moreContainer}>
            <Text style={styles.moreText}>+{users.length - 5}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
      marginTop: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    avatarGroup: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatarContainer: {
      borderWidth: 2,
      borderColor: "white", // Viền trắng giữa các avatar
      borderRadius: 25,
      overflow: "hidden",
    },
    avatar: {
      width: 24,
      height: 24,
      borderRadius: 25,
    },
    moreContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: -15, // Chồng lên avatar cuối
    },
    moreText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default AvatarGroup;