import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { UserModel } from '../models/UserModel';


const RecommendUser = () => {
    const [user, setUser] = useState({} as UserModel);
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gợi ý cho bạn</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
            <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.username}>{username}</Text>
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
    padding: 16,
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
    marginRight: 12,
    alignItems: 'center',
    width: 120,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default RecommendUser;
