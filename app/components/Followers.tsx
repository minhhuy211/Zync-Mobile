import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { UserModel } from "../models/UserModel";
import meApi from "../api/meApi";
import Tabs from "./Tabs";
import { Modalize } from 'react-native-modalize';


interface FollowersProps {
  users: UserModel[];
  visible: boolean;
  onClose: () => void;
  onLoadMore: () => void;
  onRefresh: () => void;
  onUserPress: (user: UserModel) => void;
  onChangeType: (type: FollowersType) => void;
}

const enum FollowersType {
  FOLLOWERS = "followers",
  FOLLOWING = "following",
  REQUESTED = "requesting",
}

const items = [
  { value: FollowersType.FOLLOWERS, label: "Người theo dõi" },
  { value: FollowersType.FOLLOWING, label: "Đang theo dõi" },
  { value: FollowersType.REQUESTED, label: "Đang chờ" },
];

const Followers = ({ onChangeType, onUserPress, visible, onClose }: FollowersProps) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [tabValue, setTabValue] = useState(FollowersType.FOLLOWERS);
  const modalizeRef = useRef<Modalize>(null);

  const loadUsers = async () => {
    if (tabValue === FollowersType.FOLLOWERS) {
      const data = await meApi.getFollowers(5, 0);
      console.log("Followers data:", data); // Thêm log tại đây
      setUsers(data);
    } else if (tabValue === FollowersType.FOLLOWING) {
      const data = await meApi.getFollowings(5, 0);
      console.log("Following data:", data); // Thêm log tại đây
      setUsers(data);
    } else {
      const data = await meApi.getRequested(5, 0);
      console.log("Requested data:", data); // Thêm log tại đây
      setUsers(data);
    }
  };

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
      loadUsers();
    }
  }, [visible, tabValue]);
  

  const handleTabChange = (value: any): void => {
    setTabValue(value.value);
    onChangeType(value);
    console.log(value);
  };

  const renderItem = ({ item }: { item: UserModel }) => {
    return (
      <TouchableOpacity onPress={() => onUserPress(item)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.avatar }} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Theo dõi lại</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    
    );
  };

  return (
    <Modalize
      ref={modalizeRef}
      onClose={onClose}
      modalHeight={500}>
      <View>
      <Tabs value={tabValue} onTabChange={handleTabChange} items={items} />
      <View>
        {/* <TextInput placeholder="Tìm kiếm" style={styles.searchBar} /> */}
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
    </Modalize>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 14,
    color: "#666",
  },
  followButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Followers;
