import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {UserModel} from "../../models/UserModel";

interface FollowButton {
    title: string,
    isFollowed: boolean
}

export interface SearchItemProps {
    data: UserModel;
}

const SearchItem = (user: SearchItemProps) => {
    const [followButton, setFollowButton] = useState<FollowButton>({title: "Follow", isFollowed: false});

    const handleFollow = () => {
        followButton.isFollowed ?
            setFollowButton({title: "Follow", isFollowed: false}) :
            setFollowButton({title: "Following", isFollowed: true});
    }

    return (
        <View style={styles.item}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarBox}>
                    <Image source={{uri: user.data.avatar}} style={styles.avatar}/>
                </View>
            </View>
            <View style={styles.contentComponent}>
                <View style={styles.wrapper}>
                    <View style={styles.info}>
                        <Text style={styles.username}>{user.data.username}</Text>
                        <Text style={styles.name}>{user.data.name}</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleFollow}>
                        <Text style={[styles.buttonText, followButton.isFollowed && styles.followedText]}>
                            {followButton.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },

    avatarContainer: {
        position: 'relative',
        top: 16,
        left: 0
    },

    avatarBox: {
        width: 40,
        height: 40,
        borderRadius: 50, // Đảm bảo hình avatar là hình tròn
        marginRight: 10,
        overflow: 'hidden',  // Ẩn phần thừa nếu ảnh không đúng tỷ lệ
    },

    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Giữ nguyên tỷ lệ ảnh trong hình tròn
    },

    contentComponent: {
        flex: 1, // Giúp phần contentComponent chiếm không gian còn lại
        marginLeft: 10,
    },

    wrapper: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingVertical: 16,
        borderColor: '#ccc',
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
    },

    username: {
        fontSize: 14,
        fontFamily: "SF Pro",
        fontWeight: "bold",
        marginBottom: 2,
    },

    name: {
        fontSize: 14,
        fontFamily: "SF Pro",
        color: "#7E7E7E",
    },

    button: {
        backgroundColor: 'transparent',
        display: 'flex',
        width: 120,
        height: 30,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: 'rgba(221,221,221,0.7)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#3c3c3c',
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },

    followedText: {
        color: '#7E7E7E'
    },
});

export default SearchItem;