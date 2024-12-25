import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ActivityProps} from "../../screens/Activity";

interface FollowButtonInfo {
    title: string,
    isFollowed: boolean
}
interface ActivityInfoProps {
    data: ActivityProps;
}


const ActivityInfo = (info: ActivityInfoProps) => {
    const [followButtonInfo, setFollowButtonInfo] = useState<FollowButtonInfo>({title: "Follow", isFollowed: false});

    const handleFollowClick = () => {
        followButtonInfo.isFollowed ?
            setFollowButtonInfo({title: "Follow", isFollowed: false}) :
            setFollowButtonInfo({title: "Following", isFollowed: true});
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.infoContainer}>
                <View>
                    <View style={styles.nameBox}>
                        <Text style={styles.name}>{info.data.name}</Text>
                        <Text style={styles.time}>{info.data.createdAt}</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.description}>{info.data.description}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}
                                  onPress={handleFollowClick}>
                    <Text style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>{followButtonInfo.title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 5,
        paddingBottom: 10,
        borderBottomWidth: .75,
        borderBottomColor: "#ccc",
    },

    infoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", // Căn đều giữa phần tử bên trái và phải
        paddingVertical: 5, // Giảm padding để tạo khoảng cách hợp lý
    },

    nameBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    name: {
        fontSize: 14,
        fontFamily: "SF Pro",
        fontWeight: "bold",
        marginRight: 5,
        marginBottom: 2,
    },

    time: {
        fontFamily: "SF Pro",
        fontSize: 13,
        color: "#7e7e7e",
    },

    descriptionBox: {
        display: "flex",
        flexDirection: "column",
    },

    description: {
        fontFamily: "SF Pro",
        fontSize: 14,
        color: "#7e7e7e",
    },

    iconBox: {
        marginLeft: 10,  // Khoảng cách giữa mô tả và biểu tượng
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
        color: '#000',
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },

    followedText: {
        color: '#7e7e7e'
    },
});

export default ActivityInfo;