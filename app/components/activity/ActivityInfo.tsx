import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import {ActivityType} from "../../constants/notify/ActivityType";
import {ActivityDescription} from "../../constants/notify/ActivityDescription";
import ActivityModel from "../../models/ActivityModel";
import Content from "../Content";
import {PostModel} from "../../models/PostModel";

interface FollowButtonInfo {
    title: string,
    isFollowed: boolean
}

interface ActivityInfoProps {
    data: ActivityModel;
}

const ActivityInfo = (info: ActivityInfoProps) => {
    const [followButtonInfo, setFollowButtonInfo] = useState<FollowButtonInfo>({title: "Follow back", isFollowed: false});
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [post, setPost] = useState<PostModel | undefined | null>(info.data.post);

    const handleFollow = () => {
        followButtonInfo.isFollowed ?
            setFollowButtonInfo({title: "Follow back", isFollowed: false}) :
            setFollowButtonInfo({title: "Following", isFollowed: true});
    }

    const handleConfirm = (isConfirm: boolean) => {
        isConfirm ?
            setConfirmed(false) :
            setConfirmed(true);
    }

    const handleLike = () => {
        if (post) {
            console.log("Handle like");
            const updatedPost = { ...post };  // Tạo bản sao mới của post
            updatedPost.liked = !updatedPost.liked;
            updatedPost.likes = updatedPost.liked ? updatedPost.likes + 1 : updatedPost.likes - 1;
            console.log(updatedPost.liked, updatedPost.likes);
            setPost(updatedPost);
        }
    }

    const handleRepost = () => {
        if (post) {
            const updatedPost = { ...post };  // Tạo bản sao mới của post
            updatedPost.reposted = !updatedPost.reposted;
            updatedPost.reposts = updatedPost.reposted ? updatedPost.reposts + 1 : updatedPost.reposts - 1;
            setPost(updatedPost);
        }
    }

    const formatUnit = (unit: string) => {
        return unit.charAt(0).toLowerCase();
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.infoContainer}>
                <View>
                    <View style={styles.nameBox}>
                        <Text style={styles.name}>{info.data.actor.username}</Text>
                        <Text style={styles.time}>{info.data.time.value + formatUnit(info.data.time.unit)}</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.description}>{getDescription(info.data.type)}</Text>
                    </View>
                </View>

                {info.data.type === ActivityType.FOLLOW ? (
                    // Kiểm tra xem type có là FOLLOWED
                    <TouchableOpacity style={styles.button} onPress={handleFollow}>
                        <Text style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                            {followButtonInfo.title}
                        </Text>
                    </TouchableOpacity>
                ) : (info.data.type === ActivityType.REQUEST_FOLLOW) ? (
                    // Trường hợp type là FOLLOW_REQUESTED
                    (confirmed ?
                            <TouchableOpacity style={styles.button} onPress={handleFollow}>
                                <Text style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                                    Follow back
                                </Text>
                            </TouchableOpacity> :
                            <View style={styles.followReqBox}>
                                <TouchableOpacity style={[styles.buttonReq, {marginRight: 4}]}
                                                  onPress={() => handleConfirm(true)}>
                                    <Text style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonReq} onPress={() => handleConfirm(false)}>
                                    <Text style={[styles.buttonText, followButtonInfo.isFollowed && styles.followedText]}>
                                        X
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    )
                ) : null}
            </View>
            {post ?
                <View style={styles.contentContainer}>
                    <Text><Content value={post.content}/></Text>

                    <View style={styles.interaction}>
                        <TouchableOpacity style={[styles.interactBox, {paddingLeft: 0}]} onPress={handleLike}>
                            {
                                post.liked ?
                                    <>
                                        <Ionicons name="heart" size={22} color="red" />
                                        <Text style={[styles.interactCount, {color: "red"}]}>{post.likes}</Text>
                                    </> :
                                    <>
                                        <Ionicons name="heart-outline" size={22} color="#7E7E7E"/>
                                        <Text style={styles.interactCount}>{post.likes}</Text>
                                    </>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.interactBox}>
                            <Ionicons name="chatbubble-outline" size={20} color="#7E7E7E"/>
                            <Text style={styles.interactCount}>{post.replies}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.interactBox} onPress={handleRepost}>
                            {
                                post.reposted ?
                                    <>
                                        <FontAwesome6Icon name="repeat" size={16} color="#FFE700"/>
                                        <Text style={[styles.interactCount, {color: "#FFE700"}]}>{post.reposts}</Text>
                                    </> :
                                    <>
                                        <FontAwesome6Icon name="repeat" size={16} color="#7E7E7E"/>
                                        <Text style={styles.interactCount}>{post.reposts}</Text>
                                    </>
                            }

                        </TouchableOpacity>
                    </View>
                </View> :
                null}
        </View>
    )
};

const getDescription = (type: ActivityType) => {
    const mapping: Record<ActivityType, string> = {
        // [NotifyType.FIRST_POST]: ActivityIcon.FIRST_POST,
        [ActivityType.FOLLOW]: ActivityDescription.FOLLOW,
        [ActivityType.REQUEST_FOLLOW]: ActivityDescription.FOLLOW_REQUESTED,
        [ActivityType.ACCEPT_FOLLOW]: ActivityDescription.FOLLOW_APPROVED,
        [ActivityType.REPLY]: ActivityDescription.REPLY,
        [ActivityType.LIKE]: ActivityDescription.LIKED,
        [ActivityType.REPOST]: ActivityDescription.REPOSTED,
        [ActivityType.MENTION]: ActivityDescription.MENTIONED,
        [ActivityType.UNFOLLOW]: '',
        [ActivityType.SHARE]: '',
        [ActivityType.RECOMMEND_USER]: '',
        [ActivityType.RECOMMEND_POST]: '',
        [ActivityType.REPORT]: '',
        [ActivityType.BOOKMARK]: '',
    };
    return mapping[type] || '';
}

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
        color: "#7E7E7E",
    },

    descriptionBox: {
        display: "flex",
        flexDirection: "column",
    },

    description: {
        fontFamily: "SF Pro",
        fontSize: 14,
        color: "#7E7E7E",
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
        color: '#7E7E7E'
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

    contentContainer: {
    },

    interaction: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },

    interactBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "#7E7E7E",
        padding: 10,
        maxHeight: 40
    },

    interactCount: {
        fontFamily: "SF Pro",
        fontSize: 14,
        color: "#7E7E7E",
        marginLeft: 5
    },
});

export default ActivityInfo;