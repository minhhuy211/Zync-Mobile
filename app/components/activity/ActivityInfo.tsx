import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ActivityProps} from "../../screens/Activity";
import {NotifyType} from "../../constants/notify/NotifyType";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

interface FollowButtonInfo {
    title: string,
    isFollowed: boolean
}

interface ActivityInfoProps {
    data: ActivityProps;
}


const ActivityInfo = (info: ActivityInfoProps) => {
    const [followButtonInfo, setFollowButtonInfo] = useState<FollowButtonInfo>({title: "Follow back", isFollowed: false});
    const [confirmed, setConfirmed] = useState<boolean>(false);

    const handleFollow = () => {
        followButtonInfo.isFollowed ?
            setFollowButtonInfo({title: "Follow back", isFollowed: false}) :
            setFollowButtonInfo({title: "Following", isFollowed: true});
    }

    const handleFollowBack = () => {

    }

    const handleConfirm = (isConfirm: boolean) => {
        isConfirm ?
            setConfirmed(false) :
            setConfirmed(true);
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

                {info.data.type === NotifyType.FOLLOWED ? (
                    // Kiểm tra xem type có là FOLLOWED
                    <TouchableOpacity style={styles.button} onPress={handleFollow}>
                        <Text style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                            {followButtonInfo.title}
                        </Text>
                    </TouchableOpacity>
                ) : (info.data.type === NotifyType.FOLLOW_REQUESTED) ? (
                    // Trường hợp type là FOLLOW_REQUESTED
                    (confirmed ?
                            <TouchableOpacity style={styles.button} onPress={handleFollowBack}>
                                <Text style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                                    Follow Back
                                </Text>
                            </TouchableOpacity> :
                            <View style={styles.followReqBox}>
                                <TouchableOpacity style={[styles.buttonReq, {marginRight: 4}]}
                                                  onPress={() => setConfirmed(true)}>
                                    <Text
                                        style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonReq} onPress={() => setConfirmed(false)}>
                                    <Text
                                        style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                                        X
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    )
                ) : null}
            </View>
            {info.data.content ?
                <View style={styles.contentContainer}>
                    <Text>{info.data.content}</Text>

                    <View style={styles.interaction}>
                        <TouchableOpacity style={[styles.interactBox, {paddingLeft: 0}]}>
                            <Ionicons name="heart-outline" size={22} color="#7e7e7e"/>
                            <Text style={styles.interactCount}>0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.interactBox}>
                            <Ionicons name="chatbubble-outline" size={20} color="#7e7e7e"/>
                            <Text style={styles.interactCount}>0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.interactBox}>
                            <FontAwesome6Icon name="repeat" size={16} color="#7e7e7e"/>
                            <Text style={styles.interactCount}>0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.interactBox}>
                            <Ionicons name="paper-plane-outline" size={20} color="#7e7e7e"/>
                            <Text style={styles.interactCount}>0</Text>
                        </TouchableOpacity>
                    </View>
                </View> :
                null}
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
        flex: 1
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
        color: '#3c3c3c',
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },

    followedText: {
        color: '#7e7e7e'
    },

    followReqBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    buttonReq: {
        backgroundColor: 'transparent',
        display: 'flex',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: 'rgba(221,221,221,0.7)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    contentContainer: {},

    interaction: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    interactBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "#7e7e7e",
        padding: 10,
        maxHeight: 40
    },

    interactCount: {
        fontFamily: "SF Pro",
        fontSize: 14,
        color: "#7e7e7e",
        marginLeft: 5
    },
});

export default ActivityInfo;