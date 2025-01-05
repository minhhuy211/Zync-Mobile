import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import React, {useState} from "react";

interface Follow {
    title: string,
    isFollowed: boolean
}

const ProfileDetailItem = ({item}: any) => {
    const [follow, setFollow] = useState<Follow>({title: "Follow", isFollowed: false});

    const handleFollow = () => {
        follow.isFollowed ?
            setFollow({title: "Follow", isFollowed: false}) :
            setFollow({title: "Following", isFollowed: true});
    }

    const handleProfileScreen = () => {
        // Truyền id của profile vào đây để chuyển sang screen Profile chẳng hạn
    }

    return (
        <TouchableOpacity style={styles.profileContainer} onPress={handleProfileScreen}>
            <Image source={{uri: item.avatar}} style={styles.profileImage}/>
            <View style={styles.profileTextContainer}>
                <Text style={styles.profileUsername}>{item.username}</Text>
                <Text style={styles.profileName}>{item.name}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleFollow}>
                <Text style={[styles.buttonText, follow.isFollowed && styles.followedText]}>
                    {follow.title}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    profileTextContainer: {
        flex: 1,
    },
    profileUsername: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    profileName: {
        fontSize: 12,
        color: '#666',
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

export default ProfileDetailItem;