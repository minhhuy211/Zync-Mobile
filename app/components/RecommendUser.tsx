import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { UserModel } from '../models/UserModel';
import meApi from '../api/meApi';

const RecommendUser = () => {
    const [user, setUser] = useState({} as UserModel[]);

    const loadUser = () => {
        meApi.getRecommendUsers(5,1).then((data) => {
            return setUser(data);
        });
    };

    useEffect(() => {
        loadUser();
    }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gợi ý cho bạn</Text>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
            <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.username}>{item.username}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Theo dõi</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    alignItems: 'center',
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
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  username: {
    fontSize: 12,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    position: 'absolute',
    bottom: 10,
  },
  followText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RecommendUser;
