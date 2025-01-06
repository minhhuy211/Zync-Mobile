import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from "react";
import ProfileAvatarItem from "../../ProfileAvatarItem";
import ProfileDetailItem from "../../ProfileDetailItem";

// Dữ liệu mẫu
const avatarData = [
    { id: '1', username: 'xinchao', name: 'Xin Chào Việt Nam', avatar: 'https://via.placeholder.com/100' },
    { id: '2', username: 'tunaxp', name: 'Xin chào', avatar: 'https://via.placeholder.com/100' },
    { id: '3', username: 'hinpeoo', name: 'Thảo Trang xin chào', avatar: 'https://via.placeholder.com/100' },
    { id: '4', username: 'ur.lovemilky', name: 'Tiểu Thạch L...', avatar: 'https://via.placeholder.com/100' },
    { id: '5', username: 'thenythxinchao', name: 'The Nyth Xin ...', avatar: 'https://via.placeholder.com/100' },
    { id: '6', username: 'havana.danang', name: 'HAVANA xin ...', avatar: 'https://via.placeholder.com/100' },
];

const profileData = [
    { id: '1', username: '_minhxinchao', name: 'Minh Xin Chào', avatar: 'https://via.placeholder.com/100' },
    { id: '2', username: 'anniestore___', name: 'Xin chào Annie đây', avatar: 'https://via.placeholder.com/100' },
    { id: '3', username: '_peo.store', name: 'PEO xin chào bạn', avatar: 'https://via.placeholder.com/100' },
    { id: '4', username: 'lane8.coffee', name: 'Lane 8 xin chào', avatar: 'https://via.placeholder.com/100' },
];

const ProfilesSearchFragment = () => {
    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={avatarData}
                numColumns={3} // Hiển thị 3 phần tử trên mỗi hàng
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={{paddingTop: 20, paddingBottom: 10}}
                style={styles.avatarList}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ProfileAvatarItem item={item}/>}
            />
            <Text style={styles.moreProfilesText}>More profiles</Text>
            <FlatList
                data={profileData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ProfileDetailItem item={item}/>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

    avatarList: {
        // marginBottom: 10,
    },

    columnWrapper: {
        justifyContent: 'space-between', // Căn đều các cột
    },

    moreProfilesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10
    },
});

export default ProfilesSearchFragment;