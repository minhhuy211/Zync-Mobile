import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userApi from "../api/userApi";
import { Relationship } from "../constants/FollowStatus";
import { ProfileModel } from "../models/ProfileModel";
import meApi from "../api/meApi";
import { UserModel } from "../models/UserModel";

interface FollowButtonProps {
  userId: string;
  isPrivate: boolean;
  relationship: Relationship;
  onRelationshipChange: (newRelationship: Relationship) => void;
  onFollowChange?: (profile: UserModel[]) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isPrivate,
  relationship,
  onRelationshipChange,
  onFollowChange
}) => {
  const [actioning, setActioning] = useState(false);

  const handleFollowToggle = async () => {
    setActioning(true);
    try {
      await userApi.followUser(userId);
      onRelationshipChange(
        isPrivate ? Relationship.REQUESTED : Relationship.FOLLOWING
      );
      if (onFollowChange) {
        const updatedProfile = await meApi.getFollowers(5,1);
        onFollowChange(updatedProfile);
      }

    } finally {
      setActioning(false);
    }
  };

  const handleUnFollowToggle = async () => {
    setActioning(true);
    try {
      const updatedRelationship = await userApi.unfollowUser(userId);
      onRelationshipChange(updatedRelationship);
      if (onFollowChange) {
        const updatedProfile = await meApi.getFollowers(5,1);
        onFollowChange(updatedProfile);
      }
    } finally {
      setActioning(false);
    }
  };

  const handleAcceptFollowToggle = async () => {
    setActioning(true);
    try {
      await userApi.acceptFollow(userId);
      onRelationshipChange(Relationship.FOLLOWING);
    } finally {
      setActioning(false);
    }
  };

  const handleFollowedToggle = async () => {
    setActioning(true);
    try {
      await userApi.followUser(userId);
      onRelationshipChange(
        isPrivate ? Relationship.REQUESTED : Relationship.FOLLOWING
      );
      if (onFollowChange) {
        const updatedProfile = await meApi.getFollowers(5,1);
        onFollowChange(updatedProfile);
      }
    } finally {
      setActioning(false);
    }
  };

  const handleRequestedFollowToggle = async () => {
    setActioning(true);
    try {
      await userApi.removeRequest(userId);
      onRelationshipChange(Relationship.NONE);
    } finally {
      setActioning(false);
    }
  };

  return (
    <View style={styles.buttonRow}>
        <>
          {relationship == Relationship.FOLLOWING && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleUnFollowToggle}
            >
              <Text style={styles.buttonText}>
                {actioning ? "Unfollowing..." : "Unfollow"}
              </Text>
            </TouchableOpacity>
          )}
          {relationship == Relationship.NONE && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleFollowToggle}
            >
              <Text style={styles.fullButtonText}>Follow</Text>
            </TouchableOpacity>
          )}
          {relationship == Relationship.PENDING && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleAcceptFollowToggle}
            >
              <Text style={styles.fullButtonText}>Accept Follow</Text>
            </TouchableOpacity>
          )}
          {relationship == Relationship.FOLLOWED && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleFollowedToggle}
            >
              <Text style={styles.fullButtonText}>Follow Back</Text>
            </TouchableOpacity>
          )}
          {relationship == Relationship.REQUESTED && (
            <TouchableOpacity
              style={styles.fullButton}
              onPress={handleRequestedFollowToggle}
            >
              <Text style={styles.fullButtonText}>Requested</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mention</Text>
          </TouchableOpacity>
        </>
      </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FollowButton;
