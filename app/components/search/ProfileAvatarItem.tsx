import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileAvatarItem = ({item}: any) => {
    const [follow, setFollow] = useState<boolean>(false);

    const handleFollow = () => {
        follow ? setFollow(false) : setFollow(true);
    }

    const handleProfileScreen = () => {
        // Truyền id của profile vào đây để chuyển sang screen Profile chẳng hạn
    }

    return (
        <TouchableOpacity style={styles.avatarContainer} onPress={handleProfileScreen}>
            <Image source={{uri: item.avatar}} style={styles.avatarImage}/>
            <Text style={styles.avatarUsername}>{item.username}</Text>
            {
                !follow ?
                    <TouchableOpacity style={styles.addingButton} onPress={handleFollow}>
                        <Ionicons name="add" size={22} color="white"/>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.addingButton} onPress={handleFollow}>
                        <Ionicons name="checkmark" size={22} color="white"/>
                    </TouchableOpacity>
            }
            <Text style={styles.avatarName}>{item.name}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 15,
        flex: 1, // Đảm bảo phần tử co giãn đều trong lưới
        maxWidth: '30%', // Đảm bảo mỗi phần tử không chiếm quá 30% chiều rộng
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,
    },
    avatarUsername: {
        position: 'relative',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatarName: {
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },
    addingButton: {
        position: 'absolute',
        backgroundColor: '#000000',
        top: 60,
        right: 20,
        borderRadius: 50
    }
});

export default ProfileAvatarItem;